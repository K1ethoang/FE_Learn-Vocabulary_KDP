
import { CheckCircleOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';

import { useNavigate } from 'react-router-dom';



const RegisterForm = ({openNotification}) => {

    const navigate = useNavigate();
    // const [form] = Form.useForm()
    const onFinish = (values) => {
        openNotification('topRight')
        setTimeout(() => {
            navigate('/login')
        }, 1600)
        //form.resetFields();


    };
    return (
        <Form
            // form={form}
            name="login"
            initialValues={{
                remember: true,
            }}
            style={{
                maxWidth: 360,
            }}
            onFinish={onFinish}
        >
            <Form.Item
                name="username"
                rules={[
                {
                    required: true,
                    message: 'Tên đăng nhập không được bỏ trống!',
                },
                ]}
            >
                <Input autoFocus size='large' prefix={<UserOutlined />} placeholder="Nhập tên đăng nhập" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                {
                    required: true,
                    message: 'Mật khẩu không được bỏ trống!',
                },
                {

                    min:8,
                    message:'Mật khẩu phải trên 8 kí tự.'
                }
                ]}
            >
                <Input size='large' prefix={<LockOutlined />} type="password" placeholder="Nhập mật khẩu" />
            </Form.Item>

            <Form.Item
                name="confirm"
                dependencies={['password']}
                hasFeedback
                rules={[
                {
                    required: true,
                    message: 'Nhập lại mật khẩu đã nhập!',
                },
                ({ getFieldValue }) => ({
                    validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                    }
                    return Promise.reject(new Error('Mật khẩu không khớp, vui lòng kiểm tra lại!'));
                    },
                }),
                ]}
            >
                <Input size='large' prefix={<CheckCircleOutlined />} type="password" placeholder="Nhập lại mật khẩu" />
            </Form.Item>


            <Form.Item>
                <Button size='large' block type="primary" htmlType="submit" danger>
                Đăng kí
                </Button>
                <div className='flex items-center justify-end mt-2'>
                    <span> Bạn đã có tài khoản? </span>
                    <a  className='hover:text-bg-light flex justify-end ml-1' href="/login"> Đăng nhập ngay!</a>

                </div>
            </Form.Item>
        </Form>
  );
};
export default RegisterForm;