import cors from "cors";
import express from "express";
import { errorHandler } from "./src/middleware/errorHandler.js";
import { propertyRoutes } from "./src/routes/propertyRoutes.js";

export const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/properties", propertyRoutes);
app.use(errorHandler);