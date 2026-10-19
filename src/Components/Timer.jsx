import { useEffect, useState } from "react";

export default function Timer({ hrs, min, sec }) {
  let totalSeconds = hrs * 3600 + min * 60 + sec;
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      if (totalSeconds <= 0) {
        console.log("00:00:00 - Time is up!");
        clearInterval(timer);
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
