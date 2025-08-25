import { Modal } from "antd";
import { forwardRef, useImperativeHandle, useState } from "react";
// const Add = forwardRef<ChildRef>((_, ref) => {
export type DeleteProps = {
  //暴露给父组件使用的函数
  showModal: (msg: string) => void;
  close: () => void;
};
export interface DeleteItem {
  //父组件传的回调函数
  deleteItem: () => void;
}
//ref  必须使用forwardRef   把所有类型说明
const DeleteModal = forwardRef<DeleteProps, DeleteItem>((props, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [msg, setMessage] = useState("");
  useImperativeHandle(ref, () => ({
    //父组件激活方法 直接执行子组件方法
    showModal(msg) {
      setIsModalOpen(true);
      setMessage(msg);
    },
    close() {
      handleCancel();
    },
  }));
  const handleOk = () => {
    props.deleteItem(); // 1. 执行父组件回调
    // setIsModalOpen(false); // 2. 关闭弹窗
    // // setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title="提示"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="确定"
        okType="danger"
      >
        <div className="flexC">
          <p
            style={{
              fontSize: "18px",
              marginTop: "10px",
              marginBottom: "20px",
            }}
          >
            {msg}
          </p>
        </div>
      </Modal>
    </>
  );
});

export default DeleteModal;
