import { Search, Filter, X } from "lucide-react";

function QuizHistoryFilters({
  search,
  setSearch,
  category,
  setCategory,
  status,
  setStatus,
  categories,
}) {
  const clearFilters = () => {
    setSearch("");
    setCategory("all");
    setStatus("all");
  };

  const hasFilters = search !== "" || category !== "all" || status !== "all";

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:flex-wrap sm:items-center">
      <div className="relative min-w-0 flex-1">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search quizzes..."
          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-100"
        />
      </div>

      <div className="relative">
        <Filter
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-8 text-sm text-slate-700 outline-none focus:border-sky-500 sm:w-44"
        >
          <option value="all">All Categories</option>

          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <select
        value={status}
        onChange={(event) => setStatus(event.target.value)}
        className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-sky-500 sm:w-36"
      >
        <option value="all">All Status</option>
        <option value="completed">Completed</option>
        <option value="incomplete">Incomplete</option>
      </select>

      {hasFilters && (
        <button
          type="button"
          onClick={clearFilters}
          className="inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
        >
          <X size={16} />
          Clear
        </button>
      )}
    </div>
  );
}

export default QuizHistoryFilters;
