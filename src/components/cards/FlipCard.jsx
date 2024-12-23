import React, { useState } from "react";
import { Card } from "antd";
import "./FlipCard.css";
import { readWord } from "../../utils/ReadWord";
import { FaVolumeUp } from "react-icons/fa";

const FlipCard = (item) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { name, meaning, pronounce } = item.item;
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="card-container" onClick={handleFlip}>
        <Card className={`flip-card ${isFlipped ? "flipped" : ""}`}>
          {!isFlipped ? (
            <div className="front">
              <p>
                {name} {pronounce}
              </p>
            </div>
          ) : (
            <div className="back">
              <p>{meaning}</p>
            </div>
          )}
        </Card>
      </div>
      {/* <div className={`${isFlipped?'hidden': ''}  w-3/5 ml-auto mr-auto flex items-center justify-end p-2`}>
            <FaVolumeUp style={{fontSize:'25px', cursor:'pointer',color: '#b1b1b1', marginRight:20, zIndex:100}}  onClick={() => readWord(word)}/>
        </div> */}
    </div>
  );
};

export default FlipCard;
