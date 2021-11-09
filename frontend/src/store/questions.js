import { response } from '../../../backend/app';
import { csrfFetch } from './csrf';

const SET_QUESTIONS = 'questions/setQuestions';
const ADD_QUESTION = 'questions/addQuestion';
const EDIT_QUESTION = 'questions/editQuestion';
const REMOVE_QUESTION = 'questions/delete';

const setQuestions = payload => {
    return {
        type: SET_QUESTIONS,
        payload,
    };
};

const addQuestion = payload => {
    return {
        type: ADD_QUESTION,
        payload,
    };
};

const editQuestion = payload => {
    return {
        type: EDIT_QUESTION,
        payload,
    };
};

const removeQuestion = id => {
    return {
        type: REMOVE_QUESTION,
        payload: id,
    };
};

export const getQuestions = (id) => async (dispatch) => {
    const res = await csrfFetch('/api/questions');
    if(res.ok) {
        const questions = await response.json();
        dispatch(setQuestions(questions));
    }
};

const questionReducer = (state = {}, action) => {
    let newState = {};
    switch (action.type) {
        case SET_QUESTIONS:
            action.payload.forEach(question => (newState[question.id] = question));
            return newState;
    }
};

export default questionReducer;
