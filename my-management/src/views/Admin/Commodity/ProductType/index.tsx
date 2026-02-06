import { deleteItem } from '@/api/swiper';
import { PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { DragDropContext, Draggable, Droppable, DropResult } from '@hello-pangea/dnd'; // 或 'react-beautiful-dnd'
import { Button, Flex, Form, FormProps, Input, message, Modal, Popconfirm } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';

// 拖拽表格行组件
interface DraggableBodyRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
    index: number;
    [key: string]: any;
}
const DraggableBodyRow = ({ className, style, ...restProps }: DraggableBodyRowProps) => {
    const index = restProps['data-row-key']
        ? restProps['data-source'].findIndex((x: any) => x.id === restProps['data-row-key'])
        : 0;
    console.log(className, style, restProps)
    return (
        <Draggable draggableId={restProps['data-row-key']} index={index} key={restProps['data-row-key']}>
            {(provided, snapshot) => (

                <tr
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`${className} ${snapshot.isDragging ? 'dragging' : ''}`}
                    style={{
                        ...provided.draggableProps.style,
                        // 关键：拖拽时保持布局
                        position: snapshot.isDragging ? 'relative' : 'static',
                        left: snapshot.isDragging ? 0 : undefined,
                        top: snapshot.isDragging ? 0 : undefined,
                        width: '100%',
                        boxSizing: 'border-box',
                    }}
                    {...restProps}
                />
            )}
        </Draggable>
    );
};
export default function ProductType() {
    interface ProductTypeItem {
        id: string;
        type: string;
        createTime: string;
    }

    // 修改 useState
    const [data, setData] = useState<ProductTypeItem[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [form] = Form.useForm(); // 创建 form 实例
    useEffect(() => {

        getData()
    }, []);


    // 拖拽结束处理
    const onDragEnd = (result: DropResult) => {
        const { destination, source } = result;

        // 没放到有效位置
        if (!destination) return;

        // 位置没变
        if (destination.index === source.index) return;

        setData((prevData) => {
            const newData = Array.from(prevData);
            const [movedItem] = newData.splice(source.index, 1);
            newData.splice(destination.index, 0, movedItem);

            // 调用后端保存排序
            const sortIds = newData.map(item => item.id);

            console.log(sortIds);

            return newData;
        });
    };


    const columns: ColumnsType = [
        {
            title: 'id',
            dataIndex: 'id',
            key: "id",
            width: '20%',
            align: 'center',
        },

        {
            title: '类型',
            dataIndex: 'type',
            width: '40%',
            align: 'center',
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            width: '20%',
            align: 'center',
        },

        {
            title: '操作',
            dataIndex: '',
            align: 'center',
            render: (_: any, record: any) => (
                <Flex wrap gap="small">
                    {/* <Button type="primary" onClick={() => deleteBut(record)} danger>
                        删除
                    </Button> */}
                    <Popconfirm
                        title="删除"
                        description="确定删除当前标签吗？"
                        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                        onConfirm={() => deleteBut(record)}
                    >
                        <Button danger>删除</Button>
                    </Popconfirm>
                </Flex>
            ),
        },
    ];
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        form.submit();
        // add({ url: imageUrl }).then(res => {
        //     message.open({
        //         type: res.data.code == 200 ? 'success' : 'error',
        //         content: res.data.message,
        //     });
        //     setIsModalOpen(false);
        //     if (res.data.code == 200) {
        //         setImageUrl("")
        //         getData()
        //     }

        // })
    };
    const deleteBut = (item: any) => {
        deleteItem({ id: item.id }).then(res => {
            message.open({
                type: res.data.code == 200 ? 'success' : 'error',
                content: res.data.message,
            });
            if (res.data.code == 200) {
                getData()
            }
        })

    }
    const getData = () => {
        setData([
            { id: '1', type: '手机', createTime: '2024-01-01' },
            { id: '2', type: '电脑', createTime: '2024-01-02' },
            { id: '3', type: '平板', createTime: '2024-01-03' },
            { id: '4', type: '耳机', createTime: '2024-01-04' },
        ]);
        // console.log("123")
        // getList().then(res => {
        //     console.log(res.data.data)
        //     setData(res.data.data)
        //     // console.log(data)
        // })

    }
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    type FieldType = {
        type?: string;
    };

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <Button type="primary" onClick={showModal} icon={<PlusOutlined />} >
                添加
            </Button>
            <Modal
                title="添加标签"
                // closable={{ 'aria-label': 'Custom Close Button' }}
                centered={true}
                open={isModalOpen}
                onOk={handleOk}
                className="centered-title-modal"

                onCancel={handleCancel}
            >
                <div style={{ width: 400, padding: 10, paddingTop: 60, paddingBottom: 60 }}>
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
                            label="标签"
                            name="type"
                            rules={[{ required: true, message: 'Please input type!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
            {/* <div className='matop10'>
                <Table
                    columns={columns}
                    dataSource={data}
                    rowKey="id"
                    loading={loading}
                /></div> */}



            <div className='matop10'>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="table-list" direction="vertical">
                        {(droppableProvided) => (
                            <div
                                ref={droppableProvided.innerRef}
                                {...droppableProvided.droppableProps}
                            >
                                <Table
                                    columns={columns}
                                    dataSource={data}
                                    rowKey="id"
                                    loading={loading}
                                    components={{
                                        body: {
                                            wrapper: (props: any) => <tbody {...props} ref={droppableProvided.innerRef} />,
                                            row: (props: any) => (
                                                <DraggableBodyRow
                                                    {...props}
                                                    data-source={data}
                                                />
                                            ),
                                        },
                                    }}
                                    pagination={false}
                                />
                                {droppableProvided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>

        </>
    )
}

