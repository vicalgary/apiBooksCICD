// server.js (hoặc file main xử lý request)
import url from 'url';
/*
Trong Node.js có sẵn built-in module tên là url.
Khi bạn viết import url from 'url'; tức là nạp module url này vào file, để có thể dùng các hàm bên trong nó.


URL = Uniform Resource Locator (địa chỉ tài nguyên).
http://localhost:3000/api/books?author=Jack
    http → protocol (giao thức)
    localhost → host (tên máy chủ)
    3000 → port
    /api/books → path (đường dẫn)
    ?author=Jack → query string (tham số truyền kèm)


 “parse” = phân tích cú pháp → tách URL thành từng phần để code dễ sử dụng.
Hàm url.parse() (cũ) hoặc new URL() (mới hơn) dùng để phân tích (parse) một URL thành các phần riêng biệt
const parsedUrl = url.parse('http://localhost:3000/api/books?author=Jack', true);
console.log(parsedUrl);
kq:
  {
    protocol: 'http:',
    host: 'localhost:3000',
    pathname: '/api/books',
    query: { author: 'Jack' }
  }

*/
import * as bookController from './controllers/bookController.js';
/*
import tất cả (all exports) từ file bookController.js vào trong một object có tên là bookController
console.log(bookController);
Kết quả sẽ giống như:
{
  getBooks: [Function: getBooks],
  createBook: [Function: createBook]
}
Sử dụng:
const books = await bookController.getBooks();
*/

function sendResponse(res, statusCode, data) 
{
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
}
/*
Hàm sendResponse là một hàm tiện ích (helper function) để chuẩn hóa cách gửi phản hồi từ server Node.js về client. Nó đảm bảo:
  Luôn gửi đúng mã trạng thái HTTP.
  Luôn gửi dữ liệu dưới dạng JSON.
  Code ở các chỗ khác chỉ cần gọi sendResponse(res, 200, data) thay vì phải viết lại res.writeHead + res.end nhiều lần.

res
Là đối tượng response của Node.js (http.ServerResponse). Nó có các method như writeHead(), setHeader(), write() và end() để gửi header và body về client.

statusCode
Là số trạng thái HTTP (ví dụ 200, 201, 400, 404, 500). writeHead(statusCode, headers) sẽ gán mã trạng thái này cho response.

data
dữ liệu muốn gửi về cho client (có thể là object, array, message, …).

res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  syntax: 
  res.writeHead(statusCode, headers)
      statusCode: mã trạng thái HTTP (200, 404, 500, …).
      headers: object chứa các cặp key–value đại diện cho HTTP headers.


  wrtieHead:
  la method cua response dùng để set  phần header  mà server trả về cho client (trình duyệt, Postman...) va cho biet noi dung tra ve cho client la JSON


res.end(JSON.stringify(data));
Ý tưởng: Gửi dữ liệu thật sự về client và đóng kết nối.
Kết thúc phản hồi và gửi dữ liệu data về cho client.
JSON.stringify(data) biến object/array  thành chuỗi va chuoi nay co noi dung ben trong la JSON

*/

async function handle(req, res) 
{
      const parsedUrl = url.parse(req.url, true);
      const path = parsedUrl.pathname;
      const method = req.method;  

      if (path === '/api/books' && method === 'GET') 
      {
          const books = await bookController.getBooks();
          sendResponse(res, 200, books);

      } 
      else if (path === '/api/books' && method === 'POST')
      {
            let body = '';
            req.on('data', chunk => { body += chunk; });
            req.on('end', async () => 
            {
                  try 
                  {
                      const data = JSON.parse(body);
                      const newBook = await bookController.addBook(data);
                      sendResponse(res, 201, newBook);
                  } 

                  catch 
                  {
                      sendResponse(res, 400, { error: 'Invalid JSON' });
                  }
            });

      } 
      else if (path.startsWith('/api/books/') && method === 'DELETE') 
      {
            try
            {
                  const parts = path.split('/');
                  const id = parts[3];
                  if (!id) 
                  {
                      return sendResponse(res, 400, { error: 'Missing book id in URL' });
                  }
                  const deleted = await bookController.deleteBook(id);
                  if (!deleted) 
                  {
                      return sendResponse(res, 404, { error: `Book with id ${id} not found` });
                  }
                  sendResponse(res, 200, { message: `Book with id ${id} deleted` });
            } 
            catch (err) 
            {
                  console.error(err);
                  sendResponse(res, 500, { error: 'Internal Server Error' });
            }

      } 
      else 
      {
            sendResponse(res, 404, { error: 'Not found' });
      }  
}


