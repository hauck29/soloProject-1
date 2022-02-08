import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useHistory } from "react-router-dom";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  const history = useHistory();
  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <div className="logged-in-opts">
          <ProfileButton user={sessionUser} />
          <div className="add-q-btn">
            <button
              onClick={() => history.push("/newQuestion")}
              type="submit"
              className="ask-a-q-btn"
            >
              Ask a Question
            </button>
          </div>
        </div>
      </>
    );
  } else {
    sessionLinks = (
      <>
        <NavLink className="signup-link" to="/signup">
          {/* Signup Link */}
          <div className="home-link-cont">
            <img
              src="https://img.icons8.com/wired/64/000000/sign-up.png"
              alt=""
            />
            <p>Join</p>
          </div>
        </NavLink>
        <NavLink className="login-link" to="/login">
          {/* Login Link */}
          <div className="home-link-cont">
            <img
              src="https://img.icons8.com/external-bearicons-detailed-outline-bearicons/64/000000/external-login-call-to-action-bearicons-detailed-outline-bearicons-1.png"
              alt=""
            />
            <p>Log In</p>
          </div>
        </NavLink>
      </>
    );
  }

  return (
    <ul>
      <li>
        {/* <div className="banner-img"> */}
          {/* Cat Banner */}

          <div className="head-sec">
            <div className="links-left">
              <NavLink className="home-link" exact to="/">
                <div className="home-link-cont">
                  <img
                    src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/64/000000/external-house-hygiene-kiranshastry-lineal-kiranshastry.png"
                    alt=""
                  />
                  <p>Home</p>
                </div>
              </NavLink>
              {isLoaded && sessionLinks}
            </div>
            <div className="links-right">
              {/* render this searchbar after search component and functionality is up */}
              {/* <div className="header-search-bar">
                    <img
                      className="search-icon"
                      src="https://img.icons8.com/fluency-systems-regular/48/000000/search--v1.png"
                      alt=""
                    />
                    <input type="text" placeholder="Search CuriousCat" />
                  </div> */}
            </div>
          </div>
        {/* </div> */}
        <section className="header">
          <div className="nav-head">
            <div className="navLinks">
              {/* <div className="header-pic">
                <img src="https://www.seekpng.com/png/detail/15-150625_kittens-clipart-blue-cat-blue-cat-cartoon-pinart.png" />
              </div> */}
              <div className="header-title">
                <p>welcome to</p>
                <h1>curiousCat</h1>
                <p>asking and answering life's parenting questions</p>
              </div>
            </div>
          </div>
        </section>
      </li>
    </ul>
  );
}

export default Navigation;
