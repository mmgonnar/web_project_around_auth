import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { removeToken } from "../utils/token";

const NavbarMobile = ({ isOpen, onClose, toggleMenu, isMenuOpen }) => {
  //const [isOpen, setIsOpen] = useState(false);
  const { setIsLoggedIn, setCurrentUser, userEmail, setUserEmail } =
    useContext(CurrentUserContext);
  const navigate = useNavigate(CurrentUserContext);

  const location = useLocation();

  function handleLogout() {
    onClose(false);
    setIsLoggedIn(false);
    navigate("/signin");
    removeToken();
    setCurrentUser({});
    setUserEmail("");
  }

  // const handleLogin = () => {
  //   if (location.pathname.includes("/signin")) {
  //     navigate("/signup");
  //   }
  //   if (location.pathname === "/signup") {
  //     navigate("/signin");
  //   }
  // };
  return (
    <>
      <div className={`navbar-mobile ${isOpen ? "navbar_open" : ""}`}>
        <div className="navbar__container">
          <button
            className="button button_close navbar__button-close"
            onClick={() => {
              onClose();
            }}
          ></button>
          <div className="navbar__links">
            <div className="navbar__link">
              {location.pathname === "/" && (
                <>
                  {/* <p className="header__text header__text-email">{userEmail}</p> */}
                  {/* <button
                    className="button header__text "
                    onClick={handleLogout}
                  >
                    Logout
                  </button> */}
                </>
              )}
            </div>
            {/* <li className="navbar__link"></li> */}
            {userEmail && (
              <p className="header__text header__text-email">{userEmail}</p>
            )}

            {location.pathname === "/" && !isMenuOpen && (
              <>
                <button
                  className="button header__text "
                  onClick={handleLogout}
                  onClose={toggleMenu}
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarMobile;
