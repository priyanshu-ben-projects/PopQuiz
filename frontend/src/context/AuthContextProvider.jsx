import AuthContext from "./AuthContext";
import { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";

export default function AuthContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [resultLoading, setResultLoading] = useState(false);

  const refreshResult = useCallback(() => {
    const fetchResult = async () => {
      if (loading || !user) return;
      setResultLoading(true);
      try {
        const response = await axios.get("/api/quiz/result", {
          withCredentials: true,
        });
        const { score, answeredQuestions, questions, correctAnswers } =
          response.data;

        setResult({
          score,
          answeredQuestions: answeredQuestions || {},
          questions: questions || [],
          correctAnswers: correctAnswers || 0,
        });
      } catch (error) {
        console.error("Failed to fetch quiz results", error);
      } finally {
        setResultLoading(false);
      }
    };
    fetchResult();
  }, [user]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`/api/user/auth`, {
          withCredentials: true,
        });
        setIsAuthenticated(response.data.isAuthenticated);
        setUser(response.data.user);
      } catch (err) {
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (!loading && user) {
      refreshResult();
    }
  }, [loading, user, refreshResult]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        setLoading,
        loading,
        user,
        result,
        resultLoading,
        refreshResult,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
