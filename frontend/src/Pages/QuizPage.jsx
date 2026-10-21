import questions from "../Questions";
import { QuestionCard } from "../index";

function QuizPage() {
  return (
    <>
      <QuestionCard questions={questions}></QuestionCard>
    </>
  );
}

export default QuizPage;
