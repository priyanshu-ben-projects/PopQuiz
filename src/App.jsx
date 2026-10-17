import { useState } from "react";
import "./App.css";
import { QuestionCard, questions, Navbar, Footer } from "./index.js";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <QuestionCard questions={questions}></QuestionCard>
      <Footer></Footer>
    </>
  );
}

export default App;
