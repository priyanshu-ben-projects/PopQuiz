import questions from "@/Questions";
import axios from "axios";
import {
  X,
  Trophy,
  Target,
  CircleCheck,
  CircleX,
  Clock3,
  CalendarDays,
  ClipboardCheck,
} from "lucide-react";
import { useEffect, useState } from "react";

function QuizDetailsModal({ record, onClose }) {
  const [report, setReport] = useState(null);
  // const [reportData, setReportData] = useState(null);
  useEffect(() => {
    const getRecord = async () => {
      const response = await axios.get("/api/quiz/report", {
        params: { recordID: record._id },
      });
      setReport(response.data.report);

      console.log(response.data.report);
    };

    getRecord();
  }, []);

  if (!report) return null;

  const score = Number(report.score) || 0;
  const correctAnswers = Number(report.correctAnswers) || 0;
  const totalQuestions = Number(report.totalQuestions) || 0;
  const incorrectAnswers = report.incorrectAnswers;
  1;

  const formatDuration = () => {
    const hours = Math.floor(report.duration / 3600);
    const minutes = Math.floor((report.duration % 3600) / 60);
    const remainingSeconds = report.duration % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  const duration = formatDuration();
  const progress =
    totalQuestions > 0
      ? Math.floor((correctAnswers / totalQuestions) * 100)
      : 0;

  const stats = [
    {
      label: "Correct Answers",
      value: correctAnswers,
      icon: CircleCheck,
      color: "text-emerald-600",
      background: "bg-emerald-50",
    },
    {
      label: "Incorrect Answers",
      value: incorrectAnswers,
      icon: CircleX,
      color: "text-rose-600",
      background: "bg-rose-50",
    },
    {
      label: "Total Questions",
      value: totalQuestions,
      icon: ClipboardCheck,
      color: "text-sky-600",
      background: "bg-sky-50",
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
        aria-labelledby="quiz-details-title"
        className="my-auto w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        <div className="flex items-start justify-between border-b border-slate-100 px-5 py-5 sm:px-7">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-sky-600">
              Quiz Report
            </p>

            <h2
              id="quiz-details-title"
              className="mt-1 text-xl font-bold text-slate-900"
            >
              {report.title || "Quiz Details"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {record.category || "Uncategorized"}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close quiz details"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6 px-5 py-6 sm:px-7">
          <div className="rounded-2xl bg-gradient-to-br from-sky-600 to-sky-500 p-6 text-white">
            <div className="flex items-center gap-2 text-sky-100">
              <Trophy size={19} />
              <span className="text-sm font-medium">Your Score</span>
            </div>

            <div className="mt-3 flex items-end gap-2">
              <span className="text-5xl font-bold">{progress}%</span>
            </div>

            <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/25">
              <div
                className="h-full rounded-full bg-white transition-all"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {stats.map(({ label, value, icon: Icon, color, background }) => (
              <div
                key={label}
                className="rounded-xl border border-slate-100 p-4"
              >
                <div
                  className={`mb-3 flex h-9 w-9 items-center justify-center rounded-lg ${background}`}
                >
                  <Icon size={19} className={color} />
                </div>

                <p className="text-2xl font-bold text-slate-900">{value}</p>

                <p className="mt-1 text-xs text-slate-500">{label}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
              <CalendarDays className="text-sky-600" size={20} />

              <div>
                <p className="text-xs text-slate-500">Attempt Date</p>
                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {report.date}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
              <Clock3 className="text-sky-600" size={20} />

              <div>
                <p className="text-xs text-slate-500">Duration</p>
                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {duration || "Not available"}
                </p>
              </div>
            </div>
          </div>

          {totalQuestions === 0 && (
            <p className="text-xs text-slate-500">
              Detailed answer counts will appear when the quiz attempt data
              includes correctAnswers and totalQuestions.
            </p>
          )}
        </div>

        <div className="flex justify-end border-t border-slate-100 bg-slate-50 px-5 py-4 sm:px-7">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-700"
          >
            Close Report
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuizDetailsModal;
