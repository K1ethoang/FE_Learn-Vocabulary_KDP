import React from "react";
import BuildingScreen from "../exceptions/BuildingScreen";
import { Button, Card, Form, message } from "antd";
import { Input } from "antd";

const SupportScreen = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    // Xử lý logic gửi phản hồi tại đây
    message.success(
      "Cảm ơn bạn đã gửi phản hồi. Chúng tôi sẽ liên hệ sớm nhất có thể!"
    );
    form.resetFields();
  };

  return (
    <div className="flex justify-center items-center">
      <Card
        title="Giúp Đỡ và Phản Hồi"
        bordered={false}
        className="max-w-4xl w-full shadow-lg text-base"
      >
        <h2 className="text-lg font-semibold mb-4">Liên Hệ Hỗ Trợ</h2>
        <p className="text-gray-dark leading-relaxed mb-6">
          Nếu bạn gặp bất kỳ vấn đề nào hoặc cần hỗ trợ, vui lòng điền thông tin
          bên dưới. Chúng tôi luôn sẵn sàng giúp đỡ bạn!
        </p>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="space-y-4"
        >
          <Form.Item
            label="Họ và Tên"
            name="name"
            rules={[
              { required: true, message: "Vui lòng nhập họ và tên của bạn!" },
            ]}
          >
            <Input placeholder="Nhập họ và tên" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Vui lòng nhập địa chỉ email hợp lệ!",
              },
            ]}
          >
            <Input placeholder="Nhập email của bạn" />
          </Form.Item>

          <Form.Item
            label="Nội Dung Phản Hồi"
            name="feedback"
            rules={[
              { required: true, message: "Vui lòng nhập nội dung phản hồi!" },
            ]}
          >
            <Input.TextArea
              rows={4}
              placeholder="Nhập câu hỏi hoặc phản hồi của bạn"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Gửi Phản Hồi
            </Button>
          </Form.Item>
        </Form>

        <h2 className="text-lg font-semibold mt-8">Thông Tin Liên Hệ</h2>
        <p className="text-gray-dark leading-relaxed">
          Email:{" "}
          <a href="mailto:support@kdp-english.gmail.com">
            support@kdp-english.com
          </a>{" "}
          <br />
          Điện thoại: <a href="tel:++84 123 456 789 ">+84 123 456 789 </a>
          <br />
          Địa chỉ:{" "}
          <address>123 Đường ABC, Quận XYZ, Thành phố Hồ Chí Minh.</address>
        </p>
      </Card>
    </div>
  );
};

export default SupportScreen;
