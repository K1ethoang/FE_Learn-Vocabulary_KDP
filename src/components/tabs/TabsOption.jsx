import React from "react";
import { Tabs } from "antd";
import ExceptionScreen from "../exceptions/ExceptionScreen";
import ModuleTab from "../tabcontents/ModuleTab";
import VocabularyTab from "../tabcontents/VocabularyTab";
import FolderScreen from "../screens/FolderScreen";
import ClassroomScreen from "../screens/ClassroomScreen";
const onChange = (key) => {
  console.log(key);
};
const items = [
  {
    key: "1",
    label: "Học phần",
    children: <ModuleTab />,
  },
  {
    key: "2",
    label: "Kho từ vựng",
    children: <VocabularyTab />,
  },
  {
    key: "3",
    label: "Thư mục",
    children: <FolderScreen />,
  },
  {
    key: "4",
    label: "Lớp học",
    children: <ClassroomScreen />,
  },
];
const TabsOption = () => (
  <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
);
export default TabsOption;
