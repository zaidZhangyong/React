import { lazy, Suspense } from "react"  //lazy 懒加载 需要嵌套React.Suspense
import Login from "@/views/Login"
import Home from "@/views/Home"
const About = lazy(() => import("@/views/About")) //使用懒加载
import { Navigate } from "react-router-dom"
const routes = [
    {
        path: '/',
        // 重定向路由
        element: <Navigate to="/home" />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/home',
        element: <Home />
    },
    {
        path: '/about',
        element: <Suspense fallback={<div>Loading...</div>}>
            <About />
        </Suspense>
    }
]
export default routes