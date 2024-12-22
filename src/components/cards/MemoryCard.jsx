import { Avatar, Card } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const MemoryCard = ({ topic }) => {
  console.log("topic", topic);
  const navigate = useNavigate();
  const accessCard = () => {
    navigate(`/studies/${topic?.id}`);
  };
  return (
    <div
      onClick={accessCard}
      className="m-3 hover:bg-[#559ff4] cursor-pointer rounded-xl shadow-lg"
    >
      <Card
        style={{
          backgroundColor: "#4f8ff08c",
          boxShadow: "0 25px 50px -12px rgb(0.1 0.1 0.1 / 0.08)",
        }}
        title={topic?.title}
        bordered={false}
      >
        <div
          className=" max-w-fit pl-2 pr-2 pt-1 pb-1 rounded-2xl bg-[#7a76f3]"
          style={{ border: "1px solid", borderColor: "#ffed61" }}
        >
          <div className="text-sm text-slate-400 px-3 text-bg-light">
            Mô tả: {topic?.description ? topic?.description : "Không có"}
          </div>
        </div>
        {/* <div className="mt-4 flex justify-start items-center">
          <Avatar style={{ marginRight: "6px" }}>A</Avatar>

        </div> */}
      </Card>
    </div>
  );
};

export default MemoryCard;
