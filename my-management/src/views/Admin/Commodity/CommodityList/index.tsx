import { Table, Flex, Button, TableColumnsType, Form, Input } from "antd";
import icon from "@/assets/images/icon2.png";
import { Image } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import Add from "./add";
// import { useRef } from "react";
// import DeleteModal, { DeleteProps } from "@/components/DeleteModal";
const CommodityList = () => {
  // const addBoxRef = useRef<ChildRef>(null);
  // const deleteBoxRef = useRef<DeleteProps>(null);
  const [form] = Form.useForm();
  const columns: TableColumnsType = [
    {
      title: "图片",
      dataIndex: "picture",
      key: "picture",
      align: "center",
      render: () => <Image width={100} src={icon} />,
    },
    {
      title: "商品名称",
      dataIndex: "picture",
      key: "picture",
      align: "center",
    },
    {
      title: "商品介绍",
      dataIndex: "picture",
      key: "picture",
      align: "center",
    },
    {
      title: "商品详情",
      dataIndex: "picture",
      key: "picture",
      align: "center",
    },
    {
      title: "上传时间",
      dataIndex: "date",
      key: "date",
      align: "center",
    },
    {
      title: "当前数据",
      dataIndex: "date",
      key: "date",
      align: "center",
    },
    {
      title: "操作",
      dataIndex: "",
      key: "",
      align: "center",
      render: () => (
        <Flex
          wrap
          gap="small"
          justify="center" // 水平居中
          align="center" // 垂直居中
          style={{ height: "100%" }}
        >
          <Button type="primary" danger onClick={() => showModal()}>
            删除
          </Button>
        </Flex>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      picture: "John Brown",
      date: "2015.6.1",
    },
    {
      key: "2",
      picture: "John Brown",
      date: "2015.6.1",
    },
    {
      key: "3",
      picture: "John Brown",
      date: "2015.6.1",
    },
  ];
  const showModal = () => {};
  // deleteBoxRef.current?.showModal("确认删除当前图片！！");
  // };
  // const setUser = (type: string) => {
  //   // addBoxRef.current?.showModal(type);
  // };
  // const deleteItem = () => {
  //   // deleteBoxRef.current?.close();
  // };
  const [loading, setLoadings] = useState<boolean>(false);
  const [typeIndex, setTypeIndex] = useState(true); //true新增 false编辑
  const query = () => {
    setLoadings(true);
  };
  const onReset = () => {
    setLoadings(false);
    form.resetFields();
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const open = (type: boolean) => {
    setIsModalOpen(type);
    setTypeIndex(true);
  };

  return (
    <>
      <Add isModalOpen={isModalOpen} open={open} typeIndex={typeIndex} />
      {/* <DeleteModal ref={deleteBoxRef} deleteItem={deleteItem} /> */}
      <div className="FormInline">
        <Form layout="inline" form={form} initialValues={{ layout: "inline" }}>
          <Form.Item label="">
            <Input size="large" placeholder="请输入商品名称" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" onClick={() => query()}>
              Submit
            </Button>
            <Button type="primary" onClick={() => onReset()}>
              Reset
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div style={{ margin: "10px 0" }}>
        <Button
          icon={<PlusOutlined />}
          type="primary"
          onClick={() => {
            open(true);
          }}
        >
          新增
        </Button>
        {/* <Add ref={addBoxRef} /> */}
      </div>
      <Table loading={loading} columns={columns} dataSource={data} />
    </>
  );
};
export default CommodityList;
