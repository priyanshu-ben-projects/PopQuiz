export default function NotFound({ status, msg, notice }) {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50 text-rose-500">
            <span className="text-3xl">!</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-800">
            No Quiz Results Found
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Complete a quiz to see your performance here.
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-6 rounded-xl bg-sky-600 px-6 py-3 font-semibold text-white transition hover:bg-sky-700"
          >
            Go Home
          </button>
        </div>
      </div>
    </>
  );
}
