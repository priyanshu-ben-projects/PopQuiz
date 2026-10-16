import RenderOptions from "./RenderOptions";

function RenderQuestions({
  questionId,
  currentQuestion,
  options,
  onAnswer,
  isAnswered,
  isDisabled,
}) {
  return (
    <>
      <div
        className="w-full rounded-3xl bg-white p-6 shadow-xl shadow-indigo-100/60 ring-1 ring-slate-200/70 transition-shadow duration-300 hover:shadow-2xl hover:shadow-indigo-100 sm:p-8"
        key={questionId}
      >
        <div className="mb-5">
          <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-indigo-600 ring-1 ring-inset ring-indigo-100">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500"></span>
            Question {questionId}
          </span>
        </div>
        <h1 className="mb-7 text-2xl font-extrabold leading-snug tracking-tight text-slate-900 sm:text-[1.75rem]">
          {currentQuestion}
        </h1>
        <form
          action="#"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <RenderOptions
            options={options}
            questionId={questionId}
            isAnswered={isAnswered}
            isDisabled={isDisabled}
            onAnswer={onAnswer}
          ></RenderOptions>
        </form>
      </div>
    </>
  );
}

export default RenderQuestions;
