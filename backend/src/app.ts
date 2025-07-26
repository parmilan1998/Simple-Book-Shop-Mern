import express from "express";
import cors from "cors";
import colors from "colors";
import bodyParser from "body-parser";
import bookRoutes from "./routes/book-route";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Base route
app.get("/", (_req: any, res: any) => {
  console.log("API is running...", colors.blue.bold);
  res.send("Book API is running...");
});

// Book API route
app.use("/api/v1/books", bookRoutes);

export default app;
