import { Divider, Input } from "antd";
import { useEffect, useRef, useState } from "react";
import { FaArrowAltCircleUp } from "react-icons/fa";
import "../chatbox/ChatBox.css";
import animation_logo_ai from "../../assets/images/animation_logo_ai.lottie";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const ChatBoxScreen = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you?", sender: "admin" },
    { text: "Hi! I need some help.", sender: "user" },
    { text: "Hello! How can I help you?", sender: "admin" },
    { text: "Hi! I need some help.", sender: "user" },
    { text: "Hello! How can I help you?", sender: "admin" },
    { text: "Hi! I need some help.", sender: "user" },
    { text: "Hello! How can I help you?", sender: "admin" },
    { text: "Hi! I need some help.", sender: "user" },
    { text: "Hello! How can I help you?", sender: "admin" },
    { text: "Hi! I need some help.", sender: "user" },
    { text: "Hello! How can I help you?", sender: "admin" },
    { text: "Hi! I need some help.", sender: "user" },
    { text: "Hello! How can I help you?", sender: "admin" },
    { text: "Hi! I need some help.", sender: "user" },
    {
      text: "“Bộ Quốc phòng Nga phải chuẩn bị trước mọi diễn biến, bao gồm khả năng xảy ra xung đột quân sự với NATO ở châu Âu trong thập kỷ tới”, ông Belousov nói trong cuộc họp với Tổng thống Nga Vladimir Putin.",
      sender: "admin",
    },
    { text: "Hi! I need some help.", sender: "user" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const height = window.screen.height;

  const messageContainerRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the message container whenever messages change
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);
  const handleSearch = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, { text: newMessage, sender: "user" }]);
      setNewMessage("");
    }
  };
  return (
    <div
      style={{ height: height * 0.7 }}
      className="w-4/5 mx-auto  text-gray-dark flex flex-col justify-between"
    >
      {/* <div className="w-full h-5/6  flex flex-col items-center justify-center">
        <div className=" flex items-center justify-center ">
          <span className="text-2xl uppercase font-semibold ">
            Hỏi bất cứ gì với trợ lý học tập KDP
          </span>
          <div className="w-14 h-14">
            <DotLottieReact src={animation_logo_ai} loop autoplay />
          </div>
        </div>

        <span className="text-sm text-gray">Design by...</span>
      </div> */}

      <div className="w-full h-5/6">
        <div ref={messageContainerRef} className="h-full p-4  scrollable ">
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
                  className="h-9 w-9 rounded-full"
                />
              )}
              <div
                className={`ml-2 p-2 rounded ${
                  message.sender === "user"
                    ? "bg-blue text-bg-light"
                    : "bg-gray-light text-gray-dark"
                }`}
              >
                <p className="max-w-lg">{message.text}</p>
              </div>
              {message.sender === "user" && (
                <img
                  src="https://placehold.co/30x30"
                  alt="User"
                  className="h-9 w-9 rounded-full ml-2"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="w-full">
        <Divider className="m-0 p-0 bg-[#d3d2d2]" />
        <Input
          allowClear
          onPressEnter={handleSearch}
          size="large"
          suffix={
            <FaArrowAltCircleUp
              size={22}
              className="cursor-pointer"
              onClick={handleSearch}
            />
          }
          placeholder="Nhập câu hỏi/ yêu cầu .... "
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="p-3 mt-3"
        />
      </div>
      {/* <div className="bg-gray-800 p-4 flex items-center">
        <Input
          type="text"
          className="bg-gray-700 text-white p-2 rounded-lg flex-grow mr-2"
          placeholder="Message ChatGPT"
        >
          <button className="bg-gray-700 p-2 rounded-full">
            <i className="fas fa-microphone text-white"></i>
          </button>
        </Input>
      </div> */}
    </div>
  );
};

export default ChatBoxScreen;
