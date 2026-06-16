import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import request from "supertest";
import { afterAll, beforeEach, describe, expect, it } from "vitest";

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const testDataFile = path.resolve(currentDir, "tmp-properties.json");

process.env.DATA_FILE = testDataFile;

const { app } = await import("../src/app.js");

const seedProperties = [
  {
    id: "prop-test-1",
    name: "Test Harbor Residence",
    location: "Yokohama, Japan",
    price: 250000,
    image: "/assets/properties/harbor-view-apartments.svg",
    annualYield: 6.5
  },
  {
    id: "prop-test-2",
    name: "Test City Tower",
    location: "Tokyo, Japan",
    price: 420000,
    image: "/assets/properties/central-city-residence.svg",
    annualYield: 5.8
  }
];

async function writeSeedData() {
  await fs.writeFile(testDataFile, JSON.stringify(seedProperties, null, 2), "utf-8");
}

describe("property routes", () => {
  beforeEach(async () => {
    await writeSeedData();
  });

  afterAll(async () => {
    await fs.rm(testDataFile, { force: true });
  });

  it("returns all properties", async () => {
    const response = await request(app).get("/api/properties").expect(200);

    expect(response.body).toHaveLength(2);
    expect(response.body[0]).toMatchObject({
      id: "prop-test-1",
      name: "Test Harbor Residence",
      location: "Yokohama, Japan",
      price: 250000,
      annualYield: 6.5
    });
  });

  it("returns one property by id", async () => {
    const response = await request(app).get("/api/properties/prop-test-2").expect(200);

    expect(response.body).toMatchObject({
      id: "prop-test-2",
      name: "Test City Tower"
    });
  });

  it("returns 404 when property is not found", async () => {
    const response = await request(app).get("/api/properties/missing-property").expect(404);

    expect(response.body).toEqual({ message: "Property not found" });
  });

  it("creates a property", async () => {
    const payload = {
      name: "Test Riverside Loft",
      location: "Fukuoka, Japan",
      price: 180000,
      image: "/assets/properties/riverside-studio-tower.svg",
      annualYield: 6.2
    };

    const response = await request(app).post("/api/properties").send(payload).expect(201);

    expect(response.body).toMatchObject(payload);
    expect(response.body.id).toEqual(expect.any(String));

    const listResponse = await request(app).get("/api/properties").expect(200);
    expect(listResponse.body).toHaveLength(3);
  });

  it("returns 400 for invalid property payload", async () => {
    const response = await request(app)
      .post("/api/properties")
      .send({
        name: "Invalid Property"
      })
      .expect(400);

    expect(response.body).toEqual({ message: "Invalid property payload" });
  });

  it("updates a property", async () => {
    const payload = {
      name: "Updated Harbor Residence",
      location: "Yokohama, Japan",
      price: 275000,
      image: "/assets/properties/harbor-view-apartments.svg",
      annualYield: 7.1
    };

    const response = await request(app).put("/api/properties/prop-test-1").send(payload).expect(200);

    expect(response.body).toEqual({
      id: "prop-test-1",
      ...payload
    });
  });

  it("deletes a property", async () => {
    await request(app).delete("/api/properties/prop-test-1").expect(204);

    const listResponse = await request(app).get("/api/properties").expect(200);
    expect(listResponse.body).toHaveLength(1);
    expect(listResponse.body[0].id).toBe("prop-test-2");
  });
});
