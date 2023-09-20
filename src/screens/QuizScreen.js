import Question from '../components/Question';
import NextButton from '../components/NextButton';
import PointsDisplay from '../components/PointsDisplay';
import Footer from '../components/Footer';
import Timer from '../components/Timer';

const QuizScreen = ({index, numQuestions, points, maxPoints, answer, questions, secondsRemaining, dispatch}) => {
    return (
        <>
            <PointsDisplay index={index} numQuestions={numQuestions} points={points} maxPoints={maxPoints} answer={answer}/>
            <Question question={questions[index]} dispatch={dispatch} answer={answer}/>
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                numQuestions={numQuestions}
                index={index}
              />
            </Footer>
        </>
    )
}

export default QuizScreen
