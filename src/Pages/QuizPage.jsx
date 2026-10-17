import questions from "../Questions";
import { QuestionCard, Navbar, Footer } from "../index";

function QuizPage() {
  return (
    <>
      <Navbar></Navbar>
      <QuestionCard questions={questions}></QuestionCard>
      <Footer></Footer>
    </>
  );
}

export default QuizPage;
