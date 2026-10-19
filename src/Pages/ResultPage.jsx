import { useLocation, useNavigate } from "react-router-dom";

export default function ResultPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  console.log(state);
  const {
    score,
    totalQuestions,
    answeredQuestions,
    questions,
    correctAnswers,
  } = state;

  if (!state) {
    return (
      <>
        <h1>No Quiz Results found.</h1>
      </>
    );
  } else {
    return (
      <>
        <h1>"This is Your Score" : {correctAnswers}</h1>
      </>
    );
  }
}
