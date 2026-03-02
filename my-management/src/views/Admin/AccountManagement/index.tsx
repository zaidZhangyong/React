import type { FormProps, GetProp, TableProps } from "antd";
import { Button, Form, Image, Input, message, Table } from "antd";
import { useEffect, useRef, useState } from "react";

import { getaUserList } from "@/api/user";
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

export default function AccountManagement() {
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
      dataIndex: "username",
      //   sorter: true,
      //   render: (name) => `${name.first} ${name.last}`,
      width: "20%",
      align: "center",
    },
    {
      title: "昵称",
      dataIndex: "nick",
      //   sorter: true,
      //   render: (name) => `${name.first} ${name.last}`,
      width: "20%",
      align: "center",
    },
    {
      title: "图片",
      dataIndex: "picturn",
      key: "picturn",
      align: "center",
      render: (text, record) => {
        if (!record.picturn) return <span>无图片</span>;
        return <Image width={100} src={record.picturn} />
      },
    },
    {
      title: "电话",
      dataIndex: "phone",
      width: "20%",
      align: "center",
    },
    {
      title: "地址",
      dataIndex: "email",
      align: "center",
      render: (text, record) => (
        <span>
          {record.address || ''}
          {record.detailedAddress}

        </span>)
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      width: "10%",
      align: "center",
    },
  ];

  const getList = () => {
    setLoading(true);
    getaUserList(form.getFieldValue('phone') || '').then(res => {
      message.open({
        type: res.code == 200 ? 'success' : 'error',
        content: res.message,
      });
      if (res.code == 200) {

        setData(res.data)
        // getData()
      }
    })
    setLoading(false);
  };

  useEffect(() => {
    getList();
  }, [

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

  const onchange = () => {
    getList()
  }
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    getList()
  }
  const onReset = () => {
    // setLoadings(false);

    form.resetFields();
    getList()
  }; const handleChange = (value: string) => {
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
            onFinish={onFinish}

          >
            <Form.Item name="phone" label="电话:">
              <Input placeholder="请输入电话" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" onClick={onFinish}>Submit</Button>
              <Button type="primary" onClick={() => onReset()} style={{ marginLeft: "10px" }}>
                Reset
              </Button>
            </Form.Item>
          </Form>
        </div>

      </div>
      <div className="matop10">
        <Table
          columns={columns}

          dataSource={data}
          pagination={tableParams.pagination}
          loading={loading}
          onChange={handleTableChange}
        />
      </div>
    </>
  );
}
