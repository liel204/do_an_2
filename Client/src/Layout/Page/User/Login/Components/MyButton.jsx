import React from 'react';
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
const App = (props) => {
  const { styles } = useStyle();
  return (
    <ConfigProvider button={{ className: styles.linearGradientButton, }}>
      <Space>
        <Button style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
          onClick={props.onButtonClick} type="primary" size="large" icon={props.iconButton}>
          {props.nameButton}
        </Button>
      </Space>
    </ConfigProvider >
  );
};
export default App;