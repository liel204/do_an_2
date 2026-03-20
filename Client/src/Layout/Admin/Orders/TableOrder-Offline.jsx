import React, { useEffect, useState } from 'react';
import { Button, Space, Table } from 'antd';
import DetailButton from "./ModalDetail";
import UpdateButton from "./ModalUpdate-Offline";
import axios from "axios";

const App = () => {
    const [temp, setTemp] = useState([]);
    const [changeData, setChangeData] = useState(null);
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/AdminStatisticalRouter/orderRankTable');
            setTemp(response.data.data);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, [changeData]);

    const data = temp.filter(item =>
        item.Payment !== "Online"
    );

    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});
    const handleChange = (pagination, filters, sorter) => {
        setFilteredInfo(filters);
        setSortedInfo(sorter);
    };
    const clearFilters = () => {
        setFilteredInfo({});
    };
    const clearAll = () => {
        setFilteredInfo({});
        setSortedInfo({});
    };

    const columns = [
        {
            title: 'Product Name',
            dataIndex: 'Product_Name',
            key: 'Product_Name',
            sorter: (a, b) => a.Product_Name.length - b.Product_Name.length,
            sortOrder: sortedInfo.columnKey === 'Product_Name' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Memory',
            dataIndex: 'memory',
            key: 'memory',
            sorter: (a, b) => a.memory - b.memory,
            sortOrder: sortedInfo.columnKey === 'memory' ? sortedInfo.order : null,
            ellipsis: true,
            filters: [
                { text: '256', value: '256' },
                { text: '512', value: '512' },
                { text: '1T', value: '1T' },
            ],
            filteredValue: filteredInfo.memory || null,
            onFilter: (value, record) => record.memory === value,
            width: 100
        },
        {
            title: 'Color',
            dataIndex: 'color',
            key: 'color',
            filteredValue: filteredInfo.color || null,
            sorter: (a, b) => a.color.length - b.color.length,
            sortOrder: sortedInfo.columnKey === 'color' ? sortedInfo.order : null,
            ellipsis: true,
            width: 100,
            filters: [
                { text: 'Black', value: 'Black' },
                { text: 'White', value: 'White' },
            ],
            onFilter: (value, record) => record.color === value,
        },
        {
            title: 'Price per Item',
            dataIndex: 'option_price',
            key: 'option_price',
            filteredValue: filteredInfo.option_price || null,
            sorter: (a, b) => a.option_price - b.option_price,
            sortOrder: sortedInfo.columnKey === 'option_price' ? sortedInfo.order : null,
            ellipsis: true,
            render: (value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, "."),
        },
        {
            title: 'Quantity',
            dataIndex: 'CartItem_Quantity',
            key: 'CartItem_Quantity',
            filteredValue: filteredInfo.CartItem_Quantity || null,
            sorter: (a, b) => a.CartItem_Quantity - b.CartItem_Quantity,
            sortOrder: sortedInfo.columnKey === 'CartItem_Quantity' ? sortedInfo.order : null,
            ellipsis: true,
            width: 120,
        },
        {
            title: 'Order Total Price',
            dataIndex: 'Oder_TotalPrice',
            key: 'Oder_TotalPrice',
            filteredValue: filteredInfo.Oder_TotalPrice || null,
            sorter: (a, b) => a.Oder_TotalPrice - b.Oder_TotalPrice,
            sortOrder: sortedInfo.columnKey === 'Oder_TotalPrice' ? sortedInfo.order : null,
            ellipsis: true,
            render: (value) => value.toLocaleString('vi-VN'),
        },
        {
            title: 'Order Status',
            dataIndex: 'Oder_Status',
            key: 'Oder_Status',
            filteredValue: filteredInfo.Oder_Status || null,
            sorter: (a, b) => a.Oder_Status.length - b.Oder_Status.length,
            sortOrder: sortedInfo.columnKey === 'Oder_Status' ? sortedInfo.order : null,
            ellipsis: true,
            filters: [
                { text: 'Order Pending Approval', value: 'Order Pending Approval' },
                { text: 'Order In Transit', value: 'Order In Transit' },
                { text: 'Order Delivered Successfully', value: 'Order Delivered Successfully' },
            ],
            onFilter: (value, record) => record.Oder_Status === value,
            width: 250
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <DetailButton detail={record} />
                    <UpdateButton detail={record} onDataChange={setChangeData} />
                </Space>
            ),
        },
    ];
    const [pageSize, setPageSize] = useState(5);
    return (
        <>
            <Space style={{ marginBottom: 16 }}>
                <Button onClick={clearFilters}>Clear filters</Button>
                <Button onClick={clearAll}>Clear filters and sorters</Button>
            </Space>
            <Table columns={columns} dataSource={data} onChange={handleChange}
                pagination={{
                    pageSize: pageSize,
                    showSizeChanger: true,
                    pageSizeOptions: ['5', '10', '20', '100'],
                    onChange: (page, pageSize) => {
                        setPageSize(pageSize);
                    },
                }}
            />
        </>
    );
};
export default App;
