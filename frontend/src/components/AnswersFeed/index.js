import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeAnswer } from "../../store/answers";
import { useHistory } from "react-router";
import "./AnswersFeed.css";

const Answers = ({ answer }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [editAnswer, setEditAnswer] = useState(false);

  const handleAnsDelete = (answer) => {
    dispatch(removeAnswer(answer));
    history.push("/");
  };

  //removed edit answer functionality for censorship reasons
  // const handleEditASubmit = (e) => {
  //   e.preventDefault();
  //   const payload = {
  //     answer,
  //   };
  //   dispatch(editAnswer(payload));
  //   setEditAnswer(!editAnswer);
  // };

  return (
    <div>
      <div className="answers">
        <div className="answerText">
          <p>{answer.answer}</p>
        </div>
        <div className="answerBtns">
          <button onClick={() => handleAnsDelete(answer)}>Delete</button>
        </div>
      </div>
    </div>
  );
};
export default Answers;
