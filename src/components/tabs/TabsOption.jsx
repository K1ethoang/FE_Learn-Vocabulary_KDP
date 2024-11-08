import React from 'react';
import { Tabs } from 'antd';
import ExceptionScreen from '../exceptions/ExceptionScreen';
import ModuleTab from '../tabcontents/ModuleTab';
const onChange = (key) => {
  console.log(key);
};
const items = [
  {
    key: '1',
    label: 'Học phần',
    children: <ModuleTab/>
  },
  {
    key: '2',
    label: 'Lời giải chuyên gia',
    children: 'Content of Tab Pane 2',
  },
  {
    key: '3',
    label: 'Thư mục',
    children: 'Content of Tab Pane 3',
  },
   {
    key: '4',
    label: 'Lớp học',
    children: <ExceptionScreen/>,
  },
];
const TabsOption = () => <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
export default TabsOption;