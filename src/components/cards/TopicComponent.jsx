import { Divider } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const TopicComponent = ({ topic }) => {
  const navigate = useNavigate();
  const accessTopic = () => {
    navigate(`studies/${topic?.id}`, {
      state: {
        id: topic?.id,
        title: topic?.title,
        description: topic?.description,
      },
    });
  };
  return (
    <div
      onClick={accessTopic}
      className="w-full h-36 bg-[#4f8ff08c] hover:bg-[#559ff4] rounded-lg shadow-xl px-4 py-3 cursor-pointer"
    >
      <div className="w-full h-1/3  text-bg-black text-lg font-semibold">
        {topic?.title}
      </div>
      <Divider className="m-0 p-0 bg-bg-light" />
      <div
        className="max-w-fit mt-2 px-3 py-1 text-bg-light rounded-lg bg-[#8468fe]"
        style={{ border: "1px solid", borderColor: "white" }}
      >
        Mô tả: {topic?.description}
      </div>
    </div>
  );
};

export default TopicComponent;
