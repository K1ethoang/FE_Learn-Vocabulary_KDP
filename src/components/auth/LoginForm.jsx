import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Flex } from "antd";
import { useAuth } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import axiosConfig from "../../services/axios/axiosConfig";

const LoginForm = ({ openNotification }) => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const result = await axiosConfig.post("/auth/log-in", {
      email: values.email,
      password: values.password,
    });

    console.log(result);

    console.log("Received values of form: ", values);
    // if (values.username == "test@gmail.com" && values.password == "12341234") {
    //   const fakeToken = "12345abcdef";
    //   const userData = {
    //     username: values.username,
    //     token: fakeToken,
    //     role: "user",
    //   };

    //   // Save session to sessionStorage
    //   localStorage.setItem("userSession", JSON.stringify(userData));

    //   login();
    //   navigate("/");
    // } else if (
    //   values.username == "admin@gmail.com" &&
    //   values.password == "12341234"
    // ) {
    //   const fakeToken = "12345abcdef";
    //   const userData = {
    //     username: values.username,
    //     token: fakeToken,
    //     role: "admin",
    //   };

    //   // Save session to sessionStorage
    //   localStorage.setItem("userSession", JSON.stringify(userData));

    //   login();

    //   navigate("/admin", { replace: true });
    // } else {
    //   openNotification("topRight");
    //   form.resetFields();
    // }
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
      <Form.Item className=" text-bg-light  ">
        <Flex justify="space-between" align="center">
          <a className="hover:text-[#ece8e8]" href="/register">
            Đăng kí ngay!
          </a>
          <a href="" className="hover:text-[#e6e2e2]">
            Quên mật khẩu?
          </a>
        </Flex>
      </Form.Item>

      <Form.Item>
        <Button size="large" block type="primary" htmlType="submit" danger>
          Đăng nhập
        </Button>
      </Form.Item>
    </Form>
  );
};
export default LoginForm;
