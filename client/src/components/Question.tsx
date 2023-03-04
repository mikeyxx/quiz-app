import { useState, useRef, useEffect } from "react";
import { useAppSelector } from "../app/store";
import UserScore from "./UserScore";

const Question = () => {
  const { questions, user, token } = useAppSelector((state) => state.users);
  const [count, setCount] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const goToNext = () => {
    if (count === questions.length - 1) return;
    setCount((pre) => pre + 1);
  };

  const spanRef = useRef<null | NodeList>(null);

  const handleClick = (e: any) => {
    const targetValue = e.currentTarget.dataset.option === "true";
    if (targetValue) {
      setScore((pre) => pre + 1);
    }

    if (count === questions.length - 1) {
      setTimeout(() => {
        document.body.style.backgroundColor = "#9dbbae";
        setShowScore(true);
      }, 2000);
    }
  };

  const handleMouseEvent = function (e: any) {
    const targetValue = e.currentTarget.dataset.option === "true";
    if (targetValue) {
      document.body.style.backgroundColor = "green";
    } else {
      document.body.style.backgroundColor = "red";
    }

    spanRef.current = document.querySelectorAll(".answerSpan");
    spanRef.current.forEach((btn: any) => {
      if (btn.dataset.option === "true") {
        btn.style.backgroundColor = "green";
      } else {
        btn.style.backgroundColor = "red";
      }
    });
  };

  useEffect(() => {
    spanRef.current = document.querySelectorAll(".answerSpan");
    spanRef.current.forEach((btn) =>
      btn.addEventListener("click", handleClick)
    );
    spanRef.current.forEach((btn) =>
      btn.addEventListener("mouseup", handleMouseEvent)
    );

    // return () => {
    //   setTimeout(() => {
    //     spanRef.current = document.querySelectorAll(".answerSpan");
    //     spanRef.current.forEach((btn) =>
    //       btn.removeEventListener("mouseup", handleClick)
    //     );
    //   }, 1000);
    // };
    localStorage.getItem("user");
  }, [count, handleClick]);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {showScore ? (
        <UserScore score={score} />
      ) : (
        <div className="bg-white max-w-lg w-full min-h-[300px] flex flex-col items-center justify-center rounded  p-5">
          <div className="bg-[#188FA7] h-16 w-16 flex justify-center items-center rounded mb-14">
            <span className="text-white font-bold text-5xl">Q</span>
          </div>
          <div className="text-center w-full">
            {questions?.map((ques, index) => {
              if (index === count) {
                return (
                  <div key={ques._id}>
                    <p className="text-xl">{ques.question}</p>
                    <div className="customGrid mt-10">
                      {ques.answer.map((ans) => (
                        <span
                          key={ans._id}
                          data-option={ans.correct}
                          className={`bg-[#188FA7] text-center text-xl p-1 rounded-xl text-white cursor-pointer answerSpan 
                        }`}
                        >
                          {ans.option}
                        </span>
                      ))}
                    </div>
                    <span
                      onClick={goToNext}
                      className="bg-[#188FA7] text-xl p-1 rounded-xl text-white cursor-pointer max-w-[250px] w-full text-center inline-block my-14"
                    >
                      Next
                    </span>
                  </div>
                );
              }
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Question;
