import { useMemo, useState } from "react";
import { ClipboardList } from "lucide-react";
import QuizHistoryFilters from "./QuizHistoryFilters";
import QuizHistoryTable from "./QuizHistoryTable";

function QuizHistory({ user, records, onView }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");

  const isTeacher = user?.accountType === "teacher";

  const categories = useMemo(
    () => [
      ...new Set(records.map((record) => record.category).filter(Boolean)),
    ],
    [records],
  );

  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      const matchesSearch = (record.title || "")
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "all" || record.category === category;

      const matchesStatus = status === "all" || record.status === status;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [records, search, category, status]);

  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
            <ClipboardList size={21} className="text-sky-600" />
            {isTeacher ? "Quiz Activity" : "Quiz History"}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {isTeacher
              ? "Review the performance of your quizzes."
              : "Review your previous quiz attempts."}
          </p>
        </div>

        <span className="text-sm text-slate-500">
          {filteredRecords.length}{" "}
          {filteredRecords.length === 1 ? "record" : "records"}
        </span>
      </div>

      <QuizHistoryFilters
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        status={status}
        setStatus={setStatus}
        categories={categories}
      />

      <QuizHistoryTable
        records={filteredRecords}
        isTeacher={isTeacher}
        onView={onView}
      />
    </section>
  );
}

export default QuizHistory;
