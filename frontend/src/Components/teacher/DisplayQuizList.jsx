import { Link } from "react-router-dom";

export default function DisplayQuizList({ quiz }) {
  console.log(quiz);
  return (
    <>
      <div className="min-h-screen w-full bg-slate-50 p-6 md:p-10">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">My Quizzes</h1>
            <p className="text-slate-500 mt-2">
              Manage and organize your created quizzes.
            </p>
          </div>

          <button className="bg-sky-600 hover:bg-sky-700 text-white px-5 py-3 rounded-xl font-medium transition">
            <Link to="/admin/createquizz">+ Create New Quiz</Link>
          </button>
        </div>

        {/* Quiz Count */}
        <div className="mb-6">
          <p className="text-sm text-slate-500">
            Total Quizzes:{" "}
            <span className="font-semibold text-slate-900">{quiz.length}</span>
          </p>
        </div>

        {/* Quiz Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {quiz.map((quiz) => (
            <div
              key={quiz.id}
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <span className="text-xs font-semibold bg-sky-50 text-sky-700 px-3 py-1.5 rounded-full">
                  {quiz.category}
                </span>

                <span
                  className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
                    quiz.status === "Published"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {quiz.status}
                </span>
              </div>

              {/* Quiz Information */}
              <h2 className="text-xl font-bold text-slate-900 mb-2">
                {quiz.title}
              </h2>

              <p className="text-sm text-slate-500 leading-relaxed mb-6">
                {quiz.description}
              </p>

              {/* Quiz Details */}
              <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-5">
                <div>
                  <p className="text-xs text-slate-400">Questions</p>
                  <p className="font-semibold text-slate-800 mt-1">
                    {quiz.questions}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">Duration</p>
                  <p className="font-semibold text-slate-800 mt-1">
                    {quiz.duration} min
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-slate-100 mt-5 pt-4">
                <p className="text-xs text-slate-400">
                  Created on {quiz.createdAt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
