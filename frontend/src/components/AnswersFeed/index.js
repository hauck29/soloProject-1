import React from "react";
import { useDispatch } from "react-redux";
import { removeAnswer } from "../../store/answers";
import { useHistory } from "react-router";

const Answers = ({ answer }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleDelete = (id) => {
    dispatch(removeAnswer(id));
    history.push("/");
  };

  return (
    <div>
      <div className="answers">
        <p>{answer.answer}</p>
        <button onClick={() => handleDelete(answer.id)}>Delete</button>
        <button>Edit</button>
      </div>
    </div>
  );
};
export default Answers;
