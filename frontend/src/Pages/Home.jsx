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
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E2E8F0] pb-5">
              <div>
                <h2 className="text-2xl font-bold text-[#0F172A] tracking-tight">
                  Explore Assessment Categories
                </h2>
                <p className="text-sm text-[#64748B] mt-1">
                  Select a discipline to begin evaluating your knowledge.
                </p>
              </div>
              <Link
                to="/categories"
                className="inline-flex items-center gap-1 text-sm font-semibold text-[#0284C7] hover:text-[#0369A1] transition-colors"
              >
                <span>View all topics</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((cat, index) => {
                const Icon = cat.icon;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-6 border border-[#E2E8F0] shadow-sm hover:shadow-md hover:border-[#CBD5E1] transition-all group flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-lg bg-[#F1F5F9] flex items-center justify-center text-[#0F172A] group-hover:bg-[#0284C7] group-hover:text-white transition-colors">
                          <Icon className="w-5 h-5" />
                        </div>
                        {cat.badge && (
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#F1F5F9] text-[#64748B] border border-[#E2E8F0]">
                            {cat.badge}
                          </span>
                        )}
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-[#0F172A] group-hover:text-[#0284C7] transition-colors">
                          {cat.title}
                        </h3>
                        <p className="text-xs text-[#64748B] mt-1">
                          {cat.count}
                        </p>
                      </div>
                    </div>

                    <div className="pt-6 mt-4 border-t border-[#F1F5F9] flex items-center justify-between text-xs font-semibold text-[#0284C7]">
                      <span>Take Quiz</span>
                      <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
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
