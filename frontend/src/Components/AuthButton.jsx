import { useContext, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { LogOut, UserRound, ChevronDown, LoaderCircle } from "lucide-react";
import axios from "axios";

export default function AuthButton() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const { isAuthenticated, setIsAuthenticated, loading, user, setUser } =
    useContext(AuthContext);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("/api/user/logout", {}, { withCredentials: true });

      setIsAuthenticated(false);
      setUser(null);
      setMenuOpen(false);
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  if (loading) {
    return (
      <button
        disabled
        className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-400"
      >
        <LoaderCircle size={16} className="animate-spin" />
        Loading
      </button>
    );
  }

  if (isAuthenticated) {
    return (
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 transition hover:border-sky-300 hover:bg-sky-50"
          aria-expanded={menuOpen}
          aria-label="Open profile menu"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-100 text-sky-700">
            <UserRound size={18} />
          </div>

          <span className="hidden max-w-28 truncate text-sm font-semibold text-slate-700 sm:block">
            {user?.username || user?.name || "My Account"}
          </span>

          <ChevronDown
            size={16}
            className={`text-slate-500 transition-transform ${
              menuOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {menuOpen && (
          <div className="absolute right-0 z-50 mt-2 w-52 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg">
            <Link
              to="/profile"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-sky-50 hover:text-sky-700"
            >
              <UserRound size={17} />
              My Profile
            </Link>

            <div className="my-1 border-t border-slate-100" />

            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
            >
              <LogOut size={17} />
              Logout
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <Link
        to="/login"
        className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
      >
        Login
      </Link>

      <Link
        to="/register"
        className="rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 hover:shadow-md"
      >
        Sign Up
      </Link>
    </div>
  );
}
