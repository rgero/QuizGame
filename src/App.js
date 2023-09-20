import { useEffect, useReducer } from 'react';

// Components
import Header from './components/Header';
import Main from './components/Main';
import Loading from './components/Loader';
import Error from './components/Error';
import StartScreen from './components/StartScreen';

// Javascript Class
import Status from './Status';

let targetServerAddress = process.env.REACT_APP_QUIZ_SERVER;

const reducer = (state, action) => {
  switch(action.type)
  {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: Status.Ready
      }
    case "dataFailed":
      return {
        ...state,
        status: Status.Error
      }
    default:
      throw new Error("Action is unknown");
  }
}

const initialState = { questions: [], status: Status.Loading}

const App = () => {
  const [{questions, status}, dispatch] = useReducer(reducer, initialState)
  const numQuestions = questions.length;

  // Get the data from the API
  useEffect( ()=> {
    fetch(targetServerAddress)
      .then(res => res.json())
      .then(data => dispatch({type: "dataReceived", payload: data}))
      .catch((err) => dispatch({type: "dataFailed"}));
  }, [])

  return (
    <div className="app">
      <Header/>
      <Main>
        {status === Status.Loading && <Loading/>}
        {status === Status.Error && <Error/>}
        {status === Status.Ready && <StartScreen quizLength={numQuestions}/>}
      </Main>
    </div>
  );
}

export default App;
