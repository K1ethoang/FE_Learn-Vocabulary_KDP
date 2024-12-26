import {
  CheckCircleOutlined,
  LockOutlined,
  MailOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Spin } from "antd";

import { useNavigate } from "react-router-dom";
import axiosConfig from "../../services/axios/axiosConfig";
import { useState } from "react";

const RegisterForm = ({ openNotification }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [check, setCheck] = useState(false);
  const [email, setEmail] = useState();
  const [errorEmail, setErrorEmail] = useState("");
  const navigate = useNavigate();
  // const [form] = Form.useForm()
  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    setErrorEmail("");
    try {
      setIsLoading(true);
      const { username, email, password } = values;
      setEmail(email);
      const res = await axiosConfig.post("/auth/register", {
        fullName: username,
        email,
        password,
      });
      console.log("res register: ", res?.data);

      if (res.data.statusCode === 201) {
        openNotification("topRight");
      }
    } catch (error) {
      if (error.response?.data?.statusCode === 400) {
        console.log("error", error.response?.data?.errors[0]?.message);
        if (
          error.response?.data?.errors[0]?.message === "Email is already exist"
        ) {
          setErrorEmail("Email đã tồn tại!");
        }
      } else {
        openNotification("topRight", "error", "Đăng kí thất bại!");
      }
    } finally {
      setIsLoading(false);
      setCheck(true);
    }
  };

  const hanldeResentToken = (email) => {};
  return (
    <Form
      // form={form}
      name="register"
      style={{
        maxWidth: 360,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        autoFocus
        rules={[
          {
            required: true,
            message: "Tên không được bỏ trống!",
          },
          {
            min: 5,
            message: "Tên phải trên 5 kí tự.",
          },
          {
            max: 40,
            message: "Tên phải dưới 40 kí tự.",
          },
        ]}
      >
        <Input
          autoFocus
          size="large"
          prefix={<UserOutlined />}
          placeholder="Nhập tên"
        />
      </Form.Item>

      <Form.Item
        className={`${errorEmail ? "mb-0" : ""}`}
        name="email"
        rules={[
          {
            required: true,
            message: "Email không được bỏ trống!",
          },
          {
            type: "email",
            message: "Email không đúng định dạng!",
          },
        ]}
      >
        <Input
          type="email"
          size="large"
          prefix={<MailOutlined />}
          placeholder="Nhập email người dùng"
        />
      </Form.Item>
      <span
        className={`text-[#ff1c1c] m-0 p-0 text-base ${
          errorEmail ? "" : "hidden"
        }`}
        style={{ margin: 0, padding: 0 }}
      >
        {errorEmail}
      </span>

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Mật khẩu không được bỏ trống!",
          },
          {
            min: 8,
            message: "Mật khẩu phải trên 8 kí tự.",
          },
        ]}
      >
        <Input.Password
          size="large"
          prefix={<LockOutlined />}
          type="password"
          placeholder="Nhập mật khẩu"
        />
      </Form.Item>

      <Form.Item
        name="confirm"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Nhập lại mật khẩu đã nhập!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("Mật khẩu không khớp, vui lòng kiểm tra lại!")
              );
            },
          }),
        ]}
      >
        <Input.Password
          size="large"
          prefix={<CheckCircleOutlined />}
          type="password"
          placeholder="Nhập lại mật khẩu"
        />
      </Form.Item>

      <Form.Item>
        <Button size="large" block type="primary" htmlType="submit" danger>
          {isLoading ? <Spin /> : "Đăng kí"}
        </Button>

        {check ? (
          <div className="flex items-center justify-end mt-2 text-bg-light">
            <span> Bạn chưa nhận được mã xác thực? </span>
            <a
              className="hover:underline hover:text-gray-light flex justify-end ml-1"
              onClick={hanldeResentToken}
            >
              {" "}
              Gửi lại!
            </a>
          </div>
        ) : null}

        <div className="flex items-center justify-end mt-2 text-bg-light">
          <span> Bạn đã có tài khoản? </span>
          <a
            className="hover:underline hover:text-gray-light flex justify-end ml-1"
            href="/login"
          >
            {" "}
            Đăng nhập ngay!
          </a>
        </div>
      </Form.Item>
    </Form>
  );
};
export default RegisterForm;
