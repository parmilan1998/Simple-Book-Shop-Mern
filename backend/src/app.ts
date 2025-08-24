import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import compression from "compression";
import rateLimit from "express-rate-limit";

import routes from "./routes/index";

const app: Application = express();

// Parse incoming JSON requests
app.use(express.json({ limit: "50mb", type: "application/json" }));

// Parse URL-encoded requests
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Security middlewares
app.use(helmet());
app.use(compression());
app.use(morgan("dev"));
app.use(cookieParser());

// Rate limiting
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 1000 }));

// Serve static files
app.use(express.static("public"));

// API routes
app.use("/api/v1", routes);

// Root route
app.get("/", (_req: Request, res: Response) => {
  res.send("Express server running successfully!");
});

export default app;
