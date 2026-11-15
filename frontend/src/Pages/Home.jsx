import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import {
  Play,
  Sparkles,
  Brain,
  Trophy,
  ArrowRight,
  CheckCircle2,
  BarChart3,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";

import { HeroBullets } from "@/Components/sections/HeroHeader";
import { ContactUs } from "@/Components/sections/ContactUs";
import { FaqWithImage } from "../Components/ui/FaqWithImage.jsx";

// --- Reusable Animated Counter Component ---
function AnimatedCounter({ value, suffix = "", decimals = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 35,
    stiffness: 100,
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${latest.toFixed(decimals)}${suffix}`;
      }
    });
  }, [springValue, decimals, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 22 },
  },
};

function Home() {
  const categories = [
    {
      title: "Software Engineering",
      slug: "software-engineering",
      count: "140+ Quizzes",
      icon: Brain,
      badge: "Popular",
      accent: "group-hover:bg-[#0284C7]",
    },
    {
      title: "Business & Management",
      slug: "business-management",
      count: "95+ Quizzes",
      icon: ShieldCheck,
      badge: "Trending",
      accent: "group-hover:bg-[#059669]",
    },
    {
      title: "Data & Analytics",
      slug: "data-analytics",
      count: "110+ Quizzes",
      icon: BarChart3,
      badge: null,
      accent: "group-hover:bg-[#7C3AED]",
    },
    {
      title: "General & Industry Knowledge",
      slug: "general-knowledge",
      count: "85+ Quizzes",
      icon: Trophy,
      badge: null,
      accent: "group-hover:bg-[#D97706]",
    },
  ];

  const features = [
    "Real-time Performance Analytics",
    "Curated Industry Knowledge",
    "Instant Skill Verification",
    "100% Free & Accessible",
  ];

  const metrics = [
    {
      value: 500,
      suffix: "+",
      decimals: 0,
      label: "Verified Tests",
      color: "text-[#0F172A]",
    },
    {
      value: 250,
      suffix: "k+",
      decimals: 0,
      label: "Questions Answered",
      color: "text-[#0284C7]",
    },
    {
      value: 98.4,
      suffix: "%",
      decimals: 1,
      label: "Satisfaction Rate",
      color: "text-[#059669]",
    },
    {
      value: 50,
      suffix: "k+",
      decimals: 0,
      label: "Active Learners",
      color: "text-[#0F172A]",
    },
  ];

  return (
    <>
      <HeroBullets />

      <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans antialiased selection:bg-[#BAE6FD] selection:text-[#0369A1]">
        {/* Value Proposition Strip (Utilizing your features array) */}
        <div className="border-y border-[#E2E8F0] bg-white/80 backdrop-blur-sm">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={staggerContainer}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-[#334155]"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#059669]" />
                  <span>{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Main Content Area */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-20">
          {/* Categories Section */}
          <div className="space-y-8">
            {/* Section Header */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
              className="flex flex-col gap-4 border-b border-[#E2E8F0] pb-6 sm:flex-row sm:items-end sm:justify-between"
            >
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-[#F0F9FF] px-3 py-1 border border-[#BAE6FD]">
                  <Sparkles className="h-3.5 w-3.5 text-[#0284C7]" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#0284C7]">
                    Discover & Learn
                  </span>
                </div>

                <h2 className="text-2xl font-extrabold tracking-tight text-[#0F172A] sm:text-3xl">
                  Explore Assessment Categories
                </h2>

                <p className="max-w-xl text-sm leading-6 text-[#64748B] sm:text-base">
                  Discover different disciplines, explore topics, and find the
                  right assessments for your learning journey.
                </p>
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/categories"
                  className="group inline-flex w-fit shrink-0 items-center justify-center gap-2 rounded-xl border border-[#BAE6FD] bg-white px-4 py-2.5 text-sm font-semibold text-[#0284C7] shadow-xs transition-colors duration-200 hover:border-[#7DD3FC] hover:bg-[#F0F9FF] hover:text-[#0369A1]"
                >
                  <span>Explore all topics</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Category Cards Grid */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={staggerContainer}
              className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
            >
              {categories.map((cat, index) => {
                const Icon = cat.icon;

                return (
                  <motion.div
                    key={cat._id || index}
                    variants={cardVariant}
                    whileHover={{ y: -6 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Link
                      to={`/categories/${cat.slug}`}
                      className="group relative flex h-full min-w-0 flex-col justify-between overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-xs transition-all duration-300 hover:border-[#7DD3FC] hover:shadow-xl hover:shadow-sky-900/5"
                    >
                      {/* Subtle Top Gradient Highlight on Hover */}
                      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#0284C7] via-[#38BDF8] to-[#059669] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                      <div>
                        {/* Icon and Badge */}
                        <div className="flex items-start justify-between gap-3">
                          <div
                            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F1F5F9] text-[#334155] transition-all duration-300 group-hover:scale-105 group-hover:text-white ${cat.accent}`}
                          >
                            <Icon className="h-6 w-6" />
                          </div>

                          {cat.badge && (
                            <span
                              className={`max-w-[55%] truncate rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                                cat.badge === "Popular"
                                  ? "border border-[#BAE6FD] bg-[#F0F9FF] text-[#0284C7]"
                                  : "border border-[#A7F3D0] bg-[#ECFDF5] text-[#059669]"
                              }`}
                            >
                              {cat.badge}
                            </span>
                          )}
                        </div>

                        {/* Category Details */}
                        <div className="mt-6 space-y-1.5">
                          <h3 className="break-words text-base font-bold leading-6 text-[#0F172A] transition-colors duration-200 group-hover:text-[#0284C7] sm:text-lg">
                            {cat.title}
                          </h3>

                          <p className="text-sm font-medium text-[#64748B]">
                            {cat.count}
                          </p>
                        </div>
                      </div>

                      {/* Interactive Footer */}
                      <div className="mt-6 flex items-center justify-between border-t border-[#F1F5F9] pt-4 text-xs font-semibold text-[#64748B] transition-colors group-hover:text-[#0284C7]">
                        <div className="flex items-center gap-2">
                          <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#38BDF8] opacity-0 group-hover:opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#38BDF8]" />
                          </span>
                          <span>Browse assessments</span>
                        </div>
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Animated Professional Metrics Strip */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="rounded-2xl border border-[#E2E8F0] bg-white p-8 sm:p-10 shadow-xs"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-[#E2E8F0]">
              {metrics.map((metric, idx) => (
                <div
                  key={idx}
                  className={`text-center space-y-1.5 ${
                    idx > 0 ? "pt-6 md:pt-0" : ""
                  }`}
                >
                  <p
                    className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${metric.color}`}
                  >
                    <AnimatedCounter
                      value={metric.value}
                      suffix={metric.suffix}
                      decimals={metric.decimals}
                    />
                  </p>
                  <p className="text-xs sm:text-sm font-medium text-[#64748B]">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Trust & Enterprise CTA Banner */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="relative overflow-hidden rounded-2xl bg-[#0F172A] text-white p-8 sm:p-12 shadow-xl"
          >
            {/* Ambient Background Glows */}
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.18, 0.28, 0.18],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-[#0284C7] blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.12, 0.22, 0.12],
              }}
              transition={{
                duration: 9,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="pointer-events-none absolute -bottom-24 left-10 h-64 w-64 rounded-full bg-[#059669] blur-3xl"
            />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-3 text-center md:text-left max-w-xl">
                <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-[#38BDF8] backdrop-blur-xs">
                  Instant Access • No Sign-up Needed
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  Ready to test your knowledge?
                </h3>
                <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                  Join thousands of professionals sharpening their skill sets
                  daily. Start your first practice assessment in seconds.
                </p>
              </div>

              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="shrink-0"
              >
                <Link
                  to="/quiz"
                  className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#059669] text-white font-semibold text-sm sm:text-base shadow-lg shadow-emerald-950/50 hover:bg-[#10B981] transition-colors"
                >
                  <Play className="w-4 h-4 fill-current transition-transform duration-200 group-hover:scale-110" />
                  <span>Get Started Free</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact & FAQ Sections with Scroll Reveal */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={fadeInUp}
          >
            <ContactUs />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={fadeInUp}
          >
            <FaqWithImage />
          </motion.div>
        </section>
      </div>
    </>
  );
}

export default Home;
