
import React from 'react'
import styles from "./index.module.scss"
import Left from './components/left'
export default function Chat() {
    return (
        <div className={styles.box}>
            <div className={styles.conter}>
                <Left />
            </div>

        </div>
    )
}
