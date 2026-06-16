import type { Property } from "../types/property";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000/api";

export async function getProperties(): Promise<Property[]> {
    const response = await fetch(`${apiBaseUrl}/properties`);

    if (!response.ok) {
        throw new Error("Unable to load properties");
    }

    return response.json() as Promise<Property[]>;
}