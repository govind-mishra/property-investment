import { promises as fs } from "node:fs";
import path from "node:path";

async function ensureJsonFile(filePath: string, fallbackValue: unknown): Promise<void> {
    await fs.mkdir(path.dirname(filePath), { recursive: true });

    try {
        await fs.access(filePath);
    } catch {
        await writeJsonFile(filePath, fallbackValue);
    }
}

export async function readJsonFile<T>(filePath: string, fallbackValue: T): Promise<T> {
    await ensureJsonFile(filePath, fallbackValue);
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as T;
}

export async function writeJsonFile(filePath: string, value: unknown): Promise<void> {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, JSON.stringify(value, null, 2), "utf-8");
}