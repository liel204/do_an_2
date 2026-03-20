import React, { useEffect, useState } from 'react';
import { Button, Space, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteOutlined } from "@ant-design/icons";
import { getAllUsers } from '../../../redux/slices/user/allUser';
import DetailButton from "./ModalDetail";
import { toast } from 'react-toastify';
import { deleteUser } from '../../../redux/slices/user/deleteUser';
import UpdateButton from "./ModalUpdate";

const App = () => {
    const [changeData, setChangeData] = useState(null);

    const data = useSelector(state => state.getAllUsersStore.listUsers);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch, changeData]);

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
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id,
            sortOrder: sortedInfo.columnKey === 'id' ? sortedInfo.order : null,
            ellipsis: true,
            width: "8%"
        },
        {
            title: 'User Name',
            dataIndex: 'User_Name',
            key: 'User_Name',
            sorter: (a, b) => a.User_Name.length - b.User_Name.length,
            sortOrder: sortedInfo.columnKey === 'User_Name' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'User Email',
            dataIndex: 'User_Email',
            key: 'User_Email',
            sorter: (a, b) => a.User_Email.length - b.User_Email.length,
            sortOrder: sortedInfo.columnKey === 'User_Email' ? sortedInfo.order : null,
            ellipsis: true,
            filters: [
                { text: '.com', value: '.com' },
                { text: '.edu.vn', value: '.edu.vn' },
            ],
            filteredValue: filteredInfo.User_Email || null,
            onFilter: (value, record) => record.User_Email.includes(value),
        },
        {
            title: 'User Password',
            dataIndex: 'User_Password',
            key: 'User_Password',
            width: 200,
        },
        {
            title: 'User Role',
            dataIndex: 'User_Role',
            key: 'User_Role',
            filters: [
                { text: 'Admin', value: 'Admin' },
                { text: 'Staff', value: 'Staff' },
                { text: 'Client', value: 'Client' },
            ],
            filteredValue: filteredInfo.User_Role || null,
            onFilter: (value, record) => record.User_Role === value,
            sorter: (a, b) => a.User_Role.length - b.User_Role.length,
            sortOrder: sortedInfo.columnKey === 'User_Role' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Total',
            dataIndex: 'total_order_value',
            key: 'total_order_value',
            sorter: (a, b) => a.total_order_value - b.total_order_value,
            sortOrder: sortedInfo.columnKey === 'total_order_value' ? sortedInfo.order : null,
            ellipsis: true,
            render: (value) => value === null ? value = 0 : value.toLocaleString('vi-VN'),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <DetailButton detail={record} />
                    <UpdateButton item={record} onDataChange={setChangeData} />
                    {/* <Button color="danger" variant="outlined" onClick={() => handleDelete(record.id)}>
                        <DeleteOutlined />
                    </Button> */}
                </Space>
            ),
            width: 300,
        },
    ];
    const handleDelete = async (id) => {
        const tmp = await dispatch(deleteUser({ id: id }));
        setChangeData(tmp);
        if (tmp.payload.data.message === "delete successful") {
            toast.success(tmp.payload.data.message);
        }
        else {
            toast.error(tmp.payload.data.message);
        }
    };
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
