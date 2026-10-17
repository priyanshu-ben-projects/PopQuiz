import { useState } from "react";
import RenderQuestions from "./RenderQuestions";
import ProgressBar from "./ProgressBar";

export default function QuestionCard({ questions }) {
  const [score, setScore] = useState(0);
  const [index, setIndex] = useState(0);

  const question = questions[index];
  const [answeredQuestions, setAnsweredQuestions] = useState({});
  const currentAnswer = answeredQuestions[question?.id];

  const updatePoints = (selectedOption) => {
    if (answeredQuestions[question.id]) return;
    const isCorrect = selectedOption === question.correctAnswer;

    setAnsweredQuestions((prev) => ({
      ...prev,
      [question.id]: {
        selectedOption,
        isCorrect,
        message: isCorrect ? "Correct Answer ✅" : "Wrong Answer ❎",
        styling: isCorrect
          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
          : "bg-rose-50 text-rose-700 border-rose-200",
      },
    }));

    if (isCorrect) {
      setScore((prev) => prev + 10);
    }
  };

  if (!question) return null;

  return (
    <div className="min-h-screen w-full bg-slate-50/50 text-slate-800 antialiased selection:bg-indigo-500 selection:text-white flex items-center justify-center">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Main Question Column */}
          <div className="lg:col-span-8 w-full space-y-6">
            <RenderQuestions
              questionId={question.id}
              options={question.options}
              currentQuestion={question.question}
              isAnswered={!!currentAnswer}
              isDisabled={!!currentAnswer}
              selectedOption={currentAnswer?.selectedOption}
              onAnswer={updatePoints}
            />
          </div>

          {/* Sidebar Controls Column */}
          <div className="lg:col-span-4 space-y-5 lg:sticky lg:top-8">
            {/* Progress Card */}
            <div className="w-full rounded-2xl bg-white border border-slate-200/80 p-5 shadow-sm">
              <ProgressBar currIndex={index} />
            </div>

            {/* Dynamic Answer Feedback Alert */}
            {currentAnswer?.message && (
              <div
                className={`w-full text-center text-sm font-bold tracking-wide px-5 py-3.5 rounded-2xl border shadow-xs transition-all duration-300 animate-in fade-in slide-in-from-top-2 ${
                  currentAnswer?.styling ?? ""
                }`}
              >
                {currentAnswer.message}
              </div>
            )}

            {/* Explanation Box */}
            {currentAnswer && question.explanation && (
              <div className="w-full rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50/50 to-purple-50/30 p-5 text-left text-sm font-medium leading-relaxed shadow-xs space-y-1.5">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-indigo-600">
                  Explanation
                </span>
                <p className="text-slate-700 text-sm leading-relaxed">
                  {question.explanation}
                </p>
              </div>
            )}

            {/* Navigation Buttons Card */}
            <div className="w-full rounded-2xl bg-white border border-slate-200/80 p-4 flex items-center justify-between gap-3 shadow-sm">
              {/* Previous Button */}
              <button
                type="button"
                disabled={index === 0}
                className="inline-flex h-11 flex-1 cursor-pointer select-none items-center justify-center rounded-xl border border-slate-200/80 bg-white px-4 text-sm font-semibold text-slate-700 shadow-2xs transition-all duration-150 hover:bg-slate-50 hover:border-slate-300 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100"
                onClick={() => setIndex((prev) => Math.max(0, prev - 1))}
              >
                <span className="mr-1.5">←</span>
                <span>Previous</span>
              </button>

              {/* Next Button */}
              <button
                type="button"
                disabled={index === questions.length - 1}
                className="inline-flex h-11 flex-1 cursor-pointer select-none items-center justify-center rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white shadow-xs transition-all duration-150 hover:bg-indigo-700 hover:shadow-indigo-200 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100"
                onClick={() =>
                  setIndex((prev) => Math.min(questions.length - 1, prev + 1))
                }
              >
                <span>Next</span>
                <span className="ml-1.5">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
