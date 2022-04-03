import { useState, useEffect } from 'react';
import Text from '../components/Text';

const TotalResults = () => {
  const [totalPoints, setTotalPoints] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [totalCorrectAnswers, setTotalCorrectAnswers] = useState(0);

  useEffect(() => {
    if (localStorage.getItem('totalPoints')) {
      setTotalPoints(localStorage.getItem('totalPoints'));
    }

    if (localStorage.getItem('totalQuestions')) {
      setTotalQuestions(localStorage.getItem('totalQuestions'));
    }

    if (localStorage.getItem('totalCorrectAnswers')) {
      setTotalCorrectAnswers(localStorage.getItem('totalCorrectAnswers'));
    }
  }, []);

  return (
    <div className='totalResults'>
      <Text>Total Points: {totalPoints}</Text>
      <Text>Total Questions: {totalQuestions}</Text>
      <Text>Correct Answers: {totalCorrectAnswers}</Text>
    </div>
  );
};

export default TotalResults;
