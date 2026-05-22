"use client";

import { motion } from "framer-motion";
import { Stethoscope, ClipboardList, Workflow, BarChart4 } from "lucide-react";

const STEPS = [
  {
    n: "01",
    icon: Stethoscope,
    title: "Diagnóstico do e-commerce",
    desc: "Auditoria profunda da loja, mídia, catálogo, dados e operação. Mapeamos onde o dinheiro está parado.",
  },
  {
    n: "02",
    icon: ClipboardList,
    title: "Planejamento de crescimento",
    desc: "Roadmap de 90 dias com prioridades por impacto, alavancas de receita e metas mensuráveis.",
  },
  {
    n: "03",
    icon: Workflow,
    title: "Execução e otimização",
    desc: "Time Bazam roda o plano dentro da sua loja: anúncios, conteúdo, CRO, atendimento, automações.",
  },
  {
    n: "04",
    icon: BarChart4,
    title: "Relatórios e escala",
    desc: "Relatórios semanais, reuniões mensais e decisões orientadas pelo que dá resultado de verdade.",
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="relative py-20 lg:py-28">
      <div className="absolute inset-x-0 top-1/3 -z-10 mx-auto h-72 max-w-4xl rounded-full bg-brand-100/50 blur-3xl" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full border border-accent-100 bg-accent-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-accent-700"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
            Como funciona
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-5 text-balance font-display text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl lg:text-5xl"
          >
            Um método claro,{" "}
            <span className="text-gradient">do diagnóstico à escala</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-base text-ink-600 sm:text-lg"
          >
            Nada de “a gente vai testando”. Nosso processo tem 4 etapas
            objetivas que rodam continuamente.
          </motion.p>
        </div>

        <div className="relative mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Connecting line */}
          <div className="absolute inset-x-8 top-12 hidden h-px bg-gradient-to-r from-transparent via-brand-200 to-transparent lg:block" />

          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative"
              >
                <div className="relative h-full rounded-2xl border border-ink-100 bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-soft">
                  <div className="flex items-start justify-between">
                    <div className="relative">
                      <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-brand-500/20 to-accent-500/20 blur-lg" />
                      <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-700 to-brand-500 text-white shadow-glow">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                    <span className="font-display text-2xl font-black text-ink-100">
                      {s.n}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-ink-900">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">
                    {s.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
