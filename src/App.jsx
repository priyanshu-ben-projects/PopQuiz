import { useState } from "react";
import "./App.css";
import QuestionCard from "./Components/QuestionCard";
import questions from "./Questions";
function App() {
  return (
    <>
      <QuestionCard questions={questions}></QuestionCard>
    </>
  );
}

export default App;
