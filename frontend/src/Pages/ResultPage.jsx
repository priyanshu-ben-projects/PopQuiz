import { NotFound } from "../index";
import ResultStats from "../Components/ResultStats";
import axios from "axios";
import { useEffect, useState, useContext, useMemo } from "react";
import AuthContext from "../context/AuthContext.js";
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  HelpCircle,
  Lightbulb,
  ArrowLeft,
  Filter,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ResultPage() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // 'all', 'correct', 'incorrect', 'skipped'

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await axios.get("/api/quiz/result", user);
        const { score, answeredQuestions, questions, correctAnswers } =
          response.data;

        setResult({
          score,
          answeredQuestions: answeredQuestions || {},
          questions: questions || [],
          correctAnswers: correctAnswers || 0,
        });
      } catch (error) {
        console.error("Failed to fetch quiz results", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [user]);

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

  if (loading) {
    return (
      <div className="w-full min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
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
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 space-y-8 pb-16">
      {/* Navigation Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate("/assessment")}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Assessments
        </button>
      </div>

      {/* Stats Summary Component */}
      <ResultStats
        finalScore={result.score}
        totalAnswered={Object.keys(result.answeredQuestions).length}
        totalQuestions={result.questions.length}
        totalCorrect={result.correctAnswers}
      />

      {/* Review Header & Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            Detailed Question Review
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Analyze your answers and read explanations for each question.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold">
          {["all", "correct", "incorrect", "skipped"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-lg capitalize transition-all ${
                filter === tab
                  ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {filteredQuestions.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
            <p className="text-slate-500 text-sm">
              No questions match this filter.
            </p>
          </div>
        ) : (
          filteredQuestions.map((question, index) => {
            const originalIndex = result.questions.findIndex(
              (q) => q._id === question._id,
            );
            const displayIndex = originalIndex !== -1 ? originalIndex : index;

            const userAnswer =
              result.answeredQuestions[question._id] ||
              result.answeredQuestions[displayIndex + 1];

            const options = userAnswer?.options || question.options || [];
            const correctAnswer =
              userAnswer?.correctAnswer || question.correctAnswer;
            const selectedOption = userAnswer?.selectedOption;
            const explanation = userAnswer?.explanation || question.explanation;

            return (
              <div
                key={question._id || displayIndex}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-7 shadow-xs space-y-5 transition-all"
              >
                {/* Question Header */}
                <div className="flex justify-between items-start gap-4">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center h-8 w-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 font-bold text-xs flex-shrink-0">
                      Q{displayIndex + 1}
                    </span>
                    <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white leading-snug pt-0.5">
                      {question.question}
                    </h3>
                  </div>

                  <span className="text-xs font-semibold px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full flex-shrink-0 border border-slate-200 dark:border-slate-700">
                    {question.points || 10} pts
                  </span>
                </div>

                {/* Options List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

                    // Dynamic card styling
                    let optionStyle =
                      "border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300";
                    if (isCorrect) {
                      optionStyle =
                        "bg-emerald-50/80 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200 border-emerald-300 dark:border-emerald-800/60 font-medium";
                    } else if (isSelected && !isCorrect) {
                      optionStyle =
                        "bg-rose-50/80 dark:bg-rose-950/30 text-rose-900 dark:text-rose-200 border-rose-300 dark:border-rose-800/60 font-medium";
                    }

                    return (
                      <div
                        key={i}
                        className={`flex items-center justify-between w-full px-4 py-3 rounded-xl border transition-all ${optionStyle}`}
                      >
                        <span className="text-sm flex items-center gap-2">
                          {optLabel && (
                            <strong className="font-semibold">
                              {optLabel}.
                            </strong>
                          )}
                          <span>{optText}</span>
                        </span>

                        <div className="flex items-center gap-1.5 flex-shrink-0 text-xs font-semibold">
                          {isCorrect && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-200/70 dark:bg-emerald-900/50 text-emerald-900 dark:text-emerald-300 rounded-lg">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Correct
                            </span>
                          )}
                          {isSelected && !isCorrect && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-rose-200/70 dark:bg-rose-900/50 text-rose-900 dark:text-rose-300 rounded-lg">
                              <XCircle className="w-3.5 h-3.5" />
                              Your Answer
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Unanswered Notice */}
                {!userAnswer && (
                  <div className="flex items-center gap-2 text-xs font-medium text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 p-3 rounded-xl border border-amber-200 dark:border-amber-900/50">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>You skipped this question.</span>
                  </div>
                )}

                {/* Explanation */}
                {explanation && (
                  <div className="p-4 bg-sky-50/70 dark:bg-sky-950/30 border border-sky-100 dark:border-sky-900/50 rounded-xl text-xs sm:text-sm text-sky-900 dark:text-sky-200 leading-relaxed space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-sky-950 dark:text-sky-100">
                      <Lightbulb className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                      <span>Explanation</span>
                    </div>
                    <p className="opacity-90">{explanation}</p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
