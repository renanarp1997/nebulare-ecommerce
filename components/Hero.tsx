"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ShoppingBag, Zap } from "lucide-react";
import DashboardMock from "./DashboardMock";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden pt-28 pb-20 lg:pt-36 lg:pb-28"
    >
      {/* Backgrounds */}
      <div className="absolute inset-0 -z-10 bg-mesh" />
      <div className="absolute inset-0 -z-10 bg-grid opacity-50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div className="absolute -top-32 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-brand-200/30 blur-3xl" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white/70 px-3 py-1.5 backdrop-blur"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-brand-700">
              <Sparkles className="h-3 w-3" />
              novo
            </span>
            <span className="text-xs font-medium text-ink-600">
              Gestão completa de e-commerce sob medida
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-5 text-balance font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink-900 sm:text-5xl lg:text-6xl"
          >
            Gestão completa para seu{" "}
            <span className="text-gradient">e-commerce vender mais</span> todos
            os dias
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 max-w-xl text-balance text-base leading-relaxed text-ink-600 sm:text-lg"
          >
            A Bazam cuida da operação, estratégia e crescimento da sua loja
            online para você focar no produto enquanto a gente escala suas
            vendas.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <a
              href="#contato"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-700 to-brand-500 px-6 py-3.5 text-sm font-semibold text-white shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-glow"
            >
              Quero crescer meu e-commerce
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#solucoes"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-ink-200 bg-white px-6 py-3.5 text-sm font-semibold text-ink-800 transition-all hover:border-brand-300 hover:bg-brand-50/50"
            >
              Ver soluções
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-ink-500"
          >
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4 text-accent-600" />
              Operação 100% profissional
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-brand-600" />
              Resultado em até 90 dias
            </div>
            <div className="flex items-center gap-2">
              <span className="flex -space-x-1.5">
                <span className="h-5 w-5 rounded-full border-2 border-white bg-gradient-to-br from-brand-500 to-brand-700" />
                <span className="h-5 w-5 rounded-full border-2 border-white bg-gradient-to-br from-accent-400 to-accent-600" />
                <span className="h-5 w-5 rounded-full border-2 border-white bg-gradient-to-br from-brand-400 to-brand-600" />
              </span>
              +120 lojas atendidas
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative"
        >
          <DashboardMock />
        </motion.div>
      </div>
    </section>
  );
}
