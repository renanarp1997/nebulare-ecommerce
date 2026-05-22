"use client";

import { motion } from "framer-motion";
import {
  Store,
  MousePointerClick,
  Megaphone,
  LayoutGrid,
  Rocket,
  LineChart,
  RefreshCcw,
  Headphones,
  ArrowUpRight,
} from "lucide-react";

const SOLUTIONS = [
  {
    icon: Store,
    title: "Gestão de loja virtual",
    desc: "Operação ponta a ponta da sua loja em Shopify, VTEX, Nuvemshop ou plataforma própria.",
    accent: "from-brand-600 to-brand-400",
  },
  {
    icon: MousePointerClick,
    title: "Otimização de conversão",
    desc: "CRO em páginas, checkout e fluxo de compra para extrair o máximo do tráfego.",
    accent: "from-accent-600 to-accent-400",
  },
  {
    icon: Megaphone,
    title: "Gestão de anúncios",
    desc: "Meta, Google e TikTok com foco em ROAS sustentável e escala previsível.",
    accent: "from-brand-700 to-brand-500",
  },
  {
    icon: LayoutGrid,
    title: "Organização de catálogo",
    desc: "Fichas técnicas, fotos, variações, SEO e taxonomia que vende sozinho.",
    accent: "from-accent-700 to-accent-500",
  },
  {
    icon: Rocket,
    title: "Estratégia de crescimento",
    desc: "Plano trimestral com metas claras, alavancas priorizadas e roadmap executável.",
    accent: "from-brand-600 to-accent-500",
  },
  {
    icon: LineChart,
    title: "Análise de métricas",
    desc: "Dashboards conectados ao seu negócio com decisões baseadas em dados.",
    accent: "from-brand-500 to-accent-400",
  },
  {
    icon: RefreshCcw,
    title: "Recuperação de carrinho",
    desc: "Fluxos automatizados de e-mail, SMS e WhatsApp para reverter abandono.",
    accent: "from-accent-600 to-brand-500",
  },
  {
    icon: Headphones,
    title: "Atendimento e operação",
    desc: "SAC, pós-venda e backoffice padronizados para escalar sem caos.",
    accent: "from-brand-700 to-accent-600",
  },
];

export default function Solutions() {
  return (
    <section
      id="solucoes"
      className="relative bg-gradient-to-b from-ink-50/60 via-white to-white py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-brand-700"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
            Soluções Bazam
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-5 text-balance font-display text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl lg:text-5xl"
          >
            Uma operação de e-commerce{" "}
            <span className="text-gradient">completa em um só lugar</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-base text-ink-600 sm:text-lg"
          >
            Cada solução conecta na próxima, formando um sistema de
            crescimento que cobre estratégia, execução e análise.
          </motion.p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SOLUTIONS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group relative overflow-hidden rounded-2xl border border-ink-100 bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:border-brand-200 hover:shadow-soft"
              >
                <div
                  aria-hidden
                  className={`absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-br ${s.accent} opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-20`}
                />
                <div
                  className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${s.accent} text-white shadow-glow`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-base font-semibold text-ink-900">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">
                  {s.desc}
                </p>
                <div className="mt-5 flex items-center gap-1 text-xs font-semibold text-brand-700 opacity-0 transition-all duration-300 group-hover:opacity-100">
                  Saiba mais
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
