import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeAnswer } from "../../store/answers";
import { useHistory } from "react-router";
import { editAnswer } from "../../store/answers";

const Answers = ({ answer }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [editAnswer, setEditAnswer] = useState(false);


  const handleDelete = (answer) => {
    dispatch(removeAnswer(answer));
    history.push("/");
  };

  const handleEditASubmit = (e) => {
    // e.preventDefault();
    const payload = {
      id: answer.id
    };
    dispatch(editAnswer(payload));
    setEditAnswer(!editAnswer);
  };

  return (
    <div>
      <div className="answers">
        <p>{answer.answer}</p>
        <button onClick={() => handleDelete(answer)}>Delete</button>
        <button onClick={() => handleEditASubmit(answer)}>Edit</button>
      </div>
    </div>
  );
};
export default Answers;
