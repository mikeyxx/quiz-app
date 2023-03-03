import { useAppSelector } from "../app/store";

const Question = () => {
  const { questions } = useAppSelector((state) => state.users);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="bg-white max-w-lg w-full min-h-[300px] flex flex-col items-center justify-center rounded  p-5">
        <div className="bg-[#188FA7] h-16 w-16 flex justify-center items-center rounded mb-14">
          <span className="text-white font-bold text-5xl">Q</span>
        </div>
        <div className="text-center w-full">
          {questions.map((ques, index) => {
            if (index === 0) {
              return (
                <div key={ques._id}>
                  <p className="text-xl">{ques.question}</p>
                  <div className="customGrid mt-10">
                    {ques.answer.map((ans) => (
                      <span
                        key={ans._id}
                        className="bg-[#188FA7] text-center text-xl p-1 rounded-xl text-white cursor-pointer"
                      >
                        {ans.option}
                      </span>
                    ))}
                  </div>
                </div>
              );
            }
          })}
          <span className="bg-[#188FA7] text-xl p-1 rounded-xl text-white cursor-pointer max-w-[250px] w-full text-center inline-block my-14">
            Next
          </span>
        </div>
      </div>
    </div>
  );
};

export default Question;
