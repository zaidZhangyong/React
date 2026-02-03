
import styles from "../index.module.scss"
import icon from "@/assets/images/icon.png"

import { NavLink, Outlet } from 'react-router-dom';
import {
    CommentOutlined,
    UsergroupAddOutlined

} from '@ant-design/icons';
export default function left() {
    return (
        <div className={styles.leftBox}>
            <div className={styles.leftBoxL}>
                <div className={styles.leftTop}>
                    <img src={icon} className={styles.leftImg} />
                    <NavLink className={({ isActive }) => isActive ? styles.activeLink : styles.link} to="/chat/chatList">
                        <CommentOutlined />
                    </NavLink>
                    <NavLink className={({ isActive }) => isActive ? styles.activeLink : styles.link} to="/chat/addUser">
                        <UsergroupAddOutlined />
                    </NavLink>
                </div></div>
            <div className={styles.leftBoxR}>
                <Outlet />
            </div>
        </div>
    )
}
