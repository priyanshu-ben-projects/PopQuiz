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
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Menu,
  X,
  Compass,
  FileCheck,
  Info,
  HelpCircle,
  LayoutDashboard,
} from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const exploreLinks = [
    {
      title: "Browse Categories",
      desc: "Explore quizzes across different domains.",
      path: "/categories",
      icon: Compass,
    },
    {
      title: "Take an Assessment",
      desc: "Test your knowledge and evaluate your skills.",
      path: "/assessment",
      icon: FileCheck,
    },
  ];

  const resourceLinks = [
    {
      title: "About PopQuiz",
      desc: "Learn about the platform and its purpose.",
      path: "/about",
      icon: Info,
    },
    {
      title: "Help & Support",
      desc: "Get help using PopQuiz.",
      path: "/help",
      icon: HelpCircle,
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* 1. Left: Brand Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-2.5 group">
              <img
                src={logoImg}
                alt="PopQuiz Logo"
                className="h-10 sm:h-11 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
              />
            </Link>
          </div>

          {/* 2. Center: Desktop Navigation Links */}
          <div className="hidden md:flex flex-1 justify-center items-center px-8">
            <NavigationMenu>
              <NavigationMenuList className="gap-2">
                {/* Explore Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium text-slate-600 hover:text-slate-900 focus:text-slate-900 focus:bg-slate-100/60 rounded-lg px-3.5 py-2 transition-colors">
                    Explore
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[320px] gap-1.5 p-2 bg-white rounded-xl shadow-lg border border-slate-100">
                      {exploreLinks.map((item) => {
                        const Icon = item.icon;
                        return (
                          <NavigationMenuLink asChild key={item.path}>
                            <NavLink
                              to={item.path}
                              className={({ isActive }) =>
                                `flex items-start gap-3 rounded-lg p-2.5 transition-colors hover:bg-slate-100/80 ${
                                  isActive ? "bg-sky-50/80" : ""
                                }`
                              }
                            >
                              <div className="p-2 rounded-md bg-slate-100 text-slate-700">
                                <Icon className="w-4 h-4 text-sky-600" />
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-slate-900 leading-snug">
                                  {item.title}
                                </p>
                                <p className="mt-0.5 text-xs text-slate-500 leading-relaxed">
                                  {item.desc}
                                </p>
                              </div>
                            </NavLink>
                          </NavigationMenuLink>
                        );
                      })}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Resources Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium text-slate-600 hover:text-slate-900 focus:text-slate-900 focus:bg-slate-100/60 rounded-lg px-3.5 py-2 transition-colors">
                    Resources
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[320px] gap-1.5 p-2 bg-white rounded-xl shadow-lg border border-slate-100">
                      {resourceLinks.map((item) => {
                        const Icon = item.icon;
                        return (
                          <NavigationMenuLink asChild key={item.path}>
                            <NavLink
                              to={item.path}
                              className={({ isActive }) =>
                                `flex items-start gap-3 rounded-lg p-2.5 transition-colors hover:bg-slate-100/80 ${
                                  isActive ? "bg-sky-50/80" : ""
                                }`
                              }
                            >
                              <div className="p-2 rounded-md bg-slate-100 text-slate-700">
                                <Icon className="w-4 h-4 text-sky-600" />
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-slate-900 leading-snug">
                                  {item.title}
                                </p>
                                <p className="mt-0.5 text-xs text-slate-500 leading-relaxed">
                                  {item.desc}
                                </p>
                              </div>
                            </NavLink>
                          </NavigationMenuLink>
                        );
                      })}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Dashboard Option */}
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <NavLink
                      to="/dashboard"
                      className={({ isActive }) =>
                        `text-sm font-medium px-3.5 py-2 rounded-lg transition-colors ${
                          isActive
                            ? "bg-sky-50/80 text-sky-600 font-semibold"
                            : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/60"
                        }`
                      }
                    >
                      Dashboard
                    </NavLink>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* 3. Right: Desktop Auth Button CTA */}
          <div className="hidden md:flex gap-5 items-center justify-end flex-shrink-0">
            <AuthButton />
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 active:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/20 transition-colors"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Toggle Main Menu</span>
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Sheet */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent
          side="right"
          className="flex w-full max-w-xs flex-col justify-between border-l border-slate-200 bg-white p-6 shadow-2xl"
        >
          <div className="flex flex-col space-y-6">
            <SheetHeader className="text-left pb-2 border-b border-slate-100">
              <SheetTitle className="text-xl font-bold tracking-tight text-slate-900">
                PopQuiz
              </SheetTitle>
              <SheetDescription className="text-xs text-slate-500">
                Navigate through your account and topics
              </SheetDescription>
            </SheetHeader>

            <nav
              className="flex flex-col space-y-1"
              aria-label="Mobile Navigation"
            >
              {/* Home Link */}
              <SheetClose asChild>
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium transition-all ${
                      isActive
                        ? "bg-sky-50 text-sky-700 font-semibold border-l-4 border-sky-600 pl-2.5"
                        : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
                    }`
                  }
                >
                  Home
                </NavLink>
              </SheetClose>

              {/* Explore Section */}
              <div className="pt-2 pb-1">
                <span className="px-3.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Explore
                </span>
                <div className="mt-1 space-y-1">
                  {exploreLinks.map((item) => (
                    <SheetClose asChild key={item.path}>
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          `flex items-center gap-3 rounded-lg px-3.5 py-2 text-sm font-medium transition-all ${
                            isActive
                              ? "bg-sky-50 text-sky-700 font-semibold"
                              : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
                          }`
                        }
                      >
                        {item.title}
                      </NavLink>
                    </SheetClose>
                  ))}
                </div>
              </div>

              {/* Resources Section */}
              <div className="pt-2 pb-1">
                <span className="px-3.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Resources
                </span>
                <div className="mt-1 space-y-1">
                  {resourceLinks.map((item) => (
                    <SheetClose asChild key={item.path}>
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          `flex items-center gap-3 rounded-lg px-3.5 py-2 text-sm font-medium transition-all ${
                            isActive
                              ? "bg-sky-50 text-sky-700 font-semibold"
                              : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
                          }`
                        }
                      >
                        {item.title}
                      </NavLink>
                    </SheetClose>
                  ))}
                </div>
              </div>

              {/* Dashboard Link */}
              <SheetClose asChild>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium transition-all ${
                      isActive
                        ? "bg-sky-50 text-sky-700 font-semibold border-l-4 border-sky-600 pl-2.5"
                        : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
                    }`
                  }
                >
                  <LayoutDashboard className="w-4 h-4 text-sky-600" />
                  Dashboard
                </NavLink>
              </SheetClose>
            </nav>
          </div>

          {/* Mobile Auth Button CTA */}
          <div className="pt-4 border-t border-slate-100">
            <AuthButton />
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
