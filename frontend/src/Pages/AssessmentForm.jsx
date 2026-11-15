import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  ArrowLeft,
  Clock,
  HelpCircle,
  User,
  Mail,
  Layers,
  Sparkles,
  CheckCircle2,
  ShieldAlert,
  Timer,
  Award,
} from "lucide-react";
import AuthContext from "../context/AuthContext.js";

// --- Preset Options ---
const QUESTION_OPTIONS = [
  { value: 10, label: "10", tag: "Quick Sprint" },
  { value: 20, label: "20", tag: "Standard" },
  { value: 30, label: "30", tag: "In-Depth" },
  { value: 50, label: "50", tag: "Mastery" },
];

const DURATION_OPTIONS = [
  { value: 300, label: "5 Min", seconds: 300 },
  { value: 720, label: "12 Min", seconds: 720 },
  { value: 1200, label: "20 Min", seconds: 1200 },
  { value: 1800, label: "30 Min", seconds: 1800 },
];

// --- Framer Motion Variants ---
const pageVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function AssessmentForm() {
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext) || {};

  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    category: "",
    duration: 300,
    questionCount: 10,
  });

  // Sync user context if it resolves asynchronously
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        username: prev.username || user.username || "",
        email: prev.email || user.email || "",
      }));
    }
  }, [user]);

  useEffect(() => {
    let active = true;
    axios
      .get("/api/categories")
      .then((response) => {
        if (active) {
          setCategories(Array.isArray(response.data) ? response.data : []);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch categories:", err);
      })
      .finally(() => {
        if (active) setLoadingCategories(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numericFields = ["duration", "questionCount"];

    setFormData((prev) => ({
      ...prev,
      [name]: numericFields.includes(name) ? Number(value) : value,
    }));
  };

  const handleSelectOption = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.category) return;
    navigate("/quiz", { state: formData });
  };

  // Derived metrics for live summary card
  const selectedCategoryObj = categories.find(
    (c) => c.category === formData.category,
  );
  const minutes = Math.round(formData.duration / 60);
  const secondsPerQuestion = Math.round(
    formData.duration / (formData.questionCount || 1),
  );

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F8FAFC] px-4 py-8 text-[#0F172A] sm:px-6 sm:py-12 lg:px-8 selection:bg-sky-100 selection:text-sky-900">
      {/* Ambient Background Glows */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-[440px] overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.5, 0.35] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-sky-200/40 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.25, 0.4, 0.25] }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
          className="absolute -top-24 right-1/4 h-80 w-80 rounded-full bg-emerald-200/30 blur-3xl"
        />
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={pageVariants}
        className="relative z-10 mx-auto max-w-6xl space-y-8"
      >
        {/* Top Navigation & Header */}
        <motion.div variants={itemVariants} className="space-y-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="group inline-flex items-center gap-2 rounded-xl border border-slate-200/80 bg-white px-3.5 py-2 text-xs font-semibold text-[#475569] shadow-2xs transition hover:border-sky-200 hover:text-[#0284C7]"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            <span>Back</span>
          </button>

          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-[#BAE6FD] bg-[#F0F9FF] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#0284C7]">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Assessment Studio</span>
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-[#0F172A] sm:text-4xl">
                Configure Your Assessment
              </h1>
              <p className="max-w-2xl text-sm leading-6 text-[#64748B] sm:text-base">
                Customize your topic, question count, and timer before entering
                the live evaluation environment.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Main 2-Column Interactive Layout */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12"
        >
          {/* LEFT COLUMN: Configuration Form (7 cols) */}
          <div className="space-y-6 lg:col-span-7">
            {/* Step 1: Candidate Information */}
            <motion.section
              variants={itemVariants}
              className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-xs sm:p-7"
            >
              <div className="mb-5 flex items-center gap-3 border-b border-slate-100 pb-4">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#F0F9FF] text-xs font-bold text-[#0284C7] ring-1 ring-[#BAE6FD]">
                  1
                </span>
                <div>
                  <h2 className="text-base font-bold text-[#0F172A]">
                    Candidate Details
                  </h2>
                  <p className="text-xs text-[#64748B]">
                    Used to generate your session scorecard and results.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Username */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="username"
                    className="block text-xs font-bold uppercase tracking-wider text-[#475569]"
                  >
                    Username
                  </label>
                  <div className="relative">
                    <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      id="username"
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="e.g. janesmith"
                      required
                      className="w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] py-2.5 pl-10 pr-3.5 text-sm text-[#0F172A] outline-none transition placeholder:text-[#94A3B8] focus:border-[#0284C7] focus:bg-white focus:ring-4 focus:ring-sky-500/10"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="email"
                    className="block text-xs font-bold uppercase tracking-wider text-[#475569]"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jane.smith@example.com"
                      required
                      className="w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] py-2.5 pl-10 pr-3.5 text-sm text-[#0F172A] outline-none transition placeholder:text-[#94A3B8] focus:border-[#0284C7] focus:bg-white focus:ring-4 focus:ring-sky-500/10"
                    />
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Step 2: Select Domain / Category */}
            <motion.section
              variants={itemVariants}
              className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-xs sm:p-7"
            >
              <div className="mb-5 flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#F0F9FF] text-xs font-bold text-[#0284C7] ring-1 ring-[#BAE6FD]">
                    2
                  </span>
                  <div>
                    <h2 className="text-base font-bold text-[#0F172A]">
                      Select Assessment Domain
                    </h2>
                    <p className="text-xs text-[#64748B]">
                      Choose the subject area you want to be tested on.
                    </p>
                  </div>
                </div>
                <Layers className="h-5 w-5 text-slate-300" />
              </div>

              {/* Select Dropdown + Quick Visual Pills */}
              <div className="space-y-4">
                <div>
                  <label htmlFor="category" className="sr-only">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full cursor-pointer rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-sm font-medium text-[#0F172A] outline-none transition focus:border-[#0284C7] focus:bg-white focus:ring-4 focus:ring-sky-500/10"
                  >
                    <option value="">
                      {loadingCategories
                        ? "Loading available categories..."
                        : "-- Choose an assessment category --"}
                    </option>
                    {categories.map((data) => (
                      <option key={data._id} value={data.category}>
                        {data.category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Interactive Category Quick-Pick Grid */}
                {!loadingCategories && categories.length > 0 && (
                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {categories.slice(0, 6).map((cat) => {
                      const isSelected = formData.category === cat.category;
                      return (
                        <motion.button
                          key={cat._id}
                          type="button"
                          whileHover={{ scale: 1.015 }}
                          whileTap={{ scale: 0.985 }}
                          onClick={() =>
                            handleSelectOption("category", cat.category)
                          }
                          className={`flex items-center justify-between rounded-xl border p-3 text-left transition-all ${
                            isSelected
                              ? "border-[#0284C7] bg-[#F0F9FF] text-[#0369A1] shadow-2xs ring-2 ring-sky-500/15"
                              : "border-slate-200/80 bg-white text-[#334155] hover:border-sky-200 hover:bg-slate-50"
                          }`}
                        >
                          <span className="truncate pr-2 text-xs font-semibold sm:text-sm">
                            {cat.category}
                          </span>
                          <span
                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                              isSelected
                                ? "border-[#0284C7] bg-[#0284C7] text-white"
                                : "border-slate-300 bg-white"
                            }`}
                          >
                            {isSelected && (
                              <CheckCircle2 className="h-3.5 w-3.5" />
                            )}
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.section>

            {/* Step 3: Question Volume & Timer */}
            <motion.section
              variants={itemVariants}
              className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-xs sm:p-7 space-y-6"
            >
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#F0F9FF] text-xs font-bold text-[#0284C7] ring-1 ring-[#BAE6FD]">
                  3
                </span>
                <div>
                  <h2 className="text-base font-bold text-[#0F172A]">
                    Session Intensity & Pacing
                  </h2>
                  <p className="text-xs text-[#64748B]">
                    Pick the length and time limit that matches your goal.
                  </p>
                </div>
              </div>

              {/* Question Count Selector */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#475569]">
                    <HelpCircle className="h-3.5 w-3.5 text-[#0284C7]" />
                    <span>Number of Questions</span>
                  </label>
                  <span className="text-xs font-semibold text-[#0284C7]">
                    {formData.questionCount} Questions Selected
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {QUESTION_OPTIONS.map((opt) => {
                    const active = Number(formData.questionCount) === opt.value;
                    return (
                      <motion.button
                        key={opt.value}
                        type="button"
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() =>
                          handleSelectOption("questionCount", opt.value)
                        }
                        className={`relative flex flex-col items-center justify-center rounded-xl border p-3.5 transition-all ${
                          active
                            ? "border-[#0284C7] bg-[#F0F9FF] text-[#0369A1] shadow-2xs ring-2 ring-sky-500/15"
                            : "border-slate-200 bg-[#F8FAFC] text-[#334155] hover:border-sky-200 hover:bg-white"
                        }`}
                      >
                        <span className="text-lg font-extrabold">
                          {opt.label}
                        </span>
                        <span
                          className={`mt-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                            active ? "text-[#0284C7]" : "text-[#94A3B8]"
                          }`}
                        >
                          {opt.tag}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Duration Selector */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#475569]">
                    <Clock className="h-3.5 w-3.5 text-[#059669]" />
                    <span>Time Limit</span>
                  </label>
                  <span className="text-xs font-semibold text-[#059669]">
                    {minutes} Minutes Total
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {DURATION_OPTIONS.map((opt) => {
                    const active = Number(formData.duration) === opt.value;
                    return (
                      <motion.button
                        key={opt.value}
                        type="button"
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() =>
                          handleSelectOption("duration", opt.value)
                        }
                        className={`flex flex-col items-center justify-center rounded-xl border p-3.5 transition-all ${
                          active
                            ? "border-[#059669] bg-[#ECFDF5] text-[#047857] shadow-2xs ring-2 ring-emerald-500/15"
                            : "border-slate-200 bg-[#F8FAFC] text-[#334155] hover:border-emerald-200 hover:bg-white"
                        }`}
                      >
                        <span className="text-base font-extrabold">
                          {opt.label}
                        </span>
                        <span
                          className={`mt-0.5 text-[10px] font-medium ${
                            active ? "text-[#059669]" : "text-[#94A3B8]"
                          }`}
                        >
                          Timed
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </motion.section>
          </div>

          {/* RIGHT COLUMN: Sticky Live Session Brief & Launchpad (5 cols) */}
          <motion.aside
            variants={itemVariants}
            className="space-y-5 lg:sticky lg:top-8 lg:col-span-5"
          >
            {/* Dark Slate Live Summary Card */}
            <div className="relative overflow-hidden rounded-2xl bg-[#0F172A] p-6 text-white shadow-xl sm:p-7">
              {/* Ambient Glows inside Summary Card */}
              <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-[#0284C7]/25 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-12 -left-12 h-44 w-44 rounded-full bg-[#059669]/20 blur-2xl" />

              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#38BDF8]">
                      Live Session Brief
                    </span>
                    <h3 className="mt-0.5 text-lg font-bold text-white">
                      Assessment Overview
                    </h3>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-[#38BDF8]">
                    <Award className="h-5 w-5" />
                  </div>
                </div>

                {/* Dynamic Selected Topic Box */}
                <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Selected Subject
                  </p>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={formData.category || "empty"}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.2 }}
                      className={`mt-1 text-base font-bold ${
                        formData.category ? "text-white" : "text-amber-400"
                      }`}
                    >
                      {formData.category || "Please select a category"}
                    </motion.p>
                  </AnimatePresence>
                  {selectedCategoryObj?.about && (
                    <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-slate-400">
                      {selectedCategoryObj.about}
                    </p>
                  )}
                </div>

                {/* Metrics Breakdown */}
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
                    <p className="text-xl font-extrabold text-white">
                      {formData.questionCount}
                    </p>
                    <p className="mt-0.5 text-[11px] text-slate-400">
                      Questions
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
                    <p className="text-xl font-extrabold text-[#38BDF8]">
                      {minutes}m
                    </p>
                    <p className="mt-0.5 text-[11px] text-slate-400">
                      Duration
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
                    <p className="text-xl font-extrabold text-[#34D399]">
                      ~{secondsPerQuestion}s
                    </p>
                    <p className="mt-0.5 text-[11px] text-slate-400">
                      Per Question
                    </p>
                  </div>
                </div>

                {/* Candidate Preview */}
                <div className="flex items-center justify-between rounded-xl border border-slate-800/80 bg-slate-900/40 px-4 py-3 text-xs">
                  <span className="text-slate-400">Candidate</span>
                  <span className="font-semibold text-slate-200 truncate max-w-[200px]">
                    {formData.username || "Guest Learner"}
                  </span>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={!formData.category}
                  whileHover={formData.category ? { scale: 1.02 } : {}}
                  whileTap={formData.category ? { scale: 0.98 } : {}}
                  className={`group flex w-full items-center justify-center gap-2.5 rounded-xl px-6 py-4 text-sm font-bold text-white shadow-lg transition-all ${
                    formData.category
                      ? "bg-[#059669] shadow-emerald-950/50 hover:bg-[#10B981] cursor-pointer"
                      : "bg-slate-700 text-slate-400 cursor-not-allowed opacity-75"
                  }`}
                >
                  <Play className="h-4 w-4 fill-current transition-transform group-hover:scale-110" />
                  <span>
                    {formData.category
                      ? "Launch Live Assessment"
                      : "Select a Category to Begin"}
                  </span>
                </motion.button>
              </div>
            </div>

            {/* Pre-Flight Guidelines Card */}
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-2xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0F172A]">
                <Timer className="h-4 w-4 text-[#0284C7]" />
                <span>Before You Begin</span>
              </div>
              <ul className="space-y-2 text-xs leading-5 text-[#64748B]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#059669]" />
                  <span>
                    The countdown begins immediately once you launch the
                    assessment.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#059669]" />
                  <span>
                    Your score and detailed topic breakdown appear right after
                    submission.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <ShieldAlert className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500" />
                  <span>
                    Avoid refreshing the browser tab mid-session to preserve
                    your progress.
                  </span>
                </li>
              </ul>
            </div>
          </motion.aside>
        </form>
      </motion.div>
    </main>
  );
}
