import React, { useEffect } from "react";
import MemoryCard from "../cards/MemoryCard";
import { Select, Divider, Input } from "antd";

const ModuleTab = ({
  topics,
  openEditSetModal,
  openDeleteSetModal,
  setTopic,
}) => {
  const [filteredSets, setFilteredSets] = React.useState(topics);

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
      setFilteredSets(topics);
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
  // const handleChange = (value) => {
  //   console.log(`selected ${value}`);
  // };

  return (
    <div>
      <div className="flex justify-between items-center">
        <div></div>
        {/* <Select
          defaultValue="Gần đây"
          style={{ width: 160 }}
          onChange={handleChange}
          options={[
            { value: "created", label: "Đã tạo" },
            { value: "current", label: "Gần đây" },
            { value: "studied", label: "Đã học" },
          ]}
        /> */}
        <Input
          style={{ width: 400 }}
          size="large"
          placeholder="Tìm kiếm thẻ nhớ"
          enterButton
          onChange={handleChange}
        />
      </div>
      <Divider />

      {filteredSets.map((topic, idx) => (
        <MemoryCard
          key={idx}
          topic={topic}
          openEditSetModal={openEditSetModal}
          openDeleteSetModal={openDeleteSetModal}
          setTopic={setTopic}
        />
      ))}
    </div>
  );
};

export default ModuleTab;
