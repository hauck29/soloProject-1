import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Questions from "./components/Feed";
import CreateQuestion from "./components/CreateQuestion";
import EditQuestion from "./components/EditQuestion";
import CreateAnswer from "./components/CreateAnswer";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/" exact>
            <Questions />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/newQuestion">
            <CreateQuestion />
          </Route>
          <Route path="/editQuestion">
            <EditQuestion />
          </Route>
          <Route path="/questions/:questionId/answer/new">
            <CreateAnswer />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
