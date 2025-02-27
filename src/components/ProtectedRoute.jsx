import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AppContext from "../contexts/AppContext";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function ProtectedRoute(children, anonymous = false) {
  const location = useLocation();
  const from = location.state?.from || "/";
  const { isLoggedIn } = useContext(CurrentUserContext);

  if (anonymous && isLoggedIn) {
    return <Navigate to={from} />;
  }
  if (!anonymous && !isLoggedIn) {
    return <Navigate to="/signup" state={{ from: location }} />;
  }
  return children;
}
