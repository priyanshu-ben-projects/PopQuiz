import { useNavigate, useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import QuizDetailsComponent from "./QuizDetailsComponent";
import axios from "axios";

export default function ShowQuizDetails() {
  const navigate = useNavigate();
  const location = useLocation();

  const quizId = location.state?.id;

  const [quizDetails, setQuizDetails] = useState({});

  const showQuiz = async () => {
    console.log("Fetching data for Quiz ID from state:", quizId);
    try {
      const response = await axios.get(`/api/quiz/${quizId}`);
      console.log(response.data);
      setQuizDetails(response.data);
    } catch (error) {
      console.log("Unable to Find Quiz :: ", error);
    }
  };

  useEffect(() => {
    if (quizId) {
      showQuiz();
    }
  }, [quizId]);

  return (
    <>
      <QuizDetailsComponent
        quiz={quizDetails}
        quizId={quizId}
      ></QuizDetailsComponent>
    </>
  );
}
