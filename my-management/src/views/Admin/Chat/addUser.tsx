import React from 'react'
import { FontColorsOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Space } from 'antd';
import { createStyles } from 'antd-style';
const useStyle = createStyles(({ prefixCls, css }) => ({
  linearGradientButton: css`
    &.${prefixCls}-btn-primary:not([disabled]):not(.${prefixCls}-btn-dangerous) {
      border-width: 0;

      > span {
        position: relative;
      }

      &::before {
        content: '';
        background: linear-gradient(135deg, #6253e1, #04befe);
        position: absolute;
        inset: 0;
        opacity: 1;
        transition: all 0.3s;
        border-radius: inherit;
      }

      &:hover::before {
        opacity: 0;
      }
    }
  `,
}));
export default function addUser() {
  const { styles } = useStyle();
  return (
    <div> <ConfigProvider
      button={{
        className: styles.linearGradientButton,
      }}
    >
      <Space style={{ width: '100%' }}>
        <Button type="primary" size="large" style={{ width: '100%' }} icon={<FontColorsOutlined />}>
          添加好友
        </Button>
      </Space>
    </ConfigProvider></div>
  )
}
