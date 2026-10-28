import axios from "axios";
import { useEffect, useState } from "react";
import {
  Search,
  BookOpen,
  Wrench,
  Lightbulb,
  Sparkles,
  Code2,
  ArrowUpRight,
  GraduationCap,
} from "lucide-react";

export default function BrowseCategory() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    axios
      .get("/api/categories")
      .then(({ data }) => {
        if (active) {
          setCategories(Array.isArray(data) ? data : []);
        }
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);

        if (active) {
          setError("We couldn't load the categories. Please try again.");
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const filteredCategories = categories.filter((item) => {
    const query = search.trim().toLowerCase();

    if (!query) return true;

    const searchableContent = [
      item.category,
      item.about,
      item.whyItMatters,
      ...(item.topics || []),
      ...(item.tools || []),
      ...(item.skills || []),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return searchableContent.includes(query);
  });

  return (
    <main className="min-h-screen bg-[#F8FAFC] px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8 sm:space-y-10">
        {/* Page Header */}
        <section className="space-y-6">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-sky-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-sky-700">
              <GraduationCap className="h-4 w-4" />
              PopQuiz Knowledge Library
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl lg:text-5xl">
              Explore Your Next Learning Path
            </h1>

            <p className="max-w-2xl text-sm leading-6 text-[#64748B] sm:text-base sm:leading-7">
              Discover subjects, explore the tools and skills behind them, and
              understand how each discipline connects to real-world learning.
            </p>
          </div>

          {/* Search and Results */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-lg">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search categories, topics, tools, skills..."
                aria-label="Search categories, topics, tools, and skills"
                className="w-full rounded-xl border border-[#E2E8F0] bg-white py-3 pl-12 pr-4 text-sm text-[#0F172A] outline-none transition placeholder:text-[#94A3B8] focus:border-[#0284C7] focus:ring-4 focus:ring-sky-500/10"
              />
            </div>

            {!loading && !error && (
              <p
                className="text-sm font-medium text-[#64748B]"
                aria-live="polite"
              >
                Showing {filteredCategories.length} of {categories.length}{" "}
                {categories.length === 1 ? "category" : "categories"}
              </p>
            )}
          </div>
        </section>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="animate-pulse rounded-2xl border border-slate-200 bg-white p-6"
              >
                <div className="h-12 w-12 rounded-xl bg-slate-100" />
                <div className="mt-5 h-5 w-2/3 rounded bg-slate-100" />
                <div className="mt-3 h-3 w-full rounded bg-slate-100" />
                <div className="mt-2 h-3 w-4/5 rounded bg-slate-100" />
                <div className="mt-6 h-16 rounded-xl bg-slate-50" />
              </div>
            ))}
          </div>
        ) : error ? (
          /* Error State */
          <div
            role="alert"
            className="rounded-2xl border border-red-100 bg-white px-5 py-12 text-center"
          >
            <p className="font-semibold text-[#0F172A]">{error}</p>

            <button
              onClick={() => window.location.reload()}
              className="mt-4 rounded-lg bg-[#0284C7] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0369A1]"
            >
              Reload page
            </button>
          </div>
        ) : filteredCategories.length === 0 ? (
          /* Empty State */
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-16 text-center">
            <Search className="mx-auto h-8 w-8 text-slate-300" />

            <h2 className="mt-4 text-lg font-bold text-[#0F172A]">
              No matching categories
            </h2>

            <p className="mt-2 text-sm text-[#64748B]">
              Try another keyword to discover relevant subjects and skills.
            </p>

            {search && (
              <button
                onClick={() => setSearch("")}
                className="mt-5 text-sm font-semibold text-[#0284C7] hover:text-[#0369A1]"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          /* Categories Grid */
          <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filteredCategories.map((item) => (
              <article
                key={item._id}
                className="group flex min-w-0 flex-col rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-lg hover:shadow-slate-900/5 sm:p-6"
              >
                {/* Category Identity */}
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-[#0284C7] transition-colors duration-300 group-hover:bg-[#0284C7] group-hover:text-white">
                    <BookOpen className="h-6 w-6" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h2 className="break-words text-lg font-bold tracking-tight text-[#0F172A] transition-colors group-hover:text-[#0284C7] sm:text-xl">
                      {item.category}
                    </h2>

                    <p className="mt-1 text-xs font-medium text-[#94A3B8]">
                      Learning category
                    </p>
                  </div>
                </div>

                {/* About */}
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-[#64748B]">
                  {item.about}
                </p>

                {/* Topics */}
                {item.topics?.length > 0 && (
                  <div className="mt-5">
                    <div className="mb-2.5 flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-sky-600" />
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#475569]">
                        Topics Covered
                      </h3>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {item.topics.slice(0, 4).map((topic, index) => (
                        <span
                          key={`${topic}-${index}`}
                          className="max-w-full break-words rounded-lg border border-slate-100 bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-600"
                        >
                          {topic}
                        </span>
                      ))}

                      {item.topics.length > 4 && (
                        <span className="rounded-lg bg-sky-50 px-2.5 py-1.5 text-xs font-semibold text-sky-700">
                          +{item.topics.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Tools */}
                {item.tools?.length > 0 && (
                  <div className="mt-5">
                    <div className="mb-2.5 flex items-center gap-2">
                      <Wrench className="h-4 w-4 text-sky-600" />
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#475569]">
                        Tools & Technologies
                      </h3>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {item.tools.slice(0, 3).map((tool, index) => (
                        <span
                          key={`${tool}-${index}`}
                          className="max-w-full break-words rounded-lg bg-sky-50 px-2.5 py-1.5 text-xs font-medium text-sky-700"
                        >
                          {tool}
                        </span>
                      ))}

                      {item.tools.length > 3 && (
                        <span className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-semibold text-slate-600">
                          +{item.tools.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Skills */}
                {item.skills?.length > 0 && (
                  <div className="mt-5">
                    <div className="mb-2.5 flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-sky-600" />
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#475569]">
                        Skills You'll Develop
                      </h3>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {item.skills.slice(0, 3).map((skill, index) => (
                        <span
                          key={`${skill}-${index}`}
                          className="max-w-full break-words rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-600"
                        >
                          {skill}
                        </span>
                      ))}

                      {item.skills.length > 3 && (
                        <span className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-semibold text-slate-600">
                          +{item.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Why It Matters */}
                {item.whyItMatters?.trim() && (
                  <div className="mt-6 rounded-xl border border-sky-100 bg-sky-50/70 p-4">
                    <div className="flex items-center gap-2">
                      <Lightbulb className="h-4 w-4 shrink-0 text-sky-700" />
                      <h3 className="text-xs font-bold uppercase tracking-wider text-sky-800">
                        Why It Matters
                      </h3>
                    </div>

                    <p className="mt-2 text-sm leading-5 text-slate-600">
                      {item.whyItMatters}
                    </p>
                  </div>
                )}

                {/* Informational Footer — no quiz navigation */}
                <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4 mt-6">
                  <span className="text-xs font-medium text-slate-400">
                    Explore & Learn
                  </span>

                  <ArrowUpRight className="h-4 w-4 text-slate-400 transition-colors group-hover:text-sky-600" />
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Bottom Note */}
        {!loading && !error && categories.length > 0 && (
          <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
            <Code2 className="mt-0.5 h-5 w-5 shrink-0 text-[#0284C7]" />

            <p className="text-sm leading-6 text-[#64748B]">
              <span className="font-semibold text-[#0F172A]">
                Keep exploring.
              </span>{" "}
              Every category introduces concepts, tools, and skills that can
              help you strengthen your technical knowledge.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
