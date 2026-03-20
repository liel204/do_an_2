-- Bảng lưu tài liệu kiến thức
CREATE TABLE knowledges (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  content LONGTEXT NOT NULL,
  category VARCHAR(255) DEFAULT 'general',
  file_type VARCHAR(50),          -- 'pdf', 'txt', 'docx', 'text'
  file_name VARCHAR(255),
  status ENUM('processing','completed','error') DEFAULT 'processing',
  chunk_count INT DEFAULT 0,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL
) ENGINE=InnoDB;

-- Bảng lưu các chunk đã embedding
CREATE TABLE knowledge_chunks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  knowledge_id INT NOT NULL,
  chunk_text TEXT NOT NULL,
  chunk_index INT NOT NULL,        -- Thứ tự chunk
  vector_id VARCHAR(255) NOT NULL, -- ID trong ChromaDB
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL,
  CONSTRAINT fk_chunks_knowledge
    FOREIGN KEY (knowledge_id) REFERENCES knowledges(id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- Bảng lưu lịch sử chat
CREATE TABLE chat_histories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  session_id VARCHAR(255) NOT NULL, -- Phiên chat
  user_question TEXT NOT NULL,
  bot_answer TEXT NOT NULL,
  sources JSON,                     -- Nguồn tài liệu tham khảo
  response_time INT,                -- Thời gian xử lý (ms)
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL
) ENGINE=InnoDB;

-- Bảng cấu hình chatbot
CREATE TABLE chatbot_configs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  config_key VARCHAR(255) NOT NULL UNIQUE,
  config_value TEXT NOT NULL,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL
) ENGINE=InnoDB;

-- Bảng roles (vai trò)
CREATE TABLE roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  role_name VARCHAR(255) NOT NULL UNIQUE,  -- Tên vai trò (Admin, Staff, Customer)
  description TEXT,                         -- Mô tả vai trò
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL
) ENGINE=InnoDB;

-- Bảng user_roles (quan hệ vai trò người dùng)
CREATE TABLE user_roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,                      -- ID người dùng
  role_id INT NOT NULL,                      -- ID vai trò
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL,
  CONSTRAINT fk_user_roles_user
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_user_roles_role
    FOREIGN KEY (role_id) REFERENCES roles(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  UNIQUE KEY unique_user_role (user_id, role_id)  -- Một user chỉ có một role một lần
) ENGINE=InnoDB;

-- Dữ liệu mẫu cho bảng knowledges
INSERT INTO knowledges (title, content, category, file_type, file_name, status, chunk_count, createdAt, updatedAt) VALUES
('Chính Sách Vận Chuyển và Giao Hàng', '# Chính Sách Vận Chuyển và Giao Hàng\n\n## Phí Vận Chuyển\n- **Miễn phí vận chuyển**: Đơn hàng từ 500.000 VNĐ trở lên được miễn phí vận chuyển toàn quốc.\n- **Phí vận chuyển tiêu chuẩn**: 30.000 VNĐ cho đơn hàng dưới 500.000 VNĐ.\n- **Vận chuyển nhanh**: 50.000 VNĐ, giao trong 2-4 giờ tại khu vực nội thành.\n- **Vận chuyển hỏa tốc**: 100.000 VNĐ, giao trong 1 giờ tại khu vực nội thành.\n\n## Thời Gian Giao Hàng\n- **Nội thành**: 1-2 ngày làm việc.\n- **Liên tỉnh**: 2-5 ngày làm việc.\n- **Vùng sâu vùng xa**: 3-7 ngày làm việc.\n\n## Phương Thức Thanh Toán\n- Thanh toán khi nhận hàng (COD).\n- Chuyển khoản ngân hàng.\n- Ví điện tử (Momo, ZaloPay, ViettelPay).', 'shipping', 'text', 'shipping_policy.txt', 'completed', 1, NOW(), NOW()),

