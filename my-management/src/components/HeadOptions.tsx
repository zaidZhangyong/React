import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    FullscreenOutlined,
    FullscreenExitOutlined,
    UserOutlined,
    VerticalRightOutlined,
    EditOutlined,
    DownOutlined

} from '@ant-design/icons';
import '@/assets/styles/global.scss';
import icon from "@/assets/images/icon2.png"
import { Button, Dropdown, Modal } from 'antd';
import type { MenuProps } from 'antd';

export default function HeadOptions(props: { collapsed: boolean, setCollapsed: Function, jump: Function }) {


    const items: MenuProps['items'] = [

        {
            key: 'personalInformation',
            label: "个人信息",
            icon: <UserOutlined />,
        },
        {
            key: 'changePassword',
            label: "修改密码",
            icon: <EditOutlined />,
        },
        {
            key: 'logOut',
            label: "退出登陆",
            icon: <VerticalRightOutlined />
        },

    ];


    const [fullScreen, setfullScreen] = useState(false)
    const fullScreenBut = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen(); //进入全屏模式
        } else {
            document.exitFullscreen();

        }
        setfullScreen(!fullScreen)
    }
    const onClick: MenuProps['onClick'] = ({ key }) => {

        let list: {
            [key: string]: string;
        } = {
            personalInformation: "/personalInformation",//个人信息
            changePassword: '/changePassword',//修改密码
            logOut: '/login',//退出登陆
        }
        if (key == "logOut") {
            showModal();
            return
        }
        props.jump(list[key]);

    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        props.jump("/login");
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <div className='flexSB'>
            <Button
                type="text"
                icon={props.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => props.setCollapsed(!props.collapsed)}
                style={{
                    fontSize: '16px',
                    width: 64,
                    height: 64,
                }}
            />

            <div className='flexC'>
                <Dropdown menu={{ items, onClick }} >
                    <div className='flexC'>
                        <DownOutlined style={{ fontSize: '10px' }} />
                        <div className='profilePicture'>
                            <img src={icon} alt="" />
                        </div>
                    </div>

                </Dropdown>

                <Modal title="提示" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <p>确认退出吗？</p>
                </Modal>

                <Button
                    type="text"
                    icon={fullScreen ? <FullscreenOutlined /> : <FullscreenExitOutlined />}
                    onClick={() => fullScreenBut()}
                    style={{
                        fontSize: '16px',
                        width: 64,
                        height: 64,
                    }}
                />
            </div>
        </div>
    )
}
