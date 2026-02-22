import { addUser } from '@/api/user';
import type { FormProps } from 'antd';
import { Button, Flex, Form, Input, message, Modal, Select } from 'antd';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { ChildRef, FieldType } from "./type";
const Add = forwardRef<ChildRef, { onchange: () => void }>((props, ref) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [typeIndex, setTypeIndex] = useState(1); //1新增 2 编辑
    const [form] = Form.useForm();
    // const [itemData, setItemData] = useState<FieldType>();

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
        addUser({
            username: values.username,
            phone: values.phone,
            type: values.type
        }).then(res => {
            message.open({
                type: res.code == 200 ? 'success' : 'error',
                content: res.message,
            });
            if (res.code == 200) {
                props.onchange()
                form.resetFields();

            }

        })

    };



    //  ref使用 forwardRef 配合 定义暴露给父组件的方法
    useImperativeHandle(ref, () => ({
        showModal(type) {
            setIsModalOpen(true);
            setTypeIndex(type);
            // setItemData(item);
        }
    }));
    // const showModal = () => {
    //     setIsModalOpen(true);
    // };
    // const handleOk = () => {
    //     setIsModalOpen(false);
    // };

    const handleCancel = () => {
        // console.log()
        setIsModalOpen(false);
    };
    return (
        <div >
            {/* onOk={handleOk} onCancel={handleCancel} */}
            <Modal title={typeIndex == 1 ? "添加管理员" : '编辑管理员'} open={isModalOpen} onCancel={handleCancel} footer={
                [] // 设置footer为空，去掉 取消 确定默认按钮
            } >
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}

                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        label="姓名"
                        name="username"
                        rules={[{ required: true, message: '请输入姓名' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="手机号"
                        name="phone"
                        rules={[
                            // 1. 必填校验
                            {
                                required: true,
                                message: '请输入手机号',

                            },
                            // 2. 手机号格式校验（核心）
                            {
                                pattern: /^1[3-9]\d{9}$/, // 标准手机号正则：以1开头，第二位3-9，后9位数字
                                message: '请输入正确的11位手机号',

                            },
                            // 可选：长度校验（兜底）
                            {
                                min: 11,
                                max: 11,
                                message: '手机号长度必须为11位',

                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="管理员类型:"
                        name="type"
                        rules={[{ required: true, message: '请选择管理员类型' }]}
                    >
                        <Select
                            options={[
                                { value: 1, label: '管理员' },
                                { value: 2, label: '超级管理员' },

                            ]}
                        />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 16, span: 16 }}>
                        <Flex gap="middle"> <Button type="primary" danger onClick={handleCancel}>
                            取消
                        </Button>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Flex>

                    </Form.Item>
                </Form>

            </Modal>
        </div>
    )
})
export default Add;