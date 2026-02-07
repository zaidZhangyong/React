import ModalBox from "@/components/ModalBox";
import UpImg from "@/components/UpImg";
import { PlusOutlined } from "@ant-design/icons";
import type { FormProps } from "antd";
import { Button, Form, Input, Modal } from "antd";
import { useState } from "react";
interface AddProps {
  isModalOpen: boolean;
  open: (visible: boolean) => void; // 控制弹窗显隐的回调
  typeIndex: true | false; // 1 新增 2 编辑
}
type FieldType = {
  url: String;
  username?: string;
  password?: string;
  remember?: string;
};

const Add: React.FC<AddProps> = ({ isModalOpen, open, typeIndex }) => {
  const [form] = Form.useForm(); // 创建 form 实例
  const [openAdd, setopenAdd] = useState<boolean>(false);

  const handleOk = () => {
    // form.submit();
      setopenAdd(false);
    // setopenAdd(false);
  }
  const handleCancel = () => {
    setopenAdd(false);
  }
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <ModalBox
        open={isModalOpen}
        typeIndex={typeIndex}
        onCancel={() => open(false)}
      >
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="商品图片"
            name="url"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <div style={{ width: "300px", height: "150px" }}>
              <UpImg />
            </div>
          </Form.Item>

          <Form.Item<FieldType>
            label="商品名称"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="商品数量"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="商品单价"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="选项"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >

            <div></div>

            {/* <Form
              name="basic"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="名称"
                name="password"
                rules={[{ required: true, message: "Please input name!" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="选项内容"
                name="password"
                rules={[{ required: true, message: "Please input name!" }]}
              >
                <Input />
              </Form.Item>
            </Form> */}


            <Button
              type="dashed"
              onClick={() => setopenAdd(true)}
              icon={<PlusOutlined />}
              style={{ width: "100%" }}
            >
              添加选项
            </Button>
          </Form.Item>


          <Form.Item label={null} className="form-button">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </ModalBox>


      <Modal
        title="添加选项"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={openAdd}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          style={{ maxWidth: 400 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="选项名称"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="选项类别"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Button
              style={{
                marginLeft: "auto",
                display: "block"
              }}
              icon={<PlusOutlined />}
              type="primary"
              onClick={() => {
                open(true);
              }}
            >
              新增
            </Button>
            <div style={{ marginTop: "5px" }}>
              <Input />
            </div>

            <div style={{ marginTop: "5px" }}>
              <Input />
            </div>    <div style={{ marginTop: "5px" }}>
              <Input />
            </div>

          </Form.Item>



        </Form>
      </Modal>
    </>
  );
};
export default Add;
