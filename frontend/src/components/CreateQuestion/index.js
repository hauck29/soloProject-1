import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addQuestion } from '../../store/questions';
import "./createQuestion.css";

const CreateQuestion = () => {
    // const [userName, setUserName] = useState('');
    const [ownerId, setOwnerId] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const [errors, setErrors] = useState([]);

    const cancel = (e) => {
        e.preventDefault();
        history.push('/');
    }



    




    const handleSubmit = (e) => {
        e.preventDefault();
        if(title.length < 1 || description.length < 1) {
            setErrors(['Both fields must have values']);
            return errors;
        }
        const payload = {
            ownerId: user.id,
            title,
            description
        };
        dispatch(addQuestion(payload));

        //this setTimeout allows 250 ms of time before the redirect
        //so the username has time to be pulled from a nested object
        //in CreateQuestion/index.js
        setTimeout(() => {history.push('/')}, 250);
    };

    return (
        <div className='add-question'>
            <h3>Add A Question</h3>
            <p>***You must enter values for both fields for your question to post!***</p>
            <form onSubmit={handleSubmit} >
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
                <div className='add-q-btns'>
                    <button className='question-sumbit-btn' type='submit'>
                        Add Question
                    </button>
                    <button className='cancel-btn' onClick={cancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
};
export default CreateQuestion;
