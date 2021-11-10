import { useEffect } from "react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./feed.css";
import { getQuestions, removeQuestion, editQuestion } from "../../store/questions";
import { useHistory } from "react-router";


const FeedQuestion = ({question}) => {

    const dispatch = useDispatch();
    const history = useHistory();
    const [toEditQuestion, setToEditQuestion] = useState(false);
    const [title, setTitle] = useState(question.title);
    const [description, setDescription] = useState(question.description);

    const handleDelete = (id) => {
        dispatch(removeQuestion(id));
        history.push('/');
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            id: question.id,
            title,
            description
        };
        dispatch(editQuestion(payload));
        setToEditQuestion(!toEditQuestion);
    };



    return (
        <h3>
        <p>Question {question.id}</p>
        <p>Posted by user number {question.ownerId}</p>
        {question.title}
          <p>
            {question.description}
          </p>
          <div className='q-opts'>
            <button onClick={() => handleDelete(question.id)} type='submit' className='del-q-btn'>Delete Question</button>
            <button onClick={() => setToEditQuestion(!toEditQuestion)} className='del-q-btn' >Edit Question</button>
          </div>
          {toEditQuestion && (
              <form onSubmit={handleSubmit}>
                  <input
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    placeholder='Question Title'
                />
                <input
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    placeholder='What is your question?'
                />
                <button className='question-sumbit-btn' type='submit'>
                    Update Question
                </button>
              </form>
          )}
      </h3>
    )
}

export default FeedQuestion;
