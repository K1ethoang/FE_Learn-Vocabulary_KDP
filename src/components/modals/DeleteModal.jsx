import { Alert, message, Modal } from "antd";
import React from "react";

const DeleteModal = ({ openDeleteModal, handleCloseDeleteModal, word }) => {
  const handleOk = () => {
    console.log("check:", word);
  };
  return (
    <Modal
      open={openDeleteModal}
      title={`Xác nhận muốn xóa ${word}`}
      onOk={handleOk}
      onCancel={handleCloseDeleteModal}
      footer={(_, { OkBtn, CancelBtn }) => (
        <>
          <CancelBtn />
          <OkBtn />
        </>
      )}
    >
      <p>Bạn có chắc chắn muốn xóa từ này?</p>
    </Modal>
  );
};

export default DeleteModal;
