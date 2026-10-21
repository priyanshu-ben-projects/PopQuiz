import { useNavigate } from "react-router-dom";

export default function ResultStats({
  finalScore,
  totalAnswered,
  totalQuestions,
  totalCorrect,
}) {
  const navigate = useNavigate();

  const handleRestart = () => {
    navigate("/quiz");
  };

  return (
    <div className="w-full mx-auto space-y-6 ">
      {/* Quiz Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Score Card */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-indigo-100 p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center text-center">
          <span className="text-xs uppercase tracking-wider font-semibold text-slate-500 mb-1">
            Score
          </span>
          <span className="text-3xl sm:text-4xl font-extrabold text-indigo-600">
            {finalScore}
          </span>
        </div>

        {/* Progress Card */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center text-center">
          <span className="text-xs uppercase tracking-wider font-semibold text-slate-500 mb-1">
            Progress
          </span>
          <div className="text-3xl sm:text-4xl font-extrabold text-slate-800">
            {totalAnswered}{" "}
            <span className="text-xl font-medium text-slate-400">
              / {totalQuestions}
            </span>
          </div>
        </div>

        {/* Correct Card */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-emerald-100 p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center text-center">
          <span className="text-xs uppercase tracking-wider font-semibold text-slate-500 mb-1">
            Correct Answers
          </span>
          <span className="text-3xl sm:text-4xl font-extrabold text-emerald-600">
            {totalCorrect}
          </span>
        </div>
      </div>

      {/* Restart Button */}
      <button
        type="button"
        onClick={handleRestart}
        className="w-full inline-flex items-center justify-center gap-3 rounded-2xl bg-[#4D8DBA] hover:bg-[#086288] active:scale-[0.99] text-white px-6 py-4 text-base sm:text-lg font-semibold shadow-md shadow-indigo-200 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-indigo-200 cursor-pointer"
      >
        <span
          className="flex items-center justify-center w-7 h-7 rounded-full bg-indigo-500/30 text-white font-bold text-lg"
          aria-hidden="true"
        >
          ↻
        </span>
        Restart Quiz
      </button>
    </div>
  );
}
