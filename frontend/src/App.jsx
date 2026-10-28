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
import AuthContextProvider from "./context/AuthContextProvider";
import Profile from "./Pages/Profile.jsx";
import IsLoggedIn from "./utils/IsLoggedIn.jsx";

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<IsLoggedIn />}>
            <Route path="/quiz" element={<QuizPage />}></Route>
            <Route path="/result" element={<ResultPage />}></Route>
            <Route path="/assessment" element={<AssessmentForm />}></Route>
            <Route path="/dashboard" element={<Profile />}></Route>
          </Route>

          <Route path="/" element={<Home />}></Route>
          <Route path="/categories" element={<BrowseCategory />}></Route>
          <Route path="/about" element={<AboutPage />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Route>
        <Route path="/register" element={<RegisterUI />}></Route>
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
