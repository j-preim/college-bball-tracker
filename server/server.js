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
  app.use(express.static("dist"));

  app.get("*", (_req, res) => {
    res.sendFile(path.join("dist/index.html"));
  });
}

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}`);
  });
});