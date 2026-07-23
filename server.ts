import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { v4 as uuidv4 } from "uuid";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// In-memory data storage (replacing MongoDB per migration guide)
const contactMessages: Array<{
  id: string;
  name: string;
  email: string;
  organization?: string;
  topic?: string;
  message: string;
  created_at: string;
}> = [];

const statusChecks: Array<{
  id: string;
  client_name: string;
  timestamp: string;
}> = [];

// API Router
const apiRouter = express.Router();

apiRouter.get("/", (_req, res) => {
  res.json({ message: "Fundacja D-Arka API" });
});

apiRouter.post("/contact", (req, res) => {
  const { name, email, organization, topic, message } = req.body || {};
  if (!name || name.length < 2) {
    return res.status(400).json({ error: "Name is required (min 2 characters)" });
  }
  if (!email || !email.includes("@")) {
    return res.status(400).json({ error: "Valid email is required" });
  }
  if (!message || message.length < 5) {
    return res.status(400).json({ error: "Message is required (min 5 characters)" });
  }

  const msg = {
    id: uuidv4(),
    name,
    email,
    organization: organization || null,
    topic: topic || null,
    message,
    created_at: new Date().toISOString(),
  };

  contactMessages.unshift(msg);
  res.json(msg);
});

apiRouter.get("/contact", (_req, res) => {
  res.json(contactMessages);
});

apiRouter.post("/status", (req, res) => {
  const { client_name } = req.body || {};
  if (!client_name) {
    return res.status(400).json({ error: "client_name is required" });
  }
  const check = {
    id: uuidv4(),
    client_name,
    timestamp: new Date().toISOString(),
  };
  statusChecks.unshift(check);
  res.json(check);
});

apiRouter.get("/status", (_req, res) => {
  res.json(statusChecks);
});

app.use("/api", apiRouter);

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
