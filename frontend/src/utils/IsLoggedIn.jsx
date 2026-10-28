import AuthContext from "../context/AuthContext.js";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

const IsLoggedIn = () => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[#f8fafc] px-4">
        <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          {/* Loading Spinner */}
          <div className="relative mx-auto mb-6 flex h-16 w-16 items-center justify-center">
            <div className="absolute inset-0 rounded-full border-4 border-sky-100" />
            <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-sky-600" />

            <span className="text-xl font-bold text-sky-600">P</span>
          </div>

          {/* Loading Message */}
          <h2 className="text-lg font-semibold tracking-tight text-slate-900">
            Checking your session
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Please wait while we verify your authentication.
          </p>

          {/* Animated Progress Indicator */}
          <div className="mx-auto mt-6 h-1.5 w-32 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full w-1/2 animate-pulse rounded-full bg-sky-500" />
          </div>

          <p className="mt-4 text-xs font-medium tracking-wide text-slate-400">
            POPQUIZ · SKILL ASSESSMENT
          </p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default IsLoggedIn;
