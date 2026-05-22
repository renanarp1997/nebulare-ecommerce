"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Tag,
  Copy,
  Check,
  ShoppingBag,
  CreditCard,
  ShieldCheck,
  Sparkles,
  Gift,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import ShopHeader from "@/components/shop/ShopHeader";
import ProductSection from "@/components/shop/ProductSection";
import Newsletter from "@/components/shop/Newsletter";
import ShopFooter from "@/components/shop/ShopFooter";
import { BESTSELLERS, FOR_YOU } from "@/lib/store-data";

const STEPS = [
  {
    icon: ShoppingBag,
    title: "Escolhe os queridinhos",
    desc: "Monta o carrinho do jeito que quiser. Sem mínimo de produtos.",
  },
  {
    icon: Tag,
    title: "Cola o cupom NEBULA10",
    desc: "No checkout, cola o código no campo cupom. Desconto aparece na hora.",
  },
  {
    icon: CreditCard,
    title: "Finaliza com 10% off",
    desc: "Vale em qualquer forma de pagamento. Acumula com frete grátis R$ 149+.",
  },
];

const PERKS = [
  { icon: Sparkles, title: "Acumula com frete grátis", desc: "Use junto com a faixa de R$ 149+ pra zerar o envio." },
  { icon: Gift, title: "Sem mínimo escondido", desc: "Funciona em qualquer pedido — pequeno ou grande." },
  { icon: ShieldCheck, title: "Válido em todas as marcas", desc: "Roda em LUNA, HALO, ORBIT, DRIFT, COSMO e cia." },
];

const TERMS = [
  "Cupom válido para clientes Nebulari, uma vez por CPF.",
  "Não acumula com outros cupons promocionais (mas acumula com frete grátis).",
  "Não vale para produtos da categoria Console e Cadeira Gamer.",
  "Aplicado sobre o valor dos produtos, antes do frete.",
];

export default function CupomNebula10Page() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("NEBULA10");
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-white">
      <ShopHeader />

      {/* Hero do cupom */}
      <section className="relative isolate overflow-hidden py-16 sm:py-20">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-accent-50 via-white to-brand-50" />
        <div className="pointer-events-none absolute -left-32 top-0 -z-10 h-96 w-96 rounded-full bg-accent-300/40 blur-[120px]" />
        <div className="pointer-events-none absolute -right-32 bottom-0 -z-10 h-96 w-96 rounded-full bg-brand-300/30 blur-[120px]" />

        <div className="mx-auto max-w-shell px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-600/95 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm">
                <Tag className="h-3 w-3" />
                Cupom da casa
              </span>

              <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-ink-950 sm:text-5xl lg:text-6xl">
                10% off com{" "}
                <span className="text-gradient">NEBULA10</span>
              </h1>

              <p className="mt-4 max-w-lg text-sm text-ink-600 sm:text-base">
                Cupom universal da Nebulari. Cola no checkout, sem mínimo, válido em todas as marcas — e ainda acumula com frete grátis acima de R$ 149.
              </p>

              <div className="mt-6 flex items-center gap-2">
                <a
                  href="/"
                  className="inline-flex items-center gap-1.5 rounded-full bg-ink-950 px-5 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-brand-800 hover:shadow-glow"
                >
                  Quero usar agora <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#regras"
                  className="text-[12px] font-semibold text-ink-600 hover:text-ink-950"
                >
                  Ver regras
                </a>
              </div>
            </motion.div>

            {/* Cupom card */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-brand-700 via-brand-800 to-ink-950 p-8 text-white shadow-lift sm:p-10">
                <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-accent-500/40 blur-[80px]" />
                <div className="pointer-events-none absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-pink-500/30 blur-[80px]" />
                <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.07]" />

                {/* Recortes laterais (efeito cupom) */}
                <span className="absolute -left-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-white" />
                <span className="absolute -right-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-white" />

                <div className="relative">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
                      Cupom · Nebulari
                    </span>
                    <Sparkles className="h-4 w-4 text-accent-300" />
                  </div>

                  <p className="mt-4 font-display text-[64px] font-black leading-none tracking-tight text-white sm:text-[80px]">
                    10%
                  </p>
                  <p className="text-sm font-semibold text-white/80">off no carrinho inteiro</p>

                  <div className="mt-6 border-t border-dashed border-white/20 pt-6">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-white/50">
                      Use o código
                    </p>
                    <div className="mt-2 flex items-center gap-2 rounded-2xl bg-white/10 p-2 ring-1 ring-white/15 backdrop-blur">
                      <code className="flex-1 px-3 font-display text-2xl font-extrabold tracking-[0.18em] text-white">
                        NEBULA10
                      </code>
                      <button
                        onClick={handleCopy}
                        className="flex items-center gap-1.5 rounded-xl bg-white px-3.5 py-2 text-[12px] font-bold text-ink-950 transition-all hover:-translate-y-0.5 hover:shadow-soft"
                      >
                        {copied ? (
                          <>
                            <Check className="h-3.5 w-3.5 text-aux-600" />
                            Copiado
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5" />
                            Copiar
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <p className="mt-4 text-[11px] text-white/55">
                    Sem mínimo · acumula com frete grátis · 1× por CPF
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Como usar */}
      <section className="py-14">
        <div className="mx-auto max-w-shell px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <p className="text-[10px] font-bold uppercase tracking-wider text-brand-700">
              Em 3 passos
            </p>
            <h2 className="mt-1 font-display text-2xl font-extrabold tracking-tight text-ink-950 sm:text-3xl">
              Como usar o NEBULA10
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="relative overflow-hidden rounded-3xl bg-white p-6 ring-1 ring-ink-100 shadow-card"
                >
                  <span className="absolute right-4 top-3 font-display text-5xl font-black text-ink-100">
                    0{i + 1}
                  </span>
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-accent-500 text-white shadow-glow">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-extrabold text-ink-950">
                    {s.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-ink-600">{s.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="bg-ink-50/60 py-14">
        <div className="mx-auto max-w-shell px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 font-display text-2xl font-extrabold tracking-tight text-ink-950">
            Por que o NEBULA10 é diferente
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {PERKS.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="flex flex-col gap-3 rounded-2xl bg-white p-5 ring-1 ring-ink-100"
                >
                  <Icon className="h-5 w-5 text-accent-600" />
                  <h3 className="font-display text-base font-extrabold text-ink-950">
                    {p.title}
                  </h3>
                  <p className="text-[13px] text-ink-600">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <ProductSection
        eyebrow="Pode aplicar nesses"
        title="Bestsellers com 10% on top."
        description="Quer testar? Pega esses queridinhos e aplica NEBULA10 no checkout."
        products={BESTSELLERS}
        accent="accent"
      />

      {/* Regras */}
      <section id="regras" className="bg-ink-50/60 py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white p-6 ring-1 ring-ink-100 sm:p-8">
            <div className="flex items-center gap-2.5">
              <AlertCircle className="h-4 w-4 text-brand-700" />
              <h2 className="font-display text-lg font-extrabold text-ink-950">
                Regras do cupom
              </h2>
            </div>
            <ul className="mt-4 space-y-2.5">
              {TERMS.map((t) => (
                <li
                  key={t}
                  className="flex items-start gap-2 text-[13px] text-ink-700"
                >
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-aux-600" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <ProductSection
        eyebrow="Pode usar aqui também"
        title="Combina com a sua vibe."
        description="Os recomendados pra você já entram com 10% off no checkout."
        products={FOR_YOU}
        tone="muted"
        accent="pink"
      />

      <Newsletter />
      <ShopFooter />
    </main>
  );
}
