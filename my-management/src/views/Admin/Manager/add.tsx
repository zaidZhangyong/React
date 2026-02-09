import type { FormProps } from 'antd';
import { Button, Flex, Form, Input, Modal, Radio, Select } from 'antd';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { ChildRef, FieldType } from "./type";
const Add = forwardRef<ChildRef>((props, ref) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [typeIndex, setTypeIndex] = useState(1); //1新增 2 编辑
    // const [itemData, setItemData] = useState<FieldType>();

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
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
        setIsModalOpen(false);
    };
    return (
        <div >
            {/* onOk={handleOk} onCancel={handleCancel} */}
            <Modal title={typeIndex == 1 ? "添加管理员" : '编辑管理员'} open={isModalOpen} onCancel={handleCancel} footer={
                [] // 设置footer为空，去掉 取消 确定默认按钮
            } >

                <Form
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
                        name="name"
                        rules={[{ required: true, message: '请输入姓名' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="年龄"
                        name="age"
                        rules={[{ required: true, message: '请输入年龄' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<FieldType>
                        label="性别"
                        name="gender"
                        rules={[{ required: true, message: '请选择性别' }]}
                    >
                        <Radio.Group>
                            <Radio value="1"> 男</Radio>
                            <Radio value="2">女 </Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item<FieldType>
                        label="管理员类型:"
                        name="Email"
                        rules={[{ required: true, message: '请输入邮箱' }]}
                    >
                        <Select
                            defaultValue="lucy"
                            // style={{ width: 120 }}
                            // onChange={handleChange}
                            options={[
                                { value: '1', label: '管理员' },
                                { value: '2', label: '超级管理员', disabled: true },

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