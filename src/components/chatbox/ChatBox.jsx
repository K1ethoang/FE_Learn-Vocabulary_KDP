import { Divider, Input } from "antd";
import { useState } from "react";
import { GiOwl } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import { LuSendHorizontal } from "react-icons/lu";

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className=" fixed bottom-8 right-8 z-50 shadow-2xl flex flex-col justify-end items-end ">
      {isOpen && (
        <div className="w-full h-96 bg-bg-light">
          <iframe
            src="https://m.dict.laban.vn"
            className="w-full h-full"
            title="Dictionary"
          ></iframe>
        </div>
      )}

      <button
        className="w-14 h-14 bg-blue p-3   text-[#fff] rounded-full shadow-lg flex items-center justify-center"
        onClick={handleOpen}
      >
        <GiOwl size={30} />
      </button>

      {/* {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white w-11/12 h-5/6 rounded-lg overflow-hidden">
            <div className="flex justify-between items-center bg-blue-500 text-white p-2">
              <span className="font-semibold">Dictionary</span>
              <button className="text-white" onClick={() => setIsOpen(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>

          </div>
        </div>
      )} */}
    </div>
  );
};

export default ChatBox;
