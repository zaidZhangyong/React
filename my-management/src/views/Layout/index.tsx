import React, { useState } from 'react';
import { Button, Layout, theme } from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,

} from '@ant-design/icons';
import Router from '../../router';
import LeftMenu from '@/components/LeftMenu';
const { Header, Content, Footer, Sider } = Layout;
import { Outlet, useNavigate, Link } from "react-router-dom"
import styles from "./index.module.scss"

const App: React.FC = () => {
    const navigate = useNavigate();

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const [collapsed, setCollapsed] = useState(false);

    const jump = (page: any) => {
        navigate(page.key);
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className={styles.demoLogoVertical} />
                <LeftMenu jump={jump} />
                {/* <div onClick={() => jump('/home')}>home</div>
                <div onClick={() => jump('/accountManagement')}>home2</div> */}
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet />
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};

export default App;