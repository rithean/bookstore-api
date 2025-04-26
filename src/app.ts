import express from "express";
import userRoutes from "./routes/user.routes";
import bookRoutes from "./routes/book.routes";
import authorRoutes from "./routes/author.routes";
import genreRoutes from "./routes/genre.routes";
import authRoutes from "./routes/auth.routes";

const app = express();

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/authors", authorRoutes);
app.use("/api/genres", genreRoutes);
app.use("/api/auth", authRoutes);
 
export default app;
