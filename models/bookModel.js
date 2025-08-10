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
