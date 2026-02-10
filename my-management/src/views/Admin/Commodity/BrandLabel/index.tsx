import { deleteItem } from '@/api/swiper';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, message, Modal, Popconfirm, Space, Tag } from 'antd';
import { useEffect, useState } from 'react';

// 拖拽表格行组件

export default function BrandLabel() {
    interface BrandLabelItem {
        id: string;
        type: string;
        createTime: string;
    }

    // 修改 useState
    const [data, setData] = useState<BrandLabelItem[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [form] = Form.useForm(); // 创建 form 实例
    useEffect(() => {

        getData()
    }, []);


    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
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
    const preventDefault = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        // console.log('Clicked! But prevent default.');
    };

    function confirmDelete(key: any): void {
        throw new Error('Function not implemented.');
    }

    function cancelDelete(e?: any | undefined): void {
        throw new Error('Function not implemented.');
    }

    function onFormLayoutChange(changedValues: any, values: any): void {
        throw new Error('Function not implemented.');
    }

    return (
        <>




            <Space style={{ width: '100%', display: 'block', }}>
                <Card title="标签" extra={<Button type="primary" shape="circle" onClick={showModal} icon={<PlusOutlined />} />} style={{ width: "100%", minHeight: "400px" }}>
                    <Popconfirm
                        title="标签标签"
                        description={`确定要删除此标签吗？`}
                        onConfirm={() => confirmDelete("1")}
                        onCancel={cancelDelete}
                        okText="确认"
                        cancelText="取消"
                        placement="topRight"
                        trigger="click"
                        mouseLeaveDelay={0.1}
                    >
                        <Tag style={{
                            paddingLeft: "10px",
                            paddingRight: "10px"
                        }}>Tag 1 <CloseOutlined
                                style={{
                                    cursor: 'pointer',
                                    fontSize: '12px',  // 匹配原生Tag关闭图标大小
                                    color: 'rgba(0,0,0,0.45)', // 匹配原生关闭图标颜色
                                    marginLeft: '8px', // 匹配原生关闭图标间距

                                }}
                            /></Tag>


                    </Popconfirm>
                    {/* {data.length === 0 && <div style={{ color: '#999' }}>暂无标签数据</div>} */}

                </Card>
            </Space>

            <Modal
                title="添加标签"
                centered
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form
                    layout="inline"
                    onValuesChange={onFormLayoutChange}
                // style={{ maxWidth: 600 }}

                >

                    <Form.Item label="标签名" style={{ flex: 1, marginBottom: 0 }}>
                        <Input placeholder="input placeholder" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary">添加</Button>
                    </Form.Item>
                </Form>
                <Card style={{
                    width: "100%", marginTop: "10px", height: '300px',
                    overflow: 'hidden'
                }}>
                    <Tag style={{
                        paddingLeft: "10px",
                        paddingRight: "10px"
                    }} closeIcon onClose={preventDefault}>Tag 1
                    </Tag>
                    {/* {data.length === 0 && <div style={{ color: '#999' }}>暂无标签数据</div>} */}

                </Card>
            </Modal>

        </>
    )
}

