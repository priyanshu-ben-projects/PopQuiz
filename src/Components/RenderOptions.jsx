export default function RenderOptions({
  options,
  questionId,
  isAnswered,
  isDisabled,
  selectedOption,
  onAnswer,
}) {
  return (
    <div className="flex flex-col gap-3.5">
      {options.map((option, i) => {
        const isSelected = selectedOption === option.option;

        return (
          <label
            key={i}
            htmlFor={`opt-${questionId}-${i}`}
            className={`group relative flex cursor-pointer select-none items-center justify-between rounded-2xl border-2 p-4 text-base font-medium transition-all duration-200 ease-in-out ${
              isSelected
                ? "border-indigo-600 bg-indigo-50/80 text-indigo-950 shadow-md shadow-indigo-100/50"
                : "border-slate-200/80 bg-white text-slate-700 hover:border-indigo-300 hover:bg-slate-50/80 hover:shadow-sm"
            } ${
              isAnswered
                ? "cursor-default opacity-90 hover:border-slate-200 hover:bg-white hover:shadow-none"
                : ""
            }`}
          >
            <div className="flex items-center gap-3.5 flex-1 pr-3">
              <input
                disabled={isAnswered}
                className="peer sr-only"
                name={`selected-answer-${questionId}`}
                value={option.option}
                type="radio"
                id={`opt-${questionId}-${i}`}
                checked={isSelected}
                onChange={() => onAnswer(option.option)}
              />

              {/* Option Badge (A, B, C, D) */}
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-bold transition-all duration-200 ${
                  isSelected
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 group-hover:bg-indigo-100 group-hover:text-indigo-700"
                }`}
              >
                {option.option}
              </span>

              {/* Option Text */}
              <span className="text-sm sm:text-base leading-snug font-semibold text-slate-800">
                {option.label}
              </span>
            </div>

            {/* Custom Radio Circle Checkbox */}
            <span
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200 ${
                isSelected
                  ? "border-indigo-600 bg-indigo-600"
                  : "border-slate-300 bg-white group-hover:border-indigo-400"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full bg-white transition-opacity duration-200 ${
                  isSelected ? "opacity-100" : "opacity-0"
                }`}
              />
            </span>
          </label>
        );
      })}
    </div>
  );
}
