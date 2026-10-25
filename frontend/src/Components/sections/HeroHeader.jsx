import {
  Badge,
  Box,
  Button,
  Container,
  Grid,
  Group,
  List,
  Stack,
  Text,
  ThemeIcon,
  Title,
  Image,
} from "@mantine/core";

import {
  IconCheck,
  IconPlayerPlayFilled,
  IconArrowRight,
  IconSparkles,
} from "@tabler/icons-react";

import classes from "../../css/HeroBullets.module.css";
import image from "../../assets/quiz-sample.svg"; // Keep your existing image import

const features = [
  "Real-time Performance Analytics",
  "Curated Industry Knowledge",
  "Instant Skill Verification",
  "100% Free & Accessible",
];

export function HeroBullets() {
  return (
    <Box component="section" className={classes.hero}>
      <Container size="xl">
        <Grid align="center" gutter={{ base: 40, md: 60 }}>
          {/* Left: Hero Content */}
          <Grid.Col span={{ base: 12, md: 7 }}>
            <Stack gap={0} className={classes.content}>
              <Badge
                variant="light"
                color="blue"
                radius="xl"
                size="lg"
                leftSection={<IconSparkles size={15} />}
                className={classes.badge}
              >
                Next-Gen Skill Assessment Platform
              </Badge>

              <Title order={1} className={classes.title}>
                Assess Your Expertise.
                <br />
                <span className={classes.highlight}>Master New Skills.</span>
              </Title>

              <Text className={classes.description}>
                Empower your learning journey with structured, high-impact
                quizzes designed to evaluate knowledge, sharpen critical
                thinking, and measure progress in real time.
              </Text>

              <Box className={classes.features}>
                {features.map((feature) => (
                  <Group key={feature} gap="xs" wrap="nowrap">
                    <ThemeIcon variant="transparent" color="teal" size={20}>
                      <IconCheck size={18} stroke={2.3} />
                    </ThemeIcon>

                    <Text className={classes.featureText}>{feature}</Text>
                  </Group>
                ))}
              </Box>

              <Group mt={38} gap={3} className={classes.actions}>
                <Button
                  component="a"
                  href="/assessment"
                  size="lg"
                  radius="md"
                  leftSection={<IconPlayerPlayFilled size={16} />}
                  className={classes.primaryButton}
                >
                  Start Assessment
                </Button>

                <Button
                  component="a"
                  href="/categories"
                  size="lg"
                  radius="md"
                  variant="default"
                  rightSection={<IconArrowRight size={16} />}
                  className={classes.secondaryButton}
                >
                  Browse Categories
                </Button>
              </Group>
            </Stack>
          </Grid.Col>

          {/* Right: Your Hero Image */}
          <Grid.Col span={{ base: 12, md: 5 }}>
            <Box className={classes.visual}>
              <Image
                src={image}
                alt="PopQuiz interactive assessment preview"
                fit="contain"
                className={classes.heroImage}
              />
            </Box>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
}
