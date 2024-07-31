import React, { useState, useRef } from 'react';
import { Layout, theme } from 'antd';

import LeftMenu from '@/components/LeftMenu';
import HeadOptions from "@/components/HeadOptions";
const { Header, Content, Footer, Sider } = Layout;
import { Outlet, useNavigate } from "react-router-dom"
import styles from "./index.module.scss"
const App: React.FC = () => {
    const leftMenuRef = useRef(null)
    const navigate = useNavigate();
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const [collapsed, setCollapsed] = useState(false);
    const jump = (path: string, type?: string) => {
        navigate(path);

    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className={styles.demoLogoVertical} />
                <LeftMenu jump={jump} ref={leftMenuRef} />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <HeadOptions collapsed={collapsed} setCollapsed={setCollapsed} jump={jump} />
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