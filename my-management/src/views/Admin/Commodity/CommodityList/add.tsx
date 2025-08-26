import ModalBox from "@/components/ModalBox";
import UpImg from "@/components/UpImg";
import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
interface AddProps {
  isModalOpen: boolean;
  open: (visible: boolean) => void; // 控制弹窗显隐的回调
  typeIndex: true | false; // 1 新增 2 编辑
}
type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};
const Add: React.FC<AddProps> = ({ isModalOpen, open, typeIndex }) => {
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
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <UpImg />
          </Form.Item>

          <Form.Item<FieldType>
            label="商品名称"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="商品简介"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="商品详情"
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
          <Form.Item label={null} className="form-button">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </ModalBox>
    </>
  );
};
export default Add;
