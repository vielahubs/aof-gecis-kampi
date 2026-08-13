"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Course, Question, Unit, courses, questions } from "./study-data";
import { examGuides, getPatternAnswer } from "./exam-guides";
import { historyDeepDives } from "./history-deep-dives";
import LiveDuel from "./live-duel";

type View = "dashboard" | "daily-plan" | "weakness" | "timed-exam" | "quiz-history" | "duel" | "search" | "review" | "focus" | "progress" | "course" | "quiz" | "mistakes" | "sources";
type Theme = "light" | "dark";
type FocusMiniMode = "picture-in-picture" | "popup";
type DocumentPictureInPicture = {
  requestWindow: (options?: { width?: number; height?: number; preferInitialWindowPlacement?: boolean }) => Promise<Window>;
};

declare global {
  interface Window {
    documentPictureInPicture?: DocumentPictureInPicture;
  }
}
type QuizOrigin =
  | { kind: "mixed" }
  | { kind: "course"; courseCode: string }
  | { kind: "unit"; courseCode: string; unitNumber: number }
  | { kind: "mistakes" }
  | { kind: "timed"; courseCode?: string; duration: number };
type QuestionStat = { answered: number; correct: number; wrong: number; blank: number };
type ReviewCardStat = { known: number; repeat: number; lastReviewed: string };
type SmartReviewCard = { id: string; course: Course; unit: Unit; unitNumber: number; prompt: string; answer: string };
type DailyPlanTask = { id: string; kind: "unit" | "mistakes" | "quiz" | "review"; unitId?: string; minutes: number };
type DailyPlan = { date: string; minutes: number; tasks: DailyPlanTask[]; done: string[] };
type QuizAttempt = { id: string; date: string; label: string; questionCount: number; correct: number; wrong: number; blank: number; net: number; score: number; timed: boolean };
type StoredState = {
  completed: string[];
  mistakes: string[];
  answered: number;
  correct: number;
  bookmarks: string[];
  notes: Record<string, string>;
  focusMinutes: number;
  focusSessions: number;
  questionStats: Record<string, QuestionStat>;
  reviewCardStats: Record<string, ReviewCardStat>;
  quizHistory: QuizAttempt[];
  activityDates: string[];
  dailyPlan?: DailyPlan;
};

const initialStore: StoredState = { completed: [], mistakes: [], answered: 0, correct: 0, bookmarks: [], notes: {}, focusMinutes: 0, focusSessions: 0, questionStats: {}, reviewCardStats: {}, quizHistory: [], activityDates: [] };
const lastUnitStorageKey = "aof-gecis-kampi-last-unit";
const studySectionViews: View[] = ["daily-plan", "focus", "review", "search"];
const examSectionViews: View[] = ["timed-exam", "quiz-history", "quiz", "mistakes", "duel"];
const progressSectionViews: View[] = ["progress", "weakness", "sources"];
const focusMiniStyles = `
  :root { color-scheme: dark; font-family: Arial, Helvetica, sans-serif; background: #171a21; }
  * { box-sizing: border-box; }
  body { margin: 0; min-height: 100vh; background: #171a21; color: #fff; }
  button { font: inherit; cursor: pointer; }
  .focus-mini-player { min-height: 100vh; padding: 22px; display: flex; flex-direction: column; justify-content: center; }
  .focus-mini-player header { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
  .focus-mini-player header span { color: #ff9789; font-size: 10px; font-weight: 900; letter-spacing: .14em; }
  .focus-mini-player header i { color: #8d94a3; font-size: 10px; font-style: normal; }
  .focus-mini-player header i.running { color: #8ee2b4; }
  .focus-mini-player > strong { display: block; margin: 19px 0 5px; font: 900 54px/1 monospace; letter-spacing: -.06em; font-variant-numeric: tabular-nums; }
  .focus-mini-player > p { min-height: 17px; margin: 0 0 13px; color: #9299a8; font-size: 11px; }
  .focus-mini-presets { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; margin-bottom: 9px; }
  .focus-mini-presets button { min-height: 34px; border: 1px solid #3b414d; border-radius: 9px; background: #242933; color: #9da4b2; font-size: 10px; font-weight: 900; }
  .focus-mini-presets button.active { border-color: #ff705d; background: #3b2928; color: #ff9d91; }
  .focus-mini-custom { display: grid; grid-template-columns: 1fr auto; gap: 6px; margin-bottom: 10px; }
  .focus-mini-custom input { min-width: 0; height: 35px; border: 1px solid #3b414d; border-radius: 9px; background: #20242d; color: #fff; padding: 0 10px; outline: 0; }
  .focus-mini-custom button { border: 1px solid #474d5a; border-radius: 9px; background: #303641; color: #fff; padding: 0 12px; font-size: 10px; font-weight: 900; }
  .focus-mini-controls { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  .focus-mini-controls button { min-height: 43px; border-radius: 11px; border: 1px solid #404653; background: #2d323d; color: #fff; font-size: 11px; font-weight: 900; }
  .focus-mini-controls button:first-child { border-color: #ff705d; background: #ff705d; }
  .focus-mini-player > small { margin-top: 13px; color: #676e7c; font-size: 9px; text-align: center; }
`;

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

function localDateKey() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Istanbul" }).format(new Date());
}

function dateKeyOffset(offset: number) {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Istanbul" }).format(date);
}

function addStudyActivity(state: StoredState, date = localDateKey()): StoredState {
  return state.activityDates.includes(date) ? state : { ...state, activityDates: [...state.activityDates, date].slice(-400) };
}

function calculateStreaks(dates: string[]) {
  const unique = [...new Set(dates)].sort();
  let longest = 0;
  let run = 0;
  let previous = Number.NaN;
  unique.forEach((key) => {
    const day = Date.parse(`${key}T00:00:00Z`) / 86_400_000;
    run = day - previous === 1 ? run + 1 : 1;
    longest = Math.max(longest, run);
    previous = day;
  });
  const active = new Set(unique);
  let current = 0;
  const startOffset = active.has(localDateKey()) ? 0 : active.has(dateKeyOffset(-1)) ? -1 : 1;
  if (startOffset <= 0) {
    for (let offset = startOffset; active.has(dateKeyOffset(offset)); offset -= 1) current += 1;
  }
  return { current, longest };
}

function weaknessLevel(accuracy: number | null, activeMistakes: number) {
  if (accuracy === null && activeMistakes === 0) return { key: "unknown", label: "Veri yok" };
  if (activeMistakes > 0 || (accuracy !== null && accuracy < 50)) return { key: "critical", label: "Öncelikli" };
  if (accuracy !== null && accuracy < 70) return { key: "developing", label: "Geliştir" };
  if (accuracy !== null && accuracy < 85) return { key: "good", label: "İyi" };
  return { key: "strong", label: "Güçlü" };
}

function createQuizAttempt(origin: QuizOrigin, quizQuestions: Question[], correct: number, wrong: number, blank: number): QuizAttempt {
  let label = "Hızlı karışık deneme";
  if (origin.kind === "mistakes") label = "Yanlışlar tekrarı";
  else if (origin.kind === "unit") label = `${courses.find((item) => item.code === origin.courseCode)?.short ?? origin.courseCode} · Ünite ${origin.unitNumber}`;
  else if (origin.kind === "course") label = courses.find((item) => item.code === origin.courseCode)?.title ?? origin.courseCode;
  else if (origin.kind === "timed") label = origin.courseCode ? `${courses.find((item) => item.code === origin.courseCode)?.short ?? origin.courseCode} süreli deneme` : "5 ders süreli deneme";
  const net = correct - wrong / 4;
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    date: new Date().toISOString(),
    label,
    questionCount: quizQuestions.length,
    correct,
    wrong,
    blank,
    net: Number(net.toFixed(2)),
    score: quizQuestions.length ? Math.max(0, Math.round((net / quizQuestions.length) * 100)) : 0,
    timed: origin.kind === "timed",
  };
}

