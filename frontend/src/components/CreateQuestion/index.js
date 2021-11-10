import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addQuestion } from '../../store/questions';

const CreateQuestion = () => {
    const [ownerId, setOwnerId] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const history = useHistory();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
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
            <form onSubmit={handleSubmit} className='add-question'>
                <input
                    onChange={(e) => setOwnerId(e.target.value)}
                    value={ownerId}
                    placeholder='Owner ID'
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
