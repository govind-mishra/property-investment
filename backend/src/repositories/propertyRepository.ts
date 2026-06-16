import path from "node:path";
import { fileURLToPath } from "node:url";
import { promises as fs } from "fs";
import { nanoid } from "nanoid";
import type { Property, PropertyInput } from "../types/property.js";

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const defaultDataFile = path.resolve(currentDir, "../../data/properties.json");
const dataFile = process.env.DATA_FILE ?? defaultDataFile;

async function readJsonFile<T>(filePath: string, defaultValue: T): Promise<T> {
  try {
    const content = await fs.readFile(filePath, "utf8");
    return JSON.parse(content) as T;
  } catch (err: any) {
    if (err?.code === "ENOENT") return defaultValue;
    throw err;
  }
}

async function writeJsonFile(filePath: string, data: unknown): Promise<void> {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
}

async function readProperties(): Promise<Property[]> {
  return readJsonFile<Property[]>(dataFile, []);
}

async function writeProperties(properties: Property[]): Promise<void> {
  await writeJsonFile(dataFile, properties);
}

export const propertyRepository = {
  async findAll(): Promise<Property[]> {
    return readProperties();
  },

  async findById(id: string): Promise<Property | undefined> {
    const properties = await readProperties();
    return properties.find((p) => p.id === id);
  },

  async create(input: PropertyInput): Promise<Property> {
    const properties = await readProperties();
    const newProperty: Property = { id: nanoid(), ...input };
    properties.push(newProperty);
    await writeProperties(properties);
    return newProperty;
  },

  async update(id: string, input: PropertyInput): Promise<Property | undefined> {
    const properties = await readProperties();
    const index = properties.findIndex((p) => p.id === id);
    if (index === -1) return undefined;
    const updated = { ...properties[index], ...input };
    properties[index] = updated;
    await writeProperties(properties);
    return updated;
  },

  async delete(id: string): Promise<boolean> {
    const properties = await readProperties();
    const filtered = properties.filter((p) => p.id !== id);
    const deleted = filtered.length !== properties.length;
    if (deleted) {
      await writeProperties(filtered);
    }
    return deleted;
  },
};