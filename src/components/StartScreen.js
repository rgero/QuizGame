const StartScreen = ({quizLength, dispatch, quizName="The Hockey Quiz"}) => {
    const handleStart = () => {
        dispatch({"type": "quizStarted"})
    }

    return (
        <div className="start">
            <h2>Welcome to {quizName}</h2>
            <h3>{quizLength} questions to test your knowledge</h3>
            <button className="btn btn-ui" onClick={handleStart}>Let's Start</button>
        </div>
    )
}

export default StartScreen
