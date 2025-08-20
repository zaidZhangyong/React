import React, { useState } from "react";
import { Layout, theme } from "antd";
import LeftMenu from "@/components/LeftMenu";
import HeadOptions from "@/components/HeadOptions";
const { Header, Content, Footer, Sider } = Layout;
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import styles from "./index.module.scss";
// import { SwitchTransition, CSSTransition } from "react-transition-group";
const App: React.FC = () => {
  const refreshKey = useSelector((state: RootState) => state.navs.refreshKey);

  // const navsList = useSelector((state: RootState) => state.navs.navsList);
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false);
  const jump = (path: string) => {
    console.log(refreshKey);
    navigate(path);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className={styles.demoLogoVertical} />
        <LeftMenu />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <HeadOptions
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            jump={jump}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {/* <SwitchTransition mode="out-in">
            <CSSTransition
              key={location.pathname} // 路由变化即重新挂载
              nodeRef={nodeRef}
              timeout={500}
              classNames="page" // 对应下方 CSS
              unmountOnExit
              appear
            >
              <div ref={nodeRef} style={{ height: "100%" }}>
                
              </div>
            </CSSTransition>
          </SwitchTransition> */}
          <Outlet key={refreshKey} />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;
