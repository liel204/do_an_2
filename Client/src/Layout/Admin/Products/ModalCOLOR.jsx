import React, { useEffect, useState } from 'react';
import { Button, Form, Image, Input, Modal, Space, Table } from 'antd';
import Mybutton from "../Components/MyButton";
import { useDispatch, useSelector } from 'react-redux';
import { getAllColor } from '../../../redux/slices/option/getAllColor';
import { BgColorsOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import ButtonCreate from "../Components/MyButton";
import { createColor } from '../../../redux/slices/option/createColor';
import { toast } from 'react-toastify';
import { deleteColor } from '../../../redux/slices/option/deleteColor';
import { detailColor } from '../../../redux/slices/option/detailColor';
import { updateColor } from '../../../redux/slices/option/UpdateColor';

const App = ({ item }) => {
    const [open, setOpen] = useState(false);
    const [showCreate, setshowCreate] = useState(false);
    const [showUpdate, setshowUpdate] = useState(false);
    const data = useSelector(state => state.getAllColorStore.listoption);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllColor(item.id));
    }, [dispatch, item.id, open, showUpdate, showCreate]);

    const handleDelete = async (id) => {
        const temp = await dispatch(deleteColor(id));
        if (temp.payload.data.message === "delete successful") {
            toast.success(temp.payload.data.message);
            dispatch(getAllColor(item.id));
        }
    };

    const [detail, setDetail] = useState(0);

    const handleUpdate = async (id) => {
        setDetail(id);
        const tempColor = await dispatch(detailColor(id));
        setshowUpdate(true);
        if (tempColor.payload.data.message === "getDetail successful") {
            setColor(tempColor.payload.data.data[0].color);
            setImage(tempColor.payload.data.data[0].image);
        }
    };

    const handleUpdateSubmit = async () => {
        const temp = await dispatch(updateColor({ id: detail, color: color, image: image }));
        if (temp.payload.data.message === "update successful") {
            toast.success(temp.payload.data.message);
            setDetail(0);
            setImage(null);
            setColor("");
            setshowUpdate(false);
        }
    };

    const handleCreate = async () => {
        const temp = await dispatch(createColor({ image: image, productID: item.id, color: color }));
        if (temp.payload.data.message === "Create successful") {
            toast.success(temp.payload.data.message);
            setshowCreate(false);
            setDetail(0);
            setImage(null);
            setColor("");
            setOpen(true);
        }
    };

    const columns = [
        {
            title: 'Color',
            dataIndex: 'color',
            key: 'color',
            ellipsis: true,
        },
        {
            title: 'Image',
            dataIndex: "image",
            render: (text) => <Image
                width={100}
                src={text}
            />,
            key: 'image',
            ellipsis: true,
        },
        {
            title: 'Image-link',
            dataIndex: 'image',
            key: 'image',
            ellipsis: true,
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={() => { handleUpdate(record.id) }} style={{ backgroundColor: '#4CAF50', }} variant="outlined">
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

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    const [color, setColor] = useState("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    return (
        <>
            <Mybutton onButtonClick={() => { setOpen(true); }} iconButton={<BgColorsOutlined />} />
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
                <ButtonCreate onButtonClick={() => setshowCreate(true)} iconButton={<BgColorsOutlined />} nameButton="Create Color" />
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
                        setshowCreate(false);
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
                        <Form.Item label="Color">
                            <Input value={color} onChange={(e) => setColor(e.target.value)} />
                        </Form.Item>
                        <Form.Item label="Image" valuePropName="fileList" getValueFromEvent={normFile}>
                            <div>
                                <input type="file" accept="image/*" onChange={handleImageChange} />
                                {preview && <img src={preview} alt="Preview" style={{ width: '200px', margin: '10px 0' }} />}
                            </div>
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal
                    open={showUpdate}
                    onCancel={() => {
                        setshowUpdate(false);
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
                        <Form.Item label="Color">
                            <Input value={color} onChange={(e) => setColor(e.target.value)} />
                        </Form.Item>
                        <Form.Item label="Image" valuePropName="fileList" getValueFromEvent={normFile}>
                            <div>
                                <input type="file" accept="image/*" onChange={handleImageChange} />
                                <img src={preview} alt="Preview" style={{ width: '200px', margin: '10px 0' }} />
                            </div>
                        </Form.Item>
                    </Form>
                </Modal>
            </Modal>
        </>
    );
};

export default App;
