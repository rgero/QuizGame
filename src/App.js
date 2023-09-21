// Components
import Header from './components/Header';
import Main from './components/Main';
import Loading from './components/Loader';
import Error from './components/Error';
import StartScreen from './screens/StartScreen';
import QuizScreen from './screens/QuizScreen';
import FinishedScreen from './screens/FinishedScreen';

import Status from './Status';

import { useQuizes } from './contexts/QuizContext';

const App = () => {
  const { status, quizName } = useQuizes();

  return (
    <div className="app">
      <Header quizName={quizName}/>
      <Main>
        {status === Status.Loading && <Loading/>}
        {status === Status.Error && <Error/>}
        {status === Status.Ready && <StartScreen/>}
        {status === Status.Active && <QuizScreen/>}
        {status === Status.Finished && <FinishedScreen/>}
      </Main>
    </div>
  );
}

export default App;
