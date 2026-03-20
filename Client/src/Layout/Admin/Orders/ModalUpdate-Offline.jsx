import React, { useState } from 'react';
import { Image, Modal, Select } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import {
    Form,
} from 'antd';
import Mybutton from "../Components/MyButton";
import { useDispatch } from 'react-redux';
import { updateOrder } from '../../../redux/slices/oder/updateOrder';
import { toast } from 'react-toastify';

const App = ({ detail, onDataChange }) => {
    const [open, setOpen] = useState(false);
    const [orderStatus, setOrderStatus] = useState(detail.Oder_Status);

    const dispatch = useDispatch();
    const handlerUpdate = async () => {
        const tmp = await dispatch(updateOrder({ id: detail.id, Oder_Status: orderStatus }));
        if (tmp.payload.data.message === "update successful") {
            toast.success(tmp.payload.data.message);
            onDataChange(tmp);
        } else {
            toast.error(tmp.payload.data.message);
        }
        setOpen(false);
    };

    return (
        <>
            <Mybutton onButtonClick={() => { setOpen(true); }} iconButton={<EditOutlined />} />
            <Modal
                title="Update User"
                centered
                open={open}
                onOk={() => handlerUpdate()}
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
                        <Form.Item label="Shipping Address">
                            <Select style={{ width: 250 }} value={orderStatus} onChange={(value) => setOrderStatus(value)}>
                                <Select.Option value="Order Pending Approval">Order Pending Approval</Select.Option>
                                <Select.Option value="Order Approved">Order Approved</Select.Option>
                                <Select.Option value="Order In Transit">Order In Transit</Select.Option>
                                <Select.Option value="Order Delivered Successfully">Order Delivered Successfully</Select.Option>
                            </Select>
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
                        <Form.Item label="Item Total Price">
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
