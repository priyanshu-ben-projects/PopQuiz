import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext.js";

export default function AssessmentForm() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    category: "",
    duration: 300,
    questionCount: 10,
  });

  useEffect(() => {
    axios
      .get("/api/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //  axios.post("/api/assessment", formData);
    navigate("/quiz", { state: formData });
  };

  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-white rounded-lg border border-gray-200 shadow-sm font-sans">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="border-b border-gray-100 pb-3 mb-5">
          <h2 className="text-xl font-semibold text-gray-900 tracking-tight">
            Start Assessment
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Fill in details to begin your test session.
          </p>
        </div>

        {/* Username Field */}
        <div className="flex flex-col space-y-1.5">
          <label
            htmlFor="username"
            className="text-xs font-semibold text-gray-600 uppercase tracking-wider"
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            value={formData.username}
            name="username"
            onChange={handleChange}
            placeholder="e.g. janesmith"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900 placeholder-gray-400 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
          />
        </div>

        {/* Email Field */}
        <div className="flex flex-col space-y-1.5">
          <label
            htmlFor="email"
            className="text-xs font-semibold text-gray-600 uppercase tracking-wider"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            name="email"
            placeholder="jane.smith@example.com"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900 placeholder-gray-400 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
          />
        </div>

        {/* Grid layout for select options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          {/* Question Count */}
          <div className="flex flex-col space-y-1.5">
            <label
              htmlFor="questionCount"
              className="text-xs font-semibold text-gray-600 uppercase tracking-wider"
            >
              Questions
            </label>
            <select
              id="questionCount"
              value={formData.questionCount}
              onChange={handleChange}
              name="questionCount"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent cursor-pointer transition"
            >
              <option value={10}>10 Questions</option>
              <option value={20}>20 Questions</option>
              <option value={30}>30 Questions</option>
              <option value={50}>50 Questions</option>
            </select>
          </div>

          {/* Duration */}
          <div className="flex flex-col space-y-1.5">
            <label
              htmlFor="duration"
              className="text-xs font-semibold text-gray-600 uppercase tracking-wider"
            >
              Duration
            </label>
            <select
              id="duration"
              value={formData.duration}
              onChange={handleChange}
              name="duration"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent cursor-pointer transition"
            >
              <option value={300}>5 Minutes</option>
              <option value={720}>12 Minutes</option>
              <option value={1200}>20 Minutes</option>
              <option value={1800}>30 Minutes</option>
            </select>
          </div>
        </div>

        {/* Category Field */}
        <div className="flex flex-col space-y-1.5">
          <label
            htmlFor="category"
            className="text-xs font-semibold text-gray-600 uppercase tracking-wider"
          >
            Category
          </label>
          <select
            id="category"
            value={FormData.category}
            onChange={handleChange}
            required
            name="category"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent cursor-pointer transition"
          >
            <option value="">Select Category</option>
            {categories.map((data) => {
              return (
                <option key={data._id} value={data.category}>
                  {data.category}
                </option>
              );
            })}
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-3 pt-5 border-t border-gray-100 mt-6">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-4 py-2 border border-gray-300 rounded-full text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-400 transition"
          >
            Back
          </button>

          <button
            type="submit"
            className="px-5 py-2 rounded-full text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-600 shadow-sm transition"
          >
            Start Assessment
          </button>
        </div>
      </form>
    </div>
  );
}
