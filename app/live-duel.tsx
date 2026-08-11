"use client";

import { useEffect, useMemo, useState } from "react";
import { questions } from "./study-data";
import { ensureAnonymousUser, supabase } from "./supabase";

type Room = {
  id: string;
  code: string;
  host_id: string;
  status: "waiting" | "playing" | "finished";
  question_ids: string[];
  current_question: number;
  started_at: string | null;
  finished_at: string | null;
};

type Player = {
  id: string;
  room_id: string;
  user_id: string;
  nickname: string;
  score: number;
  correct_count: number;
  wrong_count: number;
  ready: boolean;
};

type DuelAnswer = {
  id: string;
  room_id: string;
  player_id: string;
  user_id: string;
  question_id: string;
  question_index: number;
  selected_option: number;
  is_correct: boolean;
  response_ms: number;
  points: number;
};

const nicknameStorageKey = "aof-duel-nickname";
const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function makeRoomCode() {
  const values = crypto.getRandomValues(new Uint8Array(6));
  return Array.from(values, (value) => alphabet[value % alphabet.length]).join("");
}

function pickQuestionIds() {
  return [...questions].sort(() => Math.random() - 0.5).slice(0, 10).map((question) => question.id);
}

function errorMessage(error: unknown) {
  if (error && typeof error === "object" && "message" in error && typeof error.message === "string") return error.message;
  return "Beklenmeyen bir bağlantı hatası oluştu.";
}

