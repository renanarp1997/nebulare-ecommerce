"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Gift, ArrowRight, Check } from "lucide-react";
import { IMG_LIST } from "@/lib/promo-images";

const PERKS = [
  "Cupom NEBULA10 — 10% na 1ª compra",
  "Acesso antecipado aos drops da semana",
  "Cancele em 1 clique, sem pegadinha",
];

export default function Newsletter() {
  return (
    <section className="py-14 lg:py-20">
      <div className="mx-auto max-w-shell px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative isolate overflow-hidden rounded-[36px] bg-ink-950 shadow-lift"
        >
          {/* Background editorial */}
          <div className="absolute inset-0 -z-10 bg-aurora opacity-90" />
          <div className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-[0.08]" />
          <div className="pointer-events-none absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-accent-500/30 blur-[120px]" />
          <div className="pointer-events-none absolute -left-24 -bottom-24 -z-10 h-80 w-80 rounded-full bg-brand-400/30 blur-[120px]" />

          <div className="relative grid items-stretch gap-0 lg:grid-cols-12">
            {/* Texto + formulário */}
            <div className="p-6 sm:p-12 lg:col-span-7 lg:p-14">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-[11px] font-semibold tracking-wide text-white/90 backdrop-blur">
                <Gift className="h-3 w-3 text-accent-300" />
                Entra pra Nebulari+
              </span>
              <h3 className="mt-5 max-w-xl font-display text-2xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-4xl lg:text-[42px]">
                Ganha{" "}
                <span className="text-gradient-warm">10% off</span> e vê os
                drops antes da galera.
              </h3>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/70 sm:text-base">
                Uma news por semana, sem ruído. Você escolhe a vibe (beleza,
                gaming, LED…) e a gente cura.
              </p>

              <ul className="mt-6 space-y-2">
                {PERKS.map((p) => (
                  <li
                    key={p}
                    className="flex items-center gap-2.5 text-[13px] text-white/80"
                  >
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-accent-500/90 text-white">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>

              <form
                onSubmit={(e) => e.preventDefault()}
                className="mt-7 rounded-2xl border border-white/12 bg-white/[0.05] p-2 backdrop-blur-xl"
              >
                <div className="flex flex-col gap-2 sm:flex-row">
                  <div className="relative flex-1">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
                    <input
                      type="email"
                      required
                      placeholder="seu@email.com"
                      className="w-full rounded-xl bg-white px-11 py-3.5 text-sm text-ink-950 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-accent-400"
                    />
                  </div>
                  <button
                    type="submit"
                    className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-ink-950 transition-all hover:-translate-y-0.5 hover:bg-accent-50"
                  >
                    Quero o cupom
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
                <p className="mt-2 px-2 text-[11px] text-white/55">
                  Sem spam. Cancele em 1 clique.
                </p>
              </form>
            </div>

            {/* Imagem lateral */}
            <div className="relative hidden lg:col-span-5 lg:block">
              <div className="absolute inset-0">
                <Image
                  src={IMG_LIST.newsletter}
                  alt="Newsletter Bazam"
                  fill
                  sizes="(max-width:1024px) 0px, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/40 to-transparent" />
              </div>

              {/* card flutuante */}
              <div className="absolute right-6 top-8 rounded-2xl border border-white/15 bg-white/95 px-4 py-3 shadow-lift backdrop-blur-xl">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink-500">
                  Cupom
                </p>
                <p className="mt-1 font-display text-xl font-extrabold tracking-tight text-ink-950">
                  NEBULA10
                </p>
                <p className="mt-0.5 text-[11px] text-ink-500">
                  10% off na 1ª compra
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
