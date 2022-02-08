import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./LoginForm.css";
import { useHistory } from "react-router";

function LoginFormPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const cancel = (e) => {
    e.preventDefault();
    history.push("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    //dispatch the thunk
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <>
      <div className='loginWrap'>
        <form onSubmit={handleSubmit}>
          <div className="login-message">
            
            <p>Please enter your information below to continue.</p>
          </div>
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <div className="inputs-div">
            <div className="user-email-div">
              <label className="login-titles">
                Username or Email:
                <input
                  className="login-labels"
                  type="text"
                  value={credential}
                  onChange={(e) => setCredential(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className="password-div">
              <label className="login-titles">
                Password:
                <input
                  className="login-labels"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>
            </div>
          </div>
          <div className="login-btn-div">
            <button className="login-btn" type="submit">
              Log In
            </button>
            <button
              onClick={() => {
                setCredential("Demo-lition");
                setPassword("password");
              }}
              className="demo-btn"
            >
              Demo User Login
            </button>
            <button className="cancel-btn" onClick={cancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginFormPage;
