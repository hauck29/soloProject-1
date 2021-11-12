import { csrfFetch } from "./csrf";

const LOAD_A_QUESTION = "answers/setQuestion";
const ADD_AN_ANSWER = "answers/addAnswer";
const EDIT_AN_ANSWER = "answers/editAnswer";
const REMOVE_AN_ANSWER = "answers/delete";

const getQuestion = (question) => {
  return {
    type: LOAD_A_QUESTION,
    payload: question,
  };
};

const addAnAnswer = (payload) => {
  return {
    type: ADD_AN_ANSWER,
    payload,
  };
};

const editAnAnswer = (payload) => {
  return {
    type: EDIT_AN_ANSWER,
    payload,
  };
};

const removeAnAnswer = (id) => {
  return {
    type: REMOVE_AN_ANSWER,
    payload: id,
  };
};

export const getQuestion = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/questions/${id}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(getQuestion(data));
    return data;
  }
};

export const addAnswer = (answer) => async (dispatch) => {
  const res = await csrfFetch("/api/questions/:id", {
    method: "POST",
    body: JSON.stringify(answer),
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(addAnAnswer(data.newQ));
  }
};

export const editAnswer = (answer) => async (dispatch) => {
  const res = await csrfFetch(`/api/questions/${question.id}`, {
    method: "PUT",
    body: JSON.stringify(answer),
  });
  if (res.ok) {
    const editedAnswer = await res.json();
    dispatch(editAnAnswer(editedAnswer.editA));
    return editedAnswer;
  }
};

export const removeAnswer = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/questions/${id}`, {
    method: "DELETE",
  });
  if (res.ok) {
    dispatch(removeAnAnswer(id));
  }
};

const answerReducer = (state = {}, action) => {
  let newState = {};
  switch (action.type) {
    case LOAD_A_QUESTION:
      action.payload((answer) => (newState[answer.id] = answer));
      return newState;
    case ADD_AN_ANSWER:
      newState = { ...state, [action.payload.id]: action.payload };
      return newState;
    case EDIT_AN_ANSWER:
      newState = { ...state, [action.payload.id]: action.payload };
      return newState;
    case REMOVE_AN_ANSWER:
      newState = { ...state };
      delete newState[action.payload];
      return newState;
    default:
      return state;
  }
};

export default answerReducer;
