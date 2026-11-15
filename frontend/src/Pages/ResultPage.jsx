import { NotFound } from "../index";
import ResultStats from "../Components/ResultStats";
import { useState, useContext, useMemo } from "react";
import AuthContext from "../context/AuthContext.js";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  Lightbulb,
  ArrowLeft,
  Award,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// --- Framer Motion Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

const cardMotionVariant = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 280, damping: 24 },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2, ease: "easeOut" },
  },
};

export default function ResultPage() {
  const [filter, setFilter] = useState("all"); // 'all', 'correct', 'incorrect', 'skipped'
  const { result, resultLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  // Filtered questions based on tab selection
  const filteredQuestions = useMemo(() => {
    if (!result || !result.questions) return [];

    return result.questions.filter((question, index) => {
      const userAnswer =
        result.answeredQuestions[question._id] ||
        result.answeredQuestions[index + 1];

      const options = userAnswer?.options || question.options || [];
      const correctAnswer = userAnswer?.correctAnswer || question.correctAnswer;
      const selectedOption = userAnswer?.selectedOption;

      // Check correctness of user answer
      const isCorrect = options.some((option) => {
        const optLabel = typeof option === "object" ? option.label : null;
        const optText = typeof option === "object" ? option.option : option;

        const matchesCorrect =
          (optLabel &&
            correctAnswer &&
            optLabel.toString().trim().toUpperCase() ===
              correctAnswer.toString().trim().toUpperCase()) ||
          (optText &&
            correctAnswer &&
            optText.toString().trim().toLowerCase() ===
              correctAnswer.toString().trim().toLowerCase());

        const matchesSelected =
          (optLabel &&
            selectedOption &&
            optLabel.toString().trim().toUpperCase() ===
              selectedOption.toString().trim().toUpperCase()) ||
          (optText &&
            selectedOption &&
            optText.toString().trim().toLowerCase() ===
              selectedOption.toString().trim().toLowerCase());

        return matchesCorrect && matchesSelected;
      });

      if (filter === "correct") return userAnswer && isCorrect;
      if (filter === "incorrect") return userAnswer && !isCorrect;
      if (filter === "skipped") return !userAnswer;
      return true; // 'all'
    });
  }, [result, filter]);

  if (resultLoading) {
    return (
      <div className="flex min-h-[60vh] w-full items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="h-10 w-10 rounded-full border-2 border-[#0284C7] border-t-transparent"
        />
      </div>
    );
  }

  if (!result) {
    return (
      <NotFound
        status={404}
        msg={"Complete a quiz to see your performance here."}
        notice={"No Quiz Results Found"}
      />
    );
  }

  return (
    <motion.main
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 sm:py-12 lg:px-8 selection:bg-sky-100 selection:text-sky-900"
    >
      {/* Navigation Header */}
      <motion.div
        variants={itemVariants}
        className="flex items-center justify-between"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate("/assessment")}
          className="group inline-flex items-center gap-2 rounded-xl border border-slate-200/80 bg-white px-3.5 py-2 text-xs font-semibold text-slate-600 shadow-2xs transition-colors hover:border-sky-200 hover:text-[#0284C7] dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:text-indigo-400"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          <span>Back to Assessments</span>
        </motion.button>
      </motion.div>

      {/* Stats Summary Component */}
      <motion.div variants={itemVariants}>
        <ResultStats
          finalScore={result.score}
          totalAnswered={Object.keys(result.answeredQuestions || {}).length}
          totalQuestions={result.questions.length}
          totalCorrect={result.correctAnswers}
        />
      </motion.div>

      {/* Review Header & Filters */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col items-start justify-between gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center dark:border-slate-800"
      >
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-sky-100 bg-sky-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#0284C7] dark:border-sky-900 dark:bg-sky-950/40">
            <Award className="h-3.5 w-3.5" />
            <span>Scorecard Analysis</span>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl dark:text-white">
            Detailed Question Review
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Analyze your answers and read explanations for each question.
          </p>
        </div>

        {/* Filter Tabs with Glide Pill */}
        <div className="flex items-center gap-1 rounded-xl border border-slate-200/80 bg-slate-100 p-1 text-xs font-semibold dark:border-slate-800 dark:bg-slate-900">
          {["all", "correct", "incorrect", "skipped"].map((tab) => {
            const isActive = filter === tab;
            return (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`relative px-3.5 py-2 capitalize transition-colors ${
                  isActive
                    ? "font-bold text-[#0284C7] dark:text-indigo-400"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="result-filter-pill"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="absolute inset-0 rounded-lg bg-white shadow-2xs ring-1 ring-slate-200/80 dark:bg-slate-800 dark:ring-slate-700"
                  />
                )}
                <span className="relative z-10">{tab}</span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Questions List with Animated Layout */}
      <motion.div variants={itemVariants} className="space-y-6">
        {filteredQuestions.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-2xs dark:border-slate-800 dark:bg-slate-900"
          >
            <p className="text-sm text-slate-500 dark:text-slate-400">
              No questions match this filter.
            </p>
          </motion.div>
        ) : (
          <motion.div layout className="space-y-6">
            <AnimatePresence mode="popLayout">
              {filteredQuestions.map((question, index) => {
                const originalIndex = result.questions.findIndex(
                  (q) => q._id === question._id,
                );
                const displayIndex =
                  originalIndex !== -1 ? originalIndex : index;

                const userAnswer =
                  result.answeredQuestions[question._id] ||
                  result.answeredQuestions[displayIndex + 1];

                const options = userAnswer?.options || question.options || [];
                const correctAnswer =
                  userAnswer?.correctAnswer || question.correctAnswer;
                const selectedOption = userAnswer?.selectedOption;
                const explanation =
                  userAnswer?.explanation || question.explanation;

                return (
                  <motion.div
                    key={question._id || displayIndex}
                    layout
                    variants={cardMotionVariant}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-5 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-7 dark:border-slate-800 dark:bg-slate-900"
                  >
                    {/* Question Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-xs font-bold text-[#0284C7] ring-1 ring-sky-200 dark:bg-indigo-950/50 dark:text-indigo-400 dark:ring-indigo-900">
                          Q{displayIndex + 1}
                        </span>
                        <h3 className="pt-0.5 text-base font-semibold leading-snug text-slate-900 sm:text-lg dark:text-white">
                          {question.question}
                        </h3>
                      </div>

                      <span className="shrink-0 rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                        {question.points || 10} pts
                      </span>
                    </div>

                    {/* Options List */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {options.map((option, i) => {
                        const optLabel =
                          typeof option === "object" ? option.label : null;
                        const optText =
                          typeof option === "object" ? option.option : option;

                        const isCorrect =
                          (optLabel &&
                            correctAnswer &&
                            optLabel.toString().trim().toUpperCase() ===
                              correctAnswer.toString().trim().toUpperCase()) ||
                          (optText &&
                            correctAnswer &&
                            optText.toString().trim().toLowerCase() ===
                              correctAnswer.toString().trim().toLowerCase());

                        const isSelected =
                          (optLabel &&
                            selectedOption &&
                            optLabel.toString().trim().toUpperCase() ===
                              selectedOption.toString().trim().toUpperCase()) ||
                          (optText &&
                            selectedOption &&
                            optText.toString().trim().toLowerCase() ===
                              selectedOption.toString().trim().toLowerCase());

                        let optionStyle =
                          "border-slate-200 bg-slate-50/50 text-slate-700 dark:border-slate-800 dark:bg-slate-800/40 dark:text-slate-300";
                        if (isCorrect) {
                          optionStyle =
                            "bg-emerald-50/80 text-emerald-900 border-emerald-300 font-medium dark:bg-emerald-950/30 dark:text-emerald-200 dark:border-emerald-800/60";
                        } else if (isSelected && !isCorrect) {
                          optionStyle =
                            "bg-rose-50/80 text-rose-900 border-rose-300 font-medium dark:bg-rose-950/30 dark:text-rose-200 dark:border-rose-800/60";
                        }

                        return (
                          <motion.div
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 transition-colors ${optionStyle}`}
                          >
                            <span className="flex items-center gap-2 text-sm">
                              {optLabel && (
                                <strong className="font-semibold">
                                  {optLabel}.
                                </strong>
                              )}
                              <span>{optText}</span>
                            </span>

                            <div className="flex shrink-0 items-center gap-1.5 text-xs font-semibold">
                              {isCorrect && (
                                <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-200/70 px-2.5 py-1 text-emerald-900 dark:bg-emerald-900/50 dark:text-emerald-300">
                                  <CheckCircle2 className="h-3.5 w-3.5" />
                                  Correct
                                </span>
                              )}
                              {isSelected && !isCorrect && (
                                <span className="inline-flex items-center gap-1 rounded-lg bg-rose-200/70 px-2.5 py-1 text-rose-900 dark:bg-rose-900/50 dark:text-rose-300">
                                  <XCircle className="h-3.5 w-3.5" />
                                  Your Answer
                                </span>
                              )}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>

                    {/* Unanswered Notice */}
                    {!userAnswer && (
                      <div className="flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs font-medium text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-300">
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        <span>You skipped this question.</span>
                      </div>
                    )}

                    {/* Explanation */}
                    {explanation && (
                      <div className="space-y-1 rounded-xl border border-sky-100 bg-sky-50/70 p-4 text-xs sm:text-sm text-sky-900 leading-relaxed dark:border-sky-900/50 dark:bg-sky-950/30 dark:text-sky-200">
                        <div className="flex items-center gap-1.5 font-bold text-sky-950 dark:text-sky-100">
                          <Lightbulb className="h-4 w-4 text-[#0284C7] dark:text-sky-400" />
                          <span>Explanation</span>
                        </div>
                        <p className="opacity-90">{explanation}</p>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </motion.div>
    </motion.main>
  );
}
