import axios from "axios";
import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
import {
  Search,
  BookOpen,
  Wrench,
  Lightbulb,
  Sparkles,
  Code2,
  ArrowUpRight,
  GraduationCap,
  X,
  RefreshCw,
} from "lucide-react";

// --- Animation Variants ---
const headerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 24 },
  },
  exit: {
    opacity: 0,
    scale: 0.94,
    transition: { duration: 0.2, ease: "easeOut" },
  },
};

// --- Individual Interactive Category Card with Spotlight Hover ---
function CategoryCard({ item }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.article
      layout
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      whileHover={{ y: -6 }}
      transition={{
        layout: { type: "spring", stiffness: 300, damping: 28 },
        y: { type: "spring", stiffness: 320, damping: 22 },
      }}
      onMouseMove={handleMouseMove}
      className="group relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-xs transition-colors duration-300 hover:border-sky-300 hover:shadow-xl hover:shadow-sky-950/[0.06] sm:p-6"
    >
      {/* Interactive Cursor Spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              420px circle at ${mouseX}px ${mouseY}px,
              rgba(2, 132, 199, 0.07),
              transparent 80%
            )
          `,
        }}
      />

      {/* Top Gradient Accent Bar */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#0284C7] via-[#38BDF8] to-[#059669] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Category Identity */}
      <div className="relative z-10 flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-[#0284C7] ring-1 ring-sky-100 transition-all duration-300 group-hover:scale-105 group-hover:bg-[#0284C7] group-hover:text-white group-hover:ring-[#0284C7]">
          <BookOpen className="h-6 w-6" />
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="break-words text-lg font-bold tracking-tight text-[#0F172A] transition-colors duration-200 group-hover:text-[#0284C7] sm:text-xl">
            {item.category}
          </h2>

          <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-[#94A3B8]">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
            <span>Learning category</span>
          </p>
        </div>
      </div>

      {/* About */}
      <p className="relative z-10 mt-5 line-clamp-3 text-sm leading-6 text-[#64748B]">
        {item.about}
      </p>

      {/* Topics */}
      {item.topics?.length > 0 && (
        <div className="relative z-10 mt-5">
          <div className="mb-2.5 flex items-center gap-2">
            <BookOpen className="h-3.5 w-3.5 text-sky-600" />
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-[#475569]">
              Topics Covered
            </h3>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {item.topics.slice(0, 4).map((topic, index) => (
              <span
                key={`${topic}-${index}`}
                className="max-w-full break-words rounded-lg border border-slate-200/80 bg-slate-50/80 px-2.5 py-1 text-xs font-medium text-slate-600 transition-colors group-hover:border-slate-200 group-hover:bg-white"
              >
                {topic}
              </span>
            ))}

            {item.topics.length > 4 && (
              <span className="rounded-lg bg-sky-50 px-2.5 py-1 text-xs font-semibold text-sky-700">
                +{item.topics.length - 4} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Tools */}
      {item.tools?.length > 0 && (
        <div className="relative z-10 mt-5">
          <div className="mb-2.5 flex items-center gap-2">
            <Wrench className="h-3.5 w-3.5 text-sky-600" />
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-[#475569]">
              Tools & Technologies
            </h3>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {item.tools.slice(0, 3).map((tool, index) => (
              <span
                key={`${tool}-${index}`}
                className="max-w-full break-words rounded-lg border border-sky-100 bg-sky-50/80 px-2.5 py-1 text-xs font-medium text-sky-700"
              >
                {tool}
              </span>
            ))}

            {item.tools.length > 3 && (
              <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                +{item.tools.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Skills */}
      {item.skills?.length > 0 && (
        <div className="relative z-10 mt-5">
          <div className="mb-2.5 flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-[#475569]">
              Skills You&apos;ll Develop
            </h3>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {item.skills.slice(0, 3).map((skill, index) => (
              <span
                key={`${skill}-${index}`}
                className="max-w-full break-words rounded-lg border border-emerald-100 bg-emerald-50/50 px-2.5 py-1 text-xs font-medium text-emerald-800"
              >
                {skill}
              </span>
            ))}

            {item.skills.length > 3 && (
              <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                +{item.skills.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Why It Matters */}
      {item.whyItMatters?.trim() && (
        <div className="relative z-10 mt-6 rounded-xl border border-sky-100/80 bg-gradient-to-br from-sky-50/80 to-slate-50/80 p-4">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4 shrink-0 text-sky-700" />
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-sky-800">
              Why It Matters
            </h3>
          </div>

          <p className="mt-1.5 text-sm leading-5 text-slate-600">
            {item.whyItMatters}
          </p>
        </div>
      )}

      {/* Informational Footer */}
      <div className="relative z-10 mt-auto flex items-center justify-between border-t border-slate-100 pt-4 mt-6">
        <span className="text-xs font-semibold text-slate-400 transition-colors group-hover:text-sky-700">
          Explore & Learn
        </span>

        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition-all duration-200 group-hover:bg-sky-50 group-hover:text-sky-600">
          <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </motion.article>
  );
}

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
    <main className="relative min-h-screen overflow-hidden bg-[#F8FAFC] px-4 py-8 sm:px-6 sm:py-12 lg:px-8 selection:bg-sky-100 selection:text-sky-900">
      {/* Subtle Ambient Background Decoration */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-[420px] overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.12, 1],
            opacity: [0.35, 0.5, 0.35],
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-sky-200/40 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.18, 1],
            opacity: [0.25, 0.4, 0.25],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
          className="absolute -top-20 right-1/4 h-80 w-80 rounded-full bg-emerald-200/30 blur-3xl"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl space-y-8 sm:space-y-10">
        {/* Page Header */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={headerContainer}
          className="space-y-6"
        >
          <div className="max-w-3xl space-y-3">
            <motion.div variants={fadeUp}>
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-200/80 bg-white/80 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-sky-700 shadow-2xs backdrop-blur-xs">
                <GraduationCap className="h-4 w-4 text-[#0284C7]" />
                <span>PopQuiz Knowledge Library</span>
              </div>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-3xl font-extrabold tracking-tight text-[#0F172A] sm:text-4xl lg:text-5xl"
            >
              Explore Your Next{" "}
              <span className="bg-gradient-to-r from-[#0284C7] to-[#059669] bg-clip-text text-transparent">
                Learning Path
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="max-w-2xl text-sm leading-6 text-[#64748B] sm:text-base sm:leading-7"
            >
              Discover subjects, explore the tools and skills behind them, and
              understand how each discipline connects to real-world learning.
            </motion.p>
          </div>

          {/* Search and Live Results Counter */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="relative w-full sm:max-w-lg group">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors duration-200 group-focus-within:text-[#0284C7]" />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search categories, topics, tools, skills..."
                aria-label="Search categories, topics, tools, and skills"
                className="w-full rounded-xl border border-[#E2E8F0] bg-white/95 py-3 pl-12 pr-10 text-sm text-[#0F172A] shadow-2xs outline-none backdrop-blur-xs transition-all duration-200 placeholder:text-[#94A3B8] focus:border-[#0284C7] focus:bg-white focus:ring-4 focus:ring-sky-500/10"
              />

              <AnimatePresence>
                {search && (
                  <motion.button
                    type="button"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.15 }}
                    onClick={() => setSearch("")}
                    aria-label="Clear search query"
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                  >
                    <X className="h-4 w-4" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {!loading && !error && (
              <motion.div
                key={filteredCategories.length}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex w-fit items-center gap-2 rounded-lg border border-slate-200/80 bg-white px-3.5 py-2 text-xs sm:text-sm font-medium text-[#64748B] shadow-2xs"
                aria-live="polite"
              >
                <span className="h-2 w-2 rounded-full bg-[#059669]" />
                <span>
                  Showing{" "}
                  <strong className="font-bold text-[#0F172A]">
                    {filteredCategories.length}
                  </strong>{" "}
                  of{" "}
                  <strong className="font-bold text-[#0F172A]">
                    {categories.length}
                  </strong>{" "}
                  {categories.length === 1 ? "category" : "categories"}
                </span>
              </motion.div>
            )}
          </motion.div>
        </motion.section>

        {/* Main Content States */}
        <AnimatePresence mode="wait">
          {loading ? (
            /* Loading Skeleton Grid */
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div
                  key={n}
                  className="animate-pulse rounded-2xl border border-slate-200/80 bg-white p-6 shadow-2xs"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-slate-100" />
                    <div className="flex-1 space-y-2">
                      <div className="h-5 w-2/3 rounded-md bg-slate-100" />
                      <div className="h-3 w-1/3 rounded-md bg-slate-100" />
                    </div>
                  </div>
                  <div className="mt-5 space-y-2">
                    <div className="h-3 w-full rounded bg-slate-100" />
                    <div className="h-3 w-5/6 rounded bg-slate-100" />
                  </div>
                  <div className="mt-6 flex gap-2">
                    <div className="h-6 w-20 rounded-lg bg-slate-100" />
                    <div className="h-6 w-24 rounded-lg bg-slate-100" />
                    <div className="h-6 w-16 rounded-lg bg-slate-100" />
                  </div>
                  <div className="mt-6 h-16 rounded-xl bg-slate-50" />
                </div>
              ))}
            </motion.div>
          ) : error ? (
            /* Error State */
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              role="alert"
              className="rounded-2xl border border-red-100 bg-white px-5 py-14 text-center shadow-xs"
            >
              <p className="text-base font-semibold text-[#0F172A]">{error}</p>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => window.location.reload()}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#0284C7] px-5 py-2.5 text-sm font-semibold text-white shadow-xs transition hover:bg-[#0369A1]"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Reload page</span>
              </motion.button>
            </motion.div>
          ) : filteredCategories.length === 0 ? (
            /* Empty Search State */
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="rounded-2xl border border-dashed border-slate-300 bg-white/80 px-5 py-16 text-center backdrop-blur-xs"
            >
              <motion.div
                animate={{ rotate: [0, -8, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-slate-400"
              >
                <Search className="h-7 w-7" />
              </motion.div>

              <h2 className="mt-4 text-lg font-bold text-[#0F172A]">
                No matching categories
              </h2>

              <p className="mx-auto mt-1.5 max-w-md text-sm text-[#64748B]">
                We couldn&apos;t find anything matching &ldquo;{search}&rdquo;.
                Try another keyword to discover relevant subjects and skills.
              </p>

              {search && (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSearch("")}
                  className="mt-5 inline-flex items-center gap-1.5 rounded-xl border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-semibold text-[#0284C7] transition hover:bg-sky-100 hover:text-[#0369A1]"
                >
                  <X className="h-4 w-4" />
                  <span>Clear search</span>
                </motion.button>
              )}
            </motion.div>
          ) : (
            /* Animated Categories Grid */
            <motion.div
              key="grid"
              layout
              initial="hidden"
              animate="visible"
              transition={{ staggerChildren: 0.06 }}
              className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-3"
            >
              <AnimatePresence mode="popLayout">
                {filteredCategories.map((item, idx) => (
                  <CategoryCard
                    key={item._id || `${item.category}-${idx}`}
                    item={item}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Note */}
        {!loading && !error && categories.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="flex items-start gap-3.5 rounded-2xl border border-slate-200/90 bg-white p-4 shadow-2xs sm:p-5"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-[#0284C7]">
              <Code2 className="h-5 w-5" />
            </div>

            <p className="text-sm leading-6 text-[#64748B]">
              <span className="font-bold text-[#0F172A]">Keep exploring.</span>{" "}
              Every category introduces concepts, tools, and skills that can
              help you strengthen your technical knowledge.
            </p>
          </motion.div>
        )}
      </div>
    </main>
  );
}
