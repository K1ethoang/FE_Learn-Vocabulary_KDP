import React, { useState } from "react";
import ListWordComponent from "../words/ListWordComponent";
import { Input, List } from "antd";
import data from "./../../assets/example_data/fake_data_word.json";
import { FaVolumeUp } from "react-icons/fa";
import { DeleteOutlined } from "@ant-design/icons";
import { readWord } from "../../utils/ReadWord";
import DeleteModal from "../modals/DeleteModal";

const VocabularyTab = () => {
  const [filteredVocabulary, setFilteredVocabulary] = React.useState(data);
  const [searchTerm, setSearchTerm] = React.useState("");

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [word, setWord] = useState("");
  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleDeleteWord = (word) => {
    setOpenDeleteModal(true);
    setWord(word);
  };

  const debounce = (func, wait) => {
    let timeout;
    return function (...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  };

  const handleSearch = debounce((value) => {
    if (value === "") {
      setFilteredVocabulary(data);
    } else {
      const filteredList = data.filter(
        (item) =>
          item.word.toLowerCase().includes(value) ||
          item.meaning.toLowerCase().includes(value)
      );
      setFilteredVocabulary(filteredList);
    }
  }, 300);

  const handleChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    handleSearch(value);
  };

  return (
    <div className="w-4/5 flex flex-col justify-center  ml-auto mr-auto">
      <div className="w-full flex justify-end mb-5">
        <Input
          value={searchTerm}
          onChange={handleChange}
          style={{ width: 400 }}
          size="large"
          placeholder="Tìm kiếm từ vựng hoặc theo nghĩa"
        />
      </div>

      {
        <List
          size="small"
          bordered
          dataSource={filteredVocabulary}
          renderItem={(item) => (
            <List.Item key={item.word}>
              <div className="w-full h-12  flex items-center justify-between ">
                <div className="flex flex-col items-center justify-between ">
                  <span className="font-bold text-base">{item.word}</span>
                  <span className="text-gray">{item.phonetic}</span>
                </div>

                <div>
                  <span>{item.meaning}</span>
                </div>

                <div className="flex">
                  <FaVolumeUp
                    style={{
                      fontSize: "25px",
                      cursor: "pointer",
                      color: "#1877F2",
                      marginRight: 10,
                    }}
                    onClick={() => readWord(item.word)}
                  />
                  <DeleteOutlined
                    style={{
                      fontSize: "25px",
                      cursor: "pointer",
                      color: "#f35757",
                    }}
                    onClick={() => handleDeleteWord(item.word)}
                  />
                </div>
              </div>
            </List.Item>
          )}
        />
      }
      <DeleteModal
        openDeleteModal={openDeleteModal}
        handleCloseDeleteModal={handleCloseDeleteModal}
        word={word}
      />
    </div>
  );
};

export default VocabularyTab;
