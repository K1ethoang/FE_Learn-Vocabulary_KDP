import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import React, { useEffect } from "react";
import animationSplash from "./../../assets/images/animation_logo_ai.lottie";

const SplashScreen = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 900);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-bg-main">
      <div className="text-center">
        {/* Logo */}
        <DotLottieReact src={animationSplash} loop autoplay />

        {/* App Name */}
        <h1 className="text-bg-light text-3xl font-bold">
          Học Tiếng anh cùng KDP
        </h1>
        <p className="text-bg-light text-sm mt-2">
          Tận hưởng trải nghiệm tuyệt vời
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;
