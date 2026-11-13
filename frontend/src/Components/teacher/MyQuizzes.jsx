import { Navigate, Link } from "react-router-dom";
import DisplayQuizList from "./DisplayQuizList.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

export default function MyQuizzes() {
  const [quizzes, setQuizzes] = useState(null);
  const getQuizzes = async () => {
    const response = await axios.get("/api/quiz/MyQuizzes", {
      withCredentials: true,
    });
    setQuizzes(response.data.formattedQuizzes);
  };

  useEffect(() => {
    getQuizzes();
  }, []);

  return <>{quizzes && <DisplayQuizList quiz={quizzes}></DisplayQuizList>}</>;
}
