import { useEffect, useState } from "react"
import type { FormProps } from 'antd';
import { message } from 'antd'
import { Button, Checkbox, Form, Input } from 'antd';
import banner from "@/assets/images/banner.webp"
import icon from "@/assets/images/icon.png"
import styles from "./login.module.scss"
import { LoginApi, captchaApi } from '@/api/login'

import { useNavigate } from "react-router-dom"
//验证码

function Login() {
    useEffect(() => {
        // 这个函数只会在组件挂载时执行一次
        functionToRunOnMount();
        captcha()
    }, []);
    const functionToRunOnMount = () => {
        // 你想要在开始时执行的代码
        console.log('组件已挂载');
    };
    type FieldType = {
        username?: string;
        password?: string;
        code: String;
        remember?: string;
    };
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate()
    const onFinish: FormProps<FieldType>['onFinish'] = (values) => { //

        if (values.remember == 'true') {
            localStorage.setItem('userInfo', JSON.stringify(values));
        }
        LoginApi({ account: values.username, ...values }).then(res => {
            messageApi.open({
                type: res.data.code == 200 ? 'success' : 'error',
                content: res.data.message,
            });
            localStorage.setItem('userToken', res.data.data)
            if (res.data.code == 200) {
                console.log(res.data)
                navigate("/home")

            }
        })
    };
    const [captchaImg, setCaptchaImg] = useState("");

    const captcha = () => {
        captchaApi().then((res) => {
            // 创建Blob对象
            var blob = new Blob([res.data], { type: 'image/jpeg' });
            // 创建临时URL
            var imageUrl = URL.createObjectURL(blob);
            setCaptchaImg(imageUrl.toString())
        })
    }



    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (<>
        {contextHolder}
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
                        label="验证码"
                        name="code"
                        rules={[{ required: true, message: 'Please input your code!' },]}
                    >
                        <div style={{ display: "flex", justifyContent: "space-between" }}><Input style={{ width: "49%" }} placeholder="验证码" />
                            <img onClick={() => captcha()} style={{ width: "49%", height: "32px" }} src={captchaImg} alt="" />
                        </div>
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