import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import React, { useState } from "react";
import animation_forgot_password from "../../../assets/images/animation_forgot_password.lottie";
import { Form, Input, Steps } from "antd";
import { Button, message, theme } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { MdOutlineGeneratingTokens } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";

const ForgotPassword = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [email, setEmail] = useState();
  const [tokenCreateNewPass, setTokenCreateNewPass] = useState();
  const [newPassword, setNewPassword] = useState();
  const steps = [
    {
      title: <span className="text-bg-light">Bước 1</span>,
      content: (
        <div className="w-full  flex  justify-center items-center">
          <Form className="w-full h-28 flex items-center justify-center">
            <Form.Item
              name="email"
              label={<span className="text-bg-light ">Email</span>}
              className="w-2/3"
              rules={[
                {
                  required: true,
                  message: "Email không được bỏ trống!",
                },
                {
                  required: false,
                  type: "email",
                  message: "Email không đúng định dạng!",
                },
              ]}
            >
              <Input
                className=""
                autoFocus
                size="large"
                prefix={<UserOutlined />}
                placeholder="Nhập email người dùng"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>
          </Form>
        </div>
      ),
    },
    {
      title: <span className="text-bg-light">Bước 2</span>,
      content: (
        <span className="text-bg-light">
          Vui lòng kiểm tra email <b>{email}</b> của bạn
        </span>
      ),
    },
    {
      title: <span className="text-bg-light">Bước 3</span>,
      content: (
        <div className="w-full  h-fit">
          <Form
            layout="vertical"
            className="w-full h-fit flex flex-col items-center p-2"
          >
            <Form.Item
              name="token"
              label={<span className="text-bg-light">Token</span>}
              className="w-2/3"
              rules={[
                {
                  required: true,
                  message: "Token không được bỏ trống!",
                },
              ]}
            >
              <Input
                className=""
                autoFocus
                size="large"
                prefix={<MdOutlineGeneratingTokens />}
                placeholder="Nhập token đã gửi tới email"
                value={tokenCreateNewPass}
                onChange={(e) => setTokenCreateNewPass(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="email"
              label={<span className="text-bg-light">Email</span>}
              className="w-2/3"
              rules={[
                {
                  required: true,
                  message: "Email không được bỏ trống!",
                },
                {
                  required: false,
                  type: "email",
                  message: "Email không đúng định dạng!",
                },
              ]}
            >
              <Input
                disabled
                defaultValue={email}
                autoFocus
                size="large"
                prefix={<UserOutlined />}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="password"
              label={<span className="text-bg-light">Mật khẩu mới</span>}
              className="w-2/3"
              rules={[
                {
                  required: true,
                  message: "Mật khẩu không được bỉ trống",
                },
                {
                  min: 8,
                  message: "Mật khẩu phải lớn hớn hoặc bằng 8 kí tự",
                },
                {
                  max: 40,
                  message: "Mật khẩu phải nhỏ hơn hoặc bằng 40 kí tự",
                },
              ]}
            >
              <Input
                className=""
                autoFocus
                size="large"
                prefix={<TbLockPassword />}
                placeholder="Nhập mật khẩu mới của người dùng"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Form.Item>
          </Form>
        </div>
      ),
    },
  ];

  const next = () => {
    if (current === 0) {
      console.log(email);
    }
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  const contentStyle = {
    lineHeight: "260px",
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  const handleForgotPassword = () => {
    message.success("Processing complete!");
    console.log("data", {
      tokenCreateNewPass,
      email,
      newPassword,
    });
  };
  return (
    <div className="w-full h-screen bg-bg-main flex flex-col items-center pt-2 ">
      <div className="w-fit h-1/3 pb-2 ">
        <DotLottieReact src={animation_forgot_password} loop autoplay />
      </div>

      <div className="w-1/2">
        <Steps current={current} items={items} />
        <div style={contentStyle}>{steps[current].content}</div>
        <div style={{ marginTop: 24 }}>
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Bước tiếp
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" onClick={handleForgotPassword}>
              Hoàn tất
            </Button>
          )}
          {current > 0 && (
            <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
              Bước trước
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
