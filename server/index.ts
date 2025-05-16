import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// Direct Route
app.post("/chat", (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  // Example response
  res.json({ reply: `You said: ${message}` });
});

// Server start
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
