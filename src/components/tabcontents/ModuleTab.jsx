import React, { useEffect, useState } from "react";
import MemoryCard from "../cards/MemoryCard";
import { Select, Divider, Input } from "antd";

const ModuleTab = ({
  topics,
  openEditSetModal,
  openDeleteSetModal,
  setTopic,
}) => {
  const [filteredSets, setFilteredSets] = useState(topics);

  // Cập nhật `filteredSets` mỗi khi `topics` thay đổi
  useEffect(() => {
    setFilteredSets(topics);
  }, [topics]);

  // Debounce function
  const debounce = (func, wait) => {
    let timeout;
    return function (...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  };

  // Xử lý tìm kiếm
  const handleSearch = debounce((value) => {
    if (value === "") {
      setFilteredSets(topics); // Hiển thị tất cả khi không nhập gì
    } else {
      const filteredList = topics.filter(
        (item) =>
          item.title.toLowerCase().includes(value) ||
          item.description.toLowerCase().includes(value)
      );
      setFilteredSets(filteredList);
    }
  }, 300);

  const handleChange = (event) => {
    const value = event.target.value.toLowerCase();
    handleSearch(value);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <div></div>
        <Input
          style={{ width: 400 }}
          size="large"
          placeholder="Tìm kiếm thẻ nhớ"
          enterButton
          onChange={handleChange}
        />
      </div>
      <Divider />

      {filteredSets.length > 0 ? (
        filteredSets.map((topic, idx) => (
          <MemoryCard
            key={idx}
            topic={topic}
            openEditSetModal={openEditSetModal}
            openDeleteSetModal={openDeleteSetModal}
            setTopic={setTopic}
          />
        ))
      ) : (
        <div>Không tìm thấy học phần nào!</div>
      )}
    </div>
  );
};

export default ModuleTab;
