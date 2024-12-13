import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import React from "react";
import animationBuilding from "./../../assets/images/animation_building.lottie";
const BuildingScreen = () => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <span className="text-2xl text-orange font-bold">
          Page is building...
        </span>
        <div className="w-4/5 h-4/5">
          <DotLottieReact src={animationBuilding} loop autoplay />
        </div>
      </div>
    </div>
  );
};

export default BuildingScreen;
