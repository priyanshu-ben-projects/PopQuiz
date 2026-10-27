import { UserRound, Mail, Phone, Building2, Pencil } from "lucide-react";

function ProfileInfoCard({ user, onEdit }) {
  const isTeacher = user?.accountType === "teacher";

  const details = [
    {
      label: "Email Address",
      value: user?.email,
      icon: Mail,
    },
    {
      label: "Contact Number",
      value: user?.contactNo,
      icon: Phone,
    },
    {
      label: isTeacher ? "Institution" : "College",
      value: isTeacher ? user?.institution : user?.college,
      icon: Building2,
    },
  ];

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="h-24 bg-gradient-to-r from-sky-600 to-sky-400" />

      <div className="px-5 pb-6 sm:px-7">
        <div className="-mt-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-end gap-4">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border-4 border-white bg-sky-100 text-sky-700 shadow-sm">
              <UserRound size={34} />
            </div>

            <div className="pb-1">
              <h2 className="text-xl font-bold text-slate-900">
                {user?.name || user?.username || "PopQuiz User"}
              </h2>

              <p className="mt-1 text-sm capitalize text-slate-500">
                {user?.accountType || "Student"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onEdit}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700"
          >
            <Pencil size={16} />
            Edit Profile
          </button>
        </div>

        <div className="mt-7 grid gap-5 border-t border-slate-100 pt-6 sm:grid-cols-2 lg:grid-cols-3">
          {details.map(({ label, value, icon: Icon }) => (
            <div key={label} className="flex items-start gap-3">
              <div className="rounded-lg bg-sky-50 p-2.5">
                <Icon size={18} className="text-sky-600" />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-medium text-slate-500">{label}</p>

                <p className="mt-1 break-words text-sm font-semibold text-slate-800">
                  {value || "Not provided"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProfileInfoCard;
