import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getQuestions } from '../../store/questions';

const Questions = () => {
  const dispatch = useDispatch();
  const questions = useSelector(state => Object.values(state.question));
  useEffect(() => {
    dispatch(getQuestions());
  }, [dispatch]);

  return (
    <div>

      
    </div>
  );
};
export default Questions;
