import React from "react";
import RegisterForm from "../components/auth/RegisterForm";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { SmileOutlined } from "@ant-design/icons";
import animationFile from "./../assets/images/animation_register.lottie";
import { notification } from "antd";

const RegisterScreen = () => {
  const [api, contextHolder] = notification.useNotification();
  const openNotification = () => {
    api.warning({
      message: "Thông báo đăng kí",
      description: "Vui lòng kiểm tra email để xác minh tài khoản!",
      icon: (
        <SmileOutlined
          style={{
            color: "blue",
          }}
        />
      ),
    });
  };

  return (
    <>
      {contextHolder}
      <div className="flex flex-col md:flex-row items-center justify-center w-full h-screen p-4 bg-bg-main">
        <div className="hidden md:block md:w-1/2 p-4">
          <DotLottieReact src={animationFile} loop autoplay />
        </div>

        <div className="flex flex-col items-center  md:w-1/2 p-4 ">
          <div className="flex items-center mb-8">
            <i className="fas fa-lock text-2xl text-[#ace1ff]"></i>
            <span className="ml-2 text-4xl font-semibold text-[#fff]">
              Xin chào đến KDP
            </span>
          </div>
          <div className=" bg-[#02020266] p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-semibold text-center mb-6 text-bg-light">
              Đăng kí
            </h2>
            <RegisterForm openNotification={openNotification} />
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterScreen;
