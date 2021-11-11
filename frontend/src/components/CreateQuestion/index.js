import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addQuestion } from '../../store/questions';
import "./createQuestion.css";

const CreateQuestion = () => {
    const [userName, setUserName] = useState('');
    const [ownerId, setOwnerId] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const history = useHistory();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            userName,
            ownerId,
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
                <input className='o-i'
                    onChange={(e) => setUserName(e.target.value)}
                    value={userName}
                    placeholder='User Name'
                />
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
                    Add Question
                </button>
            </form>
        </div>
    );
};
export default CreateQuestion;
