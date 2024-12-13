import { Link, useLocation } from "react-router-dom";

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const pathName = location.pathname;
  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };
  return (
    <div className="w-full min-h-screen flex flex-col">
      <header className="bg-[#000] text-[#fff] p-4 flex justify-between items-center h-20">
        <div className="flex items-center space-x-4">
          <img src="https://placehold.co/40x40" />
          <span className="text-2xl font-bold">KDP</span>
          <nav className="space-x-4">
            <Link
              to="/admin"
              className={`text-lg ${pathName === "/admin" ? "text-blue" : ""}`}
            >
              Quản lí người dùng
            </Link>
            <Link
              to="/admin/statistics"
              className={`text-lg ${
                pathName === "/admin/statistics" ? "text-blue" : ""
              }`}
            >
              Thống kê{" "}
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <div className="bg-[#626161] rounded-full h-8 w-8 flex items-center justify-center">
            GS
          </div>
          <div
            className="text-bg-light hover:underline cursor-pointer"
            onClick={logout}
          >
            Đăng xuất
          </div>
        </div>
      </header>
      <div className="w-full flex-grow">{children}</div>
    </div>
  );
};

export default AdminLayout;
