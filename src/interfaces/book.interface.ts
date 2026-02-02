import { Document } from "mongoose";

export interface Book {
  title: string;
  author: string;
  genre: string;
  publishedYear: number;
  isbn: string;
  stock: number;
}

export interface BookDocument extends Book, Document {}
