import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import logoImg from "../../assets/logoImg.png";
import AuthButton from "../AuthButton";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About me", path: "/about" },
  ];

  const githubUrl = "https://github.com";

  const handleGithubClick = () => {
    window.open(githubUrl, "_blank", "noopener,noreferrer");
  };

  const getNavLinkStyle = ({ isActive }) => ({
    backgroundColor: isActive ? "#F1F5F9" : "transparent",
    color: isActive ? "#0284C7" : "#64748B",
    fontWeight: isActive ? "600" : "500",
  });

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/90 border-b border-[#E2E8F0] transition-all duration-300 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-2.5 group">
              <img
                src={logoImg}
                alt="Brand Logo"
                className="h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
              />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-5">
            <NavigationMenu>
              <NavigationMenuList>
                {/* Home */}
                <NavigationMenuItem>
                  <NavigationMenuLink
                    render={<NavLink to="/" end />}
                    className={navigationMenuTriggerStyle()}
                  >
                    Home
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Explore Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={navigationMenuTriggerStyle()}
                  >
                    Explore
                  </NavigationMenuTrigger>

                  <NavigationMenuContent>
                    <div className="grid w-[320px] gap-1 p-2">
                      <NavigationMenuLink
                        render={<NavLink to="/categories" />}
                        className="block rounded-lg p-3 no-underline outline-none transition-colors hover:bg-slate-100"
                      >
                        <p className="text-sm font-semibold text-slate-900">
                          Browse Categories
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          Explore quizzes across different domains.
                        </p>
                      </NavigationMenuLink>

                      <NavigationMenuLink
                        render={<NavLink to="/assessment" />}
                        className="block rounded-lg p-3 no-underline outline-none transition-colors hover:bg-slate-100"
                      >
                        <p className="text-sm font-semibold text-slate-900">
                          Take an Assessment
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          Test your knowledge and evaluate your skills.
                        </p>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Resources Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={navigationMenuTriggerStyle()}
                  >
                    Resources
                  </NavigationMenuTrigger>

                  <NavigationMenuContent>
                    <div className="grid w-[320px] gap-1 p-2">
                      <NavigationMenuLink
                        render={<NavLink to="/about" />}
                        className="block rounded-lg p-3 no-underline outline-none transition-colors hover:bg-slate-100"
                      >
                        <p className="text-sm font-semibold text-slate-900">
                          About PopQuiz
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          Learn about the platform and its purpose.
                        </p>
                      </NavigationMenuLink>

                      <NavigationMenuLink
                        render={<NavLink to="/help" />}
                        className="block rounded-lg p-3 no-underline outline-none transition-colors hover:bg-slate-100"
                      >
                        <p className="text-sm font-semibold text-slate-900">
                          Help & Support
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          Get help using PopQuiz.
                        </p>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Dashboard */}
                <NavigationMenuItem>
                  <NavigationMenuLink
                    render={<NavLink to="/dashboard" />}
                    className={navigationMenuTriggerStyle()}
                  >
                    Dashboard
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <AuthButton></AuthButton>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="p-2.5 rounded-lg text-[#0F172A] bg-[#F1F5F9] focus:outline-none transition-colors"
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
                    strokeWidth="2"
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
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent
          side="right"
          className="flex w-[280px] flex-col justify-between border-l border-slate-200 bg-white p-6 shadow-xl"
        >
          <div>
            <SheetHeader className="text-left">
              <SheetTitle className="text-lg font-bold tracking-tight text-slate-900">
                PopQuiz
              </SheetTitle>
              <SheetDescription className="text-xs text-slate-500">
                Navigate through PopQuiz
              </SheetDescription>
            </SheetHeader>

            <nav
              className="mt-6 flex flex-col gap-1.5"
              aria-label="Mobile Navigation"
            >
              {navItems.map((item) => (
                <SheetClose asChild key={item.name}>
                  <NavLink
                    to={item.path}
                    end={item.path === "/"}
                    className={({ isActive }) =>
                      `flex items-center rounded-md px-3.5 py-2.5 text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
                        isActive
                          ? "border-l-4 border-sky-600 bg-sky-50 pl-2.5 font-semibold text-sky-700"
                          : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                </SheetClose>
              ))}
            </nav>
          </div>

          <div className="pt-4 border-t border-slate-200">
            <button
              onClick={handleGithubClick}
              type="button"
              className="flex w-full items-center justify-center gap-2.5 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 active:scale-[0.99]"
            >
              {/* GitHub SVG Icon */}
              <svg
                className="h-4 w-4 fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
              <span>GitHub</span>
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
