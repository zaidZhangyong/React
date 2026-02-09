
// 文件顶部声明（解决 TS 报错）

import UpImg from "@/components/UpImg";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import type { FormProps } from "antd";
import { Button, Flex, Form, Input, Modal, Tag } from "antd";
import BlotFormatter from 'quill-blot-formatter';
import { useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import 'react-quill/dist/quill.snow.css';
declare module 'react-quill' {
  export interface Quill {
    import: (name: string) => any;
    register: (path: string, def: any) => void;
  }
}


Quill.register('modules/blotFormatter', BlotFormatter);

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


  // 定义类型

  const [form] = Form.useForm(); // 创建 form 实例
  const [openAdd, setopenAdd] = useState<boolean>(false);
  const [value, setValue] = useState('');

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

  // 工具栏配置
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline'],
      ['image', 'video'],
    ],
    blotFormatter: {},
  };



  const handleChange = (content: string) => {
    console.log(content)
    // onChange?.(content);
  };
  return (
    <>
      <Modal
        title="添加商品"
        open={isModalOpen}
        // typeIndex={typeIndex}
        onCancel={() => open(false)}
        width={1000}
        styles={{
          body: {
            maxHeight: '60vh',  // 限制最大高度
            overflow: 'auto',    // 内容超出时滚动
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

            <div className="itemBox" style={{ marginBottom: "10px" }}>
              <div style={{ marginBottom: "10px" }}>
                <div className="flexSB">
                  <div>尺寸</div>
                  <Button shape="circle" size="small" danger icon={<MinusOutlined />}>

                  </Button>
                </div>


              </div>
              <div style={{ marginTop: "5px", }}>
                <Flex gap="small" align="center" wrap>
                  <Tag>Tag 1</Tag>
                  <Tag>Tag 1</Tag><Tag>Tag 1</Tag><Tag>Tag 1</Tag>
                </Flex>
              </div>
            </div>
            <div className="itemBox" style={{ marginBottom: "10px" }}>
              <div style={{ marginBottom: "10px" }}>
                <div className="flexSB">
                  <div>尺寸</div>
                  <Button shape="circle" size="small" danger icon={<MinusOutlined />}>

                  </Button>
                </div>


              </div>
              <div style={{ marginTop: "5px" }}>
                <Flex gap="small" align="center" wrap>
                  <Tag>Tag 1</Tag>
                  <Tag>Tag 1</Tag><Tag>Tag 1</Tag><Tag>Tag 1</Tag>
                </Flex>
              </div>
            </div>




            <Button
              type="dashed"
              onClick={() => setopenAdd(true)}
              icon={<PlusOutlined />}
              style={{ width: "100%" }}
            >
              添加选项
            </Button>
          </Form.Item>

          <Form.Item<FieldType>
            label="详情"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            {/* <Input /> */}
            <ReactQuill

              theme="snow"
         
              modules={modules}
           
              // placeholder={placeholder}
              style={{ height: "400px" }}
            />
          </Form.Item>

        </Form>
      </Modal>


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
