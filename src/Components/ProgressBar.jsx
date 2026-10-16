export default function ProgressBar({ questions, currentScore, currIndex }) {
  return (
    <>
      {/* Score + Progress */}
      <div className="rounded-3xl bg-white p-5 shadow-xl shadow-indigo-100/60 ring-1 ring-slate-200/70 sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-100 to-amber-200 text-2xl shadow-inner">
              🏆
            </div>

            <div className="flex flex-col leading-none">
              <span className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                Your Score
              </span>

              <span className="text-3xl font-extrabold tracking-tight text-slate-900">
                {currentScore}
                <span className="ml-1 text-sm font-semibold text-slate-400">
                  pts
                </span>
              </span>
            </div>
          </div>

          <div className="flex flex-col items-end leading-none">
            <span className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              Progress
            </span>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              {currIndex + 1}
              <span className="text-slate-300"> / </span>
              <span className="text-slate-400">{questions.length}</span>
            </span>
          </div>
        </div>

        <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-500 ease-out"
            style={{ width: `${((currIndex + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>
    </>
  );
}
