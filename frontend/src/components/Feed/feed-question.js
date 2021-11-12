import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./feed.css";
import { removeQuestion, editQuestion } from "../../store/questions";
import { useHistory } from "react-router";


const FeedQuestion = ({ question }) => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [toEditQuestion, setToEditQuestion] = useState(false);
  const [title, setTitle] = useState(question.title);
  const [description, setDescription] = useState(question.description);

  const cancel = (e) => {
    e.preventDefault();
    setToEditQuestion(!toEditQuestion);
  };

  const handleDelete = (id) => {
    dispatch(removeQuestion(id));
    history.push("/");
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const payload = {
      id: question.id,
      title,
      description,
    };
    dispatch(editQuestion(payload));
    setToEditQuestion(!toEditQuestion);
  };

  if (sessionUser) {
    return (
      <div className="feed-div">
        <div className="q-box">
          <h3>{question.title}</h3>
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
          <div className="q-id">
            {/* <p>Posted by {question.User.username}</p> */}
          </div>
          {toEditQuestion && (
            <form onSubmit={handleEditSubmit}>
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
              <button className="cancel-btn" onClick={cancel}>
                Cancel
              </button>
            </form>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className="feed-div">
        <div className="q-box">
          <h3>{question.title}</h3>
          <p>{question.description}</p>
          <div className="q-opts"></div>
          <div className="q-id">
            <p>Posted by {question.User.username}</p>
          </div>
        </div>
      </div>
    );
  }
};

export default FeedQuestion;
