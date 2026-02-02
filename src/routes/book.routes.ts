import { Router } from "express";
import { Routes } from "../utils/route.interface";
import BookController from "../controllers/book.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

class BookRoutes implements Routes {
  public path = "/books";
  public router = Router();
  public bookController = new BookController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // Public Routes
    this.router.get(`${this.path}`, this.bookController.getAll);
    this.router.get(`${this.path}/:id`, this.bookController.getOne);

    // Protected Routes (Require API Key)
    this.router.post(`${this.path}`, authMiddleware, this.bookController.create);
    this.router.put(`${this.path}/:id`, authMiddleware, this.bookController.update);
    this.router.delete(`${this.path}/:id`, authMiddleware, this.bookController.delete);
  }
}

export default BookRoutes;
