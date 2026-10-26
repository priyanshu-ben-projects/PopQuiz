import "./App.css";
import {
  QuizPage,
  AssessmentForm,
  BrowseCategory,
  ResultPage,
  Home,
  Layout,
  AboutPage,
  RegisterUI,
} from "./index.js";
import { Routes, Route } from "react-router-dom";
import Login from "./Components/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/quiz" element={<QuizPage />}></Route>
          <Route path="/result" element={<ResultPage />}></Route>
          <Route path="/categories" element={<BrowseCategory />}></Route>
          <Route path="/assessment" element={<AssessmentForm />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/about" element={<AboutPage />}></Route>
        </Route>
        <Route path="/register" element={<RegisterUI />}></Route>
      </Routes>
    </>
  );
}

export default App;
