export default function RenderOptions({
  options,
  questionId,
  isAnswered,
  isDisabled,
  onAnswer,
}) {
  return (
    <>
      <div className="flex flex-col gap-3">
        {options.map((option, i) => (
          <label
            key={i}
            htmlFor={option.label + questionId}
            className="group flex cursor-pointer select-none items-center gap-4 rounded-2xl border-2 border-slate-100 bg-slate-50/70 px-4 py-3.5 text-base text-slate-700 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-white hover:shadow-md has-[:checked]:translate-y-0 has-[:checked]:border-indigo-500 has-[:checked]:bg-indigo-50 has-[:checked]:text-indigo-950 has-[:checked]:shadow-md has-[:checked]:shadow-indigo-100 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-indigo-400 has-[:focus-visible]:ring-offset-2 has-[:disabled]:cursor-not-allowed has-[:disabled]:hover:translate-y-0 has-[:disabled:not(:checked)]:opacity-50"
          >
            <input
              disabled={isAnswered}
              className={`peer sr-only ${
                isDisabled
                  ? "cursor-not-allowed opacity-60"
                  : "hover:border-indigo-500 hover:bg-indigo-50"
              }`}
              name={`selected-answer-${questionId}`}
              value={option.option}
              type="radio"
              id={option.label + questionId}
              onChange={() => {
                onAnswer(option.option);
              }}
            />
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-sm font-bold text-slate-500 shadow-sm ring-1 ring-inset ring-slate-200 transition-all duration-200 group-hover:text-indigo-600 group-has-[:checked]:bg-indigo-600 group-has-[:checked]:text-white group-has-[:checked]:ring-indigo-600">
              {option.option}
            </span>
            <span className="flex-1 font-semibold leading-snug">
              {option.label}
            </span>
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-slate-300 bg-white transition-all duration-200 group-has-[:checked]:border-indigo-600 group-has-[:checked]:bg-indigo-600">
              <span className="h-2 w-2 rounded-full bg-white opacity-0 transition-opacity duration-200 group-has-[:checked]:opacity-100"></span>
            </span>
          </label>
        ))}
      </div>
    </>
  );
}
