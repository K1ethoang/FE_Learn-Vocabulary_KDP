import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import animationFile from "./../assets/images/animation_login.lottie";
import { notification } from "antd";
import { FrownOutlined } from "@ant-design/icons";
import LoginForm from "../components/auth/LoginForm";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

const LoginScreen = () => {
  // const token = localStorage.getItem("token");

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
    // if (token) {
    //   console.log("here login");
    //   window.location.href = "/";
    // }
  }, [navigate, isAuthenticated]);

  const [api, contextHolder] = notification.useNotification();
  const openNotification = () => {
    api.warning({
      message: "Thông báo đăng nhập",
      description: "Tài khoản hoặc mật khẩu của bạn không đúng.",
      icon: (
        <FrownOutlined
          style={{
            color: "#ff1c00",
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
          <div className="bg-[rgba(92,192,79,0.4)] p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-semibold text-center mb-6 text-bg-light">
              Đăng nhập
            </h2>
            <LoginForm openNotification={openNotification} />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginScreen;
