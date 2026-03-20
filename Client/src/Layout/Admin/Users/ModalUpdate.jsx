import React, { useEffect, useState } from 'react';
import { Button, Modal, Select } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import {
    Form,
} from 'antd';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getAllCategory } from '../../../redux/slices/category/allCaterogy';
import { updateUser } from '../../../redux/slices/user/updateUser';

const App = (props) => {

    const [open, setOpen] = useState(false);

    const [Role, setRole] = useState(props.item.User_Role)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllCategory())
    }, [dispatch])

    const handleOK = async () => {
        const tmp = await dispatch(updateUser({ id: props.item.id, User_Role: Role }))
        props.onDataChange(tmp)
        if (tmp.payload.data.message === "update successful") {
            toast.success(tmp.payload.data.message)
        }
        else {
            toast.error(tmp.payload.data.message)
        }
        setOpen(false)
    }

    return (
        <>
            <Button onClick={() => { setOpen(true); }} style={{ backgroundColor: '#4CAF50', }} variant="outlined">
                <EditOutlined />
            </Button>
            <Modal
                title="Update User Role"
                centered
                open={open}
                onOk={() => handleOK()}
                onCancel={() => setOpen(false)}
                width={1000}
            >
                <>
                    <Form
                        labelCol={{ span: 4, }}
                        wrapperCol={{ span: 14, }}
                        layout="horizontal"
                        style={{ maxWidth: 600, }}
                    >
                        <Form.Item label="User Name">
                            <b> {props.item.User_Name}</b>
                        </Form.Item>
                        <Form.Item label="User Email">
                            <b> {props.item.User_Email}</b>
                        </Form.Item>
                        <Form.Item label="Role">
                            <Select value={Role} onChange={(value) => setRole(value)}>
                                <Select.Option value={"Admin"}>Admin</Select.Option>
                                <Select.Option value={"Staff"}>Staff</Select.Option>
                                <Select.Option value={"Client"}>Client</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Total">
                            <b> {props.item.total_order_value}</b>
                        </Form.Item>
                    </Form>
                </>
            </Modal>
        </>
    );
};
export default App;
