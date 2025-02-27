//import { useContext } from "react";
import { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
//import AppContext from "../contexts/AppContext";
//import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function ProtectedRoute({
  children,
  isLoggedIn,
  setIsLoggedIn,
}) {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      setIsLoggedIn(true);
    } else {
      navigate("/signin");
    }
  }, []);

  // const location = useLocation();
  // const from = location.state?.from || "/";
  // const { isLoggedIn } = useContext(CurrentUserContext);

  // if (anonymous && isLoggedIn) {
  //   return <Navigate to={from} />;
  // }
  // if (!anonymous && !isLoggedIn) {
  //   return <Navigate to="/signup" state={{ from: location }} />;
  // }
  return children;
}
