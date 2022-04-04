import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { QuestionsContext } from '../context/context';
import StartCircle from '../constants/icons/StartCircle';
import Correct from '../constants/icons/Correct';
import Wrong from '../constants/icons/Wrong';
import Title from '../components/Title';
import Text from '../components/Text';
import HeaderLine from '../constants/icons/HeaderLine';
import '../styles/final.css';

const Final = () => {
  // getting data from context
  const { questions, currentScore, nextTour, correctAnswersNumber } =
    useContext(QuestionsContext);

  return (
    <div className='finalPage'>
      <div className='results flex'>
        <div className='finalHeading'>
          <Title>Final</Title>
          <HeaderLine width={'23rem'} />
        </div>

        <Text>Points: {currentScore}</Text>
        <Text>Questions: {questions.length}</Text>
        <Text>Correct Answers: {correctAnswersNumber}</Text>

        <Link
          to='/questions'
          className='startButton'
          onClick={() => nextTour()}
        >
          <StartCircle />
          <p className='startText'>Restart</p>
        </Link>
      </div>
      <div className='allQuestions flex'>
        <Title>All Questions</Title>
        <HeaderLine width={'45rem'} />
        <div className='allQuestions'>
          {questions.map((question, index) => {
            return (
              <div className='questions' key={index}>
                <Text>
                  {question.q} ={' '}
                  {question.q.split(' ')[0] * question.q.split(' ')[2]}
                </Text>
                {question.c ? <Correct /> : <Wrong />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Final;
