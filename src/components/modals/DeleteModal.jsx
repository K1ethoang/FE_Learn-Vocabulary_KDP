import { Alert, Button, message, Modal } from "antd";
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
      footer={[
        <Button key="cancel" type="default" onClick={handleCloseDeleteModal}>
          Hủy
        </Button>,
        <Button key="submit" onClick={handleOk} color="danger" variant="solid">
          Vâng, tôi muốn xóa!
        </Button>,
      ]}
    >
      <p>Bạn có chắc chắn muốn xóa?</p>
    </Modal>
  );
};

export default DeleteModal;
