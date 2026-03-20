import React, { useState } from 'react';
import { Button, Image, Modal } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import {
    Form,
} from 'antd';

const App = ({ detail }) => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <Button type="primary" onClick={() => { setOpen(true); }}>
                <CopyOutlined />
            </Button>

            <Modal
                title="User Detail"
                centered
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={1000}
            >
                <div style={{ display: "flex", justifyContent: "space-around" }} >
                    <Form
                        wrapperCol={{
                            span: 24,
                        }}
                        layout="horizontal"
                    >
                        <Form.Item label="Full Name">
                            <b> {detail.FullName}</b>
                        </Form.Item>
                        <Form.Item label="Phone">
                            <b> {detail.Phone}</b>
                        </Form.Item>
                        <Form.Item label="Payment Method">
                            <b> {detail.Payment}</b>
                        </Form.Item>
                        <Form.Item label="Order Status">
                            <b> {detail.Oder_Status}</b>
                        </Form.Item>
                        <Form.Item label="Transaction ID">
                            <b> {detail.app_trans_id}</b>
                        </Form.Item>
                        <Form.Item label="Shipping Address">
                            <b> {detail.Oder_AddressShipping}</b>
                        </Form.Item>
                        <Form.Item label="Note">
                            <b> {detail.Note}</b>
                        </Form.Item>
                    </Form>
                    <Form
                        wrapperCol={{
                            span: 24,
                        }}
                        layout="horizontal"
                    >
                        <Form.Item label="Product Name">
                            <b> {detail.Product_Name}</b>
                        </Form.Item>
                        <Form.Item label="Color">
                            <b> {detail.Color}</b>
                        </Form.Item>
                        <Form.Item label="Memory">
                            <b> {detail.Memory}</b>
                        </Form.Item>
                        <Form.Item label="Quantity">
                            <b> {detail.CartItem_Quantity}</b>
                        </Form.Item>
                        <Form.Item label="Total Price per Item">
                            <b> {detail.TotalPriceItem}</b>
                        </Form.Item>
                        <Form.Item label="Order Total Price">
                            <b> {detail.Oder_TotalPrice}</b>
                        </Form.Item>
                        <Image
                            width={200}
                            src={detail.Image}
                        />
                    </Form>
                </div>
            </Modal >
        </>
    );
};

export default App;
