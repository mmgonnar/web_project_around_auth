import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { removeToken } from "../utils/token";

const Header = () => {
  const { setIsLoggedIn } = useContext(CurrentUserContext);
  const navigate = useNavigate(CurrentUserContext);

  const location = useLocation();

  function handleLogout() {
    removeToken;
    navigate("/signin");
    setIsLoggedIn(false);
  }

  const handleLogin = () => {
    if (location.pathname.includes("/signin")) {
      navigate("/signup");
    }
    if (location.pathname === "/signup") {
      navigate("/signin");
    }
  };

  return (
    <header className="header">
      <img
        src="/logo_aus.svg"
        alt="Logo Around the US"
        className="header__logo"
      />
      <div className="header__text-container">
        <button className="button header__text" onClick={handleLogin}>
          {location.pathname.includes("/signin") ? "Register" : "Login"}
        </button>
        {location.pathname.includes("/signin") &&
          location.pathname.includes("/signup") && (
            <button
              className="button header__icon"
              onClick={handleLogout}
            ></button>
          )}
      </div>
    </header>
  );
};

export default Header;
