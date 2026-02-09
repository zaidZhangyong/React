import Layout from "@/views/Layout";
import Login from "@/views/Login";
import { lazy } from "react"; //lazy 懒加载 需要嵌套React.Suspense
import { Navigate } from "react-router-dom";
// eslint-disable-next-line react-refresh/only-export-components
const About = lazy(() => import("@/views/About")); //使用懒加载
const Error404 = lazy(() => import("@/views/404")); //使用懒加载
const AccountManagement = lazy(() => import("@/views/Admin/AccountManagement")); //使用懒加载
const Management = lazy(() => import("@/views/Admin/Manager")); //使用懒加载
const Carouselimage = lazy(
  () => import("@/views/Admin/PictureOutlined/Carouselimage")
); //使用懒加载
const Home = lazy(() => import("@/views/Admin/Home")); //使用懒加载
const DataAnalysis = lazy(() => import("@/views/Admin/DataAnalysis")); //使用懒加载
const PersonalInformation = lazy(
  () => import("@/views/Admin/PersonalInformation")
); //使用懒加载
const ChangePassword = lazy(() => import("@/views/Admin/ChangePassword")); //使用懒加载
const Chat = lazy(() => import("@/views/Admin/Chat"));
const ChatList = lazy(() => import("@/views/Admin/Chat/chatList"));
const AddUser = lazy(() => import("@/views/Admin/Chat/addUser"));
const CommodityList = lazy(
  () => import("@/views/Admin/Commodity/CommodityList")
);
const ProductType = lazy(
  () => import("@/views/Admin/Commodity/ProductType")
);
const routes = [
  {
    path: "/",
    // 重定向路由
    element: <Navigate to="/home" />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    title: "layout",
    element: <Layout />,
    children: [
      {
        title: "首页",
        icon: "HomeOutlined",
        path: "/home",
        key: "home",
        element: <Home />,
      },

      {
        title: "商品",
        icon: "ShopOutlined",
        path: "/",
        key: "Commodity",

        children: [
          {
            path: "/CommodityList",
            title: "商品列表",
            element: <CommodityList />,
          },
          {
            path: "/ProductType",
            title: "类型管理",
            element: <ProductType />,
          },
        ],
      },
      {
        title: "聊天",
        icon: "WechatOutlined",
        path: "/chat",
        key: "chat",
        element: <Chat />,
        selectShow: false,
        children: [
          {
            show: false, //不在侧边栏展示
            path: "/chat/chatList",
            title: "成员列表",
            element: <ChatList />,
          },
          {
            show: false, //不在侧边栏展示
            path: "/chat/addUser",
            title: "添加",
            element: <AddUser />,
          },
        ],
      },
      {
        title: "图片管理",
        icon: "PictureOutlined",
        path: "/",
        key: "picture",
        children: [
          {
            path: "/carouselimage",
            title: "轮播图管理",
            element: <Carouselimage />,
          },
        ],
      },
      {
        title: "账号管理",
        icon: "UserOutlined",
        path: "/accountManagement",
        key: "accountManagement",
        element: <AccountManagement />,
      },
      {
        title: "管理员",
        icon: "UserOutlined",
        path: "/Manager",
        key: "Manager",
        element: <Management />,
      },
      {
        show: false, //不在侧边栏展示
        title: "个人信息",
        path: "/personalInformation",
        element: <PersonalInformation />,
      },
      {
        show: false, //不在侧边栏展示
        title: "修改密码",
        path: "/changePassword",
        element: <ChangePassword />,
      },
      {
        title: "数据分析",
        icon: "FundOutlined",
        path: "/dataAnalysis",
        key: "dataAnalysis",
        element: <DataAnalysis />,
      },
    ],
  },

  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/*",
    element: <Error404 />,
  },
];
export default routes;
