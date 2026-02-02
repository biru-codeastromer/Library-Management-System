import { model, Schema } from "mongoose";
import { BookDocument } from "../interfaces/book.interface";

const BookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    publishedYear: { type: Number, required: true },
    isbn: { type: String, required: true, unique: true },
    stock: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const BookModel = model<BookDocument>("Book", BookSchema);
