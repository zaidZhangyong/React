import { lazy, Suspense } from "react"  //lazy 懒加载 需要嵌套React.Suspense
import Login from "@/views/Login"
import Layout from "@/views/Layout"
const About = lazy(() => import("@/views/About")) //使用懒加载
const Error404 = lazy(() => import("@/views/404")) //使用懒加载
const AccountManagement = lazy(() => import("@/views/Admin/AccountManagement")) //使用懒加载
const Carouselimage = lazy(() => import("@/views/Admin/Carouselimage")) //使用懒加载
const Home = lazy(() => import("@/views/Admin/Home")) //使用懒加载
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
        title: "layout",
        element: <Layout />,
        children: [
            {
                title: "首页",
                icon: "HomeOutlined",
                path: '/home',
                element: <Home />,
            },

            {
                title: "图片管理",
                icon: "PictureOutlined",
                children: [
                    {
                        path: '/carouselimage',
                        title: "轮播图管理",
                        element: <Carouselimage />,
                    }
                ],
            },
            {
                title: "账号管理",
                icon: "UserOutlined",
                path: '/accountManagement',
                element: <AccountManagement />,
            },
        ]
    },
    {
        path: '/about',
        element: <Suspense fallback={<div>Loading...</div>}>
            <About />
        </Suspense>
    },
    {
        path: '/404',
        element: <Suspense fallback={<div>Loading...</div>}>
            <Error404 />
        </Suspense>
    },

]
export default routes