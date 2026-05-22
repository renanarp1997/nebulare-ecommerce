"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Flame, Timer, Moon, Sparkles, Zap, ShoppingBag } from "lucide-react";
import ShopHeader from "@/components/shop/ShopHeader";
import ProductSection from "@/components/shop/ProductSection";
import Newsletter from "@/components/shop/Newsletter";
import ShopFooter from "@/components/shop/ShopFooter";
import ProductCard from "@/components/shop/ProductCard";
import { FLASH_DEALS, BESTSELLERS } from "@/lib/store-data";

const pad = (n: number) => n.toString().padStart(2, "0");

export default function DropDaNoitePage() {
  const [time, setTime] = useState({ h: 4, m: 32, s: 18 });

  useEffect(() => {
    const id = setInterval(() => {
      setTime((t) => {
        let s = t.s - 1;
        let m = t.m;
        let h = t.h;
        if (s < 0) {
          s = 59;
          m -= 1;
        }
        if (m < 0) {
          m = 59;
          h -= 1;
        }
        if (h < 0) return { h: 23, m: 59, s: 59 };
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-white">
      <ShopHeader />

      {/* Hero noturno */}
      <section className="relative isolate overflow-hidden bg-ink-950 py-16 text-white sm:py-20">
        <div className="absolute inset-0 -z-10 bg-aurora opacity-80" />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-[0.07]" />
        <div className="pointer-events-none absolute -left-32 top-10 -z-10 h-96 w-96 rounded-full bg-pink-500/30 blur-[120px]" />
        <div className="pointer-events-none absolute -right-32 bottom-10 -z-10 h-96 w-96 rounded-full bg-brand-500/30 blur-[120px]" />

        <div className="mx-auto max-w-shell px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-6 text-center"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-pink-500/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-pink-300 ring-1 ring-pink-400/40">
              <Moon className="h-3 w-3" />
              Só até amanhecer
            </span>

            <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Drop da <span className="text-gradient">noite</span>
            </h1>

            <p className="max-w-xl text-sm text-white/70 sm:text-base">
              Ofertas relâmpago liberadas às 21h. Estoque pequeno, preço cósmico — quando acabar, acabou.
            </p>

            {/* Countdown */}
            <div className="flex items-center gap-3 rounded-2xl bg-white/5 px-5 py-4 ring-1 ring-white/10 backdrop-blur">
              <Timer className="h-5 w-5 text-amber-300" />
              <div className="flex items-center gap-2">
                {[
                  { v: pad(time.h), l: "horas" },
                  { v: pad(time.m), l: "min" },
                  { v: pad(time.s), l: "seg" },
                ].map((t) => (
                  <div
                    key={t.l}
                    className="min-w-[56px] rounded-lg bg-white/10 px-2 py-1.5 text-center ring-1 ring-white/10"
                  >
                    <span className="block font-display text-xl font-extrabold leading-none tabular-nums">
                      {t.v}
                    </span>
                    <span className="text-[9px] font-bold uppercase text-white/55">
                      {t.l}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2">
              {[
                { icon: Zap, label: "Estoque limitado" },
                { icon: Flame, label: "Até 60% off" },
                { icon: Sparkles, label: "Cupom NEBULA10 acumula" },
              ].map((p) => {
                const Icon = p.icon;
                return (
                  <span
                    key={p.label}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 text-[11px] font-semibold text-white/85 ring-1 ring-white/10"
                  >
                    <Icon className="h-3 w-3 text-accent-300" />
                    {p.label}
                  </span>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Grid de ofertas — flash deals em grid maior */}
      <section className="py-12 sm:py-14">
        <div className="mx-auto max-w-shell px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-accent-500 text-white shadow-lift">
                <Flame className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-pink-600">
                  Drop ativo agora
                </p>
                <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink-950 sm:text-[28px]">
                  Ofertas relâmpago
                </h2>
              </div>
            </div>
            <span className="hidden items-center gap-1.5 rounded-full bg-pink-50 px-3 py-1 text-[11px] font-bold text-pink-700 sm:inline-flex">
              <ShoppingBag className="h-3 w-3" />
              {FLASH_DEALS.length} produtos no drop
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {FLASH_DEALS.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <ProductSection
        eyebrow="Pode acabar antes"
        title="Mais cobiçados do drop."
        description="Os que estão saindo mais rápido nas últimas horas — bora pegar antes de zerar?"
        products={BESTSELLERS}
        tone="muted"
        accent="pink"
      />

      <Newsletter />
      <ShopFooter />
    </main>
  );
}
