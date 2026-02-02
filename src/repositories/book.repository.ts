import { BookModel } from "../models/book.model";
import { Book } from "../interfaces/book.interface";

class BookRepository {
  public async create(data: Book) {
    return await BookModel.create(data);
  }

  public async findAll(query: any, skip: number, limit: number, sort: any) {
    return await BookModel.find(query).sort(sort).skip(skip).limit(limit);
  }

  public async count(query: any) {
    return await BookModel.countDocuments(query);
  }

  public async findById(id: string) {
    return await BookModel.findById(id);
  }

  public async findByIsbn(isbn: string) {
    return await BookModel.findOne({ isbn });
  }

  public async update(id: string, data: Partial<Book>) {
    return await BookModel.findByIdAndUpdate(id, data, { new: true });
  }

  public async delete(id: string) {
    return await BookModel.findByIdAndDelete(id);
  }
}

export default BookRepository;
