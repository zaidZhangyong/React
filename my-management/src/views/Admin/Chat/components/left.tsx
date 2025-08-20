
import styles from "../index.module.scss"
import icon from "@/assets/images/icon.png"

import { Link, Outlet } from 'react-router-dom';
import {
    CommentOutlined,
    UsergroupAddOutlined

} from '@ant-design/icons';
export default function left() {
    return (
        <div className={styles.leftBox}>
            <div>   <div className={styles.leftTop}>
                <img src={icon} className={styles.leftImg} />
                <Link to="/chat/chatList">
                    <CommentOutlined />
                </Link>
                <Link to="/chat/addUser">
                    <UsergroupAddOutlined />
                </Link>
            </div></div>
            <div>
                <Outlet />
            </div>
        </div>
    )
}
