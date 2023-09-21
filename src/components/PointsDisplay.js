import { useQuizes } from "../contexts/QuizContext";

const PointsDisplay = () => {
    const { index, numQuestions, points, maxPossiblePoints, answer } = useQuizes();
    return (
        <header className="progress">
            <progress max={numQuestions} value={index + Number(answer !== null)}/>
            <p>Question <strong>{index + 1}</strong>/{numQuestions}</p>
            <p><strong>{points}</strong>/{maxPossiblePoints}</p>
        </header>
    )
}

export default PointsDisplay
