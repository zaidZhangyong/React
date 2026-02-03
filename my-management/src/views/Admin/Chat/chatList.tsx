import React from 'react'
import styles from "./index.module.scss"
import icon from "@/assets/images/icon.png"
export default function chatList() {
    return (
        <div className={styles.chatList}>
            <div className={styles.boxItem}>
                <img src={icon} alt="" />
                123
            </div>
            <div className={styles.boxItem}>
                <img src={icon} alt="" />
                123
            </div> <div className={styles.boxItem}>
                <img src={icon} alt="" />
                123
            </div>
        </div>
    )
}
