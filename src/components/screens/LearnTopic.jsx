import React, { useState } from "react";
import { Button, Progress } from "antd";
import { AiOutlineCheck, AiOutlineCloseCircle } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeftOutlined, ReloadOutlined } from "@ant-design/icons";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import annimation_not_enough_word from "../../assets/images/animation_not_enough_word.lottie";

const LearnTopic = () => {
  const location = useLocation();
  const { title, data } = location.state;

  const generateQuestions = (data) => {
    const meanings = data.map((word) => word.meaning);
    return data.map((word) => {
      const correctAnswer = word.meaning;
      const wrongAnswers = meanings
        .filter((m) => m !== correctAnswer)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
      const options = [...wrongAnswers, correctAnswer].sort(
        () => 0.5 - Math.random()
      );
      return {
        question: `${word.name}`,
        options,
        answer: correctAnswer,
      };
    });
  };

  const [questions] = useState(generateQuestions(data));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [optionColors, setOptionColors] = useState(Array(4).fill("")); // Màu của các đáp án
  const [percent, setPercent] = useState(0);
  const [resultTrue, setResultTrue] = useState(0);
  const totalQuestion = questions.length;
  const navigate = useNavigate();
  const currentQuestion = questions[currentQuestionIndex];
  const [completed, setCompleted] = useState(false);
  const [correctAnswers, setCorrectAnswers] = React.useState([]); // Lưu câu trả lời đúng
  const [wrongAnswers, setWrongAnswers] = React.useState([]);

  const handleAnswerClick = (option, idx, currentQuestion) => {
    console.log("opt: ", option, "curr:", currentQuestion);
    setSelectedOption(option);

    if (option === currentQuestion.answer) {
      setCorrectAnswers((prev) => [
        ...prev,
        {
          question: currentQuestion.question,
          correctAnswer: currentQuestion.answer,
        },
      ]);
    } else {
      setWrongAnswers((prev) => [
        ...prev,
        {
          question: currentQuestion.question,
          correctAnswer: currentQuestion.answer,
        },
      ]);
    }
    setSelectedOption(option);
    const newColors = [...optionColors];
    if (option === currentQuestion.answer) {
      setResultTrue(resultTrue + 1);
      newColors[idx] = "bg-green"; // Màu xanh nếu đúng
    } else {
      newColors[idx] = "bg-[#dc2626]"; // Màu đỏ nếu sai
    }
    setOptionColors(newColors);

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setPercent(((currentQuestionIndex + 1) / totalQuestion) * 100);
        setSelectedOption(null);
        setOptionColors(Array(4).fill("")); // Reset màu
      } else {
        setCompleted(true);
      }
    }, 1500);
  };

  const refreshPage = () => {
    window.location.href = location.pathname;
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-[#F0F8FF]">
      <div className="w-full h-16 bg-[#007BFF] text-bg-light flex items-center justify-between p-6 font-bold text-xl mb-10">
        <div className="text-base px-3 py-1 rounded-md bg-[#265aa8] shadow-lg">
          Học
        </div>
        <div>Ôn tập học phần {title}</div>
        <div
          className="w-7 h-7 text-center border hover:bg-[rgb(82,154,255)] cursor-pointer rounded-md"
          onClick={() => navigate(-1)}
        >
          X
        </div>
      </div>
      {data?.length >= 5 ? (
        !completed ? (
          <>
            <div className="flex w-3/5 h-9 mb-4 text-xl items-center justify-around">
              <div className="mr-2">{currentQuestionIndex + 1}</div>
              <Progress className="w-4/5" percent={percent} showInfo={false} />
              <div className="ml-2">{questions.length}</div>
            </div>
            <div className="w-full flex-grow flex justify-center items-center">
              <div className="w-3/5 h-3/5 bg-[#fff] rounded-lg shadow-xl p-6">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-2">Định nghĩa</h2>
                  <p className="text-lg">{currentQuestion.question}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Chọn thuật ngữ đúng
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    {currentQuestion.options.map((option, idx) => (
                      <button
                        key={idx}
                        className={`flex items-center justify-between w-full p-4 border rounded-lg ${optionColors[idx]}`}
                        onClick={() =>
                          handleAnswerClick(option, idx, currentQuestion)
                        }
                        disabled={!!selectedOption}
                      >
                        <span>{idx + 1}</span>
                        <span>{option}</span>
                        {selectedOption && (
                          <span>
                            {option === currentQuestion.answer ? (
                              <AiOutlineCheck size={24} color="green" />
                            ) : (
                              option === selectedOption && (
                                <AiOutlineCloseCircle
                                  size={24}
                                  color="orange"
                                />
                              )
                            )}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center justify-center w-full bg-bg-light shadow-lg rounded-lg p-8">
              <h2 className="text-3xl font-extrabold text-[#23c4ed] mb-6">
                Kết quả chọn
              </h2>
              <div className="w-full max-w-3xl grid grid-cols-2 gap-4 mb-6">
                <div className="p-6 text-center bg-green rounded-lg shadow">
                  <h3 className="text-xl font-bold text-[#1e832f]">Câu đúng</h3>
                  <p className="text-2xl font-extrabold text-[#0f5d12]">
                    {correctAnswers.length}
                  </p>
                  <p className="text-gray-500">Tổng số: {totalQuestion}</p>
                </div>
                <div className="p-6 text-center bg-[#ff3131] rounded-lg shadow">
                  <h3 className="text-xl font-bold text-[#a94228]">Câu sai</h3>
                  <p className="text-2xl font-extrabold text-[#871818]">
                    {wrongAnswers.length}
                  </p>
                  <p className="text-gray-500">Tổng số: {totalQuestion}</p>
                </div>
              </div>

              <div className="w-full max-w-3xl mb-6">
                <h3 className="text-2xl font-bold text-[#197a1a] border-b-2 border-blue pb-2 mb-4">
                  Các câu trả lời đúng
                </h3>
                <ul className="space-y-4">
                  {correctAnswers.map((item, index) => (
                    <li
                      key={index}
                      className="p-4 bg-green rounded-lg shadow flex flex-col"
                    >
                      <span className="text-lg font-semibold text-[#175c1b]">
                        Câu hỏi: {item.question}
                      </span>
                      <span className="text-base text-[#fff] mt-1">
                        Đáp án đúng: <strong>{item.correctAnswer}</strong>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="w-full max-w-3xl">
                <h3 className="text-2xl font-bold text-[#fa5353] border-b-2 border-[#f22e2e] pb-2 mb-4">
                  Các câu trả lời sai
                </h3>
                <ul className="space-y-4">
                  {wrongAnswers.map((item, index) => (
                    <li
                      key={index}
                      className="p-4 bg-[#e95959] rounded-lg shadow flex flex-col"
                    >
                      <span className="text-lg font-semibold text-[#8c2626]">
                        Câu hỏi: {item.question}
                      </span>
                      <span className="text-base text-[#ffffff] mt-1">
                        Đáp án đúng: <strong>{item.correctAnswer}</strong>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="w-2/5 h-10 flex items-center justify-between mb-8 mt-4  ">
              <Button
                icon={<ReloadOutlined />}
                size="large"
                type="primary"
                onClick={refreshPage}
              >
                Học lại từ đầu
              </Button>
              {/* <Button
              danger
              icon={<ReloadOutlined />}
              size="large"
              type="primary"
              onClick={handleLearnUnfamiliarWords}
            >
              Học lại từ đã sai
            </Button> */}
              <Button
                icon={<ArrowLeftOutlined />}
                size="large"
                onClick={() => navigate(-1)}
              >
                Trở về
              </Button>
            </div>
          </>
        )
      ) : (
        <div className="flex flex-col items-center">
          <span className="text-lg">
            Bạn cần có it nhất 5 từ vừng trong học phần để bắt đầu học
          </span>

          <DotLottieReact src={annimation_not_enough_word} loop autoplay />
        </div>
      )}
    </div>
  );
};

export default LearnTopic;