/*
Hàm handle là hàm chính để xử lý mọi request HTTP đến server Node.js




Nó phân loại request dựa vào path và method.
Hỗ trợ các route chính:
GET /api/books → trả về danh sách sách.
POST /api/books → thêm sách mới từ dữ liệu JSON gửi lên.
DELETE /api/books/:id → xóa sách theo id.
-------------------------------------------------
async function handle(req, res) 
{
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const method = req.method;


Khai báo hàm bất đồng bộ handle (vì sẽ dùng await).

syntax:  url.parse(urlString, parseQueryString)
urlString: là chuỗi URL (ví dụ: "/api/books?id=123&name=js").
parseQueryString: là tham số boolean (true/false).

false → query là string "id=123&name=js"
true → query thành object { id: '123', name: 'js' } 


url.parse(req.url, true) → tách URL, query params.
  + path → chỉ lấy phần đường dẫn (ví dụ /api/books/123).
  + method → lấy HTTP method (GET, POST, DELETE, …).

-------------------------------------------------
1️⃣ Xử lý GET /api/books
if (path === '/api/books' && method === 'GET') 
{
    const books = await bookController.getBooks();
    sendResponse(res, 200, books);
}

Nếu request là GET /api/books:
Gọi getBooks() từ controller để lấy danh sách sách.
Gửi về client status 200 và JSON danh sách sách.
-------------------------------------------------
2️⃣ Xử lý POST /api/books
else if (path === '/api/books' && method === 'POST')
{
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => 
    {
        try 
        {
            const data = JSON.parse(body);
            const newBook = await bookController.addBook(data);
            sendResponse(res, 201, newBook);
        } 
        catch 
        {
            sendResponse(res, 400, { error: 'Invalid JSON' });
        }
    });
}


Kiểm tra: URL là /api/books và phương thức HTTP là POST.
POST = gửi dữ liệu mới lên server (thường để tạo mới tài nguyên).

let body = '';
Khởi tạo một biến rỗng để lưu trữ dữ liệu client gửi lên.


req.on('data', chunk => { body += chunk; });
    req : request object , đại diện cho request từ client
   'data': (trong req.on('data', ...)) là tên sự kiện, Node.js mới gọi callback mỗi khi có chunk.
   chunk : biến do bạn đặt tên, nhận mỗi mẩu dữ liệu.
    req.on('data', (1)) = lắng nghe dữ liệu gửi lên từng phần (chunk) từ client.
    Mỗi phần dữ liệu được nối vào body.
    Vì Node.js đọc request stream, dữ liệu không đến hết một lần mà tới từng mẩu.

   (1) <=> voi:    chunk => { body += chunk; } là gì?
    chunk = một mẩu dữ liệu mà server vừa nhận được.
    { body += chunk; } = nối mẩu dữ liệu vào biến body.
    Từng mẩu nhỏ được ghép lại để tạo thành chuỗi JSON hoàn chỉnh.


vd:
Nếu client gửi JSON:
{"title":"Harry Potter","author":"J.K. Rowling"}

Server có thể nhận thành 3 chunk:
Chunk 1: '{"title":"Harry '
Chunk 2: 'Potter","author":"J.'
Chunk 3: 'K. Rowling"}'

Mỗi chunk được ghép vào body → cuối cùng body sẽ là:
{"title":"Harry Potter","author":"J.K. Rowling"}

---------------------------------------------------
req.on('end', async () => { ... });

end là tên của một sự kiện (event) trong Node.js stream.
Nó xảy ra khi server đã nhận xong tất cả dữ liệu từ client.
Nghĩa là không còn chunk nào nữa để nhận.
Làm sao biết là end?
Node.js định nghĩa sẵn sự kiện này cho Readable stream (req là stream).
Bạn không cần tự đoán hay kiểm tra.


req.on('end', async function) = khi client gửi xong hết dữ liệu, Node.js mới thực hiện hàm async ben trong.
-----------------------------------------------------
req.on('end', async () => 
    {
        try 
        {
            const data = JSON.parse(body); //chuyển chuỗi JSON → object JavaScript:
            const newBook = await bookController.addBook(data);
            //
            bookController.addBook có thể là hàm bất đồng bộ (async) vì nó:
              vì nó cho :
              Ghi dữ liệu vào cơ sở dữ liệu thực (DB)
              Hoặc gọi API bên ngoài
              Hoặc thực hiện các thao tác mất thời gian khác
              Nếu bạn không dùng await, Node.js sẽ không chờ addBook xong mà tiếp tục chạy dòng tiếp theo, dẫn tới:

              sendResponse(res, 201, newBook) sẽ gửi Promise thay vì dữ liệu thật → client nhận dữ liệu không đúng.
            //
            sendResponse(res, 201, newBook);////Đây là gọi hàm sendResponse mà bạn đã định nghĩa trước đó, 
        } 
        catch 
        {
            sendResponse(res, 400, { error: 'Invalid JSON' }); //Đây là gọi hàm sendResponse mà bạn đã định nghĩa trước đó, 
        }
    });




-------------------------------------------------

3️⃣ Xử lý DELETE /api/books/:id
else if (path.startsWith('/api/books/') && method === 'DELETE') 
{
    try
    {
        const parts = path.split('/');
        const id = parts[3];
        //
            path.split('/') → tách URL thành mảng, ví dụ /api/books/5 → ['', 'api', 'books', '5'].

            parts[3] → lấy phần tử thứ 3 (index từ 0) chính là id sách.
        
        //

        if (!id) 
        {
            return sendResponse(res, 400, { error: 'Missing book id in URL' });
            //
            Nếu URL không có id (undefined hoặc rỗng), trả về HTTP 400 Bad Request với thông báo lỗi.
            //

        }
        const deleted = await bookController.deleteBook(id);

        //
        Gọi hàm controller để xóa sách trong database hoặc mảng dữ liệu.
        deleted = true nếu xóa thành công, false nếu không tìm thấy sách.
        //

        if (!deleted) 
        {
            return sendResponse(res, 404, { error: `Book with id ${id} not found` });
        }
        sendResponse(res, 200, { message: `Book with id ${id} deleted` });
    } 
    catch (err) 
    {
        console.error(err);
        sendResponse(res, 500, { error: 'Internal Server Error' });
    }
}

 
Nếu request là DELETE /api/books/:id:

path.split('/') → tách URL, lấy id.

Nếu thiếu id → trả 400 Bad Request.

Gọi deleteBook(id) → xóa sách.

Nếu sách không tồn tại → trả 404 Not Found.

Nếu xóa thành công → trả 200 OK + thông báo.

Bắt lỗi bất ngờ → log ra console + trả 500 Internal Server Error.

4️⃣ Các request khác
else 
{
    sendResponse(res, 404, { error: 'Not found' });
}


Nếu request không khớp với các route trên → trả 404 Not Found.

💡 Tóm tắt cách hoạt động:

Parse URL và method.

Kiểm tra từng route (GET / POST / DELETE).

Gọi controller (getBooks / addBook / deleteBook) để thao tác dữ liệu.

Gửi response JSON với status code phù hợp.

Xử lý lỗi cơ bản (JSON sai, thiếu ID, không tìm thấy sách, lỗi server).
*/
export default { handle };
