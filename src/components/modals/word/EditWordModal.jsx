import { Button, Form, Input, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";

const EditWordModal = ({ openEditWordModal, handleCloseModal, data }) => {
  const item = data;
  const [form] = Form.useForm();
  const [word, setWord] = useState(item.word);
  const [meaning, setMeaning] = useState(item.meaning);
  const [typeWord, setTypeWord] = useState(["N"]);
  const [example, setExample] = useState("");
  useEffect(() => {
    setWord(item.word);
    setMeaning(item.meaning);
    setTypeWord(["N"]);
    setExample("");
    form.setFieldsValue({
      word: item.word,
      define: item.meaning,
      typeWord: ["N"],
      example: "",
    });
    console.log("check data", item);
  }, [item, form]);

  const handleChange = (value) => {
    setTypeWord(value);
  };

  const clearValues = () => {
    setWord("");
    setMeaning("");
    setTypeWord("");
    setExample("");
    form.resetFields();
  };
  const handleOK = () => {
    const newWord = {
      word,
      meaning,
      typeWord,
      example,
    };

    console.log("newWord:", newWord);
    clearValues();
    handleCloseModal();
  };

  return (
    <Modal
      title={`Chỉnh sửa từ ${item.word}`}
      centered
      open={openEditWordModal}
      onOk={handleOK}
      onCancel={handleCloseModal}
      width={700}
      footer={[
        <Button key="cancel" type="default" onClick={handleCloseModal}>
          Hủy
        </Button>,
        <Button
          disabled={word == "" || meaning == "" || typeWord == ""}
          key="submit"
          onClick={handleOK}
          color="primary"
          variant="solid"
        >
          Sửa
        </Button>,
      ]}
    >
      <Form
        form={form}
        name="dynamic_form_complex"
        style={{ maxWidth: "100%" }}
        autoComplete="off"
        // initialValues={{
        //   word: item.word,
        //   define: item.meaning,
        //   typeWord: ["N"],
        //   example: "",
        // }}
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
                // defaultValue={item.word}
                value={word}
                onChange={(e) => setWord(e.target.value)}
                placeholder="Nhập thuật ngữ"
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
                // defaultValue={["N"]}
                mode="multiple"
                placeholder="Chọn loại từ"
                style={{ width: "100%" }}
                onChange={handleChange}
                options={[
                  { value: "N", label: "Danh từ" },
                  { value: "Adj", label: "Tính từ" },
                  { value: "V", label: "Động từ" },
                  { value: "Adv", label: "Trạng từ" },
                ]}
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
                // defaultValue={item.meaning}
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
                // defaultValue={""}
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

export default EditWordModal;
