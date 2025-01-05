import { Button, Form, Input, message, Modal } from "antd";
import React, { useState } from "react";
import { useAuth } from "../../../providers/AuthProvider";
import axiosConfig from "../../../services/axios/axiosConfig";

const ChangePassword = ({
  openChangePassword,
  handleChangePasswordCLose,
  user,
}) => {
  const { user: myInfo, setUser } = useAuth();

  const userId = myInfo?.id;

  const handleChangePassword = async (newPassword) => {
    try {
      const res = await axiosConfig.put(`/users/${userId}`, {
        password: newPassword,
      });
      if (res?.data?.statusCode === 200) {
        setUser((prevUser) => ({
          ...prevUser,
          password: newPassword,
        }));

        message.success("Cập nhật mật khẩu người dùng thành công!");
      }
      handleClose();
    } catch (error) {
      console.log("error", error);
      message.error("Có lỗi xảy ra!");
    }
  };
  console.log("user", user);

  const handleOk = () => {
    handleChangePassword(form.getFieldValue("newPassword"));
  };
  const handleClose = () => {
    form.resetFields();
    handleChangePasswordCLose();
  };
  const [form] = Form.useForm();

  return (
    <Modal
      title="Cập nhật mật khẩu mới"
      centered
      open={openChangePassword}
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
      <Form
        form={form}
        name="changePassword"
        style={{
          maxWidth: 600,
        }}
      >
        <Form.Item
          name="newPassword"
          label="Mật khẩu mới"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu mới của bạn!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Nhập lại mật khẩu mới"
          dependencies={["newPassword"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Vui lòng nhập lại mật khẩu!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Mật khẩu mới của bạn không giống!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ChangePassword;
