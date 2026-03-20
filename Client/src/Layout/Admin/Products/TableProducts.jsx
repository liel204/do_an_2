import React, { useEffect, useState } from 'react';
import { Button, Space, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../../redux/slices/product/allProduct';
import { getAllCategory } from '../../../redux/slices/category/allCaterogy';
import ButtonCreate from "./ModalCreate"
import ButtonColor from "./ModalCOLOR"
import { DeleteOutlined } from "@ant-design/icons"
import { getAllMemory } from '../../../redux/slices/option/getAllMemory';
import { getAllColor } from '../../../redux/slices/option/getAllColor';
import MyButTOnDetail from "./ModalDetail"
import ButtonUpdate from "./ModalUpdate"
import { deleteProduct } from '../../../redux/slices/product/deleteProducts';
import { toast } from 'react-toastify';
import ButtonRam from "./ModalRAM"
const App = () => {
    const [changeData, setChangeData] = useState(null)
    const data = useSelector(state => state.allProductStore.listproducts)
    const listCategory = useSelector(state => state.allCategoryStore.listcategory)
    const filtersCategory = []
    listCategory.map(item =>
        filtersCategory.push({ text: item.Category_Name, value: item.Category_Name })
    )
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllProducts())
        dispatch(getAllCategory())
    }, [dispatch, changeData])

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
    const [memorys, setmemorys] = useState([]);
    const [colors, setcolors] = useState([]);

    useEffect(() => {
        const fetchmemorys = async () => {
            const memorysData = {};
            for (const record of data) {
                const response = await dispatch(getAllMemory(record.id));
                if (!memorysData[record.id]) {
                    memorysData[record.id] = []; // Khởi tạo mảng nếu chưa có
                }
                response.payload.map((item, index) =>
                    index === 0 ?
                        memorysData[record.id].push(item.memory.toUpperCase()) :
                        memorysData[record.id].push(" - ", item.memory.toUpperCase())
                )
            }
            setmemorys(memorysData);
        };
        fetchmemorys();
    }, [data, dispatch]);

    useEffect(() => {
        const fetchcolors = async () => {
            const colorsData = {};
            for (const record of data) {
                const response = await dispatch(getAllColor(record.id));
                if (!colorsData[record.id]) {
                    colorsData[record.id] = []; // Khởi tạo mảng nếu chưa có
                }
                response.payload.map((item, index) =>
                    index === 0 ?
                        colorsData[record.id].push(item.color.toUpperCase()) :
                        colorsData[record.id].push(" - ", item.color.toUpperCase())
                )
            }
            setcolors(colorsData);
        };
        fetchcolors();
    }, [data, dispatch]);

    const handleDelete = async (id) => {
        const tmp = await dispatch(deleteProduct({ id: id }))
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
            title: 'Product Name',
            dataIndex: 'Product_Name',
            key: 'Product_Name',
            filteredValue: filteredInfo.Product_Name || null,
            sorter: (a, b) => a.Product_Name.length - b.Product_Name.length,
            sortOrder: sortedInfo.columnKey === 'Product_Name' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Description',
            dataIndex: 'Product_Description',
            key: 'Product_Description',
            filteredValue: filteredInfo.Product_Description || null,
            sorter: (a, b) => a.Product_Description.length - b.Product_Description.length,
            sortOrder: sortedInfo.columnKey === 'Product_Description' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Category Name',
            dataIndex: 'Category_Name',
            key: 'Category_Name',
            filters: filtersCategory,
            filteredValue: filteredInfo.Category_Name || null,
            onFilter: (value, record) => record.Category_Name.includes(value),
            sorter: (a, b) => a.Category_Name.length - b.Category_Name.length,
            sortOrder: sortedInfo.columnKey === 'Category_Name' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Min Price',
            dataIndex: 'lowest_option_price',
            key: 'lowest_option_price',
            filteredValue: filteredInfo.lowest_option_price || null,
            sorter: (a, b) => a.lowest_option_price - b.lowest_option_price,
            sortOrder: sortedInfo.columnKey === 'lowest_option_price' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Max Price',
            dataIndex: 'Max',
            key: 'Max',
            filteredValue: filteredInfo.Max || null,
            sorter: (a, b) => a.Max - b.Max,
            sortOrder: sortedInfo.columnKey === 'Max' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <MyButTOnDetail detail={record} />
                    <ButtonUpdate item={record} onDataChange={setChangeData} />
                    <Button color="danger" variant="outlined" onClick={() => handleDelete(record.id)}>
                        <DeleteOutlined />
                    </Button>
                    <ButtonColor item={record} />
                    <ButtonRam item={record} />
                </Space>
            ),
            width: 300,
        },
    ];
    const [pageSize, setPageSize] = useState(5)
    return (
        <>
            <Space style={{ marginBottom: 16 }}>
                <ButtonCreate nameButton="Create Product" onDataChange={setChangeData} />
                <Button onClick={clearFilters}>Clear filters</Button>
                <Button onClick={clearAll}>Clear filters and sorters</Button>
            </Space>
            <Table columns={columns} dataSource={data} onChange={handleChange}
                pagination={{
                    pageSize: pageSize, // Số hàng trên mỗi trang
                    showSizeChanger: true, // Hiển thị chọn số hàng mỗi trang
                    pageSizeOptions: ['5', '10', '20', '100'], // Các tùy chọn số hàng mỗi trang
                    onChange: (page, pageSize) => {
                        setPageSize(pageSize);
                    },
                }}
            />
        </>
    );
};
export default App;