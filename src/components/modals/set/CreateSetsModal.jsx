import { Button, Form, Input, message, Modal, Select } from "antd";
import React, { useState } from "react";
import axiosConfig from "../../../services/axios/axiosConfig";

const CreateSetsModal = ({
  openCreateSet,
  handleCreateSetModalClose,
  setTopics,
  openNotification,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [form] = Form.useForm();

  const handleCloseModal = () => {
    form.resetFields();
    handleCreateSetModalClose();
  };
  const clearValues = () => {
    form.resetFields();
  };

  const handleOpenNotification = (place, mess) => {
    openNotification(place, mess);
  };

  const addSet = async (set) => {
    try {
      const res = await axiosConfig.post("/topics", {
        title: set.title,
        description: set.description,
      });

      console.log("res:", res.data);
      if (res.data?.statusCode === 201) {
        handleOpenNotification("topRight", "Đã tạo thành công học phần");
        setTopics((prev) => [...prev, res?.data?.result]);
      }
    } catch (error) {
      if (
        error?.response?.status === 400 &&
        error?.response?.data?.errors[0]?.message === "Topic is already exist"
      ) {
        handleOpenNotification("topRight", "Tên học phần đã tồn tại!");
      }
      handleOpenNotification(
        "topRight",
        "Có lỗi xảy ra trong quá trình tạo mới học phần!"
      );

      console.log("error", error);
    }
  };

  const handleOK = () => {
    const newData = {
      title,
      description,
    };
    addSet(newData);
    console.log("newData:", newData);
    clearValues();
    handleCreateSetModalClose();
  };

  return (
    <Modal
      title={`Tạo mới học phần`}
      centered
      open={openCreateSet}
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
          Tạo mới
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
                {
                  min: 3,
                  message: "Tiêu đề phải lớn hơn 3 kí tự",
                },
                {
                  max: 100,
                  message: "Tiêu đề phải nhỏ hơn 100 kí tự",
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

export default CreateSetsModal;
