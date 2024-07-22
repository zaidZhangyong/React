import { Menu } from 'antd';
import * as AllIcons from '@ant-design/icons';
import Router from '../router';

interface MenuItem {
    key?: string,
    icon?: string | keyof typeof AllIcons;
    title?: string;
    children?: MenuItem[];
}

export default function LeftMenu() {
    const MenuList = Router.filter(item => item.title === 'layout')[0]?.children || [];

    function Menuitems(menuList: MenuItem[]): MenuItem[] {
        return menuList.map(item => {
            if (item.children && item.children.length > 0) {
                return {
                    key: item.title,
                    icon: item.icon || AllIcons[item.icon as keyof typeof AllIcons],
                    label: item.title,
                    children: Menuitems(item.children), // Recursively call Menuitems for children
                };
            } else {
                return {
                    key: item.title,
                    icon: item.icon || AllIcons[item.icon as keyof typeof AllIcons],
                    label: item.title,
                };
            }
        });
    }



    return (
        <div>
            <Menu
                mode="inline"
                // defaultSelectedKeys={['1']}
                // defaultOpenKeys={['sub1']}
                style={{ height: '100%' }}
                items={Menuitems(MenuList)}
            />
        </div>
    );
}
