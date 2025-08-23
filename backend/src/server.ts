import "reflect-metadata";
import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import compression from "compression";
import rateLimit from "express-rate-limit";
import { AppDataSource } from "./config/data-source";
import config from "./config/env";

const app: Application = express();

// Parse incoming JSON requests with a body size limit of 50mb
app.use(express.json({ limit: "50mb", type: "application/json" }));

// Enable CORS (Cross-Origin Resource Sharing) for frontend (http://localhost:3000)
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Parse incoming URL-encoded requests with a body size limit of 50mb
app.use(express.urlencoded({ extended: true }));

// Secure HTTP headers (helps prevent common web vulnerabilities)
app.use(helmet());

// Compress responses for efficient data transfer
app.use(compression());

// HTTP request logging (dev mode = concise colored logs)
app.use(morgan("dev"));

// Parse cookies in incoming requests
app.use(cookieParser());

// Rate limiting: max 100 requests per 15 minutes per IP (helps prevent DDoS/brute-force attacks)
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 1000 }));

// Middleware to serve static files from a directory
app.use(express.static("public"));

// Routes
app.get("/", (req: Request, res: Response) =>
  res.send("Express server running successfully!...")
);

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

console.log("server is running...");

// Initialize DB and Start Server
AppDataSource.initialize()
  .then(() => {
    console.log("📦 Database connected");
    app.listen(config.PORT, () => {
      console.log(
        `🚀 Server running in ${config.NODE_ENV} mode. Access it at http://localhost:${config.PORT}`
      );
    });
  })
  .catch((err) => {
    console.error("❌ DB Connection error:", err);
    process.exit(1);
  });
