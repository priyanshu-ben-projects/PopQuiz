import { Link } from "react-router-dom";
import logoImg from "../../assets/logoImg.png";

function Footer() {
  const githubUrl = "https://github.com";

  const handleGithubClick = () => {
    window.open(githubUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <footer className="w-full border-t border-[#E2E8F0] bg-white text-[#0F172A] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center md:items-start text-center md:text-left">
          {/* Column 1: Brand & Bio */}
          <div className="space-y-3 flex flex-col items-center md:items-start">
            <Link to="/" className="flex items-center gap-2 group">
              <img
                src={logoImg}
                alt="Brand Logo"
                className="h-9 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
              />
            </Link>
            <p className="text-sm text-[#64748B] max-w-xs leading-relaxed">
              A professional platform to evaluate your skills, benchmark
              expertise, and accelerate continuous learning.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold tracking-wider uppercase text-[#0F172A]">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-sm text-[#64748B] hover:text-[#0284C7] transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-sm text-[#64748B] hover:text-[#0284C7] transition-colors"
                >
                  About me
                </Link>
              </li>
              <li>
                <Link
                  to="/quiz"
                  className="text-sm text-[#64748B] hover:text-[#0284C7] transition-colors"
                >
                  Start Quiz
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Connect / GitHub Action */}
          <div className="space-y-3 flex flex-col items-center md:items-start">
            <h3 className="text-xs font-bold tracking-wider uppercase text-[#0F172A]">
              Connect
            </h3>
            <button
              onClick={handleGithubClick}
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold bg-[#F1F5F9] text-[#0F172A] border border-[#E2E8F0] hover:bg-[#E2E8F0] transition-all cursor-pointer shadow-xs"
            >
              <svg
                className="w-4 h-4 fill-current text-[#059669]"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
              View on GitHub
            </button>
          </div>
        </div>

        {/* Bottom Copyright & Branding Bar */}
        <div className="mt-12 pt-6 border-t border-[#E2E8F0] text-xs text-[#64748B] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p>&copy; {new Date().getFullYear()} PopQuiz. All rights reserved.</p>
          <p className="flex items-center justify-center gap-1">
            Designed & Developed by{" "}
            <span className="font-semibold text-[#0F172A]">Priyanshu Ben</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
