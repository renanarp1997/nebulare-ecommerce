"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const BULLETS = [
  "Diagnóstico gratuito da sua operação",
  "Plano de crescimento personalizado",
  "Sem fidelidade — começa quando quiser",
];

export default function CTA() {
  return (
    <section id="contato" className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl border border-brand-200/50 bg-gradient-to-br from-brand-700 via-brand-800 to-ink-900 px-6 py-16 shadow-soft sm:px-12 lg:px-16 lg:py-20"
        >
          {/* Decorative orbs */}
          <div className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-accent-500/30 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-brand-400/40 blur-3xl" />
          <div className="absolute inset-0 bg-grid opacity-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />

          <div className="relative grid items-center gap-10 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-400" />
                Vamos conversar
              </span>
              <h2 className="mt-5 text-balance font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                Seu e-commerce pode vender mais com uma{" "}
                <span className="bg-gradient-to-r from-accent-300 to-white bg-clip-text text-transparent">
                  operação melhor
                </span>
                .
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-brand-100/85 sm:text-lg">
                Fale com a Bazam e descubra como transformar sua loja online em
                uma máquina de vendas organizada, estratégica e escalável.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="mailto:contato@bazam.com.br"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-brand-700 shadow-soft transition-all hover:-translate-y-0.5 hover:bg-accent-50 hover:text-brand-800"
                >
                  Falar com a Bazam
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
                <a
                  href="#solucoes"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition-all hover:bg-white/10"
                >
                  Ver soluções primeiro
                </a>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-white/15 bg-white/[0.06] p-6 backdrop-blur-xl">
                <p className="text-[11px] font-bold uppercase tracking-wider text-white/60">
                  O que você leva
                </p>
                <ul className="mt-4 space-y-3">
                  {BULLETS.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-3 text-sm text-white/95"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-400" />
                      {b}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 border-t border-white/10 pt-4">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-white/60">
                    Resposta em
                  </p>
                  <p className="mt-1 font-display text-2xl font-bold text-white">
                    até 24h úteis
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
