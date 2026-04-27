"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type SeoContextValue = {
  alsoSee: string[];
  setAlsoSee: (items: string[] | ((prev: string[]) => string[])) => void;
};

const SeoContext = createContext<SeoContextValue | null>(null);

export function SeoProvider({ children }: { children: React.ReactNode }) {
  const [alsoSee, setAlsoSee] = useState<string[]>([]);

  return (
    <SeoContext.Provider value={{ alsoSee, setAlsoSee }}>
      {children}
    </SeoContext.Provider>
  );
}

export function useSeo() {
  const ctx = useContext(SeoContext);
  if (!ctx) throw new Error("useSeo must be used within SeoProvider");
  return ctx;
}

export function SetAlsoSee({
  items,
  mode = "replace",
}: {
  items: string[];
  mode?: "replace" | "append";
}) {
  const { setAlsoSee } = useSeo();

  useEffect(() => {
    if (mode === "replace") setAlsoSee(() => items ?? []);
    else
      setAlsoSee((prev) => {
        const merged = Array.from(new Set([...(prev ?? []), ...(items ?? [])]));
        return merged.slice(0, 60);
      });
  }, [items, mode, setAlsoSee]);

  return null;
}
