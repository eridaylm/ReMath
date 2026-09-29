'use client';

import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import {
  SubTopic,
  Level,
  MasteryStatus,
  Question,
  SelectedAnswer,
  BlockSubmission,
  SubTopicResult,
  DiagnosticResult,
} from '@/types';
import {
  INITIAL_QUESTIONS,
  SUBTOPICS_SEQUENCE,
  ROOT_CAUSE_MAP,
} from '@/data/mockData';
import { useLanguage } from '@/contexts/language-context';

const QUESTIONS_STORAGE_KEY = 'edutest_questions_bank';
const RESULT_STORAGE_KEY = 'edutest_diagnostic_latest_result';

interface TestContextType {
  // Questions Bank
  questions: Question[];
  addQuestion: (q: Omit<Question, 'id'>) => void;
  updateQuestion: (q: Question) => void;
  deleteQuestion: (id: string) => void;
  resetQuestionsToDefault: () => void;

  // Active Test Engine State
  isTestActive: boolean;
  isTestFinished: boolean;
  studentName: string;
  setStudentName: (name: string) => void;
  activeSubTopicIndex: number;
  currentSubTopic: SubTopic;
  currentLevel: Level;
  currentBlockQuestions: Question[];
  currentQuestionIndex: number;
  currentQuestion: Question | null;
  selectedAnswers: Record<string, SelectedAnswer>;
  
  // Timers & Honesty Tracking
  totalTimeSeconds: number;
  subTopicTimeSeconds: number;
  totalHonestyCount: number;

  // Test Actions
  startTest: (name?: string) => void;
  selectAnswer: (questionId: string, answer: SelectedAnswer) => void;
  goToNextQuestion: () => void;
  goToPrevQuestion: () => void;
  jumpToQuestion: (index: number) => void;
  submitCurrentBlock: () => void;
  bypassCurrentLevel: () => void; // "Menyerah / Lompati Level Ini"
  resetTest: () => void;
  loadSampleResult: () => void;

  // Final Results
  completedSubTopicResults: Record<string, SubTopicResult>;
  latestResult: DiagnosticResult | null;
}

const TestContext = createContext<TestContextType | undefined>(undefined);

