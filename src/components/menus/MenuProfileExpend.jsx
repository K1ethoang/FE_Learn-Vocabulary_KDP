import React, { useEffect } from "react";
import { Avatar, Dropdown } from "antd";
import {
  UserOutlined,
  TrophyOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useAuth } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import axiosConfig from "../../services/axios/axiosConfig";
import axios from "axios";

const MenuProfileExpend = () => {
  const { user } = useAuth();
  console.log("user", user);
  const { logout } = useAuth();
  const navigate = useNavigate();
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
          onClick={handleAchievement}
          className="w-36 h-8 flex items-center justify-start"
        >
          Thành tựu
        </span>
      ),
      key: "2",
      icon: <TrophyOutlined style={{ fontSize: 15 }} />,
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
      key: "3",
      icon: <SettingOutlined style={{ fontSize: 15 }} />,
    },
    {
      type: "divider",
    },
    {
      key: "4",
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
      key: "5",
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
      key: "6",
      label: (
        <span
          onClick={handleSupport}
          className="w-36 h-8 flex items-center justify-start"
        >
          Giúp đỡ và phản hồi
        </span>
      ),
    },
    {
      key: "7",
      label: (
        <span
          onClick={handleUpgarde}
          className="w-36 h-8 flex items-center justify-start"
        >
          Nâng cấp
        </span>
      ),
    },
  ];

  return (
    <div className="cursor-pointer flex items-center">
      <Dropdown menu={{ items }} trigger={["click"]} placement="bottomLeft">
        <Avatar
          style={{ backgroundColor: "blue" }}
          shape="circle"
          size="large"
          icon={<UserOutlined />}
        />
      </Dropdown>
    </div>
  );
};

export default MenuProfileExpend;
