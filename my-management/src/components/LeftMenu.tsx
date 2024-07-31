import { Menu } from 'antd';
import * as AllIcons from '@ant-design/icons';
import Router from '../router';
import type { MenuProps } from 'antd';
import { createElement, useState } from 'react';
import { useLocation } from "react-router-dom"
// keyof typeof AllIcons
type RouterMenuItem = {
    icon?: string;
    title: string;
    path?: string;
    key?: string;
    show?: boolean; // 该菜单是否需要显示
    children?: RouterMenuItem[];
}
type MenuItem = Required<MenuProps>['items'][number];
export default function LeftMenu(props: { jump: Function }) {
    const location = useLocation(); //获取当前路由
    let getpath = JSON.parse(sessionStorage.getItem('getkeyPath') || '[]')
    const [keyPath, setKeyPath] = useState(getpath)

    const MenuList = Router.filter(item => item.title === 'layout')[0]?.children || [];
    function Menuitems(menuList: RouterMenuItem[]): MenuItem[] {
        return menuList.map(item => {
            if (item?.show != false) {
                return ({
                    key: item.path || item.key,
                    label: item.title,
                    path: item.path,
                    icon: item.icon ? createElement(AllIcons[item.icon] as React.ComponentType) : undefined,
                    children: item.children ? Menuitems(item.children) : null,
                })
            }
        });

    }
    const toggleCollapsed: MenuProps['onClick'] = (e) => {
        e.domEvent.preventDefault();
        if (e.key !== location.pathname) {
            //存储选中的菜单
            sessionStorage.setItem('getkeyPath', JSON.stringify(e.keyPath.slice(1)));
            setKeyPath(e.keyPath.slice(1));
            props.jump(e.key);

        }
    };


    return (
        <div>
            <Menu
                mode="inline"
                theme="dark"
                style={{ height: '100%' }}
                onClick={toggleCollapsed}
                defaultSelectedKeys={[location.pathname]}
                defaultOpenKeys={keyPath}
                items={Menuitems(MenuList)}
            />
        </div>
    );
}
