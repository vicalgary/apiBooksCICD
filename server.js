import http from 'http';
import router from './router.js';

const server = http.createServer((req, res) => {
  router.handle(req, res);
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
