import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <>
      <div className="register">
        <div className="form">
          <h2 className="form__title">Register your account</h2>
          <form className="form__set">
            <input
              type="text"
              name="username"
              id="username"
              className="form__input form__input-username"
              placeholder="Username"
              minLength="2"
              maxLength="40"
              required
              autoComplete="on"
            />
            <input
              type="password"
              name="password"
              id="password"
              className="form__input form__input-password"
              placeholder="Password"
              minLength="2"
              maxLength="40"
              required
              autoComplete="on"
            />
            <div className="form__container">
              <button className="button form__button" type="submit">
                SIGN UP
              </button>
              <div className="form__text-container">
                <p className="form__text">Already a member?</p>
                <Link to="/register" className="form__link">
                  Login here
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
