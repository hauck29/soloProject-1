import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import editQuestion from '../../store/questions';

const EditQuestion = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const history = useHistory();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            title,
            description
        };
        dispatch(editQuestion(payload));

        history.push('/');
    };

    return (
        <div className='add-question'>
            <h3>Edit Question</h3>
            <form onSubmit={handleSubmit} className='add-question'>

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
        </div>
    );
};
export default EditQuestion;
