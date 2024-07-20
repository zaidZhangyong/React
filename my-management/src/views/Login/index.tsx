
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import banner from "@/assets/images/banner.webp"
import icon from "@/assets/images/icon.png"
import styles from "./login.module.scss"
import { LoginApi } from '@/api/login'

function Login() {



    type FieldType = {
        username?: string;
        password?: string;
        remember?: string;
    };
    const onFinish: FormProps<FieldType>['onFinish'] = (values) => { //
        console.log(values);

        if (values.remember == 'true') {
            localStorage.setItem('userInfo', JSON.stringify(values));
        }
        // LoginApi(values).then(res => {
        //     //登录成功。处理区域...
        //     console.log(res);

        // }).catch(err => {
        //     //登录失败。处理区域...
        //     console.log(err);
        // })
    };





    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (<>
        <div className={styles.login}>
            <img className={styles.banner} src={banner} alt="banner" />
            <div className={styles.showbox}>
                <div className={styles.information}>
                    <div className={styles.iconBox}>
                        <img src={icon} alt="icon" />

                    </div>
                    <div className={styles.name}>11111</div>
                </div>
                <Form
                    name="basic"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 800 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        label="账号"
                        name="username"
                        rules={[
                            { required: true, message: 'Please input your username!' },
                            {
                                min: 4,
                                message: '用户名至少为4个字符!',
                            },
                            {
                                pattern: /^[^\u4e00-\u9fa5]+$/, // 匹配不包含中文字符的任何字符串
                                message: '不允许输入中文和特殊符号!',
                            }
                        ]}
                    >
                        <Input placeholder="请输入账号" />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="密码"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' },
                        {
                            min: 8,
                            message: '密码至少为8个字符!',
                        },
                        ]}
                    >
                        <Input.Password placeholder="请输入密码" />
                    </Form.Item>

                    <Form.Item<FieldType>
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{ offset: 6, span: 16 }}
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 17, span: 10 }}>
                        <Button type="primary" htmlType="submit">
                            登录
                        </Button>
                    </Form.Item>
                </Form>

            </div>
        </div>

    </>
    )
}
export default Login;