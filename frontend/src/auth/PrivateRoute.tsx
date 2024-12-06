import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return isLoggedIn ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
