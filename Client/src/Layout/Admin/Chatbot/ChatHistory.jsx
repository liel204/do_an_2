import React, { useState, useEffect } from "react";
import { Table, Tag, message } from "antd";
import axios from "axios";

const ChatHistory = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/chatbot/history`);
            setData(res.data.data);
        } catch (error) {
            message.error("Lỗi lấy dữ liệu lịch sử");
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const columns = [
        { title: "ID", dataIndex: "id", key: "id", width: 60 },
        { title: "Session", dataIndex: "session_id", key: "session_id", width: 120 },
        { title: "Câu hỏi", dataIndex: "user_question", key: "user_question" },
        { 
            title: "Câu trả lời", 
            dataIndex: "bot_answer", 
            key: "bot_answer",
            render: (text) => <div style={{ maxHeight: 100, overflow: 'auto' }}>{text}</div>
        },
        { 
            title: "Nguồn tham khảo", 
            dataIndex: "sources", 
            key: "sources",
            render: (sources) => {
                if(!sources) return "-";
                // sources có thể là chuỗi json do sequelize parse.
                let arr = []
                try {
                    arr = typeof sources === 'string' ? JSON.parse(sources) : sources;
                }catch(e){}
                return arr.map((item, idx) => <Tag color="blue" key={idx}>{item}</Tag>);
            }
        },
        { title: "Thời gian (ms)", dataIndex: "response_time", key: "response_time", width: 120, render: (t) => `${t} ms` }
    ];

    return (
        <div style={{ padding: 20, background: "#fff", borderRadius: 8 }}>
            <h2>Lịch Sử Chat AI</h2>
            <Table 
                columns={columns} 
                dataSource={data} 
                rowKey="id" 
                loading={loading}
                pagination={{ pageSize: 8 }}
            />
        </div>
    );
};

export default ChatHistory;
