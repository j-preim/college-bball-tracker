import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";

import db from "./config/connection.js";
import routes from "./routes/index.js";

const PORT = process.env.PORT || 3001;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

if (process.env.NODE_ENV === "production") {
  const distPath = path.resolve(__dirname, "..", "dist");
  app.use(express.static(distPath));

  app.get("*", (_req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}`);
  });
});