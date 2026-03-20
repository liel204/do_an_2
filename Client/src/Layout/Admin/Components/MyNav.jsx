import React, { useState } from 'react';
import {
    BankOutlined,
    BgColorsOutlined,
    BorderVerticleOutlined,
    LogoutOutlined,
    PoundCircleOutlined,
    ProductOutlined,
    SettingOutlined,
    UnorderedListOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';

import { useNavigate } from 'react-router-dom';

const { Sider } = Layout;

const App = () => {
    const nav = useNavigate()
    const [collapsed, setCollapsed] = useState(false);

    const items = [
        // {
        //     key: '1',
        //     label: 'Home',
        //     icon: <HomeOutlined />,
        //     onClick: () => nav('/admin'),
        // },
        {
            key: '2',
            label: 'Category',
            icon: <UnorderedListOutlined />,
            onClick: () => nav('/admin/Category'),
        },
        {
            key: '3',
            label: 'Products',
            icon: <ProductOutlined />,
            onClick: () => nav('/admin/Products'),
        },
        {
            key: '4',
            label: 'User',
            icon: <UserOutlined />,
            onClick: () => nav('/admin/User'),
        },
        {
            key: '5',
            label: 'Order',
            icon: <BorderVerticleOutlined />,
            children: [
                {
                    key: '5-1',
                    label: 'Online',
                    icon: <BankOutlined />,
                    onClick: () => nav('/admin/Order-Online'),
                },
                {
                    key: '5-2',
                    label: 'Offline',
                    icon: <PoundCircleOutlined />,
                    onClick: () => nav('/admin/Order-Offline'),
                },
            ]
        },

        {
            key: '7',
            label: 'Settings',
            icon: <SettingOutlined />,
            children: [
                {
                    key: '7-1',
                    label: 'Theme Color',
                    icon: <BgColorsOutlined />,
                },
                {
                    key: '7-2',
                    label: 'Logout',
                    icon: <LogoutOutlined />
                },
            ]
        },
    ];
    return (
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <div className="demo-logo-vertical" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
        </Sider>
    );
};

export default App;
