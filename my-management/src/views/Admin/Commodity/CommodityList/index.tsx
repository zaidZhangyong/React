import { deleteCommodity, getCommodityListAPi, getList, labelList } from "@/api/merchandise";
import { PlusOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Image, Input, message, PaginationProps, Popconfirm, Select, Table, TableColumnsType, Tag } from "antd";
import { useEffect, useState } from "react";
import Add from "./add";
// import { useRef } from "react";
// import DeleteModal, { DeleteProps } from "@/components/DeleteModal";
const CommodityList = () => {
  // const addBoxRef = useRef<ChildRef>(null);
  // const deleteBoxRef = useRef<DeleteProps>(null);
  const [form] = Form.useForm();
  const [pageNum, setPageNum] = useState(1);
  const [total, setTotal] = useState(0);
  const [dataList, setdataList] = useState<FieldType[]>([]);
  const [itemData, setItemData] = useState({
    // url: undefined,
    // name: undefined,
    // typeId: undefined,
    // labels: [],
    // quantity: undefined,
    // unitPrice: undefined,
    // selects: [],
    // detail: undefined,
    // status: undefined
  });
  const columns: TableColumnsType = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
      align: "center",

    },
    {
      title: "图片",
      dataIndex: "url",
      key: "url",
      align: "center",
      render: (img) => {
        return <Image width={100} src={img} />
      },
    },
    {
      title: "商品名称",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "商品类型",
      dataIndex: "typeId",
      key: "typeId",
      align: "center",
      render: (id) => {
        const type = typeList.find(item => item.value === id);
        return type?.label;
      },
    },
    {
      title: "商品标签",
      dataIndex: "labels",
      key: "labels",
      align: "center",
      render: (ids) => {
        console.log(ids)
        console.log(labeldata)
        if (!ids || !Array.isArray(ids) || ids.length === 0) {
          return <Tag color="default">无标签</Tag>;
        }

        // const type = typeList.find(item => item.value === id);
        return (
          <Flex gap="small" align="center" wrap>
            {
              ids.map((labelId) => {
                const labelItem = labeldata.find((item) => item.id === labelId);
                if (labelItem) {
                  return <Tag key={labelId} >{labelItem.label}</Tag>
                }
              })
            }
            {/* */}
          </Flex>
        )

      },
    },
    {
      title: "上传时间",
      dataIndex: "createdTime",
      key: "createdTime",
      align: "center",
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status) => {
        return status == 1 ? <span style={{ color: "green" }}> 上架 </span> : <span style={{ color: "red" }}> 下架</span>;
      },
    },
    {
      title: "操作",
      dataIndex: "",

      align: "center",
      render: (item) => (
        <Flex
          wrap
          gap="small"
          justify="center" // 水平居中
          align="center" // 垂直居中
          style={{ height: "100%" }}
        >
          <Button type="primary" onClick={() => editBut(item)}>
            修改
          </Button>
          <Popconfirm
            title="删除"
            description="确定删除当前标签吗？"
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            onConfirm={() => deleteItem(item.id)}
          >
            <Button danger>删除</Button>
          </Popconfirm>

        </Flex>
      ),
    },
  ];
  const editBut = (item: FieldType) => {
    setItemData({
      id: item.id,
      url: item.url,
      name: item.name,
      typeId: item.typeId,
      labels: item.labels,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      selects: item.selects,
      detail: item.detail,
      status: item.status
    });
    setIsModalOpen(true);
    setTypeIndex(2);

    // console.log(item)


  }
  const deleteItem = (id: number) => {
    deleteCommodity({ id }).then(res => {
      message.open({
        type: res.code == 200 ? 'success' : 'error',
        content: res.message,
      });

      if (res.code == 200) {
        query()
      }

    })
  }
  const showModal = () => { };
  const [loading, setLoadings] = useState<boolean>(false);
  const [typeIndex, setTypeIndex] = useState(1); //1新增 2编辑 3 查看
  const query = () => {
    setLoadings(true);
    const values = form.getFieldsValue();
    // console.log(values)
    getCommodityList(values)
    setLoadings(false);


  };
  const getCommodityList = (values: any) => {

    getCommodityListAPi({
      'pageNum': pageNum,
      'pageSize': 10,
      'name': values.name,
      'typeId': values.typeId,
      'status': values.status

    }).then(res => {
      // console.log(dataList)
      // console.log(res.data.list)
      setdataList(res.data.list)
      setTotal(res.data.total)


      setTimeout(() => {
        console.log(dataList)
      }, 1000);

    })


  }
  const onReset = () => {
    // setLoadings(false);

    form.resetFields();
    query()
  };
  const [isModalOpen, setIsModalOpen] = useState(false);


  // 修改 useState
  const [typeList, settypeList] = useState<ProductTypeItem[]>([]);

  const [labeldata, setlabeldata] = useState<BrandLabelItem[]>([]);

  const open = (type: boolean) => {
    if (type == true) {
      setItemData({
        id: "",
        url: "",
        name: "",
        typeId: undefined,
        labels: [],
        quantity: "",
        unitPrice: "",
        selects: [],
        detail: "",
        status: ""
      });
      setIsModalOpen(type);
      setTypeIndex(1);
    } else {
      setIsModalOpen(false);
      query()
    }
  };
  useEffect(() => {
    getTypeData()
    // getlabeData()

  }, []);
  const getTypeData = () => {
    getList().then(res => {
      const typeList = res.data.map((item: { id: any; type: any; }) =>
      ({
        value: item.id, // 把 id 作为 value
        label: item.type,
      })
      )
      settypeList(typeList)
      getlabeData()
    })

  }
  const getlabeData = () => {
    labelList().then(res => {
      setlabeldata(res.data)
      query()
    })
  }

  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
    console.log(current, pageSize);
  };
  return (
    <>
      <Add isModalOpen={isModalOpen} open={open} typeIndex={typeIndex} labeldata={labeldata} typeList={typeList} itemData={itemData} />
      {/* <DeleteModal ref={deleteBoxRef} deleteItem={deleteItem} /> */}
      <div className="FormInline">
        <Form layout="inline" form={form} initialValues={{ layout: "inline" }}>
          <Form.Item name="name" label="">
            <Input placeholder="请输入商品名称" />
          </Form.Item>
          <Form.Item name="typeId" label="类型">
            <Select style={{ width: "200px" }} placeholder="请选择类型" options={typeList} />
          </Form.Item>
          <Form.Item name="status" label="状态">
            <Select style={{ width: "200px" }} placeholder="请选择状态" options={[{ value: 1, label: '上架' },
            { value: 0, label: '下架' }]} />
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
      <Table loading={loading} columns={columns} dataSource={dataList} pagination={{
        current: pageNum,
        pageSize: 10,
        total: total, // 后端返回的总条数
        // showSizeChanger: true,
        // showQuickJumper: true, // 显示快速跳页
        // pageSizeOptions: ['10', '20', '50'], // 每页条数可选值
      }} onChange={(pagination) => {
        console.log(pagination)
        // 分页变化时重新请求数据
        // setCurrentPage(pagination.current);
        // setPageSize(pagination.pageSize);
        // fetchData();
      }} />

    </>
  );
};
export default CommodityList;
