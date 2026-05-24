"use client";

import { useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  Plus,
  Minus,
  ShoppingBag,
  Truck,
  Tag,
  Sparkles,
  ArrowRight,
  Trash2,
} from "lucide-react";
import { useCart, type CartItem } from "@/lib/cart";
import { ALL_PRODUCTS } from "@/lib/search";
import type { Product } from "@/lib/store-data";

const FREE_SHIPPING_AT = 149;

function brl(n: number) {
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function SideCart({ open, onClose }: Props) {
  const { items, hydrated, setQty, remove, clear, totalCount } = useCart();

  const lineItems = useMemo<{ product: Product; qty: number }[]>(() => {
    const byId = new Map(ALL_PRODUCTS.map((p) => [p.id, p]));
    return items
      .map((i: CartItem) => {
        const product = byId.get(i.id);
        return product ? { product, qty: i.qty } : null;
      })
      .filter((x): x is { product: Product; qty: number } => !!x);
  }, [items]);

  const totals = useMemo(() => {
    const subtotal = lineItems.reduce(
      (sum, l) => sum + l.product.price * l.qty,
      0,
    );
    const oldSubtotal = lineItems.reduce(
      (sum, l) => sum + (l.product.oldPrice ?? l.product.price) * l.qty,
      0,
    );
    const economy = Math.max(oldSubtotal - subtotal, 0);
    return { subtotal, oldSubtotal, economy };
  }, [lineItems]);

  const installment = totals.subtotal / 6;
  const freeShipDelta = Math.max(FREE_SHIPPING_AT - totals.subtotal, 0);
  const freeShipPct = Math.min(
    (totals.subtotal / FREE_SHIPPING_AT) * 100,
    100,
  );

  // Fecha com Esc + bloqueia scroll do body.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  const isEmpty = hydrated && lineItems.length === 0;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-ink-950/40 backdrop-blur-[2px]"
            aria-hidden
          />

          {/* Drawer */}
          <motion.aside
            role="dialog"
            aria-label="Carrinho de compras"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-0 top-0 z-[70] flex h-[100dvh] w-full max-w-[420px] flex-col bg-white shadow-lift"
          >
            {/* Header */}
            <header className="flex items-center justify-between gap-3 border-b border-ink-100 px-5 py-4">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4 text-ink-950" />
                <p className="font-display text-[15px] font-extrabold uppercase tracking-[0.18em] text-ink-950">
                  Carrinho de compras
                </p>
                {totalCount > 0 && (
                  <span className="rounded-full bg-ink-950 px-2 py-0.5 text-[10px] font-bold text-white">
                    {totalCount}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                aria-label="Fechar carrinho"
                className="flex h-9 w-9 items-center justify-center rounded-full text-ink-700 hover:bg-ink-100"
              >
                <X className="h-5 w-5" />
              </button>
            </header>

            {/* Free shipping progress */}
            {!isEmpty && (
              <div className="border-b border-ink-100 px-5 py-3">
                {freeShipDelta > 0 ? (
                  <p className="text-[12px] text-ink-700">
                    Falta{" "}
                    <strong className="text-ink-950">
                      {brl(freeShipDelta)}
                    </strong>{" "}
                    pro <strong className="text-aux-700">frete grátis</strong> 🚀
                  </p>
                ) : (
                  <p className="flex items-center gap-1.5 text-[12px] font-bold text-aux-700">
                    <Truck className="h-3 w-3" />
                    Frete grátis liberado!
                  </p>
                )}
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-ink-100">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${freeShipPct}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-aux-500 via-brand-600 to-accent-500"
                  />
                </div>
              </div>
            )}

            {/* Body */}
            <div className="flex-1 overflow-y-auto">
              {!hydrated ? (
                <div className="p-10 text-center text-sm text-ink-500">
                  Carregando seu carrinho...
                </div>
              ) : isEmpty ? (
                <EmptyCart onClose={onClose} />
              ) : (
                <ul className="divide-y divide-ink-100 px-5">
                  <AnimatePresence initial={false}>
                    {lineItems.map((l) => (
                      <CartLine
                        key={l.product.id}
                        product={l.product}
                        qty={l.qty}
                        onInc={() => setQty(l.product.id, l.qty + 1)}
                        onDec={() => setQty(l.product.id, l.qty - 1)}
                        onRemove={() => remove(l.product.id)}
                      />
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {/* Footer */}
            {!isEmpty && hydrated && (
              <footer className="border-t border-ink-100 bg-white px-5 py-4">
                {totals.economy > 0 && (
                  <div className="mb-2 flex items-center justify-between text-[12px] text-aux-700">
                    <span>Você economiza</span>
                    <span className="font-bold">−{brl(totals.economy)}</span>
                  </div>
                )}
                <div className="flex items-baseline justify-between">
                  <span className="text-[12px] font-bold uppercase tracking-wider text-ink-600">
                    Subtotal
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-xl font-extrabold text-ink-950">
                      {brl(totals.subtotal)}
                    </span>
                    <span className="text-[11px] font-bold text-aux-700">
                      6× de {brl(installment)}
                    </span>
                  </div>
                </div>
                <p className="mt-1 text-[10.5px] text-ink-500">
                  O cálculo de frete será feito no checkout.
                </p>

                <Link
                  href="/checkout"
                  onClick={onClose}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-aux-500 to-aux-600 px-5 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-glow transition-all hover:-translate-y-0.5 hover:from-aux-600 hover:to-aux-700"
                >
                  Finalizar compra
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <div className="mt-2.5 flex items-center justify-between gap-2">
                  <button
                    onClick={onClose}
                    className="flex-1 text-center text-[12px] font-semibold text-ink-700 underline-offset-2 hover:underline"
                  >
                    Continuar comprando
                  </button>
                  <Link
                    href="/cupom-nebula10"
                    onClick={onClose}
                    className="flex items-center gap-1 text-[12px] font-semibold text-brand-700 hover:underline"
                  >
                    <Tag className="h-3 w-3" />
                    Tenho cupom
                  </Link>
                  <button
                    onClick={() => {
                      if (
                        confirm("Esvaziar o carrinho? Os itens serão removidos.")
                      ) {
                        clear();
                      }
                    }}
                    aria-label="Limpar carrinho"
                    className="flex items-center gap-1 text-[12px] font-semibold text-pink-700 hover:underline"
                  >
                    <Trash2 className="h-3 w-3" />
                    Limpar
                  </button>
                </div>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function CartLine({
  product: p,
  qty,
  onInc,
  onDec,
  onRemove,
}: {
  product: Product;
  qty: number;
  onInc: () => void;
  onDec: () => void;
  onRemove: () => void;
}) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{ duration: 0.2 }}
      className="flex gap-3 py-4"
    >
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-ink-100">
        {p.image ? (
          <Image
            src={p.image}
            alt={p.name}
            fill
            sizes="80px"
            className="object-cover"
          />
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${p.gradient}`} />
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-brand-700/85">
          {p.brand}
        </p>
        <h3 className="line-clamp-2 text-[12.5px] font-semibold leading-snug text-ink-950">
          {p.name}
        </h3>

        <div className="mt-1 flex items-baseline gap-1.5">
          {p.oldPrice && (
            <span className="text-[10px] text-ink-400 line-through">
              {brl(p.oldPrice)}
            </span>
          )}
          <span className="font-display text-[14px] font-extrabold text-ink-950">
            {brl(p.price)}
          </span>
        </div>

        <div className="mt-2 flex items-center justify-between gap-2">
          <div className="inline-flex items-center rounded-xl bg-ink-50 ring-1 ring-ink-200">
            <button
              onClick={onDec}
              aria-label="Diminuir quantidade"
              className="flex h-7 w-7 items-center justify-center text-ink-700 hover:text-ink-950"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="min-w-[20px] text-center text-[12px] font-bold text-ink-950">
              {qty}
            </span>
            <button
              onClick={onInc}
              aria-label="Aumentar quantidade"
              className="flex h-7 w-7 items-center justify-center text-ink-700 hover:text-ink-950"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
          <button
            onClick={onRemove}
            className="text-[11px] font-semibold text-ink-500 underline-offset-2 hover:text-pink-700 hover:underline"
          >
            Remover
          </button>
        </div>
      </div>
    </motion.li>
  );
}

function EmptyCart({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-brand-100 to-accent-100">
        <ShoppingBag className="h-7 w-7 text-brand-700" />
      </div>
      <h3 className="mt-4 font-display text-lg font-extrabold text-ink-950">
        Carrinho vazio
      </h3>
      <p className="mt-1 max-w-xs text-sm text-ink-500">
        Bora começar? Clica em "Adicionar" nos produtos que você curtir.
      </p>
      <div className="mt-5 flex flex-col gap-2 self-stretch">
        <Link
          href="/mais-vendidos"
          onClick={onClose}
          className="inline-flex items-center justify-center gap-1.5 rounded-2xl bg-ink-950 px-4 py-3 text-[13px] font-bold text-white hover:bg-brand-800"
        >
          Ver mais vendidos
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/drop-da-noite"
          onClick={onClose}
          className="inline-flex items-center justify-center gap-1.5 rounded-2xl bg-white px-4 py-3 text-[13px] font-bold text-ink-950 ring-1 ring-ink-200 hover:bg-ink-50"
        >
          <Sparkles className="h-3.5 w-3.5 text-accent-500" />
          Drops da semana
        </Link>
      </div>
    </div>
  );
}
