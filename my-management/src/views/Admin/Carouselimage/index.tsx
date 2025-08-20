// import React, { useState } from "react";
import { Table, Flex, Button } from "antd";
import icon from "@/assets/images/icon2.png";
// 2. 定义行数据结构
interface RowType {
  key: string;
  picture: string;
  date: string;
}
const columns = [
  {
    title: "图片",
    dataIndex: "picture",
    key: "picture",
    align: "center",
    render: () => (
      <img style={{ width: "100px", height: "70px" }} src={icon} alt="" />
    ),
  },
  {
    title: "上传时间",
    dataIndex: "date",
    key: "date",
    align: "center",
  },
  {
    title: "操作",
    dataIndex: "",
    align: "center",
    render: () => (
      <Flex
        wrap
        gap="small"
        justify="center" // 水平居中
        align="center" // 垂直居中
        style={{ height: "100%" }}
      >
        <Button type="primary" danger>
          删除
        </Button>
      </Flex>
    ),
  },
];

const data:RowType[] = [
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
export default function Carouselimage() {
  return (
    <>
      <Table columns={columns} dataSource={data} />
    </>
  );
}
