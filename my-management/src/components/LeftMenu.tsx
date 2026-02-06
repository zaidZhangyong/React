import type { RootState } from "@/store";
import { addNavs, setKeyPath } from "@/store/reducer/navs";
import * as AllIcons from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import React, { createElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Router from "../router";
type AllIconsType = {
  [key: string]: React.ComponentType;
};
const allIcons = AllIcons as unknown as AllIconsType;
// keyof typeof AllIcons
type RouterMenuItem = {
  icon?: string;
  title: string;
  path?: string;
  key?: string;
  show?: boolean; // 该菜单是否需要显示
  selectShow?: boolean; // 该菜单下拉是否需要显示
  children?: RouterMenuItem[];
};
type MenuItem = {
  key: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  children?: MenuItem[];
};
// type MenuItem = Exclude<MenuProps["items"], undefined>[number];

export default function LeftMenu() {

  const setUpNav = ["chat"]
  const dispatch = useDispatch();
  const location = useLocation(); //获取当前路由
  let pathname = location.pathname
  for (let i in setUpNav) {
    if (setUpNav[i] == pathname.split("/")[1]) {
      pathname = "/" + pathname.split("/")[1]
    }
  }

  const keyPath = useSelector((state: RootState) => state.navs.keyPath);
  const MenuList = Router.filter(item => item.title === 'layout')[0]?.children || [];
  function Menuitems(menuList: RouterMenuItem[]): MenuItem[] {
    return menuList
      .filter(item => item?.show !== false) // 过滤出需要的项
      .map(item => {
        if (item?.show != false) {

          const menuItem: MenuItem = {
            key: item.children && item.selectShow !== false ? item.key : item.path ?? '',
            label: item.title ?? '',
            path: item.path ?? '',
            icon: item.icon ? createElement(allIcons[item.icon] as React.ComponentType) : null,
          } as MenuItem;
          // 只有当children不为空数组时，才添加children属性
          if (item.children && item.selectShow !== false) {
            menuItem.children = Menuitems(item.children);
          }
          return menuItem;


        }
        return undefined;
      }).filter(item => item !== undefined) as MenuItem[];
  }
  const toggleCollapsed: MenuProps['onClick'] = (e) => {
    e.domEvent.preventDefault();
    console.log(e.key, location.pathname)
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
      <Menu
        mode="inline"
        theme="dark"
        style={{ height: '100%' }}
        onClick={toggleCollapsed}
        selectedKeys={[pathname]}
        openKeys={keyPath}
        onOpenChange={onOpenChange}
        items={Menuitems(MenuList)}
      />
    </div >
  );
 
}
