import React from "react";
import { Button, Dropdown } from "antd";
import {
  PlusOutlined,
  BookOutlined,
  FolderOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const MenuDropdown = () => {
  const navigate = useNavigate();
  const handleOpenSet = () => {
    navigate("/create-set");
  };

  const handleOpenFolder = () => {
    navigate("/user/folders");
  };

  const handleOpenClass = () => {
    navigate("/user/classroom");
  };
  const items = [
    {
      label: (
        <span
          className="w-36 h-8 flex items-center justify-start font-semibold"
          onClick={handleOpenSet}
        >
          Học phần
        </span>
      ),
      key: "1",
      icon: <BookOutlined style={{ fontSize: 15 }} />,
    },
    {
      label: (
        <span
          onClick={handleOpenFolder}
          className="w-36 h-8 flex items-center justify-start font-semibold"
        >
          Thư mục
        </span>
      ),
      key: "2",
      icon: <FolderOutlined style={{ fontSize: 15 }} />,
    },
    {
      label: (
        <span
          onClick={handleOpenClass}
          className=" w-36 h-8 flex items-center justify-start font-semibold"
        >
          Lớp
        </span>
      ),
      key: "3",
      icon: <TeamOutlined style={{ fontSize: 15 }} />,
    },
  ];

  return (
    <div>
      <Dropdown menu={{ items }} trigger={["click"]} placement="bottomLeft">
        <Button
          type="primary"
          shape="circle"
          icon={<PlusOutlined />}
          size="large"
        />
      </Dropdown>
    </div>
  );
};

export default MenuDropdown;
