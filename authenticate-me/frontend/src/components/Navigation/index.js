import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <>
        <NavLink className="signup-link" to="/signup">
          {/* Signup Link */}
          <img
            src="https://img.icons8.com/wired/64/000000/sign-up.png"
            alt=""
          />
        </NavLink>
        <NavLink className="login-link" to="/login">
          {/* Login Link */}
          <img
            src="https://img.icons8.com/external-bearicons-detailed-outline-bearicons/64/000000/external-login-call-to-action-bearicons-detailed-outline-bearicons-1.png"
            alt=""
          />
        </NavLink>
      </>
    );
  }

  return (
    <ul>
      <li>
        <section className="header">
          <div className="nav-head">
            <div className="navLinks">
              <h1>CuriousCat</h1>
              <p>Answering Life's Meaningless Questions</p>
              <NavLink className="home-link" exact to="/">
                {/* Home Link */}
                <img
                  src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/64/000000/external-house-hygiene-kiranshastry-lineal-kiranshastry.png"
                  alt=""
                />
              </NavLink>
              {isLoaded && sessionLinks}
              <div className="header-search-bar">
                <img
                  className="search-icon"
                  src="https://img.icons8.com/fluency-systems-regular/48/000000/search--v1.png"
                  alt=""
                />
                <input type="text" placeholder="Search CuriousCat" />
              </div>
              <div className="add-q-btn">
                <button className="ask-q-btn" type="submit">
                  Ask a Question
                </button>
              </div>
            </div>
          </div>
          <div className="banner-img">{/* Cat Banner */}</div>
        </section>
      </li>
    </ul>
  );
}

export default Navigation;
