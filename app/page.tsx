"use client";

import { useEffect, useMemo, useState } from "react";
import { Course, Question, Unit, courses, questions } from "./study-data";
import { examGuides } from "./exam-guides";
import { historyDeepDives } from "./history-deep-dives";
import LiveDuel from "./live-duel";

type View = "dashboard" | "duel" | "search" | "review" | "focus" | "progress" | "course" | "quiz" | "mistakes" | "sources";
type Theme = "light" | "dark";
type StoredState = {
  completed: string[];
  mistakes: string[];
  answered: number;
  correct: number;
  bookmarks: string[];
  notes: Record<string, string>;
  focusMinutes: number;
  focusSessions: number;
};

const initialStore: StoredState = { completed: [], mistakes: [], answered: 0, correct: 0, bookmarks: [], notes: {}, focusMinutes: 0, focusSessions: 0 };
const lastUnitStorageKey = "aof-gecis-kampi-last-unit";

function normalizeSearch(value: string) {
  return value.toLocaleLowerCase("tr-TR").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function daysToExam() {
  const now = new Date();
  const exam = new Date("2026-08-22T09:30:00+03:00");
  return Math.max(0, Math.ceil((exam.getTime() - now.getTime()) / 86_400_000));
}

function shuffle<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

export default function Home() {
  const [view, setView] = useState<View>("dashboard");
  const [selectedCourse, setSelectedCourse] = useState<Course>(courses[0]);
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [store, setStore] = useState<StoredState>(initialStore);
  const [ready, setReady] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");
  const [quiz, setQuiz] = useState<Question[]>([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [quizCorrect, setQuizCorrect] = useState(0);
  const [quizWrong, setQuizWrong] = useState(0);
  const [quizBlank, setQuizBlank] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [lastUnitId, setLastUnitId] = useState<string | null>(null);
  const [focusDuration, setFocusDuration] = useState(25);
  const [focusSeconds, setFocusSeconds] = useState(25 * 60);
  const [focusRunning, setFocusRunning] = useState(false);
  const [focusCompleted, setFocusCompleted] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const saved = window.localStorage.getItem("aof-gecis-kampi-v1");
      if (saved) {
        try {
          const parsed = JSON.parse(saved) as Partial<StoredState>;
          const parsedNotes = parsed.notes && typeof parsed.notes === "object" ? Object.fromEntries(Object.entries(parsed.notes).filter((entry): entry is [string, string] => typeof entry[1] === "string")) : {};
          setStore({
            completed: Array.isArray(parsed.completed) ? parsed.completed : [],
            mistakes: Array.isArray(parsed.mistakes) ? parsed.mistakes : [],
            answered: typeof parsed.answered === "number" ? parsed.answered : 0,
            correct: typeof parsed.correct === "number" ? parsed.correct : 0,
            bookmarks: Array.isArray(parsed.bookmarks) ? parsed.bookmarks : [],
            notes: parsedNotes,
            focusMinutes: typeof parsed.focusMinutes === "number" ? parsed.focusMinutes : 0,
            focusSessions: typeof parsed.focusSessions === "number" ? parsed.focusSessions : 0,
          });
        } catch { setStore(initialStore); }
      }
      const savedTheme = window.localStorage.getItem("aof-gecis-kampi-theme");
      const preferredTheme: Theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      setTheme(savedTheme === "dark" || savedTheme === "light" ? savedTheme : preferredTheme);
      const savedUnitId = window.localStorage.getItem(lastUnitStorageKey);
      if (savedUnitId && courses.some((course) => course.units.some((unit) => unit.id === savedUnitId))) setLastUnitId(savedUnitId);
      setReady(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (ready) window.localStorage.setItem("aof-gecis-kampi-v1", JSON.stringify(store));
  }, [store, ready]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    if (ready) window.localStorage.setItem("aof-gecis-kampi-theme", theme);
  }, [theme, ready]);

  useEffect(() => {
    if (ready && lastUnitId) window.localStorage.setItem(lastUnitStorageKey, lastUnitId);
  }, [lastUnitId, ready]);

  useEffect(() => {
    if (!focusRunning) return;
    const timer = window.setTimeout(() => {
      if (focusSeconds <= 1) {
        setFocusSeconds(0);
        setFocusRunning(false);
        setFocusCompleted(true);
        setStore((prev) => ({ ...prev, focusMinutes: prev.focusMinutes + focusDuration, focusSessions: prev.focusSessions + 1 }));
      } else setFocusSeconds(focusSeconds - 1);
    }, 1000);
    return () => window.clearTimeout(timer);
  }, [focusDuration, focusRunning, focusSeconds]);

  const totalUnits = courses.reduce((sum, course) => sum + course.units.length, 0);
  const completion = Math.round((store.completed.length / totalUnits) * 100);
  const accuracy = store.answered ? Math.round((store.correct / store.answered) * 100) : 0;

  const todaysUnits = useMemo(() => {
    const unfinished = courses.flatMap((course) => course.units.map((unit) => ({ course, unit })))
      .filter(({ unit }) => !store.completed.includes(unit.id));
    return unfinished.slice(0, 5);
  }, [store.completed]);

  const lastUnit = useMemo(() => courses.flatMap((course) => course.units.map((unit, index) => ({ course, unit, unitNumber: index + 1 }))).find(({ unit }) => unit.id === lastUnitId), [lastUnitId]);

  const searchResults = useMemo(() => {
    const query = normalizeSearch(searchQuery.trim());
    if (!query) return [];
    return courses.flatMap((course) => course.units.map((unit, index) => {
      const guide = examGuides[unit.id];
      const deepDive = historyDeepDives[unit.id] ?? [];
      const searchable = normalizeSearch([
        course.code,
        course.title,
        course.short,
        unit.title,
        unit.summary,
        ...unit.keyPoints,
        ...unit.keywords,
        ...guide.signals,
        ...guide.patterns,
        guide.trap,
        guide.hook,
        ...guide.lesson,
        ...deepDive.flatMap((section) => [section.title, section.body]),
      ].join(" "));
      return { course, unit, unitNumber: index + 1, matches: searchable.includes(query) };
    })).filter((result) => result.matches);
  }, [searchQuery]);

  const reviewUnits = useMemo(() => courses.flatMap((course) => course.units.map((unit, index) => ({ course, unit, unitNumber: index + 1 }))).filter(({ unit }) => store.bookmarks.includes(unit.id) || Boolean(store.notes[unit.id]?.trim())), [store.bookmarks, store.notes]);

  function openCourse(course: Course) {
    setSelectedCourse(course);
    setSelectedUnit(null);
    setView("course");
  }

  function openUnit(course: Course, unit: Unit) {
    setSelectedCourse(course);
    setSelectedUnit(unit);
    setLastUnitId(unit.id);
    setView("course");
  }

  function toggleUnit(id: string) {
    setStore((prev) => ({
      ...prev,
      completed: prev.completed.includes(id) ? prev.completed.filter((item) => item !== id) : [...prev.completed, id],
    }));
  }

  function toggleBookmark(id: string) {
    setStore((prev) => ({
      ...prev,
      bookmarks: prev.bookmarks.includes(id) ? prev.bookmarks.filter((item) => item !== id) : [...prev.bookmarks, id],
    }));
  }

  function updateNote(id: string, note: string) {
    setStore((prev) => ({ ...prev, notes: { ...prev.notes, [id]: note } }));
  }

  function chooseFocusDuration(minutes: number) {
    setFocusDuration(minutes);
    setFocusSeconds(minutes * 60);
    setFocusRunning(false);
    setFocusCompleted(false);
  }

  function toggleFocusTimer() {
    if (focusSeconds === 0) setFocusSeconds(focusDuration * 60);
    setFocusCompleted(false);
    setFocusRunning((running) => !running);
  }

  function resetFocusTimer() {
    setFocusSeconds(focusDuration * 60);
    setFocusRunning(false);
    setFocusCompleted(false);
  }

  function startQuiz(courseCode?: string, mistakeOnly = false, unitNumber?: number) {
    let pool = questions;
    if (mistakeOnly) pool = questions.filter((question) => store.mistakes.includes(question.id));
    else if (courseCode) pool = questions.filter((question) => question.course === courseCode);
    if (unitNumber) pool = pool.filter((question) => question.unit === unitNumber);
    const next = shuffle(pool).slice(0, Math.min(10, pool.length));
    if (!next.length) return;
    setQuiz(next);
    setQuizIndex(0);
    setPicked(null);
    setQuizCorrect(0);
    setQuizWrong(0);
    setQuizBlank(0);
    setShowResult(false);
    setView("quiz");
  }

  function answerQuestion(option: number) {
    if (picked !== null) return;
    const current = quiz[quizIndex];
    const correct = option === current.answer;
    setPicked(option);
    setQuizCorrect((value) => value + (correct ? 1 : 0));
    setQuizWrong((value) => value + (correct ? 0 : 1));
    setStore((prev) => ({
      ...prev,
      answered: prev.answered + 1,
      correct: prev.correct + (correct ? 1 : 0),
      mistakes: correct ? prev.mistakes.filter((id) => id !== current.id) : Array.from(new Set([...prev.mistakes, current.id])),
    }));
  }

  function nextQuestion(blank = false) {
    if (blank && picked === null) setQuizBlank((value) => value + 1);
    if (quizIndex === quiz.length - 1) setShowResult(true);
    else {
      setQuizIndex((value) => value + 1);
      setPicked(null);
    }
  }

  const currentQuestion = quiz[quizIndex];
  const net = quizCorrect - quizWrong / 4;
  const estimated = quiz.length ? Math.max(0, Math.round((net / quiz.length) * 100)) : 0;
  const focusClock = `${String(Math.floor(focusSeconds / 60)).padStart(2, "0")}:${String(focusSeconds % 60).padStart(2, "0")}`;
  const focusProgress = Math.round((1 - focusSeconds / (focusDuration * 60)) * 100);
  const focusTotal = store.focusMinutes >= 60 ? `${Math.floor(store.focusMinutes / 60)} sa ${store.focusMinutes % 60} dk` : `${store.focusMinutes} dk`;

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <button className="brand" onClick={() => setView("dashboard")} aria-label="Ana sayfa">
          <span className="brand-mark">A</span>
          <span><strong>AÖF Kampı</strong><small>22 Ağustos 2026</small></span>
        </button>

        <nav className="main-nav" aria-label="Ana menü">
          <button className={view === "dashboard" ? "active" : ""} onClick={() => setView("dashboard")}><span>⌂</span> Genel Bakış</button>
          <button className={view === "duel" ? "active" : ""} onClick={() => setView("duel")}><span>⚔</span> Canlı Düello</button>
          <button className={view === "search" ? "active" : ""} onClick={() => setView("search")}><span>⌕</span> İçerikte Ara</button>
          <button className={view === "review" ? "active" : ""} onClick={() => setView("review")}><span>★</span> Tekrar Panosu <em>{reviewUnits.length}</em></button>
          <button className={view === "focus" ? "active" : ""} onClick={() => setView("focus")}><span>◷</span> Odak Sayacı</button>
          <button className={view === "progress" ? "active" : ""} onClick={() => setView("progress")}><span>▦</span> İlerleme Haritası</button>
          <button className={view === "mistakes" ? "active" : ""} onClick={() => setView("mistakes")}><span>↺</span> Yanlışlarım <em>{store.mistakes.length}</em></button>
          <button onClick={() => startQuiz()}><span>▶</span> Karışık Deneme</button>
          <button className={view === "sources" ? "active" : ""} onClick={() => setView("sources")}><span>✓</span> Kaynak Kontrolü</button>
        </nav>

        <p className="nav-label">Dersler</p>
        <nav className="course-nav" aria-label="Dersler">
          {courses.map((course) => {
            const done = course.units.filter((unit) => store.completed.includes(unit.id)).length;
            return (
              <button key={course.code} onClick={() => openCourse(course)} className={view === "course" && selectedCourse.code === course.code ? "active" : ""}>
                <span className="course-dot" style={{ background: course.color }} />
                <span><strong>{course.short}</strong><small>{done}/8 ünite</small></span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-note">
          <span>Resmî kapsam: 1–8</span>
          <p>2025–2026 yaz okulu kılavuzuna göre her dersin bütün üniteleri sınav kapsamında.</p>
        </div>
      </aside>

      <section className="content">
        <header className="topbar">
          <div><span className="status-dot" /> Veriler bu cihazda saklanıyor</div>
          <div className="top-actions"><button className={focusRunning ? "focus-mini running" : "focus-mini"} onClick={() => setView("focus")}>{focusRunning ? `◉ ${focusClock}` : "◷ Odak"}</button><button className="theme-toggle" onClick={() => setTheme((current) => current === "dark" ? "light" : "dark")} aria-label={theme === "dark" ? "Açık temaya geç" : "Karanlık temaya geç"}>{theme === "dark" ? "☀ Açık" : "☾ Koyu"}</button><span className="date-pill">22 AĞU</span><button onClick={() => startQuiz()}>Hızlı deneme</button></div>
        </header>

        {view === "dashboard" && (
          <div className="page dashboard">
            <section className="hero-panel">
              <div>
                <p className="eyebrow">YAZ OKULU • 5 DERS • 40 ÜNİTE</p>
                <h1>Geçmek için ne çalışacağını<br />her gün netleştir.</h1>
                <p>Bütün üniteler kapsamda. 300 yaz okulu sorusu tarandı; tekrar eden kavramlar konu anlatımlarına ve sınav tuzaklarına dönüştürüldü.</p>
                <div className="hero-actions"><button className="primary" onClick={() => lastUnit ? openUnit(lastUnit.course, lastUnit.unit) : todaysUnits[0] && openUnit(todaysUnits[0].course, todaysUnits[0].unit)}>{lastUnit ? "Kaldığın yerden devam et" : "Bugünün planına başla"} <span>→</span></button><button className="ghost" onClick={() => setView("duel")}>Arkadaşınla yarış</button><button className="ghost" onClick={() => startQuiz()}>Seviye denemesi</button></div>
              </div>
              <div className="countdown-card">
                <span>Sınava kalan</span>
                <strong>{daysToExam()}</strong>
                <b>GÜN</b>
                <div className="mini-progress"><i style={{ width: `${Math.min(100, completion)}%` }} /></div>
                <small>{store.completed.length} / {totalUnits} ünite tamamlandı</small>
              </div>
            </section>

            {lastUnit && <button className="resume-card" onClick={() => openUnit(lastUnit.course, lastUnit.unit)} style={{ "--course-color": lastUnit.course.color } as React.CSSProperties}><span className="resume-icon">↗</span><span><small>KALDIĞIN YER</small><strong>{lastUnit.course.short} · Ünite {lastUnit.unitNumber}: {lastUnit.unit.title}</strong></span><em>Devam et →</em></button>}

            <section className="stat-grid">
              <article><span>Genel ilerleme</span><strong>%{completion}</strong><small>40 ünitenin {store.completed.length} tanesi tamam</small></article>
              <article><span>Soru doğruluğu</span><strong>%{accuracy}</strong><small>{store.answered || 0} cevap üzerinden</small></article>
              <article><span>Tekrar bekleyen</span><strong>{store.mistakes.length}</strong><small>yanlış soru</small></article>
              <article><span>Günlük hedef</span><strong>5</strong><small>ünite / yaklaşık 2,5 saat</small></article>
            </section>

            <div className="dashboard-grid">
              <section className="panel today-panel">
                <div className="panel-heading"><div><p className="eyebrow">BUGÜN</p><h2>Çalışma rotan</h2></div><span>{todaysUnits.length} görev</span></div>
                <div className="task-list">
                  {todaysUnits.length ? todaysUnits.map(({ course, unit }, index) => (
                    <button key={unit.id} onClick={() => openUnit(course, unit)}>
                      <span className="task-index">{String(index + 1).padStart(2, "0")}</span>
                      <span className="task-copy"><small style={{ color: course.color }}>{course.code}</small><strong>Ünite {course.units.indexOf(unit) + 1} · {unit.title}</strong><em>Konu anlatımı + soru sinyalleri + hafıza kancası</em></span>
                      <span className="task-arrow">→</span>
                    </button>
                  )) : <div className="empty-state"><strong>Tüm üniteler tamam!</strong><p>Şimdi karışık denemelerle bilgini sağlamlaştır.</p></div>}
                </div>
              </section>

              <section className="panel courses-panel">
                <div className="panel-heading"><div><p className="eyebrow">DERSLER</p><h2>Hızlı ders geçişi</h2></div><button className="panel-link" onClick={() => setView("progress")}>Haritayı aç →</button></div>
                <div className="course-cards">
                  {courses.map((course) => {
                    const done = course.units.filter((unit) => store.completed.includes(unit.id)).length;
                    return <button key={course.code} onClick={() => openCourse(course)}><span className="course-icon" style={{ background: `${course.color}1c`, color: course.color }}>{course.short.slice(0, 2).toUpperCase()}</span><span><small>{course.code}</small><strong>{course.title}</strong><i><b style={{ width: `${done * 12.5}%`, background: course.color }} /></i></span><em>{done}/8</em></button>;
                  })}
                </div>
              </section>
            </div>
          </div>
        )}

        {view === "duel" && <LiveDuel />}

        {view === "search" && (
          <div className="page search-page">
            <p className="eyebrow">40 ÜNİTENİN TAMAMINDA</p>
            <h1>İçerikte ara</h1>
            <p className="lead">Kavram, kişi, olay veya teknoloji yaz; özetleri, kritik bilgileri, sınav sinyallerini ve ayrıntılı anlatımları birlikte tara.</p>
            <label className="search-box">
              <span>⌕</span>
              <input autoFocus value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Örn. Mondros, PHP, TLS, Tevhid-i Tedrisat..." aria-label="Ders içeriklerinde ara" />
              {searchQuery && <button onClick={() => setSearchQuery("")} aria-label="Aramayı temizle">×</button>}
            </label>
            {!searchQuery.trim() ? <section className="search-empty"><strong>Neyi tekrar etmek istiyorsun?</strong><p>Bir örnek seçebilir veya yukarıya kendi aramanı yazabilirsin.</p><div>{["Mondros", "PHP", "TLS", "Tevhid-i Tedrisat"].map((example) => <button key={example} onClick={() => setSearchQuery(example)}>{example}</button>)}</div></section> : <>
              <div className="search-meta"><strong>{searchResults.length}</strong> ünite bulundu</div>
              <div className="search-results">{searchResults.map(({ course, unit, unitNumber }) => <button key={unit.id} className="search-result" onClick={() => openUnit(course, unit)} style={{ "--course-color": course.color } as React.CSSProperties}>
                <span className="search-result-number">{String(unitNumber).padStart(2, "0")}</span>
                <span className="search-result-copy"><small>{course.code} · {course.short}</small><strong>{unit.title}</strong><p>{unit.summary}</p><span>{[...unit.keywords, ...examGuides[unit.id].signals].slice(0, 4).map((keyword, index) => <em key={`${keyword}-${index}`}>{keyword}</em>)}</span></span>
                <span className="search-result-arrow">→</span>
              </button>)}</div>
              {!searchResults.length && <div className="empty-large"><span>⌕</span><h2>Sonuç bulunamadı</h2><p>Yazımı sadeleştirerek veya daha genel bir kavramla yeniden ara.</p></div>}
            </>}
          </div>
        )}

        {view === "review" && (
          <div className="page review-page">
            <p className="eyebrow">KİŞİSEL ÇALIŞMA ALANI</p>
            <h1>Tekrar Panosu</h1>
            <p className="lead">Zorlandığın üniteleri yıldızla, kendi notlarını ekle ve sınav öncesi tekrar edeceğin her şeyi burada topla.</p>
            <section className="review-summary">
              <article><span>★</span><div><strong>{store.bookmarks.length}</strong><small>tekrar ünitesi</small></div></article>
              <article><span>✎</span><div><strong>{Object.values(store.notes).filter((note) => note.trim()).length}</strong><small>kişisel not</small></div></article>
              <button className="primary" onClick={() => setView("progress")}>Haritadan ünite seç →</button>
            </section>
            {reviewUnits.length ? <div className="review-grid">{reviewUnits.map(({ course, unit, unitNumber }) => {
              const bookmarked = store.bookmarks.includes(unit.id);
              const note = store.notes[unit.id]?.trim();
              return <article key={unit.id} className="review-card" style={{ "--course-color": course.color } as React.CSSProperties}>
                <header><span>{course.code} · ÜNİTE {unitNumber}</span><button onClick={() => toggleBookmark(unit.id)} aria-label={bookmarked ? "Tekrar listesinden çıkar" : "Tekrar listesine ekle"}>{bookmarked ? "★" : "☆"}</button></header>
                <h2>{unit.title}</h2>
                {note ? <blockquote>{note}</blockquote> : <p>Bu ünite tekrar listende; kişisel not eklemek için anlatımı aç.</p>}
                <button className="review-open" onClick={() => openUnit(course, unit)}>Üniteyi aç →</button>
              </article>;
            })}</div> : <div className="empty-large"><span>★</span><h2>Tekrar panon boş</h2><p>Bir ünitenin anlatımını açıp “Tekrar listeme ekle” düğmesine bas veya kişisel not yaz.</p><button className="primary" onClick={() => setView("progress")}>Üniteleri incele</button></div>}
          </div>
        )}

        {view === "focus" && (
          <div className="page focus-page">
            <p className="eyebrow">DİKKATİ DAĞITMADAN ÇALIŞ</p>
            <h1>Odak Sayacı</h1>
            <p className="lead">Bir süre seç, tek üniteye odaklan ve tamamlanan çalışma oturumlarını cihazında biriktir.</p>
            <div className="focus-layout">
              <section className="focus-timer-panel">
                <div className="focus-presets" aria-label="Odak süresi seçimi">{[15, 25, 45].map((minutes) => <button key={minutes} className={focusDuration === minutes ? "active" : ""} onClick={() => chooseFocusDuration(minutes)}>{minutes} dk</button>)}</div>
                <div className="focus-ring" style={{ "--focus-progress": `${focusProgress * 3.6}deg` } as React.CSSProperties}><div><span>{focusRunning ? "ODAKLAN" : focusCompleted ? "TAMAMLANDI" : "HAZIR"}</span><strong>{focusClock}</strong><small>{focusProgress}% tamamlandı</small></div></div>
                {focusCompleted && <div className="focus-success">✓ Odak oturumu kaydedildi. Kısa bir mola ver.</div>}
                <div className="focus-actions"><button className="primary" onClick={toggleFocusTimer}>{focusRunning ? "Duraklat" : focusSeconds === focusDuration * 60 ? "Başlat" : focusSeconds === 0 ? "Yeniden başlat" : "Devam et"}</button><button className="ghost" onClick={resetFocusTimer}>Sıfırla</button></div>
                <p className="focus-hint">Sayaç başka bir sayfaya geçsen bile çalışmaya devam eder. Tamamlanan oturum süreleri otomatik kaydedilir.</p>
              </section>
              <aside className="focus-side">
                <section><p className="eyebrow">ODAK GEÇMİŞİ</p><div className="focus-stats"><article><strong>{store.focusSessions}</strong><span>tamamlanan oturum</span></article><article><strong>{focusTotal}</strong><span>toplam odak süresi</span></article></div></section>
                <section className="focus-target"><div><span>Önerilen günlük hedef</span><strong>4 × 25 dakika</strong></div><div className="course-progress-bar"><i style={{ width: `${Math.min(100, (store.focusMinutes / 100) * 100)}%` }} /></div><small>Her oturumdan sonra 5 dakika ara ver.</small></section>
                {lastUnit ? <button className="focus-current" onClick={() => openUnit(lastUnit.course, lastUnit.unit)} style={{ "--course-color": lastUnit.course.color } as React.CSSProperties}><small>ÇALIŞTIĞIN ÜNİTE</small><strong>{lastUnit.unit.title}</strong><span>Anlatımı aç →</span></button> : <button className="focus-current" onClick={() => setView("progress")}><small>ÇALIŞMA KONUSU</small><strong>Önce bir ünite seç</strong><span>Haritayı aç →</span></button>}
              </aside>
            </div>
          </div>
        )}

        {view === "progress" && (
          <div className="page progress-page">
            <section className="progress-heading">
              <div><p className="eyebrow">5 DERS • 40 ÜNİTE</p><h1>İlerleme Haritası</h1><p>Çalıştığın ve sırada bekleyen bütün üniteleri tek ekrandan takip et. Bir üniteye dokunarak doğrudan konu anlatımına geçebilirsin.</p></div>
              <div className="progress-total"><span>Genel tamamlanma</span><strong>%{completion}</strong><div><i style={{ width: `${completion}%` }} /></div><small>{store.completed.length} tamamlandı · {totalUnits - store.completed.length} ünite kaldı</small></div>
            </section>

            <div className="progress-legend" aria-label="İlerleme durumları"><span><i className="legend-done" /> Tamamlandı</span><span><i /> Çalışılacak</span></div>

            <section className="progress-course-list">
              {courses.map((course) => {
                const done = course.units.filter((unit) => store.completed.includes(unit.id)).length;
                return <article className="progress-course" key={course.code} style={{ "--course-color": course.color } as React.CSSProperties}>
                  <header>
                    <div className="progress-course-title"><span>{course.short.slice(0, 2).toUpperCase()}</span><div><small>{course.code}</small><h2>{course.title}</h2></div></div>
                    <div className="progress-course-score"><strong>{done}/8</strong><span>%{Math.round((done / 8) * 100)} tamamlandı</span></div>
                  </header>
                  <div className="course-progress-bar"><i style={{ width: `${done * 12.5}%` }} /></div>
                  <div className="progress-unit-grid">
                    {course.units.map((unit, index) => {
                      const completed = store.completed.includes(unit.id);
                      return <article className={completed ? "progress-unit done" : "progress-unit"} key={unit.id}>
                        <button className="progress-unit-open" onClick={() => openUnit(course, unit)}>
                          <small>ÜNİTE {String(index + 1).padStart(2, "0")}</small>
                          <strong>{unit.title}</strong>
                          <span>{completed ? "Tamamlandı" : "Konuya git"} →</span>
                        </button>
                        <button className="progress-unit-check" onClick={() => toggleUnit(unit.id)} aria-label={completed ? `${unit.title} ünitesini tamamlanmadı işaretle` : `${unit.title} ünitesini tamamlandı işaretle`}>{completed ? "✓" : ""}</button>
                      </article>;
                    })}
                  </div>
                </article>;
              })}
            </section>
          </div>
        )}

        {view === "course" && (
          <div className="page course-page">
            <button className="back-link" onClick={() => { if (selectedUnit) setSelectedUnit(null); else setView("dashboard"); }}>← {selectedUnit ? "Ünitelere dön" : "Genel bakış"}</button>
            {!selectedUnit ? (
              <>
                <section className="course-header" style={{ "--course-color": selectedCourse.color } as React.CSSProperties}>
                  <div><p className="eyebrow">{selectedCourse.code} • 8 ÜNİTE</p><h1>{selectedCourse.title}</h1><p>Tüm üniteleri sırayla tamamla. Son dört üniteyi ihmal etme; ancak yaz okulunda bütün üniteler kapsamda.</p></div>
                  <button className="primary" onClick={() => startQuiz(selectedCourse.code)}>Ders denemesi <span>→</span></button>
                </section>
                <div className="unit-grid">
                  {selectedCourse.units.map((unit, index) => {
                    const done = store.completed.includes(unit.id);
                    return <article key={unit.id} className={done ? "done" : ""} onClick={() => openUnit(selectedCourse, unit)}>
                      <div className="unit-top"><span style={{ color: selectedCourse.color }}>ÜNİTE {String(index + 1).padStart(2, "0")}</span><button onClick={(event) => { event.stopPropagation(); toggleUnit(unit.id); }} aria-label={done ? "Tamamlanmadı işaretle" : "Tamamlandı işaretle"}>{done ? "✓" : ""}</button></div>
                      <h2>{unit.title}</h2><p>{unit.summary}</p><div className="tag-row">{examGuides[unit.id].signals.slice(0, 3).map((keyword) => <span key={keyword}>{keyword}</span>)}</div><em>Çıkmış soru odaklı anlatımı aç →</em>
                    </article>;
                  })}
                </div>
              </>
            ) : (
              <UnitStudy course={selectedCourse} unit={selectedUnit} completed={store.completed.includes(selectedUnit.id)} bookmarked={store.bookmarks.includes(selectedUnit.id)} note={store.notes[selectedUnit.id] ?? ""} onToggle={() => toggleUnit(selectedUnit.id)} onBookmark={() => toggleBookmark(selectedUnit.id)} onNote={(note) => updateNote(selectedUnit.id, note)} onQuiz={(unitNumber) => startQuiz(selectedCourse.code, false, unitNumber)} onCourseQuiz={() => startQuiz(selectedCourse.code)} onPrevious={selectedCourse.units.indexOf(selectedUnit) > 0 ? () => openUnit(selectedCourse, selectedCourse.units[selectedCourse.units.indexOf(selectedUnit) - 1]) : undefined} onNext={selectedCourse.units.indexOf(selectedUnit) < selectedCourse.units.length - 1 ? () => openUnit(selectedCourse, selectedCourse.units[selectedCourse.units.indexOf(selectedUnit) + 1]) : undefined} />
            )}
          </div>
        )}

        {view === "mistakes" && (
          <div className="page mistakes-page">
            <p className="eyebrow">AKILLI TEKRAR</p><h1>Yanlışlarım</h1><p className="lead">Yanlış cevapladığın sorular burada birikir. Doğru cevapladığında listeden otomatik çıkar.</p>
            {store.mistakes.length ? <><div className="mistake-summary"><strong>{store.mistakes.length}</strong><span>soru tekrar bekliyor</span><button className="primary" onClick={() => startQuiz(undefined, true)}>Yanlışları çöz</button></div><div className="mistake-list">{questions.filter((question) => store.mistakes.includes(question.id)).map((question) => <article key={question.id}><small>{question.course} • Ünite {question.unit}</small><strong>{question.prompt}</strong><p>{question.explanation}</p></article>)}</div></> : <div className="empty-large"><span>✓</span><h2>Bekleyen yanlış yok</h2><p>Deneme çözdükçe yanlış cevapların burada görünecek.</p><button className="primary" onClick={() => startQuiz()}>Karışık deneme başlat</button></div>}
          </div>
        )}

        {view === "sources" && (
          <div className="page sources-page">
            <p className="eyebrow">SON DENETİM • 10 AĞUSTOS 2026</p>
            <h1>Kaynak ve doğrulama kaydı</h1>
            <p className="lead">Buradaki ayrım önemli: ünite adları ve sınav kapsamı resmî Anadolu kaynaklarından doğrulandı. Konu öncelikleri, kamuya açık arşivdeki 300 yaz okulu sorusunun taranmasıyla çıkarıldı. Uygulamadaki {questions.length} deneme sorusu ise özgün hazırlanmıştır.</p>

            <section className="corpus-panel">
              <div><span>300</span><p>görsel soru<br />indirildi</p></div>
              <div><span>290</span><p>soru OCR ile<br />okunabildi</p></div>
              <div><span>15</span><p>ders–dönem<br />seti incelendi</p></div>
              <div><span>5</span><p>ders için<br />odak haritası</p></div>
            </section>

            <section className="scope-alert">
              <span>RESMÎ YAZ OKULU KURALI</span>
              <strong>Her dersin bütün üniteleri sınav kapsamında.</strong>
              <p>“Son dört ünite daha ağırlıklı çıkar” şeklinde resmî bir oran yayımlanmış değil. Son dört üniteye fazladan tekrar ayırmak yalnızca çalışma stratejisidir.</p>
              <a href="https://www.anadolu.edu.tr/uploads/anadolu/files/aof_kilavuz/6a0703c8af3bb.pdf" target="_blank" rel="noreferrer">2025–2026 Yaz Okulu Kılavuzu, s. 6 ↗</a>
            </section>

            <div className="verification-grid">
              {courses.map((course) => <article key={course.code}>
                <div className="verified-title"><i style={{ background: course.color }}>✓</i><div><small>{course.code}</small><h2>{course.title}</h2></div></div>
                <p>{course.verification}</p>
                <p className="archive-period"><strong>Soru örneklemi:</strong> {course.archivePeriods}; toplam 60 soru.</p>
                <div className="source-links"><a href={course.source} target="_blank" rel="noreferrer">Resmî ders içeriği ↗</a>{course.bookSource && <a href={course.bookSource} target="_blank" rel="noreferrer">Resmî kitap sayfası ↗</a>}<a href={course.archiveSource} target="_blank" rel="noreferrer">İncelenen açık arşiv ↗</a></div>
              </article>)}
            </div>

            <section className="method-panel">
              <h2>Kontrol yöntemi</h2>
              <ol>
                <li><span>1</span><p>Ders kodu ve adı, Anadolu Üniversitesi akademik ders sayfasıyla eşleştirildi.</p></li>
                <li><span>2</span><p>Sekiz ünite başlığı, resmî ders içeriği ve varsa Anadolu Kitap Satış sayfasındaki içindekilerle çapraz kontrol edildi.</p></li>
                <li><span>3</span><p>Yaz okulu kapsamı, 2025–2026 resmî kayıt kılavuzunun “Sınavda ilgili derse ait ünitelerin tamamından sorumludur” hükmüyle doğrulandı.</p></li>
                <li><span>4</span><p>Beş ders için üçer yaz okulu sınavındaki 300 soru görseli indirildi; 290 soru OCR ile okunup örneklem bütünlüğü kontrol edildi.</p></li>
                <li><span>5</span><p>Aynı kavramın farklı yazımları tek başlıkta birleştirildi; tekrar eden soru kalıpları, karıştırılan seçenekler ve anahtar kelimeler ünitelere eşlendi.</p></li>
                <li><span>6</span><p>Açık arşiv Anadolu Üniversitesi&apos;nin resmî sistemi değildir. Kesin soru metni ve cevap anahtarı için eKampüs esas alınmalıdır; burada soru metinleri kopyalanmadan analiz sonucu kullanılır.</p></li>
              </ol>
              <div className="official-links"><a href="https://www.anadolu.edu.tr/acikogretim/ogrenme-ortamlari/kitap-hizmetleri" target="_blank" rel="noreferrer">Güncel PDF’nin esas olduğunu açıklayan Kitap Hizmetleri ↗</a><a href="https://www.anadolu.edu.tr/acikogretim/sinavlar-ve-sorumluluk-uniteleri/sinav-tarihleri" target="_blank" rel="noreferrer">22 Ağustos sınav tarihi ↗</a><a href="https://www.anadolu.edu.tr/acikogretim/sinavlar-ve-sorumluluk-uniteleri/sinavyayinlamasistemi" target="_blank" rel="noreferrer">Resmî çıkmış sorular: eKampüs ↗</a></div>
            </section>
          </div>
        )}

        {view === "quiz" && currentQuestion && (
          <div className="page quiz-page">
            {!showResult ? <>
              <div className="quiz-top"><button className="back-link" onClick={() => setView("dashboard")}>× Denemeden çık</button><span>Soru {quizIndex + 1} / {quiz.length}</span></div>
              <div className="quiz-progress"><i style={{ width: `${((quizIndex + 1) / quiz.length) * 100}%` }} /></div>
              <section className="question-card">
                <div className="question-meta"><span>{currentQuestion.course}</span><span>Ünite {currentQuestion.unit}</span></div>
                <h1>{currentQuestion.prompt}</h1>
                <div className="option-list">
                  {currentQuestion.options.map((option, index) => {
                    const state = picked === null ? "" : index === currentQuestion.answer ? "correct" : index === picked ? "wrong" : "muted";
                    return <button key={option} className={state} onClick={() => answerQuestion(index)}><span>{String.fromCharCode(65 + index)}</span>{option}{state === "correct" && <b>✓</b>}{state === "wrong" && <b>×</b>}</button>;
                  })}
                </div>
                {picked !== null && <div className={picked === currentQuestion.answer ? "feedback correct" : "feedback wrong"}><strong>{picked === currentQuestion.answer ? "Doğru cevap" : `Doğru cevap: ${String.fromCharCode(65 + currentQuestion.answer)}`}</strong><p>{currentQuestion.explanation}</p></div>}
                <div className="question-actions"><span>{picked === null ? "Bilmiyorsan boş bırak; 4 yanlış 1 doğruyu götürüyor." : "Açıklamayı anladıysan devam et."}</span><button className="primary" onClick={() => nextQuestion(picked === null)}>{picked === null ? "Boş bırak" : quizIndex === quiz.length - 1 ? "Sonucu gör" : "Sonraki soru"} →</button></div>
              </section>
            </> : <section className="result-card"><span className="result-ring">%{estimated}</span><p className="eyebrow">DENEME TAMAMLANDI</p><h1>{estimated >= 70 ? "Gayet iyi gidiyorsun." : estimated >= 50 ? "Geçiş çizgisine yaklaşıyorsun." : "Yanlışları kapatıp yeniden dene."}</h1><div className="result-stats"><div><strong>{quizCorrect}</strong><span>Doğru</span></div><div><strong>{quizWrong}</strong><span>Yanlış</span></div><div><strong>{quizBlank}</strong><span>Boş</span></div><div><strong>{net.toFixed(2)}</strong><span>Net</span></div></div><p>Bu hesaplama çalışma tahminidir. Gerçek harf notu üniversitenin değerlendirme sistemine göre belirlenir.</p><div className="hero-actions"><button className="primary" onClick={() => startQuiz()}>Yeni deneme</button><button className="ghost" onClick={() => setView("mistakes")}>Yanlışları gör</button></div></section>}
          </div>
        )}
      </section>
    </main>
  );
}

function UnitStudy({ course, unit, completed, bookmarked, note, onToggle, onBookmark, onNote, onQuiz, onCourseQuiz, onPrevious, onNext }: { course: Course; unit: Unit; completed: boolean; bookmarked: boolean; note: string; onToggle: () => void; onBookmark: () => void; onNote: (note: string) => void; onQuiz: (unitNumber: number) => void; onCourseQuiz: () => void; onPrevious?: () => void; onNext?: () => void }) {
  const unitNumber = course.units.indexOf(unit) + 1;
  const guide = examGuides[unit.id];
  const deepDive = historyDeepDives[unit.id];
  const unitQuestionCount = questions.filter((question) => question.course === course.code && question.unit === unitNumber).length;
  return <div className="study-layout">
    <article className="study-main">
      <p className="eyebrow" style={{ color: course.color }}>{course.code} • ÜNİTE {unitNumber}</p><h1>{unit.title}</h1><p className="study-summary">{unit.summary}</p>
      <section className="must-know" style={{ "--course-color": course.color } as React.CSSProperties}>
        <header><div><span>SINAVLIK HIZLI ÖZET</span><h2>Bu üniteden mutlaka bil</h2></div><strong>{unit.keyPoints.length + guide.signals.length} kritik işaret</strong></header>
        <div className="must-know-grid">
          <div className="critical-facts"><h3>Kritik bilgiler</h3><ol>{unit.keyPoints.map((point, index) => <li key={point}><span>{index + 1}</span><p>{point}</p></li>)}</ol></div>
          <div className="keyword-box"><h3>Soruda görünce tanı</h3><div>{guide.signals.map((signal) => <span key={signal}>{signal}</span>)}</div><small>Bu ifadeler soru kökünde veya seçeneklerde geçtiğinde ünitenin ilgili kavramını hatırla.</small></div>
        </div>
        <div className="question-patterns"><h3>Soru kalıpları</h3><div>{guide.patterns.map((pattern, index) => <p key={pattern}><span>{index + 1}</span>{pattern}</p>)}</div></div>
        <div className="quick-recall"><div><span>⚠ KARIŞTIRMA</span><p>{guide.trap}</p></div><div><span>⏱ 2 DAKİKALIK TEKRAR</span><p>{guide.hook}</p></div></div>
        <div className="unit-check-action"><div><strong>Kendini kontrol et</strong><small>{unitQuestionCount ? `Bu ünite için ${unitQuestionCount} özgün kontrol sorusu hazır.` : "Bu üniteye özel soru henüz yok; ders denemesinden devam edebilirsin."}</small></div><button className="primary" onClick={unitQuestionCount ? () => onQuiz(unitNumber) : onCourseQuiz}>{unitQuestionCount ? "Ünite sorusunu çöz" : "Ders denemesini aç"} →</button></div>
      </section>
      <div className="exam-evidence"><span>ÇIKMIŞ SORU ANALİZİ</span><strong>3 yaz okulu • 60 soru / ders</strong><p>Bu ünitenin anlatımı, sorularda görülen kavram ve çeldirici kalıplarına göre genişletildi.</p></div>
      <section className="lesson-copy"><h2>Konuyu anlayarak öğren</h2>{guide.lesson.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{deepDive && <div className="deep-dive-sections">{deepDive.map((section, index) => <section key={section.title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{section.title}</h3><p>{section.body}</p></div></section>)}</div>}</section>
      <section><h2>Kavram kartları</h2><div className="flash-grid">{unit.keywords.map((keyword) => <div key={keyword}><span>KAVRAM</span><strong>{keyword}</strong><small>Kendi cümlenle açıklamayı dene.</small></div>)}</div></section>
      <section className="personal-notes"><header><div><span>KİŞİSEL NOT</span><h2>Bu üniteden aklında kalsın</h2></div><small>{note.length}/1200</small></header><textarea value={note} onChange={(event) => onNote(event.target.value)} maxLength={1200} placeholder="Örneğin: Birbirine karıştırdığım kavramlar, ezberlemem gereken tarih veya sınavdan önce tekrar bakacağım nokta..." aria-label={`${unit.title} için kişisel not`} /><p>Notun otomatik kaydedilir ve yalnızca bu cihazda saklanır.</p></section>
      <div className="source-note"><strong>10 Ağustos 2026 tarihinde doğrulandı</strong><p>{course.verification} Soru eğilimleri {course.archivePeriods} dönemlerinden çıkarıldı. Açık arşiv resmî değildir; kesin metin ve cevap anahtarı için eKampüs esas alınır.</p><div className="source-links"><a href={course.source} target="_blank" rel="noreferrer">Resmî ders içeriği ↗</a>{course.bookSource && <a href={course.bookSource} target="_blank" rel="noreferrer">Resmî kitap sayfası ↗</a>}<a href={course.archiveSource} target="_blank" rel="noreferrer">İncelenen soru arşivi ↗</a></div></div>
      <nav className="unit-navigator" aria-label="Üniteler arasında geçiş"><button onClick={onPrevious} disabled={!onPrevious}>← Önceki ünite</button><span>Ünite {unitNumber} / {course.units.length}</span><button onClick={onNext} disabled={!onNext}>Sonraki ünite →</button></nav>
    </article>
    <aside className="study-side"><span>Ünite durumu</span><strong>{completed ? "Tamamlandı" : "Çalışılıyor"}</strong><div className="mini-progress"><i style={{ width: completed ? "100%" : "35%", background: course.color }} /></div><button className="primary" onClick={onToggle}>{completed ? "Tamamlanmadı işaretle" : "Üniteyi tamamla"}</button><button className={bookmarked ? "ghost saved" : "ghost"} onClick={onBookmark}>{bookmarked ? "★ Tekrar listemde" : "☆ Tekrar listeme ekle"}</button><button className="ghost" onClick={unitQuestionCount ? () => onQuiz(unitNumber) : onCourseQuiz}>{unitQuestionCount ? "Bu üniteden soru çöz" : "Bu dersten soru çöz"}</button><small>İpucu: Hızlı özeti kapatıp üç kritik noktayı sesli anlatabiliyorsan üniteyi tamamla.</small></aside>
  </div>;
}
