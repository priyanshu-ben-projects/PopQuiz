import { useState } from "react";
import "./App.css";
import { QuestionCard, questions, Navbar, Footer, QuizPage } from "./index.js";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/quiz" element={<QuizPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
