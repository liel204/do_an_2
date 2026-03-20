# Cơ Sở Dữ Liệu NguyenRoliel_224499_DoAn2

## 1. Bảng users
| Stt | Tên thuộc tính | Kiểu dữ liệu | Not Null | Khóa | Reference | Mô tả |
|-----|---------------|--------------|----------|------|-----------|--------|
| 1 | id | INT | YES | PK | - | ID tự tăng của user |
| 2 | User_Name | VARCHAR(255) | YES | - | - | Tên người dùng |
| 3 | User_Email | VARCHAR(255) | YES | UK | - | Email người dùng (unique) |
| 4 | User_Password | VARCHAR(255) | YES | - | - | Mật khẩu đã hash |
| 5 | User_Role | VARCHAR(255) | YES | - | - | Vai trò (Admin/Staff/Customer) |
| 6 | createdAt | DATETIME | YES | - | - | Thời gian tạo |
| 7 | updatedAt | DATETIME | YES | - | - | Thời gian cập nhật |

## 2. Bảng roles
| Stt | Tên thuộc tính | Kiểu dữ liệu | Not Null | Khóa | Reference | Mô tả |
|-----|---------------|--------------|----------|------|-----------|--------|
| 1 | id | INT | YES | PK | - | ID tự tăng của vai trò |
| 2 | role_name | VARCHAR(255) | YES | UK | - | Tên vai trò (unique) |
| 3 | description | TEXT | NO | - | - | Mô tả vai trò |
| 4 | createdAt | DATETIME | YES | - | - | Thời gian tạo |
| 5 | updatedAt | DATETIME | YES | - | - | Thời gian cập nhật |

## 3. Bảng user_roles
| Stt | Tên thuộc tính | Kiểu dữ liệu | Not Null | Khóa | Reference | Mô tả |
|-----|---------------|--------------|----------|------|-----------|--------|
| 1 | id | INT | YES | PK | - | ID tự tăng của quan hệ |
| 2 | user_id | INT | YES | FK | users(id) | ID người dùng |
| 3 | role_id | INT | YES | FK | roles(id) | ID vai trò |
| 4 | createdAt | DATETIME | YES | - | - | Thời gian tạo |
| 5 | updatedAt | DATETIME | YES | - | - | Thời gian cập nhật |

## 4. Bảng categories
| Stt | Tên thuộc tính | Kiểu dữ liệu | Not Null | Khóa | Reference | Mô tả |
|-----|---------------|--------------|----------|------|-----------|--------|
| 1 | id | INT | YES | PK | - | ID tự tăng của danh mục |
| 2 | Category_Name | VARCHAR(255) | YES | UK | - | Tên danh mục (unique) |
| 3 | createdAt | DATETIME | YES | - | - | Thời gian tạo |
| 4 | updatedAt | DATETIME | YES | - | - | Thời gian cập nhật |

## 5. Bảng products
| Stt | Tên thuộc tính | Kiểu dữ liệu | Not Null | Khóa | Reference | Mô tả |
|-----|---------------|--------------|----------|------|-----------|--------|
| 1 | id | INT | YES | PK | - | ID tự tăng của sản phẩm |
| 2 | Product_Description | VARCHAR(255) | YES | - | - | Mô tả sản phẩm |
| 3 | Product_Name | VARCHAR(255) | YES | UK | - | Tên sản phẩm (unique) |
| 4 | Product_Quantity | INT | YES | - | - | Số lượng tồn kho |
| 5 | CategoryID | INT | YES | FK | categories(id) | ID danh mục |
| 6 | createdAt | DATETIME | YES | - | - | Thời gian tạo |
| 7 | updatedAt | DATETIME | YES | - | - | Thời gian cập nhật |

## 6. Bảng options
| Stt | Tên thuộc tính | Kiểu dữ liệu | Not Null | Khóa | Reference | Mô tả |
|-----|---------------|--------------|----------|------|-----------|--------|
| 1 | id | INT | YES | PK | - | ID tự tăng của tùy chọn |
| 2 | productID | INT | YES | FK | products(id) | ID sản phẩm |
| 3 | memory | VARCHAR(255) | YES | - | - | Dung lượng bộ nhớ |
| 4 | option_price | VARCHAR(255) | YES | - | - | Giá tùy chọn |
| 5 | createdAt | DATETIME | YES | - | - | Thời gian tạo |
| 6 | updatedAt | DATETIME | YES | - | - | Thời gian cập nhật |

