import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import arrayShuffle from 'array-shuffle';

const QuestionsContext = React.createContext();

const QuestionsProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState();
  const [correctAnswersNumber, setCorrectAnswersNumber] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [tour, setTour] = useState(1);
  const [question, setQuestion] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [answersArray, setAnswersArray] = useState([]);

  const reset = () => {
    setQuestions([]);
    setCorrectAnswer();
    setCorrectAnswersNumber(0);
    setWrongAnswers([]);
    setCurrentScore(0);
    setQuestion('');
    setIsCorrect(null);
    setAnswersArray([]);
  };

  const newQuestion = () => {
    setIsCorrect(null);
    let num1 = Math.floor(Math.random() * 10) + 1;
    let num2 = Math.floor(Math.random() * 10) + 1;

    setQuestion(`${num1} x ${num2}`);

    setCorrectAnswer(num1 * num2);

    setWrongAnswers([num2 * (num1 + 1), num1 * (num2 - 1)]);

    let options = [num1 * num2, num2 * (num1 + 1), num1 * (num2 - 1)];

    let shuffled = arrayShuffle(options);

    setAnswersArray(shuffled);
  };

  let answerHandler;

  if (isCorrect === null) {
    answerHandler = (answer) => {
      if (answer === correctAnswer) {
        setCurrentScore((prev) => prev + Math.ceil(Math.sqrt(correctAnswer)));
        setIsCorrect(true);
        setQuestions([...questions, { q: question, a: answer, c: true }]);
        setCorrectAnswersNumber((prev) => prev + 1);
        setTimeout(() => {
          newQuestion();
          setIsCorrect(null);
        }, 3000);
      }

      if (answer !== correctAnswer) {
        setIsCorrect(false);
        setQuestions([...questions, { q: question, a: answer, c: false }]);
        setTimeout(() => {
          newQuestion();
          setIsCorrect(null);
        }, 3000);
      }
    };
  }

  let navigate = useNavigate();

  useEffect(() => {
    if (questions.length === 10) {
      setTimeout(() => {
        navigate('../final', { replace: true });
      }, 3000);

      if (localStorage.getItem('totalPoints')) {
        const pointsFromStorage = +localStorage.getItem('totalPoints');
        localStorage.setItem('totalPoints', pointsFromStorage + +currentScore);
      } else {
        localStorage.setItem('totalPoints', currentScore);
      }

      if (localStorage.getItem('totalQuestions')) {
        const questionsFromStorage = +localStorage.getItem('totalQuestions');
        localStorage.setItem(
          'totalQuestions',
          questionsFromStorage + questions.length
        );
      } else {
        localStorage.setItem('totalQuestions', questions.length);
      }

      if (localStorage.getItem('totalCorrectAnswers')) {
        const correctAnswersFromStorage = +localStorage.getItem(
          'totalCorrectAnswers'
        );
        localStorage.setItem(
          'totalCorrectAnswers',
          correctAnswersFromStorage + correctAnswersNumber
        );
      } else {
        localStorage.setItem('totalCorrectAnswers', correctAnswersNumber);
      }
    }
  }, [questions]);

  const nextTour = () => {
    setTour(tour + 1);
    reset();
  };

  return (
    <QuestionsContext.Provider
      value={{
        questions,
        correctAnswer,
        wrongAnswers,
        currentScore,
        tour,
        question,
        newQuestion,
        nextTour,
        answerHandler,
        isCorrect,
        answersArray,
        correctAnswersNumber,
      }}
    >
      {children}
    </QuestionsContext.Provider>
  );
};

export { QuestionsContext, QuestionsProvider };
