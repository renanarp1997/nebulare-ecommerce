"use client";

import { motion } from "framer-motion";
import {
  Gift,
  Heart,
  Sparkles,
  Bell,
  Share2,
  TrendingUp,
} from "lucide-react";
import ShopHeader from "@/components/shop/ShopHeader";
import ProductSection from "@/components/shop/ProductSection";
import Newsletter from "@/components/shop/Newsletter";
import ShopFooter from "@/components/shop/ShopFooter";
import ProductCard from "@/components/shop/ProductCard";
import { Y2K, ROOM, BEAUTY, PERFUMES, FOR_YOU } from "@/lib/store-data";

const CURATED = [
  ROOM[2],   // Letreiro Neon
  Y2K[0],    // Set 7 Anéis
  BEAUTY[1], // Kit Glass Skin
  PERFUMES[1], // Eau de Parfum
  ROOM[3],   // Disco Ball
  Y2K[3],    // Bolsa Baguete
  BEAUTY[3], // Pincéis 12 peças
  PERFUMES[3], // Perfume Nebulari Edition
];

const STATS = [
  { value: "8.2k", label: "salvaram esse mês", icon: Heart },
  { value: "+340", label: "novidades curadas", icon: Sparkles },
  { value: "62%", label: "viram presente", icon: Gift },
];

export default function WishlistPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white">
      <ShopHeader />

      {/* Hero wishlist */}
      <section className="relative isolate overflow-hidden py-16 sm:py-20">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-fuchsia-50 via-white to-pink-50" />
        <div className="pointer-events-none absolute -left-32 top-0 -z-10 h-96 w-96 rounded-full bg-fuchsia-300/40 blur-[120px]" />
        <div className="pointer-events-none absolute -right-32 bottom-0 -z-10 h-96 w-96 rounded-full bg-pink-300/40 blur-[120px]" />

        <div className="mx-auto max-w-shell px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-5 text-center"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-fuchsia-500/95 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm">
              <Gift className="h-3 w-3" />
              Curadoria do mês
            </span>

            <h1 className="font-display text-4xl font-extrabold tracking-tight text-ink-950 sm:text-5xl lg:text-6xl">
              Wishlist do <span className="text-gradient">mês</span>
            </h1>

            <p className="max-w-xl text-sm text-ink-600 sm:text-base">
              Os itens que estão dominando os boards: salvos, compartilhados e mais pedidos como presente na Nebulari.
            </p>

            <div className="mt-2 grid grid-cols-3 gap-3 sm:gap-6">
              {STATS.map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className="flex flex-col items-center gap-1">
                    <Icon className="h-4 w-4 text-fuchsia-600" />
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

            <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
              <button className="inline-flex items-center gap-1.5 rounded-full bg-ink-950 px-4 py-2 text-[12px] font-bold text-white transition-colors hover:bg-brand-800">
                <Heart className="h-3.5 w-3.5" />
                Salvar minha lista
              </button>
              <button className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[12px] font-bold text-ink-950 ring-1 ring-ink-200 transition-all hover:-translate-y-0.5 hover:shadow-card">
                <Share2 className="h-3.5 w-3.5" />
                Compartilhar
              </button>
              <button className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[12px] font-bold text-ink-950 ring-1 ring-ink-200 transition-all hover:-translate-y-0.5 hover:shadow-card">
                <Bell className="h-3.5 w-3.5" />
                Alerta de preço
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Editor's pick — 8 cards */}
      <section className="py-12 sm:py-14">
        <div className="mx-auto max-w-shell px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 to-pink-500 text-white shadow-lift">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-fuchsia-700">
                  Editor's pick
                </p>
                <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink-950 sm:text-[28px]">
                  Os 8 mais salvos do mês
                </h2>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-ink-500">
              <TrendingUp className="h-3 w-3" />
              ranking atualizado essa semana
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {CURATED.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Banner: presentei pra alguém */}
      <section className="py-8 sm:py-12">
        <div className="mx-auto max-w-shell px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-fuchsia-600 via-pink-600 to-accent-600 p-8 text-white sm:p-12">
            <div className="pointer-events-none absolute -right-12 -top-12 h-60 w-60 rounded-full bg-white/20 blur-[80px]" />
            <div className="pointer-events-none absolute -bottom-12 -left-12 h-60 w-60 rounded-full bg-fuchsia-300/30 blur-[80px]" />
            <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.08]" />

            <div className="relative grid grid-cols-1 items-center gap-6 sm:grid-cols-[1fr_auto]">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white ring-1 ring-white/25">
                  <Gift className="h-3 w-3" />
                  Modo presente
                </span>
                <h3 className="mt-2 font-display text-2xl font-extrabold sm:text-3xl">
                  Embala bonito e manda pra quem você ama.
                </h3>
                <p className="mt-1.5 text-sm text-white/85">
                  Box cósmica + bilhete personalizado + frete reverso pra trocas em até 30 dias.
                </p>
              </div>
              <a
                href="#"
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white px-5 py-3 text-sm font-bold text-fuchsia-700 transition-all hover:-translate-y-0.5 hover:shadow-soft"
              >
                Ativar modo presente
              </a>
            </div>
          </div>
        </div>
      </section>

      <ProductSection
        eyebrow="Salvinhos da galera"
        title="Beleza & glass skin."
        description="Os mais favoritados da seção beleza esse mês."
        products={BEAUTY}
        accent="pink"
      />

      <ProductSection
        eyebrow="Cheirinho cósmico"
        title="Perfumes mais pedidos."
        description="Body mist, eau de parfum e vela aromática lideram a lista."
        products={PERFUMES}
        tone="muted"
        accent="accent"
      />

      <ProductSection
        eyebrow="Y2K core"
        title="Acessórios mais clicados."
        description="Anéis, colar layering, óculos oval — o trio Y2K que sai em todo room tour."
        products={Y2K}
        accent="brand"
      />

      <ProductSection
        eyebrow="Pra você"
        title="Continua na sua wishlist."
        description="Recomendações baseadas no que você já salvou."
        products={FOR_YOU}
        tone="muted"
      />

      <Newsletter />
      <ShopFooter />
    </main>
  );
}
