"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Minus, Plus, ShoppingBag, Truck } from "lucide-react";
import type { Product } from "@/lib/store-data";
import { openCart, useCart } from "@/lib/cart";

type Props = {
  product: Product;
};

function brl(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export default function ProductBuyPanel({ product }: Props) {
  const router = useRouter();
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [cep, setCep] = useState("");
  const [freightChecked, setFreightChecked] = useState(false);

  const installments = product.installments ?? 6;
  const pixPrice = product.price * 0.9;

  function addToCart(open = true) {
    add(product.id, qty);
    if (open) openCart();
  }

  function buyNow() {
    addToCart(false);
    router.push(`/checkout?buy=${encodeURIComponent(product.id)}&qty=${qty}`);
  }

  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-ink-100 bg-white p-5 shadow-card">
        {product.oldPrice && (
          <div className="mb-1 flex items-center gap-2">
            <span className="text-sm text-ink-400 line-through">
              {brl(product.oldPrice)}
            </span>
            <span className="rounded-full bg-red-50 px-2 py-0.5 text-[11px] font-black text-red-600">
              -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
            </span>
          </div>
        )}
        <p className="font-display text-4xl font-extrabold tracking-tight text-ink-950">
          {brl(product.price)}
        </p>
        <p className="mt-1 text-sm text-ink-600">
          ou {installments}x de{" "}
          <span className="font-bold text-ink-900">
            {brl(product.price / installments)}
          </span>{" "}
          sem juros
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="rounded-full bg-aux-50 px-2.5 py-1 text-[11px] font-bold text-aux-700">
            Pix por {brl(pixPrice)}
          </span>
          {product.freeShipping && (
            <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-bold text-brand-700">
              Frete gratis
            </span>
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-ink-100 bg-white p-4 shadow-card">
        <p className="flex items-center gap-2 text-[11px] font-black uppercase tracking-wider text-ink-950">
          <Truck className="h-4 w-4 text-brand-600" />
          Calcular frete e prazo
        </p>
        <div className="mt-3 flex gap-2">
          <input
            value={cep}
            onChange={(e) => {
              setCep(e.target.value);
              setFreightChecked(false);
            }}
            inputMode="numeric"
            placeholder="00000-000"
            className="h-11 min-w-0 flex-1 rounded-xl border border-ink-200 px-3 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          />
          <button
            type="button"
            onClick={() => setFreightChecked(true)}
            className="h-11 rounded-xl bg-ink-950 px-4 text-xs font-bold text-white transition hover:bg-brand-800"
          >
            Calcular
          </button>
        </div>
        {freightChecked && (
          <p className="mt-2 text-xs font-semibold text-aux-700">
            Entrega expressa em 2 a 4 dias uteis para sua regiao.
          </p>
        )}
      </section>

      <section className="space-y-2">
        <div className="flex gap-2">
          <div className="flex h-12 w-28 shrink-0 items-center justify-between rounded-xl border border-ink-200 bg-white px-2">
            <button
              type="button"
              aria-label="Diminuir quantidade"
              onClick={() => setQty((value) => Math.max(1, value - 1))}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-600 hover:bg-ink-50"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="text-sm font-black text-ink-950">{qty}</span>
            <button
              type="button"
              aria-label="Aumentar quantidade"
              onClick={() => setQty((value) => Math.min(9, value + 1))}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-600 hover:bg-ink-50"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <button
            type="button"
            onClick={() => addToCart(true)}
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-brand-700 px-4 text-xs font-black text-white transition hover:bg-brand-800 hover:shadow-glow"
          >
            <ShoppingBag className="h-4 w-4" />
            Adicionar a sacola
          </button>
        </div>
        <button
          type="button"
          onClick={buyNow}
          className="h-12 w-full rounded-xl bg-ink-950 px-4 text-xs font-black text-white transition hover:bg-brand-800"
        >
          Comprar agora
        </button>
      </section>
    </div>
  );
}
