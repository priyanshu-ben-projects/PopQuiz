import {
  useContext,
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
} from "react";
import { createPortal } from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { LogOut, UserRound, ChevronDown, LoaderCircle } from "lucide-react";
import axios from "axios";

export default function AuthButton({ collapsed = false }) {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({
    top: 0,
    left: 0,
  });

  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const { isAuthenticated, setIsAuthenticated, loading, user, setUser } =
    useContext(AuthContext);

  // Calculate menu position above the button
  const updateMenuPosition = () => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();

    const menuWidth = 208;
    const menuHeight = 110;
    const gap = 10;

    let left;

    if (collapsed) {
      // Collapsed sidebar: open to the right
      left = rect.right + gap;
    } else {
      // Expanded layout: align menu with button's left edge
      left = rect.left;
    }

    // Prevent horizontal overflow
    left = Math.max(8, Math.min(left, window.innerWidth - menuWidth - 8));

    // Always open above the button
    const top = Math.max(8, rect.top - menuHeight - gap);

    setMenuPosition({ top, left });
  };

  useLayoutEffect(() => {
    if (menuOpen) {
      updateMenuPosition();
    }
  }, [menuOpen, collapsed]);

  // Close on outside click and reposition on scroll/resize
  useEffect(() => {
    if (!menuOpen) return;

    const handleOutsideClick = (event) => {
      if (
        menuRef.current?.contains(event.target) ||
        buttonRef.current?.contains(event.target)
      ) {
        return;
      }

      setMenuOpen(false);
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    const handlePositionUpdate = () => {
      updateMenuPosition();
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);
    window.addEventListener("resize", handlePositionUpdate);
    window.addEventListener("scroll", handlePositionUpdate, true);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
      window.removeEventListener("resize", handlePositionUpdate);
      window.removeEventListener("scroll", handlePositionUpdate, true);
    };
  }, [menuOpen, collapsed]);

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
        className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-400"
      >
        <LoaderCircle size={18} className="animate-spin" />
        {!collapsed && <span>Loading</span>}
      </button>
    );
  }

  if (isAuthenticated) {
    return (
      <div className="relative flex justify-center items-center w-full">
        <button
          ref={buttonRef}
          onClick={() => setMenuOpen((prev) => !prev)}
          className={`flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-2 transition hover:border-sky-300 hover:bg-sky-50 ${
            collapsed ? "justify-center" : "w-full px-3"
          }`}
          aria-expanded={menuOpen}
          aria-haspopup="menu"
          aria-label="Open profile menu"
          title={collapsed ? user?.username || "My Account" : undefined}
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-700">
            <UserRound size={19} />
          </div>

          {!collapsed && (
            <>
              <span className="min-w-0 flex-1 truncate text-left text-sm font-semibold text-slate-700">
                {user?.username || user?.name || "My Account"}
              </span>

              <ChevronDown
                size={16}
                className={`shrink-0 text-slate-500 transition-transform ${
                  menuOpen ? "rotate-180" : ""
                }`}
              />
            </>
          )}
        </button>

        {menuOpen &&
          createPortal(
            <div
              ref={menuRef}
              role="menu"
              style={{
                position: "fixed",
                top: menuPosition.top,
                left: menuPosition.left,
                zIndex: 99999,
              }}
              className="w-52 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl"
            >
              <Link
                to="/profile"
                role="menuitem"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-sky-50 hover:text-sky-700"
              >
                <UserRound size={17} />
                My Profile
              </Link>

              <div className="my-1 border-t border-slate-100" />

              <button
                role="menuitem"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
              >
                <LogOut size={17} />
                Logout
              </button>
            </div>,
            document.body,
          )}
      </div>
    );
  }

  return (
    <div
      className={`flex ${
        collapsed ? "justify-center" : "flex-col gap-2 sm:flex-row sm:gap-3"
      }`}
    >
      <Link
        to="/login"
        className="rounded-xl px-4 py-2.5 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
      >
        Login
      </Link>

      <Link
        to="/register"
        className="rounded-xl bg-sky-600 px-4 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 hover:shadow-md"
      >
        Sign Up
      </Link>
    </div>
  );
}
