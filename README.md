🛒 wibsite cửa hàng điện thoại chatbot AI
Dự án Hệ thống Website cửa hàng điện thoại tích hợp Chatbot AI hỗ trợ tư vấn khách hàng theo thời gian thực (Real-time Chat). Dự án được chia thành 3 service chính: Client (Frontend), Server (Backend API), và Socket (Real-time Server).

✨ Tính Năng Nổi Bật
🛍️ Mua sắm & Quản lý Sản phẩm: Hiển thị danh sách sản phẩm, chi tiết sản phẩm (Điện thoại, ).

🤖 Tích hợp AI Chatbot (RAG): Chatbot thông minh sử dụng mô hình học máy (@xenova/transformers) và Vector DB (ChromaDB) để trích xuất ngữ cảnh từ tài liệu (Chính sách bảo hành, Vận chuyển, Tư vấn sản phẩm) và tự động trả lời khách hàng.

💬 Chat Real-time: Kênh hỗ trợ trực tuyến giữa Khách hàng và Quản trị viên sử dụng Socket.IO.

👥 Quản lý Người dùng & Phân quyền: Hệ thống Roles (Admin, Staff, Customer/Client) với các quyền hạn khác nhau trên hệ thống.

📊 Báo cáo & Thống kê: Tính năng xuất dữ liệu báo cáo ra file Excel (.xlsx).

🛠️ Công Nghệ Sử Dụng
Frontend (Client)

React.js
Redux Toolkit (State Management)
React Router DOM
Socket.IO Client
UI/UX: Bootstrap, CSS thuần, Ant Design
Backend (Server)

Node.js & Express.js
Sequelize ORM (Quản lý CSDL MySQL)
ExcelJS (Xuất file Excel)
@xenova/transformers (Local Embedding cho Chatbot RAG)
Real-time Server (Socket)

Node.js & Socket.IO
Database & AI Services

MySQL (Lưu trữ thông tin người dùng, sản phẩm, lịch sử chat)
ChromaDB (Lưu trữ Vector Embeddings cho Chatbot)

📁 Cấu Trúc Dự Án
text
DoAn2/
├── Client/                 # Frontend React App (Chạy trên port 3000)
│   ├── public/             # CSS chung và assets
│   └── src/
│       ├── Layout/         # Components UI (BoxChat, Profile...)
│       ├── redux/          # Redux slices (Quản lý trạng thái user, products)
│       └── SocketProvider/ # Cấu hình Socket Context
├── Server/                 # Backend RESTful API (Chạy trên port 8000)
│   ├── src/
│   │   ├── config/         # Cấu hình kết nối DB, Sequelize
│   │   ├── migrations/     # File khởi tạo DB schema
│   │   ├── models/         # Models của Sequelize
│   │   ├── route/          # Định tuyến API (Excel, API Products...)
│   │   └── services/       # Xử lý Logic (EmbeddingService,...)
│   └── .sequelizerc        # Cấu hình đường dẫn cho Sequelize CLI
├── Socket/                 # Real-time Chat Server (Chạy trên port 4000)
│   └── index.js            # Khởi tạo Socket.IO và xử lý events
└── Database_Scripts/       # Nơi chứa các file SQL init
    └── chatbot_db_updates.sql
    
🚀 Hướng Dẫn Cài Đặt và Chạy Dự Án
1. Yêu cầu hệ thống
Node.js: (Khuyên dùng bản LTS)
MySQL: Máy chủ cơ sở dữ liệu MySQL đang chạy.

2. Thiết lập Database
Mở MySQL client của bạn (như MySQL Workbench, phpMyAdmin).
Tạo database mới cho dự án.
Chạy các script SQL có sẵn trong file chatbot_db_updates.sql để khởi tạo các bảng (knowledges, roles, chat_histories...) và nạp dữ liệu mẫu.
Cập nhật thông tin kết nối Database vào file Server/src/config/config.json.

3. Cài đặt Server Backend (Port 8000)
bash
cd Server
npm install
npm start

4. Cài đặt Server Socket (Port 4000)
bash
cd Socket
npm install
npm start

5. Cài đặt Frontend Client (Port 3000)
bash
cd Client
npm install
npm start

💡 Cấu Trúc Database Cốt Lõi (Chatbot & Users)
knowledges & knowledge_chunks: Lưu trữ tài liệu kiến thức (txt, pdf, docx) và phân mảnh (chunk) văn bản phục vụ cho Embedding.
chat_histories: Lưu trữ phiên hỏi đáp và thời gian phản hồi của chatbot AI.
roles & user_roles: Đảm nhiệm việc phân quyền người dùng. Hệ thống hỗ trợ Admin, Staff và Customer.
Message: Lưu trữ tin nhắn Real-time.

👨‍💻 Tác giả / Nhóm Đồ án
Phát triển bởi Nguyễn Roliel (224499) phục vụ Đồ án 2 và học thuật mở về hệ thống thương mại điện tử chuyên cung cấp thiết bị công nghệ (điện thoại, ). Vui lòng tham khảo mã nguồn các thành phần cốt lõi như hệ thống Trợ lý ảo AI Chatbot (RAG với ChromaDB & Groq), tính năng Live Chat Real-time (Socket.IO) và quản lý trạng thái giỏ hàng (Redux Toolkit) ở lịch sử Commit chi tiết.
