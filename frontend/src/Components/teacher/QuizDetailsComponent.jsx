import { Link, useNavigate, useLocation } from "react-router-dom";
export default function QuizDetailsComponent({ quiz }, quizId) {
  const isPublished = quiz.status === "Published";
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
      <div className="min-h-screen w-full bg-slate-50/80 p-6 md:p-10">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Top Header Bar with Compulsory Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/80">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-4 py-2 rounded-xl shadow-sm transition-all w-fit cursor-pointer"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
              Back
            </button>

            <div className="flex items-center gap-3">
              <Link
                to="/admin/editquiz"
                state={{ id: quizId }}
                className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-4 py-2 rounded-xl text-sm font-semibold shadow-sm transition-all"
              >
                <svg
                  className="w-4 h-4 text-slate-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                  />
                </svg>
                Edit Quiz
              </Link>

              <Link
                to="/admin/quiz/add-questions"
                state={{ id: quizId }}
                className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-sm shadow-sky-600/20 transition-all"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                Add Questions
              </Link>
            </div>
          </div>

          {/* Title & Status Header Card */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 md:p-8 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-xs font-semibold tracking-wide uppercase bg-sky-50 text-sky-700 border border-sky-100 px-3 py-1 rounded-full">
                    {quiz.category}
                  </span>
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                      quiz.difficulty === "Hard"
                        ? "bg-rose-50 text-rose-700 border-rose-200"
                        : quiz.difficulty === "Medium"
                          ? "bg-amber-50 text-amber-700 border-amber-200"
                          : "bg-emerald-50 text-emerald-700 border-emerald-200"
                    }`}
                  >
                    {quiz.difficulty}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${
                      isPublished
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-amber-50 text-amber-700 border border-amber-200"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${isPublished ? "bg-emerald-500" : "bg-amber-500"}`}
                    />
                    {quiz.status}
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
                  {quiz.title}
                </h1>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed mt-4">
              {quiz.description}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-100">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                  Total Questions
                </p>
                <p className="text-base font-bold text-slate-800 mt-0.5">
                  {quiz.totalQuestions} Qs
                </p>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                  Max Marks
                </p>
                <p className="text-base font-bold text-slate-800 mt-0.5">
                  {quiz.maximumMarks}
                </p>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                  Duration
                </p>
                <p className="text-base font-bold text-slate-800 mt-0.5">
                  {quiz.duration} Mins
                </p>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                  Negative Marking
                </p>
                <p className="text-base font-bold text-slate-800 mt-0.5">
                  {quiz.negativeMarks > 0
                    ? `-${quiz.negativeMarks} Marks`
                    : "None"}
                </p>
              </div>
            </div>
          </div>

          {/* Detailed Sections Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm">
                <h2 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  Syllabus
                </h2>
                <div className="text-sm text-slate-600 whitespace-pre-line bg-slate-50 p-4 rounded-xl border border-slate-100">
                  {quiz.syllabus}
                </div>
              </div>

              <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm">
                <h2 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  Quiz Rules
                </h2>
                <div className="text-sm text-slate-600 whitespace-pre-line bg-slate-50 p-4 rounded-xl border border-slate-100">
                  {quiz.rules}
                </div>
              </div>

              <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm">
                <h2 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  Instructions for Students
                </h2>
                <div className="text-sm text-slate-600 whitespace-pre-line bg-slate-50 p-4 rounded-xl border border-slate-100">
                  {quiz.instructions}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm space-y-4">
                <h2 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100">
                  Configuration & Settings
                </h2>

                <div className="flex items-center justify-between text-sm py-1">
                  <span className="text-slate-500">Timer Enabled</span>
                  <span
                    className={`font-semibold px-2.5 py-0.5 rounded-md text-xs ${quiz.timerEnabled ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}
                  >
                    {quiz.timerEnabled ? "Yes" : "No"}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm py-1">
                  <span className="text-slate-500">Points / Question</span>
                  <span className="font-semibold text-slate-800">
                    {quiz.pointsPerQuestion} pts
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm py-1">
                  <span className="text-slate-500">Schedule Enabled</span>
                  <span
                    className={`font-semibold px-2.5 py-0.5 rounded-md text-xs ${quiz.scheduleEnabled ? "bg-sky-50 text-sky-700" : "bg-slate-100 text-slate-600"}`}
                  >
                    {quiz.scheduleEnabled ? "Yes" : "No"}
                  </span>
                </div>

                {quiz.scheduleEnabled && (
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs space-y-1.5 text-slate-600">
                    <p>
                      <strong className="text-slate-700">Start:</strong>{" "}
                      {quiz.startDate} at {quiz.startTime}
                    </p>
                    <p>
                      <strong className="text-slate-700">End:</strong>{" "}
                      {quiz.endDate} at {quiz.endTime}
                    </p>
                  </div>
                )}

                <div className="pt-3 border-t border-slate-100">
                  <p className="text-xs text-slate-400">
                    Database ID Reference (from state)
                  </p>
                  <p className="text-xs font-mono text-slate-600 mt-0.5 bg-slate-50 p-2 rounded border border-slate-100 break-all">
                    {quizId || "No ID passed in state"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
