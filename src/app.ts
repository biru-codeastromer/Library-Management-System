import express from "express";
import { connect } from "mongoose";
import { Routes } from "./utils/route.interface";
import { errorMiddleware } from "./middlewares/error.middleware";

class App {
  public app: express.Application;
  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = process.env.PORT || 8080;

    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
    this.connectDatabase();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`);
    });
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use("/", route.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private connectDatabase() {
    const dbUri = process.env.MONGODB_URI;
    if (!dbUri) {
      console.error("MONGODB_URI not found in env");
      return;
    }
    connect(dbUri)
      .then(() => console.log("Database connected..."))
      .catch((error) => console.log("DB Connection Error:", error));
  }
}

export default App;
