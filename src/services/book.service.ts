import BookRepository from "../repositories/book.repository";
import { Book } from "../interfaces/book.interface";
import { HttpException } from "../utils/http.exception";

class BookService {
  private bookRepository = new BookRepository();

  public async createBook(data: Book) {
    // Validation: Check if ISBN already exists
    const existingBook = await this.bookRepository.findByIsbn(data.isbn);
    if (existingBook) {
      throw new HttpException(409, `Book with ISBN ${data.isbn} already exists`);
    }
    return await this.bookRepository.create(data);
  }

  public async getAllBooks(
    page: number,
    limit: number,
    search: string,
    genre: string,
    sortBy: string
  ) {
    const skip = (page - 1) * limit;

    // Filtering logic
    let query: any = {};
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { author: { $regex: search, $options: "i" } },
      ];
    }
    if (genre) {
      query.genre = genre;
    }

    // Sorting logic
    let sortObj: any = {};
    if (sortBy) {
      const parts = sortBy.split(":");
      sortObj[parts[0]] = parts[1] === "desc" ? -1 : 1;
    } else {
      sortObj = { createdAt: -1 };
    }

    const books = await this.bookRepository.findAll(query, skip, limit, sortObj);
    const total = await this.bookRepository.count(query);

    return { books, total, page, totalPages: Math.ceil(total / limit) };
  }

  public async getBookById(id: string) {
    const book = await this.bookRepository.findById(id);
    if (!book) throw new HttpException(404, "Book not found");
    return book;
  }

  public async updateBook(id: string, data: Partial<Book>) {
    const book = await this.bookRepository.update(id, data);
    if (!book) throw new HttpException(404, "Book not found");
    return book;
  }

  public async deleteBook(id: string) {
    const book = await this.bookRepository.delete(id);
    if (!book) throw new HttpException(404, "Book not found");
    return book;
  }
}

export default BookService;
