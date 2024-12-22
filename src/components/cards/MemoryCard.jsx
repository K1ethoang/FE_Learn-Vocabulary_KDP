import { Avatar, Card } from "antd";
import React from "react";
import { IoBrushOutline } from "react-icons/io5";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const MemoryCard = ({
  topic,
  openEditSetModal,
  openDeleteSetModal,
  setTopic,
}) => {
  const navigate = useNavigate();

  const accessCard = () => {
    navigate(`/studies/${topic?.id}`, {
      state: {
        id: topic?.id,
        title: topic?.title,
        description: topic?.description,
      },
    });
  };

  const handleOpenEditSetModal = () => {
    setTopic(topic);
    openEditSetModal();
  };

  const handleOpenDeleteSet = () => {
    setTopic(topic);
    openDeleteSetModal();
  };
  return (
    <div className="m-3 hover:bg-[#559ff4] cursor-pointer rounded-xl shadow-lg">
      <Card
        onClick={accessCard}
        extra={
          <div className="flex space-x-2">
            <div
              key="edit"
              className="z-50 w-9 h-9 flex items-center justify-center rounded-lg bg-bg-light hover:bg-gray-light cursor-pointer mr-4"
              style={{ border: "1px solid gray" }}
              onClick={(e) => {
                handleOpenEditSetModal();
                e.stopPropagation();
              }}
            >
              <IoBrushOutline size={22} />
            </div>

            <div
              key="delete"
              className="w-9 h-9 flex items-center justify-center rounded-lg bg-bg-light hover:bg-gray-light cursor-pointer "
              style={{ border: "1px solid gray" }}
              onClick={(e) => {
                handleOpenDeleteSet();
                e.stopPropagation();
              }}
            >
              <MdOutlineDeleteOutline size={22} />
            </div>
          </div>
        }
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
