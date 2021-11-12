import { useEffect } from "react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./feed.css";
import { getQuestions, removeQuestion } from "../../store/questions";
import { useHistory } from "react-router";
import FeedQuestion from "./feed-question";

const Questions = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const questions = useSelector((state) => Object.values(state.question));
  useEffect(() => {
    dispatch(getQuestions());
  }, [dispatch]);

  // const handleDelete = (id) => {
  //   dispatch(removeQuestion(id));
  //   history.push("/");
  // };

  return (
    <div>
      <div className="questions">
        {questions?.map((question) => (
          <FeedQuestion question={question} />
        ))}
      </div>
    </div>
  );
};
export default Questions;
