import { Eye, ClipboardList } from "lucide-react";

function QuizHistoryTable({ records, isTeacher, onView }) {
  if (!records.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
        <ClipboardList size={34} className="mx-auto text-slate-300" />

        <h3 className="mt-3 font-semibold text-slate-800">
          No quiz records found
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Try changing your search or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              <th className="px-5 py-4 font-semibold text-slate-600">Title</th>
              <th className="px-5 py-4 font-semibold text-slate-600">
                Category
              </th>
              {isTeacher && (
                <th className="px-5 py-4 font-semibold text-slate-600">
                  Participants
                </th>
              )}
              <th className="px-5 py-4 font-semibold text-slate-600">
                {isTeacher ? "Average Score" : "Score"}
              </th>
              <th className="px-5 py-4 font-semibold text-slate-600">Date</th>
              <th className="px-5 py-4 font-semibold text-slate-600">Status</th>
              <th className="px-5 py-4 text-right font-semibold text-slate-600">
                Details
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {records.map((record) => {
              const completed = record.status === "completed";

              return (
                <tr key={record._id} className="transition hover:bg-sky-50/50">
                  <td className="px-5 py-4">
                    <p className="font-semibold text-slate-800">
                      {record.title}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-slate-600">
                    {record.category}
                  </td>

                  {isTeacher && (
                    <td className="px-5 py-4 text-slate-600">
                      {record.participants ?? 0}
                    </td>
                  )}

                  <td className="px-5 py-4 font-semibold text-slate-800">
                    {record.score ?? 0}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-slate-500">
                    record.date
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                        completed
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {completed ? "Completed" : "Incomplete"}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => onView(record)}
                      aria-label={`View ${record.title}`}
                      className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 font-medium text-sky-700 transition hover:bg-sky-100"
                    >
                      <Eye size={16} />
                      View
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default QuizHistoryTable;
