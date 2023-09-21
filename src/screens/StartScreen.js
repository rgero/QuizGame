import { useQuizes } from "../contexts/QuizContext"

const StartScreen = () => {
    const {numQuestions, quizName, dispatch} = useQuizes();

    const handleStart = () => {
        dispatch({"type": "quizStarted"})
    }

    return (
        <div className="start">
            <h2>Welcome to {quizName}</h2>
            <h3>{numQuestions} questions to test your knowledge</h3>
            <button className="btn btn-ui" onClick={handleStart}>Let's Start</button>
        </div>
    )
}

export default StartScreen
