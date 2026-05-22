"use client";

import { motion } from "framer-motion";
import {
  Eye,
  TrendingUp,
  Layers,
  Shield,
  Database,
  LineChart,
} from "lucide-react";
import DashboardMock from "./DashboardMock";

const BENEFITS = [
  {
    icon: Eye,
    title: "Mais clareza",
    desc: "Você sabe o que está acontecendo na sua loja, quando e por quê.",
  },
  {
    icon: TrendingUp,
    title: "Mais vendas",
    desc: "Tráfego, conversão e ticket médio crescendo de forma consistente.",
  },
  {
    icon: Layers,
    title: "Menos retrabalho",
    desc: "Processos padronizados eliminam tarefas que comem o time todo dia.",
  },
  {
    icon: Shield,
    title: "Operação profissional",
    desc: "Sua loja deixa de depender de pessoas e passa a rodar por método.",
  },
  {
    icon: Database,
    title: "Decisões por dados",
    desc: "Nada de achismo: cada movimento sai de um número e de um teste.",
  },
  {
    icon: LineChart,
    title: "Crescimento previsível",
    desc: "Metas, alavancas e um plano que se repete com previsibilidade.",
  },
];

export default function Benefits() {
  return (
    <section className="relative bg-gradient-to-b from-white via-ink-50/40 to-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 rounded-full border border-accent-100 bg-accent-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-accent-700"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
              Benefícios
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="mt-5 text-balance font-display text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl lg:text-5xl"
            >
              O que muda quando a Bazam{" "}
              <span className="text-gradient">entra na sua operação</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-4 text-base text-ink-600 sm:text-lg"
            >
              Não é só vender mais. É vender melhor — com previsibilidade,
              padrão e dados que sustentam o próximo passo.
            </motion.p>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {BENEFITS.map((b, i) => {
                const Icon = b.icon;
                return (
                  <motion.div
                    key={b.title}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.45, delay: i * 0.05 }}
                    className="flex items-start gap-3 rounded-xl border border-ink-100 bg-white p-4 shadow-card transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-soft"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand-100 to-accent-100 text-brand-700">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-display text-sm font-semibold text-ink-900">
                        {b.title}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-ink-600">
                        {b.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <DashboardMock compact />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
