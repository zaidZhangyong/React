import Banner from "@/assets/images/banner.webp"
import styles from "./login.module.scss"
export default function Login() {
    return (
        <>
            <img className={styles.banner   } src={Banner} alt="" />
            <div>登录</div>
        </>
    )
}