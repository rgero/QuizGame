import Status from "../Status"
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
          status: Status.Active
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
      default:
        throw new Error("Action is unknown");
    }
}