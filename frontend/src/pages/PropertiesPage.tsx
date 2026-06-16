import { Header } from "../components/Header";
import { PropertyGrid } from "../components/PropertyGrid";
import { useProperties } from "../hooks/useProperties";

export function PropertiesPage() {
  const { properties, isLoading, error } = useProperties();

  return (
    <main>
      <Header />
      <section className="page-shell">
        <div className="toolbar">
          <div>
            <span className="eyebrow">Investment Properties</span>
            <h2>Available opportunities</h2>
          </div>
          {/* Refresh button removed */}
        </div>

        {isLoading && <p className="state-message">Loading properties...</p>}
        {error && <p className="state-message error">{error}</p>}
        {!isLoading && !error && <PropertyGrid properties={properties} />}
      </section>
    </main>
  );
}