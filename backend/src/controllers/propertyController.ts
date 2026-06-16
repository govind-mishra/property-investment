import { NextFunction, Request, Response } from "express";
import { propertyService } from "../services/propertyService.js";
import { PropertyInput } from "../types/property.js";

function parsePropertyInput(body: unknown): PropertyInput {
  const value = body as Partial<PropertyInput>;

  if (
    !value.name ||
    !value.location ||
    typeof value.price !== "number" ||
    !value.image ||
    typeof value.annualYield !== "number"
  ) {
    const error = new Error("Invalid property payload");
    error.name = "ValidationError";
    throw error;
  }

  return {
    name: value.name,
    location: value.location,
    price: value.price,
    image: value.image,
    annualYield: value.annualYield
  };
}

export const propertyController = {
  async list(_req: Request, res: Response, next: NextFunction) {
    try {
      const properties = await propertyService.listProperties();
      res.json(properties);
    } catch (error) {
      next(error);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = String(req.params.id);
      const property = await propertyService.getProperty(id);

      if (!property) {
        res.status(404).json({ message: "Property not found" });
        return;
      }

      res.json(property);
    } catch (error) {
      next(error);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const input = parsePropertyInput(req.body);
      const property = await propertyService.createProperty(input);
      res.status(201).json(property);
    } catch (error) {
      next(error);
    }
  },

   async update(req: Request, res: Response, next: NextFunction) {
    try {
      const input = parsePropertyInput(req.body);
      const id = String(req.params.id);
      const property = await propertyService.updateProperty(id, input);

      if (!property) {
        res.status(404).json({ message: "Property not found" });
        return;
      }

      res.json(property);
    } catch (error) {
      next(error);
    }
  },

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const id = String(req.params.id);
      const deleted = await propertyService.deleteProperty(id);

      if (!deleted) {
        res.status(404).json({ message: "Property not found" });
        return;
      }

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
};