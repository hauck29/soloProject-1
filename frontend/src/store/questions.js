import { csrfFetch } from "./csrf";

const SET_QUESTIONS = "questions/setQuestions";
const ADD_A_QUESTION = "questions/addQuestion";
const EDIT_A_QUESTION = "questions/editQuestion";
const REMOVE_A_QUESTION = "questions/delete";

const setQuestions = (payload) => {
  return {
    type: SET_QUESTIONS,
    payload,
  };
};

const addAQuestion = (payload) => {
  return {
    type: ADD_A_QUESTION,
    payload,
  };
};

const editAQuestion = (payload) => {
  return {
    type: EDIT_A_QUESTION,
    payload,
  };
};

const removeAQuestion = (id) => {
  return {
    type: REMOVE_A_QUESTION,
    payload: id,
  };
};

export const getQuestions = () => async (dispatch) => {
  const res = await csrfFetch("/api/questions");
  if (res.ok) {
    const questions = await res.json();
    dispatch(setQuestions(questions));
  }
};

export const addQuestion = (question) => async (dispatch) => {
  const res = await csrfFetch("/api/questions", {
    method: "POST",
    body: JSON.stringify(question),
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(addAQuestion(data.newQ));
  }
};

export const editQuestion = (question) => async (dispatch) => {
  const res = await csrfFetch(`/api/questions/${question.id}`, {
    method: "PUT",
    body: JSON.stringify(question),
  });
  if (res.ok) {
    const editedQuestion = await res.json();
    dispatch(editAQuestion(editedQuestion.editQ));
    return editedQuestion;
  }
};

export const removeQuestion = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/questions/${id}`, {
    method: "DELETE",
  });
  if (res.ok) {
    dispatch(removeAQuestion(id));
  }
};

const questionReducer = (state = {}, action) => {
  let newState = {};
  switch (action.type) {
    case SET_QUESTIONS:
      action.payload.forEach((question) => (newState[question.id] = question));
      return newState;
    case ADD_A_QUESTION:
      newState = { ...state, [action.payload.id]: action.payload };
      return newState;
    case EDIT_A_QUESTION:
      newState = { ...state, [action.payload.id]: action.payload };
      return newState;
    case REMOVE_A_QUESTION:
      newState = { ...state };
      delete newState[action.payload];
      return newState;
    // case ADD_AN_ANSWER:
    //   newState = { ...state };
    //   return newState;
    // case REMOVE_AN_ANSWER:
    //   newState = { ...state };
    //   const ansIdx = newState[action.payload.questionId].Answers.findIndex(
    //     (ans) => ans.id === action.payload.id
    //   );
    //   newState[action.payload.questionId].Answers.splice(ansIdx, 1);
    //   return newState;
    default:
      return state;
  }
};

export default questionReducer;
