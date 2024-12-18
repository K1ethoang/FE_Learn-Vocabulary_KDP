import { Alert, Button, message, Modal } from "antd";
import React from "react";

const DeleteSetModal = ({
  openDeleteSetModal,
  handleCloseDeleteSetModal,
  data,
}) => {
  const handleOk = () => {
    console.log("check:", data);
  };
  return (
    <Modal
      open={openDeleteSetModal}
      title={`Xác nhận muốn xóa ${data}`}
      onOk={handleOk}
      onCancel={handleCloseDeleteSetModal}
      footer={[
        <Button type="default" key="cancel" onClick={handleCloseDeleteSetModal}>
          Hủy
        </Button>,
        <Button key="submit" onClick={handleOk} color="danger" variant="solid">
          Vâng, hãy xóa học phần này!
        </Button>,
      ]}
    >
      <p>Bạn có chắc chắn muốn xóa học phần này?</p>
    </Modal>
  );
};

export default DeleteSetModal;
