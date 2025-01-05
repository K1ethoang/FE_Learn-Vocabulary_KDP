import { Alert, Button, message, Modal } from "antd";
import React from "react";
import axiosConfig from "../../../services/axios/axiosConfig";

const LockUserModal = ({
  openLockUserModal,
  handleCloseLockUserModal,
  user,
  setUsers,
}) => {
  const handleOk = async () => {
    try {
      const res = await axiosConfig.get(
        `/users/${user?.id}/toggle-block?isBlocked=${!user?.isBlock}`
      );
      if (res.data?.statusCode === 200) {
        message.success(
          user?.isBlock
            ? "Mở khóa người dùng thành công"
            : "Khóa người dùng thành công"
        );

        setUsers((prev) =>
          prev.map((u) =>
            u?.id === user?.id ? { ...u, isBlock: !user?.isBlock } : u
          )
        );

        handleCloseLockUserModal();
      } else {
        message.error(
          user?.isBlock
            ? "Mở khóa người dùng thất bại!"
            : "Khóa người dùng thất bại!"
        );
      }
    } catch (error) {
      if (error.response?.data?.statusCode === 401) {
        message.error(
          user?.isBlock
            ? "Bạn không có quyền mở khóa người dùng này!"
            : "Bạn không có quyền khóa người dùng này!"
        );
      } else {
        message.error(
          user?.isBlock
            ? "Mở khóa người dùng thất bại!"
            : "Khóa người dùng thất bại!"
        );
      }
    }
  };
  return (
    <Modal
      open={openLockUserModal}
      title={
        user?.isBlock
          ? `Xác nhận muốn mở khóa người dùng ${user?.fullName}`
          : `Xác nhận muốn khóa người dùng ${user?.fullName}`
      }
      onOk={handleOk}
      onCancel={handleCloseLockUserModal}
      footer={[
        <Button key="cancel" type="default" onClick={handleCloseLockUserModal}>
          Hủy
        </Button>,
        <Button
          key="submit"
          onClick={handleOk}
          color={user?.isBlock ? "primary" : "danger"}
          variant="solid"
        >
          {user?.isBlock ? "Vâng, tôi muốn mở khóa!" : "Vâng, tôi muốn khóa!"}
        </Button>,
      ]}
    >
      <p>
        {user?.isBlock
          ? "Bạn có chắc chắn muốn mở khóa tài khoản này?"
          : "Bạn có chắc chắn muốn khóa tài khoản này?"}
      </p>
    </Modal>
  );
};

export default LockUserModal;
