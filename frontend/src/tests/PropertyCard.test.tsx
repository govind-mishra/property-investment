import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PropertyCard } from "../components/propertyCard";
import type { Property } from "../types/property";

const property: Property = {
  id: "prop-test-1",
  name: "Harbor View Apartments",
  location: "Yokohama, Japan",
  price: 245000,
  image: "/assets/properties/harbor-view-apartments.svg",
  annualYield: 6.8
};

describe("PropertyCard", () => {
  it("renders property details and invest button", () => {
    render(<PropertyCard property={property} />);

    expect(screen.getByRole("img", { name: "Harbor View Apartments" })).toHaveAttribute(
      "src",
      property.image
    );
    expect(screen.getByRole("heading", { name: "Harbor View Apartments" })).toBeInTheDocument();
    expect(screen.getByText("Yokohama, Japan")).toBeInTheDocument();
    expect(screen.getByText("$245,000")).toBeInTheDocument();
    expect(screen.getByText("6.8%")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Invest Now" })).toBeInTheDocument();
  });
});