import { useEffect, useRef, useState } from "react";

export default function Timer({ totalSeconds, submitQuiz }) {
  const [timeLeft, setTimeLeft] = useState("--:--:--");
  const submitRef = useRef(submitQuiz);

  useEffect(() => {
    submitRef.current = submitQuiz;
  }, [submitQuiz]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (totalSeconds === 0) {
        clearInterval(timer);
        submitRef.current();
        return;
      }

      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      const formattedTime =
        String(hours).padStart(2, "0") +
        ":" +
        String(minutes).padStart(2, "0") +
        ":" +
        String(seconds).padStart(2, "0");

      setTimeLeft(formattedTime);
      totalSeconds--;
    }, 1000);
  }, []);

  return (
    <>
      <strong>{timeLeft}</strong>
    </>
  );
}
