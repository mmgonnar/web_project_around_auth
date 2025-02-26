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
        <a className="header__text" href="/">
          Dinamic Text
        </a>
        {/* <button className="button button_edit-avatar"></button> */}
      </div>
    </header>
  );
};

export default Header;
