import { useEffect } from "react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import "./feed.css";
import { getQuestions, removeQuestion } from "../../store/questions";
import { useHistory } from "react-router";
import { setAnswers } from "../../store/answers";
// import FeedQuestion from "./Feed/feed-question";

const Answers = (question) => {
  const dispatch = useDispatch();
  const history = useHistory();
//   const answers = useSelector((state) => Object.values(state.answer));
  useEffect(() => {
    dispatch(setAnswers());
  }, [dispatch]);

  // const handleDelete = (id) => {
  //   dispatch(removeQuestion(id));
  //   history.push("/");
  // };

  return (
    <div>
      <div className="answers">
        {/* {answers?.map((answer) => (
          <Answers answer={answer} />
          ))} */}
          <p>This is where the answers should render</p>
      </div>
    </div>
  );
};
export default Answers;
