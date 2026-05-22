"use client";

import { motion } from "framer-motion";
import { Zap, TrendingUp, Star, Award, Users } from "lucide-react";
import ShopHeader from "@/components/shop/ShopHeader";
import ProductSection from "@/components/shop/ProductSection";
import Newsletter from "@/components/shop/Newsletter";
import ShopFooter from "@/components/shop/ShopFooter";
import ProductCard from "@/components/shop/ProductCard";
import {
  BESTSELLERS,
  BEAUTY,
  TECH,
  STREETWEAR,
  PLUSH,
} from "@/lib/store-data";

const RANK_PODIUM = BESTSELLERS.slice(0, 3);
const REST = BESTSELLERS.slice(3);

const STATS = [
  { value: "+12k", label: "vendidos no mês", icon: TrendingUp },
  { value: "4.9★", label: "avaliação média", icon: Star },
  { value: "98%", label: "recomendam", icon: Users },
];

export default function MaisVendidosPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white">
      <ShopHeader />

      {/* Hero ranking */}
      <section className="relative isolate overflow-hidden py-16 sm:py-20">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-amber-50 via-white to-brand-50/70" />
        <div className="pointer-events-none absolute -left-32 top-0 -z-10 h-96 w-96 rounded-full bg-amber-300/30 blur-[120px]" />
        <div className="pointer-events-none absolute -right-32 bottom-0 -z-10 h-96 w-96 rounded-full bg-brand-300/30 blur-[120px]" />

        <div className="mx-auto max-w-shell px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-5 text-center"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/95 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-ink-950 shadow-sm">
              <Award className="h-3 w-3" />
              Top da semana
            </span>

            <h1 className="font-display text-4xl font-extrabold tracking-tight text-ink-950 sm:text-5xl lg:text-6xl">
              Os mais <span className="text-gradient">vendidos</span> do mês
            </h1>

            <p className="max-w-xl text-sm text-ink-600 sm:text-base">
              Ranking atualizado a cada 24h pelos itens mais comprados da Nebulari. Curadoria automática, escolha real.
            </p>

            <div className="mt-2 grid grid-cols-3 gap-3 sm:gap-6">
              {STATS.map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className="flex flex-col items-center gap-1">
                    <Icon className="h-4 w-4 text-amber-600" />
                    <p className="font-display text-lg font-extrabold text-ink-950 sm:text-2xl">
                      {s.value}
                    </p>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-500 sm:text-xs">
                      {s.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pódio Top 3 */}
      <section className="pb-12">
        <div className="mx-auto max-w-shell px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 font-display text-xl font-extrabold tracking-tight text-ink-950 sm:text-2xl">
            🏆 Pódio do mês
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {RANK_PODIUM.map((p, i) => (
              <div key={p.id} className="relative">
                <div className="absolute -top-3 left-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 to-amber-500 font-display text-base font-black text-ink-950 shadow-lift ring-2 ring-white">
                  #{i + 1}
                </div>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resto do ranking */}
      <section className="bg-ink-50/50 py-12">
        <div className="mx-auto max-w-shell px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-accent-500 text-white shadow-lift">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-brand-700">
                Posições 4 a 6
              </p>
              <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink-950">
                Continua bombando
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
            {REST.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Mais vendidos por categoria */}
      <ProductSection
        eyebrow="Top de beleza"
        title="Glow team aprova."
        description="Os queridinhos da seção beleza, votados pelas reviews 4.8+ da semana."
        products={BEAUTY}
        accent="pink"
      />
      <ProductSection
        eyebrow="Top tech"
        title="Som que rouba a cena."
        description="Earbuds, headphones e ring lights — o trio mais pedido pela galera criadora."
        products={TECH}
        tone="muted"
      />
      <ProductSection
        eyebrow="Top streetwear"
        title="Drip aprovado."
        description="Hoodies oversized e tênis chunky lideram a vitrine essa semana."
        products={STREETWEAR}
        accent="brand"
      />
      <ProductSection
        eyebrow="Top cozy"
        title="Conforto que viraliza."
        description="Plushies e cobertores sherpa que aparecem nos rooms tours mais salvos."
        products={PLUSH}
        tone="muted"
        accent="accent"
      />

      <Newsletter />
      <ShopFooter />
    </main>
  );
}
