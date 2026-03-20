import React, { useState } from 'react';
import { Modal } from 'antd';
import Mybutton from "../Components/MyButton"


const App = (props) => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <Mybutton onButtonClick={() => { setOpen(true); }} iconButton={props.icon} />
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