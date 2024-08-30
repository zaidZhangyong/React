import { lazy } from "react"  //lazy 懒加载 需要嵌套React.Suspense
import Login from "@/views/Login"
import Layout from "@/views/Layout"
const About = lazy(() => import("@/views/About")) //使用懒加载
const Error404 = lazy(() => import("@/views/404")) //使用懒加载
const AccountManagement = lazy(() => import("@/views/Admin/AccountManagement")) //使用懒加载
const Carouselimage = lazy(() => import("@/views/Admin/Carouselimage")) //使用懒加载
const Home = lazy(() => import("@/views/Admin/Home")) //使用懒加载
const DataAnalysis = lazy(() => import("@/views/Admin/DataAnalysis")) //使用懒加载
const PersonalInformation = lazy(() => import("@/views/Admin/PersonalInformation")) //使用懒加载
const ChangePassword = lazy(() => import("@/views/Admin/ChangePassword")) //使用懒加载
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
                key: "home",
                element: <Home />,
            },
            {
                title: "数据分析",
                icon: "FundOutlined",
                path: '/dataAnalysis',
                key: "dataAnalysis",
                element: <DataAnalysis />,
            },

            {
                title: "图片管理",
                icon: "PictureOutlined",
                path: "/",
                key: "picture",
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
                key: "UserOutlined",
                element: <AccountManagement />,
            },
            {
                show: false, //不在侧边栏展示
                title: "个人信息",
                path: '/personalInformation',
                element: <PersonalInformation />
            },
            {
                show: false,//不在侧边栏展示
                title: "修改密码",
                path: '/changePassword',
                element: <ChangePassword />
            },
        ]

    },

    {
        path: '/about',
        element: <About />
    },
    {
        path: '/*',
        element: <Error404 />
    },

]
export default routes