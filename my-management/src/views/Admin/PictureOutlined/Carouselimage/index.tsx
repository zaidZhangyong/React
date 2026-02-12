import { add, deleteItem, getList } from '@/api/swiper';
import { LoadingOutlined, PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Image, message, Modal, Popconfirm, Upload, UploadProps } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
export default function Carouselimage() {
  const [dataList, setDataList] = useState<[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [loading1, setLoading1] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>();
  useEffect(() => {

    getData()
  }, []);
  const columns: ColumnsType = [
    {
      title: 'id',
      dataIndex: 'id',
      key: "id",
      align: 'center',
      width: '20%',
    },

    {
      title: '图片',
      dataIndex: 'url',
      align: 'center',
      render: (url) => (<Image
        width={200}
        height={100}
        alt="basic"
        src={url}
      />),
      width: '40%',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      align: 'center',
      width: '20%',
    },

    {
      title: '操作',
      dataIndex: '',
      align: 'center',
      render: (_: any, record: any) => (
        <Popconfirm
          title="删除"
          description="确定删除当前图片吗？"
          icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
          onConfirm={() => deleteBut(record)}
        >
          <Button danger>删除</Button>
        </Popconfirm>
      ),
    },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {

    add({ url: imageUrl }).then(res => {
      console.log(res)
      message.open({
        type: res.code == 200 ? 'success' : 'error',
        content: res.message,
      });
      setIsModalOpen(false);
      if (res.code == 200) {
        setImageUrl("")
        getData()
      }

    })
  };
  const deleteBut = (item: any) => {
    deleteItem({ id: item.id }).then(res => {
      message.open({
        type: res.code == 200 ? 'success' : 'error',
        content: res.message,
      });
      if (res.code == 200) {
        getData()
      }
    })

  }
  const getData = () => {
    getList().then(res => {
      setDataList(res.data)
    })

  }
  const handleCancel = () => {
    setIsModalOpen(false);
  };


  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      setLoading1(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      // console.log(info.file.response.data);

      if (info.file.response.data) {
        setLoading1(false);
        setImageUrl(info.file.response.data);
      } else {
        setLoading1(false);
        message.error('获取文件失败');
      }
    }
  };
  const beforeUpload = (file: File) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };
  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading1 ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  return (
    <>
      <Button type="primary" onClick={showModal} icon={<PlusOutlined />} >
        添加
      </Button>
      <Modal
        title="添加照片"
        // closable={{ 'aria-label': 'Custom Close Button' }}
        centered={true}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div style={{ width: 400, height: 250, padding: 10 }}>
          <Upload
            name="file"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="/api/upload"
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? (
              <img draggable={false} src={imageUrl} alt="avatar" style={{ width: '100%' }} />
            ) : (
              uploadButton
            )}
          </Upload>
        </div>
      </Modal>
      <div className='matop10'>
        <Table
          columns={columns}
          dataSource={dataList}
          rowKey="id"
          loading={loading}
        /></div>

    </>
  )
}

