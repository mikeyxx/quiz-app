import { useAppSelector, useAppDispatch } from "../app/store";
import { reset } from "../features/userSlice";

interface Props {
  score: number;
}

const UserScore = ({ score }: Props) => {
  const { user, questions } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  const words = () => {
    if (score >= questions.length / 2) {
      return `Well done ${user}!`;
    } else {
      return `Almost!!! Sorry ${user}, better luck next time🙄`;
    }
  };

  const handleReset = () => {
    localStorage.removeItem("user");
    dispatch(reset());
  };

  return (
    <main className="max-w-lg w-full flex flex-col justify-center items-center max-h-80 h-full p-3">
      <section className="bg-white flex flex-col items-center justify-center w-full h-full gap-6 text-2xl p-6 rounded">
        <span>🎉</span>
        <span>
          You scored: {score}/{questions.length}
        </span>
        <span className="font-semibold">{words()}</span>
        <button
          className="bg-[#9dbbae] py-2 px-3 rounded"
          onClick={handleReset}
        >
          Reset
        </button>
      </section>
    </main>
  );
};

export default UserScore;
