import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import Mybutton from "../Components/MyButton";
import { AppstoreAddOutlined } from '@ant-design/icons';
import {
    Form,
    Input,
    Select,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { createColor } from '../../../redux/slices/option/createColor';
import { createProduct } from '../../../redux/slices/product/createProduct';
import { createRAM } from '../../../redux/slices/option/createRAM';
import { getAllCategory } from '../../../redux/slices/category/allCaterogy';
import { toast } from 'react-toastify';

const { TextArea } = Input;

const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

const App = (props) => {
    const [open, setOpen] = useState(false);
    const data = useSelector(state => state.allCategoryStore.listcategory);

    const [productName, setProductName] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [description, setDescription] = useState("");
    const [ram, setRAM] = useState("");
    const [price, setPrice] = useState(0);
    const [color, setColor] = useState("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCategory());
    }, [dispatch]);

    const handleOK = async () => {
        const tmp = await dispatch(createProduct({ Product_Name: productName, Product_Description: description, Product_Quantity: 100, CategoryID: categoryId }));
        props.onDataChange(tmp);
        if (tmp.payload.data.message === "Create successful") {
            dispatch(createColor({ image: image, productID: tmp.payload.data.data.id, color: color }));
            dispatch(createRAM({ productID: tmp.payload.data.data.id, memory: ram, option_price: price }));
            setOpen(false);
        }
        if (tmp.payload.data.message === "Create successful") {
            toast.success(tmp.payload.data.message)
        } else {
            toast.error(tmp.payload.data.message)
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    return (
        <>
            <Mybutton onButtonClick={() => { setOpen(true); }} nameButton={props.nameButton} iconButton={<AppstoreAddOutlined />} />
            <Modal
                title="Create Product"
                centered
                open={open}
                onOk={handleOK}
                onCancel={() => setOpen(false)}
                width={1000}
            >
                <>
                    {/* <MyUpload /> */}
                    <Form
                        labelCol={{
                            span: 4,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        layout="horizontal"
                    >
                        <Form.Item label="Product Name">
                            <Input onChange={e => setProductName(e.target.value)} />
                        </Form.Item>
                        <Form.Item label="Category">
                            <Select value={categoryId} onChange={(value) => setCategoryId(value)}>
                                {data.map((item) => {
                                    return (
                                        <Select.Option key={item.id} value={item.id}>{item.Category_Name}</Select.Option>
                                    )
                                })}
                            </Select>
                        </Form.Item>
                        <Form.Item label="Description">
                            <TextArea rows={4} onChange={e => setDescription(e.target.value)} />
                        </Form.Item>
                        <Form.Item label="RAM">
                            <Input onChange={e => setRAM(e.target.value)} />
                        </Form.Item>
                        <Form.Item label="Price">
                            <Input onChange={e => setPrice(e.target.value)} />
                        </Form.Item>
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
                </>
            </Modal>
        </>
    );
};

export default App;
