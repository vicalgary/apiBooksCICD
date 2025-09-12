# API Quản Lý Sách

## Mô tả dự án
Dự án này là một API đơn giản dùng để quản lý thông tin sách, được xây dựng bằng Node.js và Express.  
API hỗ trợ các chức năng chính như lấy danh sách sách, thêm mới, cập nhật và xóa sách.

## Công nghệ sử dụng
- Node.js
- Express.js
- MongoDB (hoặc bạn thay thế nếu dùng database khác)
- Mongoose (nếu dùng MongoDB)
- Joi (validate dữ liệu)
- dotenv (quản lý biến môi trường)

## Cài đặt
1. Clone project về máy:

```bash
git clone https://github.com/username/ten-repo.git
cd ten-repo

Cài đặt các package:
npm install

Tạo file .env ở thư mục gốc và thêm các biến môi trường cần thiết (ví dụ):
PORT=3000
DB_CONNECTION_STRING=mongodb://localhost:27017/bookdb

Khởi chạy server:
npm start
Server sẽ chạy trên http://localhost:3000, https://apibookscicd.onrender.com/api/books

API Endpoints:
GET	/api/books	Lấy danh sách tất cả sách
GET	/api/books/:id	Lấy thông tin sách theo ID
POST	/api/books	Thêm sách mới
PUT	/api/books/:id	Cập nhật thông tin sách
DELETE	/api/books/:id	Xóa sách theo ID

Ví dụ Request & Response:
Lấy danh sách sách
Request: GET /api/books
Response: json
[
  {
    "id": "1",
    "title": "Clean Code",
    "author": "Robert C. Martin",
    "year": 2008
  },
  {
    "id": "2",
    "title": "You Don’t Know JS",
    "author": "Kyle Simpson",
    "year": 2015
  }
]    

Test:
Bạn có thể dùng Postman hoặc curl để test API.
Ví dụ test GET: curl http://localhost:3000/api/books

Đóng góp:
Chào mừng mọi đóng góp để dự án tốt hơn!
Vui lòng tạo pull request hoặc issue nếu có lỗi hoặc đề xuất.

Giấy phép:
MIT License © 2025 YourName

Liên hệ:
Email: your.email@example.com
GitHub: https://github.com/username
