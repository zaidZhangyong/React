import { addLabel, labelList } from '@/api/merchandise';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, message, Modal, Popconfirm, Space, Tag } from 'antd';
import { useEffect, useState } from 'react';

// 拖拽表格行组件

export default function BrandLabel() {
    interface BrandLabelItem {
        id: string;
        label: string;
    }

    // 修改 useState
    const [showData, setshowData] = useState<string[]>([]);
    const [dataList, setdataList] = useState<BrandLabelItem[]>([]);
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
        if (showData.length == 0) {
            message.warning("请输入标签！！！")
        }
        console.log(showData)
        addLabel({ labels: showData }).then(res => {
            message.open({
                type: res.data.code == 200 ? 'success' : 'error',
                content: res.data.message,
            });
            if (res.data.code == 200) {
                getData()
            }
            setshowData([])

        })

        // setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const deleteBut = (item: any) => {
        // deleteItem({ id: item.id }).then(res => {
        //     message.open({
        //         type: res.data.code == 200 ? 'success' : 'error',
        //         content: res.data.message,
        //     });
        //     if (res.data.code == 200) {
        //         getData()
        //     }
        // })

    }
    const getData = () => {
        labelList().then(res => {
            setdataList(res.data)

        })

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


    const onFinish = (values: any) => {
        setshowData([...showData, values.text])
        form.resetFields();
    };

    // 校验失败
    const onFinishFailed = (errorInfo: any) => {
        console.log('校验失败:', errorInfo);
    };

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
                        {dataList.map((item, index) => (
                            <Tag
                                key={item.id}
                                style={{
                                    paddingLeft: "10px",
                                    paddingRight: "10px",
                                    marginBottom: "8px"  // 标签间距
                                }}
                                closeIcon
                                onClose={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    // 删除标签
                                    const newData = showData.filter((_, i) => i !== index);
                                    setshowData(newData);
                                }}
                            >
                                {item.label}
                            </Tag>
                        ))}

                        {dataList.length === 0 && <div style={{ color: '#999' }}>暂无标签数据</div>}


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
                    form={form}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                // style={{ maxWidth: 600 }}

                >

                    <Form.Item label="标签名" name="text" style={{ flex: 1, marginBottom: 0 }} rules={[
                        { required: true, message: '请输入标签名!' },
                        { min: 2, message: '至少2个字符' },
                        { max: 20, message: '最多20个字符' },
                    ]}>
                        <Input placeholder="input placeholder" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">添加</Button>
                    </Form.Item>
                </Form>
                <Card style={{
                    width: "100%", marginTop: "10px", height: '300px',
                    overflow: 'hidden'
                }}>
                    {showData.map((item, index) => (
                        <Tag
                            key={index}
                            style={{
                                paddingLeft: "10px",
                                paddingRight: "10px",
                                marginBottom: "8px"  // 标签间距
                            }}
                            closeIcon
                            onClose={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                // 删除标签
                                const newData = showData.filter((_, i) => i !== index);
                                setshowData(newData);
                            }}
                        >
                            {item}
                        </Tag>
                    ))}

                    {showData.length === 0 && <div style={{ color: '#999' }}>暂无标签数据</div>}

                </Card>
            </Modal>

        </>
    )
}



