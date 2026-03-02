import type { FormProps, GetProp, TableProps } from "antd";
import { Button, Form, Input, message, Table } from "antd";
import { useEffect, useRef, useState } from "react";

import { getUserList, userDelete } from "@/api/user";
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
      dataIndex: "username",
      //   sorter: true,
      //   render: (name) => `${name.first} ${name.last}`,
      // width: "20%",
      align: "center",
    },
    {
      title: "电话",
      dataIndex: "phone",
      // width: "20%",
      align: "center",
    },
    // {
    //   title: "操作",
    //   dataIndex: "",
    //   align: "center",
    //   render: (item) => (
    //     <Flex
    //       wrap
    //       gap="small"
    //       justify="center" // 水平居中
    //       align="center" // 垂直居中
    //       style={{ height: "100%" }}
    //     >
    //       <Popconfirm
    //         title="删除"
    //         description="确定删除当前标签吗？"
    //         icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
    //         onConfirm={() => deleteItem(item.id)}
    //       >
    //         <Button danger>删除</Button>
    //       </Popconfirm>

    //     </Flex>
    //   ),
    // },
  ];
  const deleteItem = (id: number) => {
    userDelete({ id: id }).then(res => {
      message.open({
        type: res.code == 200 ? 'success' : 'error',
        content: res.message,
      });
      if (res.code == 200) {

        getList()
        // getData()
      }
    })
  }
  const getList = () => {
    setLoading(true);

    getUserList(form.getFieldValue('phone') || '').then(res => {
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
    // fetchData();
    getList()
  }, [
    // tableParams.pagination?.current,
    // tableParams.pagination?.pageSize,
    // tableParams?.sortOrder,
    // tableParams?.sortField,
    // JSON.stringify(tableParams.filters),
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
  };
  return (
    <>
      {/* 添加编辑 */}
      <Add ref={addBoxRef} onchange={onchange} />

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
              <Button type="primary" onClick={() => onReset()} style={{marginLeft:"10px"}}>
                Reset
              </Button>
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
          // rowKey={(record) => record.login.uuid}
          dataSource={data}
          pagination={tableParams.pagination}
          loading={loading}
          onChange={handleTableChange}
        />
      </div>
    </>
  );
}
