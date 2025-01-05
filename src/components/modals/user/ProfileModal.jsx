import { Modal } from "antd";
import React, { useState } from "react";

const ProfileModal = ({ openViewModal, handleCloseViewModal, user }) => {
  return (
    <Modal
      title="Thông tin người dùng"
      centered
      open={openViewModal}
      onOk={handleCloseViewModal}
      onCancel={handleCloseViewModal}
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
            {user?.isActive
              ? user?.isBlock
                ? "Đã bị khóa"
                : "Đang hoạt động"
              : "Chưa xác minh"}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProfileModal;
