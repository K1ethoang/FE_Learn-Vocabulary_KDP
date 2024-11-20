import React, { useState } from "react";
import { Card } from "antd";
import './FlipCard.css'

const FlipCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="card-container" onClick={handleFlip}>
      <Card className={`flip-card ${isFlipped ? "flipped" : ""}`}>
        {!isFlipped ? (
          <div className="front">
            <p>above (prep., adv). /əˈbʌv/</p>
          </div>
        ) : (
          <div className="back">
            <p>ở trên, lên trên</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default FlipCard;
