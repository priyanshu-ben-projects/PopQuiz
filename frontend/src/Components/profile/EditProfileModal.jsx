import { useEffect, useState } from "react";
import { X, UserRound, Save } from "lucide-react";

function EditProfileModal({ user, onClose, onSave }) {
  const isTeacher = user?.accountType === "teacher";

  const [formData, setFormData] = useState({
    name: user?.name || user?.username || "",
    email: user?.email || "",
    contactNo: user?.contactNo || "",
    college: user?.college || "",
    course: user?.course || "",
    institution: user?.institution || "",
    domain: user?.domain || "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleEscape);

    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.name.trim() || !formData.email.trim()) {
      setError("Name and email are required.");
      return;
    }

    onSave({
      ...formData,
      name: formData.name.trim(),
      email: formData.email.trim(),
      contactNo: formData.contactNo.trim(),
    });
  };

  const inputClass =
    "mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-100";

  const fields = [
    {
      name: "name",
      label: "Full Name",
      placeholder: "Enter your full name",
      required: true,
    },
    {
      name: "email",
      label: "Email Address",
      placeholder: "you@example.com",
      type: "email",
      required: true,
    },
    {
      name: "contactNo",
      label: "Contact Number",
      placeholder: "Enter contact number",
      type: "tel",
    },
    ...(isTeacher
      ? [
          {
            name: "institution",
            label: "Institution",
            placeholder: "Enter institution name",
          },
          {
            name: "domain",
            label: "Teaching Domain",
            placeholder: "e.g. Web Development",
          },
        ]
      : [
          {
            name: "college",
            label: "College",
            placeholder: "Enter college name",
          },
          {
            name: "course",
            label: "Course",
            placeholder: "e.g. BCA",
          },
        ]),
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
        aria-labelledby="edit-profile-title"
        className="my-auto w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-sky-50 p-2.5">
              <UserRound className="text-sky-600" size={21} />
            </div>

            <div>
              <h2 id="edit-profile-title" className="font-bold text-slate-900">
                Edit Profile
              </h2>
              <p className="mt-0.5 text-xs text-slate-500">
                Update your personal information
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close edit profile"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 px-5 py-6 sm:grid-cols-2 sm:px-6">
            {fields.map((field) => (
              <label
                key={field.name}
                className="block text-sm font-medium text-slate-700"
              >
                {field.label}
                {field.required && (
                  <span className="ml-1 text-rose-500">*</span>
                )}

                <input
                  name={field.name}
                  type={field.type || "text"}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  required={field.required}
                  autoComplete={
                    field.name === "email"
                      ? "email"
                      : field.name === "name"
                        ? "name"
                        : "off"
                  }
                  className={inputClass}
                />
              </label>
            ))}

            {error && (
              <p
                role="alert"
                className="rounded-lg bg-rose-50 p-3 text-sm text-rose-700 sm:col-span-2"
              >
                {error}
              </p>
            )}
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-700"
            >
              <Save size={16} />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfileModal;
