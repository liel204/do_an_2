import React, { useEffect, useState } from 'react';
import {
    AreaChartOutlined,
    BankOutlined,
    BgColorsOutlined,
    BorderVerticleOutlined,
    HomeOutlined,
    LogoutOutlined,
    PoundCircleOutlined,
    ProductOutlined,
    RobotOutlined,
    RollbackOutlined,
    SettingOutlined,
    UnorderedListOutlined,
    UserOutlined,
    WechatOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import TableProducts from "./Products/TableProducts";
import TableCategorys from "./Categorys/TableCategorys";
import TableUsers from "./Users/TableUsers";
import TableOrderOnline from "./Orders/TableOrder-Online";
import TableOrderOffline from "./Orders/TableOrder-Offline";
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/slices/user/logout';
import { useNavigate } from 'react-router-dom';
import BoxChat from "../Componemt/BoxChat";
import { useSocket } from "../../SocketProvider/SocketContext";
import StatisticalCategory from "./Categorys/Statistical";
import StatisticalProduct from "./Products/Statistical";
import StatisticalUser from "./Users/Statistical";
import Main from "./Main/Statistical";
import SupportUser from "./SupportUser/Index";
import KnowledgeManager from "./Chatbot/KnowledgeManager";
import ChatHistory from "./Chatbot/ChatHistory";

const { Header, Content, Footer, Sider } = Layout;

const App = () => {
    const socket = useSocket();
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const [compo, setCompo] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showBoxChat, setShowBoxChat] = useState(false);
    const [UserID, setUserID] = useState(null);
    const [conversations, setConversations] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState(['1']);
    const [openKeys, setOpenKeys] = useState([]);
    const renderComponent = () => {
        switch (compo) {
            case 'TableCategorys':
                return <TableCategorys />;
            case 'TableProducts':
                return <TableProducts />;
            case 'TableUsers':
                return <TableUsers />;
            case 'TableOrderOnline':
                return <TableOrderOnline />;
            case 'TableOrderOffline':
                return <TableOrderOffline />;
            case 'StatisticalCategory':
                return <StatisticalCategory />;
            case 'StatisticalProduct':
                return <StatisticalProduct />;
            case 'StatisticalUser':
                return <StatisticalUser />;
            case 'SupportUser':
                return <SupportUser userId={UserID} />;
            case 'KnowledgeManager':
                return <KnowledgeManager />;
            case 'ChatHistory':
                return <ChatHistory />;
            default:
                return <Main />;
        }
    };

    const items = [
        {
            key: '1',
            label: 'Home',
            icon: <HomeOutlined />,
            onClick: () => {
                setCompo("Main");
                setSelectedKeys(['1']);
            },
        },
        {
            key: '2',
            label: 'Category',
            icon: <UnorderedListOutlined />,
            children: [
                {
                    key: '2-1',
                    label: 'StatisticalCategory',
                    icon: <AreaChartOutlined />,
                    onClick: () => {
                        setCompo("StatisticalCategory");
                        setSelectedKeys(['2-1']);
                    },
                },
                {
                    key: '2-2',
                    label: 'Category',
                    icon: <UnorderedListOutlined />,
                    onClick: () => {
                        setCompo("TableCategorys");
                        setSelectedKeys(['2-2']);
                    },
                },
            ]
        },
        {
            key: '3',
            label: 'Products',
            icon: <ProductOutlined />,
            children: [
                {
                    key: '3-1',
                    label: 'StatisticalProduct',
                    icon: <AreaChartOutlined />,
                    onClick: () => {
                        setCompo("StatisticalProduct");
                        setSelectedKeys(['3-1']);
                    },
                },
                {
                    key: '3-2',
                    label: 'Products',
                    icon: <ProductOutlined />,
                    onClick: () => {
                        setCompo("TableProducts");
                        setSelectedKeys(['3-2']);
                    },
                },
            ]
        },
        {
            key: '4',
            label: 'User',
            icon: <UserOutlined />,
            children: [
                {
                    key: '4-1',
                    label: 'StatisticalUser',
                    icon: <AreaChartOutlined />,
                    onClick: () => {
                        setCompo("StatisticalUser");
                        setSelectedKeys(['4-1']);
                    },
                },
                {
                    key: '4-2',
                    label: 'User',
                    icon: <ProductOutlined />,
                    onClick: () => {
                        setCompo("TableUsers");
                        setSelectedKeys(['4-2']);
                    },
                },
            ]
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
                    onClick: () => {
                        setCompo("TableOrderOnline");
                        setSelectedKeys(['5-1']);
                    },
                },
                {
                    key: '5-2',
                    label: 'Offline',
                    icon: <PoundCircleOutlined />,
                    onClick: () => {
                        setCompo("TableOrderOffline");
                        setSelectedKeys(['5-2']);
                    },
                },
            ]
        },

        {
            key: '9',
            label: 'Support User',
            icon: <RobotOutlined />,
            onClick: () => {
                setCompo("SupportUser");
                setSelectedKeys(['9']);
            },
        },
        {
            key: '7',
            label: 'Settings',
            icon: <SettingOutlined />,
            children: [
                {
                    key: '7-1',
                    label: 'Back',
                    icon: <RollbackOutlined />,
                    onClick: () => { navigate(`/`) }
                },
                {
                    key: '7-2',
                    label: 'Logout',
                    icon: <LogoutOutlined />,
                    onClick: () => { dispatch(logoutUser()); navigate(`/login`) }
                },
            ]
        },
        {
            key: '10',
            label: 'Chatbot AI RAG',
            icon: <RobotOutlined />,
            children: [
                {
                    key: '10-1',
                    label: 'Knowledge Base',
                    icon: <UnorderedListOutlined />,
                    onClick: () => {
                        setCompo("KnowledgeManager");
                        setSelectedKeys(['10-1']);
                    },
                },
                {
                    key: '10-2',
                    label: 'Chat History',
                    icon: <WechatOutlined />,
                    onClick: () => {
                        setCompo("ChatHistory");
                        setSelectedKeys(['10-2']);
                    },
                },
            ]
        },
    ];

    const dataSauKhiUpdate = useSelector((state) => state.data.data);

    useEffect(() => {
        console.log("dataSauKhiUpdate!!!", dataSauKhiUpdate);
    }, [dataSauKhiUpdate]);



    return (
        <>
            <Layout style={{ minHeight: '100vh' }}>
                {showBoxChat && <BoxChat showBoxChat={showBoxChat} UserID={UserID} />}
                <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        bottom: 0,
                        zIndex: 10,
                        transition: 'all 0.3s linear',
                        overflow: 'auto',
                        height: "calc(100% - 46px)"
                    }}
                >
                    <div className="demo-logo-vertical" />
                    <Menu
                        theme="dark"
                        selectedKeys={selectedKeys}
                        defaultSelectedKeys={['1']}
                        mode="inline"
                        items={items}
                        openKeys={openKeys}
                        onOpenChange={setOpenKeys}
                    />
                </Sider>
                <Layout style={{ marginLeft: collapsed ? 80 : 200, transition: 'all 0.3s linear' }}>
                    <Header style={{ padding: 0, background: colorBgContainer }} />
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }} />
                        {renderComponent()}
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Iphone Store ©{new Date().getFullYear()} Created NguyenRoLiel
                    </Footer>
                </Layout>
            </Layout>
        </>
    );
};

export default App;


