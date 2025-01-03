import React from "react";
import { List } from "antd";
import { useSelector } from "react-redux";

const QuestionList = ({ questions, onClick, selectedAnswers }) => {
  console.log("check list: ", selectedAnswers[0]);
  const theme = useSelector((state) => state.theme.theme);

  return (
    <div
      className={`w-1/5 fixed left-0 top-28 ${
        theme === "light" ? "bg-[#fff]" : "bg-bg-main-dark"
      } shadow-md p-4 rounded-lg`}
    >
      <List
        bordered
        dataSource={questions}
        renderItem={(item, index) => (
          <List.Item
            onClick={() => onClick(index)}
            className={`cursor-pointer ${
              selectedAnswers[index] !== undefined
                ? "bg-[#c3f4d3]"
                : "bg-bg-light"
            }`}
            style={{
              padding: "10px",
              marginBottom: "8px",
              borderRadius: "5px",
              transition: "background-color 0.3s",
            }}
          >
            <span>Câu {index + 1}</span>
          </List.Item>
        )}
      />
    </div>
  );
};

export default QuestionList;
