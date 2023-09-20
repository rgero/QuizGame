import Status from "../Status"

const SECONDS_PER_QUESTION = 30;

export const initialState = { 
    quizName: "The Quiz",
    questions: [],
    index: 0,
    answer: null,
    points: 0, 
    status: Status.Loading,
    secondsRemaining: null
  }

export const reducer = (state, action) => {
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
            status: Status.Finished
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