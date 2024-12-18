import { Button, Form, Input, Modal, Select } from "antd";
import React, { useState } from "react";

const EditSetModal = ({ openEditSetModal, handleCloseEditModal, idTopic }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [form] = Form.useForm();

  const handleCloseModal = () => {
    form.resetFields();
    handleCloseEditModal();
  };
  const clearValues = () => {
    form.resetFields();
  };
  const handleOK = () => {
    const newData = {
      title,
      description,
    };

    console.log("newData:", newData);
    clearValues();
    handleCloseEditModal();
  };

  return (
    <Modal
      title={`Chỉnh sửa học phần ${idTopic}`}
      centered
      open={openEditSetModal}
      onOk={handleOK}
      onCancel={handleCloseModal}
      width={700}
      footer={[
        <Button key="cancel" type="default" onClick={handleCloseModal}>
          Hủy
        </Button>,
        <Button
          disabled={title == ""}
          key="submit"
          onClick={handleOK}
          color="primary"
          variant="solid"
        >
          Cập nhật
        </Button>,
      ]}
    >
      <Form
        form={form}
        name="dynamic_form_complex"
        style={{ maxWidth: "100%" }}
        autoComplete="off"
      >
        <div className=" w-full h-20 flex flex-col  justify-start mb-3">
          <div className="w-3/5">
            <Form.Item
              layout="vertical"
              label="Tiêu đề"
              name="title"
              rules={[
                {
                  required: true,
                  message: "Tiêu đề không được bỏ trống!",
                },
              ]}
            >
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Nhập tiêu đề..."
              />
            </Form.Item>
          </div>
        </div>

        <div className="w-full flex items-center justify-between mb-16">
          <div className="mb-3 w-4/5">
            <Form.Item
              layout="vertical"
              label="Mô tả"
              labelAlign="left"
              name="description"
              className="h-full w-full m-0"
            >
              <Input.TextArea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Nhập mô tả..."
              />
            </Form.Item>
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default EditSetModal;
