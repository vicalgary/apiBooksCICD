/*
let books = [];

export function getAll() {
  return books;
}

export function add(book) {
  const newBook = { id: Date.now().toString(), ...book };
  books.push(newBook);
  return newBook;
}

export function deleteBook(id) {
  const originalLength = books.length;
  books = books.filter(b => b.id !== id);
  return books.length < originalLength; // true nếu xóa thành công
}
*/



///////////////////////// giai thich tung dong code bn duoi 
let books = [];
/*📌 1. Câu lệnh này làm gì?
let → khai báo một biến (giá trị có thể thay đổi).
books → tên biến, mình đặt để đại diện cho "danh sách sách".
[ ] → một array rỗng (mảng, chưa có phần tử nào).
👉 Ghép lại: Tạo ra một biến books, kiểu mảng, ban đầu rỗng.

📌 2. Mục đích của việc khai báo như vậy
Vì bạn cần một nơi để lưu trữ dữ liệu (trong trường hợp này là danh sách các quyển sách).

Ban đầu chưa có sách nào → mảng trống [ ].
Sau đó, khi thêm sách (addBook), bạn sẽ push vào mảng này.
Khi lấy danh sách (getBooks), bạn sẽ đọc từ mảng này.

📌 3. Ví dụ minh họa
let books = []; // ban đầu trống

// Thêm sách
books.push({ id: 1, title: "Harry Potter" });
books.push({ id: 2, title: "Doraemon" });

console.log(books);
// Kết quả: 
// [
//   { id: 1, title: "Harry Potter" },
//   { id: 2, title: "Doraemon" }
// ]

📌 4. Tại sao không khai báo let books; thôi?
Nếu bạn viết: let books;
thì biến books sẽ là undefined, chưa thể dùng như mảng.

Còn khi viết:
let books = [];
thì bạn đã có một mảng rỗng sẵn sàng để chứa dữ liệu.

👉 Tóm lại:
Đây chỉ là giải pháp tạm thời trong bộ nhớ. Sau này khi kết nối DB (MySQL, MongoDB...), bạn sẽ không cần mảng này nữa, mà dữ liệu sẽ lưu trong DB.
*/

export function getAll() 
{
  return books;
}
/*
📌 1. Đây là gì?
export function getAll() → định nghĩa một hàm getAll và export nó ra ngoài để file khác có thể import dùng.
return books; → trả về biến mang books (mảng chứa danh sách sách mà bạn đã khai báo let books = []; truoc do).

📌2. Mục đích
Đây là hàm lấy toàn bộ dữ liệu sách từ "database tạm thời" (mảng books).
Khi controller cần danh sách sách để trả về cho client → nó gọi getAll().
*/

export function add(book) {
  const newBook = { id: Date.now().toString(), ...book };
  books.push(newBook);
  return newBook;
}
/*
>export function add(book)
book là tham số của hàm (input mà người dùng hoặc controller truyền vào).
Nó thường là một object đại diện cho một cuốn sách.

Đây là hàm add (được export để file khác dùng).
Mục đích: thêm một cuốn sách mới vào mảng books.
-------------------------------------
>const newBook = { id: Date.now().toString(), ...book };
 tuong duong voi 2 cau lenh :

 >>const Book = { id: Date.now().toString() }; 
>>const newBook = { ...Book }; // ✅ copy tất cả thuộc tính từ Book

 { id: Date.now().toString() }
        Date.now() trả về số mili giây từ 1/1/1970 đến hiện tại.
        .toString() chuyển số này thành chuỗi (string).

Đây là cách nhanh chóng để tạo id duy nhất dạng string.

> { ...Book };
Đây là spread syntax, nó “trải” tất cả các property từ object book vào object mới newBook.

Ví dụ nếu book = { title: 'JS', author: 'Nobita' }, thì sau khi spread sẽ có:
{ id: '123456789', title: 'JS', author: 'Nobita' }

Kết hợp lại: Ta tạo một object mới newBook có id riêng và giữ nguyên tất cả thông tin từ book.
------------------------------------

books.push(newBook);
Thêm newBook vào mảng books (lưu trữ tất cả sách hiện tại).
-------------------------------------

🔹 return newBook;
Trả về chính cuốn sách vừa thêm, để controller có thể gửi lại cho client.
*/

export function deleteBook(id)
 {
  const originalLength = books.length;
  books = books.filter(b => b.id !== id);
  return books.length < originalLength; // true nếu xóa thành công
}

/*
📌 1. Đây là gì?
Đây là hàm deleteBook được export ra để file khác (controller) dùng.
Mục đích: xóa một cuốn sách dựa trên id trong mảng books.

📌 2. Giải thích từng dòng
🔹 const originalLength = books.length;
Lưu lại số lượng sách ban đầu trước khi xóa.
Dùng để kiểm tra xem có xóa được không.

🔹 books = books.filter(b => b.id !== id);
filter() tạo ra một mảng mới chứa tất cả sách không có id trùng với id cần xóa.Nói cách khác: loại bỏ cuốn sách có id đó ra khoi danh sach moi.

Ví dụ:
books = [
  {id: "1", title: "A"},
  {id: "2", title: "B"}
];
id = "2";
books = books.filter(b => b.id !== "2");
// books giờ chỉ còn [{id: "1", title: "A"}]

🔹 return books.length < originalLength;
So sánh số lượng sách sau khi xóa với số lượng ban đầu.
Nếu nhỏ hơn → có nghĩa là có sách bị xóa → trả về true.
Nếu bằng → không có sách nào bị xóa → trả về false.

*/