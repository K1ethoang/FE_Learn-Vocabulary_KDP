import { Avatar, Divider, Input, message } from "antd";
import { useEffect, useRef, useState } from "react";
import { FaArrowAltCircleUp } from "react-icons/fa";
import "../chatbox/ChatBox.css";
import animation_logo_ai from "../../assets/images/animation_logo_ai.lottie";
import animation_loading_dots from "../../assets/images/animation_loading_dots.lottie";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useAuth } from "../../providers/AuthProvider";
import axios from "axios";

const ChatBoxScreen = () => {
  const { user } = useAuth();
  console.log("user", user);
  const [historyChat, setHistoryChat] = useState();

  const getHistoryChats = async () => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/api/v1/conversations/history/${user?.email}`
      );

      if (res.status === 200) {
        setHistoryChat(res?.data?.messages);
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  useEffect(() => {
    getHistoryChats();
  }, [user?.email]);

  const [newMessage, setNewMessage] = useState("");
  const height = window.screen.height;

  const messageContainerRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the message container whenever messages change
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [historyChat]);

  const handleChat = async (username, message) => {
    setHistoryChat((prev) => [
      ...prev,
      {
        role: "user",
        content: message,
      },
      {
        role: "assistant",
        content: "loading",
      },
    ]);

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/v1/conversations/chat/",
        {
          username: username,
          message: message,
        }
      );

      // Cập nhật lại tin nhắn của assistant với phản hồi từ API
      setHistoryChat((prev) => {
        const updatedChat = [...prev];

        const lastIndex = updatedChat.findIndex(
          (chat) => chat.role === "assistant" && chat.content === "Đang chờ..."
        );
        if (lastIndex !== -1) {
          updatedChat[lastIndex] = {
            role: "assistant",
            content: res?.data?.bot_response,
          };
        }
        return updatedChat;
      });
    } catch (error) {
      console.log("error:", error);

      setHistoryChat((prev) => {
        const updatedChat = [...prev];
        const lastIndex = updatedChat.findIndex(
          (chat) => chat.role === "assistant" && chat.content === "Đang chờ..."
        );
        if (lastIndex !== -1) {
          updatedChat[lastIndex] = {
            role: "assistant",
            content: "Có lỗi xảy ra. Vui lòng thử lại.",
          };
        }
        return updatedChat;
      });
    }
  };

  const handleSearch = () => {
    if (newMessage.trim()) {
      handleChat(user?.email, newMessage);
      setNewMessage(""); // Xóa nội dung input sau khi gửi
    }
  };
  return (
    <div
      style={{ height: height * 0.7 }}
      className="w-4/5 mx-auto  text-gray-dark flex flex-col justify-between"
    >
      {historyChat === undefined || historyChat.length === 0 ? (
        <div className="w-full h-5/6  flex flex-col items-center justify-center">
          <div className=" flex items-center justify-center ">
            <span className="text-2xl uppercase font-semibold ">
              Hỏi bất cứ gì với trợ lý học tập KDP
            </span>
            <div className="w-14 h-14">
              <DotLottieReact src={animation_logo_ai} loop autoplay />
            </div>
          </div>

          <span className="text-sm text-gray">Design by...</span>
        </div>
      ) : (
        <div className="w-full h-5/6">
          <div ref={messageContainerRef} className="h-full p-4  scrollable ">
            {historyChat?.map((message, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  message.role === "user" ? "flex justify-end" : "flex"
                }`}
              >
                {message.role === "assistant" && (
                  <img
                    src="/assets/images/avatar_chatbot.jpg"
                    alt="Assistant"
                    className="h-9 w-9 rounded-full"
                  />
                )}
                <div
                  className={`ml-2 p-2 rounded ${
                    message.role === "user"
                      ? "bg-blue text-bg-light"
                      : "bg-gray-light text-gray-dark"
                  }`}
                >
                  {message.content === "loading" ? (
                    // <div className="w-16 h-8 flex items-center justify-center m-0 p-0">
                    <DotLottieReact
                      src={animation_loading_dots}
                      loop
                      autoplay
                      className="w-14 h-6 m-0 p-2"
                    />
                  ) : (
                    // </div>
                    <p className="max-w-lg  break-words">{message.content}</p>
                  )}
                </div>
                {message.role === "user" && (
                  <Avatar
                    className="ml-3 bg-purple"
                    size="large"
                    src={user?.avatar}
                  >
                    {user?.avatar
                      ? ""
                      : user?.fullName?.charAt(0).toUpperCase()}
                  </Avatar>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

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
