import "reflect-metadata";
import app from "./app";
import { AppDataSource } from "./config/data-source";
import config from "./config/env";

const startServer = async () => {
  try {
    // Initialize database
    await AppDataSource.initialize();
    console.log("📦 Database connected");

    // Start Express server
    app.listen(config.PORT, () => {
      console.log(
        `🚀 Server running at http://localhost:${config.PORT} in ${config.NODE_ENV} mode`
      );
    });
  } catch (err) {
    console.error("❌ Error starting server:", err);
    process.exit(1);
  }
};

startServer();
