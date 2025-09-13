/*import * as bookModel from '../models/bookModel.js';

export async function getBooks() {
  return bookModel.getAll();
}

export async function addBook(data) {
  return bookModel.add(data);
}

export async function deleteBook(id) {
  return bookModel.deleteBook(id);
}

*/

///// giai thich tung dong 
import * as bookModel from '../models/bookModel.js';
/*
import: Dùng để nhập module từ file khác (ở đây là bookModel.js) vào file hiện tại.
Thay thế cho require() trong CommonJS (Node.js cũ).

* as bookModel:
Dấu * có nghĩa là nhập tất cả export từ module bookModel.js.
as bookModel : đặt tên namespace là bookModel.

Sau đó bạn có thể dùng:
bookModel.getAll();
bookModel.add({ title: 'JS' });

'../models/bookModel.js'
Là đường dẫn tới file module cần import.
.. nghĩa là lên 1 cấp thư mục so với file hiện tại.
.js là bắt buộc trong ES6 module khi dùng Node.js (khác với CommonJS).

✅ Tóm lại: câu lệnh này đúng chuẩn ES6, tạo ra namespace bookModel để dùng các export từ bookModel.js.
*/

export async function getBooks() {
  return bookModel.getAll();
}
/*
export
Xuất hàm này ra để các file khác có thể import.

async function getBooks()
Định nghĩa hàm bất đồng bộ (async).
Khi gọi getBooks(), nó trả về Promise.
Bạn có thể dùng await getBooks() trong các hàm async khác để chờ kết quả.

return bookModel.getAll();
Gọi hàm getAll() từ module bookModel.
Nếu getAll() là hàm đồng bộ, thì async ở đây hơi thừa, nhưng vẫn không sai, vì async sẽ tự động bọc giá trị trả về thành Promise.resolve(value).

Nếu getAll() là hàm async (trả về Promise), thì await cũng có thể được dùng nếu muốn nhận giá trị thực, nhưng return trực tiếp Promise cũng ok.

✅ Tóm lại: cú pháp đúng, file này đang xuất một hàm async để người khác import và gọi.*/

export async function addBook(data) {
  return bookModel.add(data);
}
/*
export
Cho phép hàm addBook được import từ module khác.

async function addBook(data)
async nghĩa là hàm trả về một Promise, có thể dùng await bên trong.
data là tham số đầu vào, thường là object chứa thông tin sách mới.

return bookModel.add(data);
Gọi hàm add từ bookModel (thường là phần xử lý lưu dữ liệu vào “database” hoặc mảng).
Nếu bookModel.add trả về Promise, async đảm bảo addBook cũng trả về Promise, nên có thể dùng await addBook(data) ở nơi khác.

Ví dụ sử dụng:

// giả sử bookModel.add là async
const newBook = await addBook({ title: "Harry Potter", author: "JK Rowling" });
console.log(newBook);
Kết quả: newBook sẽ là object vừa được thêm vào, có thể có thêm id do bookModel.add tạo.*/

export async function deleteBook(id) {
  return bookModel.deleteBook(id);
}
/*
1️⃣ Vai trò của hàm này
Đây là hàm controller được export, để route gọi khi có request xóa sách (DELETE /books/:id).

Controller không tự xóa mà gọi hàm deleteBook(id) từ bookModel.

2️⃣ Giải thích từng phần
🔹 async function deleteBook(id)
async được dùng để hỗ trợ Promise (tương lai nếu model dùng database thì sẽ trả Promise).
id là tham số đầu vào, là ID của sách mà client muốn xóa.

🔹 return bookModel.deleteBook(id);
Gọi hàm deleteBook trong model (bookModel.js) → model thực hiện xóa sách trong mảng books.

Hàm model trả về true nếu xóa thành công, false nếu không tìm thấy → controller cũng trả giá trị đó về route.
*/