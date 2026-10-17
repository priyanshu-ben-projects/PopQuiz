import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import logoImg from "../../assets/logoImg.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About me", path: "/about" },
    { name: "Start Quiz", path: "/quiz" },
  ];

  const githubUrl = "https://github.com";

  const handleGithubClick = () => {
    window.open(githubUrl, "_blank", "noopener,noreferrer");
  };

  const getNavLinkStyle = ({ isActive }) => ({
    backgroundColor: isActive ? "var(--color-primary)" : "transparent",
    color: isActive ? "var(--color-text)" : "var(--color-muted)",
  });

  return (
    <nav
      className="sticky top-0 z-50 backdrop-blur-md border-b transition-all duration-300 shadow-xs"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.85)", // Soft translucent surface
        borderColor: "var(--color-border)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo with subtle hover zoom */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-2 group">
              <img
                src={logoImg}
                alt="Brand Logo"
                className="h-11 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
              />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                style={getNavLinkStyle}
                className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-[var(--color-hover)] hover:text-[var(--color-text)]"
              >
                {item.name}
              </NavLink>
            ))}

            {/* Divider */}
            <div
              className="h-5 w-[1px] mx-2"
              style={{ backgroundColor: "var(--color-border)" }}
            />

            {/* External GitHub Button */}
            <button
              onClick={handleGithubClick}
              type="button"
              style={{
                backgroundColor: "var(--color-secondary)",
                color: "var(--color-purple)",
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 hover:shadow-xs hover:opacity-95 cursor-pointer"
            >
              <svg
                className="w-4 h-4 fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
              Github
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              style={{
                color: "var(--color-purple)",
                backgroundColor: "var(--color-hover)",
              }}
              className="p-2.5 rounded-xl focus:outline-none transition-colors"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div
          className="md:hidden px-4 pt-3 pb-5 space-y-2 border-t shadow-lg animate-fadeIn"
          style={{
            backgroundColor: "var(--color-surface)",
            borderColor: "var(--color-border)",
          }}
          id="mobile-menu"
        >
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              style={getNavLinkStyle}
              className="block px-4 py-2.5 rounded-xl text-base font-medium transition-colors duration-200"
            >
              {item.name}
            </NavLink>
          ))}

          <div className="pt-2">
            <button
              onClick={() => {
                setIsOpen(false);
                handleGithubClick();
              }}
              type="button"
              style={{
                backgroundColor: "var(--color-secondary)",
                color: "var(--color-purple)",
              }}
              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl text-base font-semibold"
            >
              <svg
                className="w-4 h-4 fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
              Github
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
