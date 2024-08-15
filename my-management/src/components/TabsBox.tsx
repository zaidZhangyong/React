
import '@/assets/styles/global.scss';
import { Tabs, Dropdown } from 'antd';
import type { TabsProps, MenuProps } from 'antd';
import { LoadingOutlined, CloseOutlined, VerticalAlignMiddleOutlined, VerticalAlignTopOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from "@/store"
import { removeNavs, setShowKey } from "@/store/reducer/navs"
import { useNavigate, useLocation } from "react-router-dom"
import React, { useReducer, useEffect } from 'react';
export default function TabsBox() {
    const [, forceUpdate] = useReducer(x => x + 1, 0);
    const showKey = useSelector((state: RootState) => state.navs.showKey);
    const location = useLocation(); //获取当前路由
    const navs = useSelector((state: RootState) => state.navs);
    const navigate = useNavigate()
    const dispatch = useDispatch();
    // const items: (key?: string) => MenuProps['items'] = (key = activeKey) => {
    const items = (key: string) => {
        const index = navs.navsList.findIndex(item => item.key === key);
        return [
            {
                label: '重新加载',
                key: '1',
                icon: <LoadingOutlined />,
            },
            {
                label: '关闭标签',
                key: '2',
                icon: <CloseOutlined />,
                disabled: index === 0,
            },
            {
                label: '关闭其他',
                key: '3',
                icon: <VerticalAlignMiddleOutlined style={{
                    transform: 'rotate(90deg)',
                }} />,
                disabled: navs.navsList.length === 1,
            },
            {
                label: '关闭左侧',
                key: '4',
                icon: <VerticalAlignTopOutlined style={{
                    transform: 'rotate(-90deg)',
                }} />,

                disabled: index == 0,
            },
            {
                label: '关闭右侧',
                key: '5',
                icon: <VerticalAlignTopOutlined style={{
                    transform: 'rotate(90deg)',
                }} />,

                disabled: navs.navsList.length === index + 1,
            },
        ];

    }

    /** 二次封装标签 */
    const renderTabBar: TabsProps['renderTabBar'] = (tabBarProps, DefaultTabBar) => (
        <DefaultTabBar {...tabBarProps}>
            {node => (
                <Dropdown
                    key={node.key}
                    menu={{
                        items: items(node.key as string),
                        onClick: e => TabsOnClick(e.key, node.key as string)
                    }}
                    trigger={['contextMenu']} //右键点击
                >
                    <div className='mr-1px'>
                        {node}
                    </div>
                </Dropdown>
            )}
        </DefaultTabBar>
    );
    const TabsOnClick = (ekey: string, nkey: string) => {
        switch (ekey) {
            case "1":
                forceUpdate();
                break
            case "2": //删除当前
                modifyNavs('item', nkey);
                break
            case "3": //关闭其他
                modifyNavs('other', nkey);
                break
            case "4": //关闭左
                modifyNavs('left', nkey, location.pathname);
                break
            case "5": //关闭右
                modifyNavs('right', nkey, location.pathname);
                break

        }

    }
    useEffect(() => { //监听 redux  showKey 值的变化
        // 当 showKey 变化时，执行一些操作，例如发送网络请求
        navigate(showKey)
        // 你可以在这里放置其他逻辑
    }, [showKey]);
    const modifyNavs = (type: string, nkey: string, pathname?: string) => {
        let index = navs.navsList.findIndex(item => item.key == nkey)
        dispatch(removeNavs([type, index, pathname]))
    }

    const onChange = (key: string) => {
        dispatch(setShowKey(key))
    };
    const onEdit: TabsProps['onEdit'] = (targetKey, action) => {
        if (action === 'remove') {
            modifyNavs('item', targetKey as string)
        }
    };
    return (
        <div className='tabsH pad16'>
            <div>
                <Tabs
                    className="tabsTa"
                    hideAdd
                    activeKey={navs.showKey} //被选中
                    style={{ height: 110 }}
                    type="editable-card"
                    onEdit={onEdit}
                    onChange={onChange}
                    items={
                        navs.navsList.map((_) => {
                            return {
                                label: _.label,
                                key: _.key,
                                closable: _.closable,
                                // disabled: i === 28,
                            };
                        })
                    }
                    renderTabBar={renderTabBar}
                />
            </div>
        </div>
    )
}
