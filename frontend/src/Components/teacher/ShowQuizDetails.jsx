import { useNavigate, useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import QuizDetailsComponent from "./QuizDetailsComponent";

export default function ShowQuizDetails() {
  const navigate = useNavigate();
  const location = useLocation();

  // State se ID nikal rahe hain (fallback ke liye ek default ID bhi rakh sakte ho)
  const quizId = location.state?.id;

  const [quizDetails, setQuizDetails] = useState({
    title: "LOGIC LEAGUE",
    description:
      "In Mongoose, Model.findByIdAndDelete() issues a MongoDB findOneAndDelete() command...",
    category: "Information Technology",
    syllabus: "• Database Operations & Mongoose Schemas",
    totalQuestions: 10,
    pointsPerQuestion: 10,
    negativeMarks: 0.5,
    difficulty: "Hard",
    timerEnabled: true,
    duration: 30,
    scheduleEnabled: false,
    startDate: "2026-11-15",
    startTime: "10:00",
    endDate: "2026-11-15",
    endTime: "11:00",
    rules: "• Each question carries 10 marks.",
    instructions: "Make sure you have a stable internet connection.",
    maximumMarks: 100,
    status: "Draft",
  });

  useEffect(() => {
    if (quizId) {
      console.log("Fetching data for Quiz ID from state:", quizId);
      // Yahan apna Axios call laga lena:
      // axios.get(`/api/admin/quiz/${quizId}`)
      //   .then(res => setQuiz(res.data))
      //   .catch(err => console.error(err));
    }
  }, [quizId]);

  const isPublished = quizDetails.status === "Published";

  return (
    <>
      <QuizDetailsComponent quiz={quizDetails}></QuizDetailsComponent>
    </>
  );
}
