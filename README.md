# BÁO CÁO ĐỒ ÁN CƠ SỞ 2

## Thông tin sinh viên
- **Họ và tên:** Nguyễn Rô Liêl
- **MSSV:** 224499
- **Lớp:** DH22KPM01

---

## Mục lục
1. [Giới thiệu dự án](#1-giới-thiệu-dự-án)
2. [Tài khoản đăng nhập dùng thử](#2-tài-khoản-đăng-nhập-dùng-thử)
3. [Công nghệ sử dụng](#3-công-nghệ-sử-dụng)
4. [Các chức năng chính](#4-các-chức-năng-chính)
5. [Cấu trúc hệ thống và Thư mục](#5-cấu-trúc-hệ-thống-và-thư-mục)
6. [Hướng dẫn cài đặt và chạy dự án](#6-hướng-dẫn-cài-đặt-và-chạy-dự-án)
7. [API Endpoints cơ bản](#7-api-endpoints-cơ-bản)
8. [Kiến trúc Mô hình Trí tuệ Nhân tạo (Chatbot RAG)](#8-kiến-trúc-mô-hình-trí-tuệ-nhân-tạo-chatbot-rag)

---

## 1. Giới thiệu dự án
Đây là hệ thống **Website Thương Mại Điện Tử (E-Commerce)** được tích hợp **Chatbot AI** hỗ trợ người dùng và hệ thống **Chat trực tuyến**. Dự án cung cấp cho người dùng các tính năng mua sắm, quản lý giỏ hàng, đặt hàng, thanh toán, cũng như phân hệ quản trị cửa hàng (quản lý sản phẩm, đơn hàng, thống kê) dành cho Admin. Điểm nổi bật là Chatbot AI sử dụng công nghệ LLM và kiến trúc RAG (Retrieval-Augmented Generation) để tự động hóa việc chăm sóc khách hàng và giải đáp thông tin sản phẩm.

## 2. Tài khoản đăng nhập dùng thử
- **Email:** `nguyenliel29@gmail.com`
- **Mật khẩu:** `admin123123`
- **Vai trò:** Admin / User (Dùng tài khoản này để kiểm tra toàn bộ các tính năng nội bộ và quản trị của hệ thống).

## 3. Công nghệ sử dụng
Dự án được xây dựng theo mô hình kiến trúc Client-Server (Fullstack) với các công nghệ hiện đại:

### 3.1. Frontend (Client-side)
- **Framework:** React.js (v18)
- **State Management:** Redux Toolkit & React-Redux
- **Routing:** React Router DOM (v6)
- **UI & Styling:** Material-UI (MUI), Ant Design, Bootstrap, SASS, Emotion
- **Trò chuyện trực tuyến (Real-time):** Socket.io-client
- **Giao diện Chatbot AI:** React Chatbot Kit
- **Thư viện hỗ trợ:** React-Slick (Carousel), Recharts (Vẽ biểu đồ thống kê), React Markdown (Hiển thị văn bản AI).

### 3.2. Backend (Server-side)
- **Môi trường & Framework:** Node.js, Express.js
- **Cơ sở dữ liệu:** MySQL (Giao tiếp thông qua ORM Sequelize)
- **AI & Vector Database (RAG):** Groq SDK, Llama-3.1-8b-instant, ChromaDB
- **Xử lý Thời gian thực (Real-time):** Socket.io
- **Xác thực & Bảo mật:** JSON Web Token (JWT), Bcrypt / Bcryptjs
- **Lưu trữ Tệp / Hình ảnh:** Cloudinary (tích hợp với Multer)
- **Gửi Email tự động:** Nodemailer
- **Xử lý tệp tin tài liệu (Trích xuất text cho AI):** PDF-parse (PDF), Mammoth (Word/Docx), ExcelJS

---

## 4. Các chức năng chính
*(Các chức năng nghiệp vụ E-commerce cơ bản bao gồm mua hàng, đặt hàng, kiểm duyệt đơn, đăng nhập, phân quyền, quản trị sản phẩm, thống kê doanh thu, v.v.)*

---

## 5. Cấu trúc hệ thống và Thư mục
```text
Đồ án 2/
├── backend/                  
│   ├── src/                  
│   │   ├── controllers/      # (ChatbotController, KnowledgeController...)
│   │   ├── services/         # Nơi chứa logic AI (ChatbotService, KnowledgeService...)
│   │   └── ...
│   └── my_chroma_db/         # Thư mục lưu Vector Database nội bộ (Embeddings)
└── frontend/                 
    └── src/                  
        ├── Layout/           
        └── SocketProvider/   # Kết nối Socket.io với Node server
```

---

## 6. Hướng dẫn cài đặt và chạy dự án

### Bước 1: Khởi chạy Database và Vector DB
- Server sử dụng MySQL cho dữ liệu quan hệ (Người dùng, Đơn hàng, Sản phẩm...).
- Vectơ dữ liệu RAG được thiết lập tự động lưu tại Folder nội bộ `my_chroma_db` (ChromaDB Local).

### Bước 2: Chạy Backend
```bash
cd backend
npm install
npm start
# Port mặc định thường là 8000
```
### Bước 3: Chạy Frontend
```bash
cd frontend
npm install
npm start
# Frontend chạy tại http://localhost:3000
```

---

## 7. API Endpoints cơ bản
- `/api/userRouter`: Quản lý Auth, Profile.
- `/api/ProductRouter`: Các API lấy danh sách, chi tiết, thêm, sửa, xóa sản phẩm.
- `/api/OderRouter`: Quản lý quy trình đặt hàng.
- `/api/chatbot/ask`: API gửi câu hỏi cho trợ lý LLM.
- `/api/knowledge/upload`: Kênh nạp tài liệu cho AI học (Upload knowledge).

---

## 8. Kiến trúc Mô hình Trí tuệ Nhân tạo (Chatbot RAG) - Dành cho chấm điểm AI

Hệ thống Chatbot không sử dụng những câu lệnh if/else truyền thống mà được xây dựng trên một quy trình **Trí tuệ Nhân tạo hiện đại** sử dụng **Mô hình Ngôn ngữ Lớn (LLM)** kết hợp với kiến trúc **RAG (Retrieval-Augmented Generation)** nhằm giải quyết vấn đề Hallucination (Ảo giác AI) và giúp Chatbot tư vấn chính xác dựa trên dữ liệu cửa hàng.

### 8.1. Các thành phần AI cốt lõi
1. **Large Language Model (LLM):** Sử dụng hệ sinh thái của **Groq (Groq SDK)** với Model Lõi là **`llama-3.1-8b-instant`**. Mô hình này cung cấp tốc độ phản hồi tính bằng mili-giây và khả năng hiểu ngôn ngữ tự nhiên (Tiếng Việt) cực tốt.
2. **Vector Database:** Sử dụng **ChromaDB**. Đây là một cơ sở dữ liệu véc-tơ cục bộ, lưu trữ các chuỗi "Embeddings" (biểu diễn dạng số của văn bản) giúp thuật toán dễ dàng tính toán khoảng cách vector và tìm kiếm câu trả lời nhanh nhất.
3. **Data Extractors:** Thư viện **PDF-parse** và **Mammoth**, có khả năng trích xuất nội dung từ các file `PDF`, `Docx`, và `TXT` được Admin nạp vào hệ thống để AI "học".

### 8.2. Quy trình "Nạp Học liệu" (Knowledge Ingestion Workflow)
Để AI biết hệ thống đang bán gì, quy định đổi trả ra sao, quá trình Data Ingestion diễn ra qua các bước (Xử lý tại file `KnowledgeService.js`):
- **Bước 1 (Parse Data):** Người Quản trị (Admin) nạp tài liệu (ví dụ: Chính sách cửa hàng.pdf). Hệ thống dùng `pdf-parse` để bóc tách thô tài liệu thành đoạn văn bản dài (Raw Text).
- **Bước 2 (Text Chunking):** Tránh việc nhồi nhét quá giới hạn của LLM, văn bản được "băm" (chunk) ra thành các đoạn ngắn. Thuật toán Chunking tiến hành đếm ký tự (`chunkSize = 500`), với độ chồng lấp ranh giới phần trước và sau `overlap = 100` để không làm đứt gãy mạch ngữ nghĩa. Ở những điểm giao cắt, thuật toán có cơ chế ưu tiên ngừng tại dấu chấm kết câu (end of sentence).
- **Bước 3 (Embedding Generation):** Từng đoạn Chunk này được gửi đến API để chuyển từ "Văn tự con người" thành "Biểu diễn số học của máy" (Embeddings/Vectors tuyến tính).
- **Bước 4 (Vector Store):** Các Vectors này được đính kèm theo khóa phân cực (UUID) và Metadata (Tên tài liệu gốc, danh mục) sau đó lưu cứng vào **ChromaDB**.

### 8.3. Quy trình Trả lời Truy vấn (RAG Query Workflow)
Quá trình này bộc lộ rõ sức mạnh của RAG (Xử lý tại `ChatbotService.js`):
- **Bước 1 (Query Embedding):** Khách hàng đặt câu hỏi: *"Chính sách bảo hành như thế nào?"*. Câu hỏi lập tức được biến đổi thành một Vector Query theo cùng hệ tham chiếu với cơ sở dữ liệu ở bước nạp liệu.
- **Bước 2 (Semantic Search):** Hệ thống tìm kiếm bên trong không gian ChromaDB để bắt lấy **Top 5** đoạn text sát nghĩa nhất (`docs = searchResults.documents[0]`). Việc tìm kiếm diễn ra thông qua thuật toán đo khoảng cách tương đồng tuyến tính của 2 Vector (Distance Calculation). 
- **Bước 3 (Prompt Engineering):** Server Backend tự xây dựng một Prompt Kịch bản ngầm: *"Bạn là trợ lý ảo AI... Hãy trả lời dựa trên KIẾN THỨC CUNG CẤP BÊN DƯỚI..."*. Đồng thời, hệ thống nhúng chính xác 5 đoạn tài liệu văn bản vừa bắt được ở bước trên vào để "Vạch mặt chỉ tên" kiến thức cho đồ thị thông minh.
- **Bước 4 (LLM Completion):** Lời nhắc cuối cùng được đẩy lên hệ thống Compute của **Groq (Chạy Model LLaMA 3.1)** qua API. AI tổng hợp tài liệu được dán ở bước 3, hiểu câu hỏi của user và tiến hành suy diễn sinh ra (Generative) câu trả lời tiếng Việt chính xác, thân thiện, không bị "Ảo giác" đoạch ra ngoài phạm vi thông tin cửa hàng.
- **Bước 5 (Database Logging & Feedback):** Câu hỏi, Câu trả lời, Nguồn tài liệu gốc (Sources references), và Thời gian phản hồi đều được truy vết và lưu vào DB `ChatHistories`. Admin dễ dàng thống kê và tinh chỉnh cấu trúc trả lời trong tương lai.
