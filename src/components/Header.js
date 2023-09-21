import { useQuizes } from "../contexts/QuizContext";

const Header = () => {
  const {quizName} = useQuizes();
  return (
    <header className='app-header'>
      <img src='logo512.png' alt='React logo' />
      <h1>{quizName}</h1>
    </header>
  );
}

export default Header;
