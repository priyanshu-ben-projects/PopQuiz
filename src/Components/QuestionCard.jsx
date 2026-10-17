import { useState } from "react";
import RenderQuestions from "./RenderQuestions";
import ProgressBar from "./ProgressBar";

export default function QuestionCard({ questions }) {
  const [score, setScore] = useState(0);
  const [index, setIndex] = useState(0);

  const question = questions[index];
  const [answeredQuestions, setAnsweredQuestions] = useState({});
  const currentAnswer = answeredQuestions[question.id];

  const updatePoints = (selectedOption) => {
    if (answeredQuestions[question.id]) return;
    const isCorrect = selectedOption === question.correctAnswer;

    setAnsweredQuestions((prev) => ({
      ...prev,
      [question.id]: {
        selectedOption,
        isCorrect,
        message: isCorrect ? "Correct Answer ✅" : "Wrong Answer ❎",
        styling: isCorrect ? "text-green-500" : "text-red-500",
      },
    }));

    if (isCorrect) {
      setScore((prev) => prev + 10);
    }
  };

  return (
    <>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Desktop Widescreen Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column / Main Question Card */}
          <div
            className="lg:col-span-8 rounded-3xl border p-6 sm:p-10 shadow-xs transition-all duration-300 space-y-8"
            style={{
              backgroundColor: "var(--color-surface)",
              borderColor: "var(--color-border)",
            }}
          >
            <div className="flex w-full flex-col items-center justify-center">
              {/* Question & Options Component */}
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
          </div>

          {/* Right Column / Sidebar for Progress, Feedback, Explanation & Navigation */}
          <div className="lg:col-span-4 space-y-6 sticky top-28">
            {/* Progress Bar Container in Sidebar */}
            <div
              className="w-full rounded-2xl border p-5 shadow-xs"
              style={{
                backgroundColor: "var(--color-surface)",
                borderColor: "var(--color-border)",
              }}
            >
              <ProgressBar
                currIndex={index}
                currentScore={score}
                questions={questions}
              />
            </div>

            {/* Answer Result Feedback Card */}
            {currentAnswer?.message && (
              <div
                className={`w-full text-center text-base font-bold tracking-tight px-5 py-3.5 rounded-2xl border shadow-xs transition-all duration-200 animate-fadeIn ${currentAnswer?.styling ?? ""}`}
                style={{
                  backgroundColor: "var(--color-surface)",
                  borderColor: "var(--color-border)",
                  color: "var(--color-text)",
                }}
              >
                {currentAnswer.message}
              </div>
            )}

            {/* Explanation Box with Pinkish Accent */}
            {currentAnswer && question.explanation && (
              <div
                className="w-full rounded-2xl p-6 text-left text-sm font-medium leading-relaxed ring-1 ring-inset shadow-2xs space-y-2"
                style={{
                  backgroundColor: "var(--color-hover)",
                  color: "var(--color-text)",
                  borderColor: "var(--color-primary)",
                }}
              >
                <span
                  className="block text-xs font-bold uppercase tracking-[0.2em]"
                  style={{ color: "var(--color-purple)" }}
                >
                  Explanation
                </span>
                <p className="leading-relaxed">{question.explanation}</p>
              </div>
            )}

            {/* Navigation Controls Card */}
            <div
              className="w-full rounded-2xl border p-5 flex items-center justify-between gap-4 shadow-xs"
              style={{
                backgroundColor: "var(--color-surface)",
                borderColor: "var(--color-border)",
              }}
            >
              {/* Previous Button */}
              <button
                type="button"
                className="inline-flex h-12 flex-1 cursor-pointer select-none items-center justify-center rounded-xl border px-4 text-sm font-semibold shadow-2xs transition-all duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={{
                  backgroundColor: "var(--color-background)",
                  borderColor: "var(--color-border)",
                  color: "var(--color-text)",
                }}
                onClick={() => {
                  setIndex((prev) => Math.max(0, prev - 1));
                }}
              >
                <span>←</span>
                <span className="ml-2">Previous</span>
              </button>

              {/* Next Button styled with Pinkish/Accent theme */}
              <button
                type="button"
                className="inline-flex h-12 flex-1 cursor-pointer select-none items-center justify-center rounded-xl px-4 text-sm font-bold shadow-xs transition-all duration-200 ease-out hover:-translate-y-0.5 hover:opacity-95 active:translate-y-0 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={{
                  backgroundColor: "var(--color-accent)",
                  color: "#FFFFFF",
                }}
                onClick={() => {
                  setIndex((prev) => Math.min(questions.length - 1, prev + 1));
                }}
              >
                <span className="mr-2">Next</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
