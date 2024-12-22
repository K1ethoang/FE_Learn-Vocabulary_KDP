import React, { useEffect } from "react";
import MemoryCard from "../cards/MemoryCard";
import { Select, Divider, Input } from "antd";

const ModuleTab = ({ topics }) => {
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
        />
      </div>
      <Divider />

      {topics.map((topic, idx) => (
        <MemoryCard key={idx} topic={topic} />
      ))}
    </div>
  );
};

export default ModuleTab;
