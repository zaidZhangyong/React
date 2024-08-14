import React from 'react'
import '@/assets/styles/global.scss';
import { Tabs, Dropdown } from 'antd';
import type { TabsProps, MenuProps } from 'antd';
import { DownOutlined, UserOutlined, LoadingOutlined, CloseOutlined, VerticalAlignMiddleOutlined, VerticalAlignTopOutlined } from '@ant-design/icons';
import { strict } from 'assert';
export default function TabsBox() {
    const items: MenuProps['items'] = [
        {
            label: '重新加载',
            key: '1',
            icon: <LoadingOutlined />,
        },
        {
            label: '关闭标签',
            key: '2',
            icon: <CloseOutlined />,
        },
        {
            label: '关闭其他',
            key: '3',
            icon: <VerticalAlignMiddleOutlined style={{
                transform: 'rotate(90deg)',
            }} />,
        },
        {
            label: '关闭左侧',
            key: '4',
            icon: <VerticalAlignTopOutlined style={{
                transform: 'rotate(90deg)',
            }} />,
        },
        {
            label: '关闭右侧',
            key: '5',
            icon: <VerticalAlignTopOutlined style={{
                transform: 'rotate(-90deg)',
            }} />,

            disabled: true,
        },
    ];

    /** 二次封装标签 */
    const renderTabBar: TabsProps['renderTabBar'] = (tabBarProps, DefaultTabBar) => (
        <DefaultTabBar {...tabBarProps}>
            {node => (
                <Dropdown
                    key={node.key}
                    menu={{
                        items,
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
        console.log(ekey, nkey)
    }
    const onEdit: TabsProps['onEdit'] = (targetKey, action) => {
        if (action === 'remove') {
            // remove(targetKey as string);
        }
    };
    return (
        <div className='tabsH pad16'>
            <div>
                <Tabs
                    className="tabsTa"
                    hideAdd
                    // activeKey="1" //被选中
                    style={{ height: 110 }}
                    type="editable-card"
                    onEdit={onEdit}
                    items={
                        new Array(30).fill(null).map((_, i) => {
                            const id = String(i);
                            return {
                                label: `Tab-${id}`,
                                key: id,
                                disabled: i === 28,
                                children: `Content of tab ${id}`,
                            };
                        })
                    }
                    renderTabBar={renderTabBar}
                />
            </div>
        </div>
    )
}
