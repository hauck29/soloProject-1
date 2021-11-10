import { useEffect } from "react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./feed.css";
import { getQuestions, removeQuestion } from "../../store/questions";
import { useHistory } from "react-router";

const Questions = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const questions = useSelector((state) => Object.values(state.question));
  useEffect(() => {
    dispatch(getQuestions());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(removeQuestion(id));
    history.push('/');
  };

  return (
    <div>
      <div className="questions">
        {questions?.map(({ id, ownerId, title, description }) => (
          <h3>
            <p>Question {id}</p>
            <p>Posted by user number {ownerId}</p>
            {title}
              <p>
                {description}
              </p>
              <div className='q-opts'>
                <button onClick={() => handleDelete(id)} type='submit' className='del-q-btn'>Delete Question</button>
                <button onClick={() => history.push('/editQuestion')} type='submit' className='del-q-btn' >Edit Question</button>
              </div>
          </h3>
        ))}
      </div>
    </div>
  );
};
export default Questions;
