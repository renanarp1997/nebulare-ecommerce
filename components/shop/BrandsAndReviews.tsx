"use client";

import { motion } from "framer-motion";
import { Quote, Star, ShieldCheck, BadgeCheck } from "lucide-react";
import { BRANDS } from "@/lib/store-data";

const REVIEWS = [
  {
    name: "Helena F.",
    location: "São Paulo · SP",
    rating: 5,
    title: "Meu quarto ficou outro",
    body: "Comprei a fita LED RGB e o mushroom lamp pra montar o setup. Chegou no dia seguinte e a embalagem veio com adesivinho. Tô obcecada.",
    product: "Fita LED RGB 10m + Mushroom Lamp",
  },
  {
    name: "Théo M.",
    location: "Belo Horizonte · MG",
    rating: 5,
    title: "Earbuds que chocam",
    body: "Era cético com ANC nessa faixa de preço, mas os Galaxy Pop entregam. Bateria insana e estojo magnético satisfaz demais. Vale.",
    product: "Earbuds Galaxy Pop ANC",
  },
  {
    name: "Laura R.",
    location: "Curitiba · PR",
    rating: 5,
    title: "Skincare que cumpre",
    body: "Pedi o kit Glass Skin pra rotina noturna. Em 3 semanas a textura mudou. Atendimento no WhatsApp ajudou a montar a ordem dos passos.",
    product: "Kit Glass Skin · 4 itens",
  },
];

export default function BrandsAndReviews() {
  return (
    <>
      {/* Brands — faixa minimalista com marquee duplo */}
      <section className="relative border-y border-ink-100 bg-white py-10">
        <div className="mx-auto max-w-shell px-4 sm:px-6 lg:px-8">
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-400">
            As labels que rolam na Nebulari
          </p>

          <div className="relative mt-6 overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent" />
            <div className="flex">
              <div className="flex shrink-0 animate-marquee items-center gap-12 px-6">
                {[...BRANDS, ...BRANDS].map((b, i) => (
                  <span
                    key={`${b}-${i}`}
                    className="font-display text-xl font-extrabold tracking-tight text-ink-300 transition-colors hover:text-ink-950 sm:text-2xl"
                  >
                    {b}
                  </span>
                ))}
              </div>
              <div
                className="flex shrink-0 animate-marquee items-center gap-12 px-6"
                aria-hidden
              >
                {[...BRANDS, ...BRANDS].map((b, i) => (
                  <span
                    key={`${b}-d-${i}`}
                    className="font-display text-xl font-extrabold tracking-tight text-ink-300 sm:text-2xl"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-ink-50/40 py-16 lg:py-20">
        <div className="mx-auto max-w-shell px-4 sm:px-6 lg:px-8">
          <div className="grid items-end gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-amber-800">
                <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                Avaliações reais
              </span>
              <h2 className="mt-3 max-w-xl font-display text-2xl font-extrabold tracking-tight text-ink-950 sm:text-3xl lg:text-[36px]">
                <span className="text-gradient">28 mil pessoas</span> já fizeram
                a vibe rolar com a Nebulari.
              </h2>
              <p className="mt-3 max-w-lg text-sm text-ink-500 sm:text-base">
                Avaliações verificadas, suporte que responde no WhatsApp e
                garantia oficial em tudo. Sem pegadinha.
              </p>
            </div>
            <div className="flex items-stretch gap-3 lg:justify-end">
              <div className="flex-1 rounded-2xl bg-white p-4 text-center ring-1 ring-ink-100 sm:flex-none sm:w-[140px]">
                <div className="flex items-center justify-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="mt-1.5 font-display text-3xl font-extrabold tracking-tight text-ink-950">
                  4.9
                </p>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-500">
                  ReclameAqui
                </p>
              </div>
              <div className="flex-1 rounded-2xl bg-gradient-to-br from-accent-50 to-accent-100 p-4 text-center ring-1 ring-accent-200 sm:flex-none sm:w-[140px]">
                <ShieldCheck className="mx-auto h-6 w-6 text-accent-700" />
                <p className="mt-1 font-display text-lg font-extrabold tracking-tight text-accent-800">
                  RA1000
                </p>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-accent-700/85">
                  Selo ouro
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-5">
            {REVIEWS.map((r, i) => (
              <motion.div
                key={r.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative overflow-hidden rounded-3xl bg-white p-6 ring-1 ring-ink-100 transition-all hover:-translate-y-1 hover:shadow-lift"
              >
                <div className="pointer-events-none absolute -right-4 -top-4 h-24 w-24 rounded-full bg-brand-100/40 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <Quote className="absolute right-5 top-5 h-7 w-7 text-brand-100" />
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`h-3.5 w-3.5 ${
                        s <= r.rating
                          ? "fill-amber-400 text-amber-400"
                          : "fill-ink-200 text-ink-200"
                      }`}
                    />
                  ))}
                </div>
                <h4 className="mt-3 font-display text-base font-bold tracking-tight text-ink-950">
                  {r.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">
                  “{r.body}”
                </p>
                <div className="mt-5 flex items-center justify-between border-t border-ink-100 pt-4">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-accent-500 text-xs font-bold text-white shadow-card">
                      {r.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-ink-950">{r.name}</p>
                      <p className="text-[10px] text-ink-500">{r.location}</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-accent-50 px-2 py-0.5 text-[9px] font-bold text-accent-700 ring-1 ring-accent-200">
                    <BadgeCheck className="h-2.5 w-2.5" />
                    verificado
                  </span>
                </div>
                <p className="mt-3 text-[11px] text-ink-500">
                  Sobre:{" "}
                  <span className="font-semibold text-ink-700">{r.product}</span>
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
