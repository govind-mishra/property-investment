import { useEffect, useState } from "react";
import { getProperties } from "../api/propertyApi";
import type { Property } from "../types/property";

export function useProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Loading handled on mount; explicit refresh removed.

  useEffect(() => {
    let isMounted = true;

    getProperties()
      .then((data) => {
        if (!isMounted) return;
        setProperties(data);
        setError(null);
      })
      .catch((loadError: unknown) => {
        if (!isMounted) return;
        setError(loadError instanceof Error ? loadError.message : "Something went wrong");
      })
      .finally(() => {
        if (!isMounted) return;
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    properties,
    isLoading,
    error,
  };
}