import React from "react";
import VocabularyTab from "../tabcontents/VocabularyTab";

const VocabularyScreen = () => {
  return (
    <div className="text-2xl font-semibold">
      <div>Từ vựng của bạn</div>
      <VocabularyTab />
    </div>
  );
};

export default VocabularyScreen;
