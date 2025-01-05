import React, { useEffect } from "react";
import { Avatar, ConfigProvider, Dropdown } from "antd";
import {
  UserOutlined,
  TrophyOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useAuth } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const MenuProfileExpend = () => {
  const { user } = useAuth();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const theme = useSelector((state) => state.theme);

  const handleSetting = () => {
    navigate("/setting");
  };

  const handleAchievement = () => {
    navigate("/achievements");
  };

  const handlePrivacy = () => {
    navigate("/privacy");
  };

  const handleSupport = () => {
    navigate("/support");
  };

  const handleUpgarde = () => {
    navigate("/upgrade");
  };
  const items = [
    {
      label: (
        <div className="flex items-center justify-start w-60">
          <Avatar
            size="large"
            shape="circle"
            style={{ backgroundColor: "blue" }}
            src={user?.avatar}
          >
            {user?.avatar ? "" : user?.fullName?.charAt(0).toUpperCase()}
          </Avatar>
          <span className="text-lg font-bold pl-1">{user?.fullName}</span>
        </div>
      ),
      key: "1",
      disabled: true,
    },
    {
      type: "divider",
    },

    {
      label: (
        <span
          onClick={handleSetting}
          className="w-36 h-8 flex items-center justify-start"
        >
          Cài đặt
        </span>
      ),
      key: "2",
      icon: <SettingOutlined style={{ fontSize: 15 }} />,
    },
    {
      type: "divider",
    },
    {
      key: "3",
      label: (
        <span
          className="w-36 h-8 flex items-center justify-start"
          onClick={logout}
        >
          Đăng xuất
        </span>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "4",
      label: (
        <span
          onClick={handlePrivacy}
          className="w-36 h-8 flex items-center justify-start"
        >
          Quyền riêng tư
        </span>
      ),
    },
    {
      key: "5",
      label: (
        <span
          onClick={handleSupport}
          className="w-36 h-8 flex items-center justify-start"
        >
          Giúp đỡ và phản hồi
        </span>
      ),
    },
  ];

  return (
    <div className="cursor-pointer flex items-center">
      <ConfigProvider
        theme={{
          token: {
            colorBgBase: theme.theme === "dark" ? "#01203e" : "#ffffff",
            colorTextBase: theme.theme === "dark" ? "#ffffff" : "#000000",
          },
        }}
      >
        <Dropdown menu={{ items }} trigger={["click"]} placement="bottomLeft">
          <Avatar
            style={{ backgroundColor: "blue" }}
            shape="circle"
            size="large"
            icon={<UserOutlined />}
          />
        </Dropdown>
      </ConfigProvider>
    </div>
  );
};

export default MenuProfileExpend;
