import { Alert, Button, message, Modal } from "antd";
import React from "react";
import axiosConfig from "../../../services/axios/axiosConfig";

const DeleteUserModal = ({
  openDeleteUserModal,
  handleCloseDeleteUserModal,
  user,
  setUsers,
}) => {
  const handleOk = async () => {
    try {
      const res = await axiosConfig.delete(`/users/${user?.id}`);
      if (res.data?.statusCode === 200) {
        message.success("Xóa người dùng thành công");
        setUsers((prev) => prev.filter((u) => u.id !== user?.id));
        handleCloseDeleteUserModal();
      } else {
        message.error("Xóa người dùng thất bại!");
      }
    } catch (error) {
      if (error.response?.data?.statusCode === 401) {
        message.error("Bạn không có quyền xóa người dùng này!");
      } else {
        message.error("Xóa người dùng thất bại!");
      }
    }
  };
  return (
    <Modal
      open={openDeleteUserModal}
      title={`Xác nhận muốn xóa người dùng ${user?.fullName}`}
      onOk={handleOk}
      onCancel={handleCloseDeleteUserModal}
      footer={[
        <Button
          key="cancel"
          type="default"
          onClick={handleCloseDeleteUserModal}
        >
          Hủy
        </Button>,
        <Button key="submit" onClick={handleOk} color="danger" variant="solid">
          Vâng, tôi muốn xóa!
        </Button>,
      ]}
    >
      <p>Bạn có chắc chắn muốn xóa tài khoản này?</p>
    </Modal>
  );
};

export default DeleteUserModal;
