import React from 'react'
import styles from "../index.module.scss"
import icon from "@/assets/images/icon.png"

import { Link } from 'react-router-dom';
import {
    CommentOutlined,
    UsergroupAddOutlined

} from '@ant-design/icons';
export default function left() {
    return (
        <div className={styles.leftBox}>
            <div className={styles.leftTop}>
                <img src={icon} className={styles.leftImg} />
                <Link to="/chatList">
                    <CommentOutlined />
                </Link>
                <Link to="/chatUser">
                    <UsergroupAddOutlined />
                </Link>


            </div>
        </div>
    )
}
