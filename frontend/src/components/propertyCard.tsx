import { MapPin, TrendingUp } from "lucide-react";
import type { Property } from "../types/property";

type PropertyCardProps = {
  property: Property;
};

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <article className="property-card">
      <img src={property.image} alt={property.name} className="property-image" />
      <div className="property-body">
        <h2>{property.name}</h2>
        <div className="property-location">
          <MapPin size={16} aria-hidden="true" />
          <span>{property.location}</span>
        </div>
        <div className="property-stats">
          <div>
            <span className="stat-label">Price</span>
            <strong>${property.price.toLocaleString()}</strong>
          </div>
          <div>
            <span className="stat-label">Annual Yield</span>
            <strong className="yield">
              <TrendingUp size={16} aria-hidden="true" />
              {property.annualYield.toFixed(1)}%
            </strong>
          </div>
        </div>
        <button type="button" className="invest-button">
          Invest Now
        </button>
      </div>
    </article>
  );
}