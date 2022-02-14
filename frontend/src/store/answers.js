import { csrfFetch } from "./csrf";

// const SET_ANSWERS = 'answers/setAnswers'
const ADD_AN_ANSWER = "answers/addAnswer";
const EDIT_AN_ANSWER = "answers/editAnswer";
const REMOVE_AN_ANSWER = "answers/delete";

// const setAnswers = (payload) => {
//   return {
//     type: SET_ANSWERS,
//     payload,
//   };
// };

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

const getAnswers = () => async (dispatch) => {
  const res = await csrfFetch(`/api/answers`);
  if(res.ok){
    const answers = await res.json();
    dispatch(setAnswers(answers));
  };
};

const removeAnAnswer = (id) => {
  return {
    type: REMOVE_AN_ANSWER,
    payload: id,
  };
};

export const addAnswer = (payload) => async (dispatch) => {
  const { userId, questionId, answer } = payload;
  const res = await csrfFetch(`/api/answers/${questionId}`, {
    method: "POST",
    body: JSON.stringify({ answer, userId }),
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(addAnAnswer(data.newA));
  }
};

export const editAnswer = (answer) => async (dispatch) => {
  const res = await csrfFetch(`/api/answers/${answer.id}`, {
    method: "PUT",
    body: JSON.stringify(answer),
  });
  if (res.ok) {
    const editedAnswer = await res.json();
    dispatch(editAnAnswer(editedAnswer.editA));
    return editedAnswer;
  }
};

export const removeAnswer = (answer) => async (dispatch) => {
  const res = await csrfFetch(`/api/answers/${answer.id}`, {
    method: "DELETE",
  });
  if (res.ok) {
    dispatch(removeAnAnswer(answer));
  }
};

const answerReducer = (state = {}, action) => {
  let newState = {};
  switch (action.type) {
    // case SET_ANSWERS:
    //   action.payload.forEach((answer) => (newState[answer.id] = answer));
    //   return newState;
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
