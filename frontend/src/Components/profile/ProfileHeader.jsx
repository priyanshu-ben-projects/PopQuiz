import { UserRound, GraduationCap, BookOpen } from "lucide-react";

function ProfileHeader({ user }) {
  const isTeacher = user?.accountType === "teacher";

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-medium text-sky-600">YOUR POPQUIZ SPACE</p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
          My Profile
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Manage your account and track your progress.
        </p>
      </div>

      <div className="inline-flex w-fit items-center gap-2 rounded-full border border-sky-100 bg-sky-50 px-4 py-2">
        {isTeacher ? (
          <BookOpen size={17} className="text-sky-600" />
        ) : (
          <GraduationCap size={17} className="text-sky-600" />
        )}

        <span className="text-sm font-semibold capitalize text-sky-700">
          {user?.accountType || "Student"} Account
        </span>
      </div>
    </div>
  );
}

export default ProfileHeader;
