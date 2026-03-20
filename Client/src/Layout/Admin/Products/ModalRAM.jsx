import React, { useEffect, useState } from 'react';
import { Button, Form, Image, Input, Modal, Space, Table } from 'antd';
import Mybutton from "../Components/MyButton";
import { useDispatch, useSelector } from 'react-redux';
import { BgColorsOutlined, DeleteOutlined, EditOutlined, TrademarkOutlined } from "@ant-design/icons";
import ButtonCreate from "../Components/MyButton";
import { toast } from 'react-toastify';
import { getAllMemory } from '../../../redux/slices/option/getAllMemory';
import { createRAM } from '../../../redux/slices/option/createRAM';
import { deleteRAM } from '../../../redux/slices/option/deleteRAM';
import { detailRAM } from '../../../redux/slices/option/detailRAM';
import { updateRAM } from '../../../redux/slices/option/UpdateRAM';

const App = ({ item }) => {
    const [open, setOpen] = useState(false);
    const [showCreate, setShowCreate] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const data = useSelector(state => state.getMemoryStore.listoption);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllMemory(item.id));
    }, [dispatch, open, showUpdate, showCreate]);

    const handleDelete = async (id) => {
        const temp = await dispatch(deleteRAM(id));
        if (temp.payload.data.message === "delete successful") {
            toast.success(temp.payload.data.message);
            dispatch(getAllMemory(item.id));
        }
    };

    const [detail, setDetail] = useState(0);
    const [ram, setRam] = useState("");
    const [price, setPrice] = useState("");

    const handleUpdate = async (id) => {
        setDetail(id);
        const tmpRAM = await dispatch(detailRAM(id));
        setShowUpdate(true);
        if (tmpRAM.payload.data.message === "getDetail successful") {
            setRam(tmpRAM.payload.data.data[0].memory);
            setPrice(tmpRAM.payload.data.data[0].option_price);
        }
    };

    const handleUpdateSubmit = async () => {
        const temp = await dispatch(updateRAM({ id: detail, option_price: price, memory: ram }));
        if (temp.payload.data.message === "update successful") {
            toast.success(temp.payload.data.message);
            setDetail(0);
            setPrice("");
            setRam("");
            setShowUpdate(false);
        }
    };

    const handleCreate = async () => {
        const temp = await dispatch(createRAM({ productID: item.id, memory: ram, option_price: price }));
        if (temp.payload.data.message === "Create successful") {
            toast.success(temp.payload.data.message);
            setShowCreate(false);
            setPrice("");
            setRam("");
            setOpen(true);
        }
    };

    const columns = [
        {
            title: 'Memory',
            dataIndex: 'memory',
            key: 'memory',
            ellipsis: true,
        },
        {
            title: 'Option Price',
            dataIndex: 'option_price',
            key: 'option_price',
            ellipsis: true,
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={() => { handleUpdate(record.id) }} style={{ backgroundColor: '#4CAF50' }} variant="outlined">
                        <EditOutlined />
                    </Button>
                    <Button onClick={() => { handleDelete(record.id) }} color="danger" variant="outlined">
                        <DeleteOutlined />
                    </Button>
                </Space>
            ),
            width: 300,
        },
    ];

    return (
        <>
            <Mybutton onButtonClick={() => { setOpen(true); }} iconButton={<TrademarkOutlined />} />
            <Modal
                title="Gradient Button Modal"
                centered
                open={open}
                afterOpenChange={(open) => {
                    setOpen(open);
                }}
                onCancel={() => setOpen(false)}
                width={1000}
            >
                <ButtonCreate onButtonClick={() => setShowCreate(true)} iconButton={<BgColorsOutlined />} nameButton="Create RAM" />
                <Image.PreviewGroup
                    preview={{
                        onChange: (current, prev) =>
                            console.log(`current index: ${current}, prev index: ${prev}`),
                    }}
                >
                    <Table columns={columns} dataSource={data}
                        pagination={{
                            pageSize: 3,
                        }}
                    />
                </Image.PreviewGroup>
                <Modal
                    open={showCreate}
                    onCancel={() => {
                        setShowCreate(false);
                    }}
                    onOk={() => handleCreate()}
                >
                    <Form
                        labelCol={{
                            span: 4,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        layout="horizontal"
                    >
                        <Form.Item label="RAM">
                            <Input value={ram} onChange={(e) => setRam(e.target.value)} />
                        </Form.Item>
                        <Form.Item label="Price">
                            <Input value={price} onChange={(e) => setPrice(e.target.value)} />
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal
                    open={showUpdate}
                    onCancel={() => {
                        setShowUpdate(false);
                    }}
                    onOk={() => handleUpdateSubmit()}
                >
                    <Form
                        labelCol={{
                            span: 4,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        layout="horizontal"
                    >
                        <Form.Item label="RAM">
                            <Input value={ram} onChange={(e) => setRam(e.target.value)} />
                        </Form.Item>
                        <Form.Item label="Price">
                            <Input value={price} onChange={(e) => setPrice(e.target.value)} />
                        </Form.Item>
                    </Form>
                </Modal>
            </Modal>
        </>
    );
};

export default App;
