import React, { useState, useEffect, useRef } from 'react';
import './chatbot.css';
import { FaComments, FaTimes, FaRedo, FaPaperPlane } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [sessionId] = useState(() => 'sess_' + Math.random().toString(36).substr(2, 9));
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setMessages([
                { sender: 'bot', text: 'Chào bạn! Tôi là trợ lý AI ảo. Tôi có thể giúp gì cho bạn hôm nay?' }
            ]);
        }
    }, [isOpen]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;
        
        const userMsg = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        try {
            const res = await axios.post('https://do-an-2-tffk.onrender.com/api/chatbot/ask', {
                question: userMsg.text,
                sessionId: sessionId
            });
            const answer = res.data?.data?.answer || "Lỗi phản hồi.";
            setMessages(prev => [...prev, { sender: 'bot', text: answer }]);
        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, { sender: 'bot', text: 'Xin lỗi, hệ thống AI đang bận. Vui lòng thử lại sau!' }]);
        }
        setIsLoading(false);
    };

    const handleClear = () => {
        setMessages([{ sender: 'bot', text: 'Cuộc trò chuyện đã được làm mới.' }]);
    };

    return (
        <div className={`chatbot-widget-container ${isOpen ? 'open' : ''}`}>
             {!isOpen && (
                <button className="chat-btn-toggle" onClick={() => setIsOpen(true)}>
                    <FaComments size={24} color="#fff" />
                </button>
             )}
            
            {isOpen && (
                <div className="chat-window shadow-lg">
                    <div className="chat-header">
                        <div className="chat-title">
                            <span className="online-dot"></span>
                            AI Assistant
                        </div>
                        <div className="chat-actions">
                            <button onClick={handleClear} title="Clear Chat"><FaRedo /></button>
                            <button onClick={() => setIsOpen(false)} title="Đóng"><FaTimes /></button>
                        </div>
                    </div>
                    
                    <div className="chat-body">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`chat-bubble-wrapper ${msg.sender}`}>
                                <div className={`chat-bubble ${msg.sender}`}>
                                    {msg.sender === 'bot' ? (
                                        <ReactMarkdown>{msg.text}</ReactMarkdown>
                                    ) : (
                                        msg.text
                                    )}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="chat-bubble-wrapper bot">
                                <div className="chat-bubble bot loader-bubble">
                                    <span className="dot"></span>
                                    <span className="dot"></span>
                                    <span className="dot"></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="chat-footer">
                        <input 
                            type="text" 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Nhập câu hỏi..."
                            disabled={isLoading}
                        />
                        <button onClick={handleSend} disabled={isLoading || !input.trim()}>
                            <FaPaperPlane />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatWidget;
