import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import React, { useState } from "react";

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  // console.log(img);
  reader.readAsDataURL(img);
};
interface UpImgProps {
  getImg?: (url: string) => void; // 回调函数：接收图片地址
  url?: string | undefined
}
const beforeUpload = (file: RcFile) => {
  // console.log(file);
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("请上传jpg/png格式图片");
  }
  //   const isLt2M = file.size / 1024 / 1024 < 2;
  //   if (!isLt2M) {
  //     message.error("Image must smaller than 2MB!");
  //   }
  return isJpgOrPng;
};

const UpImg: React.FC<UpImgProps> = ({ getImg, url }) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {

    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        if (getImg) {
          getImg(info.file.response.data);
        }
        // console.log(url);
        setLoading(false);
        setImageUrl(url);

      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Upload
      name="file"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      action="/api/upload"
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {/* {url || imageUrl} */}
      {url || imageUrl ? (
        <img src={url || imageUrl} alt="avatar" style={{ width: "100%" }} />
      ) : (
        uploadButton
      )}
    </Upload>
  );
};

export default UpImg;

