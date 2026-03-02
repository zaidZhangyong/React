import type { FormProps, GetProp, TableProps } from "antd";
import { Button, Form, Input, message, Select, Table, Tag } from "antd";
import { useEffect, useRef, useState } from "react";

import { getDataList } from "@/api/order";
import type { SorterResult } from "antd/es/table/interface";
// import Add from "./add";
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
    const statusMap = {
        0: { text: '待支付', color: 'orange' },    // 或者 color: 'warning'
        1: { text: '已支付', color: 'blue' },      // 或者 color: 'processing'
        2: { text: '已完成', color: 'green' },     // 或者 color: 'success'
        3: { text: '已取消', color: 'red' },       // 或者 color: 'error'
    };

    const columns: ColumnsType<DataType> = [
        {
            title: "订单号",
            dataIndex: "orderNum",
            //   sorter: true,
            //   render: (name) => `${name.first} ${name.last}`,
            width: "20%",
            align: "center",
        },
        {
            title: "数量",
            dataIndex: "number",
            //   sorter: true,
            //   render: (name) => `${name.first} ${name.last}`,
            width: "20%",
            align: "center",
        },
        {
            title: "单价",
            dataIndex: "price",
            //   sorter: true,
            //   render: (name) => `${name.first} ${name.last}`,
            width: "20%",
            align: "center",
        },
        {
            title: "总价",
            dataIndex: "totalPrice",
            //   sorter: true,
            //   render: (name) => `${name.first} ${name.last}`,
            width: "20%",
            align: "center",
        },

        {
            title: "状态",
            dataIndex: "status",
            //   sorter: true,
            //   render: (name) => `${name.first} ${name.last}`,
            width: "20%",
            align: "center",
            render: (text, record) => {
                const status = record.status ?? -1;
                console.log(status)
                // 定义状态映射：值 -> { 文字, 颜色/类型 }
                // color 可以是具体颜色字符串 ('red', 'green') 或 Antd 预设语义色 ('success', 'processing', 'error', 'default')


                // 获取当前状态配置，如果找不到对应的状态，显示默认值
                const config = statusMap[status as keyof typeof statusMap] || {
                    text: '未知状态',
                    color: 'default',
                };

                return (
                    <Tag color={config.color} style={{ fontWeight: 'bold', minWidth: '60px', textAlign: 'center' }}>
                        {config.text}
                    </Tag>
                );
            }
        },
        {
            title: "创建时间",
            dataIndex: "createTime",
            width: "10%",
            align: "center",
        },
    ];

    const getList = () => {
        console.log(555)
        setLoading(true);
        getDataList({
            "status": form.getFieldValue('status'),
            "orderNum": form.getFieldValue('orderNum')
        }).then(res => {
            message.open({
                type: res.code == 200 ? 'success' : 'error',
                content: res.message,
            });
            if (res.code == 200) {
                console.log(res.data)

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
            {/* <Add ref={addBoxRef} /> */}

            <div className="flexSB">
                <div>
                    <Form
                        layout="inline"
                        form={form}
                        initialValues={{ layout: "inline" }}
                        onFinish={onFinish}

                    >
                        <Form.Item name="orderNum" label="电话:">
                            <Input placeholder="请输入订单编号" />
                        </Form.Item>
                        <Form.Item name="status" label="状态:" rules={[{ required: true, message: '请选择状态' }]}>
                            <Select placeholder="请选择状态" style={{ width: 120 }}>
                                {Object.entries(statusMap).map(([value, { text }]) => (
                                    <Select.Option key={value} value={value}>
                                        {text}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" onClick={onFinish}>Submit</Button>
                            <Button type="primary" onClick={() => onReset()} style={{ marginLeft: "10px" }}>
                                Reset
                            </Button>
                        </Form.Item>
                    </Form>
                </div>

            </div >
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
