import {createContext, useEffect, useReducer, useContext} from 'react';
import Status from "../Status";

const QuizContext = createContext();

const SECONDS_PER_QUESTION = 30;
let targetServerAddress = process.env.REACT_APP_QUIZ_SERVER;

const initialState = {
  quizName: "The Quiz",
  questions: [],
  status: Status.Loading,
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

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
          status: Status.Active,
          secondsRemaining: state.questions.length * SECONDS_PER_QUESTION
        }
      case "newAnswer":
        const question = state.questions.at(state.index);
        return {
          ...state,
          answer: action.payload,
          points: action.payload === question.correctOption ? state.points + question.points : state.points
        }
      case "nextQuestion":
        return {
          ...state,
          index: state.index + 1,
          answer: null
        }
      case "finish":
        return {
            ...state,
            status: Status.Finished,
            highscore: state.points > state.highscore ? state.points : state.highscore,
        }
      case "restart":
        return { ...initialState, questions: state.questions, status: "ready" };
      case "tick":
        return {
              ...state,
              secondsRemaining: state.secondsRemaining - 1,
              status: state.secondsRemaining === 0 ? Status.Finished : state.status,
        };
      default:
        throw new Error("Action is unknown");
    }
}

const QuizProvider = ({children}) => {
    const [{ quizName, questions, status, index, answer, points, highscore, secondsRemaining }, dispatch] = useReducer(reducer, initialState);
    
    const numQuestions = questions.length;
    const maxPossiblePoints = questions.reduce((prev, cur) => prev + cur.points, 0);

    // Get the data from the API - This could be moved to its own effect.
    useEffect( ()=> {
        fetch(targetServerAddress)
        .then(res => res.json())
        .then(data => dispatch({type: "dataReceived", payload: data}))
        .catch((err) => dispatch({type: "dataFailed"}));
    }, [])

    return (
        <QuizContext.Provider
            value={
            {
                quizName,
                questions,
                status,
                index,
                answer,
                points,
                highscore,
                secondsRemaining,
                numQuestions,
                maxPossiblePoints,
                dispatch,
            }
            }
        >
            {children}
        </QuizContext.Provider>
    );
}

const useQuizes = () => {
    const context = useContext(QuizContext)
    if (context === undefined)
    {
        throw new Error("Quiz Context used outside of Quiz Provider");
    }
    return context;
}

export {QuizProvider, useQuizes};