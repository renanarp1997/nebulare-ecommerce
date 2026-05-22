"use client";

import { motion } from "framer-motion";
import { TrendingUp, ShoppingCart, DollarSign, Clock } from "lucide-react";

const RESULTS = [
  {
    icon: TrendingUp,
    metric: "+35%",
    label: "em conversão",
    desc: "Páginas otimizadas, checkout afinado e CRO contínuo nos pontos de fuga.",
    tone: "accent",
  },
  {
    icon: ShoppingCart,
    metric: "-28%",
    label: "em abandono de carrinho",
    desc: "Fluxos de recuperação por e-mail, SMS e WhatsApp acionados em tempo real.",
    tone: "brand",
  },
  {
    icon: DollarSign,
    metric: "+60%",
    label: "em faturamento",
    desc: "Mídia, catálogo e conversão alinhados ao mesmo plano de crescimento.",
    tone: "accent",
  },
  {
    icon: Clock,
    metric: "24/7",
    label: "de acompanhamento",
    desc: "Métricas e alertas monitorados continuamente, com ação rápida quando algo desvia.",
    tone: "brand",
  },
] as const;

export default function Results() {
  return (
    <section
      id="resultados"
      className="relative overflow-hidden py-20 lg:py-28"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-950 via-brand-900 to-ink-900" />
      <div className="absolute inset-0 -z-10 bg-grid opacity-10" />
      <div className="absolute -top-40 right-1/4 -z-10 h-96 w-96 rounded-full bg-accent-500/20 blur-3xl" />
      <div className="absolute -bottom-40 left-1/4 -z-10 h-96 w-96 rounded-full bg-brand-500/30 blur-3xl" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent-400" />
            Resultados
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-5 text-balance font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            Números que mostram o impacto da Bazam
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-base text-brand-100/80 sm:text-lg"
          >
            Performance média observada nas operações geridas pela Bazam após
            90 dias de execução do plano.
          </motion.p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {RESULTS.map((r, i) => {
            const Icon = r.icon;
            const accent =
              r.tone === "accent"
                ? "from-accent-400 to-accent-600"
                : "from-brand-300 to-brand-500";
            return (
              <motion.div
                key={r.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.07]"
              >
                <div
                  aria-hidden
                  className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-to-br from-white/5 to-transparent blur-2xl"
                />
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white ring-1 ring-white/20">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white/40">
                    avg. 90 dias
                  </span>
                </div>
                <p
                  className={`mt-6 bg-gradient-to-r ${accent} bg-clip-text font-display text-5xl font-black tracking-tight text-transparent`}
                >
                  {r.metric}
                </p>
                <p className="mt-1 text-sm font-semibold text-white">
                  {r.label}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-brand-100/70">
                  {r.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
