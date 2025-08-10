import * as bookModel from '../models/bookModel.js';

export async function getBooks() {
  return bookModel.getAll();
}

export async function addBook(data) {
  return bookModel.add(data);
}

export async function deleteBook(id) {
  return bookModel.deleteBook(id);
}

abc