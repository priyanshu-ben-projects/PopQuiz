import { Navigate, Link } from "react-router-dom";
import DisplayQuizCard from "./DisplayQuizCard.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

export default function MyQuizzes() {
  const [quizzes, setQuizzes] = useState(null);

  const getQuizzes = async () => {
    try {
      const response = await axios.get("/api/quiz/MyQuizzes", {
        withCredentials: true,
      });
      setQuizzes(response.data.formattedQuizzes);
    } catch (error) {
      console.error("Failed to delete Quiz:", error);
    }
  };

  const onDelete = async (id) => {
    try {
      const response = await axios.delete(
        `/api/quiz/${id}`,
        {},
        { withCredentials: true },
      );
      setQuizzes((prevQuizzes) =>
        prevQuizzes.filter((quiz) => (quiz.id || quiz._id) !== id),
      );
      console.log(response.data);
    } catch (err) {
      console.error("Battery Ki MCK 3x baar 170 ki speed se!!", err);
    }
  };

  useEffect(() => {
    getQuizzes();
  }, []);

  return (
    <>
      {quizzes && (
        <DisplayQuizCard onDelete={onDelete} quiz={quizzes}></DisplayQuizCard>
      )}
    </>
  );
}
