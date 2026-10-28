import { Link } from "react-router-dom";
import {
  Play,
  Sparkles,
  Brain,
  Trophy,
  ArrowRight,
  CheckCircle2,
  BarChart3,
  ShieldCheck,
} from "lucide-react";

import { HeroBullets } from "@/Components/sections/HeroHeader";
import { ContactUs } from "@/Components/sections/ContactUs";
import { FaqWithImage } from "../Components/ui/FaqWithImage.jsx";
function Home() {
  const categories = [
    {
      title: "Software Engineering",
      count: "140+ Quizzes",
      icon: Brain,
      badge: "Popular",
    },
    {
      title: "Business & Management",
      count: "95+ Quizzes",
      icon: ShieldCheck,
      badge: "Trending",
    },
    {
      title: "Data & Analytics",
      count: "110+ Quizzes",
      icon: BarChart3,
      badge: null,
    },
    {
      title: "General & Industry Knowledge",
      count: "85+ Quizzes",
      icon: Trophy,
      badge: null,
    },
  ];

  const features = [
    "Real-time Performance Analytics",
    "Curated Industry Knowledge",
    "Instant Skill Verification",
    "100% Free & Accessible",
  ];
  return (
    <>
      <HeroBullets></HeroBullets>

      <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans antialiased">
        {/* Main Content Area */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
          {/* Categories Grid */}
          <div className="space-y-6 sm:space-y-8">
            {/* Section Header */}
            <div className="flex flex-col gap-4 border-b border-[#E2E8F0] pb-5 sm:flex-row sm:items-end sm:justify-between">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#0284C7]">
                  Discover & Learn
                </span>

                <h2 className="text-2xl font-bold tracking-tight text-[#0F172A] sm:text-3xl">
                  Explore Assessment Categories
                </h2>

                <p className="max-w-xl text-sm leading-6 text-[#64748B] sm:text-base">
                  Discover different disciplines, explore topics, and find the
                  right assessments for your learning journey.
                </p>
              </div>

              <Link
                to="/categories"
                className="group inline-flex w-fit shrink-0 items-center justify-center gap-2 rounded-lg border border-[#BAE6FD] bg-[#F0F9FF] px-4 py-2.5 text-sm font-semibold text-[#0284C7] transition-all duration-200 hover:border-[#7DD3FC] hover:bg-[#E0F2FE] hover:text-[#0369A1]"
              >
                <span>Explore all topics</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Category Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-5">
              {categories.map((cat, index) => {
                const Icon = cat.icon;

                return (
                  <div
                    key={cat._id || index}
                    className="group flex min-w-0 flex-col rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#BAE6FD] hover:shadow-lg hover:shadow-sky-900/5 sm:p-6"
                  >
                    {/* Icon and Badge */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F1F5F9] text-[#334155] transition-colors duration-300 group-hover:bg-[#0284C7] group-hover:text-white">
                        <Icon className="h-6 w-6" />
                      </div>

                      {cat.badge && (
                        <span className="max-w-[55%] truncate rounded-full border border-[#E2E8F0] bg-[#F8FAFC] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                          {cat.badge}
                        </span>
                      )}
                    </div>

                    {/* Category Details */}
                    <div className="mt-5 space-y-2">
                      <h3 className="break-words text-base font-bold leading-6 text-[#0F172A] transition-colors duration-200 group-hover:text-[#0284C7] sm:text-lg">
                        {cat.title}
                      </h3>

                      <p className="text-sm leading-5 text-[#64748B]">
                        {cat.count}
                      </p>
                    </div>

                    {/* Details Indicator — no quiz action */}
                    <div className="mt-5 flex items-center gap-2 border-t border-[#F1F5F9] pt-4 text-xs font-medium text-[#94A3B8]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#38BDF8]" />
                      <span>Assessment category</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Professional Metrics Strip */}
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-8 shadow-sm">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-[#E2E8F0]">
              <div className="text-center space-y-1">
                <p className="text-3xl font-extrabold text-[#0F172A]">500+</p>
                <p className="text-xs font-medium text-[#64748B]">
                  Verified Tests
                </p>
              </div>
              <div className="text-center space-y-1 pt-6 md:pt-0">
                <p className="text-3xl font-extrabold text-[#0284C7]">250k+</p>
                <p className="text-xs font-medium text-[#64748B]">
                  Questions Answered
                </p>
              </div>
              <div className="text-center space-y-1 pt-6 md:pt-0">
                <p className="text-3xl font-extrabold text-[#059669]">98.4%</p>
                <p className="text-xs font-medium text-[#64748B]">
                  Satisfaction Rate
                </p>
              </div>
              <div className="text-center space-y-1 pt-6 md:pt-0">
                <p className="text-3xl font-extrabold text-[#0F172A]">50k+</p>
                <p className="text-xs font-medium text-[#64748B]">
                  Active Learners
                </p>
              </div>
            </div>
          </div>
          {/* Trust & Enterprise Banner */}
          <div className="rounded-xl bg-[#0F172A] text-white p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-md">
            <div className="space-y-2 text-center md:text-left max-w-xl">
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                Ready to test your knowledge?
              </h3>
              <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                Join thousands of professionals sharpening their skill sets
                daily. No registration required to start your first practice
                assessment.
              </p>
            </div>
            <Link
              to="/quiz"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#059669] text-white font-semibold text-sm hover:bg-[#047857] active:scale-95 transition-all flex-shrink-0"
            >
              <Play className="w-4 h-4 fill-current" />
              Get Started Free
            </Link>
          </div>
          <ContactUs></ContactUs>
          <FaqWithImage></FaqWithImage>
        </section>
      </div>
    </>
  );
}

export default Home;
