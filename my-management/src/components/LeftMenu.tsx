import { Menu } from 'antd';
import * as AllIcons from '@ant-design/icons';
import Router from '../router';
import type { MenuProps } from 'antd';
import { createElement } from 'react';
// keyof typeof AllIcons
type RouterMenuItem = {
    icon?: string;
    title: string;
    path?: string;
    children?: RouterMenuItem[];
}
type MenuItem = Required<MenuProps>['items'][number];
export default function LeftMenu(props: { jump: (arg0: { key: any; }) => void; }) {

    const MenuList = Router.filter(item => item.title === 'layout')[0]?.children || [];
    function Menuitems(menuList: RouterMenuItem[]): MenuItem[] {
        // path: item.path,

        return menuList.map(item => ({
            key: item.path || null,
            label: item.title,
            path: item.path,
            icon: item.icon ? createElement(AllIcons[item.icon] as React.ComponentType) : undefined,
            children: item.children ? Menuitems(item.children) : null,
        }));

    }
    const toggleCollapsed = (e: any) => {
        props.jump({ key: e.key })

    };

    return (
        <div>
            <Menu
                mode="inline"
                theme="dark"
                style={{ height: '100%' }}
                onClick={toggleCollapsed}
                items={Menuitems(MenuList)}
            />
        </div>
    );
}
