import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import AuthButton from "../AuthButton";
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
} from "@tabler/icons-react";
import { Group, Image } from "@mantine/core";
import classes from "../../css/NavbarSimple.module.css";
import logo from "../../assets/logoImg.png";

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

  const links = data.map((item) => (
    <NavLink
      to={item.link}
      key={item.label}
      end
      onClick={() => setOpened(false)}
      className={({ isActive }) =>
        `${classes.link} ${isActive ? classes.active : ""}`
      }
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </NavLink>
  ));

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4">
        <Image src={logo} alt="PopQuiz Logo" h={42} w="auto" fit="contain" />

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
          w-64
          bg-white
          transition-transform duration-300
          ${opened ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <div className={classes.navbarMain}>
          {/* Desktop Logo */}
          <Group
            className={`${classes.header} hidden md:flex`}
            justify="space-between"
          >
            <Group gap="xs">
              <Image
                src={logo}
                alt="PopQuiz Logo"
                w="auto"
                h={50}
                fit="contain"
              />
            </Group>
          </Group>

          {/* Mobile Sidebar Heading */}
          <div className="md:hidden flex justify-between items-center px-4 py-5">
            <span className="font-semibold text-slate-800">Teacher Menu</span>
            <button onClick={() => setOpened(false)} aria-label="Close menu">
              <IconX size={21} />
            </button>
          </div>

          {links}
        </div>

        <div className="w-full p-3">
          <AuthButton />
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 min-w-0 pt-16 md:pt-0">
        <Outlet />
      </main>
    </div>
  );
}
