import { IconChevronRight } from "@tabler/icons-react";
import { Group, Text, UnstyledButton } from "@mantine/core";
import classes from "../../css/userButton.module.css";
import { useContext, userState } from "react";
import AuthContext from "../../context/AuthContext.js";

export function UserButton() {
  const { user } = useContext(AuthContext);
  return (
    <UnstyledButton className={classes.user}>
      <Group>
        {/* <Avatar
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
          radius="xl"
          alt="Harriette Spoonlicker"
        /> */}

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            {user.username}
          </Text>

          <Text c="dimmed" size="xs">
            {user.email}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  );
}
