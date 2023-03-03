import Question from "../components/Question";
import StartPage from "../components/StartPage";
import { useAppSelector } from "../app/store";

const Questions = () => {
  const { startQuiz } = useAppSelector((state) => state.users);
  return <>{startQuiz ? <Question /> : <StartPage />}</>;
};

export default Questions;
