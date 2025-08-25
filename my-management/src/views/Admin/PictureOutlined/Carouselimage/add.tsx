import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Modal, Button, Form } from "antd";
import UpImg from "@/components/UpImg";
export type FieldType = {
  name?: string;
  age?: string;
  gender?: string;
  Email?: string;
};
export interface ChildRef {
  showModal: (type: string, item?: FieldType) => void;
}
const Add = forwardRef<ChildRef>((_, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [type, setType] = useState("add"); //add新增 2 edit编辑
  const close = () => {
    setIsModalOpen(false);
  };
  // 把 open / close 显式挂到 ref 上
  useImperativeHandle(ref, () => ({
    showModal(type) {
      setIsModalOpen(true);
      setType(type);
    },
  }));
  const handleSubmit = (value: { img: string }) => {
    console.log(value);
    close();
    // try {
    //   const values = await form.validateFields(); // 2️⃣ 取值
    //   console.log(values); // { username: 'xxx' }
    // } catch (errorInfo) {
    //   console.log("校验失败:", errorInfo);
    // }
  };
  return (
    <>
      <Modal
        title={type == "add" ? "新增" : "编辑"}
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        // onOk={handleSubmit}
        onCancel={close}
        footer={null}
      >
        <Form
          name="wrap"
          labelCol={{ flex: "110px" }}
          labelAlign="right"
          labelWrap
          wrapperCol={{ flex: 1 }}
          colon={false}
          onFinish={handleSubmit}
        >
          <Form.Item
            label="图片"
            name="img"
            rules={[{ required: true, message: "请上传图片!" }]}
          >
            <UpImg />
          </Form.Item>

          <Form.Item label=" " className="form-button">
            <Button type="primary" htmlType="submit" >
              确定
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
});

export default Add;
