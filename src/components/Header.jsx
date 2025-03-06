import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { removeToken } from "../utils/token";
import NavbarMobile from "./NavbarMobile";
import NavbarDesktop from "./NavBarDesktop";
import burgerMenu from "../../public/icons/hamburger.svg";
import closeMenu from "../../public/icons/close_button.svg";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setIsLoggedIn, setCurrentUser, userEmail, setUserEmail } =
    useContext(CurrentUserContext);
  const navigate = useNavigate(CurrentUserContext);

  const location = useLocation();

  function handleLogout({ token }) {
    setIsLoggedIn(false);
    navigate("/signin");
    removeToken();
    setCurrentUser({});
    setUserEmail("");
    isOpen(false);
  }

  const handleLogin = () => {
    if (location.pathname.includes("/signin")) {
      navigate("/signup");
    }
    if (location.pathname === "/signup") {
      navigate("/signin");
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(false);
    setIsMenuOpen(!isMenuOpen);
  };

  // const closeMenu = () => {
  //   setIsMenuOpen(false);
  // };

  return (
    <header className="header">
      <NavbarMobile
        isOpen={isMenuOpen}
        onClose={toggleMenu}
        userEmail={userEmail}
        onClick={isMenuOpen}
      ></NavbarMobile>

      <div className="header__container">
        <img
          src="/logo_aus.svg"
          alt="Logo Around the US"
          className="header__logo"
        />
        <div className="header__text-container">
          {location.pathname === "/" && !isMenuOpen && (
            <>
              <button
                //src={toggleMenu(false) ? burgerMenu : closeMenu}
                className="button navbar__mobile-button"
                onClick={toggleMenu}
                // onClick={toggleMenu(false) ? burgerMenu : closeMenu}
              ></button>
            </>
          )}

          {location.pathname !== "/" && (
            <button className="button header__text" onClick={handleLogin}>
              {location.pathname.includes("/signin") ? "Register" : "Login"}
            </button>
          )}
          <NavbarDesktop></NavbarDesktop>
        </div>

        {/* {location.pathname === "/" && (
          <>
            <p className="header__text header__text-email">{userEmail}</p>
            <button className="button header__text " onClick={handleLogout}>
              Logout<span>Logout</span>
            </button>
          </>
        )} */}

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
