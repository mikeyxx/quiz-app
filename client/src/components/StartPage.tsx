import { useAppDispatch, useAppSelector } from "../app/store";
import axios from "axios";
import { getQuestions, logError, setLoading } from "../features/userSlice";

const StartPage = () => {
  const dispatch = useAppDispatch();
  const { token, isLoading } = useAppSelector((state) => state.users);

  const fetchQuestions = async () => {
    dispatch(setLoading());
    try {
      const { data } = await axios.get(import.meta.env.VITE_APP_QUESTIONS_API, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(getQuestions(data.questions));
    } catch (error: any) {
      dispatch(logError(error.response.data.err._message));
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="bg-white max-w-lg w-full min-h-[300px] flex flex-col items-center justify-center rounded">
        <div className="bg-[#188FA7] h-16 w-16 flex justify-center items-center rounded mb-14">
          <span className="text-white font-bold text-5xl">Q</span>
        </div>
        <p className="text-lg">Are you ready?</p>
        <p className="mb-4 text-lg">
          You need to answer 10 questions in total. Good luck!
        </p>
        <button
          className="bg-green-500 px-8 py-3 rounded text-xl"
          onClick={fetchQuestions}
        >
          {isLoading ? "Generating Quiz..." : "Start Quiz"}
        </button>
      </div>
    </div>
  );
};

export default StartPage;
