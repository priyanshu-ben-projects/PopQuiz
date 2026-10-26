import { useState } from "react";
import axios from "axios";
import {
  IconBook2,
  IconSchool,
  IconUser,
  IconMail,
  IconLock,
  IconPhone,
  IconBuilding,
  IconCalendar,
  IconBriefcase,
  IconArrowRight,
  IconCheck,
} from "@tabler/icons-react";

import logo from "../assets/logoImg.png";
import Field from "../Components/Field.jsx";
import { useNavigate } from "react-router-dom";

const initialFormData = {
  username: "",
  email: "",
  password: "",
  accountType: "student",
  course: "",
  college: "",
  session: "",
  contactNo: "",
  domain: "",
  institution: "",
};

const accountOptions = [
  {
    value: "student",
    label: "Student",
    description: "Take assessments",
    icon: IconSchool,
  },
  {
    value: "teacher",
    label: "Teacher",
    description: "Educate & assess",
    icon: IconBriefcase,
  },
];

function RegisterUI() {
  const [accountType, setAccountType] = useState("student");
  const [formData, setFormData] = useState(initialFormData);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleAccountTypeChange = (type) => {
    setAccountType(type);
    setError("");

    setFormData((prev) => ({
      ...prev,
      accountType: type,
      course: "",
      college: "",
      session: "",
      contactNo: "",
      domain: "",
      institution: "",
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await axios.post("/api/user/register", formData);
      console.log(response.status, response.data);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(
        err.response?.data?.message ||
          "Unable to create your account. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-3 py-5 sm:px-6 sm:py-10">
      <div className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm lg:grid-cols-[0.85fr_1.15fr]">
        {/* Branding panel */}
        <aside className="relative hidden flex-col justify-between overflow-hidden bg-sky-50 p-10 lg:flex xl:p-12">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-sky-200/40 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-pink-200/40 blur-3xl" />

          <div className="relative z-10">
            <img
              src={logo}
              alt="PopQuiz"
              className="mb-12 h-20 w-auto object-contain object-left"
            />

            <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/80 px-3 py-1.5 text-xs font-semibold text-sky-700">
              <span className="h-2 w-2 rounded-full bg-sky-500" />
              Learn. Practice. Improve.
            </span>

            <h2 className="mt-6 max-w-md text-4xl font-extrabold leading-tight tracking-tight text-slate-900 xl:text-5xl">
              Your next milestone starts with a{" "}
              <span className="text-sky-600">single step.</span>
            </h2>

            <p className="mt-5 max-w-sm text-base leading-7 text-slate-600">
              Create your account to explore assessments, challenge your
              knowledge, and track your learning journey.
            </p>
          </div>

          <div className="relative z-10 mt-12 rounded-2xl border border-white bg-white/80 p-5 shadow-sm backdrop-blur">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-700">
                <IconCheck size={21} />
              </div>

              <div>
                <p className="font-bold text-slate-800">
                  One platform, two possibilities
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Join as a student to test your skills or as a teacher to
                  create and manage assessments.
                </p>
              </div>
            </div>
          </div>

          <p className="relative z-10 mt-8 text-xs text-slate-400">
            © {new Date().getFullYear()} PopQuiz. Built for curious minds.
          </p>
        </aside>

        {/* Registration form */}
        <section className="min-w-0 p-4 sm:p-8 lg:p-10 xl:p-12">
          {/* Mobile branding */}
          <div className="mb-7 lg:hidden">
            <img
              src={logo}
              alt="PopQuiz"
              className="h-12 w-auto max-w-full object-contain object-left"
            />
          </div>

          <header className="mb-7">
            <p className="text-xs font-bold tracking-[0.15em] text-sky-600">
              GET STARTED FOR FREE
            </p>

            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Create your account
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Enter your details to get started with PopQuiz.
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Account type */}
            <fieldset>
              <legend className="mb-3 text-sm font-semibold text-slate-700">
                I want to join as a
              </legend>

              <div className="grid grid-cols-2 gap-3">
                {accountOptions.map((option) => {
                  const Icon = option.icon;
                  const active = accountType === option.value;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleAccountTypeChange(option.value)}
                      aria-pressed={active}
                      className={`flex min-w-0 items-center gap-2 rounded-2xl border p-3 text-left transition sm:gap-3 sm:p-4 ${
                        active
                          ? "border-sky-500 bg-sky-50 ring-2 ring-sky-500/10"
                          : "border-slate-200 bg-white hover:border-slate-300"
                      }`}
                    >
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl sm:h-10 sm:w-10 ${
                          active
                            ? "bg-sky-600 text-white"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        <Icon size={20} />
                      </span>

                      <span className="min-w-0">
                        <span className="block text-sm font-bold text-slate-800">
                          {option.label}
                        </span>
                        <span className="mt-1 block text-xs leading-4 text-slate-500">
                          {option.description}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {/* Common fields */}
            <div className="space-y-5">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <IconUser size={18} className="text-sky-600" />
                <h2 className="text-sm font-bold text-slate-800">
                  Basic information
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field
                  label="Full name"
                  name="username"
                  icon={IconUser}
                  placeholder="Enter your full name"
                  value={formData.username}
                  onChange={handleChange}
                  autoComplete="name"
                />

                <Field
                  label="Email address"
                  name="email"
                  icon={IconMail}
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Student / Teacher fields */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                {accountType === "student" ? (
                  <IconSchool size={19} className="text-sky-600" />
                ) : (
                  <IconBriefcase size={19} className="text-sky-600" />
                )}

                <h2 className="text-sm font-bold text-slate-800">
                  {accountType === "student"
                    ? "Academic information"
                    : "Professional information"}
                </h2>
              </div>

              {accountType === "student" ? (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field
                    label="Course / Degree"
                    name="course"
                    icon={IconBook2}
                    placeholder="e.g. BCA"
                    value={formData.course}
                    onChange={handleChange}
                  />

                  <Field
                    label="College / University"
                    name="college"
                    icon={IconBuilding}
                    placeholder="Your college name"
                    value={formData.college}
                    onChange={handleChange}
                  />

                  <Field
                    label="Academic session"
                    name="session"
                    icon={IconCalendar}
                    placeholder="e.g. 2025–2028"
                    value={formData.session}
                    onChange={handleChange}
                  />

                  <Field
                    label="Contact number"
                    name="contactNo"
                    icon={IconPhone}
                    type="tel"
                    placeholder="Enter phone number"
                    value={formData.contactNo}
                    onChange={handleChange}
                    autoComplete="tel"
                  />
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field
                    label="Teaching domain"
                    name="domain"
                    icon={IconBook2}
                    placeholder="e.g. Web Development"
                    value={formData.domain}
                    onChange={handleChange}
                  />

                  <Field
                    label="Institution"
                    name="institution"
                    icon={IconBuilding}
                    placeholder="School or institution"
                    value={formData.institution}
                    onChange={handleChange}
                  />
                </div>
              )}
            </div>

            {/* Password */}
            <div>
              <Field
                label="Create password"
                name="password"
                icon={IconLock}
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
              />

              <label className="mt-3 inline-flex cursor-pointer items-center gap-2 text-xs text-slate-500">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={(e) => setShowPassword(e.target.checked)}
                  className="h-3.5 w-3.5 rounded border-slate-300 accent-sky-600"
                />
                Show password
              </label>
            </div>

            {/* Request error */}
            {error && (
              <p
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-sky-600 px-5 py-3.5 text-sm font-bold text-white shadow-md shadow-sky-600/15 transition hover:bg-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-500/20 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting
                ? "Creating account..."
                : `Create ${accountType === "student" ? "Student" : "Teacher"} Account`}

              {!isSubmitting && (
                <IconArrowRight
                  size={19}
                  className="transition-transform group-hover:translate-x-1"
                />
              )}
            </button>

            <p className="text-center text-xs leading-5 text-slate-500">
              By creating an account, you agree to use PopQuiz responsibly.
            </p>
          </form>
        </section>
      </div>
    </main>
  );
}

export default RegisterUI;
