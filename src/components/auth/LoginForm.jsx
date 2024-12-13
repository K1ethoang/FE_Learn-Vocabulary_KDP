
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex } from 'antd';
import { useAuth } from '../../providers/AuthProvider';
import { Navigate, useNavigate } from 'react-router-dom';



const LoginForm = ({openNotification}) => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [form] = Form.useForm()
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        if(values.username == 'test@gmail.com' && values.password == '12341234'){
            const fakeToken = '12345abcdef';
            const userData = { username: values.username, token: fakeToken , role: "user"};

            // Save session to sessionStorage
            localStorage.setItem('userSession', JSON.stringify(userData));

            login()
            navigate('/')
        }
        else if(values.username == 'admin@gmail.com' && values.password == '12341234'){
            const fakeToken = '12345abcdef';
            const userData = { username: values.username, token: fakeToken, role:'admin' };

            // Save session to sessionStorage
            localStorage.setItem('userSession', JSON.stringify(userData));

            login()

            navigate('/admin', {replace:true})
        }
        else{
            openNotification('topRight')
            form.resetFields();

        }
    };
    return (
        <Form
            form={form}
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
                    message: 'Email không được bỏ trống!',
                },
                {
                    required:false,
                    type:'email',
                    message:'Email không đúng định dạng!'
                }
                ]}
            >
                <Input autoFocus size='large' prefix={<UserOutlined />} placeholder="Nhập email người dùng" />
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
                <Input size='large' prefix={<LockOutlined />} type="password" placeholder="Nhập mật khâu" />
            </Form.Item>
            <Form.Item>
                <Flex justify="space-between" align="center">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Ghi nhớ tài khoản</Checkbox>
                </Form.Item>
                <a href="" className='hover:text-bg-light'>Quên mật khẩu?</a>
                </Flex>
            </Form.Item>

            <Form.Item>
                <Button size='large' block type="primary" htmlType="submit" danger>
                Đăng nhập
                </Button>
                <a  className='hover:text-bg-light flex justify-end pt-2' href="/register">Đăng kí ngay!</a>
            </Form.Item>
        </Form>
  );
};
export default LoginForm;