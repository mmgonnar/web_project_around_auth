import React from "react";

const Header = () => {
  return (
    <header className="header">
      <img
        src="/logo_aus.svg"
        alt="Logo Around the US"
        className="header__logo"
      />
      <div className="header__text-container">
        <p className="header__text">Logout</p>
        <img
          src="/public/icons/sign_out.svg"
          className="header__icon"
          alt="Sign out icon"
        />
      </div>
    </header>
  );
};

export default Header;
