export default function ProgressBar({ currIndex, questions }) {
  const totalQuestions = questions.length;
  const currentNumber = currIndex + 1;
  const progressPercent = Math.round((currentNumber / totalQuestions) * 100);

  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between text-xs font-semibold tracking-wide text-slate-500 uppercase">
        <span>Progress</span>
        <span className="font-bold text-indigo-600">
          {currentNumber} <span className="text-slate-400">/</span>{" "}
          {totalQuestions} Questions
        </span>
      </div>

      <div className="relative h-3 w-full overflow-hidden rounded-full bg-slate-100 ring-1 ring-inset ring-slate-200/60">
        <div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600 transition-all duration-500 ease-out shadow-xs"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="flex justify-end text-[11px] font-medium text-slate-400">
        <span>{progressPercent}% Complete</span>
      </div>
    </div>
  );
}
