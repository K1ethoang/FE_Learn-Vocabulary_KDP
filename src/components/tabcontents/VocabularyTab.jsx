import React, { useState } from "react";
import { Input, List } from "antd";
import data from "./../../assets/example_data/fake_data_word.json";
import { FaVolumeUp } from "react-icons/fa";
import { readWord } from "../../utils/ReadWord";
import DeleteModal from "../modals/DeleteModal";
import { MdOutlineDeleteOutline } from "react-icons/md";

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
              <div className="w-full max-h-fit  flex items-center justify-between ">
                <div className="flex flex-col items-start ">
                  <div className="flex items-center mb-2">
                    <span className="font-bold text-base">{item.word}</span>
                    <span className="text-gray ml-2">{item.phonetic}</span>
                    <div className="w-7 h-7 flex items-center justify-center rounded-lg ml-3 bg-[#88beff]">
                      <FaVolumeUp
                        style={{
                          fontSize: "16px",
                          cursor: "pointer",
                          color: "blue",
                        }}
                        onClick={() => readWord(item.word)}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col items-start">
                    <span className="font-semibold">Định nghĩa:</span>
                    <span>{item.meaning}</span>
                  </div>
                  <span className="">Ví dụ: He is handsome!!!</span>
                </div>

                <div className="flex w-30 items-center justify-around">
                  {/* <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#9cffb9]">
                    <LuPencilLine
                      style={{
                        fontSize: "18px",
                        cursor: "pointer",
                        marginRight: 10,
                        color: "green",
                      }}
                      onClick={() => handleEditWord(item)}
                    />
                  </div> */}

                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#ffb58b] ml-2">
                    <MdOutlineDeleteOutline
                      style={{
                        fontSize: "22px",
                        cursor: "pointer",
                        color: "red",
                      }}
                      onClick={() => handleDeleteWord(item.word)}
                    />
                  </div>
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

      {/* <EditWordModal
        openEditWordModal={isOpenEditModal}
        handleCloseModal={handleCloseModal}
        data={item}
      /> */}
    </div>
  );
};

export default VocabularyTab;
