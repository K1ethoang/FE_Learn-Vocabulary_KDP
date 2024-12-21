import { Modal } from "antd";
import React, { useState } from "react";

const EditProfileModal = ({
  openEditProfileModal,
  handleEditProfileModalClose,
  user,
}) => {
  // const [fulllName, setFullName] = useState(user?.fullName);
  // const [email, setEmail] = useState(user?.email);
  // const [role, setRole] = useState(user?.role);
  // const [isBlocked, setIsBlocked] = useState(user?.isBlocked);
  // const [password, setPassword] = useState("");

  return (
    <Modal
      title="Thông tin người dùng cập nhật"
      centered
      open={openEditProfileModal}
      onOk={handleEditProfileModalClose}
      onCancel={handleEditProfileModalClose}
      width={800}
    >
      <div className="flex items-center justify-around mb-3 ">
        <div className="w-1/2 flex flex-col items-start ">
          <span>Tên người dùng:</span>
          <div
            className="w-full p-2 rounded-md"
            style={{ border: "0.5px solid", borderColor: "gray" }}
          >
            {user?.fullName}
          </div>
        </div>
        <div className="w-1/2 flex flex-col items-start ml-2">
          <span>Email:</span>
          <div
            className="w-full p-2 rounded-md"
            style={{ border: "0.5px solid", borderColor: "gray" }}
          >
            {user?.email}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-around">
        <div className="w-1/2 flex flex-col items-start ">
          <span>Vai trò:</span>
          <div
            className="w-full p-2 rounded-md"
            style={{ border: "0.5px solid", borderColor: "gray" }}
          >
            {user?.role}
          </div>
        </div>
        <div className="w-1/2 flex flex-col items-start ml-2">
          <span>Tình trạng tài khoản:</span>
          <div
            className="w-full p-2 rounded-md"
            style={{ border: "0.5px solid", borderColor: "gray" }}
          >
            {user?.isBlocked ? "Đã bị khóa" : "Đang hoạt động"}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditProfileModal;
