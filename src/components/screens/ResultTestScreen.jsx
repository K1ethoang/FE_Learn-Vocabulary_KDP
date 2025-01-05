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
