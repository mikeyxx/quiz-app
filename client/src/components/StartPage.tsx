import { useAppDispatch, useAppSelector } from "../app/store";
import axios from "axios";
import { getQuestions, logError, setLoading } from "../features/userSlice";

const StartPage = () => {
  const dispatch = useAppDispatch();
  const { token, isLoading } = useAppSelector((state) => state.users);

  const fetchQuestions = async () => {
    dispatch(setLoading());
    try {
      const { data } = await axios.get("/api/v1/questions", {
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
    <main className="flex flex-col justify-center items-center h-screen p-3">
      <div className="bg-white max-w-lg w-full min-h-[300px] flex flex-col items-center justify-center p-5 rounded">
        <header className="flex justify-center items-center rounded mb-14 gap-2">
          <div className="bg-[#188FA7] h-10 w-10 flex justify-center items-center rounded">
            <span className="text-white font-bold text-3xl">Q</span>
          </div>
          <span className="font-bold font-0 text-[#188FA7] text-xl">
            Smarty Pants
          </span>
        </header>
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
    </main>
  );
};

export default StartPage;
