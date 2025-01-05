import { message } from "antd";
import React from "react";
import { FaRegCopy } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const ResetPassword = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get("token");

  const handleCopy = async (token) => {
    try {
      await navigator.clipboard.writeText(token); // Copy text vào clipboard
      message.success("Đã sao chép vào clipboard!");
    } catch (err) {
      message.error("Không thể sao chép, vui lòng thử lại!");
      console.log(err);
    }
  };
  return (
    <div className="w-full h-screen text-lg bg-bg-main text-bg-light flex items-center justify-center">
      Mã xác nhận reset của bạn là:
      <div className="w-fit p-2 border rounded-lg ml-2 mr-3">
        <b>{token}</b>
      </div>
      <div className="cursor-pointer " onClick={() => handleCopy(token)}>
        <FaRegCopy size={20} />
      </div>
    </div>
  );
};

export default ResetPassword;
