
// import { setShowKey } from "@/store/reducer/navs";
// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { useLocation, useNavigate } from 'react-router-dom';
// import Left from './components/left';
// import styles from "./index.module.scss";
// export default function Chat() {
//     const navigate = useNavigate(); // 获取导航函数
//     const dispatch = useDispatch()
//     const location = useLocation(); //获取当前路由
//     let pathname = location.pathname
//     //获取当前路由
//     useEffect(() => {
//         if (pathname.split("/")[1] === "chat" && pathname.split("/").length === 3) return
//         // 跳转到目标路由
//         navigate('/');  // 根据需要修改目标路由
//         dispatch(setShowKey("/"))
//     }, [navigate]); // 确保 navigate 函数的稳定性，避免不必要的重新渲染
//     return (
//         <div className={styles.box}>
//             <div className={styles.conter}>
//                 <Left />
//             </div>

//         </div>
//     )
// }
