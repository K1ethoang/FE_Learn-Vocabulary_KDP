import { Button, Divider, Select } from "antd";
import React from "react";
import { useAuth } from "../../providers/AuthProvider";
import EditProfileModal from "../modals/user/EditProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../redux/themeSlice";

const SettingScreen = () => {
  const { user } = useAuth();
  const [openEditProfileModal, setOpenEditProfileModal] = React.useState(false);
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();
  const handleChange = (value) => {
    dispatch(toggleTheme());
    console.log(`selected ${value}`, theme);
  };

  const handleEditProfile = () => {
    setOpenEditProfileModal(true);
  };
  const handleEditProfileModalClose = () => {
    setOpenEditProfileModal(false);
  };

  return (
    <div className=" w-full flex flex-col  justify-center px-48 py-8 ml-auto mr-auto">
      <div className="text-3xl font-bold mb-3">Cài đặt</div>

      {/* info */}
      <div>
        <span className="text-xl font-semibold text-gray">
          Thông tin cá nhân
        </span>
        <div className="w-full h-3/5 border rounded-lg mt-2">
          <div className="text-base h-24 w-full p-2 flex items-center justify-between">
            <div className=" flex flex-col justify-center p-4">
              <span className="font-semibold">Tên người dùng</span>
              <span className="font-medium text-gray">{user?.fullName}</span>
            </div>
          </div>
          <Divider
            orientation="left"
            style={{
              borderColor: "#d4d5d5",
              margin: 0,
            }}
          />
          <div className="text-base w-full h-24  p-2  flex items-center justify-between">
            <div className=" flex flex-col justify-center p-4">
              <span className="font-semibold">Email</span>
              <span className="font-medium text-gray">{user?.email}</span>
            </div>
          </div>

          <Divider
            orientation="left"
            style={{
              borderColor: "#d4d5d5",
              margin: 0,
            }}
          />
          <div className="text-base w-full h-24 p-2  flex items-center justify-between">
            <div className=" flex flex-col justify-center p-4">
              <span className="font-semibold">Loại tài khoản</span>
            </div>
            <div
              className={` h-9 flex items-center justify-center font-bold text-[#473dd9] mr-3 ${
                theme === "light" ? "bg-[#fff]" : "bg-bg-main-dark"
              }`}
            >
              <span>Người dùng</span>
            </div>
          </div>
        </div>
      </div>

      {/* ui */}
      <div className="mt-12">
        <span className="text-xl font-semibold text-gray">Giao diện</span>
        <div className="w-full h-3/5 border rounded-lg mt-2">
          <div className="text-base h-24 w-full p-2 flex items-center justify-between">
            <div className=" flex flex-col justify-center p-4">
              <span className="font-semibold">Hình nền</span>
            </div>
            <div
              className={`w-14 h-9 flex items-center justify-center  font-bold mr-4 ${
                theme === "light" ? "bg-[#fff]" : "bg-bg-main-dark"
              }`}
            >
              <Select
                // disabled
                defaultValue={theme === "light" ? "Light" : "Dark"}
                style={{ width: 160 }}
                onChange={handleChange}
                options={[
                  { value: "light", label: "Light" },
                  { value: "dark", label: "Dark" },
                ]}
              />
            </div>
          </div>
          <Divider
            orientation="left"
            style={{
              borderColor: "#d4d5d5",
              margin: 0,
            }}
          />
          <div className="text-base w-full h-24  p-2  flex items-center justify-between">
            <div className=" flex flex-col justify-center p-4">
              <span className="font-semibold">Ngôn ngữ</span>
            </div>
            <div
              className={`w-14 h-9 flex items-center justify-center ${
                theme === "light" ? "bg-[#fff]" : "bg-bg-main-dark"
              } font-bold mr-6 text-blue`}
            >
              <Select
                disabled
                defaultValue="Tiếng Việt"
                style={{
                  width: 160,
                }}
                onChange={handleChange}
                options={[
                  { value: "vn", label: "Tiếng Việt" },
                  { value: "eng", label: "Tiếng Anh" },
                ]}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Acc */}
      <div className="mt-12">
        <span className="text-xl font-semibold text-gray">Tài khoản</span>
        <div className="w-full h-3/5 border rounded-lg mt-2">
          <div className="text-base w-full h-24  p-2  flex items-center justify-between">
            <div className=" flex flex-col justify-center p-4">
              <span className="font-semibold">
                Thông tin tài khoản chi tiết
              </span>
            </div>

            <div
              className="w-28 h-9 flex items-center justify-center bg-[#fff] font-bold text-[#473dd9] cursor-pointer hover:bg-[#e0deff] rounded-lg"
              onClick={handleEditProfile}
            >
              <span>Xem</span>
            </div>
          </div>
          <Divider
            orientation="left"
            style={{
              borderColor: "#d4d5d5",
              margin: 0,
            }}
          />
          <div className="text-base h-24 w-full p-2 flex items-center justify-between">
            <div className=" flex flex-col justify-center p-4">
              <span className="font-semibold">Xóa tài khoản của bạn</span>
              <span className="font-medium text-gray">
                Thao tác này sẽ xóa tất cả dữ liệu của bạn và không thể hoàn
                tác.
              </span>
            </div>
            <div
              className={`w-14 h-9 flex items-center justify-center  font-bold mr-8 ${
                theme === "light" ? "bg-[#fff]" : "bg-bg-main-dark"
              }`}
            >
              <Button danger title="Xóa tài khoản" type="primary">
                Xóa tài khoản
              </Button>
            </div>
          </div>
        </div>
      </div>

      <EditProfileModal
        openEditProfileModal={openEditProfileModal}
        handleEditProfileModalClose={handleEditProfileModalClose}
        user={user}
      />
    </div>
  );
};

export default SettingScreen;
