import React, { useEffect, useState } from 'react';
import { Button, Modal, Select } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getAllCategory } from '../../../redux/slices/category/allCaterogy';
import { updateProduct } from '../../../redux/slices/product/updateProduct';

const App = (props) => {
    const data = useSelector(state => state.allCategoryStore.listcategory);

    const [open, setOpen] = useState(false);
    const [Product_Name, setProduct_Name] = useState(props.item.Product_Name);
    const [Product_Description, setProduct_Description] = useState(props.item.Product_Description);
    const [CategoryID, setCategoryID] = useState(props.item.CategoryID);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCategory());
    }, [dispatch]);

    const handleOK = async () => {
        const tmp = await dispatch(updateProduct({ id: props.item.id, Product_Name: Product_Name, Product_Description: Product_Description, CategoryID: CategoryID }));
        props.onDataChange(tmp);
        if (tmp.payload.data.message === "update successful") {
            toast.success(tmp.payload.data.message);
        } else {
            toast.error(tmp.payload.data.message);
        }
        setOpen(false);
    };

    return (
        <>
            <Button onClick={() => { setOpen(true); }} style={{ backgroundColor: '#4CAF50' }} variant="outlined">
                <EditOutlined />
            </Button>
            <Modal
                title="Update Category"
                centered
                open={open}
                onOk={() => handleOK()}
                onCancel={() => setOpen(false)}
                width={1000}
            >
                <>
                    <Form
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 14 }}
                        layout="horizontal"
                        style={{ maxWidth: 600 }}
                    >
                        <Form.Item label="Product Name">
                            <Input value={Product_Name} onChange={(e) => setProduct_Name(e.target.value)} />
                        </Form.Item>
                        <Form.Item label="Description">
                            <Input value={Product_Description} onChange={(e) => setProduct_Description(e.target.value)} />
                        </Form.Item>
                        <Form.Item label="Category">
                            <Select value={CategoryID} onChange={(value) => setCategoryID(value)}>
                                {data.map((item) => {
                                    return (
                                        <Select.Option key={item.id} value={item.id}>{item.Category_Name}</Select.Option>
                                    );
                                })}
                            </Select>
                        </Form.Item>
                    </Form>
                </>
            </Modal>
        </>
    );
};

export default App;
