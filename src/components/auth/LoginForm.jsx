import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Flex, Spin } from "antd";
import { useAuth } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import axiosConfig from "../../services/axios/axiosConfig";
import { useState } from "react";

const LoginForm = ({ openNotification }) => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values) => {
    setError(null);
    try {
      setIsLoading(true);
      const result = await axiosConfig.post("/auth/log-in", {
        email: values.email,
        password: values.password,
      });
      const token = result.data?.result;
      const user = await login(token);

      if (user.role === "ADMIN") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (error) {
      if (
        error.response?.data?.errors[0]?.message === "User not found" ||
        error.response?.data?.errors[0]?.message === "Password is incorrect"
      ) {
        setError("Email hoặc mật khẩu không chính xác!");
      } else if (
        error.response?.data?.errors[0]?.message === "User is blocked"
      ) {
        setError("Tài khoản của bạn đã bị khóa!");
      } else {
        return;
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Form
      form={form}
      name="login"
      style={{
        maxWidth: 360,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="email"
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
          autoFocus
          size="large"
          prefix={<UserOutlined />}
          placeholder="Nhập email người dùng"
        />
      </Form.Item>
      <Form.Item
        className="m-0"
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
          {
            max: 20,
            message: "Mật khẩu phải dưới 20 kí tự.",
          },
        ]}
      >
        <Input.Password
          size="large"
          prefix={<LockOutlined />}
          type="password"
          placeholder="Nhập mật khâu"
        />
      </Form.Item>
      <div className={`text-base text-[#fc4343] ${error ? "" : "hidden"}`}>
        {error}
      </div>
      <Form.Item className=" text-bg-light  ">
        <Flex justify="space-between" align="center">
          <a className="hover:text-[#ece8e8]" href="/register">
            Đăng kí ngay!
          </a>
          <a href="/forgot-password" className="hover:text-[#e6e2e2]">
            Quên mật khẩu?
          </a>
        </Flex>
      </Form.Item>

      <Form.Item>
        <Button size="large" block type="primary" htmlType="submit" danger>
          {isLoading ? <Spin /> : "Đăng nhập"}
        </Button>
      </Form.Item>
    </Form>
  );
};
export default LoginForm;
