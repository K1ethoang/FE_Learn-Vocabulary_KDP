import { Modal } from "antd";
import React from "react";

const DeleteModal = ({ openDeleteModal, handleCloseDeleteModal }) => {
  const handleOk = () => {};
  return (
    <Modal
      open={openDeleteModal}
      title="Xác nhận"
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
