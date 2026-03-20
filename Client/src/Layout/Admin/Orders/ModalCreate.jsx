import React, { useState } from 'react';
import { Modal } from 'antd';
import Mybutton from "../Components/MyButton"
import { AppstoreAddOutlined } from '@ant-design/icons';


const App = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <Mybutton onButtonClick={() => { setOpen(true); }} nameButton="Create Product" iconButton={<AppstoreAddOutlined />} />
            <Modal
                title="Gradient Button Modal"
                centered
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={1000}
            >
                <p>some contents...</p>
                <p>some contents...</p>
                <p>some contents...</p>
            </Modal>
        </>
    );
};
export default App;