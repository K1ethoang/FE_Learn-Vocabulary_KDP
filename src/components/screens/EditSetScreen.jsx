import React from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Input, Card, Form, Select, Typography } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

const { TextArea } = Input;

const EditSetScreen = () => {
  const location = useLocation();
  const { id } = location.state;
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const handleChange = (value) => {
    console.log(value);
  };

  const handleSubmit = () => {
    const author = "Tôi";
    navigate(`/studies/${id}`, { state: { author } });
  };
  return (
    <div>
      <div className="w-full h-18 flex justify-between items-center">
        <div>
          <Button type="primary" onClick={() => navigate(-1)}>
            Quay về học phần
          </Button>
        </div>
      </div>

      <div className="mt-5">
        <span>Tiêu đề</span>
        <Input
          activeBg="#f7f6f5c2"
          size="large"
          placeholder="Nhập tiêu đề, ví dụ: ' Chủ đề A ' "
        />
      </div>
      <div className="mt-5 mb-8">
        <span>Mô tả</span>
        <TextArea
          placeholder="Thêm mô tả..."
          autoSize={{ minRows: 2, maxRows: 6 }}
        />
      </div>

      <span className="font-semibold text-xl">Nhập từ và nghĩa của từ:</span>

      <div className="mt-6">
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          form={form}
          name="dynamic_form_complex"
          style={{ maxWidth: "100%" }}
          autoComplete="off"
          initialValues={{ items: [{}] }}
        >
          <Form.List name="items">
            {(fields, { add, remove }) => (
              <div
                style={{
                  display: "flex",
                  rowGap: 16,
                  flexDirection: "column",
                }}
              >
                {fields.map((field) => (
                  <Card
                    hoverable
                    size="default"
                    title={`Thẻ ${field.name + 1}`}
                    key={field.key}
                    extra={
                      <DeleteOutlined
                        style={{ fontSize: 20 }}
                        onClick={() => {
                          remove(field.name);
                        }}
                      />
                    }
                    bordered
                    style={{
                      border: "0.1 solid",
                      borderColor: "rgb(189,186,186)",
                    }}
                  >
                    <div className="flex w-full h-20  flex-col  justify-center">
                      <div className="flex items-center justify-between">
                        <Form.Item
                          label="THUẬT NGỮ"
                          labelAlign="left"
                          name={[field.name, "word"]}
                          className="h-full w-5/12  m-0"
                        >
                          <Input
                            size="large"
                            allowClear
                            placeholder="Nhập thuật ngữ..."
                          />
                        </Form.Item>
                        <Form.Item
                          label="ĐỊNH NGHĨA"
                          labelAlign="left"
                          name={[field.name, "define"]}
                          className="h-full w-5/12 m-0"
                        >
                          <Input
                            size="large"
                            allowClear
                            placeholder="Nhập định nghĩa..."
                          />
                        </Form.Item>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <Form.Item
                          label="VÍ DỤ (NẾU CÓ)"
                          labelAlign="left"
                          name={[field.name, "example"]}
                          className="h-full w-5/12 m-0"
                        >
                          <Input
                            size="large"
                            allowClear
                            placeholder="Nhập ví dụ(nếu có)..."
                          />
                        </Form.Item>
                        <Form.Item
                          label="Loại từ"
                          labelAlign="left"
                          name={[field.name, "typeWord"]}
                          className="h-full w-5/12 m-0"
                        >
                          <Select
                            placeholder="Chọn loại từ"
                            style={{ width: 160 }}
                            onChange={handleChange}
                            options={[
                              { value: "noun", label: "Danh từ" },
                              { value: "adj", label: "Tính từ" },
                              { value: "verb", label: "Động từ" },
                              { value: "adv", label: "Trạng từ" },
                            ]}
                          />
                        </Form.Item>
                      </div>
                    </div>
                  </Card>
                ))}

                <Button type="dashed" onClick={() => add()} block>
                  + Thêm thẻ ghi
                </Button>
              </div>
            )}
          </Form.List>

          {/* <Form.Item noStyle shouldUpdate>
            {() => (
              <Typography>
                <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
              </Typography>
            )}
          </Form.Item> */}
        </Form>
      </div>

      <div className="w-full mt-3 flex justify-end">
        <Button
          style={{ width: 100, height: 40 }}
          type="primary"
          onClick={handleSubmit}
        >
          Hoàn tất
        </Button>
      </div>
    </div>
  );
};

export default EditSetScreen;
