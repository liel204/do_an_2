import React, { useState } from 'react';
import { Button, Modal } from 'antd';
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
                        <Form.Item label="User Name">
                            <b> {detail.User_Name}</b>
                        </Form.Item>
                        <Form.Item label="User Email">
                            <b> {detail.User_Email}</b>
                        </Form.Item>
                        <Form.Item label="User Role">
                            <b> {detail.User_Role}</b>
                        </Form.Item>
                        <Form.Item label="Total">
                            <b> {detail.total_order_value}</b>
                        </Form.Item>
                    </Form>
                </div>
            </Modal >
        </>
    );
};
export default App;
