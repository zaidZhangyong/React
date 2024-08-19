import { Menu } from 'antd';
import * as AllIcons from '@ant-design/icons';
import Router from '../router';
import type { MenuProps } from 'antd';
import { createElement, useState } from 'react';
import { useLocation } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from "@/store"
import { addNavs, setKeyPath, } from "@/store/reducer/navs"
import React, { useEffect } from 'react';
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


    const dispatch = useDispatch();
    const location = useLocation(); //获取当前路由
    const keyPath = useSelector((state: RootState) => state.navs.keyPath);
    const MenuList = Router.filter(item => item.title === 'layout')[0]?.children || [];
    function Menuitems(menuList: RouterMenuItem[]): MenuItem[] {
        return menuList.map(item => {
            if (item?.show != false) {
                return ({
                    key: item.children ? item.key : item.path,
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
            dispatch(addNavs({ label: e.domEvent.currentTarget.innerText, key: e.key, keyPath: e.keyPath.slice(1) }))
            //存储选中的菜单
            // console.log(e.keyPath.slice(1))
            dispatch(setKeyPath(e.keyPath.slice(1)))
            // props.jump(e.key);

        }
    };
    const onOpenChange: MenuProps['onOpenChange'] = (openKeys) => {
        dispatch(setKeyPath(openKeys))
    };
    return (
        <div>
            <span></span>
            <Menu
                mode="inline"
                theme="dark"
                style={{ height: '100%' }}
                onClick={toggleCollapsed}
                selectedKeys={[location.pathname]}
                openKeys={keyPath}
                onOpenChange={onOpenChange}
                items={Menuitems(MenuList)}
            />
        </div >
    );
}
