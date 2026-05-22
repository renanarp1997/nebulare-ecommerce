"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "nebulari:favorites";
const EVENT = "nebulari:favorites-change";

function read(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

function write(ids: string[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    window.dispatchEvent(new CustomEvent(EVENT, { detail: ids }));
  } catch {
    // ignore
  }
}

export function useFavorites() {
  const [ids, setIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setIds(read());
    setHydrated(true);

    const onChange = () => setIds(read());
    window.addEventListener(EVENT, onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener(EVENT, onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  const isFav = useCallback((id: string) => ids.includes(id), [ids]);

  const toggle = useCallback((id: string) => {
    const current = read();
    const next = current.includes(id)
      ? current.filter((x) => x !== id)
      : [...current, id];
    write(next);
  }, []);

  const remove = useCallback((id: string) => {
    const current = read();
    write(current.filter((x) => x !== id));
  }, []);

  const clear = useCallback(() => {
    write([]);
  }, []);

  return { ids, isFav, toggle, remove, clear, hydrated, count: ids.length };
}
