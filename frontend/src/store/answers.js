import { csrfFetch } from "./csrf";

const ADD_AN_ANSWER = "answers/addAnswer";
const EDIT_AN_ANSWER = "answers/editAnswer";
const REMOVE_AN_ANSWER = "answers/delete";
const SET_Q_ANSWERS = 'answers'



const setQAnswers = (payload) => ({
  type: SET_Q_ANSWERS,
  payload
})

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


export const setAnswers = (id) => async(dispatch) => {
  console.log(id);
  const res = await csrfFetch(`/api/answers/${id}`);
  if(res.ok) {
    const answers = await res.json();
    await dispatch(setQAnswers(answers.answers));
  }
}

export const addAnswer = (answer, questionId, userId) => async (dispatch) => {
  console.log('inside add answer');
  const res = await csrfFetch(`/api/answers/${questionId}`, {
    method: "POST",
    body: JSON.stringify(answer, userId),
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(addAnAnswer(data.newQ));
  }
};

// export const editAnswer = (answer) => async (dispatch) => {
//   const res = await csrfFetch(`/api/questions/${question.id}`, {
//     method: "PUT",
//     body: JSON.stringify(answer),
//   });
//   if (res.ok) {
//     const editedAnswer = await res.json();
//     dispatch(editAnAnswer(editedAnswer.editA));
//     return editedAnswer;
//   }
// };

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
    case SET_Q_ANSWERS:
      newState = {}
      console.log(action.payload);
      console.log('HERE++++++++++++++>>>>>>>');
      action.payload.forEach(answer => {
        newState[answer.id] = answer})
        return {...state, ...newState};
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
