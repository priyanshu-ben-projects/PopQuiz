import { Outlet } from "react-router-dom";
import { Navbar, Footer } from "../index.js";

export default function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
