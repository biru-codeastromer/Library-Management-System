import "dotenv/config";
import App from "./app";
import BookRoutes from "./routes/book.routes";

const app = new App([new BookRoutes()]);

app.listen();
