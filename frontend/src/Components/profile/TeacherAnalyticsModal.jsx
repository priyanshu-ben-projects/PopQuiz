import {
  X,
  Users,
  Target,
  CircleCheck,
  CircleX,
  BarChart3,
  CalendarDays,
  BookOpen,
  TrendingUp,
} from "lucide-react";

function TeacherAnalyticsModal({ record, onClose }) {
  if (!record) return null;

  const participants = Number(record.participants) || 0;
  const completedAttempts = Number(record.completedAttempts) || 0;
  const averageScore = Number(record.score) || 0;

  const completionRate =
    participants > 0 ? Math.round((completedAttempts / participants) * 100) : 0;

  const formattedDate = record.date
    ? new Date(record.date).toLocaleDateString(undefined, {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Not available";

  const metrics = [
    {
      label: "Participants",
      value: participants,
      icon: Users,
      iconClass: "text-sky-600",
      iconBackground: "bg-sky-50",
    },
    {
      label: "Completed Attempts",
      value: completedAttempts,
      icon: CircleCheck,
      iconClass: "text-emerald-600",
      iconBackground: "bg-emerald-50",
    },
    {
      label: "Average Score",
      value: `${averageScore}%`,
      icon: Target,
      iconClass: "text-violet-600",
      iconBackground: "bg-violet-50",
    },
    {
      label: "Completion Rate",
      value: `${completionRate}%`,
      icon: TrendingUp,
      iconClass: "text-amber-600",
      iconBackground: "bg-amber-50",
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="teacher-analytics-title"
        className="my-auto w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 px-5 py-5 sm:px-7">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-sky-50 p-3">
              <BarChart3 size={22} className="text-sky-600" />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-sky-600">
                Teacher Dashboard
              </p>

              <h2
                id="teacher-analytics-title"
                className="mt-1 text-xl font-bold text-slate-900"
              >
                Quiz Analytics
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {record.title || "Quiz Details"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close analytics"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Quiz summary */}
        <div className="space-y-6 px-5 py-6 sm:px-7">
          <div className="flex flex-col gap-4 rounded-2xl bg-gradient-to-r from-sky-600 to-sky-500 p-5 text-white sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2 text-sky-100">
                <BookOpen size={17} />
                <span className="text-sm">Quiz Category</span>
              </div>

              <p className="mt-2 text-lg font-bold">
                {record.category || "Uncategorized"}
              </p>

              <div className="mt-3 flex items-center gap-2 text-sm text-sky-100">
                <CalendarDays size={15} />
                {formattedDate}
              </div>
            </div>

            <div className="rounded-xl border border-white/20 bg-white/10 p-4 sm:min-w-32">
              <p className="text-sm text-sky-100">Average Score</p>
              <p className="mt-1 text-3xl font-bold">{averageScore}%</p>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {metrics.map(
              ({ label, value, icon: Icon, iconClass, iconBackground }) => (
                <div
                  key={label}
                  className="rounded-xl border border-slate-200 p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm text-slate-500">{label}</p>

                      <p className="mt-2 text-2xl font-bold text-slate-900">
                        {value}
                      </p>
                    </div>

                    <div className={`rounded-xl p-3 ${iconBackground}`}>
                      <Icon size={21} className={iconClass} />
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>

          {/* Completion progress */}
          <div className="rounded-xl border border-slate-200 p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="font-semibold text-slate-900">
                  Participation Overview
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Completed attempts compared with participants
                </p>
              </div>

              <Users size={21} className="shrink-0 text-sky-600" />
            </div>

            <div className="mt-5 flex items-center justify-between text-sm">
              <span className="text-slate-600">Completion</span>

              <span className="font-semibold text-slate-900">
                {completedAttempts} / {participants}
              </span>
            </div>

            <div
              className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-100"
              role="progressbar"
              aria-label="Completion rate"
              aria-valuenow={completionRate}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="h-full rounded-full bg-sky-600 transition-all"
                style={{
                  width: `${Math.min(100, completionRate)}%`,
                }}
              />
            </div>

            {participants === 0 && (
              <p className="mt-3 text-xs text-slate-500">
                Participation statistics will appear when attempt data becomes
                available.
              </p>
            )}
          </div>

          {/* Remaining attempts */}
          <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
            <CircleX size={20} className="text-amber-600" />

            <div>
              <p className="text-sm font-semibold text-slate-800">
                Remaining Attempts
              </p>

              <p className="mt-1 text-sm text-slate-500">
                {Math.max(0, participants - completedAttempts)} participant(s)
                have not completed the quiz.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-slate-100 bg-slate-50 px-5 py-4 sm:px-7">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-700"
          >
            Close Analytics
          </button>
        </div>
      </div>
    </div>
  );
}

export default TeacherAnalyticsModal;
