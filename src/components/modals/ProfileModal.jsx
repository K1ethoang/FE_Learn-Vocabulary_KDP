import { Modal } from "antd";
import React, { useState } from "react";

const ProfileModal = ({ openViewModal, handleCloseViewModal }) => {
  const handleOK = () => {};

  return (
    <Modal
      title="Thông tin người dùng"
      centered
      open={openViewModal}
      onOk={handleOK}
      onCancel={handleCloseViewModal}
      width={800}
    >
      <div>
        <span>Ho ten: </span>
        <span>Tran Van Trao </span>
      </div>
      <div>
        <span>Email:</span>
        <span>tranvantrao@gmail.com</span>
      </div>
      <div>
        <span>Email:</span>
        <span>tranvantrao@gmail.com</span>
      </div>
    </Modal>
  );
};

export default ProfileModal;
