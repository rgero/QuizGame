const StartScreen = ({quizLength, quizName="The Hockey Quiz"}) => {
    return (
        <div className="start">
            <h2>Welcome to {quizName}</h2>
            <h3>{quizLength} questions to test your knowledge</h3>
            <button className="btn btn-ui">Let's Start</button>
        </div>
    )
}

export default StartScreen
