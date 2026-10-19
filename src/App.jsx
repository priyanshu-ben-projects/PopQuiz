import "./App.css";
import { QuizPage, ResultPage, Home } from "./index.js";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/quiz" element={<QuizPage />}></Route>
        <Route path="/result" element={<ResultPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
