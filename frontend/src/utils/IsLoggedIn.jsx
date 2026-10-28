import AuthContext from "../context/AuthContext.js";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

const IsLoggedIn = () => {
  const { isAuthenticated, loading } = useContext(AuthContext);
  if (loading) {
    return <p>Checking authentication...</p>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default IsLoggedIn;
