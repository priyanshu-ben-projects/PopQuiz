import { useState } from "react";
import AuthButton from "../AuthButton";
import {
  IconLayoutDashboard,
  IconHelp,
  IconClipboardList,
  IconUsers,
  IconChartBar,
  IconSettings,
  IconLogout,
} from "@tabler/icons-react";
import { Group, Image, Text } from "@mantine/core";
import classes from "../../css/NavbarSimple.module.css";

const data = [
  { link: "/teacher/dashboard", label: "Dashboard", icon: IconLayoutDashboard },
  { link: "/teacher/quizzes", label: "My Quizzes", icon: IconClipboardList },
  { link: "/teacher/questions", label: "Question Bank", icon: IconHelp },
  ,
  { link: "/teacher/participants", label: "Participants", icon: IconUsers },
  { link: "/teacher/analytics", label: "Analytics", icon: IconChartBar },
  { link: "/teacher/settings", label: "Settings", icon: IconSettings },
];
import logo from "../../assets/logoImg.png";
export function NavbarSimple() {
  const [active, setActive] = useState("Dashboard");

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
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

        {links}
      </div>
      <div className="w-full">
        <AuthButton></AuthButton>
      </div>
    </nav>
  );
}
