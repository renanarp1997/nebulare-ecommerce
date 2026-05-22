"use client";

import { motion } from "framer-motion";
import { Sparkles, Calendar, Package, Truck, BellRing } from "lucide-react";
import ShopHeader from "@/components/shop/ShopHeader";
import ProductSection from "@/components/shop/ProductSection";
import Newsletter from "@/components/shop/Newsletter";
import ShopFooter from "@/components/shop/ShopFooter";
import ProductCard from "@/components/shop/ProductCard";
import { NEW_ARRIVALS, FOR_YOU } from "@/lib/store-data";

const TIMELINE = [
  { day: "Hoje", count: "8 itens", color: "from-brand-600 to-accent-500" },
  { day: "Ontem", count: "12 itens", color: "from-pink-500 to-accent-500" },
  { day: "Essa semana", count: "47 itens", color: "from-aux-500 to-brand-600" },
];

export default function RecemChegadosPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white">
      <ShopHeader />

      {/* Hero novidade */}
      <section className="relative isolate overflow-hidden py-16 sm:py-20">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-50 via-white to-accent-50" />
        <div className="pointer-events-none absolute -left-32 top-0 -z-10 h-96 w-96 rounded-full bg-brand-300/40 blur-[120px]" />
        <div className="pointer-events-none absolute -right-32 bottom-0 -z-10 h-96 w-96 rounded-full bg-accent-300/40 blur-[120px]" />

        <div className="mx-auto max-w-shell px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-5 text-center"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-500/95 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm">
              <Sparkles className="h-3 w-3" />
              Acabou de cair
            </span>

            <h1 className="font-display text-4xl font-extrabold tracking-tight text-ink-950 sm:text-5xl lg:text-6xl">
              Recém <span className="text-gradient">chegados</span>
            </h1>

            <p className="max-w-xl text-sm text-ink-600 sm:text-base">
              Drops da semana com estoque limitado, envio em 24h pra capitais e cupom de pré-venda quando rola.
            </p>

            <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
              {TIMELINE.map((t) => (
                <span
                  key={t.day}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[12px] font-semibold text-ink-700 shadow-card ring-1 ring-ink-100"
                >
                  <span className={`h-2 w-2 rounded-full bg-gradient-to-br ${t.color}`} />
                  {t.day}
                  <span className="text-ink-400">·</span>
                  <span className="text-ink-950 font-bold">{t.count}</span>
                </span>
              ))}
            </div>

            <a
              href="#novidades"
              className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-ink-950 px-4 py-2 text-[12px] font-bold text-white transition-colors hover:bg-brand-800"
            >
              <BellRing className="h-3.5 w-3.5" />
              Avise-me dos próximos drops
            </a>
          </motion.div>
        </div>
      </section>

      {/* Grid de novidades */}
      <section id="novidades" className="py-12 sm:py-14">
        <div className="mx-auto max-w-shell px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-500 to-brand-600 text-white shadow-lift">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-accent-700">
                  Atualizado agora
                </p>
                <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink-950 sm:text-[28px]">
                  Acabou de cair na vitrine
                </h2>
              </div>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-ink-600">
              <Package className="h-3.5 w-3.5 text-brand-700" />
              <span><strong>Estoque limitado</strong> · primeiros 100 só com cupom <strong>PRENOVO</strong></span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {NEW_ARRIVALS.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Banner: envio em 24h */}
      <section className="py-8 sm:py-12">
        <div className="mx-auto max-w-shell px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-800 to-ink-950 p-8 text-white sm:p-12">
            <div className="pointer-events-none absolute -right-12 -top-12 h-60 w-60 rounded-full bg-accent-500/40 blur-[80px]" />
            <div className="pointer-events-none absolute -bottom-12 -left-12 h-60 w-60 rounded-full bg-pink-500/30 blur-[80px]" />
            <div className="relative flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white/90 ring-1 ring-white/20">
                  <Truck className="h-3 w-3" />
                  Envio rápido
                </span>
                <h3 className="mt-2 font-display text-2xl font-extrabold sm:text-3xl">
                  Novidade no carrinho até 17h?
                </h3>
                <p className="mt-1 text-sm text-white/70">
                  Sai pra capitais em 24h, com rastreio cósmico em tempo real.
                </p>
              </div>
              <div className="flex flex-col items-start gap-1">
                <span className="font-display text-3xl font-extrabold text-accent-300">24h</span>
                <span className="text-[11px] uppercase tracking-wider text-white/60">prazo capital</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProductSection
        eyebrow="Combinam com os drops"
        title="Match com a vibe nova."
        description="Itens que casam com os recém-chegados — beleza, room, streetwear e mais."
        products={FOR_YOU}
        tone="muted"
        accent="pink"
      />

      <Newsletter />
      <ShopFooter />
    </main>
  );
}
