import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { getProperties } from "../api/propertyApi";
import { PropertiesPage } from "../pages/PropertiesPage";
import type { Property } from "../types/property";

vi.mock("../api/propertyApi", () => ({
  getProperties: vi.fn()
}));

const mockedGetProperties = vi.mocked(getProperties);

const properties: Property[] = [
  {
    id: "prop-test-1",
    name: "Harbor View Apartments",
    location: "Yokohama, Japan",
    price: 245000,
    image: "/assets/properties/harbor-view-apartments.svg",
    annualYield: 6.8
  },
  {
    id: "prop-test-2",
    name: "Central City Residence",
    location: "Tokyo, Japan",
    price: 385000,
    image: "/assets/properties/central-city-residence.svg",
    annualYield: 5.9
  }
];

describe("PropertiesPage", () => {
  beforeEach(() => {
    mockedGetProperties.mockReset();
  });

  it("loads and renders property cards", async () => {
    mockedGetProperties.mockResolvedValue(properties);

    render(<PropertiesPage />);

    expect(screen.getByText("Loading properties...")).toBeInTheDocument();
    expect(await screen.findByText("Harbor View Apartments")).toBeInTheDocument();
    expect(screen.getByText("Central City Residence")).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: "Invest Now" })).toHaveLength(2);
  });

  it("shows an error when properties fail to load", async () => {
    mockedGetProperties.mockRejectedValue(new Error("Unable to load properties"));

    render(<PropertiesPage />);

    expect(await screen.findByText("Unable to load properties")).toBeInTheDocument();
  });

  // Refresh functionality removed; test for refresh removed.
});