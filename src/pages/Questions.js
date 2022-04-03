import { useContext, useEffect } from 'react';
import '../styles/board.css';
import BlackBoard from '../components/BlackBoard';
import Text from '../components/Text';
import AnswerCircle from '../constants/icons/AnswerCircle';
import { QuestionsContext } from '../context/context';

const Questions = () => {
  const {
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
  } = useContext(QuestionsContext);

  useEffect(() => {
    newQuestion();
  }, []);

  const background =
    isCorrect === true ? 'correct' : isCorrect === false ? 'wrong' : '';

  return (
    <div className={`${background} board`}>
      <div className='leftSide'>
        <BlackBoard />
        <p className='question'>{question}</p>
      </div>

      <div className='rightSide'>
        <div className='currentResults'>
          <Text>Score: {currentScore}</Text>
          <Text>Tour: {tour}</Text>
          <Text>
            Questions: {`${correctAnswersNumber}/${questions.length}`}
          </Text>
        </div>
        <div className='answers'>
          {answersArray.map((option, index) => {
            return (
              <div
                className={`answer${index + 1} answer`}
                key={index}
                onClick={() => answerHandler(option)}
              >
                <AnswerCircle />
                <p className={`option${index + 1} option`}>{option}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Questions;
