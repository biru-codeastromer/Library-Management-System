import { Request, Response, NextFunction } from "express";
import BookService from "../services/book.service";

class BookController {
  private bookService = new BookService();

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bookData = req.body;
      const createdBook = await this.bookService.createBook(bookData);
      res.status(201).json({ message: "Book created", data: createdBook });
    } catch (error) {
      next(error);
    }
  };

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const search = (req.query.search as string) || "";
      const genre = (req.query.genre as string) || "";
      const sortBy = (req.query.sortBy as string) || "createdAt:desc";

      const result = await this.bookService.getAllBooks(page, limit, search, genre, sortBy);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  public getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const book = await this.bookService.getBookById(req.params.id);
      res.status(200).json({ data: book });
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updatedBook = await this.bookService.updateBook(req.params.id, req.body);
      res.status(200).json({ message: "Book updated", data: updatedBook });
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.bookService.deleteBook(req.params.id);
      res.status(200).json({ message: "Book deleted" });
    } catch (error) {
      next(error);
    }
  };
}

export default BookController;
