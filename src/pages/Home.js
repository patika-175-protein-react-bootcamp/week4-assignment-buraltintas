import Title from '../components/Title';
import HeaderLine from '../constants/icons/HeaderLine';
import StartCircle from '../constants/icons/StartCircle';
import TotalResults from '../components/TotalResults';
import { Link } from 'react-router-dom';
import '../styles/home.css';

const Home = () => {
  return (
    <div className='home'>
      <Title>Mathematics Game</Title>
      <HeaderLine />
      <TotalResults />
      <Link to='/questions' className='startButton'>
        <StartCircle />
        <p className='startText'>Start</p>
      </Link>
    </div>
  );
};

export default Home;
