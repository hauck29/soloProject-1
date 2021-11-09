import { useEffect } from "react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./feed.css";
import { getQuestions } from "../../store/questions";

const Questions = () => {
  const dispatch = useDispatch();
  const questions = useSelector((state) => Object.values(state.question));
  useEffect(() => {
    dispatch(getQuestions());
  }, [dispatch]);

  return (
    <div>
      <div className="questions">
        {questions?.map(({ id, ownerId, title, description }) => (
          <h3>
            {title}
            <p>{description}</p>
          </h3>
        ))}
      </div>
    </div>
  );
};
export default Questions;