('Chính Sách Đổi Trả Hàng Hóa', '# Chính Sách Đổi Trả Hàng Hóa\n\n## Điều Kiện Đổi Trả\n- Sản phẩm còn nguyên vẹn, chưa sử dụng, còn tem mác.\n- Thời hạn đổi trả: 7 ngày kể từ ngày nhận hàng.\n- Hóa đơn mua hàng còn nguyên.\n\n## Trường Hợp Không Đổi Trả\n- Sản phẩm đã qua sử dụng.\n- Sản phẩm bị hư hỏng do người dùng.\n- Quá thời hạn 7 ngày.\n\n## Quy Trình Đổi Trả\n1. Liên hệ bộ phận chăm sóc khách hàng.\n2. Gửi sản phẩm về kho.\n3. Nhận sản phẩm mới hoặc hoàn tiền trong 3-5 ngày làm việc.', 'return', 'text', 'return_policy.txt', 'completed', 1, NOW(), NOW()),

('Tư Vấn Mặt Hàng', '# Tư Vấn Mặt Hàng\n\n## Danh Mục Sản Phẩm\nChúng tôi cung cấp các loại sản phẩm công nghệ chất lượng cao:\n- Máy tính xách tay\n- Điện thoại thông minh\n- Máy tính bảng\n- Phụ kiện công nghệ\n- Thiết bị gia dụng thông minh\n\n## Tư Vấn Theo Nhu Cầu\n- **Cho công việc**: Máy tính xách tay với RAM 16GB+, SSD 512GB+.\n- **Cho học tập**: Máy tính bảng với màn hình lớn, thời lượng pin dài.\n- **Cho giải trí**: Điện thoại flagship với camera chất lượng cao.', 'product_advice', 'text', 'product_advice.txt', 'completed', 1, NOW(), NOW()),

('Tư Vấn Loại Máy', '# Tư Vấn Loại Máy\n\n## Máy Tính Xách Tay\n- **Gaming**: RTX 4060+, RAM 16GB, màn hình 144Hz.\n- **Văn phòng**: Intel Core i5, RAM 8GB, SSD 256GB.\n- **Ultrabook**: Nhẹ dưới 1.5kg, thời lượng pin 10+ giờ.\n\n## Điện Thoại Thông Minh\n- **Flagship**: Snapdragon 8 Gen 3, camera 200MP, sạc nhanh 100W.\n- **Mid-range**: Snapdragon 7 Gen 2, camera 108MP, pin 5000mAh.\n- **Budget**: Snapdragon 6 Gen 1, camera 50MP, giá dưới 5 triệu.\n\n## Máy Tính Bảng\n- **Android**: Google Pixel Tablet, hỗ trợ stylus.\n- **iPad**: iPad Pro với M2 chip, màn hình Liquid Retina.\n- **Windows**: Surface Pro, có thể thay thế laptop.\n\n## Lưu Ý Khi Chọn Mua\n- Xác định nhu cầu sử dụng.\n- So sánh cấu hình và giá cả.\n- Kiểm tra chính sách bảo hành.\n- Đọc đánh giá từ người dùng.', 'device_types', 'text', 'device_types.txt', 'completed', 1, NOW(), NOW());

-- Dữ liệu mẫu cho bảng knowledge_chunks (giả sử vector_id được tạo bởi ChromaDB)
-- Lưu ý: Trong thực tế, vector_id sẽ được tạo khi embedding
INSERT INTO knowledge_chunks (knowledge_id, chunk_text, chunk_index, vector_id, createdAt, updatedAt) VALUES
(1, '# Chính Sách Vận Chuyển và Giao Hàng\n\n## Phí Vận Chuyển\n- **Miễn phí vận chuyển**: Đơn hàng từ 500.000 VNĐ trở lên được miễn phí vận chuyển toàn quốc.\n- **Phí vận chuyển tiêu chuẩn**: 30.000 VNĐ cho đơn hàng dưới 500.000 VNĐ.\n- **Vận chuyển nhanh**: 50.000 VNĐ, giao trong 2-4 giờ tại khu vực nội thành.\n- **Vận chuyển hỏa tốc**: 100.000 VNĐ, giao trong 1 giờ tại khu vực nội thành.\n\n## Thời Gian Giao Hàng\n- **Nội thành**: 1-2 ngày làm việc.\n- **Liên tỉnh**: 2-5 ngày làm việc.\n- **Vùng sâu vùng xa**: 3-7 ngày làm việc.\n\n## Phương Thức Thanh Toán\n- Thanh toán khi nhận hàng (COD).\n- Chuyển khoản ngân hàng.\n- Ví điện tử (Momo, ZaloPay, ViettelPay).', 0, 'vector_1', NOW(), NOW()),

