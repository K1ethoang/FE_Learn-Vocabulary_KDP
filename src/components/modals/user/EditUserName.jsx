import { Button, Input, message, Modal } from "antd";
import React, { useState } from "react";
import { useAuth } from "../../../providers/AuthProvider";
import axiosConfig from "../../../services/axios/axiosConfig";

const EditUserName = ({
  openEditUsernameModal,
  handleEditUsernameModalClose,
  user,
}) => {
  const { user: myInfo, setUser } = useAuth();

  const [newUsername, setNewUsername] = useState();
  const [error, setError] = useState();
  const userId = myInfo?.id;

  const handleEditUsername = async (newUsername) => {
    try {
      const res = await axiosConfig.put(`/users/${userId}`, {
        fullName: newUsername,
      });
      if (res?.data?.statusCode === 200) {
        setUser((prevUser) => ({
          ...prevUser,
          fullName: newUsername,
        }));

        message.success("Cập nhật tên người dùng thành công!");
      }
      handleClose();
    } catch (error) {
      console.log("error", error);
      message.error("Có lỗi xảy ra!");
    }
  };
  console.log("user", user);

  const handleOk = () => {
    if (newUsername === "") {
      setError("Vui lòng không bỏ trống!");
    }
    handleEditUsername(newUsername);
  };

  const handleClose = () => {
    setNewUsername("");
    setError("");
    handleEditUsernameModalClose();
  };

  return (
    <Modal
      title="Cập nhật tên người dùng"
      centered
      open={openEditUsernameModal}
      onOk={handleOk}
      onCancel={handleClose}
      width={600}
      footer={[
        <Button key="cancel" type="default" onClick={handleClose}>
          Hủy
        </Button>,
        <Button key="submit" onClick={handleOk} color="primary" variant="solid">
          Cập nhật
        </Button>,
      ]}
    >
      <div className="flex flex-col items-center justify-around mb-3 ">
        <div className="w-full flex flex-col items-start ">
          <span>Tên người dùng cũ:</span>
          <div
            className="w-full p-2 rounded-md"
            style={{ border: "0.5px solid", borderColor: "gray" }}
          >
            {myInfo?.fullName}
          </div>
        </div>
        <div className="w-full flex flex-col items-start mt-3">
          <span>Tên người dùng mới:</span>
          <Input
            className="p-2"
            value={newUsername}
            onChange={(e) => {
              setNewUsername(e.target.value);
              setError("");
            }}
            placeholder="Nhập tên người dùng mới"
          />

          <span className="text-[#c71e1e]">{error}</span>
        </div>
      </div>
    </Modal>
  );
};

export default EditUserName;
