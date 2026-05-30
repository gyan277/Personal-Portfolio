import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleTranslate, handleSimplify } from "./routes/claude";
import { handleVerifyCard } from "./routes/verifyCard";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Claude AI routes
  app.post("/api/translate", handleTranslate);
  app.post("/api/simplify", handleSimplify);
  app.post("/api/verify-card", handleVerifyCard);

  return app;
}
