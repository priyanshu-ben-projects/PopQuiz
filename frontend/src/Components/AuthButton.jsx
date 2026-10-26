import { useEffect, useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";

import axios from "axios";
export default function AuthButton() {
  const navigate = useNavigate();

  const {
    isAuthenticated,
    setIsAuthenticated,
    loading,
    setLoading,
    user,
    setUser,
  } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `api/user/logout`,
        {},
        {
          withCredentials: true,
        },
      );

      setIsAuthenticated(false);

      setUser(null);
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  if (loading) {
    return (
      <button
        disabled
        className="rounded-lg bg-slate-100 px-4 py-2 text-sm text-slate-400"
      >
        Loading...
      </button>
    );
  }

  if (isAuthenticated) {
    return (
      <button
        onClick={handleLogout}
        className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
      >
        User : {user.username}
      </button>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Link
        to="/login"
        className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
      >
        Login
      </Link>

      <Link
        to="/register"
        className="rounded-lg bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-700"
      >
        Sign Up
      </Link>
    </div>
  );
}
