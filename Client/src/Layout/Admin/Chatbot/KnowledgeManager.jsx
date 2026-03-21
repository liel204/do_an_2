import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Upload, Input, Select, Tag, Popconfirm, message } from "antd";
import { UploadOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";

const KnowledgeManager = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [uploading, setUploading] = useState(false);
    
    // Form data
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("general");
    const [fileList, setFileList] = useState([]);
    const [textContent, setTextContent] = useState("");

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/knowledge`);
            setData(res.data.data);
        } catch (error) {
            message.error("Lỗi lấy dữ liệu kiến thức");
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/api/knowledge/${id}`);
            message.success("Xóa thành công!");
            fetchData();
        } catch (error) {
            message.error("Lỗi xóa");
        }
    };

    const handleUpload = async () => {
        if (!title) {
            message.warning("Vui lòng nhập tiêu đề");
            return;
        }
        
        const formData = new FormData();
        formData.append("title", title);
        formData.append("category", category);
        
        if (fileList.length > 0) {
            formData.append("file", fileList[0].originFileObj);
        } else if (textContent) {
            formData.append("content", textContent);
        } else {
            message.warning("Vui lòng tải lên file hoặc nhập nội dung");
            return;
        }

        setUploading(true);
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/knowledge/upload`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            message.success("Thêm kiến thức thành công!");
            setIsModalVisible(false);
            setFileList([]);
            setTitle("");
            setTextContent("");
            fetchData();
        } catch (error) {
            message.error("Lỗi thêm kiến thức");
        }
        setUploading(false);
    };

    const columns = [
        { title: "ID", dataIndex: "id", key: "id", width: 60 },
        { title: "Tiêu đề", dataIndex: "title", key: "title" },
        { title: "Danh mục", dataIndex: "category", key: "category", render: (text) => <Tag color="blue">{text}</Tag> },
        { title: "Loại File", dataIndex: "file_type", key: "file_type", render: (text) => <Tag color="geekblue">{text}</Tag> },
        { 
            title: "Trạng thái", 
            dataIndex: "status", 
            key: "status",
            render: (status) => {
                let color = status === "completed" ? "green" : status === "error" ? "red" : "orange";
                return <Tag color={color}>{status.toUpperCase()}</Tag>;
            }
        },
        { 
            title: "Hành động", 
            key: "action", 
            render: (_, record) => (
                <Popconfirm title="Bạn có chắc chắn muốn xóa?" onConfirm={() => handleDelete(record.id)}>
                    <Button danger icon={<DeleteOutlined />} size="small">Xóa</Button>
                </Popconfirm>
            )
        }
    ];

    return (
        <div style={{ padding: 20, background: "#fff", borderRadius: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
                <h2>Quản Lý Kiến Thức Chatbot</h2>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
                    Thêm Kiến Thức
                </Button>
            </div>
            
            <Table 
                columns={columns} 
                dataSource={data} 
                rowKey="id" 
                loading={loading}
                pagination={{ pageSize: 8 }}
            />

            <Modal
                title="Thêm Kiến Thức Mới"
                open={isModalVisible}
                onOk={handleUpload}
                onCancel={() => setIsModalVisible(false)}
                confirmLoading={uploading}
            >
                <div style={{ marginBottom: 15 }}>
                    <label>Tiêu đề:</label>
                    <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Nhập tiêu đề" />
                </div>
                <div style={{ marginBottom: 15 }}>
                    <label>Danh mục:</label>
                    <Select value={category} onChange={setCategory} style={{ width: "100%" }}>
                        <Select.Option value="general">Chung</Select.Option>
                        <Select.Option value="product">Sản phẩm</Select.Option>
                        <Select.Option value="policy">Chính sách</Select.Option>
                    </Select>
                </div>
                <div style={{ marginBottom: 15 }}>
                    <label>Tải file (PDF, TXT, DOCX):</label>
                    <Upload
                        beforeUpload={() => false}
                        onChange={({ fileList }) => setFileList(fileList)}
                        fileList={fileList}
                        maxCount={1}
                    >
                        <Button icon={<UploadOutlined />}>Chọn File</Button>
                    </Upload>
                </div>
                <div style={{ marginBottom: 15 }}>
                    <label>Hoặc nhập nội dung text:</label>
                    <Input.TextArea 
                        rows={4} 
                        value={textContent}
                        onChange={e => setTextContent(e.target.value)}
                        placeholder="Nhập nội dung vào đây nếu không tải file..."
                        disabled={fileList.length > 0}
                    />
                </div>
            </Modal>
        </div>
    );
};

export default KnowledgeManager;
