import app from "./app";
import connectDB from "./config/db";
import { config } from "./config/env";
import colors from "colors";

connectDB().then(() => {
  app.listen(config.port, () => {
    console.log(
      colors.cyan.bold(
        `🚀 Server running on port ${config.port} in ${config.nodeEnv} mode http://localhost:${config.port}`
      )
    );
  });
});

export default app;
