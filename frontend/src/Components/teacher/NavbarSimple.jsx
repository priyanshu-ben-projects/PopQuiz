import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  IconLayoutDashboard,
  IconHelp,
  IconClipboardList,
  IconUsers,
  IconChartBar,
  IconSettings,
  IconHome2,
  IconMenu2,
  IconX,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";

import AuthButton from "../AuthButton";
import classes from "../../css/NavbarSimple.module.css";

const data = [
  { link: "/", label: "Home", icon: IconHome2 },
  { link: "/admin/dashboard", label: "Dashboard", icon: IconLayoutDashboard },
  { link: "/admin/myquizzes", label: "My Quizzes", icon: IconClipboardList },
  { link: "/teacher/questions", label: "Question Bank", icon: IconHelp },
  { link: "/teacher/participants", label: "Participants", icon: IconUsers },
  { link: "/teacher/analytics", label: "Analytics", icon: IconChartBar },
  { link: "/teacher/settings", label: "Settings", icon: IconSettings },
];

export function NavbarSimple() {
  const [opened, setOpened] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const links = data.map((item) => (
    <NavLink
      to={item.link}
      key={item.label}
      end
      onClick={() => setOpened(false)}
      title={collapsed ? item.label : undefined}
      className={({ isActive }) =>
        `${classes.link} ${isActive ? classes.active : ""} ${
          collapsed ? "md:!justify-center md:!px-0" : ""
        }`
      }
    >
      <item.icon
        className={`${classes.linkIcon} ${collapsed ? "md:!mr-0" : ""}`}
        stroke={1.5}
      />

      <span className={collapsed ? "md:hidden" : ""}>{item.label}</span>
    </NavLink>
  ));

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4">
        <button
          onClick={() => setOpened(!opened)}
          className="p-2 rounded-lg hover:bg-slate-100"
          aria-label={opened ? "Close navigation" : "Open navigation"}
          aria-expanded={opened}
        >
          {opened ? <IconX size={25} /> : <IconMenu2 size={25} />}
        </button>
      </header>

      {/* Mobile Overlay */}
      {opened && (
        <div
          className="md:hidden fixed inset-0 bg-black/40 z-40"
          onClick={() => setOpened(false)}
        />
      )}

      {/* Sidebar */}
      <nav
        className={`
          ${classes.navbar}
          fixed md:sticky
          top-0 left-0
          z-50 md:z-30
          h-screen
          bg-white
          w-[300px]
          ${
            collapsed
              ? "md:!w-20 md:!min-w-20"
              : "md:!w-[300px] md:!min-w-[300px]"
          }
          ${opened ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          transition-[width,min-width,transform] duration-300 ease-in-out
        `}
      >
        {/* Desktop Auth Section */}
        <div className="hidden md:flex items-center justify-center min-h-[85px] px-1">
          <AuthButton collapsed={collapsed} />
        </div>

        {/* Mobile Sidebar Header */}
        <div className="md:hidden flex justify-between items-center px-4 py-5">
          <span className="font-semibold text-slate-800">~</span>

          <button onClick={() => setOpened(false)} aria-label="Close menu">
            <IconX size={21} />
          </button>
        </div>

        {/* Mobile Auth Section */}

        {/* Navigation Links */}
        <div className={`${classes.navbarMain} overflow-y-auto`}>{links}</div>
        <div className="md:hidden px-4 py-3 border-b border-slate-100">
          <AuthButton />
        </div>
        {/* Desktop Collapse Button */}
        <div className="hidden md:flex justify-center py-3 border-t border-slate-100">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2.5 rounded-lg text-slate-600 hover:bg-sky-50 hover:text-sky-600 transition-colors"
            title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            aria-label={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {collapsed ? (
              <IconChevronRight size={22} />
            ) : (
              <IconChevronLeft size={22} />
            )}
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 min-w-0 pt-16 md:pt-0">
        <Outlet />
      </main>
    </div>
  );
}
