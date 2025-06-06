import dotenv from "dotenv";
import app from "./app";
import { connectDB } from "../src/config/db";  // named export from postgres config

dotenv.config();

const startServer = async () => {
  await connectDB();

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer().catch(err => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
