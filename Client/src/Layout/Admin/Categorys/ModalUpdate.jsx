import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import {
    Form,
    Input,
} from 'antd';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { updateCategory } from '../../../redux/slices/category/updeteCategory';

const App = (props) => {
    const [open, setOpen] = useState(false);
    const [categoryName, setCategoryName] = useState(props.item.Category_Name);
    const dispatch = useDispatch()
    const handleOK = async () => {
        const tmp = await dispatch(updateCategory({ id: props.item.id, Category_Name: categoryName }))
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
                title="Create Category"
                centered
                open={open}
                onOk={() => handleOK()}
                onCancel={() => setOpen(false)}
                width={1000}
            >
                <>
                    <Form
                        labelCol={{ span: 4, }} y
                        wrapperCol={{ span: 14, }}
                        layout="horizontal"
                        style={{ maxWidth: 600, }}
                    >
                        <Form.Item label="Category Name">
                            <Input value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
                        </Form.Item>
                    </Form>
                </>
            </Modal>
        </>
    );
};
export default App;