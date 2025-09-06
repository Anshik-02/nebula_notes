// components/ClientLoaderWrapper.tsx
"use client";

import { useEffect, useState } from "react";
import CosmicLoader from "./loader-component";


export default function ClientLoaderWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // When the page + assets fully loaded
    if (document.readyState === "complete") {
      setLoading(false);
    } else {
      const handleLoad = () => setLoading(false);
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  if (loading) return <CosmicLoader />;

  return <>{children}</>;
}
