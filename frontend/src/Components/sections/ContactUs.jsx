import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
  IconArrowUpRight,
  IconMessageCircle,
} from "@tabler/icons-react";

import {
  ActionIcon,
  Button,
  Group,
  SimpleGrid,
  Text,
  Textarea,
  TextInput,
  Title,
  Select,
} from "@mantine/core";

import { ContactIconsList } from "./ContactIcons.jsx";
import classes from "../../css/ContactUs.module.css";

const social = [
  {
    Icon: IconBrandGithub,
    label: "GitHub",
    href: "https://github.com/priyanshu-ben-projects",
  },
  {
    Icon: IconBrandLinkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
  },
  {
    Icon: IconMail,
    label: "Email",
    href: "mailto:priyanshuben42@gmail.com",
  },
];

export function ContactUs() {
  const icons = social.map(({ Icon, label, href }) => (
    <ActionIcon
      key={label}
      component="a"
      href={href}
      target={label === "Email" ? undefined : "_blank"}
      rel={label === "Email" ? undefined : "noreferrer"}
      size={42}
      radius="md"
      variant="light"
      color="blue"
      aria-label={label}
      className={classes.social}
    >
      <Icon size={20} stroke={1.7} />
    </ActionIcon>
  ));

  return (
    <section className={classes.wrapper} id="contact">
      <SimpleGrid
        cols={{ base: 1, sm: 2 }}
        spacing={{ base: 28, sm: 32, md: 48 }}
        verticalSpacing={28}
      >
        <div className={classes.info}>
          <Text className={classes.eyebrow}>
            <IconMessageCircle size={16} />
            GET IN TOUCH
          </Text>

          <Title order={2} className={classes.title}>
            Let's talk about
            <span className={classes.highlight}> your next idea.</span>
          </Title>

          <Text className={classes.description}>
            Have feedback about PopQuiz, a question about the platform, or an
            idea for collaboration? I'd love to hear from you.
          </Text>

          <div className={classes.contactDetails}>
            <ContactIconsList />
          </div>

          <div className={classes.socialSection}>
            <Text className={classes.socialLabel}>CONNECT WITH ME</Text>
            <Group gap="sm">{icons}</Group>
          </div>
        </div>

        <div className={classes.form}>
          <div className={classes.formHeader}>
            <Title order={3} className={classes.formTitle}>
              Send a message
            </Title>
            <Text className={classes.formDescription}>
              Fill in the details below to get started.
            </Text>
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              // Connect your backend or email service here.
            }}
          >
            <TextInput
              name="name"
              label="Your name"
              placeholder="Enter your full name"
              required
              autoComplete="name"
              radius="md"
              classNames={{
                input: classes.input,
                label: classes.inputLabel,
              }}
            />

            <TextInput
              name="email"
              type="email"
              label="Email address"
              placeholder="you@example.com"
              required
              autoComplete="email"
              mt="md"
              radius="md"
              classNames={{
                input: classes.input,
                label: classes.inputLabel,
              }}
            />

            <Select
              name="subject"
              label="What would you like to discuss?"
              placeholder="Choose a topic"
              data={[
                "PopQuiz feedback",
                "Technical support",
                "Feature suggestion",
                "Collaboration",
                "Other",
              ]}
              mt="md"
              radius="md"
              classNames={{
                input: classes.input,
                label: classes.inputLabel,
              }}
              comboboxProps={{ withinPortal: true }}
            />

            <Textarea
              name="message"
              label="Your message"
              placeholder="Tell me what's on your mind..."
              required
              minRows={4}
              maxRows={8}
              autosize
              mt="md"
              radius="md"
              classNames={{
                input: classes.input,
                label: classes.inputLabel,
              }}
            />

            <Button
              type="submit"
              fullWidth
              mt="xl"
              radius="md"
              size="md"
              rightSection={<IconArrowUpRight size={18} />}
              className={classes.control}
            >
              Send message
            </Button>

            <Text className={classes.formFootnote}>
              Your message helps make PopQuiz better.
            </Text>
          </form>
        </div>
      </SimpleGrid>
    </section>
  );
}
