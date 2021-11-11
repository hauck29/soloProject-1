import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./feed.css";
import { removeQuestion, editQuestion } from "../../store/questions";
import { useHistory } from "react-router";

const FeedQuestion = ({ question }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [toEditQuestion, setToEditQuestion] = useState(false);
  const [title, setTitle] = useState(question.title);
  const [description, setDescription] = useState(question.description);
  const [userName, setUserName] = useState(question.userName);

  const handleDelete = (id) => {
    dispatch(removeQuestion(id));
    history.push("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      userName: userName,
      id: question.id,
      title,
      description,
    };
    dispatch(editQuestion(payload));
    setToEditQuestion(!toEditQuestion);
  };

  return (
    <div className='feed-div' >
      <h3>
        <p>Question {question.id}</p>
        {/* <p>Posted by {question.userName}</p> */}
        {question.title}
        <p>{question.description}</p>
        <div className="q-opts">
          <button
            onClick={() => handleDelete(question.id)}
            type="submit"
            className="del-q-btn"
          >
            Delete Question
          </button>
          <button
            onClick={() => setToEditQuestion(!toEditQuestion)}
            className="del-q-btn"
          >
            Edit Question
          </button>
        </div>
        {toEditQuestion && (
          <form onSubmit={handleSubmit}>
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              placeholder="Question Title"
            />
            <input
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              placeholder="What is your question?"
            />
            <button className="question-sumbit-btn" type="submit">
              Update Question
            </button>
          </form>
        )}
      </h3>
    </div>
  );
};

export default FeedQuestion;