## 7. Bảng optioncolors
| Stt | Tên thuộc tính | Kiểu dữ liệu | Not Null | Khóa | Reference | Mô tả |
|-----|---------------|--------------|----------|------|-----------|--------|
| 1 | id | INT | YES | PK | - | ID tự tăng của màu sắc |
| 2 | productID | INT | YES | FK | products(id) | ID sản phẩm |
| 3 | color | VARCHAR(255) | YES | - | - | Tên màu |
| 4 | image | VARCHAR(255) | YES | - | - | URL hình ảnh |
| 5 | createdAt | DATETIME | YES | - | - | Thời gian tạo |
| 6 | updatedAt | DATETIME | YES | - | - | Thời gian cập nhật |

## 8. Bảng cartitems
| Stt | Tên thuộc tính | Kiểu dữ liệu | Not Null | Khóa | Reference | Mô tả |
|-----|---------------|--------------|----------|------|-----------|--------|
| 1 | id | INT | YES | PK | - | ID tự tăng của item trong giỏ |
| 2 | CartItem_Quantity | INT | YES | - | - | Số lượng |
| 3 | ProductID | INT | YES | FK | products(id) | ID sản phẩm |
| 4 | UserID | INT | YES | FK | users(id) | ID người dùng |
| 5 | Status | VARCHAR(255) | YES | - | - | Trạng thái giỏ hàng |
| 6 | TotalPriceItem | FLOAT | YES | - | - | Tổng giá item |
| 7 | MemoryID | INT | YES | FK | options(id) | ID tùy chọn bộ nhớ |
| 8 | ColorID | INT | YES | FK | optioncolors(id) | ID tùy chọn màu |
| 9 | createdAt | DATETIME | YES | - | - | Thời gian tạo |
| 10 | updatedAt | DATETIME | YES | - | - | Thời gian cập nhật |

## 9. Bảng payments
| Stt | Tên thuộc tính | Kiểu dữ liệu | Not Null | Khóa | Reference | Mô tả |
|-----|---------------|--------------|----------|------|-----------|--------|
| 1 | id | VARCHAR(255) | YES | PK | - | ID thanh toán (app_trans_id) |
| 2 | Payment_Method | VARCHAR(255) | YES | - | - | Phương thức thanh toán |
| 3 | Oder_TotalPrice | FLOAT | YES | - | - | Tổng giá đơn hàng |
| 4 | UserID | INT | YES | FK | users(id) | ID người dùng |
| 5 | createdAt | DATETIME | YES | - | - | Thời gian tạo |
| 6 | updatedAt | DATETIME | YES | - | - | Thời gian cập nhật |

## 10. Bảng oders
| Stt | Tên thuộc tính | Kiểu dữ liệu | Not Null | Khóa | Reference | Mô tả |
|-----|---------------|--------------|----------|------|-----------|--------|
| 1 | id | INT | YES | PK | - | ID tự tăng của đơn hàng |
| 2 | Oder_TotalPrice | FLOAT | YES | - | - | Tổng giá đơn hàng |
| 3 | Oder_Status | VARCHAR(255) | YES | - | - | Trạng thái đơn hàng |
| 4 | Oder_AddressShipping | VARCHAR(255) | YES | - | - | Địa chỉ giao hàng |
| 5 | ShippingID | INT | YES | - | - | ID shipping |
| 6 | CartItemID | INT | YES | FK | cartitems(id) | ID item trong giỏ |
| 7 | Payment | VARCHAR(255) | YES | - | - | Thông tin thanh toán |
| 8 | UserID | INT | YES | FK | users(id) | ID người dùng |
| 9 | FullName | VARCHAR(255) | YES | - | - | Tên đầy đủ |
| 10 | Phone | VARCHAR(255) | YES | - | - | Số điện thoại |
| 11 | app_trans_id | VARCHAR(255) | YES | FK | payments(id) | ID giao dịch ZaloPay |
| 12 | Note | VARCHAR(255) | YES | - | - | Ghi chú |
| 13 | createdAt | DATETIME | YES | - | - | Thời gian tạo |
| 14 | updatedAt | DATETIME | YES | - | - | Thời gian cập nhật |

## 11. Bảng comants
| Stt | Tên thuộc tính | Kiểu dữ liệu | Not Null | Khóa | Reference | Mô tả |
|-----|---------------|--------------|----------|------|-----------|--------|
| 1 | id | INT | YES | PK | - | ID tự tăng của bình luận |
| 2 | Value | VARCHAR(255) | YES | - | - | Nội dung bình luận |
| 3 | UserID | INT | YES | FK | users(id) | ID người dùng |
| 4 | ProductID | INT | YES | FK | products(id) | ID sản phẩm |
| 5 | createdAt | DATETIME | YES | - | - | Thời gian tạo |
| 6 | updatedAt | DATETIME | YES | - | - | Thời gian cập nhật |

