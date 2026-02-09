import type { GetProp, TableProps } from "antd";
import { Button, Flex, Form, Input, Select, Table } from "antd";
import { useEffect, useRef, useState } from "react";

import { PlusOutlined } from "@ant-design/icons";
import type { SorterResult } from "antd/es/table/interface";
import Add from "./add";
import { ChildRef, DataType, FieldType } from "./type";
type ColumnsType<T extends object = object> = TableProps<T>["columns"];
type TablePaginationConfig = Exclude<
  GetProp<TableProps, "pagination">,
  boolean
>;
interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: SorterResult<unknown>["field"];
  sortOrder?: SorterResult<unknown>["order"];
  filters?: Parameters<GetProp<TableProps, "onChange">>[1];
}

export default function Manager() {
  const [data, setData] = useState<DataType[]>();
  const addBoxRef = useRef<ChildRef>(null);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const columns: ColumnsType<DataType> = [
    {
      title: "姓名",
      dataIndex: "name",
      //   sorter: true,
      //   render: (name) => `${name.first} ${name.last}`,
      width: "20%",
      align: "center",
    },
    {
      title: "性别",
      dataIndex: "gender",
      width: "20%",
      align: "center",
    },
    {
      title: "年龄",
      dataIndex: "age",
      width: "10%",
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
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
          <Button
            type="primary"
            onClick={() => {
              addUser(2);
            }}
          >
            编辑
          </Button>
          <Button type="primary" danger>
            删除
          </Button>
        </Flex>
      ),
    },
  ];

  const fetchData = () => {
    setLoading(true);
    fetch(`https://randomuser.me/api`)
      .then((res) => res.json())
      .then(({ results }) => {
        console.log(results);
        setData(results);
        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: 200,
            // 200 is mock data, you should read it from server
            // total: data.totalCount,
          },
        });
      });
  };

  useEffect(() => {
    fetchData();
  }, [
    tableParams.pagination?.current,
    tableParams.pagination?.pageSize,
    tableParams?.sortOrder,
    tableParams?.sortField,
    JSON.stringify(tableParams.filters),
  ]);

  const handleTableChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    setTableParams({
      pagination,
      filters,
      sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
      sortField: Array.isArray(sorter) ? undefined : sorter.field,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };
  const addUser = (type: number, item?: FieldType) => {
    addBoxRef?.current?.showModal(type, item);
  };
  const [form] = Form.useForm();
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  return (
    <>
      {/* 添加编辑 */}
      <Add ref={addBoxRef} />

      <div className="flexSB">
        <div>
          <Form
            layout="inline"
            form={form}
            initialValues={{ layout: "inline" }}
          >
            <Form.Item label="姓名:">
              <Input placeholder="请输入姓名" />
            </Form.Item>
            <Form.Item label="年龄:">
              <Input placeholder="请输入年龄" />
            </Form.Item>
            <Form.Item label="性别:">
              <Select
                placeholder="请选择性别"
                style={{ width: 120 }}
                onChange={handleChange}
                options={[
                  { value: "1", label: "男" },
                  { value: "2", label: "女" },
                ]}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary">Submit</Button>
            </Form.Item>
          </Form>
        </div>
        <div>
          <Button
            type="primary"
            onClick={() => {
              addUser(1);
            }}
            icon={<PlusOutlined style={{ color: "white" }} />}
          >
            添加
          </Button>
        </div>
      </div>
      <div className="matop10">
        <Table
          columns={columns}
          rowKey={(record) => record.login.uuid}
          dataSource={data}
          pagination={tableParams.pagination}
          loading={loading}
          onChange={handleTableChange}
        />
      </div>
    </>
  );
}
