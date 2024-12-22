import { Button, Form, Input, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import axiosConfig from "../../../services/axios/axiosConfig";

const EditSetModal = ({
  openEditSetModal,
  handleCloseEditModal,
  topic,
  setTopics,
  handleOpenNotifi,
}) => {
  const set = topic;
  const [title, setTitle] = useState(set?.title);
  const [description, setDescription] = useState(set?.description);
  const [form] = Form.useForm();
  useEffect(() => {
    if (openEditSetModal && set) {
      setTitle(set?.title);
      setDescription(set?.description);
      form.setFieldsValue({
        title: set?.title,
        description: set?.description,
      });
    }
  }, [openEditSetModal, set, form]);
  const handleCloseModal = () => {
    clearValues();
    handleCloseEditModal();
  };
  const clearValues = () => {
    setTitle("");
    setDescription("");
    form.resetFields();
  };

  const handleOpenNotify = (place, mess) => {
    handleOpenNotifi(place, mess);
  };

  const handleEditSet = async (newSet) => {
    try {
      const res = await axiosConfig.put(`/topics/${set?.id}`, {
        title: newSet?.title,
        description: newSet?.description,
      });

      if (res.data?.statusCode === 200) {
        setTopics((prev) => [
          res.data?.result,
          ...prev.filter((set) => set.id !== res.data?.result.id),
        ]);
        handleOpenNotify("topRight", "Cập nhật thành công!");
      }
    } catch (error) {
      handleOpenNotify("topRight", "Có lỗi xảy ra!");
      console.log("error", error);
    }
  };

  const handleOK = () => {
    const newTopic = {
      title,
      description,
    };
    handleEditSet(newTopic);
    clearValues();
    handleCloseEditModal();
  };

  return (
    <Modal
      title={`Chỉnh sửa học phần ${topic?.title}`}
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
                {
                  min: 3,
                  message: "Tiêu đề phải lớn hơn 3 kí tự!",
                },
                {
                  max: 100,
                  message: "Tiêu đề phải bé hơn 100 kí tự!",
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
