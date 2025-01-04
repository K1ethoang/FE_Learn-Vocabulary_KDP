import { useEffect, useState } from "react";
import {
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Button, Image, Input, Layout, Menu } from "antd";
import MenuDropdown from "../components/menus/MenuDropdown";
import MenuProfileExpend from "../components/menus/MenuProfileExpend";
import { Link, useNavigate } from "react-router-dom";
import ChatBox from "../components/chatbox/ChatBox";
import { CiChat1 } from "react-icons/ci";
import { IoBookOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

const { Header, Sider, Content } = Layout;
const LayoutPage = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [keySearch, setKeySearch] = useState("");
  const { Search } = Input;
  const storedKey = sessionStorage.getItem("selectedKey");
  const [selectedKey, setSelectedKey] = useState(storedKey ? storedKey : "1");
  const navigate = useNavigate();
  const width = window.screen.width;
  const theme = useSelector((state) => state.theme);

  // const {
  //   token: { colorBgContainer, borderRadiusLG },
  // } = theme.useToken();

  useEffect(() => {
    if (storedKey) {
      setSelectedKey(storedKey);
    }
  }, [storedKey]);

  const handleSelect = (key) => {
    setSelectedKey(key.key);
    sessionStorage.setItem("selectedKey", key.key);
  };

  const handleSearch = () => {
    if (keySearch !== "") {
      navigate(`/search?query=${keySearch}`);
    }
  };

  const items = [
    {
      key: "1",
      icon: <HomeOutlined style={{ fontSize: 24 }} />,
      label: (
        <Link to="/" className="font-semibold">
          Trang chủ
        </Link>
      ),
    },
    {
      key: "2",
      icon: <IoBookOutline style={{ fontSize: 24 }} />,
      label: (
        <Link to="/sets" className="font-semibold">
          Học phần của bạn
        </Link>
      ),
    },
    // {
    //   key: "3",
    //   icon: <TbBuildingWarehouse style={{ fontSize: 24 }} />,
    //   label: (
    //     <Link to="/vocabulary" className="font-semibold">
    //       Kho từ vựng
    //     </Link>
    //   ),
    // },
    // {
    //   key: "4",
    //   icon: <FolderOutlined style={{ fontSize: 24 }} />,
    //   label: (
    //     <Link to="/library" className="font-semibold">
    //       Thư viện của bạn
    //     </Link>
    //   ),
    // },
    // {
    //   key: "5",
    //   icon: <PlusSquareOutlined style={{ fontSize: 24 }} />,
    //   label: (
    //     <Link to="/create-set" className="font-semibold">
    //       Tạo học phần
    //     </Link>
    //   ),
    // },

    {
      key: "3",
      icon: <CiChat1 size={24} />,
      label: (
        <Link to="/chat-bot" className="font-semibold">
          Trợ lý học tập
        </Link>
      ),
    },
  ];
  return (
    <Layout style={{ width: "100%", minHeight: "100vh" }}>
      <Header
        className={`fixed top-0 left-0 right-0 z-10 shadow-lg`} // Tailwind classes for fixed header
        style={{
          padding: 0,
          background: "#fff",
          display: "flex",
          alignItems: "center",
          backgroundColor: theme?.theme === "dark" ? "#001529" : "#fff",
          color: theme?.theme === "dark" ? "#fff" : "#000",
        }}
      >
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
            color: theme?.theme === "dark" ? "#fff" : "#000",
          }}
        />
        <div className=" w-full bg-slate-500 p-4 flex text-center justify-between items-center">
          <Image src="/src/assets/images/logo.png" width={45} preview={false} />
          <div className="w-3/6"></div>
          {/* <div className="w-3/6  flex items-center">
            <Search
              value={keySearch}
              allowClear
              onChange={(e) => setKeySearch(e.target.value)}
              placeholder="Tìm thẻ ghi nhớ"
              size="large"
              enterButton
              onSearch={handleSearch}
            />
          </div> */}
          <MenuDropdown />
          <MenuProfileExpend />
        </div>
      </Header>

      <Layout style={{ marginTop: "64px" }}>
        <Sider
          width={width * 0.18}
          theme={theme?.theme === "dark" ? "dark" : "light"}
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <Menu
            className="p-4"
            theme={theme?.theme === "dark" ? "dark" : "light"}
            mode="inline"
            inlineCollapsed={collapsed}
            defaultSelectedKeys={[selectedKey ? selectedKey : ""]}
            style={{ fontSize: 14, fontFamily: ["Roboto", "sans-serif"] }}
            items={items}
            onSelect={handleSelect}
          />
        </Sider>

        <Content
          style={{
            margin: theme?.theme === "dark" ? "8px" : "24px 16px",
            padding: 24,
            minHeight: "calc(100vh - 108px)",
            backgroundColor: theme?.theme === "dark" ? "#001529" : "#fff",
            color: theme?.theme === "dark" ? "#fff" : "#000",
            borderRadius: "10px",
          }}
        >
          {children}
        </Content>

        <ChatBox />
      </Layout>
    </Layout>
  );
};
export default LayoutPage;
