import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addAnswer } from '../../store/answers';
import './CreateAnswer.css';

const CreateAnswer = () => {

    const sessionUser = useSelector((state) => state.session.user);

    const [userId, setUserId] = useState('');
    const [questionId, setQuestionId] = useState('');
    const [answer, setAnswer] = useState('');
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
            userId: user.id,
            questionId,
            answer
        };
        dispatch(addAnswer(payload));

        history.push('/');
    };

    return (
        <div className='add-answer'>
            <h3>Add An Answer</h3>
            <form onSubmit={handleSubmit} >

                <input
                    onChange={(e) => setAnswer(e.target.value)}
                    value={answer}
                    placeholder='Enter your answer here'
                />
                <div className='add-a-btns'>
                    <button className='answer-sumbit-btn' type='submit'>
                        Add Answer
                    </button>
                    <button className='cancel-btn' onClick={cancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
};
export default CreateAnswer;
