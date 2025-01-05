import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import React from "react";
import animationEmty from "./../../assets/images/animation_emty.lottie";
const EmtySets = ({ message }) => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <span className="text-2xl text-orange font-bold">{message}</span>
        <div className="w-4/5 h-4/5">
          <DotLottieReact src={animationEmty} loop autoplay />
        </div>
      </div>
    </div>
  );
};

export default EmtySets;
