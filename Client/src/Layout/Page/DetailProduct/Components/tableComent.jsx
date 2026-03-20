import React from 'react';
import { Table } from 'antd';

const MyTable = ({ data }) => {
    const columns = [
        {
            title: "User Name",
            dataIndex: 'User_Name',
            key: 'User_Name',
            width: 150
        },
        {
            title: "Content",
            dataIndex: 'Value',
            key: 'Value',
        },
        {
            title: "Time",
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 120,
            sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
            render: (createdAt) => new Date(createdAt).toLocaleString('en-US'),
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={data}
            locale={{ emptyText: "No Comments Available!" }}
            pagination={{ pageSize: 3 }}
        />
    );
};

export default MyTable;
