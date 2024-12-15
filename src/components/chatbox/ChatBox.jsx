import { Divider, Input } from "antd";
import { useState } from "react";
import { GiOwl } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import { LuSendHorizontal } from "react-icons/lu";

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you?", sender: "admin" },
    { text: "Hi! I need some help.", sender: "user" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleAnswer = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, { text: newMessage, sender: "user" }]);
      setNewMessage("");
    }
  };

  return (
    <div className=" fixed bottom-8 right-8 z-50 shadow-2xl flex flex-col justify-end items-end">
      {!isOpen && (
        <button
          className="w-14 h-14 bg-blue p-3  text-[#fff] rounded-full shadow-lg flex items-center justify-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          <GiOwl size={30} />
        </button>
      )}

      {isOpen && (
        <div className="mt-2 w-80  bg-[#fff] rounded-lg shadow-lg">
          <div className="p-4  flex justify-between items-center">
            <h3 className="font-bold text-gray-dark">Chatbox</h3>
            <button onClick={() => setIsOpen(false)}>
              <IoCloseSharp size={24} color="gray" />
            </button>
          </div>
          <Divider className="m-0 p-0 bg-[#d3d2d2]" />

          {/* mess content */}
          <div className="p-4 h-64 overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  message.sender === "user" ? "flex justify-end" : "flex"
                }`}
              >
                {message.sender === "admin" && (
                  <img
                    src="https://placehold.co/30x30"
                    alt="Admin"
                    className="h-8 w-8 rounded-full"
                  />
                )}
                <div
                  className={`ml-2 p-2 rounded ${
                    message.sender === "user"
                      ? "bg-blue text-bg-light"
                      : "bg-gray-light text-gray-dark"
                  }`}
                >
                  <p>{message.text}</p>
                </div>
                {message.sender === "user" && (
                  <img
                    src="https://placehold.co/30x30"
                    alt="User"
                    className="h-8 w-8 rounded-full ml-2"
                  />
                )}
              </div>
            ))}
          </div>
          {/* mess content */}
          <Divider className="m-0 p-0 bg-[#d3d2d2]" />

          <div className="p-4 flex items-center justify-between">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onPressEnter={handleAnswer}
              placeholder="Nhập điều bạn muốn hỏi?"
              allowClear
            />
            <LuSendHorizontal
              className="ml-5 cursor-pointer"
              color="blue"
              size={20}
              onClick={handleAnswer}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
