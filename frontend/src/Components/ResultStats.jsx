import React from "react";
import { useNavigate } from "react-router-dom";
import {
  RotateCcw,
  Trophy,
  CheckCircle2,
  Target,
  Award,
  ChevronRight,
  BarChart3,
  Sparkles,
} from "lucide-react";

export default function ResultStats({
  finalScore = 85,
  totalAnswered = 10,
  totalQuestions = 10,
  totalCorrect = 8,
  onReviewAnswers, // optional callback if you support answer review
}) {
  const navigate = useNavigate();

  const handleRestart = () => {
    navigate("/assessment");
  };

  // Calculations
  const accuracyPercentage =
    totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

  const completionPercentage =
    totalQuestions > 0 ? Math.round((totalAnswered / totalQuestions) * 100) : 0;

  // Grade / Performance Feedback helper
  const getPerformanceTheme = (scorePercent) => {
    if (scorePercent >= 80) {
      return {
        label: "Outstanding!",
        subtext: "Mastery demonstrated across all sections",
        badgeBg: "bg-emerald-500/10 text-emerald-600 border-emerald-200/60",
        ringColor: "#10b981", // emerald-500
        icon: Trophy,
      };
    } else if (scorePercent >= 60) {
      return {
        label: "Good Job!",
        subtext: "Solid performance, minor room for review",
        badgeBg: "bg-blue-500/10 text-blue-600 border-blue-200/60",
        ringColor: "#3b82f6", // blue-500
        icon: Award,
      };
    } else {
      return {
        label: "Keep Practicing",
        subtext: "Review core concepts and try again",
        badgeBg: "bg-amber-500/10 text-amber-600 border-amber-200/60",
        ringColor: "#f59e0b", // amber-500
        icon: Sparkles,
      };
    }
  };

  const performance = getPerformanceTheme(accuracyPercentage);
  const PerformanceIcon = performance.icon;

  // SVG Gauge calculations
  const strokeWidth = 10;
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (accuracyPercentage / 100) * circumference;

  return (
    <div className="w-full  mx-auto space-y-6 p-2 sm:p-4">
      {/* Top Banner / Main Score Overview Card */}
      <div className="relative overflow-hidden bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-100/50 dark:shadow-none p-6 sm:p-8">
        {/* Subtle Background Glow */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Performance Summary Text */}
          <div className="flex-1 text-center md:text-left space-y-3">
            <div
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${performance.badgeBg}`}
            >
              <PerformanceIcon className="w-3.5 h-3.5" />
              <span>{performance.label}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Assessment Summary
            </h2>

            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm">
              {performance.subtext}
            </p>

            {/* Quick Pill Stats */}
            <div className="pt-2 flex flex-wrap gap-3 justify-center md:justify-start text-xs font-medium text-slate-600 dark:text-slate-300">
              <span className="bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200/60 dark:border-slate-700">
                Score:{" "}
                <strong className="text-indigo-600 dark:text-indigo-400 font-semibold">
                  {finalScore} pts
                </strong>
              </span>
              <span className="bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200/60 dark:border-slate-700">
                Accuracy:{" "}
                <strong className="text-emerald-600 dark:text-emerald-400 font-semibold">
                  {accuracyPercentage}%
                </strong>
              </span>
            </div>
          </div>

          {/* Radial Accuracy Gauge */}
          <div className="relative flex flex-col items-center justify-center shrink-0">
            <svg className="w-40 h-40 transform -rotate-90">
              {/* Background Circle */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                className="stroke-slate-100 dark:stroke-slate-800"
                strokeWidth={strokeWidth}
                fill="transparent"
              />
              {/* Progress Circle */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke={performance.ringColor}
                strokeWidth={strokeWidth}
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>

            {/* Center Gauge Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {accuracyPercentage}%
              </span>
              <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                Accuracy
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Key Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Score Card */}
        <div className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Final Score
            </span>
            <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400 group-hover:scale-110 transition-transform">
              <Trophy className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {finalScore}
            </span>
            <span className="text-xs text-slate-400 font-medium">pts</span>
          </div>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Total achieved score
          </p>
        </div>

        {/* Completion / Progress Card */}
        <div className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Questions Answered
            </span>
            <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400 group-hover:scale-110 transition-transform">
              <Target className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {totalAnswered}
            </span>
            <span className="text-sm font-medium text-slate-400">
              / {totalQuestions}
            </span>
          </div>

          {/* Visual Mini Progress Bar */}
          <div className="mt-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-blue-500 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        {/* Correct Answers Card */}
        <div className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Correct Answers
            </span>
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400 group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 tracking-tight">
              {totalCorrect}
            </span>
            <span className="text-xs font-medium text-slate-400">
              ({accuracyPercentage}%)
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Successful responses
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-2 flex flex-col sm:flex-row gap-3">
        {/* Optional Secondary Action */}
        {onReviewAnswers && (
          <button
            type="button"
            onClick={onReviewAnswers}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-slate-100 hover:bg-slate-200 active:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 px-5 py-3.5 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-300 cursor-pointer"
          >
            <BarChart3 className="w-4 h-4" />
            Review Answers
          </button>
        )}

        {/* Primary Action - Restart */}
        <button
          type="button"
          onClick={handleRestart}
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white px-6 py-3.5 text-sm sm:text-base font-semibold shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/35 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-indigo-100 dark:focus:ring-indigo-900/50 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          Retake Assessment
          <ChevronRight className="w-4 h-4 opacity-70" />
        </button>
      </div>
    </div>
  );
}
