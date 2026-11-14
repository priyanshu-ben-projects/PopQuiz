import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import EditQuizForm from "./EditQuizForm";

export default function EditQuiz() {
  const navigate = useNavigate();
  const location = useLocation();

  const quizId = location.state?.id;

  const [formData, setFormData] = useState(undefined);

  const showQuiz = async () => {
    try {
      const response = await axios.get(`/api/quiz/${quizId}`);

      setFormData(response.data);
    } catch (error) {
      console.log("Unable to Find Quiz :: ", error);
    }
  };

  useEffect(() => {
    if (quizId) {
      showQuiz();
    }
  }, [quizId]);

  // Handle generic input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const patchRequest = async () => {
    try {
      const response = await axios.patch(`/api/quiz/edit/${quizId}`, formData, {
        withCredentials: true,
      });
    } catch (error) {
      console.log("Unable to Update!!", error);
    }
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    patchRequest();
    console.log("Updated Quiz Data:");
  };

  return (
    <>
      {formData && (
        <EditQuizForm
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          quizId={quizId}
        ></EditQuizForm>
      )}
    </>
  );
}
