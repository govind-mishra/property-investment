import { PropertyCard } from "./propertyCard";
import type { Property } from "../types/property";

type PropertyGridProps = {
  properties: Property[];
};

export function PropertyGrid({ properties }: PropertyGridProps) {
  return (
    <section className="property-grid" aria-label="Properties">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </section>
  );
}