export default function LiveDuel() {
  const [userId, setUserId] = useState<string | null>(null);
  const [nickname, setNickname] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [room, setRoom] = useState<Room | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [answers, setAnswers] = useState<DuelAnswer[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const roomId = room?.id;

  useEffect(() => {
    let active = true;
    const timer = window.setTimeout(() => {
      setNickname(window.localStorage.getItem(nicknameStorageKey) ?? "");
      ensureAnonymousUser()
        .then((user) => { if (active) setUserId(user.id); })
        .catch((authError) => { if (active) setError(`Bağlantı kurulamadı: ${errorMessage(authError)}`); });
    }, 0);
    return () => {
      active = false;
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!roomId) return;
    let active = true;

    async function refreshPlayers() {
      const { data, error: playersError } = await supabase.from("players").select("*").eq("room_id", roomId).order("joined_at");
      if (active && !playersError) setPlayers((data ?? []) as Player[]);
    }

    async function refreshAnswers() {
      const { data, error: answersError } = await supabase.from("answers").select("*").eq("room_id", roomId);
      if (active && !answersError) setAnswers((data ?? []) as DuelAnswer[]);
    }

    void refreshPlayers();
    void refreshAnswers();

    const channel = supabase
      .channel(`duel-${roomId}`)
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "rooms", filter: `id=eq.${roomId}` }, (payload) => {
        if (active) {
          const updatedRoom = payload.new as Room;
          setElapsedSeconds(0);
          setRoom(updatedRoom);
        }
      })
      .on("postgres_changes", { event: "DELETE", schema: "public", table: "rooms", filter: `id=eq.${roomId}` }, () => {
        if (active) {
          setRoom(null);
          setPlayers([]);
          setAnswers([]);
          setError("Oda, kurucu tarafından kapatıldı.");
        }
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "players", filter: `room_id=eq.${roomId}` }, () => { void refreshPlayers(); })
      .on("postgres_changes", { event: "*", schema: "public", table: "answers", filter: `room_id=eq.${roomId}` }, () => { void refreshAnswers(); })
      .subscribe();

    return () => {
      active = false;
      void supabase.removeChannel(channel);
    };
  }, [roomId]);

  useEffect(() => {
    if (room?.status !== "playing") return;
    const timer = window.setInterval(() => setElapsedSeconds((seconds) => seconds + 1), 1000);
    return () => window.clearInterval(timer);
  }, [room?.status]);

  const ownPlayer = players.find((player) => player.user_id === userId);
  const currentQuestionId = room?.question_ids[room.current_question];
  const currentQuestion = questions.find((question) => question.id === currentQuestionId);
  const currentAnswers = answers.filter((answer) => answer.question_index === room?.current_question);
  const ownAnswer = currentAnswers.find((answer) => answer.user_id === userId);
  const allAnswered = players.length >= 2 && players.every((player) => currentAnswers.some((answer) => answer.player_id === player.id));
  const ranking = useMemo(() => [...players].sort((a, b) => b.score - a.score || b.correct_count - a.correct_count), [players]);
  const isHost = room?.host_id === userId;

  function saveNickname() {
    const cleanName = nickname.trim();
    if (!cleanName) throw new Error("Önce oyuncu adını yaz.");
    if (cleanName.length > 24) throw new Error("Oyuncu adı en fazla 24 karakter olabilir.");
    window.localStorage.setItem(nicknameStorageKey, cleanName);
    return cleanName;
  }

  async function createRoom() {
    if (!userId) return;
    setBusy(true);
    setError("");
    try {
      const cleanName = saveNickname();
      let createdRoom: Room | null = null;

      for (let attempt = 0; attempt < 4 && !createdRoom; attempt += 1) {
        const { data, error: roomError } = await supabase.from("rooms").insert({
          code: makeRoomCode(),
          host_id: userId,
          question_ids: pickQuestionIds(),
        }).select("*").single();
        if (!roomError) createdRoom = data as Room;
        else if (roomError.code !== "23505") throw roomError;
      }

      if (!createdRoom) throw new Error("Oda kodu üretilemedi. Tekrar dene.");
      const { error: playerError } = await supabase.from("players").insert({ room_id: createdRoom.id, user_id: userId, nickname: cleanName });
      if (playerError) throw playerError;
      const { data: player, error: playerReadError } = await supabase.from("players").select("*").eq("room_id", createdRoom.id).eq("user_id", userId).single();
      if (playerReadError) throw playerReadError;
      setPlayers([player as Player]);
      setAnswers([]);
      setRoom(createdRoom);
    } catch (createError) {
      setError(errorMessage(createError));
    } finally {
      setBusy(false);
    }
  }

  async function joinRoom() {
    if (!userId) return;
    setBusy(true);
    setError("");
    try {
      const cleanName = saveNickname();
      const code = joinCode.trim().toUpperCase();
      if (code.length < 4) throw new Error("Geçerli oda kodunu yaz.");
      const { data: foundRoom, error: roomError } = await supabase.from("rooms").select("*").eq("code", code).eq("status", "waiting").maybeSingle();
      if (roomError) throw roomError;
      if (!foundRoom) throw new Error("Açık bir oda bulunamadı. Kodu kontrol et.");

      const { error: playerError } = await supabase.from("players").insert({ room_id: foundRoom.id, user_id: userId, nickname: cleanName });
      if (playerError?.code === "23505") throw new Error("Bu tarayıcı zaten odaya katılmış.");
      if (playerError) throw playerError;
      const { data: player, error: playerReadError } = await supabase.from("players").select("*").eq("room_id", foundRoom.id).eq("user_id", userId).single();
      if (playerReadError) throw playerReadError;
      setPlayers([player as Player]);
      setAnswers([]);
      setRoom(foundRoom as Room);
    } catch (joinError) {
      setError(errorMessage(joinError));
    } finally {
      setBusy(false);
    }
  }

  async function toggleReady() {
    if (!ownPlayer) return;
    setError("");
    const { error: readyError } = await supabase.from("players").update({ ready: !ownPlayer.ready }).eq("id", ownPlayer.id);
    if (readyError) setError(errorMessage(readyError));
  }

  async function startDuel() {
    if (!room || !isHost || players.length < 2 || !players.every((player) => player.ready)) return;
    setError("");
    const { error: startError } = await supabase.from("rooms").update({ status: "playing", current_question: 0, started_at: new Date().toISOString() }).eq("id", room.id);
    if (startError) setError(errorMessage(startError));
  }

  async function submitAnswer(option: number) {
    if (!room || !ownPlayer || !currentQuestion || ownAnswer) return;
    const responseMs = elapsedSeconds * 1000;
    const correct = option === currentQuestion.answer;
    const speedBonus = correct ? Math.max(0, 500 - Math.floor(responseMs / 40)) : 0;
    const points = correct ? 1000 + speedBonus : 0;
    setError("");

    const { error: answerError } = await supabase.from("answers").insert({
      room_id: room.id,
      player_id: ownPlayer.id,
      user_id: userId,
      question_id: currentQuestion.id,
      question_index: room.current_question,
      selected_option: option,
      is_correct: correct,
      response_ms: responseMs,
      points,
    });
    if (answerError) {
      setError(errorMessage(answerError));
      return;
    }

    setAnswers((current) => [...current, {
      id: `local-${currentQuestion.id}`,
      room_id: room.id,
      player_id: ownPlayer.id,
      user_id: userId!,
      question_id: currentQuestion.id,
      question_index: room.current_question,
      selected_option: option,
      is_correct: correct,
      response_ms: responseMs,
      points,
    }]);

    const { error: scoreError } = await supabase.from("players").update({
      score: ownPlayer.score + points,
      correct_count: ownPlayer.correct_count + (correct ? 1 : 0),
      wrong_count: ownPlayer.wrong_count + (correct ? 0 : 1),
    }).eq("id", ownPlayer.id);
    if (scoreError) setError(errorMessage(scoreError));
  }

  async function nextQuestion() {
    if (!room || !isHost || !allAnswered) return;
    const lastQuestion = room.current_question >= room.question_ids.length - 1;
    const { error: nextError } = await supabase.from("rooms").update(lastQuestion
      ? { status: "finished", finished_at: new Date().toISOString() }
      : { current_question: room.current_question + 1 }
    ).eq("id", room.id);
    if (nextError) setError(errorMessage(nextError));
  }

  async function copyRoomCode() {
    if (!room) return;
    await navigator.clipboard.writeText(room.code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  async function leaveRoom() {
    if (room && ownPlayer) {
      if (isHost) await supabase.from("rooms").delete().eq("id", room.id);
      else await supabase.from("players").delete().eq("id", ownPlayer.id);
    }
    setRoom(null);
    setPlayers([]);
    setAnswers([]);
    setJoinCode("");
  }

  if (!room) {
    return <div className="page duel-page">
      <p className="eyebrow">V0.11.0 • GERÇEK ZAMANLI</p>
      <h1>Canlı Düello</h1>
      <p className="lead">Arkadaşını odaya çağır, aynı 10 soruyu çöz ve hem bilgi hem hız puanıyla yarış.</p>
      <div className="duel-intro">
        <section className="duel-entry">
          <label><span>OYUNCU ADIN</span><input value={nickname} maxLength={24} onChange={(event) => setNickname(event.target.value)} placeholder="Oyuncu adını yaz" autoComplete="nickname" /></label>
          <button className="primary duel-create" disabled={!userId || busy} onClick={() => void createRoom()}>{busy ? "Bağlanıyor..." : "Yeni oda oluştur"} <span>→</span></button>
          <div className="duel-divider"><span>veya oda koduyla katıl</span></div>
          <div className="duel-join"><input value={joinCode} maxLength={8} onChange={(event) => setJoinCode(event.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ""))} placeholder="ODA KODU" aria-label="Oda kodu" /><button className="ghost" disabled={!userId || busy} onClick={() => void joinRoom()}>Odaya katıl</button></div>
          {error && <div className="duel-error" role="alert">⚠ {error}</div>}
          {!userId && !error && <div className="duel-connecting">● Güvenli oyun bağlantısı kuruluyor…</div>}
        </section>
        <aside className="duel-rules">
          <span className="duel-badge">2 OYUNCU</span>
          <h2>Yarışma nasıl işliyor?</h2>
          <ol><li><b>01</b><span>Oda kodunu arkadaşına gönder.</span></li><li><b>02</b><span>İkiniz de hazır olduğunuzda başlat.</span></li><li><b>03</b><span>Doğru ve hızlı cevapla daha çok puan al.</span></li></ol>
          <small>Hesap açmanız gerekmez. Oyuncu kimliği yalnızca bu tarayıcıda tutulur.</small>
        </aside>
      </div>
    </div>;
  }

  if (room.status === "waiting") {
    const canStart = players.length >= 2 && players.every((player) => player.ready);
    return <div className="page duel-page">
      <p className="eyebrow">CANLI DÜELLO • BEKLEME ODASI</p>
      <div className="duel-room-heading"><div><h1>Rakibini bekle</h1><p className="lead">Oda kodunu arkadaşına gönder. İkiniz de hazır olduğunuzda yarış başlayacak.</p></div><button className="duel-room-code" onClick={() => void copyRoomCode()}><small>ODA KODU</small><strong>{room.code}</strong><span>{copied ? "Kopyalandı ✓" : "Kopyala"}</span></button></div>
      <section className="duel-lobby">
        <div className="duel-player-list"><header><h2>Oyuncular</h2><span>{players.length}/2 bağlandı</span></header>{players.map((player, index) => <article key={player.id} className={player.ready ? "ready" : ""}><span className="duel-avatar">{player.nickname.slice(0, 1).toUpperCase()}</span><div><strong>{player.nickname}</strong><small>{player.user_id === room.host_id ? "Oda kurucusu" : `Rakip ${index + 1}`}</small></div><em>{player.ready ? "HAZIR ✓" : "BEKLİYOR"}</em></article>)}{players.length < 2 && <div className="duel-empty-player"><span>+</span><p>Arkadaşın <strong>{room.code}</strong> koduyla katılabilir.</p></div>}</div>
        <aside className="duel-lobby-actions"><span className="duel-badge">10 SORU</span><h2>Hazır mısın?</h2><p>Her doğru cevap 1.000 puan getirir. İlk 20 saniyede cevap verirsen hız puanı da kazanırsın.</p><button className={ownPlayer?.ready ? "ghost ready-button" : "primary"} onClick={() => void toggleReady()}>{ownPlayer?.ready ? "Hazırım ✓" : "Hazır olduğumu bildir"}</button>{isHost ? <button className="primary start-duel" disabled={!canStart} onClick={() => void startDuel()}>{players.length < 2 ? "Rakip bekleniyor" : !canStart ? "Herkes hazır olmalı" : "Düelloyu başlat →"}</button> : <small>Yarışmayı oda kurucusu başlatacak.</small>}<button className="duel-leave" onClick={() => void leaveRoom()}>Odadan ayrıl</button>{error && <div className="duel-error" role="alert">⚠ {error}</div>}</aside>
      </section>
    </div>;
  }

  if (room.status === "finished") {
    return <div className="page duel-page">
      <p className="eyebrow">DÜELLO TAMAMLANDI</p>
      <h1>Sonuçlar</h1>
      <p className="lead">Bilgi ve cevaplama hızına göre final sıralaması.</p>
      <section className="duel-results">{ranking.map((player, index) => <article key={player.id} className={index === 0 ? "winner" : ""}><span>{index === 0 ? "♛" : index + 1}</span><div><small>{index === 0 ? "DÜELLO GALİBİ" : "İKİNCİ"}</small><strong>{player.nickname}</strong><p>{player.correct_count} doğru · {player.wrong_count} yanlış</p></div><b>{player.score}<small> PUAN</small></b></article>)}</section>
      <div className="duel-finish-actions"><button className="primary" onClick={() => void leaveRoom()}>Yeni düello oluştur</button><button className="ghost" onClick={() => void leaveRoom()}>Düellodan çık</button></div>
    </div>;
  }

  if (!currentQuestion) return <div className="page duel-page"><div className="duel-error">Soru yüklenemedi. Odayı kapatıp tekrar deneyin.</div></div>;

  return <div className="page duel-page duel-playing">
    <header className="duel-game-top"><div><span>ODA {room.code}</span><strong>Soru {room.current_question + 1} / {room.question_ids.length}</strong></div><div className="duel-live"><i /> CANLI</div><div className="duel-clock"><small>CEVAP SÜRESİ</small><strong>{elapsedSeconds}s</strong></div></header>
    <div className="duel-game-layout">
      <section className="duel-question-card">
        <div className="question-meta"><span>{currentQuestion.course}</span><span>Ünite {currentQuestion.unit}</span></div>
        <h1>{currentQuestion.prompt}</h1>
        <div className="duel-options">{currentQuestion.options.map((option, index) => {
          const state = ownAnswer ? index === currentQuestion.answer ? "correct" : index === ownAnswer.selected_option ? "wrong" : "muted" : "";
          return <button key={option} className={state} disabled={Boolean(ownAnswer)} onClick={() => void submitAnswer(index)}><span>{String.fromCharCode(65 + index)}</span>{option}</button>;
        })}</div>
        {ownAnswer && <div className={ownAnswer.is_correct ? "duel-feedback correct" : "duel-feedback wrong"}><strong>{ownAnswer.is_correct ? `Doğru! +${ownAnswer.points} puan` : `Doğru cevap: ${String.fromCharCode(65 + currentQuestion.answer)}`}</strong><p>{currentQuestion.explanation}</p></div>}
        <div className="duel-next-row"><span>{currentAnswers.length}/{players.length} oyuncu cevapladı</span>{isHost ? <button className="primary" disabled={!allAnswered} onClick={() => void nextQuestion()}>{allAnswered ? room.current_question === room.question_ids.length - 1 ? "Sonuçları göster →" : "Sıradaki soru →" : "Rakibin cevabı bekleniyor"}</button> : <em>{allAnswered ? "Oda kurucusu sıradaki soruya geçecek." : "Rakibin cevabı bekleniyor…"}</em>}</div>
      </section>
      <aside className="duel-scoreboard"><p className="eyebrow">CANLI SKOR</p>{ranking.map((player, index) => {
        const answered = currentAnswers.some((answer) => answer.player_id === player.id);
        return <article key={player.id} className={player.user_id === userId ? "you" : ""}><span>{index + 1}</span><div><strong>{player.nickname}</strong><small>{answered ? "Cevapladı ✓" : "Soruyu çözüyor…"}</small></div><b>{player.score}</b></article>;
      })}<div className="duel-score-note"><span>⚡</span><p>İlk 20 saniyedeki doğru cevaplara hız puanı eklenir.</p></div>{error && <div className="duel-error" role="alert">⚠ {error}</div>}</aside>
    </div>
  </div>;
}
