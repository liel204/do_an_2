import React, { useEffect, useState } from 'react';
import { Button, Space, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../../redux/slices/product/allProduct';
import { getAllCategory } from '../../../redux/slices/category/allCaterogy';
import ButtonCreate from "./ModalCreate"
import ButtonUpdate from "./ModalUpdate"
import { DeleteOutlined } from "@ant-design/icons"
import { deleteCategory } from '../../../redux/slices/category/deleteCategory';
import { toast } from 'react-toastify';


const App = () => {
    const data = useSelector(state => state.allCategoryStore.listcategory)
    const [changeData, setChangeData] = useState(null)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllProducts())
        dispatch(getAllCategory())
    }, [dispatch, changeData])

    const [sortedInfo, setSortedInfo] = useState({});
    const handleChange = (pagination, filters, sorter) => {
        setSortedInfo(sorter);
    };

    const clearAll = () => {
        setSortedInfo({});
    };

    const handleDelete = async (id) => {
        const tmp = await dispatch(deleteCategory({ id: id }))
        setChangeData(tmp)
        if (tmp.payload.data.message === "delete successful") {
            toast.success(tmp.payload.data.message)
        }
        else {
            toast.error(tmp.payload.data.message)
        }
    }

    const columns = [
        {
            title: 'Category Name',
            dataIndex: 'Category_Name',
            key: 'Category_Name',
            sorter: (a, b) => a.Category_Name.length - b.Category_Name.length,
            sortOrder: sortedInfo.columnKey === 'Category_Name' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Product Count',
            dataIndex: 'product_count',
            key: 'product_count',
            sorter: (a, b) => a.product_count - b.product_count,
            sortOrder: sortedInfo.columnKey === 'product_count' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <ButtonUpdate item={record} onDataChange={setChangeData} />
                    <Button color="danger" variant="outlined" onClick={() => handleDelete(record.id)}>
                        <DeleteOutlined />
                    </Button>
                </Space>
            ),
        },
    ];

    const [pageSize, setPageSize] = useState(5)
    return (
        <>
            <Space style={{ marginBottom: 16 }}>
                <ButtonCreate onDataChange={setChangeData} />
                <Button onClick={clearAll}>Clear sorters</Button>
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
