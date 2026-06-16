import { Router } from "express";
import { propertyController } from "../controllers/propertyController.js";

export const propertyRoutes = Router();

propertyRoutes.get("/", propertyController.list);
propertyRoutes.get("/:id", propertyController.getById);
propertyRoutes.post("/", propertyController.create);
propertyRoutes.put("/:id", propertyController.update);
propertyRoutes.delete("/:id", propertyController.remove);