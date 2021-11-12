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

    const cancel = (e) => {
        e.preventDefault();
        history.push('/');
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            ownerId: user.id,
            title,
            description
        };
        dispatch(addQuestion(payload));

        history.push('/');
    };

    return (
        <div className='add-question'>
            <h3>Add A Question</h3>
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
