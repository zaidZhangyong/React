import { Modal } from "antd";
import { ReactNode } from "react";
interface ModalBoxProps {
  typeIndex: true | false;
  open: boolean;
  onCancel: () => void;
  children?: ReactNode;
}
const ModalBox: React.FC<ModalBoxProps> = (props) => {
  return (
    <>
      <Modal
        title={props.typeIndex == true ? "添加" : "编辑"}
        open={props.open}
        onCancel={props.onCancel}
        footer={
          [] // 设置footer为空，去掉 取消 确定默认按钮
        }
      >
        {props.children}
      </Modal>
    </>
  );
};
export default ModalBox;
