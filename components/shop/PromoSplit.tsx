"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Flame, Timer, Sparkles } from "lucide-react";
import { IMG_LIST } from "@/lib/promo-images";

export default function PromoSplit() {
  return (
    <section className="py-12 lg:py-16">
      <div className="mx-auto max-w-shell px-4 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-12 lg:gap-6">
          {/* Black Bazam — escuro, premium */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative isolate overflow-hidden rounded-[32px] bg-ink-950 p-5 text-white shadow-card sm:p-10 lg:col-span-7"
          >
            <div className="absolute inset-0 -z-10 bg-aurora opacity-60" />
            <div className="pointer-events-none absolute -right-14 -top-14 -z-10 h-60 w-60 rounded-full bg-red-500/45 blur-[100px]" />
            <div className="pointer-events-none absolute -left-10 bottom-0 -z-10 h-60 w-60 rounded-full bg-brand-500/35 blur-[100px]" />

            <div className="relative grid items-center gap-6 sm:grid-cols-12">
              <div className="sm:col-span-7">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur">
                  <Flame className="h-3 w-3 text-accent-400" />
                  Nebulari Night · semana
                </span>
                <h3 className="mt-4 max-w-md font-display text-2xl font-extrabold leading-[1.04] tracking-tight sm:text-3xl lg:text-[40px]">
                  Até{" "}
                  <span className="text-gradient-warm">60% off</span> nos itens
                  que tão dominando o seu FYP.
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70">
                  Drops noturnos de tech, beleza e quarto aesthetic. Estoque
                  apertado e cupom já embutido na vitrine.
                </p>

                <div className="mt-6 flex items-center gap-2 rounded-2xl border border-white/12 bg-white/[0.06] px-2.5 py-2 backdrop-blur-lg sm:gap-3 sm:px-3">
                  <Timer className="h-4 w-4 shrink-0 text-accent-300" />
                  <div className="flex items-center gap-1 sm:gap-1.5">
                    {[
                      { v: "02", l: "dias" },
                      { v: "14", l: "hrs" },
                      { v: "32", l: "min" },
                      { v: "08", l: "seg" },
                    ].map((t) => (
                      <div
                        key={t.l}
                        className="min-w-[32px] rounded-lg bg-white/8 px-1.5 py-1 text-center ring-1 ring-inset ring-white/10 sm:min-w-[36px] sm:px-2"
                      >
                        <span className="block font-display text-sm font-extrabold leading-none tabular-nums">
                          {t.v}
                        </span>
                        <span className="text-[8px] font-semibold uppercase text-white/55">
                          {t.l}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-2.5">
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[13px] font-semibold text-ink-950 transition-all hover:-translate-y-0.5 hover:bg-accent-50"
                  >
                    Ver ofertas
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[11px] font-medium text-white/80">
                    Cupom <span className="font-bold text-white">NEBULA15</span> embutido
                  </span>
                </div>
              </div>
              <div className="relative sm:col-span-5">
                <div className="relative aspect-square w-full max-w-[280px] overflow-hidden rounded-3xl border border-white/15 mx-auto">
                  <Image
                    src={IMG_LIST.promoDark}
                    alt="Coleção em destaque"
                    fill
                    sizes="(max-width:1024px) 280px, 320px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/40 to-transparent" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Drop claro — Smart Home */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative isolate overflow-hidden rounded-[32px] bg-gradient-to-br from-brand-50 via-white to-accent-50 p-5 ring-1 ring-ink-100 sm:p-10 lg:col-span-5"
          >
            <div className="absolute inset-0 -z-10 bg-grid-soft" />
            <div className="pointer-events-none absolute -right-12 -bottom-14 -z-10 h-60 w-60 rounded-full bg-brand-400/30 blur-[80px]" />

            <div className="relative flex h-full flex-col">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-ink-950 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
                <Sparkles className="h-3 w-3 text-accent-300" />
                Drop · novo
              </span>
              <h3 className="mt-4 font-display text-2xl font-extrabold leading-[1.05] tracking-tight text-ink-950 sm:text-[32px]">
                Drop{" "}
                <span className="text-gradient">Glow do Quarto</span>
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-600">
                Mushroom lamp, fita LED RGB, projetor de galáxia e fairy
                lights — tudo pra deixar o quarto no clima.
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {["Drop limitado", "Frete grátis", "Envio em 24h"].map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-white px-2.5 py-1 text-[10px] font-bold text-ink-700 ring-1 ring-ink-100"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="relative mt-6 flex-1 overflow-hidden rounded-2xl">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={IMG_LIST.promoLight}
                    alt="Smart Home 2026"
                    fill
                    sizes="(max-width:1024px) 100vw, 480px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent" />
                </div>
              </div>

              <a
                href="#"
                className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-ink-950 px-5 py-2.5 text-[13px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-brand-800"
              >
                Garantir o meu
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
