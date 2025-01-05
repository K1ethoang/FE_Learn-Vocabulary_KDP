import React, { useEffect, useRef, useState } from "react";
// import { questions } from "../../assets/example_data/questions_fake";
import { Affix, Button, Col, message, Row } from "antd";
import { v4 as uuidv4 } from "uuid";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import QuestionList from "../../utils/QuestionList";
import axiosConfig from "../../services/axios/axiosConfig";
import { useSelector } from "react-redux";
const TestScreen = () => {
  const [startTime, setStartTime] = useState(null);
  const location = useLocation();
  const { title } = location.state;
  const [endTime, setEndTime] = useState(null);
  const [questions, setQuestions] = useState([]);
  const lengthTest = questions.length;
  const [results, setResults] = React.useState(Array(lengthTest).fill(null));
  const [selectedAnswers, setSelectedAnswers] = React.useState(
    Array(lengthTest).fill(null)
  );
  const theme = useSelector((state) => state.theme.theme);

  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const myUUID = uuidv4();
  const { id } = useParams();
  const questionRefs = useRef([]);
  const [examId, setExamId] = useState("");

  const createExam = async (idTopic) => {
    try {
      setStartTime(Date.now());
      const res = await axiosConfig.post(`/exams?topicId=${idTopic}`);
      if (res?.data?.statusCode === 201) {
        setQuestions(res?.data?.result?.questions);
        setExamId(res?.data?.result?.id);
      }
    } catch (error) {
      console.log("error:", error);
      message.error("Có lỗi xảy ra!");
    }
  };

  useEffect(() => {
    createExam(id);
  }, [id]);

  const scrollToQuestion = (index) => {
    if (questionRefs.current[index]) {
      const headerHeight = 80;
      const elementPosition =
        questionRefs.current[index].getBoundingClientRect().top +
        window.scrollY;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleAnswerClick = (questionIndex, answerIndex, numQues, numAns) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[questionIndex] = answerIndex;
    setSelectedAnswers(newSelectedAnswers);

    const newResult = [...results];
    newResult[questionIndex] = {
      questionId: numQues,
      answer: numAns,
    };
    setResults(newResult);
  };
  console.log(selectedAnswers);
  console.log(results);

  const handleSubmitExam = async (resultExam) => {
    console.log("check examId", examId);
    const endAt = Date.now();
    setEndTime(endAt);
    try {
      console.log("data exam: ", {
        startAt: startTime,
        endAt: endAt,
        results: resultExam,
      });
      const res = await axiosConfig.post(
        `/exams/submit-exam?examId=${examId}`,
        {
          startAt: startTime,
          endAt: endAt,
          results: resultExam,
        }
      );

      if (res?.data?.statusCode === 200) {
        const result = res?.data?.result;
        messageApi
          .open({
            type: "loading",
            content: "Nộp bài ...",
            duration: 2.5,
          })
          .then(() => message.success("Nộp thành công.", 2.5))
          .then(() => message.info("Chuyến sang trang kết quả.", 2.0));

        setTimeout(() => {
          navigate(`/test/result/${id}?uuid=${myUUID}`, {
            state: { result, title },
          });
        }, 5000);
      }

      console.log("res exam:", res?.data);
    } catch (error) {
      if (
        error?.response?.data?.statusCode === 400 &&
        error?.response?.data?.errors[0]?.message ===
          "The number of results is not enough"
      ) {
        message.warning("Vui lòng không bỏ trống câu hỏi!");
      } else if (
        error?.response?.data?.statusCode === 400 &&
        error?.response?.data?.errors[0]?.message === "Required"
      ) {
        message.warning("Vui lòng không bỏ trống câu hỏi!");
      } else {
        console.log("error:", error);
        message.error("Có lỗi xảy ra!");
      }
    }
  };

  const handleSubmitTest = () => {
    let checkNull = Object.values(results).some((o) => o === null);

    if (checkNull) {
      messageApi.open({
        type: "warning",
        content: "Vui lòng không bỏ trống câu hỏi!",
      });
    } else {
      const resultExam = [];
      results.map((result, idx) => {
        const tmp = {
          questionId: result?.questionId,
          answer: result?.answer,
        };
        resultExam[idx] = tmp;
      });
      handleSubmitExam(resultExam);
    }
  };
  return (
    <div
      className={`flex flex-col items-center w-full min-h-screen ${
        theme === "light" ? "bg-[#fff]" : "bg-bg-main-dark"
      }`}
    >
      {contextHolder}
      <QuestionList
        questions={questions}
        onClick={scrollToQuestion}
        selectedAnswers={selectedAnswers} // Truyền trạng thái đã chọn
      />
      <div className="fixed top-0 left-0 right-0 z-10 w-full min-h-16 bg-[#0056b3] text-bg-light flex items-center justify-between p-3 mb-8">
        <div className="bg-[#416df1] px-2 py-1 rounded-lg shadow-xl">
          Kiểm tra
        </div>
        <div className="flex flex-col items-center">
          <span>Bài kiểm tra học phần {title}</span>
          <span>Số câu: {lengthTest}</span>
        </div>
        <div
          onClick={() => navigate(-1)}
          className="w-8 h-8 border rounded-md flex items-center justify-center hover:bg-[#69bcfc44] cursor-pointer"
        >
          X
        </div>
      </div>
      <div className="w-full flex flex-col mt-28 items-center">
        {questions.map((ques, quesIdx) => (
          <div
            key={quesIdx}
            ref={(el) => (questionRefs.current[quesIdx] = el)}
            className="w-1/2 min-h-96 mb-5 bg-bg-light flex flex-col p-6 rounded-lg shadow-lg text-[#626380] "
          >
            <div className="w-full">
              <div className="flex items-center justify-between mb-3  ">
                <span className="text-sm font-bold">Thuật ngữ</span>
                <span>
                  {quesIdx + 1} / {lengthTest}
                </span>
              </div>
              <span>{ques.question}</span>
            </div>
            <div className="w-full flex-1 mt-10">
              <span className="text-sm font-bold">Chọn đáp án đúng</span>
              <div className="mt-5">
                <Row gutter={[16, 16]}>
                  {ques.options.map((opt, ansIdx) => (
                    <Col span={12} key={ansIdx}>
                      <div
                        className={`w-full h-full p-4 rounded-lg border hover:border-[#fc7536] cursor-pointer ${
                          selectedAnswers[quesIdx] === ansIdx
                            ? "bg-[#75b0ef]"
                            : ""
                        }`}
                        onClick={() =>
                          handleAnswerClick(quesIdx, ansIdx, ques.id, opt)
                        }
                      >
                        <span className="mr-3">{opt.id}</span>
                        <span className="text-[#000]">{opt}</span>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-10">
        <Button
          type="primary"
          size="large"
          onClick={() => {
            handleSubmitTest();
            setEndTime(Date.now());
          }}
        >
          Nộp bài
        </Button>
      </div>
    </div>
  );
};

export default TestScreen;
