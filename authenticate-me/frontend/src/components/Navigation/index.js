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
          Sign Up
        </NavLink>
        <NavLink className="login-link" to="/login">
          Log In
        </NavLink>
      </>
    );
  }

  return (
    <ul>
      <li>
        <section class="header">
          <h1>CuriousCat (a 'Quora' parody)</h1>
          <p>Answering Lifes Meaningless Questions</p>
          <div className='banner-img'>

          </div>
          <div className="navLinks">
            <NavLink className="home-link" exact to="/">
              Home
            </NavLink>
            {isLoaded && sessionLinks}
          </div>
        </section>
      </li>
    </ul>
  );
}

export default Navigation;
