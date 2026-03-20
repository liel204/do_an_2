import React, { useState } from 'react';
import { Modal } from 'antd';
import Mybutton from "../Components/MyButton"
import { AppstoreAddOutlined } from '@ant-design/icons';
import {
    Form,
    Input,
} from 'antd';
import { useDispatch } from 'react-redux';
import { createCategory } from '../../../redux/slices/category/createCategory';
import { toast } from 'react-toastify';

const App = (props) => {
    const [open, setOpen] = useState(false);
    const [categoryName, setCategoryName] = useState("");
    const dispatch = useDispatch()
    const handleOK = async () => {
        const tmp = await dispatch(createCategory({ Category_Name: categoryName }))
        props.onDataChange(tmp)
        if (tmp.payload.data.message === "Create successful") {
            toast.success(tmp.payload.data.message)
        }
        else {
            toast.error(tmp.payload.data.message)
        }
        setOpen(false)
    }

    return (
        <>
            <Mybutton onButtonClick={() => { setOpen(true); }} nameButton="Create Category" iconButton={<AppstoreAddOutlined />} />
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
                        labelCol={{ span: 4, }}
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
