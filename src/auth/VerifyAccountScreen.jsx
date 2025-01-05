import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import React, { useState } from "react";
import animation_verify_email from "../assets/images/animation_verify_email.lottie";
import animation_verify_success from "../assets/images/animation_verify_success.lottie";
import { Button, Input, message } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import axiosConfig from "../services/axios/axiosConfig";

const VerifyAccountScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const token = params.get("token");
  const email = params.get("email");
  const [success, setSuccess] = useState(false);

  const verifyAccount = async (token, email) => {
    try {
      const res = await axiosConfig.post(
        `/auth/verify-account?token=${token}&email=${email}`
      );

      if (res?.data.statusCode === 200) {
        setSuccess(true);
      }
    } catch (error) {
      message.error("Có lỗi xảy ra!");
      console.log("error", error);
    }
  };
  const handleVerifyAccount = () => {
    verifyAccount(token, email);
  };
  return (
    <div className="w-full h-screen bg-[#155329] m-0 p-0 flex flex-col items-center justify-start">
      {!success ? (
        <>
          <div className=" w-2/3  ">
            <DotLottieReact
              src={animation_verify_email}
              loop
              autoplay
            ></DotLottieReact>
          </div>
          <div className="absolute bottom-1/2 text-lg font-semibold text-bg-light">
            Xác minh tài khoản
          </div>
          <div className="absolute bottom-1/3">
            <Button onClick={handleVerifyAccount} type="primary" size="large">
              Xác minh
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className=" w-2/4 ">
            <DotLottieReact
              src={animation_verify_success}
              loop
              autoplay
            ></DotLottieReact>
          </div>
          <div className="absolute top-1/2 text-lg font-semibold text-bg-light">
            Xác minh tài khoản thành công.
            <div className="flex justify-center items-center mt-2">
              <Button
                type="primary"
                size="large"
                onClick={() => navigate("/login", { replace: true })}
              >
                Đến trang đăng nhập
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default VerifyAccountScreen;
