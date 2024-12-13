import { useContext, useEffect, useState } from "react";
import {
  FolderOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusSquareOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Image, Input, Layout, Menu, theme } from "antd";
import MenuDropdown from "../components/menus/MenuDropdown";
import MenuProfileExpend from "../components/menus/MenuProfileExpend";
import { Link, useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;
const LayoutPage = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [keySearch, setKeySearch] = useState("");
  const { Search } = Input;
  const storedKey = sessionStorage.getItem("selectedKey");
  const [selectedKey, setSelectedKey] = useState(storedKey ? storedKey : "1");
  const navigate = useNavigate();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

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
    navigate(`/search?query=${keySearch}`);
  };

  const items = [
    {
      key: "1",
      icon: <HomeOutlined style={{ fontSize: 24 }} />,
      label: <Link to="/">Trang chủ</Link>,
    },
    {
      key: "2",
      icon: <FolderOutlined style={{ fontSize: 24 }} />,
      label: <Link to="/library">Thư viện của bạn</Link>,
    },
    {
      key: "3",
      icon: <PlusSquareOutlined style={{ fontSize: 24 }} />,
      label: <Link to="/create-set">Tạo thẻ ghi nhớ</Link>,
    },
  ];
  return (
    <Layout style={{ width: "100%", height: "100%" }}>
      <Header
        style={{
          padding: 0,
          background: colorBgContainer,
          display: "flex",
          alignItems: "center",
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
          }}
        />
        <div className=" w-full bg-slate-500 p-4 flex text-center justify-between items-center">
          <Image src="/src/assets/images/logo.png" width={45} preview={false} />
          <div className="w-3/6  flex items-center">
            <Search
              value={keySearch}
              allowClear
              onChange={(e) => setKeySearch(e.target.value)}
              placeholder="Tìm thẻ ghi nhớ"
              size="large"
              enterButton
              onSearch={handleSearch}
            />
          </div>
          <MenuDropdown />
          <MenuProfileExpend />
        </div>
      </Header>

      <Layout>
        <Sider
          theme="light"
          width={260}
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <Menu
            className="p-4"
            theme="light"
            mode="inline"
            inlineCollapsed={collapsed}
            defaultSelectedKeys={[selectedKey]}
            style={{ fontSize: 14, fontFamily: ["Roboto", "sans-serif"] }}
            items={items}
            onSelect={handleSelect}
          />
        </Sider>

        <Content
          style={{
            margin: "20px 16px",
            padding: 24,
            minHeight: "calc(100vh - 108px)",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default LayoutPage;
