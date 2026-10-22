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
      <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans antialiased">
        <section className="relative overflow-hidden border-b border-[#E2E8F0] bg-white py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              <div className="lg:col-span-7 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F1F5F9] border border-[#E2E8F0] text-xs font-semibold text-[#0284C7]">
                  <Sparkles className="w-3.5 h-3.5 text-[#0284C7]" />
                  <span>Next-Gen Skill Assessment Platform</span>
                </div>

                {/* Headline */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-[#0F172A]">
                  Assess Your Expertise. <br />
                  <span className="text-[#0284C7]">Master New Skills.</span>
                </h1>

                {/* Subtitle */}
                <p className="text-base sm:text-lg text-[#64748B] max-w-xl leading-relaxed">
                  Empower your learning journey with structured, high-impact
                  quizzes designed to evaluate knowledge, sharpen critical
                  thinking, and measure progress in real time.
                </p>

                {/* Feature Checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {features.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[#475569]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#059669] flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4">
                  <Link
                    to="/assessment"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-[#0F172A] text-white font-semibold text-sm hover:bg-[#1E293B] active:scale-[0.99] transition-all shadow-sm"
                  >
                    <Play className="w-4 h-4 fill-current text-[#059669]" />
                    Start Assessment
                  </Link>

                  <Link
                    to="/categories"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-white text-[#0F172A] border border-[#E2E8F0] font-semibold text-sm hover:bg-[#F8FAFC] hover:border-[#CBD5E1] transition-all"
                  >
                    Browse Categories
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xl p-6 sm:p-8 space-y-6 relative">
                  {/* Card Header */}
                  <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#F1F5F9] flex items-center justify-center text-[#0284C7] font-bold">
                        PQ
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-[#0F172A]">
                          Live Quiz Session
                        </h3>
                        <p className="text-xs text-[#64748B]">
                          Professional Skills Test
                        </p>
                      </div>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]">
                      Active
                    </span>
                  </div>

                  {/* Sample Mockup Question */}
                  <div className="space-y-3">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
                      Sample Question
                    </p>
                    <p className="text-sm font-medium text-[#0F172A] leading-snug">
                      Which data structure provides constant time O(1) average
                      lookup performance?
                    </p>

                    <div className="space-y-2 pt-1">
                      <div className="p-3 rounded-md bg-[#ECFDF5] border border-[#10B981] flex items-center justify-between text-xs font-semibold text-[#065F46]">
                        <span>Hash Table</span>
                        <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                      </div>
                      <div className="p-3 rounded-md bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-medium text-[#64748B]">
                        Binary Search Tree
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Metrics */}
                  <div className="pt-2 border-t border-[#E2E8F0] grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-xs text-[#64748B]">
                        Average Completion
                      </p>
                      <p className="text-sm font-bold text-[#0F172A] mt-0.5">
                        4.5 Mins
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[#64748B]">Passing Score</p>
                      <p className="text-sm font-bold text-[#059669] mt-0.5">
                        80% or Higher
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

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
        </section>
      </div>
    </>
  );
}

export default Home;
