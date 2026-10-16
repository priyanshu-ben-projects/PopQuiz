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
      <div className="mx-auto w-full max-w-2xl space-y-6 px-4 py-8 sm:px-6 sm:py-10">
        {/* { Progress Bar } */}
        <ProgressBar
          currIndex={index}
          currentScore={score}
          questions={questions}
        ></ProgressBar>

        <div className="flex w-full flex-col items-center justify-center gap-6">
          {/* { Questions Here} */}
          <RenderQuestions
            questionId={question.id}
            options={question.options}
            currentQuestion={question.question}
            isAnswered={!!currentAnswer}
            isDisabled={!!currentAnswer}
            selectedOption={currentAnswer?.selectedOption}
            onAnswer={updatePoints}
          ></RenderQuestions>

          {/* { Show Result } */}
          <h3
            className={`${currentAnswer?.styling ?? ""} w-full text-center text-lg font-bold tracking-tight empty:hidden`}
          >
            {currentAnswer?.message}
          </h3>

          {/* Explanation */}
          <h3 className="explanation w-full rounded-2xl bg-indigo-50/70 px-5 py-4 text-left text-sm font-medium leading-relaxed text-indigo-900 ring-1 ring-inset ring-indigo-100 before:mb-1 before:block before:text-[11px] before:font-bold before:uppercase before:tracking-[0.2em] before:text-indigo-500 before:content-['Explanation']">
            {currentAnswer && question.explanation}
          </h3>

          {/* Navigation */}
          <div className="flex w-full items-center justify-between gap-3 border-t border-slate-200/80 pt-6 sm:gap-4">
            {/* Previous Button */}
            <button
              className="inline-flex h-12 min-w-[3.5rem] shrink-0 cursor-pointer select-none items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 text-lg font-semibold text-slate-600 shadow-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 hover:shadow-md active:translate-y-0 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
              onClick={() => {
                setIndex((prev) => Math.max(0, prev - 1));
              }}
            >
              ←<span className="ml-2 hidden text-sm sm:inline">Previous</span>
            </button>

            {/* Next Button */}
            <button
              className="inline-flex h-12 flex-1 cursor-pointer select-none items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-8 text-lg font-bold text-white shadow-lg shadow-indigo-500/30 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:from-indigo-500 hover:to-violet-500 hover:shadow-xl hover:shadow-indigo-500/40 active:translate-y-0 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 sm:min-w-[170px] sm:flex-none"
              onClick={() => {
                setIndex((prev) => Math.min(questions.length - 1, prev + 1));
              }}
            >
              <span className="mr-2 hidden text-sm sm:inline">Next</span>→
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
