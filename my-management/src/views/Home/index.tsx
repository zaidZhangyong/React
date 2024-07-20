import { useEffect } from "react"


export default function Home() {
    useEffect(() => {
        // 在这里执行组件挂载后的操作
        console.log('组件已挂载');
        // 这里可以放置你的挂载后代码
    }, [])
    return (
        <>
            <div>首页</div>
        </>
    )
}