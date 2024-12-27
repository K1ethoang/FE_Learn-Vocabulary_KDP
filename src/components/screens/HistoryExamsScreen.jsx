import { message, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosConfig from "../../services/axios/axiosConfig";

const HistoryExamsScreen = () => {
  const location = useLocation();
  const { title, id } = location.state;
  const [exams, setExams] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const handleGetAllExamInTopic = async (idTopic) => {
    try {
      setIsLoading(true);
      const res = await axiosConfig.get(`/exams?topicId=${idTopic}`);

      if (res?.data?.statusCode === 200) {
        setExams(res?.data?.result);
      }
    } catch (error) {
      console.log("error:", error);
      message.error("Có lỗi xảy ra!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetAllExamInTopic(id);
  }, [id]);

  console.log("exams", exams);

  const columns = [
    {
      title: "Mã bài kiểm tra",
      dataIndex: "idExam",
    },
    {
      title: "Thời gian tạo",
      dataIndex: "time",
    },
    {
      title: "Tỉ lệ câu đúng/Tổng câu",
      dataIndex: "percent",
    },
  ];
  useEffect(() => {
    if (exams.length > 0) {
      const newData = exams.map((exam, idx) => ({
        key: idx,
        idExam: exam?.id,
        time: exam?.startAt,
        percent: `${exam?.correctCount} / ${exam?.totalQuestions} `,
      }));
      setData(newData); // Cập nhật data chỉ một lần
    }
  }, [exams]); // Chỉ chạy khi exams thay đổi

  return (
    <div className="w-full h-screen bg-[#f7f6f6]">
      <div className="w-full h-16 bg-blue flex items-center justify-between text-bg-light  ">
        {" "}
        <div
          onClick={() => navigate(-1)}
          className="px-2 py-1 ml-2 cursor-pointer text-base rounded-md border hover:bg-[#3a91dd]"
        >
          Quay lại
        </div>
        <div className=" uppercase text-lg font-semibold">
          Bài kiểm tra đã thực hiện trong học phần {title}
        </div>
        <div></div>
      </div>
      <div className="w-2/3  ml-auto mr-auto mt-10">
        <Table
          className="shadow-xl"
          bordered
          borderColor="#000"
          pagination={false}
          columns={columns}
          dataSource={data}
          size="large"
        />
      </div>
    </div>
  );
};

export default HistoryExamsScreen;
