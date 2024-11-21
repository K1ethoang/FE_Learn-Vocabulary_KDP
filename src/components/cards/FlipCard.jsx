import React, { useState } from "react";
import { Card } from "antd";
import './FlipCard.css'

const FlipCard = (item) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const {word, meaning, phonetic} = item.item
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="card-container" onClick={handleFlip}>
      <Card className={`flip-card ${isFlipped ? "flipped" : ""}`}>
        {!isFlipped ? (
          <div className="front">
            <p>{word} {phonetic}</p>
          </div>
        ) : (
          <div className="back">
            <p>{meaning}</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default FlipCard;