function splitSpeechText(text: string, maxLength = 420) {
  const sentences = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g)?.map((part) => part.trim()).filter(Boolean) ?? [text];
  const chunks: string[] = [];
  let current = "";
  sentences.forEach((sentence) => {
    if (current && `${current} ${sentence}`.length > maxLength) {
      chunks.push(current);
      current = sentence;
    } else current = current ? `${current} ${sentence}` : sentence;
  });
  if (current) chunks.push(current);
  return chunks;
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
  const [quizPicks, setQuizPicks] = useState<Record<string, number>>({});
  const [quizFlags, setQuizFlags] = useState<string[]>([]);
  const [quizBlankIds, setQuizBlankIds] = useState<string[]>([]);
  const [showBlankReview, setShowBlankReview] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [quizOrigin, setQuizOrigin] = useState<QuizOrigin>({ kind: "mixed" });
  const [quizSeconds, setQuizSeconds] = useState(0);
  const [quizEndsAt, setQuizEndsAt] = useState<number | null>(null);
  const [planMinutes, setPlanMinutes] = useState(60);
  const [searchQuery, setSearchQuery] = useState("");
  const [lastUnitId, setLastUnitId] = useState<string | null>(null);
  const [focusDuration, setFocusDuration] = useState(25);
  const [customFocusMinutes, setCustomFocusMinutes] = useState("30");
  const [focusSeconds, setFocusSeconds] = useState(25 * 60);
  const [focusRunning, setFocusRunning] = useState(false);
  const [focusCompleted, setFocusCompleted] = useState(false);
  const [focusEndsAt, setFocusEndsAt] = useState<number | null>(null);
  const [focusMiniWindow, setFocusMiniWindow] = useState<Window | null>(null);
  const [focusMiniRoot, setFocusMiniRoot] = useState<HTMLElement | null>(null);
  const [focusMiniMode, setFocusMiniMode] = useState<FocusMiniMode | null>(null);
  const [reviewDeck, setReviewDeck] = useState<string[]>([]);
  const [reviewCardIndex, setReviewCardIndex] = useState(0);
  const [reviewCardRevealed, setReviewCardRevealed] = useState(false);
  const [reviewSessionFinished, setReviewSessionFinished] = useState(false);
  const [reviewKnown, setReviewKnown] = useState(0);
  const [reviewRepeat, setReviewRepeat] = useState(0);
  const [audioCourse, setAudioCourse] = useState<Course | null>(null);
  const [audioUnit, setAudioUnit] = useState<Unit | null>(null);
  const [audioIndex, setAudioIndex] = useState(0);
  const [audioTotal, setAudioTotal] = useState(0);
  const [audioStatus, setAudioStatus] = useState<"idle" | "playing" | "paused">("idle");
  const [audioRate, setAudioRate] = useState(1);
  const [audioSupported, setAudioSupported] = useState(true);
  const audioSegmentsRef = useRef<string[]>([]);
  const audioIndexRef = useRef(0);
  const audioRateRef = useRef(1);
  const audioSessionRef = useRef(0);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const saved = window.localStorage.getItem("aof-gecis-kampi-v1");
      if (saved) {
        try {
          const parsed = JSON.parse(saved) as Partial<StoredState>;
          const parsedNotes = parsed.notes && typeof parsed.notes === "object" ? Object.fromEntries(Object.entries(parsed.notes).filter((entry): entry is [string, string] => typeof entry[1] === "string")) : {};
          const parsedQuestionStats = parsed.questionStats && typeof parsed.questionStats === "object" ? parsed.questionStats : {};
          const parsedReviewCardStats = parsed.reviewCardStats && typeof parsed.reviewCardStats === "object" ? parsed.reviewCardStats : {};
          const parsedQuizHistory = Array.isArray(parsed.quizHistory) ? parsed.quizHistory : [];
          const parsedActivityDates = Array.isArray(parsed.activityDates) ? parsed.activityDates.filter((date): date is string => typeof date === "string") : [];
          const parsedDailyPlan = parsed.dailyPlan && typeof parsed.dailyPlan === "object" && parsed.dailyPlan.date === localDateKey() ? parsed.dailyPlan : undefined;
          setStore({
            completed: Array.isArray(parsed.completed) ? parsed.completed : [],
            mistakes: Array.isArray(parsed.mistakes) ? parsed.mistakes : [],
            answered: typeof parsed.answered === "number" ? parsed.answered : 0,
            correct: typeof parsed.correct === "number" ? parsed.correct : 0,
            bookmarks: Array.isArray(parsed.bookmarks) ? parsed.bookmarks : [],
            notes: parsedNotes,
            focusMinutes: typeof parsed.focusMinutes === "number" ? parsed.focusMinutes : 0,
            focusSessions: typeof parsed.focusSessions === "number" ? parsed.focusSessions : 0,
            questionStats: parsedQuestionStats,
            reviewCardStats: parsedReviewCardStats,
            quizHistory: parsedQuizHistory,
            activityDates: parsedActivityDates,
            dailyPlan: parsedDailyPlan,
          });
          if (parsedDailyPlan) setPlanMinutes(parsedDailyPlan.minutes);
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
    if (!focusRunning || !focusEndsAt) return;
    let sessionRecorded = false;
    const syncClock = () => {
      const remaining = Math.max(0, Math.ceil((focusEndsAt - Date.now()) / 1000));
      setFocusSeconds(remaining);
      if (remaining === 0 && !sessionRecorded) {
        sessionRecorded = true;
        setFocusRunning(false);
        setFocusEndsAt(null);
        setFocusCompleted(true);
        setStore((prev) => addStudyActivity({ ...prev, focusMinutes: prev.focusMinutes + focusDuration, focusSessions: prev.focusSessions + 1 }));
      }
    };
    syncClock();
    const timer = window.setInterval(syncClock, 250);
    return () => window.clearInterval(timer);
  }, [focusDuration, focusEndsAt, focusRunning]);

  useEffect(() => {
    if (quizOrigin.kind !== "timed" || showResult || !quizEndsAt) return;
    let finished = false;
    const syncClock = () => {
      const remaining = Math.max(0, Math.ceil((quizEndsAt - Date.now()) / 1000));
      setQuizSeconds(remaining);
      if (remaining === 0 && !finished) {
        finished = true;
        const unanswered = quiz.filter((question) => quizPicks[question.id] === undefined);
        setQuizBlank((value) => value + unanswered.length);
        setQuizBlankIds(unanswered.map((question) => question.id));
        setStore((prev) => {
          const questionStats = { ...prev.questionStats };
          unanswered.forEach((question) => {
            const current = questionStats[question.id] ?? { answered: 0, correct: 0, wrong: 0, blank: 0 };
            questionStats[question.id] = { ...current, blank: current.blank + 1 };
          });
          const blank = unanswered.length;
          const attempt = createQuizAttempt(quizOrigin, quiz, quizCorrect, quizWrong, blank);
          return addStudyActivity({ ...prev, questionStats, quizHistory: [attempt, ...prev.quizHistory].slice(0, 50) });
        });
        setQuizEndsAt(null);
        setShowResult(true);
      }
    };
    syncClock();
    const timer = window.setInterval(syncClock, 250);
    return () => window.clearInterval(timer);
  }, [quiz, quizCorrect, quizEndsAt, quizOrigin, quizPicks, quizWrong, showResult]);

  useEffect(() => () => {
    if (focusMiniWindow && !focusMiniWindow.closed) focusMiniWindow.close();
  }, [focusMiniWindow]);

  useEffect(() => {
    const supportCheck = window.setTimeout(() => setAudioSupported("speechSynthesis" in window && "SpeechSynthesisUtterance" in window), 0);
    return () => {
      window.clearTimeout(supportCheck);
      audioSessionRef.current += 1;
      window.speechSynthesis?.cancel();
    };
  }, []);

  const totalUnits = courses.reduce((sum, course) => sum + course.units.length, 0);
  const completion = Math.round((store.completed.length / totalUnits) * 100);
  const accuracy = store.answered ? Math.round((store.correct / store.answered) * 100) : 0;

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

  const reviewCards = useMemo<SmartReviewCard[]>(() => courses.flatMap((course) => course.units.flatMap((unit, unitIndex) => examGuides[unit.id].patterns.map((prompt, patternIndex) => ({
    id: `${unit.id}-pattern-${patternIndex}`,
    course,
    unit,
    unitNumber: unitIndex + 1,
    prompt,
    answer: getPatternAnswer(unit.id, patternIndex),
  })))), []);

  const unitPerformance = useMemo(() => courses.flatMap((course) => course.units.map((unit, index) => {
    const unitQuestions = questions.filter((question) => question.course === course.code && question.unit === index + 1);
    const totals = unitQuestions.reduce((sum, question) => {
      const stat = store.questionStats[question.id];
      if (!stat) return sum;
      return { attempts: sum.attempts + stat.answered + stat.blank, correct: sum.correct + stat.correct };
    }, { attempts: 0, correct: 0 });
    const activeMistakes = unitQuestions.filter((question) => store.mistakes.includes(question.id)).length;
    const reviewDue = reviewCards.filter((card) => card.unit.id === unit.id).filter((card) => {
      const stat = store.reviewCardStats[card.id];
      return stat && stat.repeat > stat.known;
    }).length;
    const accuracy = totals.attempts ? Math.round((totals.correct / totals.attempts) * 100) : null;
    return { course, unit, unitNumber: index + 1, attempts: totals.attempts, correct: totals.correct, activeMistakes, reviewDue, accuracy };
  })), [reviewCards, store.mistakes, store.questionStats, store.reviewCardStats]);

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

  function speakAudioSegment(index: number) {
    if (!("speechSynthesis" in window) || index < 0 || index >= audioSegmentsRef.current.length) {
      setAudioStatus("idle");
      return;
    }
    window.speechSynthesis.cancel();
    const session = ++audioSessionRef.current;
    const utterance = new SpeechSynthesisUtterance(audioSegmentsRef.current[index]);
    utterance.lang = "tr-TR";
    utterance.rate = audioRateRef.current;
    const turkishVoice = window.speechSynthesis.getVoices().find((voice) => voice.lang.toLocaleLowerCase("tr-TR").startsWith("tr"));
    if (turkishVoice) utterance.voice = turkishVoice;
    utterance.onend = () => {
      if (audioSessionRef.current !== session) return;
      const next = index + 1;
      if (next < audioSegmentsRef.current.length) speakAudioSegment(next);
      else setAudioStatus("idle");
    };
    utterance.onerror = () => {
      if (audioSessionRef.current === session) setAudioStatus("idle");
    };
    audioIndexRef.current = index;
    setAudioIndex(index);
    setAudioStatus("playing");
    window.speechSynthesis.speak(utterance);
  }

  function startAudioStudy(course: Course, unit: Unit) {
    if (!("speechSynthesis" in window)) {
      setAudioSupported(false);
      return;
    }
    const guide = examGuides[unit.id];
    const deepDive = historyDeepDives[unit.id] ?? [];
    const rawSegments = [
      `${course.title}. Ünite ${course.units.indexOf(unit) + 1}. ${unit.title}.`,
      `Ünite özeti. ${unit.summary}`,
      `Kritik bilgiler. ${unit.keyPoints.join(". ")}.`,
      `Soruda görünce tanıman gereken ifadeler. ${guide.signals.join(". ")}.`,
      ...guide.lesson,
      ...deepDive.flatMap((section) => [`${section.title}.`, section.body]),
      `Sık karıştırılan nokta. ${guide.trap}`,
      `İki dakikalık tekrar. ${guide.hook}`,
    ];
    const segments = rawSegments.flatMap((text) => splitSpeechText(text));
    audioSegmentsRef.current = segments;
    audioIndexRef.current = 0;
    setAudioCourse(course);
    setAudioUnit(unit);
    setAudioTotal(segments.length);
    speakAudioSegment(0);
  }

  function toggleAudioStudy() {
    if (!("speechSynthesis" in window) || !audioSegmentsRef.current.length) return;
    if (audioStatus === "playing") {
      window.speechSynthesis.pause();
      setAudioStatus("paused");
    } else if (audioStatus === "paused") {
      window.speechSynthesis.resume();
      setAudioStatus("playing");
    } else speakAudioSegment(audioIndexRef.current >= audioSegmentsRef.current.length - 1 ? 0 : audioIndexRef.current);
  }

  function skipAudioStudy(direction: -1 | 1) {
    const next = Math.min(audioSegmentsRef.current.length - 1, Math.max(0, audioIndexRef.current + direction));
    speakAudioSegment(next);
  }

  function changeAudioRate(rate: number) {
    audioRateRef.current = rate;
    setAudioRate(rate);
    if (audioStatus !== "idle") speakAudioSegment(audioIndexRef.current);
  }

  function closeAudioStudy() {
    audioSessionRef.current += 1;
    window.speechSynthesis?.cancel();
    audioSegmentsRef.current = [];
    setAudioStatus("idle");
    setAudioCourse(null);
    setAudioUnit(null);
    setAudioIndex(0);
    setAudioTotal(0);
  }

  function toggleUnit(id: string) {
    setStore((prev) => {
      const completing = !prev.completed.includes(id);
      const next = { ...prev, completed: completing ? [...prev.completed, id] : prev.completed.filter((item) => item !== id) };
      return completing ? addStudyActivity(next) : next;
    });
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

  function generateDailyPlan(minutes = planMinutes) {
    const date = localDateKey();
    const unitCount = minutes === 30 ? 1 : minutes === 60 ? 2 : 4;
    const ranked = [...unitPerformance]
      .sort((a, b) => {
        const score = (item: typeof a) => item.activeMistakes * 100 + item.reviewDue * 45 + (item.accuracy === null ? 0 : 100 - item.accuracy) + (store.bookmarks.includes(item.unit.id) ? 35 : 0) + (!store.completed.includes(item.unit.id) ? 20 : 0);
        return score(b) - score(a);
      })
      .slice(0, unitCount);
    const unitMinutes = 20;
    const assessmentMinutes = minutes === 30 ? 10 : minutes === 60 ? 15 : 30;
    const tasks: DailyPlanTask[] = ranked.map(({ unit }) => ({ id: `${date}-unit-${unit.id}`, kind: "unit", unitId: unit.id, minutes: unitMinutes }));
    tasks.push({ id: `${date}-${store.mistakes.length ? "mistakes" : "quiz"}`, kind: store.mistakes.length ? "mistakes" : "quiz", minutes: assessmentMinutes });
    if (minutes >= 60) tasks.push({ id: `${date}-review`, kind: "review", minutes: minutes === 60 ? 5 : 10 });
    setStore((prev) => ({ ...prev, dailyPlan: { date, minutes, tasks, done: [] } }));
  }

  function togglePlanTask(taskId: string) {
    setStore((prev) => {
      if (!prev.dailyPlan) return prev;
      const completing = !prev.dailyPlan.done.includes(taskId);
      const next = { ...prev, dailyPlan: { ...prev.dailyPlan, done: completing ? [...prev.dailyPlan.done, taskId] : prev.dailyPlan.done.filter((id) => id !== taskId) } };
      return completing ? addStudyActivity(next) : next;
    });
  }

  function runPlanTask(task: DailyPlanTask) {
    if (task.kind === "unit" && task.unitId) {
      const target = unitPerformance.find(({ unit }) => unit.id === task.unitId);
      if (target) openUnit(target.course, target.unit);
    } else if (task.kind === "mistakes") startQuiz(undefined, true);
    else if (task.kind === "quiz") startTimedExam(undefined, task.minutes);
    else setView("review");
  }

  function startSmartReview() {
    const ranked = shuffle(reviewCards).sort((a, b) => {
      const score = (card: SmartReviewCard) => {
        const stat = store.reviewCardStats[card.id];
        const performance = unitPerformance.find(({ unit }) => unit.id === card.unit.id);
        return Math.max(0, (stat?.repeat ?? 0) - (stat?.known ?? 0)) * 100 + (performance?.activeMistakes ?? 0) * 60 + (store.bookmarks.includes(card.unit.id) ? 35 : 0);
      };
      return score(b) - score(a);
    });
    setReviewDeck(ranked.slice(0, Math.min(15, ranked.length)).map((card) => card.id));
    setReviewCardIndex(0);
    setReviewCardRevealed(false);
    setReviewSessionFinished(false);
    setReviewKnown(0);
    setReviewRepeat(0);
  }

  function rateReviewCard(known: boolean) {
    const cardId = reviewDeck[reviewCardIndex];
    if (!cardId) return;
    setStore((prev) => {
      const stat = prev.reviewCardStats[cardId] ?? { known: 0, repeat: 0, lastReviewed: "" };
      return addStudyActivity({
        ...prev,
        reviewCardStats: {
          ...prev.reviewCardStats,
          [cardId]: { known: stat.known + (known ? 1 : 0), repeat: stat.repeat + (known ? 0 : 1), lastReviewed: new Date().toISOString() },
        },
      });
    });
    if (known) setReviewKnown((value) => value + 1);
    else setReviewRepeat((value) => value + 1);
    if (reviewCardIndex === reviewDeck.length - 1) setReviewSessionFinished(true);
    else {
      setReviewCardIndex((value) => value + 1);
      setReviewCardRevealed(false);
    }
  }

  function closeSmartReview() {
    setReviewDeck([]);
    setReviewCardIndex(0);
    setReviewCardRevealed(false);
    setReviewSessionFinished(false);
  }

  function chooseFocusDuration(minutes: number) {
    setFocusDuration(minutes);
    setFocusSeconds(minutes * 60);
    setFocusRunning(false);
    setFocusCompleted(false);
    setFocusEndsAt(null);
  }

  function applyCustomFocusDuration() {
    const parsed = Number.parseInt(customFocusMinutes, 10);
    if (!Number.isFinite(parsed)) return;
    const minutes = Math.min(120, Math.max(5, parsed));
    setCustomFocusMinutes(String(minutes));
    chooseFocusDuration(minutes);
  }

  function toggleFocusTimer() {
    if (focusRunning) {
      const remaining = focusEndsAt ? Math.max(0, Math.ceil((focusEndsAt - Date.now()) / 1000)) : focusSeconds;
      setFocusSeconds(remaining);
      setFocusEndsAt(null);
      setFocusRunning(false);
      return;
    }
    const remaining = focusSeconds === 0 ? focusDuration * 60 : focusSeconds;
    setFocusSeconds(remaining);
    setFocusCompleted(false);
    setFocusEndsAt(Date.now() + remaining * 1000);
    setFocusRunning(true);
  }

  function resetFocusTimer() {
    setFocusSeconds(focusDuration * 60);
    setFocusRunning(false);
    setFocusCompleted(false);
    setFocusEndsAt(null);
  }

  async function openFocusMiniWindow() {
    if (focusMiniWindow && !focusMiniWindow.closed) {
      focusMiniWindow.focus();
      return;
    }

    let miniWindow: Window | null = null;
    let mode: FocusMiniMode = "popup";
    try {
      if (window.documentPictureInPicture) {
        miniWindow = await window.documentPictureInPicture.requestWindow({ width: 380, height: 410, preferInitialWindowPlacement: true });
        mode = "picture-in-picture";
      } else {
        miniWindow = window.open("", "aof-focus-mini", "popup,width=380,height=410");
      }
    } catch {
      miniWindow = window.open("", "aof-focus-mini", "popup,width=380,height=410");
    }

    if (!miniWindow) return;
    miniWindow.document.title = "Kronometre";
    miniWindow.document.documentElement.lang = "tr";
    miniWindow.document.body.replaceChildren();
    miniWindow.document.head.querySelector("style[data-focus-mini]")?.remove();
    const style = miniWindow.document.createElement("style");
    style.dataset.focusMini = "true";
    style.textContent = focusMiniStyles;
    miniWindow.document.head.append(style);
    const root = miniWindow.document.createElement("div");
    miniWindow.document.body.append(root);
    miniWindow.addEventListener("pagehide", () => {
      setFocusMiniWindow((current) => current === miniWindow ? null : current);
      setFocusMiniRoot(null);
      setFocusMiniMode(null);
    }, { once: true });
    setFocusMiniWindow(miniWindow);
    setFocusMiniRoot(root);
    setFocusMiniMode(mode);
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
    setQuizPicks({});
    setQuizFlags([]);
    setQuizBlankIds([]);
    setShowBlankReview(false);
    setShowResult(false);
    setQuizSeconds(0);
    setQuizEndsAt(null);
    setQuizOrigin(mistakeOnly
      ? { kind: "mistakes" }
      : courseCode && unitNumber
        ? { kind: "unit", courseCode, unitNumber }
        : courseCode
          ? { kind: "course", courseCode }
          : { kind: "mixed" });
    setView("quiz");
  }

  function startTimedExam(courseCode?: string, requestedDuration?: number) {
    const pool = courseCode ? questions.filter((question) => question.course === courseCode) : questions;
    const questionCount = requestedDuration ? Math.min(pool.length, Math.max(5, Math.round(requestedDuration / 1.5))) : courseCode ? pool.length : Math.min(20, pool.length);
    const next = shuffle(pool).slice(0, questionCount);
    if (!next.length) return;
    const duration = requestedDuration ?? (courseCode ? Math.max(10, Math.ceil(next.length * 1.5)) : 30);
    setQuiz(next);
    setQuizIndex(0);
    setPicked(null);
    setQuizCorrect(0);
    setQuizWrong(0);
    setQuizBlank(0);
    setQuizPicks({});
    setQuizFlags([]);
    setQuizBlankIds([]);
    setShowBlankReview(false);
    setShowResult(false);
    setQuizOrigin({ kind: "timed", courseCode, duration });
    setQuizSeconds(duration * 60);
    setQuizEndsAt(Date.now() + duration * 60 * 1000);
    setView("quiz");
  }

  function leaveQuiz() {
    setQuizEndsAt(null);
    if (quizOrigin.kind === "unit") {
      const course = courses.find((item) => item.code === quizOrigin.courseCode);
      const unit = course?.units[quizOrigin.unitNumber - 1];
      if (course && unit) {
        openUnit(course, unit);
        return;
      }
    }
    if (quizOrigin.kind === "course") {
      const course = courses.find((item) => item.code === quizOrigin.courseCode);
      if (course) {
        openCourse(course);
        return;
      }
    }
    if (quizOrigin.kind === "timed") {
      setView("timed-exam");
      return;
    }
    setView(quizOrigin.kind === "mistakes" ? "mistakes" : "dashboard");
  }

  function restartQuiz() {
    if (quizOrigin.kind === "unit") startQuiz(quizOrigin.courseCode, false, quizOrigin.unitNumber);
    else if (quizOrigin.kind === "course") startQuiz(quizOrigin.courseCode);
    else if (quizOrigin.kind === "mistakes") startQuiz(undefined, true);
    else if (quizOrigin.kind === "timed") startTimedExam(quizOrigin.courseCode, quizOrigin.duration);
    else startQuiz();
  }

  function answerQuestion(option: number) {
    if (picked !== null || quizPicks[quiz[quizIndex].id] !== undefined) return;
    const current = quiz[quizIndex];
    const correct = option === current.answer;
    setPicked(option);
    setQuizPicks((prev) => ({ ...prev, [current.id]: option }));
    setQuizCorrect((value) => value + (correct ? 1 : 0));
    setQuizWrong((value) => value + (correct ? 0 : 1));
    setStore((prev) => ({
      ...prev,
      answered: prev.answered + 1,
      correct: prev.correct + (correct ? 1 : 0),
      mistakes: correct ? prev.mistakes.filter((id) => id !== current.id) : Array.from(new Set([...prev.mistakes, current.id])),
      questionStats: {
        ...prev.questionStats,
        [current.id]: {
          answered: (prev.questionStats[current.id]?.answered ?? 0) + 1,
          correct: (prev.questionStats[current.id]?.correct ?? 0) + (correct ? 1 : 0),
          wrong: (prev.questionStats[current.id]?.wrong ?? 0) + (correct ? 0 : 1),
          blank: prev.questionStats[current.id]?.blank ?? 0,
        },
      },
    }));
  }

  function goToQuizQuestion(index: number) {
    const nextQuestion = quiz[index];
    if (!nextQuestion) return;
    setQuizIndex(index);
    setPicked(quizPicks[nextQuestion.id] ?? null);
  }

  function nextQuestion() {
    goToQuizQuestion((quizIndex + 1) % quiz.length);
  }

  function toggleQuizFlag() {
    const current = quiz[quizIndex];
    setQuizFlags((prev) => prev.includes(current.id) ? prev.filter((id) => id !== current.id) : [...prev, current.id]);
  }

  function finishQuiz() {
    if (showResult) return;
    const unanswered = quiz.filter((question) => quizPicks[question.id] === undefined);
    setQuizBlank(unanswered.length);
    setQuizBlankIds(unanswered.map((question) => question.id));
    if (unanswered.length) {
      setStore((prev) => {
        const questionStats = { ...prev.questionStats };
        unanswered.forEach((question) => {
          const stat = questionStats[question.id] ?? { answered: 0, correct: 0, wrong: 0, blank: 0 };
          questionStats[question.id] = { ...stat, blank: stat.blank + 1 };
        });
        const attempt = createQuizAttempt(quizOrigin, quiz, quizCorrect, quizWrong, unanswered.length);
        return addStudyActivity({ ...prev, questionStats, quizHistory: [attempt, ...prev.quizHistory].slice(0, 50) });
      });
    } else setStore((prev) => addStudyActivity({ ...prev, quizHistory: [createQuizAttempt(quizOrigin, quiz, quizCorrect, quizWrong, 0), ...prev.quizHistory].slice(0, 50) }));
    setQuizEndsAt(null);
    setShowResult(true);
  }

  const currentQuestion = quiz[quizIndex];
  const net = quizCorrect - quizWrong / 4;
  const estimated = quiz.length ? Math.max(0, Math.round((net / quiz.length) * 100)) : 0;
  const focusClock = `${String(Math.floor(focusSeconds / 60)).padStart(2, "0")}:${String(focusSeconds % 60).padStart(2, "0")}`;
  const focusProgress = Math.round((1 - focusSeconds / (focusDuration * 60)) * 100);
  const focusTotal = store.focusMinutes >= 60 ? `${Math.floor(store.focusMinutes / 60)} sa ${store.focusMinutes % 60} dk` : `${store.focusMinutes} dk`;
  const timedClock = `${String(Math.floor(quizSeconds / 60)).padStart(2, "0")}:${String(quizSeconds % 60).padStart(2, "0")}`;
  const currentPlan = store.dailyPlan?.date === localDateKey() ? store.dailyPlan : undefined;
  const planProgress = currentPlan?.tasks.length ? Math.round((currentPlan.done.length / currentPlan.tasks.length) * 100) : 0;
  const weakestUnits = [...unitPerformance].filter(({ attempts, activeMistakes }) => attempts > 0 || activeMistakes > 0).sort((a, b) => b.activeMistakes - a.activeMistakes || (a.accuracy ?? 101) - (b.accuracy ?? 101)).slice(0, 5);
  const currentReviewCard = reviewCards.find((card) => card.id === reviewDeck[reviewCardIndex]);
  const reviewDueCount = reviewCards.filter((card) => {
    const stat = store.reviewCardStats[card.id];
    return stat && stat.repeat > stat.known;
  }).length;
  const reviewMasteredCount = reviewCards.filter((card) => {
    const stat = store.reviewCardStats[card.id];
    return stat && stat.known > stat.repeat;
  }).length;
  const streaks = calculateStreaks(store.activityDates);
  const streakWeek = Array.from({ length: 7 }, (_, index) => {
    const offset = index - 6;
    const key = dateKeyOffset(offset);
    const label = new Intl.DateTimeFormat("tr-TR", { weekday: "short", timeZone: "Europe/Istanbul" }).format(new Date(`${key}T12:00:00+03:00`)).slice(0, 2);
    return { key, label, active: store.activityDates.includes(key), today: offset === 0 };
  });
  const historyAverage = store.quizHistory.length ? Math.round(store.quizHistory.reduce((sum, attempt) => sum + attempt.score, 0) / store.quizHistory.length) : 0;
  const inStudySection = studySectionViews.includes(view);
  const inExamSection = examSectionViews.includes(view);
  const inProgressSection = progressSectionViews.includes(view);

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <button className="brand" onClick={() => setView("dashboard")} aria-label="Ana sayfa">
          <span className="brand-mark">A</span>
          <span><strong>AÖF Kampı</strong><small>22 Ağustos 2026</small></span>
        </button>

        <nav className="main-nav" aria-label="Ana menü">
          <button className={view === "dashboard" ? "active" : ""} onClick={() => setView("dashboard")}><span>⌂</span> Genel Bakış</button>
          <button className={inStudySection ? "active" : ""} onClick={() => setView("daily-plan")}><span>☷</span> Çalış</button>
          <button className={inExamSection ? "active" : ""} onClick={() => setView("timed-exam")}><span>▶</span> Denemeler</button>
          <button className={inProgressSection ? "active" : ""} onClick={() => setView("progress")}><span>▦</span> İlerleme</button>
        </nav>

        <div className="sidebar-note">
          <span>SINAVA {daysToExam()} GÜN</span>
          <strong>%{completion} tamamlandı</strong>
          <div><i style={{ width: `${completion}%` }} /></div>
          <p>{store.completed.length}/{totalUnits} ünite · bütün üniteler kapsamda</p>
        </div>
      </aside>

      <section className="content">
        <header className="topbar">
          <div><span className="status-dot" /> Veriler bu cihazda saklanıyor</div>
          <div className="top-actions"><button className={focusRunning ? "focus-mini running" : "focus-mini"} onClick={openFocusMiniWindow} title="Kronometreyi mini pencerede aç">{focusRunning ? `◉ ${focusClock}` : "◷ Kronometre"}</button><button className="theme-toggle" onClick={() => setTheme((current) => current === "dark" ? "light" : "dark")} aria-label={theme === "dark" ? "Açık temaya geç" : "Karanlık temaya geç"}>{theme === "dark" ? "☀ Açık" : "☾ Koyu"}</button><span className="date-pill">22 AĞU</span><button onClick={() => startQuiz()}>Hızlı deneme</button></div>
        </header>

        {inStudySection && <nav className="section-tabs" aria-label="Çalışma araçları"><button className={view === "daily-plan" ? "active" : ""} onClick={() => setView("daily-plan")}><span>☷</span> Bugünün Planı</button><button className={view === "focus" ? "active" : ""} onClick={() => setView("focus")}><span>◷</span> Kronometre</button><button className={view === "review" ? "active" : ""} onClick={() => setView("review")}><span>★</span> Tekrar <em>{reviewUnits.length}</em></button><button className={view === "search" ? "active" : ""} onClick={() => setView("search")}><span>⌕</span> İçerikte Ara</button></nav>}
        {inExamSection && view !== "quiz" && <nav className="section-tabs" aria-label="Deneme araçları"><button className={view === "timed-exam" ? "active" : ""} onClick={() => setView("timed-exam")}><span>⏱</span> Süreli Deneme</button><button onClick={() => startQuiz()}><span>▶</span> Hızlı Deneme</button><button className={view === "quiz-history" ? "active" : ""} onClick={() => setView("quiz-history")}><span>◴</span> Geçmiş <em>{store.quizHistory.length}</em></button><button className={view === "mistakes" ? "active" : ""} onClick={() => setView("mistakes")}><span>↺</span> Yanlışlar <em>{store.mistakes.length}</em></button><button className={view === "duel" ? "active" : ""} onClick={() => setView("duel")}><span>⚔</span> Canlı Düello</button></nav>}
        {inProgressSection && <nav className="section-tabs" aria-label="İlerleme araçları"><button className={view === "progress" ? "active" : ""} onClick={() => setView("progress")}><span>▦</span> Ünite Haritası</button><button className={view === "weakness" ? "active" : ""} onClick={() => setView("weakness")}><span>◫</span> Zayıflık Haritası</button><button className={view === "sources" ? "active" : ""} onClick={() => setView("sources")}><span>✓</span> Kaynaklar</button></nav>}

        {view === "dashboard" && (
          <div className="page dashboard">
            <section className="hero-panel">
              <div>
                <p className="eyebrow">YAZ OKULU • 5 DERS • 40 ÜNİTE</p>
                <h1>Geçmek için ne çalışacağını<br />her gün netleştir.</h1>
                <p>Bütün üniteler kapsamda. 300 yaz okulu sorusu tarandı; tekrar eden kavramlar konu anlatımlarına ve sınav tuzaklarına dönüştürüldü.</p>
                <div className="hero-actions"><button className="primary" onClick={() => setView("daily-plan")}>Bugünün planını aç <span>→</span></button><button className="ghost" onClick={() => setView("duel")}>Arkadaşınla yarış</button><button className="ghost" onClick={() => setView("timed-exam")}>Süreli deneme</button></div>
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

            <section className="streak-card"><div className="streak-flame">♨</div><div className="streak-copy"><span>ÇALIŞMA SERİSİ</span><strong>{streaks.current ? `${streaks.current} günlük seri` : "Seriyi bugün başlat"}</strong><small>En uzun seri: {streaks.longest} gün</small></div><div className="streak-week">{streakWeek.map((day) => <div key={day.key} className={`${day.active ? "active " : ""}${day.today ? "today" : ""}`}><i>{day.active ? "✓" : ""}</i><span>{day.label}</span></div>)}</div></section>

            <section className="stat-grid">
              <article><span>Genel ilerleme</span><strong>%{completion}</strong><small>40 ünitenin {store.completed.length} tanesi tamam</small></article>
              <article><span>Soru doğruluğu</span><strong>%{accuracy}</strong><small>{store.answered || 0} cevap üzerinden</small></article>
              <article><span>Tekrar bekleyen</span><strong>{store.mistakes.length}</strong><small>yanlış soru</small></article>
              <article><span>Bugünkü plan</span><strong>%{planProgress}</strong><small>{currentPlan ? `${currentPlan.done.length}/${currentPlan.tasks.length} görev tamam` : "henüz oluşturulmadı"}</small></article>
            </section>

            <div className="dashboard-grid">
              <section className="panel today-panel">
                <div className="panel-heading"><div><p className="eyebrow">BUGÜN</p><h2>Çalışma planın</h2></div><button className="panel-link" onClick={() => setView("daily-plan")}>{currentPlan ? "Planı aç →" : "Plan oluştur →"}</button></div>
                <div className="task-list">
                  {currentPlan ? currentPlan.tasks.map((task, index) => {
                    const target = task.unitId ? unitPerformance.find(({ unit }) => unit.id === task.unitId) : undefined;
                    const title = target ? `Ünite ${target.unitNumber} · ${target.unit.title}` : task.kind === "mistakes" ? "Yanlış soruları tekrar çöz" : task.kind === "quiz" ? "Süreli karışık deneme" : "Kısa tekrar ve kontrol";
                    const detail = target ? `${target.course.code} · ${task.minutes} dakika` : `${task.minutes} dakika`;
                    return <button key={task.id} className={currentPlan.done.includes(task.id) ? "done" : ""} onClick={() => runPlanTask(task)}>
                      <span className="task-index">{String(index + 1).padStart(2, "0")}</span>
                      <span className="task-copy"><small style={{ color: target?.course.color }}>{currentPlan.done.includes(task.id) ? "TAMAMLANDI" : detail}</small><strong>{title}</strong><em>{target ? "Konu anlatımı + soru sinyalleri + hafıza kancası" : "Plandaki sırayla ilerle"}</em></span>
                      <span className="task-arrow">→</span>
                    </button>;
                  }) : <div className="empty-state"><strong>Bugünkü rotanı oluştur</strong><p>Ayırabileceğin süreye göre ünite, tekrar ve deneme görevleri otomatik seçilir.</p><button className="primary" onClick={() => setView("daily-plan")}>Planı hazırla</button></div>}
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

        {view === "daily-plan" && (
          <div className="page daily-plan-page">
            <p className="eyebrow">KİŞİSEL GÜNLÜK ROTA</p>
            <h1>Bugünün çalışma planı</h1>
            <p className="lead">Ayırabildiğin süreyi seç. Plan; tamamlanmayan üniteleri, aktif yanlışlarını, düşük doğruluk oranlarını ve tekrar listesini önceliklendirir.</p>
            <section className="plan-builder">
              <div>
                <span>BUGÜN KAÇ DAKİKAN VAR?</span>
                <div className="plan-duration-options">{[30, 60, 120].map((minutes) => <button key={minutes} className={planMinutes === minutes ? "active" : ""} onClick={() => setPlanMinutes(minutes)}><strong>{minutes}</strong><small>dakika</small></button>)}</div>
              </div>
              <button className="primary" onClick={() => generateDailyPlan(planMinutes)}>{currentPlan ? "Planı yeniden oluştur" : "Planımı oluştur"} →</button>
            </section>
            {currentPlan ? <>
              <section className="plan-progress-card">
                <div><span>BUGÜNKÜ İLERLEME</span><strong>%{planProgress}</strong><small>{currentPlan.done.length} / {currentPlan.tasks.length} görev tamamlandı</small></div>
                <div><i style={{ width: `${planProgress}%` }} /></div>
              </section>
              <div className="daily-task-list">{currentPlan.tasks.map((task, index) => {
                const target = task.unitId ? unitPerformance.find(({ unit }) => unit.id === task.unitId) : undefined;
                const done = currentPlan.done.includes(task.id);
                const title = target ? target.unit.title : task.kind === "mistakes" ? "Yanlışlarını yeniden çöz" : task.kind === "quiz" ? "Süreli karışık deneme" : "Akıllı tekrar kartlarını çöz";
                const description = target ? `${target.course.short} · Ünite ${target.unitNumber}${target.activeMistakes ? ` · ${target.activeMistakes} aktif yanlış` : target.reviewDue ? ` · ${target.reviewDue} kart tekrar bekliyor` : target.accuracy !== null ? ` · %${target.accuracy} doğruluk` : " · henüz ölçülmedi"}` : task.kind === "mistakes" ? `${store.mistakes.length} bekleyen soruyu temizle` : task.kind === "quiz" ? "Süre baskısı altında genel seviyeni ölç" : "Eksik kalan başlıkları son kez tara";
                return <article key={task.id} className={done ? "done" : ""} style={{ "--course-color": target?.course.color ?? "#ff705d" } as React.CSSProperties}>
                  <button className="plan-task-check" onClick={() => togglePlanTask(task.id)} aria-label={done ? "Görevi tamamlanmadı işaretle" : "Görevi tamamlandı işaretle"}>{done ? "✓" : index + 1}</button>
                  <div><small>{task.minutes} DAKİKA</small><h2>{title}</h2><p>{description}</p></div>
                  <button className="plan-task-open" onClick={() => runPlanTask(task)}>{done ? "Tekrar aç" : "Başla"} →</button>
                </article>;
              })}</div>
              {planProgress === 100 && <section className="plan-complete"><span>✓</span><div><strong>Bugünkü plan tamamlandı.</strong><p>İstersen yeni bir plan oluşturabilir veya süreli denemeyle devam edebilirsin.</p></div><button className="ghost" onClick={() => setView("timed-exam")}>Süreli deneme aç</button></section>}
            </> : <div className="empty-large"><span>☷</span><h2>Planın hazır değil</h2><p>30, 60 veya 120 dakika seçip bugünün sınav odaklı rotasını oluştur.</p></div>}
          </div>
        )}

        {view === "weakness" && (
          <div className="page weakness-page">
            <p className="eyebrow">SONUÇLARA GÖRE</p>
            <h1>Zayıflık Haritası</h1>
            <p className="lead">Her hücre o ünitedeki doğru, yanlış ve boş cevaplarına göre renklenir. Aktif bir yanlış varsa ünite doğrudan öncelikli sayılır.</p>
            <div className="weakness-legend"><span><i className="critical" /> Öncelikli</span><span><i className="developing" /> Geliştir</span><span><i className="good" /> İyi</span><span><i className="strong" /> Güçlü</span><span><i className="unknown" /> Veri yok</span></div>
            <div className="weakness-course-list">{courses.map((course) => {
              const results = unitPerformance.filter((item) => item.course.code === course.code);
              const attempts = results.reduce((sum, item) => sum + item.attempts, 0);
              const correct = results.reduce((sum, item) => sum + item.correct, 0);
              const courseAccuracy = attempts ? Math.round((correct / attempts) * 100) : null;
              return <section className="weakness-course" key={course.code} style={{ "--course-color": course.color } as React.CSSProperties}>
                <header><div><small>{course.code}</small><h2>{course.title}</h2></div><div><strong>{courseAccuracy === null ? "—" : `%${courseAccuracy}`}</strong><span>{attempts ? `${attempts} cevap` : "henüz ölçülmedi"}</span></div></header>
                <div className="weakness-unit-grid">{results.map((result) => {
                  const level = weaknessLevel(result.accuracy, result.activeMistakes);
                  return <button key={result.unit.id} className={`weakness-unit ${level.key}`} onClick={() => openUnit(course, result.unit)} title={result.unit.title}>
                    <span>ÜNİTE {result.unitNumber}</span><strong>{result.accuracy === null ? "—" : `%${result.accuracy}`}</strong><small>{result.activeMistakes ? `${result.activeMistakes} yanlış` : level.label}</small>
                  </button>;
                })}</div>
              </section>;
            })}</div>
            <section className="weakness-priority">
              <div><p className="eyebrow">ÖNCELİKLİ TEKRAR</p><h2>{weakestUnits.length ? "Önce bunları güçlendir" : "Haritayı oluşturmak için deneme çöz"}</h2></div>
              {weakestUnits.length ? <div>{weakestUnits.map((item, index) => <button key={item.unit.id} onClick={() => openUnit(item.course, item.unit)}><span>{index + 1}</span><div><small>{item.course.short} · Ünite {item.unitNumber}</small><strong>{item.unit.title}</strong></div><em>{item.activeMistakes ? `${item.activeMistakes} yanlış` : `%${item.accuracy}`}</em></button>)}</div> : <button className="primary" onClick={() => setView("timed-exam")}>Süreli deneme başlat →</button>}
            </section>
          </div>
        )}

        {view === "timed-exam" && (
          <div className="page timed-exam-page">
            <p className="eyebrow">SINAV PROVASI</p>
            <h1>Süreli Deneme</h1>
            <p className="lead">Sayaç başladığında durmaz. Süre biterse çözülmeyen sorular boş sayılır ve deneme otomatik tamamlanır.</p>
            <section className="timed-exam-hero">
              <div><span>KARIŞIK DENEME</span><h2>5 dersten 20 soru</h2><p>30 dakika · 4 yanlış 1 doğruyu götürür · sorular karışık gelir</p></div>
              <button className="primary" onClick={() => startTimedExam()}>30 dakikalık denemeyi başlat →</button>
            </section>
            <div className="timed-course-grid">{courses.map((course) => {
              const count = questions.filter((question) => question.course === course.code).length;
              const duration = Math.max(10, Math.ceil(count * 1.5));
              return <article key={course.code} style={{ "--course-color": course.color } as React.CSSProperties}><span>{course.code}</span><h2>{course.title}</h2><p>{count} soru · {duration} dakika</p><button onClick={() => startTimedExam(course.code)}>Ders provasını başlat →</button></article>;
            })}</div>
            <section className="timed-rules"><strong>Deneme kuralları</strong><div><span>01</span><p>Soru paletinden boş veya işaretli sorulara geri dönebilirsin.</p><span>02</span><p>Boş bırakabilirsin; boşlar neti düşürmez.</p><span>03</span><p>Süre dolunca kalan sorular otomatik boş kaydedilir.</p><span>04</span><p>Sonuçlar zayıflık haritasını günceller.</p></div></section>
          </div>
        )}

        {view === "quiz-history" && (
          <div className="page quiz-history-page">
            <p className="eyebrow">SON 50 DENEME</p>
            <h1>Deneme Geçmişi</h1>
            <p className="lead">Tamamladığın denemeleri, netlerini ve puan değişimini cihazında takip et.</p>
            {store.quizHistory.length ? <>
              <section className="history-summary"><article><span>Toplam deneme</span><strong>{store.quizHistory.length}</strong><small>tamamlanan kayıt</small></article><article><span>Ortalama puan</span><strong>%{historyAverage}</strong><small>tüm denemeler</small></article><article><span>En iyi puan</span><strong>%{Math.max(...store.quizHistory.map((attempt) => attempt.score))}</strong><small>kişisel rekor</small></article></section>
              <section className="history-list">{store.quizHistory.map((attempt) => <article key={attempt.id}><div className="history-score"><strong>%{attempt.score}</strong><span>{attempt.net.toFixed(2)} net</span></div><div className="history-copy"><small>{attempt.timed ? "⏱ SÜRELİ" : "DENEME"}</small><strong>{attempt.label}</strong><span>{new Intl.DateTimeFormat("tr-TR", { dateStyle: "medium", timeStyle: "short", timeZone: "Europe/Istanbul" }).format(new Date(attempt.date))}</span></div><div className="history-results"><span><b>{attempt.correct}</b> doğru</span><span><b>{attempt.wrong}</b> yanlış</span><span><b>{attempt.blank}</b> boş</span><em>{attempt.questionCount} soru</em></div></article>)}</section>
            </> : <div className="empty-large"><span>◴</span><h2>Henüz kayıtlı deneme yok</h2><p>Bitirdiğin ilk denemenin sonucu otomatik olarak burada görünecek.</p><button className="primary" onClick={() => startQuiz()}>Hızlı deneme başlat</button></div>}
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
            <h1>Tekrar Merkezi</h1>
            <p className="lead">Akıllı kartlarla kendini yokla; zorlandığın kartları, yıldızladığın üniteleri ve kişisel notlarını tek yerde yönet.</p>
            {reviewDeck.length ? <section className="smart-review-session">
              <header><button onClick={closeSmartReview}>× Oturumu kapat</button><span>{reviewSessionFinished ? "Tamamlandı" : `Kart ${reviewCardIndex + 1} / ${reviewDeck.length}`}</span></header>
              {!reviewSessionFinished && currentReviewCard ? <>
                <div className="smart-review-progress"><i style={{ width: `${((reviewCardIndex + 1) / reviewDeck.length) * 100}%` }} /></div>
                <article className={reviewCardRevealed ? "smart-review-card revealed" : "smart-review-card"} style={{ "--course-color": currentReviewCard.course.color } as React.CSSProperties}>
                  <div className="smart-card-meta"><span>{currentReviewCard.course.short}</span><span>Ünite {currentReviewCard.unitNumber}</span></div>
                  <small>{reviewCardRevealed ? "KISA CEVAP" : "SINAV KARTI"}</small>
                  <h2>{reviewCardRevealed ? currentReviewCard.answer : currentReviewCard.prompt}</h2>
                  {!reviewCardRevealed && <p>Cevabı zihninden söyle, sonra kartı çevir.</p>}
                  <button className="smart-card-flip" onClick={() => setReviewCardRevealed((value) => !value)}>{reviewCardRevealed ? "Soruyu tekrar göster" : "Cevabı göster"} ↻</button>
                </article>
                {reviewCardRevealed ? <div className="smart-review-rating"><button className="repeat" onClick={() => rateReviewCard(false)}><span>↺</span><strong>Tekrar et</strong><small>Sonraki oturumda öne çıksın</small></button><button className="known" onClick={() => rateReviewCard(true)}><span>✓</span><strong>Biliyorum</strong><small>Kartı güçlendir</small></button></div> : <p className="smart-review-hint">Kendine dürüst cevap ver; zorlandığın kartlar günlük planında öncelik kazanır.</p>}
              </> : <div className="smart-review-result"><span>✓</span><p className="eyebrow">OTURUM TAMAMLANDI</p><h2>{reviewKnown} kartı biliyorsun, {reviewRepeat} kart tekrar bekliyor.</h2><div><button className="primary" onClick={startSmartReview}>Yeni 15 kart</button><button className="ghost" onClick={closeSmartReview}>Tekrar merkezine dön</button></div></div>}
            </section> : <>
              <section className="smart-review-launcher">
                <div className="smart-review-icon">◇</div>
                <div><span>AKILLI TEKRAR KARTLARI</span><h2>15 kartla hızlı tekrar yap</h2><p>Sınav kalıplarından hazırlanır; yanlışların, yıldızladığın üniteler ve “Tekrar et” dediğin kartlar önce gelir.</p></div>
                <div className="smart-review-stats"><article><strong>{reviewDueCount}</strong><small>tekrar bekliyor</small></article><article><strong>{reviewMasteredCount}</strong><small>güçlü kart</small></article></div>
                <button className="primary" onClick={startSmartReview}>Kartları başlat →</button>
              </section>
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
            </>}
          </div>
        )}

        {view === "focus" && (
          <div className="page focus-page">
            <p className="eyebrow">DİKKATİ DAĞITMADAN ÇALIŞ</p>
            <h1>Kronometre</h1>
            <p className="lead">Bir süre seç, tek üniteye odaklan ve tamamlanan çalışma oturumlarını cihazında biriktir.</p>
            <div className="focus-layout">
              <section className="focus-timer-panel">
                <div className="focus-presets" aria-label="Kronometre süresi seçimi">{[15, 25, 45].map((minutes) => <button key={minutes} className={focusDuration === minutes ? "active" : ""} onClick={() => chooseFocusDuration(minutes)}>{minutes} dk</button>)}</div>
                <div className="focus-custom-duration"><label htmlFor="custom-focus-minutes">Özel süre</label><div><input id="custom-focus-minutes" type="number" min="5" max="120" value={customFocusMinutes} onChange={(event) => setCustomFocusMinutes(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") applyCustomFocusDuration(); }} aria-label="Özel kronometre süresi, dakika" /><span>dk</span><button type="button" onClick={applyCustomFocusDuration}>Uygula</button></div><small>5–120 dakika arasında kendi süreni belirle.</small></div>
                <div className="focus-ring" style={{ "--focus-progress": `${focusProgress * 3.6}deg` } as React.CSSProperties}><div><span>{focusRunning ? "ODAKLAN" : focusCompleted ? "TAMAMLANDI" : "HAZIR"}</span><strong>{focusClock}</strong><small>{focusProgress}% tamamlandı</small></div></div>
                {focusCompleted && <div className="focus-success">✓ Odak oturumu kaydedildi. Kısa bir mola ver.</div>}
                <div className="focus-actions"><button className="primary" onClick={toggleFocusTimer}>{focusRunning ? "Duraklat" : focusSeconds === focusDuration * 60 ? "Başlat" : focusSeconds === 0 ? "Yeniden başlat" : "Devam et"}</button><button className="ghost" onClick={resetFocusTimer}>Sıfırla</button><button className="ghost focus-float-button" onClick={openFocusMiniWindow}>{focusMiniWindow && !focusMiniWindow.closed ? "Mini pencere açık" : "↗ Mini pencereye aç"}</button></div>
                <p className="focus-hint">Sayaç başka bir sayfaya geçsen bile çalışmaya devam eder. Mini pencereyi açarsan süreyi diğer sekmelerin ve uygulamaların üstünde görüp doğrudan kontrol edebilirsin.</p>
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
              <UnitStudy course={selectedCourse} unit={selectedUnit} completed={store.completed.includes(selectedUnit.id)} bookmarked={store.bookmarks.includes(selectedUnit.id)} note={store.notes[selectedUnit.id] ?? ""} audioActive={audioUnit?.id === selectedUnit.id} audioSupported={audioSupported} onAudio={() => startAudioStudy(selectedCourse, selectedUnit)} onToggle={() => toggleUnit(selectedUnit.id)} onBookmark={() => toggleBookmark(selectedUnit.id)} onNote={(note) => updateNote(selectedUnit.id, note)} onQuiz={(unitNumber) => startQuiz(selectedCourse.code, false, unitNumber)} onCourseQuiz={() => startQuiz(selectedCourse.code)} onPrevious={selectedCourse.units.indexOf(selectedUnit) > 0 ? () => openUnit(selectedCourse, selectedCourse.units[selectedCourse.units.indexOf(selectedUnit) - 1]) : undefined} onNext={selectedCourse.units.indexOf(selectedUnit) < selectedCourse.units.length - 1 ? () => openUnit(selectedCourse, selectedCourse.units[selectedCourse.units.indexOf(selectedUnit) + 1]) : undefined} />
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
              <div className="quiz-top"><button className="back-link" onClick={leaveQuiz}>× Denemeden çık</button>{quizOrigin.kind === "timed" && <strong className={quizSeconds <= 60 ? "quiz-clock urgent" : "quiz-clock"}>⏱ {timedClock}</strong>}<span>Soru {quizIndex + 1} / {quiz.length}</span></div>
              <div className="quiz-progress"><i style={{ width: `${((quizIndex + 1) / quiz.length) * 100}%` }} /></div>
              <div className="quiz-workspace">
                <section className="question-card">
                  <div className="question-meta"><span>{currentQuestion.course}</span><span>Ünite {currentQuestion.unit}</span><button className={quizFlags.includes(currentQuestion.id) ? "question-flag active" : "question-flag"} onClick={toggleQuizFlag}>{quizFlags.includes(currentQuestion.id) ? "⚑ İşaretlendi" : "⚐ Sonra dön"}</button></div>
                  <h1>{currentQuestion.prompt}</h1>
                  <div className="option-list">
                    {currentQuestion.options.map((option, index) => {
                      const state = picked === null ? "" : index === currentQuestion.answer ? "correct" : index === picked ? "wrong" : "muted";
                      return <button key={option} className={state} onClick={() => answerQuestion(index)}><span>{String.fromCharCode(65 + index)}</span>{option}{state === "correct" && <b>✓</b>}{state === "wrong" && <b>×</b>}</button>;
                    })}
                  </div>
                  {picked !== null && <div className={picked === currentQuestion.answer ? "feedback correct" : "feedback wrong"}><strong>{picked === currentQuestion.answer ? "Doğru cevap" : `Doğru cevap: ${String.fromCharCode(65 + currentQuestion.answer)}`}</strong><p>{currentQuestion.explanation}</p></div>}
                  <div className="question-actions"><span>{picked === null ? "Boş geçebilir veya soruyu işaretleyip sonra dönebilirsin." : "Cevabın kaydedildi; paletten başka soruya dönebilirsin."}</span><button className="primary" onClick={nextQuestion}>{quizIndex === quiz.length - 1 ? "Başa dön" : picked === null ? "Boş geç" : "Sonraki soru"} →</button></div>
                </section>
                <aside className="quiz-palette">
                  <header><div><span>SORU PALETİ</span><strong>{Object.keys(quizPicks).length}/{quiz.length} cevaplandı</strong></div><small>⚑ {quizFlags.length}</small></header>
                  <div>{quiz.map((question, index) => {
                    const answered = quizPicks[question.id] !== undefined;
                    const flagged = quizFlags.includes(question.id);
                    return <button key={question.id} className={`${index === quizIndex ? "current " : ""}${answered ? "answered " : ""}${flagged ? "flagged" : ""}`} onClick={() => goToQuizQuestion(index)} aria-label={`${index + 1}. soruya git${flagged ? ", işaretli" : ""}`}>{index + 1}{flagged && <i>⚑</i>}</button>;
                  })}</div>
                  <ul><li><i className="answered" /> Cevaplandı</li><li><i className="flagged" /> İşaretli</li><li><i /> Boş</li></ul>
                  <button className="quiz-finish" onClick={finishQuiz}>Denemeyi bitir <span>{quiz.length - Object.keys(quizPicks).length ? `${quiz.length - Object.keys(quizPicks).length} boş` : "Hazır"}</span></button>
                </aside>
              </div>
            </> : <>
              <section className="result-card"><span className="result-ring">%{estimated}</span><p className="eyebrow">{quizOrigin.kind === "timed" ? "SÜRELİ DENEME TAMAMLANDI" : "DENEME TAMAMLANDI"}</p><h1>{estimated >= 70 ? "Gayet iyi gidiyorsun." : estimated >= 50 ? "Geçiş çizgisine yaklaşıyorsun." : "Yanlışları kapatıp yeniden dene."}</h1><div className="result-stats"><div><strong>{quizCorrect}</strong><span>Doğru</span></div><div><strong>{quizWrong}</strong><span>Yanlış</span></div><div><strong>{quizBlank}</strong><span>Boş</span></div><div><strong>{net.toFixed(2)}</strong><span>Net</span></div></div><p>Bu hesaplama çalışma tahminidir. Gerçek harf notu üniversitenin değerlendirme sistemine göre belirlenir.</p><div className="hero-actions">{quizBlank > 0 && <button className="primary" onClick={() => setShowBlankReview((value) => !value)}>{showBlankReview ? "Boş açıklamalarını kapat" : `Boş soruları gör (${quizBlank})`}</button>}<button className="ghost" onClick={quizOrigin.kind === "unit" ? leaveQuiz : restartQuiz}>{quizOrigin.kind === "unit" ? "Üniteye dön" : "Yeni deneme"}</button><button className="ghost" onClick={() => setView("mistakes")}>Yanlışları gör</button><button className="ghost" onClick={() => setView("quiz-history")}>Deneme geçmişi</button></div></section>
              {showBlankReview && <section className="blank-review"><header><div><p className="eyebrow">CEVAPLANMAYANLAR</p><h2>Boş bıraktığın sorular</h2></div><span>{quizBlank} soru</span></header><div>{quiz.filter((question) => quizBlankIds.includes(question.id)).map((question, index) => <article key={question.id}><small>{question.course} · Ünite {question.unit} · Boş {index + 1}</small><h3>{question.prompt}</h3><strong>Doğru cevap: {String.fromCharCode(65 + question.answer)} — {question.options[question.answer]}</strong><p>{question.explanation}</p></article>)}</div></section>}
            </>}
          </div>
        )}
      </section>
      {audioCourse && audioUnit && <aside className="audio-study-player" style={{ "--course-color": audioCourse.color } as React.CSSProperties}>
        <div className="audio-study-progress"><i style={{ width: `${audioTotal ? ((audioIndex + (audioStatus === "idle" ? 1 : 0)) / audioTotal) * 100 : 0}%` }} /></div>
        <div className="audio-study-copy"><span>SESLİ ÇALIŞMA · {audioCourse.short}</span><strong>{audioUnit.title}</strong><small>{audioStatus === "playing" ? "Okunuyor" : audioStatus === "paused" ? "Duraklatıldı" : "Bölüm tamamlandı"} · {audioIndex + 1}/{audioTotal}</small></div>
        <div className="audio-study-controls"><button onClick={() => skipAudioStudy(-1)} disabled={audioIndex === 0} aria-label="Önceki sesli bölüm">‹</button><button className="audio-play" onClick={toggleAudioStudy} aria-label={audioStatus === "playing" ? "Sesli çalışmayı duraklat" : "Sesli çalışmaya devam et"}>{audioStatus === "playing" ? "Ⅱ" : "▶"}</button><button onClick={() => skipAudioStudy(1)} disabled={audioIndex >= audioTotal - 1} aria-label="Sonraki sesli bölüm">›</button></div>
        <label>Hız<select value={audioRate} onChange={(event) => changeAudioRate(Number(event.target.value))}><option value={0.8}>0.8×</option><option value={1}>1×</option><option value={1.2}>1.2×</option><option value={1.5}>1.5×</option><option value={1.8}>1.8×</option></select></label>
        <button className="audio-close" onClick={closeAudioStudy} aria-label="Sesli çalışmayı kapat">×</button>
      </aside>}
      {focusMiniRoot && createPortal(
        <div className="focus-mini-player">
          <header><span>KRONOMETRE</span><i className={focusRunning ? "running" : ""}>{focusRunning ? "● ÇALIŞIYOR" : focusCompleted ? "✓ TAMAMLANDI" : "DURAKLATILDI"}</i></header>
          <strong>{focusClock}</strong>
          <p>{focusRunning ? "Süre arka planda doğru biçimde ilerliyor." : focusCompleted ? "Oturum kaydedildi. Kısa bir mola verebilirsin." : `${focusDuration} dakikalık odak oturumu.`}</p>
          <div className="focus-mini-presets" aria-label="Kronometre süresi seçimi">{[15, 25, 45].map((minutes) => <button key={minutes} className={focusDuration === minutes ? "active" : ""} onClick={() => chooseFocusDuration(minutes)}>{minutes} dk</button>)}</div>
          <div className="focus-mini-custom"><input type="number" min="5" max="120" value={customFocusMinutes} onChange={(event) => setCustomFocusMinutes(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") applyCustomFocusDuration(); }} aria-label="Özel kronometre süresi, dakika" /><button type="button" onClick={applyCustomFocusDuration}>Özel süre</button></div>
          <div className="focus-mini-controls"><button onClick={toggleFocusTimer}>{focusRunning ? "Duraklat" : focusSeconds === 0 ? "Yeniden başlat" : "Başlat / devam et"}</button><button onClick={resetFocusTimer}>Sıfırla</button></div>
          <small>{focusMiniMode === "picture-in-picture" ? "Her zaman üstte kalan mini pencere" : "Tarayıcı küçük pencere modu"}</small>
        </div>,
        focusMiniRoot,
      )}
    </main>
  );
}

function UnitStudy({ course, unit, completed, bookmarked, note, audioActive, audioSupported, onAudio, onToggle, onBookmark, onNote, onQuiz, onCourseQuiz, onPrevious, onNext }: { course: Course; unit: Unit; completed: boolean; bookmarked: boolean; note: string; audioActive: boolean; audioSupported: boolean; onAudio: () => void; onToggle: () => void; onBookmark: () => void; onNote: (note: string) => void; onQuiz: (unitNumber: number) => void; onCourseQuiz: () => void; onPrevious?: () => void; onNext?: () => void }) {
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
        <div className="question-patterns"><h3>Soru kalıpları ve kısa cevapları</h3><div>{guide.patterns.map((pattern, index) => <article key={pattern}><span>{index + 1}</span><div><strong>{pattern}</strong><small><b>CEVAP:</b> {getPatternAnswer(unit.id, index)}</small></div></article>)}</div></div>
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
    <aside className="study-side"><span>Ünite durumu</span><strong>{completed ? "Tamamlandı" : "Çalışılıyor"}</strong><div className="mini-progress"><i style={{ width: completed ? "100%" : "35%", background: course.color }} /></div><button className="primary" onClick={onToggle}>{completed ? "Tamamlanmadı işaretle" : "Üniteyi tamamla"}</button><button className={audioActive ? "ghost audio-active" : "ghost"} onClick={onAudio} disabled={!audioSupported}>{audioSupported ? audioActive ? "◉ Baştan sesli dinle" : "♪ Sesli çalışma" : "Sesli okuma desteklenmiyor"}</button><button className={bookmarked ? "ghost saved" : "ghost"} onClick={onBookmark}>{bookmarked ? "★ Tekrar listemde" : "☆ Tekrar listeme ekle"}</button><button className="ghost" onClick={unitQuestionCount ? () => onQuiz(unitNumber) : onCourseQuiz}>{unitQuestionCount ? "Bu üniteden soru çöz" : "Bu dersten soru çöz"}</button><button className="ghost" onClick={onNext} disabled={!onNext}>{onNext ? "Sonraki üniteye geç →" : "Dersin son ünitesi"}</button><small>Sesli çalışma; özeti, kritik bilgileri, konu anlatımını ve hızlı tekrarı Türkçe okur.</small></aside>
  </div>;
}
