import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { addAnswer } from "../../store/answers";
import "./CreateAnswer.css";

const CreateAnswer = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const { questionId } = useParams();

  // const [questionId, setQuestionId] = useState('');
  const [answer, setAnswer] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);

  // const user = useSelector(state => state.session.user);

  const cancel = (e) => {
    e.preventDefault();
    history.push("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answer.length < 1) {
      setErrors(["You must enter in a value to post it as an answer!"]);
      return errors;
    }
    const payload = {
      userId: sessionUser.id,
      questionId,
      answer,
    };
    dispatch(addAnswer(payload));

    setTimeout(() => {
      history.push("/");
    }, 250);
  };

  return (
    <div className="add-answer">
      <h3>Add An Answer</h3>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setAnswer(e.target.value)}
          value={answer}
          placeholder="Enter your answer here"
        />
        <div className="add-a-btns">
          <button className="answer-sumbit-btn" type="submit">
            Add Answer
          </button>
          <button className="cancel-btn" onClick={cancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
export default CreateAnswer;
