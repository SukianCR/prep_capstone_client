import { Navigate, Outlet } from "react-router-dom";

export default function Protected() {
  const sessionToken = window.sessionStorage.getItem("Token");

  if (!sessionToken) {
    return <Navigate to="/Login" />;
  }

  return <Outlet />;
}
