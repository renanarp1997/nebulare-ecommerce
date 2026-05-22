"use client";

import { motion } from "framer-motion";
import {
  ShoppingBag,
  TrendingUp,
  Star,
  Heart,
  Search,
  ShoppingCart,
  Tag,
} from "lucide-react";

const PRODUCTS = [
  {
    name: "Tênis Runner Pro",
    price: "R$ 449,90",
    old: "R$ 599,90",
    rating: 4.9,
    sold: "284 vendidos",
    color: "from-brand-500 to-brand-700",
  },
  {
    name: "Mochila Urban Tech",
    price: "R$ 289,00",
    old: "R$ 359,00",
    rating: 4.8,
    sold: "192 vendidos",
    color: "from-accent-500 to-accent-700",
  },
  {
    name: "Relógio Smart Edge",
    price: "R$ 899,00",
    old: "R$ 1.199,00",
    rating: 5.0,
    sold: "118 vendidos",
    color: "from-brand-600 to-accent-500",
  },
  {
    name: "Fone Wireless Bass",
    price: "R$ 329,90",
    old: "R$ 459,90",
    rating: 4.7,
    sold: "421 vendidos",
    color: "from-accent-600 to-brand-500",
  },
];

type Props = {
  compact?: boolean;
};

export default function DashboardMock({ compact = false }: Props) {
  return (
    <div className="relative">
      {/* Floating decorative blobs */}
      <div className="absolute -inset-8 -z-10 opacity-70">
        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-brand-400/30 blur-3xl" />
        <div className="absolute -left-6 bottom-10 h-44 w-44 rounded-full bg-accent-400/25 blur-3xl" />
      </div>

      <motion.div
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative rounded-3xl border border-ink-200/70 bg-white/90 p-3 shadow-soft backdrop-blur-xl"
      >
        {/* Browser chrome */}
        <div className="flex items-center justify-between rounded-t-2xl bg-ink-50 px-4 py-2.5">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
          </div>
          <div className="hidden items-center gap-2 rounded-lg bg-white px-3 py-1 text-[11px] font-medium text-ink-500 sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
            loja.cliente.com.br
          </div>
          <div className="text-[10px] font-semibold uppercase tracking-wider text-brand-600">
            ao vivo
          </div>
        </div>

        {/* Storefront */}
        <div className="rounded-b-2xl rounded-t-md bg-white p-4 sm:p-5">
          {/* Header da loja */}
          <div className="mb-4 flex items-center justify-between border-b border-ink-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-brand-700 to-brand-500">
                <ShoppingBag className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="font-display text-sm font-bold text-ink-900">
                MinhaLoja
              </span>
            </div>
            <div className="hidden flex-1 max-w-[180px] items-center gap-2 rounded-lg bg-ink-50 px-3 py-1.5 mx-4 sm:flex">
              <Search className="h-3 w-3 text-ink-400" />
              <span className="text-[11px] text-ink-400">Buscar produtos…</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Heart className="h-4 w-4 text-ink-500" />
              <div className="relative">
                <ShoppingCart className="h-4 w-4 text-ink-700" />
                <span className="absolute -right-1.5 -top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-accent-500 text-[8px] font-bold text-white">
                  3
                </span>
              </div>
            </div>
          </div>

          {/* Banner promocional */}
          <div className="mb-4 flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-brand-700 to-brand-500 px-3.5 py-2.5 text-white">
            <Tag className="h-4 w-4 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-bold">FRETE GRÁTIS · acima de R$ 199</p>
              <p className="text-[10px] text-brand-100">Cupom BAZAM10 · 10% off à vista</p>
            </div>
            <span className="rounded-full bg-white/20 px-2 py-0.5 text-[9px] font-bold">
              48h
            </span>
          </div>

          {/* Mais vendidos */}
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-bold text-ink-900">Mais vendidos</p>
            <span className="text-[10px] font-semibold text-brand-700">Ver tudo →</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {PRODUCTS.slice(0, compact ? 2 : 4).map((p) => (
              <div
                key={p.name}
                className="group overflow-hidden rounded-xl border border-ink-100 bg-white transition-all hover:-translate-y-0.5 hover:shadow-card"
              >
                <div
                  className={`relative aspect-[5/4] w-full bg-gradient-to-br ${p.color}`}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.35),transparent_55%)]" />
                  <span className="absolute left-1.5 top-1.5 rounded-md bg-white/95 px-1.5 py-0.5 text-[9px] font-bold text-accent-700">
                    -25%
                  </span>
                  <Heart className="absolute right-1.5 top-1.5 h-3.5 w-3.5 text-white/90" />
                </div>
                <div className="p-2.5">
                  <p className="truncate text-[11px] font-semibold text-ink-900">
                    {p.name}
                  </p>
                  <div className="mt-1 flex items-center gap-1">
                    <Star className="h-2.5 w-2.5 fill-amber-400 text-amber-400" />
                    <span className="text-[10px] font-semibold text-ink-700">
                      {p.rating}
                    </span>
                    <span className="text-[9px] text-ink-400">· {p.sold}</span>
                  </div>
                  <div className="mt-1 flex items-baseline gap-1.5">
                    <span className="text-[9px] text-ink-400 line-through">
                      {p.old}
                    </span>
                    <span className="text-xs font-bold text-ink-900">
                      {p.price}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {!compact && (
            <div className="mt-4 grid grid-cols-3 gap-2">
              {[
                { l: "Pedidos hoje", v: "84", d: "+18%" },
                { l: "Conversão", v: "3,8%", d: "+35%" },
                { l: "Ticket médio", v: "R$ 248", d: "+12%" },
              ].map((s) => (
                <div
                  key={s.l}
                  className="rounded-lg border border-ink-100 bg-ink-50/40 p-2.5"
                >
                  <p className="text-[9px] font-medium uppercase tracking-wider text-ink-400">
                    {s.l}
                  </p>
                  <div className="mt-0.5 flex items-baseline gap-1">
                    <span className="text-sm font-bold text-ink-900">{s.v}</span>
                    <span className="text-[9px] font-semibold text-accent-600">
                      {s.d}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* Floating metric cards */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
        className="absolute -left-4 top-20 hidden rounded-2xl border border-ink-200 bg-white p-3 shadow-card md:flex md:items-center md:gap-2.5"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-50 text-accent-600">
          <TrendingUp className="h-4 w-4" />
        </div>
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wider text-ink-400">
            Venda agora
          </p>
          <p className="text-sm font-bold text-ink-900">+R$ 312 · pedido #10248</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" }}
        className="absolute -right-4 bottom-20 hidden rounded-2xl border border-ink-200 bg-white p-3 shadow-card md:flex md:items-center md:gap-2.5"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
          <ShoppingCart className="h-4 w-4" />
        </div>
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wider text-ink-400">
            Conversão
          </p>
          <p className="text-sm font-bold text-ink-900">
            +35% <span className="text-accent-600">↑</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
