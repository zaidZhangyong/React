import { changePassword } from '@/api/login';
import {
    setKeyPath,

    setShowKey,
} from "@/store/reducer/navs";
import { LockOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, message } from 'antd';
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
export default function ChangePassword() {
    const dispatch = useDispatch();
    // 表单提交状态（控制按钮加载中效果）
    const [loading, setLoading] = useState(false);
    // 创建表单实例（用于重置表单等操作）
    const [form] = Form.useForm();
    const navigate = useNavigate();
    // 表单提交处理函数
    const handleSubmit = async (values: any) => {
        try {
            setLoading(true);
            // 模拟接口请求（实际项目中替换为真实的接口调用）
            console.log('提交的密码信息：', values);
            // 这里可以替换为你的真实接口请求逻辑

            changePassword({ ...values })
                .then((res) => {
                    message.open({
                        type: res.code === 200 ? "success" : "error",
                        content: res.msg,
                    });

                    if (res.code === 200) {
                        localStorage.removeItem("userToken")

                        dispatch(setKeyPath([]));
                        dispatch(setShowKey("/home"));
                        setTimeout(() => {
                            navigate("/login");
                        }, 0);;
                    }
                })

            // await new Promise(resolve => setTimeout(resolve, 1000));

            // 提交成功提示
            message.success('密码修改成功！');
            // 重置表单
            form.resetFields();
        } catch (error) {
            // 提交失败提示
            message.error('密码修改失败，请重试！');
            console.error('修改密码出错：', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '80vh',
            backgroundColor: '#f5f5f5'
        }}>
            <Card title="修改密码" style={{ width: 400 }}>
                <Form
                    form={form}
                    name="change-password-form"
                    layout="vertical"
                    onFinish={handleSubmit}
                    initialValues={{ remember: true }}
                >
                    {/* 旧密码输入框 */}
                    <Form.Item
                        name="oldPassword"
                        label="旧密码"
                        rules={[
                            { required: true, message: '请输入旧密码！' },
                            { min: 6, message: '密码长度不能少于6位！' }
                        ]}
                        hasFeedback
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="请输入旧密码"
                        />
                    </Form.Item>

                    {/* 新密码输入框 */}
                    <Form.Item
                        name="newPassword"
                        label="新密码"
                        rules={[
                            { required: true, message: '请输入新密码！' },
                            { min: 6, message: '密码长度不能少于6位！' },
                            // 自定义校验：新密码不能和旧密码相同
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('oldPassword') !== value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('新密码不能与旧密码相同！'));
                                },
                            }),
                        ]}
                        hasFeedback
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="请输入新密码"
                        />
                    </Form.Item>

                    {/* 提交按钮 */}
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            block
                        >
                            确认修改
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}