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
import AdminDashboard from "./Pages/AdminDashboard.jsx";
import MyQuizzes from "./Components/teacher/MyQuizzes.jsx";
import { NavbarSimple } from "./Components/teacher/NavbarSimple";
import CreateQuiz from "./pages/CreateQuiz.jsx";
function App() {
  return (
    <AuthContextProvider>
      <Routes>
        {/* Main Application Routes */}
        <Route path="/" element={<Layout />}>
          <Route element={<IsLoggedIn />}>
            <Route path="result" element={<ResultPage />} />
            <Route path="assessment" element={<AssessmentForm />} />
            <Route path="quiz" element={<QuizPage />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          <Route index element={<Home />} />
          <Route path="categories" element={<BrowseCategory />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="login" element={<Login />} />
        </Route>

        <Route path="/register" element={<RegisterUI />} />

        {/* Protected Admin Routes */}
        <Route element={<IsLoggedIn />}>
          {/* Main Admin Dashboard */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          {/* Teacher Layout & Sub-routes */}
          <Route path="/admin" element={<NavbarSimple />}>
            <Route path="myquizzes" element={<MyQuizzes />} />
            <Route path="createquizz" element={<CreateQuiz />} />
          </Route>
        </Route>
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
