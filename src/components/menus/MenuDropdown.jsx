import React from "react";
import { Button, ConfigProvider, Dropdown, Menu } from "antd";
import {
  PlusOutlined,
  BookOutlined,
  FolderOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const MenuDropdown = () => {
  const navigate = useNavigate();
  const theme = useSelector((state) => state.theme);
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
      <ConfigProvider
        theme={{
          token: {
            colorBgBase: theme.theme === "dark" ? "#01203e" : "#ffffff",
            colorTextBase: theme.theme === "dark" ? "#ffffff" : "#000000",
          },
        }}
      >
        <Dropdown menu={{ items }} trigger={["click"]} placement="bottomLeft">
          <Button
            type="primary"
            shape="default"
            icon={<PlusOutlined />}
            size="large"
          />
        </Dropdown>
      </ConfigProvider>
    </div>
  );
};

export default MenuDropdown;
