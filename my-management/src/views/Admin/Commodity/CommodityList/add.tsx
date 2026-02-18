

import TinyMCEEditor, { TinyMCEEditorRef } from '@/components/TinyMCE';
import UpImg from "@/components/UpImg";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import type { FormProps } from "antd";
import { Button, Flex, Form, Input, Modal, Select, Tag } from "antd";
import { useEffect, useRef, useState } from "react";
import 'react-quill/dist/quill.snow.css';

const Add: React.FC<AddProps> = ({ isModalOpen, open, typeIndex, labeldata, typeData, itemData }) => {
  const [form] = Form.useForm();   // 商品主表单         // 主表单（商品）
  const [optionForm] = Form.useForm();// 选项子表单

  const [openAdd, setopenAdd] = useState<boolean>(false);
  const [valuex, setValuex] = useState('');
  const [optionItem, setoptionItem] = useState({ name: "", values: [{ id: Date.now(), text: "" }] })
  // 选项数据
  const [itemOptions, setitemOptions] = useState<SelectItem[]>([])
  // const [sentData, setSendData] = useState<FieldType>({
  //   url: "",
  //   name: "",
  //   type: "",
  //   labels: [],
  //   num: "",
  //   unitPrice: ""
  //   selects: [],
  //   detail: "",
  // })

  const editorRef = useRef<TinyMCEEditorRef>(null);
  const labelList = labeldata.map(item =>

  ({
    value: item.id, // 把 id 作为 value
    label: item.label,
  })
  )
  const typeList = typeData.map(item =>
  ({
    value: item.id, // 把 id 作为 value
    label: item.type,
  })
  )
  const handleOk = () => {
    optionForm.submit();

  };

  const handleCancel = () => {
    setopenAdd(false);
  };
  useEffect(() => {
    if (isModalOpen) {
      form.setFieldsValue({
        url: itemData.url,
        name: itemData.name,
        type: itemData.type,
        labels: itemData.labels,
        num: itemData.num,
        unitPrice: itemData.unitPrice,
        selects: itemData.selects,
        detail: itemData.detail,
      });

      // 如果有富文本内容，单独设置
      if (itemData.detail && editorRef.current) {
        // editorRef.current.setContent(itemData.detail);
      }
    } else {
      // 关闭时重置
      form.resetFields();
      setitemOptions([]);
    }
  }, [isModalOpen, itemData, form]);
  const onInit = () => {
    console.log(133)
  }
  const onFinish: FormProps<SelectItem>["onFinish"] = (values) => {

  };
  const onFinishItem: FormProps<SelectItem>["onFinish"] = (values) => {
    console.log(values)
    const newOption: SelectItem = {
      ...values,
      id: Date.now(), // 用时间戳生成唯一id
      values: values.values.map((item: any) => item.text.trim())

    };
    setitemOptions(prevOptions => [...prevOptions, newOption]);
    console.log(itemOptions)
    setopenAdd(false)
    optionForm.resetFields();
    // 
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleRemoveValue = (index: number) => {
    if (optionItem.values.length <= 1) return; // 防止删空
    const newValues = [...optionItem.values];
    newValues.splice(index, 1); // 删除指定项
    // console.log(newValues)
    setoptionItem(prev => ({ ...prev, values: newValues }));
  };
  const handleChange1 = (value: string[]) => {
    console.log(`selected ${value}`);
  };
  //  { id: 1, name: '尺寸', values: ['S', 'M', 'L', 'XL'] },
  //     { id: 2, name: '颜色', values: ['红', '蓝', '黑', '白'] },

  const handleChange = (content: string) => {
    setValuex(content);
    console.log('当前内容:', content); // 获取值
  };
  const sendData = () => {

    // const html = editorRef.current?.getContent();
    // const text = editorRef.current?.getText();
    // console.log('HTML:', html);
    // console.log('Text:', text);
  }

  // 设置内容
  const handleSetContent = () => {
    editorRef.current?.setContent('<p>新的内容</p>');
  };
  // 自定义图片上传
  const handleImageUpload = async (file: File): Promise<string> => {
    // 这里调用你的上传 API
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    return data.data; // 返回图片 URL
  };

  return (
    <>
      <Modal
        title={typeIndex == true ? "添加商品" : "编辑商品"}
        open={isModalOpen}
        onCancel={() => open(false)}
        onOk={sendData}
        width={1000}
        styles={{
          body: {
            maxHeight: '60vh',
            overflow: 'auto',
            padding: '24px',
          },
        }}
      >
        <Form
          name="basic"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 1000 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="商品图片"
            name="url"
            rules={[{ required: true, message: "请选择商品图片" }]}
          >
            <div style={{ width: "300px", height: "150px" }}>
              <UpImg />
            </div>
          </Form.Item>

          <Form.Item<FieldType>
            label="商品名称"
            name="name"
            rules={[{ required: true, message: "请输入商品名称" }]}
          >
            <Input placeholder="请输入商品名称" />
          </Form.Item>

          <Form.Item<FieldType>
            label="商品类型"
            name="type"
            rules={[{ required: true, message: "请选择商品类型" }]}
          >
            <Select
              // defaultValue=""
              placeholder="请选择商品类型"
              options={typeList}
            />
          </Form.Item>
          <Form.Item<FieldType>
            label="商品标签"
            name="labels"
            rules={[{ required: true, message: "请选择商品标签" }]}
          >
            <Select
              mode="multiple"
              allowClear
              style={{ width: '100%' }}
              placeholder="请选择商品标签"
              // onChange={handleChange1}
              options={labelList}
            />
          </Form.Item> <Form.Item<FieldType>
            label="商品数量"
            name="num"
            rules={[{ required: true, message: "请输入商品数量" }]}
          >
            <Input placeholder="请输入商品数量" />
          </Form.Item>
          <Form.Item<FieldType>
            label="商品单价"
            name="unitPrice"
            rules={[{ required: true, message: "请输入商品单价" }]}
          >
            <Input placeholder="请输入商品单价" />
          </Form.Item>


          <Form.Item
            label="选项"
            name="selects"
            rules={[{ required: true, message: "请添加商品选项" }]}
          >
            <div>
              {itemOptions.map((opt: any, index) => (
                <div
                  key={opt.id}
                  className="itemBox"
                  style={{ marginBottom: "10px" }}
                >
                  <div style={{ marginBottom: "10px" }}>
                    <div className="flexSB">
                      <div>{opt.name}</div>
                      <Button
                        shape="circle"
                        size="small"
                        danger
                        icon={<MinusOutlined />}
                        onClick={() => {
                          const newOptions = itemOptions.filter((_, i) => i !== index);
                          setitemOptions(newOptions);
                          form.setFieldsValue({ selects: newOptions });
                        }}
                      />
                    </div>
                  </div>
                  <div style={{ marginTop: "5px" }}>
                    <Flex gap="small" align="center" wrap>
                      {opt.values.map((val: string, idx: number) => (
                        <Tag key={`${opt.id}-${idx}`}>{val}</Tag>
                      ))}
                    </Flex>
                  </div>
                </div>
              ))}

              <Button
                type="dashed"
                onClick={() => setopenAdd(true)}
                icon={<PlusOutlined />}
                style={{ width: "100%" }}
              >
                添加选项
              </Button>
            </div>
          </Form.Item>

          <Form.Item<FieldType>
            label="详情"
            name="detail"
            rules={[{ required: true, message: "请输入详情" }]}
          >
            <TinyMCEEditor
              ref={editorRef}
              height={400}
              placeholder="请输入商品详情，"
              onFileUpload={handleImageUpload}
              onInit={onInit}
              config={{
                toolbar: 'undo redo | formatselect | bold italic underline | alignleft aligncenter alignright | bullist numlist | link image | removeformat preview',
                plugins: 'advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen help wordcount',
              }}
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* 添加选项 Modal */}
      <Modal
        title="添加选项"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={openAdd}
        onOk={handleOk}
        style={{ maxWidth: 400 }}
        centered
        onCancel={handleCancel}

      >
        <Form
          form={optionForm}
          name="addOption"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          // 
          autoComplete="off"
          onFinish={onFinishItem}
        >
          <Form.Item<SelectItem>
            label="选项名称"
            name="name"
            rules={[{ required: true, message: '请输入选项名称!' }]}
          >
            <Input placeholder="请输入选项名称" onChange={(e) => {
              optionItem.name = e.target.value;
              setoptionItem(optionItem);
            }} />
          </Form.Item>

          <Form.List initialValue={[{ id: Date.now(), text: '' }]} name="values"
            rules={[{
              validator: async (_, values: ValueItem[]) => {
                const validValues = values?.filter(v => v.text.trim());
                if (!validValues || validValues.length === 0) {
                  return Promise.reject(new Error('至少输入一个类别'));
                }
              }
            }]}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <div key={key} style={{
                    display: 'flex',
                    gap: 8,
                    marginBottom: 8,
                    alignItems: 'flex-start' // 顶部对齐，防止高度不一致
                  }}>
                    <Form.Item
                      {...restField}
                      name={[name, 'id']}
                      style={{ display: 'none' }}
                    >
                      <Input type="hidden" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'text']}
                      label=""
                      colon={false}
                      rules={[{ required: true, message: '请输入类别' }]}
                      style={{ flex: 1, marginBottom: 0 }}
                      labelCol={{ span: 0 }}      // label 不占栅格
                      wrapperCol={{ span: 24 }}    // 输入框占满 24 栅格
                    >
                      <Input placeholder={`请输入第${name + 1}个类别`} />
                    </Form.Item>
                    {fields.length > 1 && (
                      <Button danger onClick={() => remove(name)} icon={<MinusOutlined />}>
                        删除
                      </Button>
                    )}
                  </div>
                ))}
                <Button type="dashed" onClick={() => add({ id: Date.now() + Math.random(), text: "" })} block icon={<PlusOutlined />}>
                  添加类别
                </Button>
              </>
            )}
          </Form.List>
        </Form>
      </Modal>
    </>
  );
};

export default Add;