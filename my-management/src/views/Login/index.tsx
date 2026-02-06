import { LoginApi, captchaApi } from "@/api/login";
import banner from "@/assets/images/banner.webp";
import icon from "@/assets/images/icon.png";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.scss";

// 从外部类型文件导入（如果存在），否则使用内联定义
// import { loginType } from "@/types";

interface loginType {
  username?: string;
  password?: string;
  code?: string;
  remember?: boolean;
}

function Login() {
  const [messageApi, contextHolder] = message.useMessage();
  const [captchaImg, setCaptchaImg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    captcha();
  }, []);

  const captcha = () => {
    captchaApi().then((res) => {
      const blob = new Blob([res.data], { type: "image/jpeg" });
      const imageUrl = URL.createObjectURL(blob);
      setCaptchaImg(imageUrl);
    });
  };

  const onFinish: FormProps<loginType>["onFinish"] = (values) => {
    if (values.remember) {
      localStorage.setItem("userInfo", JSON.stringify(values));
    }

    LoginApi({ account: values.username, ...values })
      .then((res) => {
        const { code, message: msg, data } = res.data;

        messageApi.open({
          type: code === 200 ? "success" : "error",
          content: msg || (code === 200 ? "登录成功" : "登录失败"),
        });

        if (code === 200) {
          localStorage.setItem("userToken", data);
          navigate("/home");
        }
      })
      .catch((err) => {
        messageApi.error("登录请求失败");
        console.error(err);
      });
  };

  const onFinishFailed: FormProps<loginType>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
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
            <Form.Item<loginType>
              label="账号"
              name="username"
              rules={[
                { required: true, message: "请输入账号!" },
                { min: 4, message: "用户名至少为4个字符!" },
                {
                  pattern: /^[^\u4e00-\u9fa5]+$/,
                  message: "不允许输入中文!",
                },
              ]}
            >
              <Input placeholder="请输入账号" />
            </Form.Item>

            <Form.Item<loginType>
              label="密码"
              name="password"
              rules={[
                { required: true, message: "请输入密码!" },
                { min: 8, message: "密码至少为8个字符!" },
              ]}
            >
              <Input.Password placeholder="请输入密码" />
            </Form.Item>

            <Form.Item<loginType>
              label="验证码"
              name="code"
              rules={[{ required: true, message: "请输入验证码!" }]}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Input style={{ width: "49%" }} placeholder="验证码" />
                <img
                  onClick={captcha}
                  style={{ width: "49%", height: "32px", cursor: "pointer" }}
                  src={captchaImg}
                  alt="验证码"
                />
              </div>
            </Form.Item>

            <Form.Item<loginType>
              name="remember"
              valuePropName="checked"
              wrapperCol={{ offset: 6, span: 16 }}
            >
              <Checkbox>记住我</Checkbox>
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
  );
}

export default Login;