export const TestProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { language } = useLanguage();
  // 1. Questions Bank with LocalStorage Persistence
  const [questions, setQuestions] = useState<Question[]>(INITIAL_QUESTIONS);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(QUESTIONS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setQuestions(parsed);
        }
      }
    } catch (err) {
      console.error('Failed reading question bank from storage', err);
    }
  }, []);

  const persistQuestions = (updated: Question[]) => {
    setQuestions(updated);
    try {
      localStorage.setItem(QUESTIONS_STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.error('Failed saving question bank to storage', err);
    }
  };

  const addQuestion = (newQ: Omit<Question, 'id'>) => {
    const id = `Q-${Date.now().toString().slice(-6)}`;
    const updated = [...questions, { ...newQ, id }];
    persistQuestions(updated);
  };

  const updateQuestion = (updatedQ: Question) => {
    const updated = questions.map((q) => (q.id === updatedQ.id ? updatedQ : q));
    persistQuestions(updated);
  };

  const deleteQuestion = (id: string) => {
    const updated = questions.filter((q) => q.id !== id);
    persistQuestions(updated);
  };

  const resetQuestionsToDefault = () => {
    persistQuestions(INITIAL_QUESTIONS);
  };

  // 2. Active Test Engine State
  const [studentName, setStudentName] = useState<string>('Siswa Mandiri');
  const [isTestActive, setIsTestActive] = useState<boolean>(false);
  const [isTestFinished, setIsTestFinished] = useState<boolean>(false);
  const [activeSubTopicIndex, setActiveSubTopicIndex] = useState<number>(0);
  const [currentLevel, setCurrentLevel] = useState<Level>('SMA');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, SelectedAnswer>>({});
  
  // Track blocks attempted within each subtopic
  const [blockHistory, setBlockHistory] = useState<Record<string, BlockSubmission[]>>({});
  const [completedSubTopicResults, setCompletedSubTopicResults] = useState<Record<string, SubTopicResult>>({});
  const [latestResult, setLatestResult] = useState<DiagnosticResult | null>(null);

  // Timers & Honesty Tracking
  const [totalTimeSeconds, setTotalTimeSeconds] = useState<number>(0);
  const [subTopicTimeSeconds, setSubTopicTimeSeconds] = useState<number>(0);
  const [totalHonestyCount, setTotalHonestyCount] = useState<number>(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Precision timer ticking
  useEffect(() => {
    if (isTestActive && !isTestFinished) {
      timerRef.current = setInterval(() => {
        setTotalTimeSeconds((prev) => prev + 1);
        setSubTopicTimeSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTestActive, isTestFinished]);

  // Load existing saved result on mount
  useEffect(() => {
    try {
      const storedRes = localStorage.getItem(RESULT_STORAGE_KEY);
      if (storedRes) {
        setLatestResult(JSON.parse(storedRes));
      }
    } catch {
      // ignore
    }
  }, []);

  const currentSubTopic: SubTopic = SUBTOPICS_SEQUENCE[activeSubTopicIndex] || 'Aljabar';

  // Helper to fetch 3 questions for current subtopic and level
  const getBlockQuestions = useCallback(
    (subtopic: SubTopic, level: Level): Question[] => {
      const filtered = questions.filter(
        (q) => q.subtopic === subtopic && q.level === level
      );
      if (filtered.length >= 3) {
        return filtered.slice(0, 3);
      }
      // Fallback from INITIAL_QUESTIONS if admin deleted some
      const fallback = INITIAL_QUESTIONS.filter(
        (q) => q.subtopic === subtopic && q.level === level
      );
      return fallback.slice(0, 3);
    },
    [questions]
  );

  const [currentBlockQuestions, setCurrentBlockQuestions] = useState<Question[]>(() =>
    getBlockQuestions('Aljabar', 'SMA')
  );

  // Refresh current block questions whenever subtopic or level changes
  useEffect(() => {
    if (isTestActive) {
      const bQuestions = getBlockQuestions(currentSubTopic, currentLevel);
      setCurrentBlockQuestions(bQuestions);
      setCurrentQuestionIndex(0);
    }
  }, [activeSubTopicIndex, currentSubTopic, currentLevel, getBlockQuestions, isTestActive]);

  const currentQuestion = currentBlockQuestions[currentQuestionIndex] || null;

  // Start Test
  const startTest = (name?: string) => {
    if (name && name.trim()) setStudentName(name.trim());
    setIsTestActive(true);
    setIsTestFinished(false);
    setActiveSubTopicIndex(0);
    setCurrentLevel('SMA');
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setBlockHistory({});
    setCompletedSubTopicResults({});
    setTotalTimeSeconds(0);
    setSubTopicTimeSeconds(0);
    setTotalHonestyCount(0);
    setCurrentBlockQuestions(getBlockQuestions('Aljabar', 'SMA'));
  };

  // Select an answer (number 0..3 or 'UNKNOWN')
  const selectAnswer = (questionId: string, answer: SelectedAnswer) => {
    setSelectedAnswers((prev) => {
      const prevVal = prev[questionId];
      // Update honesty count if newly choosing 'UNKNOWN'
      if (answer === 'UNKNOWN' && prevVal !== 'UNKNOWN') {
        setTotalHonestyCount((c) => c + 1);
      } else if (prevVal === 'UNKNOWN' && answer !== 'UNKNOWN') {
        setTotalHonestyCount((c) => Math.max(0, c - 1));
      }
      return { ...prev, [questionId]: answer };
    });
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < currentBlockQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const goToPrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const jumpToQuestion = (idx: number) => {
    if (idx >= 0 && idx < currentBlockQuestions.length) {
      setCurrentQuestionIndex(idx);
    }
  };

  // Generate finalized result for the entire test
  const finalizeTestResults = useCallback(
    (allSubResults: Record<string, SubTopicResult>, finalHonestyCount: number, finalTotalTime: number, overrideName?: string) => {
      const resultsArray = Object.values(allSubResults);
      const smaMasteredCount = resultsArray.filter((r) => r.status === 'SMA_MASTERED').length;
      const smpCount = resultsArray.filter((r) => r.status === 'SMP_FOUNDATIONAL').length;
      const sdCount = resultsArray.filter((r) => r.status === 'SD_FOUNDATIONAL').length;
      const remedialCount = resultsArray.filter((r) => r.status === 'BASIC_REMEDIAL').length;

      // Find strongest and focus area
      const strength = resultsArray.find((r) => r.status === 'SMA_MASTERED')?.subtopic ||
        resultsArray.find((r) => r.status === 'SMP_FOUNDATIONAL')?.subtopic || 'Aritmatika';
      
      const focus = resultsArray.slice().reverse().find(
        (r) => r.status === 'BASIC_REMEDIAL' || r.status === 'SD_FOUNDATIONAL' || r.status === 'SMP_FOUNDATIONAL'
      )?.subtopic || 'Aljabar';

      // Supportive empathetic anti-stigma headlines
      let headline = language === 'en' 
        ? `Outstanding, you have a resilient foundation in mathematical reasoning!`
        : `Luar biasa, kamu memiliki fondasi penalaran matematika yang tangguh!`;
      let motivational = language === 'en'
        ? `Every student has a unique learning map. Knowing where your foundation needs polishing is a champion's greatest secret.`
        : `Setiap siswa memiliki peta belajar yang unik. Mengetahui di mana fondasi yang perlu dipoles adalah rahasia terbesar para juara.`;

      if (smaMasteredCount >= 3) {
        headline = language === 'en'
          ? `Outstanding Performance! You have mastered most of the high school math pillars.`
          : `Performa Luar Biasa! Sebagian besar pilar matematika SMA telah kamu kuasai.`;
        motivational = language === 'en'
          ? `Your strong foundation in ${strength} proves you are ready for advanced questions. Just a little polish needed in ${focus}.`
          : `Fondasi kuatmu di ${strength} membuktikan kamu siap melangkah ke soal-soal tingkat lanjut. Tinggal sedikit memoles materi ${focus}.`;
      } else if (smaMasteredCount + smpCount >= 3) {
        headline = language === 'en'
          ? `Your Middle School foundation is very solid! Just a few conceptual bridges will help you master High School.`
          : `Fondasi SMP kamu sangat kokoh! Sedikit jembatan konsep akan membawamu menguasai SMA.`;
        motivational = language === 'en'
          ? `You haven't failed, you just need a small bridge between basic algebra factorization and High School concepts in ${focus}.`
          : `Kamu tidak gagal, melainkan hanya membutuhkan jembatan kecil antara pemfaktoran aljabar dasar dengan konsep SMA di topik ${focus}.`;
      } else {
        headline = language === 'en'
          ? `An honest and brave first step! We found the best starting point for you to soar.`
          : `Langkah awal yang jujur dan berani! Kita temukan titik mula terbaik untuk melesat.`;
        motivational = language === 'en'
          ? `Math is like climbing a staircase. Reviewing foundations at the basic level is not a weakness, but an acceleration for the next big leap!`
          : `Matematika adalah seperti tangga bertingkat. Mengulang fondasi di tingkat dasar bukan tanda kelemahan, melainkan percepatan untuk lompatan besar berikutnya!`;
      }

      // Badges
      const badges = [];
      if (finalHonestyCount > 0) {
        badges.push({
          id: 'b-honesty',
          title: language === 'en' ? 'Proven Honesty (Golden Integrity)' : 'Kejujuran Teruji (Integritas Emas)',
          description: language === 'en' 
            ? `You used the "I Don't Know" button ${finalHonestyCount} times without randomly guessing. This is a sign of a true learner!`
            : `Kamu menggunakan tombol "Belum Mempelajari Ini" sebanyak ${finalHonestyCount} kali tanpa menebak sembarangan. Ini tanda pembelajar sejati!`,
          icon: 'ShieldCheck',
          color: 'emerald',
        });
      }
      if (finalTotalTime < 300) {
        badges.push({
          id: 'b-speed',
          title: language === 'en' ? 'Quick & Agile Thinker' : 'Pemikir Cepat & Tangkas',
          description: language === 'en'
            ? 'Completed the entire adaptive diagnostic block with very high time efficiency.'
            : 'Menyelesaikan seluruh blok diagnostik adaptif dengan efisiensi waktu sangat tinggi.',
          icon: 'Zap',
          color: 'blue',
        });
      }
      if (smaMasteredCount >= 1) {
        badges.push({
          id: 'b-mastery',
          title: language === 'en' ? 'High School Master' : 'Penguasa Materi SMA',
          description: language === 'en'
            ? `Successfully completed the High School block in ${strength} with brilliant accuracy.`
            : `Berhasil menuntaskan blok SMA pada topik ${strength} dengan akurasi gemilang.`,
          icon: 'Award',
          color: 'amber',
        });
      }
      badges.push({
        id: 'b-growth',
        title: language === 'en' ? 'Growth Mindset' : 'Mindset Bertumbuh',
        description: language === 'en'
          ? 'Completed the adaptive diagnostic test fearlessly to uncover your true foundation.'
          : 'Menyelesaikan tes diagnostik adaptif tanpa rasa takut demi mengetahui fondasi diri yang sebenarnya.',
        icon: 'Sparkles',
        color: 'indigo',
      });

      const diagnosticOutput: DiagnosticResult = {
        id: `DIAG-${Date.now()}`,
        studentName: overrideName || studentName,
        completedAt: new Date().toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        totalTimeSeconds: finalTotalTime,
        totalHonestyCount: finalHonestyCount,
        overallScore: smaMasteredCount * 3 + smpCount * 2 + sdCount * 1,
        overallAccuracy: Math.round(((smaMasteredCount * 3 + smpCount * 2 + sdCount * 1) / 15) * 100),
        subtopicResults: allSubResults as Record<SubTopic, SubTopicResult>,
        supportiveHeader: {
          strengthHeadline: headline,
          motivationalText: motivational,
          keyStrengthSubtopic: strength,
          focusGrowthSubtopic: focus,
        },
        badges,
      };

      setLatestResult(diagnosticOutput);
      setIsTestActive(false);
      setIsTestFinished(true);

      try {
        localStorage.setItem(RESULT_STORAGE_KEY, JSON.stringify(diagnosticOutput));
      } catch (e) {
        console.error('Failed to save diagnostic result', e);
      }
    },
    [studentName, language]
  );

  // Evaluate and advance subtopic or level
  const processBlockEvaluation = (passed: boolean, bypassed: boolean, answersRecord: BlockSubmission) => {
    // Record into block history
    const existingHistory = blockHistory[currentSubTopic] || [];
    const newHistory = [...existingHistory, answersRecord];
    setBlockHistory((prev) => ({ ...prev, [currentSubTopic]: newHistory }));

    const moveToNextSubTopicWithStatus = (status: MasteryStatus, levelReached: Level | 'Remedial', score: number) => {
      const rootCause = ROOT_CAUSE_MAP[currentSubTopic][status];
      const subResult: SubTopicResult = {
        subtopic: currentSubTopic,
        status,
        statusLabel:
          status === 'SMA_MASTERED'
            ? 'SMA Mastered (Fondasi Kuat)'
            : status === 'SMP_FOUNDATIONAL'
            ? 'SMP Foundational Level (Perlu Review SMA)'
            : status === 'SD_FOUNDATIONAL'
            ? 'SD Foundational Level (Perlu Review SMP & SMA)'
            : 'Needs Basic Remedial (Fondasi SD Perlu Dibangun)',
        levelReached,
        score,
        totalQuestions: 3,
        accuracyPercent: Math.round((score / 3) * 100),
        blocksAttempted: newHistory,
        honestyCount: answersRecord.answers.filter((a) => a.isHonesty).length,
        timeSpentSeconds: subTopicTimeSeconds,
        rootCauseAnalysis: {
          title: rootCause.title,
          description: rootCause.description,
          missingPrerequisite: rootCause.missingPrerequisite,
        },
        recommendation: {
          actionTitle: `Rekomendasi Pemulihan Konsep ${currentSubTopic}`,
          learningModules: rootCause.modules,
          priority: status === 'SMA_MASTERED' ? 'Rendah' : status === 'SMP_FOUNDATIONAL' ? 'Sedang' : 'Tinggi',
        },
      };

      const updatedAll = { ...completedSubTopicResults, [currentSubTopic]: subResult };
      setCompletedSubTopicResults(updatedAll);
      setSubTopicTimeSeconds(0);

      const nextSubIndex = activeSubTopicIndex + 1;
      if (nextSubIndex < SUBTOPICS_SEQUENCE.length) {
        // Move to next subtopic starting at SMA
        setActiveSubTopicIndex(nextSubIndex);
        setCurrentLevel('SMA');
        setCurrentQuestionIndex(0);
      } else {
        // All 5 subtopics finished!
        finalizeTestResults(updatedAll, totalHonestyCount, totalTimeSeconds);
      }
    };

    if (currentLevel === 'SMA') {
      if (passed && !bypassed) {
        // PASS SMA Block -> Stop testing this sub-topic -> SMA Mastered
        moveToNextSubTopicWithStatus('SMA_MASTERED', 'SMA', answersRecord.score);
      } else {
        // FAIL SMA Block -> Downgrade to SMP Level Block
        setCurrentLevel('SMP');
        setCurrentQuestionIndex(0);
      }
    } else if (currentLevel === 'SMP') {
      if (passed && !bypassed) {
        // PASS SMP Block -> Stop testing this sub-topic -> SMP Foundational
        moveToNextSubTopicWithStatus('SMP_FOUNDATIONAL', 'SMP', answersRecord.score);
      } else {
        // FAIL SMP Block -> Downgrade to SD Level Block
        setCurrentLevel('SD');
        setCurrentQuestionIndex(0);
      }
    } else if (currentLevel === 'SD') {
      if (passed && !bypassed) {
        // PASS SD Block -> Stop testing this sub-topic -> SD Foundational
        moveToNextSubTopicWithStatus('SD_FOUNDATIONAL', 'SD', answersRecord.score);
      } else {
        // FAIL SD Block -> Needs Basic Remedial
        moveToNextSubTopicWithStatus('BASIC_REMEDIAL', 'Remedial', answersRecord.score);
      }
    }
  };

  // Submit Current Block of 3 questions
  const submitCurrentBlock = () => {
    const answersData = currentBlockQuestions.map((q) => {
      const userAns = selectedAnswers[q.id];
      const isHonesty = userAns === 'UNKNOWN';
      const isCorrect = typeof userAns === 'number' && userAns === q.correctAnswer;
      return {
        questionId: q.id,
        selected: userAns !== undefined ? userAns : 'UNKNOWN',
        isCorrect,
        isHonesty,
      };
    });

    const correctCount = answersData.filter((a) => a.isCorrect).length;
    const passed = correctCount >= 2; // threshold >= 2 out of 3 (67%)

    const blockSubmission: BlockSubmission = {
      subtopic: currentSubTopic,
      level: currentLevel,
      answers: answersData,
      score: correctCount,
      passed,
      bypassed: false,
      timeSeconds: subTopicTimeSeconds,
    };

    processBlockEvaluation(passed, false, blockSubmission);
  };

  // "Menyerah / Lompati Level Ini" button
  const bypassCurrentLevel = () => {
    // Immediately marks current 3-question block as failed
    const answersData = currentBlockQuestions.map((q) => ({
      questionId: q.id,
      selected: (selectedAnswers[q.id] || 'UNKNOWN') as SelectedAnswer,
      isCorrect: false,
      isHonesty: selectedAnswers[q.id] === 'UNKNOWN',
    }));

    const blockSubmission: BlockSubmission = {
      subtopic: currentSubTopic,
      level: currentLevel,
      answers: answersData,
      score: 0,
      passed: false,
      bypassed: true,
      timeSeconds: subTopicTimeSeconds,
    };

    processBlockEvaluation(false, true, blockSubmission);
  };

  // Reset Test
  const resetTest = () => {
    setIsTestActive(false);
    setIsTestFinished(false);
    setActiveSubTopicIndex(0);
    setCurrentLevel('SMA');
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setBlockHistory({});
    setCompletedSubTopicResults({});
    setTotalTimeSeconds(0);
    setSubTopicTimeSeconds(0);
    setTotalHonestyCount(0);
    setLatestResult(null);
    try {
      localStorage.removeItem(RESULT_STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  // Pre-load a sample diagnostic result for instant presentation/review
  const loadSampleResult = () => {
    const sampleSubResults: Record<SubTopic, SubTopicResult> = {
      Aljabar: {
        subtopic: 'Aljabar',
        status: 'SMP_FOUNDATIONAL',
        statusLabel: 'SMP Foundational Level (Perlu Review SMA)',
        levelReached: 'SMP',
        score: 3,
        totalQuestions: 3,
        accuracyPercent: 100,
        blocksAttempted: [],
        honestyCount: 1,
        timeSpentSeconds: 65,
        rootCauseAnalysis: {
          title: language === 'en' ? 'High School Algebra Hurdle Rooted in Advanced Symbolic Manipulation' : 'Hambatan Aljabar SMA Berakar dari Manipulasi Simbolik Lanjutan',
          description: language === 'en' ? 'Student perfectly masters SMP algebraic factorization but hesitates on quadratic discriminants and SMA composite functions.' : 'Siswa menguasai pemfaktoran aljabar SMP dengan sempurna, namun ragu pada bentuk diskriminan kuadrat dan komposisi fungsi SMA.',
          missingPrerequisite: language === 'en' ? 'Perfect square factorization and function discriminant analysis.' : 'Pemfaktoran kuadrat sempurna dan analisis diskriminan fungsi.',
        },
        recommendation: {
          actionTitle: language === 'en' ? 'Algebra Remedial Recommendation' : 'Rekomendasi Pemulihan Aljabar',
          learningModules: language === 'en' 
            ? ['Complete SMP Factorization Review', 'SMA Quadratic Function Transition', 'Symbolic Manipulation Practice']
            : ['Review Tuntas Pemfaktoran SMP', 'Transisi Fungsi Kuadrat SMA', 'Latihan Manipulasi Simbolik'],
          priority: 'Sedang',
        },
      },
      Geometri: {
        subtopic: 'Geometri',
        status: 'SMA_MASTERED',
        statusLabel: 'SMA Mastered (Fondasi Kuat)',
        levelReached: 'SMA',
        score: 3,
        totalQuestions: 3,
        accuracyPercent: 100,
        blocksAttempted: [],
        honestyCount: 0,
        timeSpentSeconds: 55,
        rootCauseAnalysis: {
          title: language === 'en' ? 'Excellent 3D Spatial and Analytical Skills' : 'Spasial Ruang Tiga Dimensi dan Analitik Unggul',
          description: language === 'en' ? 'Visualization of point projections onto planes and formulation of circle equations are comprehensively mastered.' : 'Visualisasi proyeksi titik ke bidang serta formulasi persamaan lingkaran dikuasai secara komprehensif.',
          missingPrerequisite: language === 'en' ? 'No gaps.' : 'Tidak ada celah.',
        },
        recommendation: {
          actionTitle: language === 'en' ? 'Geometry Enrichment Recommendation' : 'Rekomendasi Pengayaan Geometri',
          learningModules: language === 'en' 
            ? ['Advanced R3 Space Vectors', 'Analytic Conic Sections']
            : ['Vektor Ruang R3 Lanjutan', 'Irisan Kerucut Analitik'],
          priority: 'Rendah',
        },
      },
      Kalkulus: {
        subtopic: 'Kalkulus',
        status: 'SD_FOUNDATIONAL',
        statusLabel: 'SD Foundational Level (Perlu Review SMP & SMA)',
        levelReached: 'SD',
        score: 2,
        totalQuestions: 3,
        accuracyPercent: 67,
        blocksAttempted: [],
        honestyCount: 2,
        timeSpentSeconds: 80,
        rootCauseAnalysis: {
          title: language === 'en' ? 'Difficulty Grasping Derivatives Rooted in Elementary Rate & Ratio Concepts' : 'Kesulitan Memahami Turunan Berakar dari Konsep Laju & Perbandingan SD',
          description: language === 'en' ? 'The concept of speed as rate of change over time is not yet understood as a ratio per unit time before entering limits.' : 'Konsep kecepatan sebagai laju perubahan jarak terhadap waktu belum dipahami sebagai rasio per satuan waktu sebelum masuk ke limit.',
          missingPrerequisite: language === 'en' ? 'Proportional reasoning and unit rates.' : 'Penalaran perbandingan senilai dan laju satuan (unit rate).',
        },
        recommendation: {
          actionTitle: language === 'en' ? 'Calculus Remedial Recommendation' : 'Rekomendasi Pemulihan Kalkulus',
          learningModules: language === 'en'
            ? ['Understanding Ratios and Unit Rates', 'Simple Motion Graphs', 'Changing Variables Foundation']
            : ['Pemahaman Rasio dan Laju Satuan', 'Grafik Pergerakan Sederhana', 'Fondasi Variabel Berubah'],
          priority: 'Tinggi',
        },
      },
      Statistika: {
        subtopic: 'Statistika',
        status: 'SMA_MASTERED',
        statusLabel: 'SMA Mastered (Fondasi Kuat)',
        levelReached: 'SMA',
        score: 2,
        totalQuestions: 3,
        accuracyPercent: 67,
        blocksAttempted: [],
        honestyCount: 0,
        timeSpentSeconds: 60,
        rootCauseAnalysis: {
          title: language === 'en' ? 'Excellent Probabilistic Thinking and Data Distribution Analysis' : 'Pemikiran Probabilistik dan Analisis Sebaran Data Sangat Baik',
          description: language === 'en' ? 'Student is capable of calculating measures of variability and compound probability combinations with high accuracy.' : 'Siswa mampu menghitung ukuran variabilitas dan kombinasi peluang majemuk dengan akurasi tinggi.',
          missingPrerequisite: language === 'en' ? 'No gaps.' : 'Tidak ada celah.',
        },
        recommendation: {
          actionTitle: language === 'en' ? 'Statistics Enrichment Recommendation' : 'Rekomendasi Pengayaan Statistika',
          learningModules: language === 'en' 
            ? ['Normal Probability Distribution', 'Statistical Inference & Hypothesis Testing']
            : ['Distribusi Probabilitas Normal', 'Inferensi Statistik & Uji Hipotesis'],
          priority: 'Rendah',
        },
      },
      Aritmatika: {
        subtopic: 'Aritmatika',
        status: 'SMA_MASTERED',
        statusLabel: 'SMA Mastered (Fondasi Kuat)',
        levelReached: 'SMA',
        score: 3,
        totalQuestions: 3,
        accuracyPercent: 100,
        blocksAttempted: [],
        honestyCount: 0,
        timeSpentSeconds: 48,
        rootCauseAnalysis: {
          title: language === 'en' ? 'Highly Fluent in Exponential and Financial Number Literacy' : 'Literasi Bilangan Eksponensial dan Finansial Sangat Fasih',
          description: language === 'en' ? 'Thoroughly masters infinite convergent series, logarithm rules, and compound interest modeling.' : 'Menguasai konsep deret tak hingga konvergen, hukum logaritma, serta pemodelan bunga majemuk secara menyeluruh.',
          missingPrerequisite: language === 'en' ? 'None.' : 'Tidak ada.',
        },
        recommendation: {
          actionTitle: language === 'en' ? 'Arithmetic Enrichment Recommendation' : 'Rekomendasi Pengayaan Aritmatika',
          learningModules: language === 'en' 
            ? ['Logarithm Applications in Richter Scale & pH', 'Annuities & Loan Amortization']
            : ['Aplikasi Logaritma Skala Richter & pH', 'Anuitas & Amortisasi Pinjaman'],
          priority: 'Rendah',
        },
      },
    };

    const sampleName = language === 'en' ? 'Independent Student' : 'Siswa Mandiri';
    setStudentName(sampleName);
    finalizeTestResults(sampleSubResults, 3, 308, sampleName);
  };

  // Automatically refresh sample data when language changes so translations apply instantly
  useEffect(() => {
    if (latestResult && latestResult.studentName === (language === 'en' ? 'Siswa Mandiri' : 'Independent Student')) {
      loadSampleResult();
    } else if (latestResult && (latestResult.studentName === 'Siswa Mandiri' || latestResult.studentName === 'Independent Student')) {
      loadSampleResult();
    }
  }, [language]);

  return (
    <TestContext.Provider
      value={{
        questions,
        addQuestion,
        updateQuestion,
        deleteQuestion,
        resetQuestionsToDefault,

        isTestActive,
        isTestFinished,
        studentName,
        setStudentName,
        activeSubTopicIndex,
        currentSubTopic,
        currentLevel,
        currentBlockQuestions,
        currentQuestionIndex,
        currentQuestion,
        selectedAnswers,

        totalTimeSeconds,
        subTopicTimeSeconds,
        totalHonestyCount,

        startTest,
        selectAnswer,
        goToNextQuestion,
        goToPrevQuestion,
        jumpToQuestion,
        submitCurrentBlock,
        bypassCurrentLevel,
        resetTest,
        loadSampleResult,

        completedSubTopicResults,
        latestResult,
      }}
    >
      {children}
    </TestContext.Provider>
  );
};

export const useTest = () => {
  const context = useContext(TestContext);
  if (!context) {
    throw new Error('useTest must be used within a TestProvider');
  }
  return context;
};
