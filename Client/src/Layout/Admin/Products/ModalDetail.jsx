import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import {
    Form,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getAllColor } from '../../../redux/slices/option/getAllColor';
import { getAllMemory } from '../../../redux/slices/option/getAllMemory';

const App = ({ detail }) => {
    const [open, setOpen] = useState(false);
    const listColor = useSelector(state => state.getColorStore.listoption);
    const listRam = useSelector(state => state.getMemoryStore.listoption);
    const handleOK = async () => {
        setOpen(false);
    };
    const dispatch = useDispatch();
    useEffect(() => {
        const fetch = async () => {
            await dispatch(getAllColor(detail.id));
            await dispatch(getAllMemory(detail.id));
        };
        fetch();
    }, [dispatch, open, detail.id]);

    return (
        <>
            <Button type="primary" onClick={() => { setOpen(true); }}>
                <CopyOutlined />
            </Button>

            <Modal
                title="Product Details"
                centered
                open={open}
                onOk={handleOK}
                onCancel={() => setOpen(false)}
                width={1000}
            >
                <div style={{ display: "flex", justifyContent: "space-around" }} >
                    <Form
                        wrapperCol={{
                            span: 16,
                        }}
                        layout="horizontal"
                    >
                        <Form.Item label="Product Name">
                            <b> {detail.Product_Name}</b>
                        </Form.Item>
                        <Form.Item label="Description">
                            <b> {detail.Product_Description}</b>
                        </Form.Item>
                        <Form.Item label="Category Name">
                            <b> {detail.Category_Name}</b>
                        </Form.Item>
                        <Form.Item label="Min Price">
                            <b> {detail.lowest_option_price}</b>
                        </Form.Item>
                        <Form.Item label="Max Price">
                            <b> {detail.Max}</b>
                        </Form.Item>
                    </Form>

                    <Form
                        wrapperCol={{
                            span: 16,
                        }}
                        layout="horizontal"
                    >
                        <Form.Item label="RAM">
                            {listRam.map(item => {
                                return (
                                    <b> {item.memory}</b>
                                );
                            })}
                        </Form.Item>
                        <Form.Item label="Color">
                            {listColor.map(item => {
                                return (
                                    <b> {item.color}</b>
                                );
                            })}
                        </Form.Item>
                    </Form>
                </div>
            </Modal >
        </>
    );
};

export default App;
