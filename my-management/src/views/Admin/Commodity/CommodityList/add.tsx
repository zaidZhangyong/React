// 文件顶部声明（解决 TS 报错）

import CustomRichEditor, { EditorRef } from "@/components/CustomRichEditor";
import UpImg from "@/components/UpImg";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import type { FormProps } from "antd";
import { Button, Flex, Form, Input, Modal, Tag } from "antd";
import { useRef, useState } from "react";
import 'react-quill/dist/quill.snow.css';


interface AddProps {
  isModalOpen: boolean;
  open: (visible: boolean) => void;
  typeIndex: true | false;
}

type FieldType = {
  url: string;
  username?: string;
  password?: string;
  remember?: string;
};

const Add: React.FC<AddProps> = ({ isModalOpen, open, typeIndex }) => {
  const [form] = Form.useForm();
  const [openAdd, setopenAdd] = useState<boolean>(false);
  const [value, setValue] = useState('');
  const [valuex, setValuex] = useState('');
  const editorRef = useRef<EditorRef>(null);
  const handleOk = () => {
    setopenAdd(false);
  };

  const handleCancel = () => {
    setopenAdd(false);
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };


  // 选项数据
  const options = [
    { id: 1, name: '尺寸', values: ['S', 'M', 'L', 'XL'] },
    { id: 2, name: '颜色', values: ['红', '蓝', '黑', '白'] },
  ];
  const handleChange = (content: string) => {
    setValuex(content);
    console.log('当前内容:', content); // 获取值
  };
  const sendData = () => {
    console.log(editorRef.current?.getContent())
  }
  return (
    <>
      <Modal
        title="添加商品"
        open={isModalOpen}
        onCancel={() => open(false)}
        onOk={sendData}
        width={1000}
        styles={{
          body: {
            maxHeight: '60vh',
            overflow: 'auto',
            padding: '24px',
          },
        }}
      >
        <Form
          name="basic"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 1000 }}
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
            <div>
              {options.map((opt) => (
                <div
                  key={opt.id}
                  className="itemBox"
                  style={{ marginBottom: "10px" }}
                >
                  <div style={{ marginBottom: "10px" }}>
                    <div className="flexSB">
                      <div>{opt.name}</div>
                      <Button
                        shape="circle"
                        size="small"
                        danger
                        icon={<MinusOutlined />}
                      />
                    </div>
                  </div>
                  <div style={{ marginTop: "5px" }}>
                    <Flex gap="small" align="center" wrap>
                      {opt.values.map((val, idx) => (
                        <Tag key={`${opt.id}-${idx}`}>{val}</Tag>
                      ))}
                    </Flex>
                  </div>
                </div>
              ))}

              <Button
                type="dashed"
                onClick={() => setopenAdd(true)}
                icon={<PlusOutlined />}
                style={{ width: "100%" }}
              >
                添加选项
              </Button>
            </div>
          </Form.Item>

          <Form.Item<FieldType>
            label="详情"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <CustomRichEditor
              ref={editorRef}
              value={valuex}
              onChange={handleChange}
              height="400px"
              uploadApi="/api/upload"
              placeholder="请输入商品详情..."
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* 添加选项 Modal */}
      <Modal
        title="添加选项"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={openAdd}
        onOk={handleOk}
        onCancel={handleCancel}

      >
        <Form
          form={form}
          name="addOption"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          style={{ maxWidth: 400 }}
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
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <div>  {/* ✅ 包裹在一个容器中 */}
              <Button
                style={{ marginLeft: "auto", display: "block" }}
                icon={<PlusOutlined />}
                type="primary"
                onClick={() => open(true)}
              >
                新增
              </Button>
              <div style={{ marginTop: "5px" }}>
                <Input />
              </div>
              <div style={{ marginTop: "5px" }}>
                <Input />
              </div>
              <div style={{ marginTop: "5px" }}>
                <Input />
              </div>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Add;