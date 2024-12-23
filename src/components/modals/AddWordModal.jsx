import { Button, Form, Input, Modal, notification, Select, Spin } from "antd";
import React, { useEffect, useState } from "react";
import axiosConfig from "../../services/axios/axiosConfig";

const AddWordModal = ({
  openAddWordModal,
  handleCloseModal,
  idTopic,
  openNotification,
  setData,
}) => {
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const [pronounce, setPronounce] = useState("");
  const [typeWord, setTypeWord] = useState("");
  const [example, setExample] = useState("");
  const [form] = Form.useForm();
  const [types, setTypes] = useState([]);

  const handleOpenNotification = (place, mess) => {
    openNotification(place, mess);
  };
  const getAllTypeWord = async () => {
    if (openAddWordModal) {
      try {
        const res = await axiosConfig.get(`/types`);
        res.data?.result?.map((type) => {
          setTypes((prev) => [
            ...prev,
            {
              value: type?.id,
              label: type?.name,
            },
          ]);
        });
      } catch (error) {
        console.log("error:", error);
      }
    }
  };
  useEffect(() => {
    getAllTypeWord();
  }, [openAddWordModal]);

  const handleCloseAddWordModal = () => {
    form.resetFields();
    handleCloseModal();
  };

  const handleChange = (value) => {
    setTypeWord(value);
  };

  const clearValues = () => {
    setWord("");
    setMeaning("");
    setTypeWord("");
    setExample("");
    setPronounce("");
    form.resetFields();
  };

  const handleAddWord = async (newWord) => {
    try {
      const res = await axiosConfig.post(`/topics/${idTopic}/words`, {
        name: newWord?.word,
        pronounce: newWord?.pronounce,
        meaning: newWord?.meaning,
        example: newWord?.example,
        typeIds: newWord?.typeWord,
      });

      if (res?.data?.statusCode === 201) {
        setData((prev) => [res?.data?.result, ...prev]);
        handleOpenNotification("topRight", "Thêm từ vựng thành công!");
      }
    } catch (error) {
      console.log("error:", error);
      handleOpenNotification("topRight", "Có lỗi xảy ra khi thêm từ vựng!");
    }
  };

  const handleOK = () => {
    const newWord = {
      word,
      meaning,
      pronounce,
      typeWord,
      example,
    };
    handleAddWord(newWord);
    console.log("newWord:", newWord);
    clearValues();
    handleCloseModal();
  };

  return (
    <Modal
      title={`Thêm từ mới vào topic`}
      centered
      open={openAddWordModal}
      onOk={handleOK}
      onCancel={handleCloseAddWordModal}
      width={700}
      footer={[
        <Button key="cancel" type="default" onClick={handleCloseAddWordModal}>
          Hủy
        </Button>,
        <Button
          disabled={word == "" || meaning == "" || typeWord == ""}
          key="submit"
          onClick={handleOK}
          color="primary"
          variant="solid"
        >
          Thêm từ
        </Button>,
      ]}
    >
      <Form
        form={form}
        name="dynamic_form_complex"
        style={{ maxWidth: "100%" }}
        autoComplete="off"
      >
        <div className=" w-full h-20 flex items-start mb-5">
          <div className="w-3/5">
            <Form.Item
              layout="vertical"
              label="Thuật ngữ"
              name="word"
              rules={[
                {
                  required: true,
                  message: "Thuật ngữ không được bỏ trống!",
                },
              ]}
            >
              <Input
                value={word}
                onChange={(e) => setWord(e.target.value)}
                placeholder="Nhập thuật ngữ"
              />
            </Form.Item>
          </div>
          <div className="w-4/5 ml-5 ">
            <Form.Item
              layout="vertical"
              label="Phát âm"
              labelAlign="left"
              name="pronounce"
              className="h-full w-full m-0"
            >
              <Input
                value={pronounce}
                onChange={(e) => setPronounce(e.target.value)}
                placeholder="Nhập phát âm..."
              />
            </Form.Item>
          </div>

          <div className="w-4/5 ml-5 ">
            <Form.Item
              layout="vertical"
              label="Loại từ"
              labelAlign="left"
              name="typeWord"
              className="h-full w-full m-0"
            >
              <Select
                mode="multiple"
                placeholder="Chọn loại từ"
                style={{ width: "100%" }}
                onChange={handleChange}
                options={types}
              />
            </Form.Item>
          </div>
        </div>

        <div className="w-full flex items-center justify-between mb-16">
          <div className="mb-3 w-3/5">
            <Form.Item
              layout="vertical"
              label="Định nghĩa"
              labelAlign="left"
              name={"define"}
              className="h-full w-full m-0"
              rules={[
                {
                  required: true,
                  message: "Định nghĩa không được bỏ trống!",
                },
              ]}
            >
              <Input
                value={meaning}
                onChange={(e) => setMeaning(e.target.value)}
                placeholder="Nhập định nghĩa"
              />
            </Form.Item>
          </div>

          <div className="mb-3 w-4/5 ml-5">
            <Form.Item
              layout="vertical"
              label="Ví dụ (Nếu có)"
              labelAlign="left"
              name="example"
              className="h-full w-full m-0"
            >
              <Input.TextArea
                value={example}
                onChange={(e) => setExample(e.target.value)}
                placeholder="Nhập ví dụ (nếu có)"
              />
            </Form.Item>
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default AddWordModal;
