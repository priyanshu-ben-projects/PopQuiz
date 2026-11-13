import { Link } from "react-router-dom";

export default function DisplayQuizCard({ quiz = [], onDelete }) {
  return (
    <div className="min-h-screen w-full bg-slate-50/80 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/80">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
                My Quizzes
              </h1>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-200/70 text-slate-700">
                {quiz.length}
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              Manage, organize, and track your created quizzes.
            </p>
          </div>

          <Link
            to="/admin/createquizz"
            className="inline-flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 active:scale-[0.99] text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-sm shadow-sky-600/20 transition-all"
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
            Create New Quiz
          </Link>
        </div>

        {/* Empty State */}
        {quiz.length === 0 ? (
          <div className="mt-12 bg-white border border-dashed border-slate-300 rounded-2xl p-12 text-center">
            <h3 className="text-lg font-semibold text-slate-900">
              No quizzes found
            </h3>
            <p className="text-sm text-slate-500 mt-1 mb-6">
              Get started by creating your first quiz for students or users.
            </p>
            <Link
              to="/admin/createquizz"
              className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition"
            >
              + Create New Quiz
            </Link>
          </div>
        ) : (
          /* Quiz Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
            {quiz.map((item) => {
              const id = item.id || item._id;
              const isPublished = item.status === "Published";

              // Formatting dates safely if they exist
              const formattedDate = item.createdAt
                ? new Date(item.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "";

              return (
                <div
                  key={id}
                  className="group flex flex-col justify-between bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-slate-300 transition-all duration-200"
                >
                  <div>
                    {/* Top Badges */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="text-xs font-semibold tracking-wide uppercase bg-sky-50 text-sky-700 border border-sky-100 px-3 py-1 rounded-full">
                        {item.category || "General"}
                      </span>

                      <div className="flex items-center gap-2">
                        {item.difficulty && (
                          <span
                            className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full border ${
                              item.difficulty === "Hard"
                                ? "bg-rose-50 text-rose-700 border-rose-200"
                                : item.difficulty === "Medium"
                                  ? "bg-amber-50 text-amber-700 border-amber-200"
                                  : "bg-emerald-50 text-emerald-700 border-emerald-200"
                            }`}
                          >
                            {item.difficulty}
                          </span>
                        )}
                        <span
                          className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${
                            isPublished
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                              : "bg-amber-50 text-amber-700 border border-amber-200/60"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isPublished ? "bg-emerald-500" : "bg-amber-500"
                            }`}
                          />
                          {item.status}
                        </span>
                      </div>
                    </div>

                    {/* Title & Description */}
                    <h2 className="text-lg font-bold text-slate-900 group-hover:text-sky-700 transition-colors line-clamp-1">
                      {item.title}
                    </h2>

                    <p className="text-sm text-slate-500 leading-relaxed mt-2 line-clamp-2 min-h-[2.75rem]">
                      {item.description || "No description provided."}
                    </p>
                  </div>

                  <div>
                    {/* Stats Box */}
                    <div className="grid grid-cols-3 gap-2 bg-slate-50 rounded-xl p-3 mt-5 border border-slate-100 text-center">
                      <div>
                        <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                          Questions
                        </p>
                        <p className="text-xs font-bold text-slate-800 mt-0.5">
                          {item.totalQuestions || item.questions || 0}
                        </p>
                      </div>

                      <div className="border-x border-slate-200 px-1">
                        <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                          Duration
                        </p>
                        <p className="text-xs font-bold text-slate-800 mt-0.5">
                          {item.duration || 0}m
                        </p>
                      </div>

                      <div>
                        <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                          Max Marks
                        </p>
                        <p className="text-xs font-bold text-slate-800 mt-0.5">
                          {item.maximumMarks || 0}
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons Footer */}
                    <div className="flex items-center justify-between border-t border-slate-100 mt-5 pt-4">
                      <Link
                        to="/admin/showQuizDetails"
                        state={{ id: id }}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-600 hover:text-sky-700 bg-sky-50 hover:bg-sky-100/70 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        Show More
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Link>

                      <button
                        type="button"
                        onClick={() => onDelete && onDelete(id)}
                        aria-label={`Delete ${item.title}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                      >
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
