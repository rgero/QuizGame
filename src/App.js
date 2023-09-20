import { useEffect, useReducer } from 'react';

// Components
import Header from './components/Header';
import Main from './components/Main';
import Loading from './components/Loader';
import Error from './components/Error';
import StartScreen from './components/StartScreen';
import Question from './components/Question';

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
    case "quizStarted":
      return {
        ...state,
        status: Status.Active
      }
    case "newAnswer":
      return {
        ...state,
        answer: action.payload
      }
    default:
      throw new Error("Action is unknown");
  }
}

const initialState = { 
  quizName: "The Quiz",
  questions: [],
  index: 0,
  answer: null, 
  status: Status.Loading}

const App = () => {
  const [{quizName, questions, index, answer, status}, dispatch] = useReducer(reducer, initialState)
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
      <Header quizName={quizName}/>
      <Main>
        {status === Status.Loading && <Loading/>}
        {status === Status.Error && <Error/>}
        {status === Status.Ready && <StartScreen quizLength={numQuestions} dispatch={dispatch} quizName={quizName}/>}
        {status === Status.Active && <Question question={questions[index]} dispatch={dispatch} answer={answer}/>}
      </Main>
    </div>
  );
}

export default App;
