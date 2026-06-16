import { Building2 } from "lucide-react";

export function Header() {
  return (
    <header className="app-header">
      <div className="brand">
        <span className="brand-icon">
          <Building2 size={24} aria-hidden="true" />
        </span>
        <div>
          <h1>Property Investments</h1>
          <p>Mock property opportunities</p>
        </div>
      </div>
    </header>
  );
}