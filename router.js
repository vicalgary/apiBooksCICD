// server.js (hoặc file main xử lý request)
import url from 'url';
import * as bookController from './controllers/bookController.js';

function sendResponse(res, statusCode, data) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

async function handle(req, res) {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;  

  if (path === '/api/books' && method === 'GET') {
    const books = await bookController.getBooks();
    sendResponse(res, 200, books);

  } else if (path === '/api/books' && method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      try {
        const data = JSON.parse(body);
        const newBook = await bookController.addBook(data);
        sendResponse(res, 201, newBook);
      } catch {
        sendResponse(res, 400, { error: 'Invalid JSON' });
      }
    });

  } else if (path.startsWith('/api/books/') && method === 'DELETE') {
    try {
      const parts = path.split('/');
      const id = parts[3];
      if (!id) {
        return sendResponse(res, 400, { error: 'Missing book id in URL' });
      }
      const deleted = await bookController.deleteBook(id);
      if (!deleted) {
        return sendResponse(res, 404, { error: `Book with id ${id} not found` });
      }
      sendResponse(res, 200, { message: `Book with id ${id} deleted` });
    } catch (err) {
      console.error(err);
      sendResponse(res, 500, { error: 'Internal Server Error' });
    }

  } else {
    sendResponse(res, 404, { error: 'Not found' });
  }
}

export default { handle };