## 12. Bảng messages
| Stt | Tên thuộc tính | Kiểu dữ liệu | Not Null | Khóa | Reference | Mô tả |
|-----|---------------|--------------|----------|------|-----------|--------|
| 1 | id | INT | YES | PK | - | ID tự tăng của tin nhắn |
| 2 | conversationId | INT | YES | - | - | ID cuộc trò chuyện |
| 3 | senderID | INT | YES | - | - | ID người gửi |
| 4 | text | VARCHAR(255) | YES | - | - | Nội dung tin nhắn |
| 5 | createdAt | DATETIME | YES | - | - | Thời gian tạo |
| 6 | updatedAt | DATETIME | YES | - | - | Thời gian cập nhật |

## 13. Bảng knowledges
| Stt | Tên thuộc tính | Kiểu dữ liệu | Not Null | Khóa | Reference | Mô tả |
|-----|---------------|--------------|----------|------|-----------|--------|
| 1 | id | INT | YES | PK | - | ID tự tăng của tài liệu kiến thức |
| 2 | title | VARCHAR(500) | YES | - | - | Tiêu đề tài liệu |
| 3 | content | LONGTEXT | YES | - | - | Nội dung tài liệu |
| 4 | category | VARCHAR(255) | NO | - | - | Danh mục (default 'general') |
| 5 | file_type | VARCHAR(50) | NO | - | - | Loại file ('pdf', 'txt', 'docx', 'text') |
| 6 | file_name | VARCHAR(255) | NO | - | - | Tên file |
| 7 | status | ENUM('processing','completed','error') | NO | - | - | Trạng thái xử lý (default 'processing') |
| 8 | chunk_count | INT | NO | - | - | Số lượng chunk (default 0) |
| 9 | createdAt | DATETIME | YES | - | - | Thời gian tạo |
| 10 | updatedAt | DATETIME | YES | - | - | Thời gian cập nhật |

## 14. Bảng knowledge_chunks
| Stt | Tên thuộc tính | Kiểu dữ liệu | Not Null | Khóa | Reference | Mô tả |
|-----|---------------|--------------|----------|------|-----------|--------|
| 1 | id | INT | YES | PK | - | ID tự tăng của chunk |
| 2 | knowledge_id | INT | YES | FK | knowledges(id) | ID tài liệu kiến thức |
| 3 | chunk_text | TEXT | YES | - | - | Nội dung chunk |
| 4 | chunk_index | INT | YES | - | - | Thứ tự chunk |
| 5 | vector_id | VARCHAR(255) | YES | - | - | ID vector trong ChromaDB |
| 6 | createdAt | DATETIME | YES | - | - | Thời gian tạo |
| 7 | updatedAt | DATETIME | YES | - | - | Thời gian cập nhật |

## 13. Bảng chat_histories
| Stt | Tên thuộc tính | Kiểu dữ liệu | Not Null | Khóa | Reference | Mô tả |
|-----|---------------|--------------|----------|------|-----------|--------|
| 1 | id | INT | YES | PK | - | ID tự tăng của lịch sử chat |
| 2 | session_id | VARCHAR(255) | YES | - | - | ID phiên chat |
| 3 | user_question | TEXT | YES | - | - | Câu hỏi của user |
| 4 | bot_answer | TEXT | YES | - | - | Câu trả lời của bot |
| 5 | sources | JSON | NO | - | - | Nguồn tài liệu tham khảo |
| 6 | response_time | INT | NO | - | - | Thời gian xử lý (ms) |
| 7 | createdAt | DATETIME | YES | - | - | Thời gian tạo |
| 8 | updatedAt | DATETIME | YES | - | - | Thời gian cập nhật |

## 14. Bảng chatbot_configs
| Stt | Tên thuộc tính | Kiểu dữ liệu | Not Null | Khóa | Reference | Mô tả |
|-----|---------------|--------------|----------|------|-----------|--------|
| 1 | id | INT | YES | PK | - | ID tự tăng của cấu hình |
| 2 | config_key | VARCHAR(255) | YES | UK | - | Khóa cấu hình (unique) |
| 3 | config_value | TEXT | YES | - | - | Giá trị cấu hình |
| 4 | createdAt | DATETIME | YES | - | - | Thời gian tạo |
| 5 | updatedAt | DATETIME | YES | - | - | Thời gian cập nhật |

## 15. Bảng sequelizemeta
| Stt | Tên thuộc tính | Kiểu dữ liệu | Not Null | Khóa | Reference | Mô tả |
|-----|---------------|--------------|----------|------|-----------|--------|
| 1 | name | VARCHAR(255) | YES | PK | - | Tên migration |