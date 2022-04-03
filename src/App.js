import Router from './router/Router';
import { QuestionsProvider } from './context/context';

function App() {
  return (
    <QuestionsProvider>
      <Router />
    </QuestionsProvider>
  );
}

export default App;
