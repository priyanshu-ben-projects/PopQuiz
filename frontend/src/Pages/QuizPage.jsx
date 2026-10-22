import { useEffect, useState } from "react";
import { QuestionCard } from "../index";
import axios from "axios";
import { useLocation } from "react-router-dom";
import questions from "../Questions";

function QuizPage() {
  const [q, setq] = useState([]);
  const location = useLocation();

  useEffect(() => {
    axios
      .get("api/quiz", {
        params: location.state,
      })
      .then((Response) => {
        setq(Response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(q);
  return (
    <>
      <QuestionCard duration={720} questions={questions}></QuestionCard>
    </>
  );
}

export default QuizPage;
