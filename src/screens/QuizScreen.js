import Question from '../components/Question';
import NextButton from '../components/NextButton';
import PointsDisplay from '../components/PointsDisplay';
import Footer from '../components/Footer';
import Timer from '../components/Timer';

const QuizScreen = () => {
    return (
        <>
            <PointsDisplay/>
            <Question/>
            <Footer>
              <Timer/>
              <NextButton/>
            </Footer>
        </>
    )
}

export default QuizScreen
