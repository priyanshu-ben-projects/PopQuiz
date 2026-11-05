import {
  ClipboardList,
  Target,
  Trophy,
  TrendingUp,
  BookOpen,
  Users,
  CircleCheckBig,
  BarChart3,
  GraduationCap,
  Briefcase,
} from "lucide-react";

function ProfileStats({ user, stats }) {
  const isTeacher = user?.accountType === "teacher";

  const studentStats = [
    {
      label: "Quizzes Attempted",
      value: stats?.quizzesAttempted ?? 0,
      icon: ClipboardList,
      description: "Total attempts",
    },
    {
      label: "Average Score",
      value: `${stats?.averageScore ?? 0}`,
      icon: Target,
      description: "Across your attempts",
    },
    {
      label: "Best Score",
      value: `${stats?.bestScore ?? 0}`,
      icon: Trophy,
      description: "Your personal best",
    },
    {
      label: "Completion Rate",
      value: `${stats?.completionRate ?? 0}%`,
      icon: TrendingUp,
      description: "Quizzes completed",
    },
  ];

  const teacherStats = [
    {
      label: "Quizzes Created",
      value: stats?.quizzesCreated ?? 0,
      icon: BookOpen,
      description: "Total quizzes",
    },
    {
      label: "Total Participants",
      value: stats?.totalParticipants ?? 0,
      icon: Users,
      description: "Across your quizzes",
    },
    {
      label: "Completed Attempts",
      value: stats?.completedAttempts ?? 0,
      icon: CircleCheckBig,
      description: "Learner submissions",
    },
    {
      label: "Average Score",
      value: `${stats?.averageScore ?? 0}%`,
      icon: BarChart3,
      description: "Across learner attempts",
    },
  ];

  const cards = isTeacher ? teacherStats : studentStats;

  return (
    <section>
      <div className="mb-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            {isTeacher ? "Teaching Overview" : "Learning Overview"}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            {isTeacher
              ? "Review your quiz activity and learner engagement."
              : "Track your quiz performance and learning progress."}
          </p>
        </div>

        {/* Role Badge Distinction */}
        <div className="self-start">
          {isTeacher ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 border border-indigo-200 shadow-xs">
              <Briefcase size={13} />
              Teacher Account
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 border border-sky-200 shadow-xs">
              <GraduationCap size={13} />
              Student Account
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ label, value, icon: Icon, description }) => (
          <div
            key={label}
            className={`rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
              isTeacher
                ? "border-slate-200 hover:border-indigo-200"
                : "border-slate-200 hover:border-sky-200"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-slate-500">{label}</p>
                <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                  {value}
                </p>
              </div>

              {/* Dynamic Icon Theme: Indigo for Teacher, Sky for Student */}
              <div
                className={`rounded-xl p-3 ${
                  isTeacher
                    ? "bg-indigo-50 text-indigo-600"
                    : "bg-sky-50 text-sky-600"
                }`}
              >
                <Icon size={22} />
              </div>
            </div>

            <p className="mt-4 text-xs text-slate-500">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProfileStats;
