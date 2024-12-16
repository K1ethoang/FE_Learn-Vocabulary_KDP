import React, { useState } from "react";
import { questions } from "../../assets/example_data/questions_fake";
import { Affix, Button, Col, message, Row } from "antd";
import { v4 as uuidv4 } from "uuid";
import { useNavigate, useParams } from "react-router-dom";
const TestScreen = () => {
  const lengthTest = questions.length;
  const [results, setResults] = React.useState(Array(lengthTest).fill(null));
  const [selectedAnswers, setSelectedAnswers] = React.useState(
    Array(lengthTest).fill(null)
  );
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const myUUID = uuidv4();
  const { id } = useParams();

  const handleAnswerClick = (questionIndex, answerIndex, numQues, numAns) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[questionIndex] = answerIndex;
    setSelectedAnswers(newSelectedAnswers);

    const newResult = [...results];
    newResult[questionIndex] = {
      ques: numQues,
      ans: numAns,
    };
    setResults(newResult);
  };
  console.log(selectedAnswers);
  console.log(results);

  const handleSubmitTest = () => {
    let checkNull = Object.values(results).some((o) => o === null);
    if (checkNull) {
      messageApi.open({
        type: "warning",
        content: "Vui lòng không bỏ trống câu hỏi!",
      });
    } else {
      messageApi
        .open({
          type: "loading",
          content: "Nộp bài ...",
          duration: 2.5,
        })
        .then(() => message.success("Nộp thành công.", 2.5))
        .then(() => message.info("Chuyến sang trang kết quả.", 2.0));

      setTimeout(() => {
        navigate(`/test/result/${id}?uuid=${myUUID}`, { state: results });
      }, 5000);
    }
  };
  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-[#F0F8FF]">
      {contextHolder}

      <div className="fixed top-0 left-0 right-0 z-10 w-full min-h-16 bg-[#0056b3] text-bg-light flex items-center justify-between p-3 mb-8">
        <div className="bg-[#416df1] px-2 py-1 rounded-lg shadow-xl">
          Kiểm tra
        </div>
        <div className="flex flex-col items-center">
          <span>Title of topic test</span>
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
            className="w-1/2 min-h-96 mb-5 bg-bg-light flex flex-col p-6 rounded-lg shadow-lg text-[#626380] "
          >
            <div className="w-full">
              <div className="flex items-center justify-between mb-3  ">
                <span className="text-sm font-bold">Thuật ngữ</span>
                <span>
                  {quesIdx + 1} / {lengthTest}
                </span>
              </div>
              <span>{ques.definition}</span>
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
                          handleAnswerClick(quesIdx, ansIdx, ques.id, opt.id)
                        }
                      >
                        <span className="mr-3">{opt.id}</span>
                        <span className="text-[#000]">{opt.text}</span>
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
        <Button type="primary" size="large" onClick={handleSubmitTest}>
          Nộp bài
        </Button>
      </div>
    </div>
  );
};

export default TestScreen;
