import { useContext, useEffect, useState } from 'react';
import '../styles/board.css';
import BlackBoard from '../constants/icons/BlackBoard';
import Text from '../components/Text';
import AnswerCircle from '../constants/icons/AnswerCircle';
import { QuestionsContext } from '../context/context';

const Questions = () => {
  const [selectedOption, setSelectedOption] = useState();

  // getting data and functions from context
  const {
    questions,
    currentScore,
    correctAnswer,
    tour,
    question,
    newQuestion,
    answerHandler,
    isCorrect,
    answersArray,
    correctAnswersNumber,
  } = useContext(QuestionsContext);

  useEffect(() => {
    newQuestion();
  }, []);

  // changing background color if answer is correct or not
  const background =
    isCorrect === true ? 'correct' : isCorrect === false ? 'wrong' : '';

  // handling selected answer
  const handleOptionSelect = (e) => {
    setSelectedOption(e);
  };

  return (
    <div className={`${background} board`}>
      <div className='leftSide'>
        <BlackBoard className='board' />
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
                onClick={() => {
                  answerHandler(option);
                  handleOptionSelect(option);
                }}
              >
                {isCorrect === null && <AnswerCircle svgFill={'white'} />}

                {isCorrect === true && (
                  <AnswerCircle
                    svgFill={option === correctAnswer ? '#2D2D2D' : 'white'}
                  />
                )}

                {isCorrect === false && (
                  <AnswerCircle
                    svgFill={
                      option === selectedOption
                        ? '#2D2D2D'
                        : option === correctAnswer
                        ? '#00bf63'
                        : 'white'
                    }
                  />
                )}

                {isCorrect === true && option === correctAnswer && (
                  <div className='optionDiv'>
                    <p className={`option${index + 1} option black`}>
                      {option}
                    </p>
                  </div>
                )}

                {isCorrect === false && option === correctAnswer && (
                  <div className='optionDiv'>
                    <p className={`option${index + 1} option green`}>
                      {option}
                    </p>
                  </div>
                )}

                {isCorrect !== null &&
                  option !== correctAnswer &&
                  option === selectedOption && (
                    <div className='optionDiv'>
                      <p className={`option${index + 1} option black`}>
                        {option}
                      </p>
                    </div>
                  )}

                {isCorrect !== null &&
                  option !== correctAnswer &&
                  option !== selectedOption && (
                    <div className='optionDiv'>
                      <p className={`option${index + 1} option `}>{option}</p>
                    </div>
                  )}

                {isCorrect === null && (
                  <div className='optionDiv'>
                    <p className={`option${index + 1} option`}>{option}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Questions;
