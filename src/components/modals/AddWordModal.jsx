import { Input, Modal, Select } from "antd";
import React, { useState } from "react";

const AddWordModal = ({ openAddWordModal, handleCloseModal, idTopic }) => {
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const [typeWord, setTypeWord] = useState("noun");
  const [example, setExample] = useState("");
  const handleChange = (value) => {
    setTypeWord(value);
  };

  const clearValues = () => {
    setWord("");
    setMeaning("");
    setTypeWord("noun");
    setExample("");
  };
  const handleOK = () => {
    const newWord = {
      word,
      meaning,
      typeWord,
      example,
    };

    console.log("newWord:", newWord);
    clearValues();
    handleCloseModal();
  };

  return (
    <Modal
      title={`Thêm từ mới vào topic ${idTopic}`}
      centered
      open={openAddWordModal}
      onOk={handleOK}
      onCancel={handleCloseModal}
      width={700}
    >
      <div className=" w-full flex items-center justify-between">
        <div className="w-3/5 mb-3">
          <span>Thuật ngữ </span>
          <Input
            value={word}
            onChange={(e) => setWord(e.target.value)}
            placeholder="Nhập thuật ngữ"
          />
        </div>
        <div className="mb-3 flex flex-col">
          <span>Loại từ </span>
          <Select
            defaultValue={typeWord}
            style={{ width: 160 }}
            onChange={handleChange}
            options={[
              { value: "noun", label: "Danh từ" },
              { value: "adj", label: "Tính từ" },
              { value: "verb", label: "Động từ" },
              { value: "adv", label: "Trạng từ" },
            ]}
          />
        </div>
      </div>

      <div className="mb-3">
        <span>Định nghĩa </span>
        <Input
          value={meaning}
          onChange={(e) => setMeaning(e.target.value)}
          placeholder="Nhập định ngữ"
        />
      </div>

      <div className="mb-3">
        <span>Ví dụ (Nếu có)</span>
        <Input
          value={example}
          onChange={(e) => setExample(e.target.value)}
          placeholder="Nhập ví dụ (nếu có)"
        />
      </div>
    </Modal>
  );
};

export default AddWordModal;