(2, '# Chính Sách Đổi Trả Hàng Hóa\n\n## Điều Kiện Đổi Trả\n- Sản phẩm còn nguyên vẹn, chưa sử dụng, còn tem mác.\n- Thời hạn đổi trả: 7 ngày kể từ ngày nhận hàng.\n- Hóa đơn mua hàng còn nguyên.\n\n## Trường Hợp Không Đổi Trả\n- Sản phẩm đã qua sử dụng.\n- Sản phẩm bị hư hỏng do người dùng.\n- Quá thời hạn 7 ngày.\n\n## Quy Trình Đổi Trả\n1. Liên hệ bộ phận chăm sóc khách hàng.\n2. Gửi sản phẩm về kho.\n3. Nhận sản phẩm mới hoặc hoàn tiền trong 3-5 ngày làm việc.', 0, 'vector_2', NOW(), NOW()),

(3, '# Tư Vấn Mặt Hàng\n\n## Danh Mục Sản Phẩm\nChúng tôi cung cấp các loại sản phẩm công nghệ chất lượng cao:\n- Máy tính xách tay\n- Điện thoại thông minh\n- Máy tính bảng\n- Phụ kiện công nghệ\n- Thiết bị gia dụng thông minh\n\n## Tư Vấn Theo Nhu Cầu\n- **Cho công việc**: Máy tính xách tay với RAM 16GB+, SSD 512GB+.\n- **Cho học tập**: Máy tính bảng với màn hình lớn, thời lượng pin dài.\n- **Cho giải trí**: Điện thoại flagship với camera chất lượng cao.', 0, 'vector_3', NOW(), NOW()),

(4, '# Tư Vấn Loại Máy\n\n## Máy Tính Xách Tay\n- **Gaming**: RTX 4060+, RAM 16GB, màn hình 144Hz.\n- **Văn phòng**: Intel Core i5, RAM 8GB, SSD 256GB.\n- **Ultrabook**: Nhẹ dưới 1.5kg, thời lượng pin 10+ giờ.\n\n## Điện Thoại Thông Minh\n- **Flagship**: Snapdragon 8 Gen 3, camera 200MP, sạc nhanh 100W.\n- **Mid-range**: Snapdragon 7 Gen 2, camera 108MP, pin 5000mAh.\n- **Budget**: Snapdragon 6 Gen 1, camera 50MP, giá dưới 5 triệu.\n\n## Máy Tính Bảng\n- **Android**: Google Pixel Tablet, hỗ trợ stylus.\n- **iPad**: iPad Pro với M2 chip, màn hình Liquid Retina.\n- **Windows**: Surface Pro, có thể thay thế laptop.\n\n## Lưu Ý Khi Chọn Mua\n- Xác định nhu cầu sử dụng.\n- So sánh cấu hình và giá cả.\n- Kiểm tra chính sách bảo hành.\n- Đọc đánh giá từ người dùng.', 0, 'vector_4', NOW(), NOW());

-- Dữ liệu mẫu cho bảng chatbot_configs
INSERT INTO chatbot_configs (config_key, config_value, createdAt, updatedAt) VALUES
('model_name', 'llama-3.1-8b-instant', NOW(), NOW()),
('temperature', '0.7', NOW(), NOW()),
('max_tokens', '1024', NOW(), NOW()),
('search_threshold', '0.5', NOW(), NOW());

-- Dữ liệu mẫu cho bảng roles
INSERT INTO roles (role_name, description, createdAt, updatedAt) VALUES
('Admin', 'Quản trị viên hệ thống, có toàn quyền truy cập', NOW(), NOW()),
('Staff', 'Nhân viên, có quyền quản lý sản phẩm và đơn hàng', NOW(), NOW()),
('Customer', 'Khách hàng, có quyền mua hàng và xem lịch sử', NOW(), NOW());
