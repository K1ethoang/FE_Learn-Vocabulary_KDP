import { questions } from "../../assets/example_data/questions_fake";
import { Button, Col, Flex, Progress, Row } from "antd";

import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlineCheck, AiOutlineCloseCircle } from "react-icons/ai";
const ResultTestScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { result, title } = location.state;
  console.log("res", result, title);

  const percentCorrect = (result?.correctCount / result?.totalQuestions) * 100;
  const DisplayTime = ({ text, time }) => {
    const formattedTime = new Intl.DateTimeFormat("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false, // 24-hour format
    }).format(new Date(time));

    return (
      <div>
        {text} {formattedTime}
      </div>
    );
  };
  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-[#f6f7fb]">
      <div className="w-full min-h-16 bg-orange text-bg-light flex items-center justify-between p-3 mb-8">
        <div>Kết quả kiểm tra</div>
        <div className="flex flex-col items-center">
          <span>Học phần {title}</span>
          <span>Số câu: {result?.totalQuestions}</span>
        </div>
        <div></div>
      </div>

      <div className="mb-3">
        <DisplayTime text="Bắt đầu làm bài" time={result?.startAt} />
        <DisplayTime text="Kết thúc làm bài" time={result?.endAt} />
      </div>

      <Flex gap="small" wrap className="mb-10">
        <Progress
          className="mr-10 "
          type="circle"
          percent={percentCorrect}
          format={(percent) => (
            <span className="text-lg">Đúng {result?.correctCount} câu</span>
          )}
          strokeColor="green"
        />
        <Progress
          type="circle"
          percent={100 - percentCorrect}
          status="exception"
          format={(percent) => (
            <span className="text-lg">
              Sai {result?.totalQuestions - result?.correctCount} câu
            </span>
          )}
          strokeColor="#ff7849"
        />
      </Flex>

      {/* {
        questions.map((ques, quesIdx) => (
          <div
            key={quesIdx}
            className="w-1/2 min-h-96 mb-5 bg-bg-light flex flex-col p-6 rounded-lg shadow-lg text-[#626380]"
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
                        className={`w-full h-full flex items-center  p-4 rounded-lg border ${
                          ques.id === result[quesIdx]["ques"] &&
                          getAllCorrectOption[quesIdx]["idQues"]
                            ? data[quesIdx]["ans"] ===
                              getAllCorrectOption[quesIdx]["correctOption"]
                              ? opt.id ===
                                getAllCorrectOption[quesIdx]["correctOption"]
                                ? "bg-green"
                                : ""
                              : opt.id === data[quesIdx]["ans"]
                              ? "bg-[#ff3838]"
                              : opt.id ===
                                getAllCorrectOption[quesIdx]["correctOption"]
                              ? "bg-green"
                              : ""
                            : ""
                        }`}
                      >
                        <span className="mr-3">
                          {ques.id === data[quesIdx]["ques"] &&
                          getAllCorrectOption[quesIdx]["idQues"] ? (
                            data[quesIdx]["ans"] ===
                            getAllCorrectOption[quesIdx]["correctOption"] ? (
                              opt.id ===
                              getAllCorrectOption[quesIdx]["correctOption"] ? (
                                <AiOutlineCheck size={24} color="green" />
                              ) : (
                                opt.id
                              )
                            ) : opt.id === data[quesIdx]["ans"] ? (
                              <AiOutlineCloseCircle size={24} color="orange" />
                            ) : opt.id ===
                              getAllCorrectOption[quesIdx]["correctOption"] ? (
                              <AiOutlineCheck size={24} color="green" />
                            ) : (
                              opt.id
                            )
                          ) : (
                            opt.id
                          )}
                        </span>
                        <span className="text-[#000]">{opt.text}</span>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
            </div>
          </div>
        ))

      } */}

      <div className="mb-10 ">
        <Button
          className="mr-10"
          type="primary"
          size="large"
          onClick={() => navigate(-1)}
        >
          Kiểm tra lại
        </Button>
        <Button type="default" size="large" onClick={() => navigate("/")}>
          Trở về trang chủ
        </Button>
      </div>
    </div>
  );
};

export default ResultTestScreen;
