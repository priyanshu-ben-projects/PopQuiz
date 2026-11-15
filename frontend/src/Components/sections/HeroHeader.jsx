import {
  Badge,
  Box,
  Button,
  Container,
  Grid,
  Group,
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

import { motion } from "framer-motion";

import classes from "../../css/HeroBullets.module.css";
import image from "../../assets/quiz-sample.svg";

const features = [
  "Real-time Performance Analytics",
  "Curated Industry Knowledge",
  "Instant Skill Verification",
  "100% Free & Accessible",
];

// --- Framer Motion Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export function HeroBullets() {
  return (
    <Box
      component="section"
      className={classes.hero}
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* Ambient Animated Background Glows */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          top: "-10%",
          left: "-5%",
          width: "450px",
          height: "450px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(2, 132, 199, 0.25) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        style={{
          position: "absolute",
          bottom: "-15%",
          right: "-5%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(5, 150, 105, 0.2) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <Container size="xl" style={{ position: "relative", zIndex: 1 }}>
        <Grid align="center" gutter={{ base: 40, md: 60 }}>
          {/* Left: Hero Content with Staggered Entrance */}
          <Grid.Col span={{ base: 12, md: 7 }}>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <Box className={classes.content}>
                {/* Badge */}
                <motion.div variants={itemVariants}>
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
                </motion.div>

                {/* Title */}
                <motion.div
                  variants={itemVariants}
                  style={{ marginTop: "1rem" }}
                >
                  <Title order={1} className={classes.title}>
                    Assess Your Expertise.
                    <br />
                    <span className={classes.highlight}>
                      Master New Skills.
                    </span>
                  </Title>
                </motion.div>

                {/* Description */}
                <motion.div
                  variants={itemVariants}
                  style={{ marginTop: "1rem" }}
                >
                  <Text className={classes.description}>
                    Empower your learning journey with structured, high-impact
                    quizzes designed to evaluate knowledge, sharpen critical
                    thinking, and measure progress in real time.
                  </Text>
                </motion.div>

                {/* Features List */}
                <motion.div
                  variants={itemVariants}
                  style={{ marginTop: "1.5rem" }}
                >
                  <Box className={classes.features}>
                    {features.map((feature, idx) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + idx * 0.1, duration: 0.4 }}
                      >
                        <Group
                          gap="xs"
                          wrap="nowrap"
                          style={{ marginBottom: "0.5rem" }}
                        >
                          <ThemeIcon
                            variant="transparent"
                            color="teal"
                            size={20}
                          >
                            <IconCheck size={18} stroke={2.3} />
                          </ThemeIcon>
                          <Text className={classes.featureText}>{feature}</Text>
                        </Group>
                      </motion.div>
                    ))}
                  </Box>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  variants={itemVariants}
                  style={{ marginTop: "2rem" }}
                >
                  <Group gap="md" className={classes.actions}>
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
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
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
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
                    </motion.div>
                  </Group>
                </motion.div>
              </Box>
            </motion.div>
          </Grid.Col>

          {/* Right: Floating/Breathing Hero Image */}
          <Grid.Col span={{ base: 12, md: 5 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.2,
              }}
            >
              <motion.div
                animate={{
                  y: [0, -12, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Box className={classes.visual}>
                  <Image
                    src={image}
                    alt="PopQuiz interactive assessment preview"
                    fit="contain"
                    className={classes.heroImage}
                  />
                </Box>
              </motion.div>
            </motion.div>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
}
