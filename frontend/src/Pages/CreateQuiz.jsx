import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  IconArrowLeft,
  IconClock,
  IconFileText,
  IconBook,
  IconGauge,
  IconCalendar,
  IconListCheck,
} from "@tabler/icons-react";

export default function CreateQuiz() {
  const navigate = useNavigate();

  const [quizData, setQuizData] = useState({
    title: "",
    description: "",
    category: "",
    syllabus: "",

    totalQuestions: 10,
    pointsPerQuestion: 1,
    negativeMarking: false,
    negativeMarks: 0.25,
    difficulty: "Medium",

    timerEnabled: true,
    duration: 30,

    scheduleEnabled: false,
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",

    rules: "",
    instructions: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setQuizData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newQuiz = {
      ...quizData,
      id: `quiz-${Date.now()}`,
      totalQuestions: Number(quizData.totalQuestions),
      pointsPerQuestion: Number(quizData.pointsPerQuestion),
      negativeMarks: quizData.negativeMarking
        ? Number(quizData.negativeMarks)
        : 0,
      duration: quizData.timerEnabled ? Number(quizData.duration) : null,
      maximumMarks:
        Number(quizData.totalQuestions) * Number(quizData.pointsPerQuestion),
      createdAt: new Date().toISOString(),
      status: "Draft",
    };

    navigate("/admin/myquizzes", {
      state: { createdQuiz: newQuiz },
    });
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100";

  const labelClass = "mb-2 block text-sm font-semibold text-slate-700";

  const sectionClass =
    "rounded-2xl border border-slate-200 bg-white p-5 md:p-7 space-y-6";

  const Toggle = ({ name, label, description }) => (
    <label className="flex cursor-pointer items-center justify-between gap-4">
      <div>
        <p className="text-sm font-semibold text-slate-800">{label}</p>
        <p className="mt-1 text-xs text-slate-500">{description}</p>
      </div>

      <input
        type="checkbox"
        name={name}
        checked={quizData[name]}
        onChange={handleChange}
        className="peer sr-only"
      />

      <span className="relative h-6 w-11 shrink-0 rounded-full bg-slate-300 transition peer-checked:bg-sky-600 after:absolute after:left-1 after:top-1 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition peer-checked:after:translate-x-5" />
    </label>
  );

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 md:px-8 md:py-10">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <button
          type="button"
          onClick={() => navigate("/admin/myquizzes")}
          className="mb-6 flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-sky-600"
        >
          <IconArrowLeft size={18} />
          Back to My Quizzes
        </button>

        <div className="mb-8">
          <p className="text-sm font-semibold text-sky-600">QUIZ MANAGEMENT</p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Create a New Quiz
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Configure your assessment before adding questions.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 01 Basic Information */}
          <section className={sectionClass}>
            <div className="flex items-center gap-3">
              <IconFileText className="text-sky-600" size={22} />
              <div>
                <h2 className="font-bold text-slate-900">Basic Information</h2>
                <p className="text-xs text-slate-500">
                  Give your quiz an identity.
                </p>
              </div>
            </div>

            <div>
              <label className={labelClass}>Quiz Title *</label>
              <input
                name="title"
                value={quizData.title}
                onChange={handleChange}
                placeholder="e.g. JavaScript Fundamentals"
                className={inputClass}
                required
                maxLength={100}
              />
            </div>

            <div>
              <label className={labelClass}>Description *</label>
              <textarea
                name="description"
                value={quizData.description}
                onChange={handleChange}
                placeholder="Describe what this quiz is about..."
                rows={3}
                maxLength={500}
                className={inputClass}
                required
              />
              <p className="mt-1 text-right text-xs text-slate-400">
                {quizData.description.length}/500
              </p>
            </div>

            <div>
              <label className={labelClass}>Category *</label>
              <input
                name="category"
                value={quizData.category}
                onChange={handleChange}
                placeholder="Create your own category..."
                className={inputClass}
                required
                maxLength={60}
              />
            </div>

            <div>
              <label className={labelClass}>
                <IconBook size={16} className="mr-1 inline" />
                Syllabus / Topics Covered
              </label>
              <textarea
                name="syllabus"
                value={quizData.syllabus}
                onChange={handleChange}
                placeholder={
                  "List the chapters or topics covered...\nExample:\n1. Variables and Data Types\n2. Functions\n3. Arrays and Objects"
                }
                rows={5}
                className={inputClass}
                maxLength={2000}
              />
            </div>
          </section>

          {/* 02 Assessment Settings */}
          <section className={sectionClass}>
            <div className="flex items-center gap-3">
              <IconGauge className="text-sky-600" size={22} />
              <div>
                <h2 className="font-bold text-slate-900">
                  Assessment Settings
                </h2>
                <p className="text-xs text-slate-500">
                  Configure questions and scoring.
                </p>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Number of Questions *</label>
                <input
                  type="number"
                  name="totalQuestions"
                  min="1"
                  max="500"
                  value={quizData.totalQuestions}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className={labelClass}>Points Per Question *</label>
                <input
                  type="number"
                  name="pointsPerQuestion"
                  min="0.1"
                  step="0.1"
                  value={quizData.pointsPerQuestion}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>
            </div>

            <div className="rounded-xl bg-sky-50 p-4">
              <p className="text-xs font-medium text-sky-700">
                Maximum Possible Marks
              </p>
              <p className="mt-1 text-2xl font-bold text-sky-900">
                {(
                  Number(quizData.totalQuestions || 0) *
                  Number(quizData.pointsPerQuestion || 0)
                ).toLocaleString("en-IN")}
              </p>
            </div>

            <div className="border-t border-slate-100 pt-5">
              <Toggle
                name="negativeMarking"
                label="Enable Negative Marking"
                description="Deduct marks for incorrect answers."
              />

              {quizData.negativeMarking && (
                <div className="mt-5">
                  <label className={labelClass}>
                    Marks Deducted Per Wrong Answer
                  </label>
                  <input
                    type="number"
                    name="negativeMarks"
                    min="0"
                    step="0.05"
                    value={quizData.negativeMarks}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  />
                </div>
              )}
            </div>

            <div>
              <label className={labelClass}>Difficulty Level</label>
              <select
                name="difficulty"
                value={quizData.difficulty}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </section>

          {/* 03 Time and Availability */}
          <section className={sectionClass}>
            <div className="flex items-center gap-3">
              <IconClock className="text-sky-600" size={22} />
              <div>
                <h2 className="font-bold text-slate-900">
                  Time & Availability
                </h2>
                <p className="text-xs text-slate-500">
                  Control the quiz duration and schedule.
                </p>
              </div>
            </div>

            <div>
              <Toggle
                name="timerEnabled"
                label="Enable Quiz Timer"
                description="Set a time limit for completing the quiz."
              />

              {quizData.timerEnabled && (
                <div className="mt-5">
                  <label className={labelClass}>Duration (Minutes) *</label>
                  <input
                    type="number"
                    name="duration"
                    min="1"
                    max="600"
                    value={quizData.duration}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  />
                </div>
              )}
            </div>

            <div className="border-t border-slate-100 pt-5">
              <Toggle
                name="scheduleEnabled"
                label="Schedule This Quiz"
                description="Make the quiz available during a specific period."
              />

              {quizData.scheduleEnabled && (
                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>Start Date *</label>
                    <input
                      type="date"
                      name="startDate"
                      value={quizData.startDate}
                      onChange={handleChange}
                      className={inputClass}
                      required
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Start Time *</label>
                    <input
                      type="time"
                      name="startTime"
                      value={quizData.startTime}
                      onChange={handleChange}
                      className={inputClass}
                      required
                    />
                  </div>

                  <div>
                    <label className={labelClass}>End Date *</label>
                    <input
                      type="date"
                      name="endDate"
                      min={quizData.startDate || undefined}
                      value={quizData.endDate}
                      onChange={handleChange}
                      className={inputClass}
                      required
                    />
                  </div>

                  <div>
                    <label className={labelClass}>End Time *</label>
                    <input
                      type="time"
                      name="endTime"
                      value={quizData.endTime}
                      onChange={handleChange}
                      className={inputClass}
                      required
                    />
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* 04 Rules and Instructions */}
          <section className={sectionClass}>
            <div className="flex items-center gap-3">
              <IconListCheck className="text-sky-600" size={22} />
              <div>
                <h2 className="font-bold text-slate-900">
                  Rules & Instructions
                </h2>
                <p className="text-xs text-slate-500">
                  Tell students how to attempt the quiz.
                </p>
              </div>
            </div>

            <div>
              <label className={labelClass}>Quiz Rules</label>
              <textarea
                name="rules"
                value={quizData.rules}
                onChange={handleChange}
                placeholder={
                  "1. Read every question carefully.\n2. Do not refresh the page during the quiz.\n3. Submit before the timer ends."
                }
                rows={5}
                maxLength={2000}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Additional Instructions</label>
              <textarea
                name="instructions"
                value={quizData.instructions}
                onChange={handleChange}
                placeholder="Add any additional instructions for students..."
                rows={3}
                maxLength={1000}
                className={inputClass}
              />
            </div>
          </section>

          {/* Submit */}
          <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => navigate("/admin/myquizzes")}
              className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-sky-600 px-7 py-3 text-sm font-semibold text-white shadow-sm hover:bg-sky-700"
            >
              Create Quiz
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
