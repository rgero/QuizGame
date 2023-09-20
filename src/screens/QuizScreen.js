import Question from '../components/Question';
import NextButton from '../components/NextButton';
import PointsDisplay from '../components/PointsDisplay';

const QuizScreen = ({index, numQuestions, points, maxPoints, answer, questions, dispatch}) => {
    return (
        <>
            <PointsDisplay index={index} numQuestions={numQuestions} points={points} maxPoints={maxPoints} answer={answer}/>
            <Question question={questions[index]} dispatch={dispatch} answer={answer}/>
            <NextButton answer={answer} dispatch={dispatch}/>
        </>
    )
}

export default QuizScreen
