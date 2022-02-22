// Removed edit answer functionality for censorship reasons


import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { editAnswer } from "../../store/answers";

const EditAnswer = () => {
  const [answer, setAnswer] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  const cancel = (e) => {
    e.preventDefault();
    history.push("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      answer,
    };
    dispatch(editAnswer(payload));

    history.push("/");
  };

  return (
    <div className="add-question">
      <h3>Edit Answer</h3>
      <form onSubmit={handleSubmit} className="add-question">

        <input
          onChange={(e) => setAnswer(e.target.value)}
          value={answer}
          placeholder="What is your answer?"
        />
        <button className="question-sumbit-btn" type="submit">
          Update Answer
        </button>
        <button className="cancel-btn" onClick={cancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};
export default EditAnswer;
