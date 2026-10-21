import "./App.css";
import { QuizPage, BrowseCategory, ResultPage, Home, Layout } from "./index.js";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/quiz" element={<QuizPage />}></Route>
          <Route path="/result" element={<ResultPage />}></Route>
          <Route path="/categories" element={<BrowseCategory />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
