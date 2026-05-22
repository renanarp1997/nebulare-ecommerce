"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Star,
  Truck,
  CreditCard,
  ShieldCheck,
  Zap,
  Tag,
  Clock,
} from "lucide-react";
import { HERO_PRODUCT, BRANDS } from "@/lib/store-data";

function brl(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

const STRIP = [
  { icon: Truck, label: "Frete grátis", sub: "acima de R$ 149" },
  { icon: CreditCard, label: "12% off no Pix", sub: "ou 6× sem juros" },
  { icon: Zap, label: "Envia em 24h", sub: "estoque próprio" },
  { icon: ShieldCheck, label: "Compra segura", sub: "site blindado" },
];

export default function ShopHero() {
  const discount = Math.round(
    ((HERO_PRODUCT.oldPrice - HERO_PRODUCT.price) / HERO_PRODUCT.oldPrice) * 100,
  );
  const installmentValue = (HERO_PRODUCT.price / HERO_PRODUCT.installments)
    .toFixed(2)
    .replace(".", ",");

  return (
    <section className="relative isolate overflow-hidden bg-white">
      {/* Camadas de fundo cósmicas */}
      <div className="absolute inset-0 -z-10 bg-aurora" aria-hidden />
      <div className="absolute inset-0 -z-10 bg-stars opacity-60" aria-hidden />
      <div
        className="absolute inset-0 -z-10 opacity-[0.05] mix-blend-overlay bg-noise"
        aria-hidden
      />
      {/* glows */}
      <div
        className="pointer-events-none absolute -left-32 top-10 -z-10 h-[420px] w-[420px] rounded-full bg-brand-500/35 blur-[120px] animate-breathe"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-[-120px] top-[-80px] -z-10 h-[460px] w-[460px] rounded-full bg-accent-500/25 blur-[140px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/3 bottom-[-100px] -z-10 h-[360px] w-[360px] rounded-full bg-aux-500/22 blur-[120px]"
        aria-hidden
      />

      <div className="mx-auto max-w-shell px-3 pb-12 pt-8 sm:px-4 sm:pt-12 lg:pt-16 lg:pb-20">
        <div className="grid grid-cols-12 gap-5 lg:gap-8">
          {/* Editorial */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="col-span-12 flex flex-col justify-center lg:col-span-7"
          >
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-[11px] font-semibold text-white/90 backdrop-blur-md">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-400" />
              </span>
              Drop ao vivo · semana 21
              <span className="mx-1 h-3 w-px bg-white/20" />
              <Sparkles className="h-3 w-3 text-accent-300" />
              <span className="text-white/80">curadoria humana</span>
            </div>

            <h1 className="mt-5 max-w-2xl font-display text-[30px] font-extrabold leading-[1.02] tracking-tightest text-white sm:text-5xl lg:text-[68px]">
              Sua vibe agora
              <br className="hidden sm:block" /> tem
              <span className="bg-gradient-to-r from-accent-300 via-pink-200 to-aux-300 bg-clip-text text-transparent">
                {" "}
                endereço.
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-pretty text-[15px] leading-relaxed text-white/75 sm:text-base">
              LED pro quarto, drop de skincare, hoodie oversized, controle RGB
              e tudo que rolou no FYP — com curadoria, frete em 24h e Pix com
              12% off.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-2.5">
              <a
                href="#produtos"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink-950 shadow-lift transition-all hover:-translate-y-0.5 hover:bg-accent-50"
              >
                Comprar agora
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#categorias"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white/90 backdrop-blur transition-colors hover:bg-white/10"
              >
                Ver categorias
              </a>
              <span className="ml-1 mt-1 flex items-center gap-2 text-[11px] text-white/55 sm:mt-0">
                <span className="hidden h-1 w-1 rounded-full bg-white/40 sm:inline-block" />
                +28 mil pessoas no app esta semana
              </span>
            </div>

            {/* Mini stats */}
            <div className="mt-9 grid max-w-lg grid-cols-3 gap-3 border-t border-white/10 pt-6 text-white sm:gap-5">
              <div>
                <p className="font-display text-xl font-extrabold tracking-tight sm:text-2xl">
                  4.9
                </p>
                <p className="mt-0.5 text-[10px] text-white/60 sm:text-[11px]">
                  ReclameAqui · RA1000
                </p>
              </div>
              <div>
                <p className="font-display text-xl font-extrabold tracking-tight sm:text-2xl">
                  24h
                </p>
                <p className="mt-0.5 text-[10px] text-white/60 sm:text-[11px]">
                  Envio em capitais
                </p>
              </div>
              <div>
                <p className="font-display text-xl font-extrabold tracking-tight sm:text-2xl">
                  6k+
                </p>
                <p className="mt-0.5 text-[10px] text-white/60 sm:text-[11px]">
                  Produtos selecionados
                </p>
              </div>
            </div>
          </motion.div>

          {/* Produto em destaque */}
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative col-span-12 lg:col-span-5"
          >
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[440px]">
              {/* Halo */}
              <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute inset-x-0 top-6 mx-auto h-[78%] w-[78%] rounded-full bg-gradient-to-tr from-accent-400/45 via-brand-400/45 to-aux-300/35 blur-3xl" />
              </div>

              {/* Anel orbital */}
              <div className="absolute inset-0 -z-10 flex items-center justify-center">
                <div className="aspect-square h-[92%] rounded-full border border-white/10 animate-spin-slow" />
                <div className="absolute aspect-square h-[80%] rounded-full border border-dashed border-white/8" />
              </div>

              {/* Card de produto */}
              <div className="relative h-full w-full overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-lift">
                <Image
                  src={HERO_PRODUCT.image}
                  alt={HERO_PRODUCT.name}
                  fill
                  priority
                  sizes="(max-width:1024px) 90vw, 440px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-ink-950/0 to-ink-950/25" />

                {/* tag no canto */}
                <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md ring-1 ring-white/15">
                  <Tag className="h-3 w-3 text-accent-300" /> hot da semana
                </div>

                {/* desconto */}
                <div className="absolute right-4 top-4 inline-flex items-center rounded-full bg-accent-500 px-2.5 py-1 text-[11px] font-black tracking-tight text-white shadow-lift">
                  −{discount}%
                </div>

                {/* Card de info na parte inferior */}
                <div className="absolute inset-x-3 bottom-3 rounded-2xl border border-white/15 bg-white/10 p-3.5 backdrop-blur-xl">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/70">
                        {HERO_PRODUCT.brand}
                      </p>
                      <p className="mt-0.5 truncate font-display text-sm font-bold text-white">
                        {HERO_PRODUCT.name}
                      </p>
                      <p className="mt-1 text-[11px] text-white/70 line-clamp-1">
                        {HERO_PRODUCT.pitch}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-white/55 line-through">
                        {brl(HERO_PRODUCT.oldPrice)}
                      </p>
                      <p className="font-display text-base font-extrabold tracking-tight text-white">
                        {brl(HERO_PRODUCT.price)}
                      </p>
                      <p className="text-[9px] text-white/55">
                        {HERO_PRODUCT.installments}× R$ {installmentValue}
                      </p>
                    </div>
                  </div>
                  <a
                    href="#produtos"
                    className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl bg-white px-3 py-2 text-[12px] font-bold text-ink-950 transition-colors hover:bg-accent-50"
                  >
                    Adicionar ao carrinho
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>

              {/* Chip flutuante: rating */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute -left-3 top-12 hidden items-center gap-2.5 rounded-2xl border border-white/15 bg-white/95 px-3 py-2 shadow-lift backdrop-blur sm:flex"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-100">
                  <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                </div>
                <div>
                  <p className="font-display text-sm font-extrabold tracking-tight text-ink-900">
                    {HERO_PRODUCT.rating.toFixed(1)} / 5
                  </p>
                  <p className="text-[10px] text-ink-500">
                    {HERO_PRODUCT.reviews.toLocaleString("pt-BR")} avaliações
                  </p>
                </div>
              </motion.div>

              {/* Chip flutuante: frete + cronômetro */}
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute -right-3 bottom-24 hidden flex-col gap-1 rounded-2xl border border-white/15 bg-white/95 px-3 py-2 shadow-lift backdrop-blur sm:flex"
              >
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-accent-600" />
                  <p className="text-[11px] font-bold text-ink-900">
                    Envia em 24h
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-ink-500">
                  <Clock className="h-3 w-3" /> compra até 18h
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Strip de benefícios em vidro */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl sm:grid-cols-4"
        >
          {STRIP.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className="flex items-center gap-3 bg-white/[0.03] px-4 py-3 transition-colors hover:bg-white/[0.07]"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-white/15 to-white/0 text-white ring-1 ring-white/10">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-[12px] font-semibold text-white">
                    {s.label}
                  </p>
                  <p className="truncate text-[10px] text-white/60">{s.sub}</p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Marquee de marcas */}
      <div className="relative border-t border-white/10 bg-white/[0.02] py-4 backdrop-blur">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#1a0b2e] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#0f0420] to-transparent" />
        <div className="flex overflow-hidden">
          <div className="flex shrink-0 animate-marquee items-center gap-12 px-8">
            {[...BRANDS, ...BRANDS].map((b, i) => (
              <span
                key={`${b}-${i}`}
                className="font-display text-base font-extrabold tracking-tight text-white/40 transition-colors hover:text-white/85 sm:text-lg"
              >
                {b}
              </span>
            ))}
          </div>
          <div
            className="flex shrink-0 animate-marquee items-center gap-12 px-8"
            aria-hidden
          >
            {[...BRANDS, ...BRANDS].map((b, i) => (
              <span
                key={`${b}-d-${i}`}
                className="font-display text-base font-extrabold tracking-tight text-white/40 sm:text-lg"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
