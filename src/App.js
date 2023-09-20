import { useEffect, useReducer } from 'react';

// Components
import Header from './components/Header';
import Main from './components/Main';
import Loading from './components/Loader';
import Error from './components/Error';
import StartScreen from './screens/StartScreen';
import QuizScreen from './screens/QuizScreen';
import FinishedScreen from './screens/FinishedScreen';

import Status from './Status';

// This screams to useContext but I'm being lazy right now.
import { initialState, reducer } from './reducers/quizReducer';

let targetServerAddress = process.env.REACT_APP_QUIZ_SERVER;

const App = () => {
  const [{quizName, questions, index, answer, points, status, secondsRemaining}, dispatch] = useReducer(reducer, initialState)
  const numQuestions = questions.length;
  const maxPoints = questions.reduce((prev, curr) => prev + curr.points, 0);

  // Get the data from the API - This could be moved to its own effect.
  useEffect( ()=> {
    fetch(targetServerAddress)
      .then(res => res.json())
      .then(data => dispatch({type: "dataReceived", payload: data}))
      .catch((err) => dispatch({type: "dataFailed"}));
  }, [])

  return (
    <div className="app">
      <Header quizName={quizName}/>
      <Main>
        {status === Status.Loading && <Loading/>}
        {status === Status.Error && <Error/>}
        {status === Status.Ready && <StartScreen quizLength={numQuestions} dispatch={dispatch} quizName={quizName}/>}
        {status === Status.Active && <QuizScreen index={index}
                                                 numQuestions={numQuestions}
                                                 points={points}
                                                 maxPoints={maxPoints}
                                                 answer={answer}
                                                 questions={questions}
                                                 secondsRemaining={secondsRemaining}
                                                 dispatch={dispatch}
                                      />
        }
        {status === Status.Finished && <FinishedScreen points={points} maxPoints={maxPoints} dispatch={dispatch}/>}
      </Main>
    </div>
  );
}

export default App;
