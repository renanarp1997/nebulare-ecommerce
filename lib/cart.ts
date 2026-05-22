"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "nebulari:cart";
const EVENT = "nebulari:cart-change";
const OPEN_EVENT = "nebulari:cart-open";

export function openCart() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export const CART_OPEN_EVENT = OPEN_EVENT;

export type CartItem = {
  id: string;
  qty: number;
};

function read(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (x): x is CartItem =>
          x && typeof x.id === "string" && Number.isFinite(x.qty),
      )
      .map((x) => ({ id: x.id, qty: Math.max(1, Math.floor(x.qty)) }));
  } catch {
    return [];
  }
}

function write(items: CartItem[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent(EVENT, { detail: items }));
  } catch {
    // ignore
  }
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(read());
    setHydrated(true);

    const onChange = () => setItems(read());
    window.addEventListener(EVENT, onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener(EVENT, onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  const add = useCallback((id: string, qty = 1) => {
    const current = read();
    const idx = current.findIndex((x) => x.id === id);
    let next: CartItem[];
    if (idx >= 0) {
      next = current.map((x, i) =>
        i === idx ? { ...x, qty: Math.max(1, x.qty + qty) } : x,
      );
    } else {
      next = [...current, { id, qty: Math.max(1, qty) }];
    }
    write(next);
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    const current = read();
    if (qty <= 0) {
      write(current.filter((x) => x.id !== id));
      return;
    }
    const next = current.map((x) =>
      x.id === id ? { ...x, qty: Math.max(1, Math.floor(qty)) } : x,
    );
    write(next);
  }, []);

  const remove = useCallback((id: string) => {
    const current = read();
    write(current.filter((x) => x.id !== id));
  }, []);

  const clear = useCallback(() => {
    write([]);
  }, []);

  const totalCount = useMemo(
    () => items.reduce((sum, x) => sum + x.qty, 0),
    [items],
  );

  return {
    items,
    hydrated,
    totalCount,
    add,
    setQty,
    remove,
    clear,
  };
}
