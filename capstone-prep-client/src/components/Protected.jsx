import { Navigate, Outlet } from "react-router-dom";

export default function Protected() {
  const sessionToken = window.sessionStorage.getItem("Token");
  //   console.log("Protected", token);

  if (!sessionToken) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}
