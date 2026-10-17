import RenderOptions from "./RenderOptions";

function RenderQuestions({
  questionId,
  currentQuestion,
  options,
  onAnswer,
  isAnswered,
  isDisabled,
  selectedOption,
}) {
  return (
    <div className="w-full rounded-3xl bg-white p-6 sm:p-8 shadow-xl shadow-slate-200/50 border border-slate-200/80 transition-all duration-300">
      {/* Question Badge Header */}
      <div className="mb-4">
        <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3.5 py-1 text-xs font-bold tracking-wider text-indigo-600 border border-indigo-100">
          <span className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
          Question {questionId}
        </span>
      </div>

      {/* Main Question Title */}
      <h1 className="mb-6 text-xl sm:text-2xl font-bold leading-relaxed text-slate-900 tracking-tight">
        {currentQuestion}
      </h1>

      {/* Options Component */}
      <form onSubmit={(e) => e.preventDefault()}>
        <RenderOptions
          options={options}
          questionId={questionId}
          isAnswered={isAnswered}
          isDisabled={isDisabled}
          selectedOption={selectedOption}
          onAnswer={onAnswer}
        />
      </form>
    </div>
  );
}

export default RenderQuestions;
