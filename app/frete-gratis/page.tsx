"use client";

import { motion } from "framer-motion";
import {
  Truck,
  MapPin,
  Clock,
  Package,
  ShieldCheck,
  ArrowRight,
  PackageCheck,
  Plane,
} from "lucide-react";
import ShopHeader from "@/components/shop/ShopHeader";
import ProductSection from "@/components/shop/ProductSection";
import Newsletter from "@/components/shop/Newsletter";
import ShopFooter from "@/components/shop/ShopFooter";
import { BESTSELLERS, PLUSH, TECH, BEAUTY } from "@/lib/store-data";

const REGIONS = [
  { region: "Capitais SE/S", time: "24h", color: "from-aux-500 to-brand-600" },
  { region: "Capitais NE/N/CO", time: "48h", color: "from-brand-600 to-accent-500" },
  { region: "Interior", time: "3–5 dias", color: "from-accent-500 to-pink-500" },
];

const FAQ = [
  {
    q: "Como ativar o frete grátis?",
    a: "Adiciona R$ 149 ou mais em produtos no carrinho. A faixa de progresso aparece automaticamente no topo — quando enche, o frete some.",
  },
  {
    q: "Vale pra todo o Brasil?",
    a: "Vale pra todo o território nacional via Correios e transportadoras parceiras. Algumas regiões podem ter prazo estendido.",
  },
  {
    q: "Acumula com o cupom NEBULA10?",
    a: "Sim! Frete grátis acumula com o cupom NEBULA10 — leva 10% off + zero frete na mesma compra.",
  },
  {
    q: "Tem peso ou tamanho que não conta?",
    a: "Itens muito grandes (cadeira gamer, console) podem ter cobrança parcial de envio dependendo da região.",
  },
];

export default function FreteGratisPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white">
      <ShopHeader />

      {/* Hero do frete */}
      <section className="relative isolate overflow-hidden py-16 sm:py-20">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-aux-50 via-white to-brand-50" />
        <div className="pointer-events-none absolute -left-32 top-0 -z-10 h-96 w-96 rounded-full bg-aux-300/40 blur-[120px]" />
        <div className="pointer-events-none absolute -right-32 bottom-0 -z-10 h-96 w-96 rounded-full bg-brand-300/30 blur-[120px]" />

        <div className="mx-auto max-w-shell px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-1.5 rounded-full bg-aux-600/95 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm">
                <Truck className="h-3 w-3" />
                Free shipping
              </span>

              <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-ink-950 sm:text-5xl lg:text-6xl">
                Frete <span className="text-gradient">grátis</span><br className="hidden sm:block" /> a partir de R$ 149
              </h1>

              <p className="mt-4 max-w-lg text-sm text-ink-600 sm:text-base">
                Sem código, sem letrinha miúda. Encheu R$ 149 no carrinho, o frete some — e o seu pedido sai em 24h pra capitais.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-2">
                <a
                  href="/"
                  className="inline-flex items-center gap-1.5 rounded-full bg-ink-950 px-5 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-brand-800 hover:shadow-glow"
                >
                  Montar carrinho <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="/cupom-nebula10"
                  className="text-[12px] font-semibold text-ink-600 hover:text-ink-950"
                >
                  Combina com NEBULA10 →
                </a>
              </div>
            </motion.div>

            {/* Card visual */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="relative overflow-hidden rounded-[28px] bg-white p-7 shadow-lift ring-1 ring-ink-100">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-aux-700">
                      Progresso do carrinho
                    </p>
                    <p className="mt-2 font-display text-2xl font-extrabold text-ink-950">
                      R$ 132,00 <span className="text-sm font-semibold text-ink-400">/ R$ 149</span>
                    </p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-aux-500 to-brand-600 text-white shadow-glow">
                    <Truck className="h-5 w-5" />
                  </div>
                </div>

                <div className="mt-5">
                  <div className="relative h-3 w-full overflow-hidden rounded-full bg-ink-100">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "88%" }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-aux-500 via-brand-600 to-accent-500"
                    />
                  </div>
                  <p className="mt-2 text-[12px] font-semibold text-aux-700">
                    Faltam só R$ 17 pro frete zerar 🎉
                  </p>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3 border-t border-ink-100 pt-5">
                  {[
                    { icon: Plane, l: "Envio 24h" },
                    { icon: PackageCheck, l: "Rastreio real" },
                    { icon: ShieldCheck, l: "Seguro Nebulari" },
                  ].map((b) => {
                    const Icon = b.icon;
                    return (
                      <div key={b.l} className="flex flex-col items-center gap-1.5 text-center">
                        <Icon className="h-4 w-4 text-aux-600" />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-ink-600">
                          {b.l}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mapa de prazos */}
      <section className="py-14">
        <div className="mx-auto max-w-shell px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <p className="text-[10px] font-bold uppercase tracking-wider text-aux-700">
              Prazos por região
            </p>
            <h2 className="mt-1 font-display text-2xl font-extrabold tracking-tight text-ink-950 sm:text-3xl">
              Chega rápido onde você tá
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {REGIONS.map((r) => (
              <div
                key={r.region}
                className="relative overflow-hidden rounded-3xl bg-white p-6 ring-1 ring-ink-100 shadow-card"
              >
                <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${r.color}`} />
                <MapPin className="h-5 w-5 text-aux-700" />
                <p className="mt-3 font-display text-base font-extrabold text-ink-950">
                  {r.region}
                </p>
                <p className="mt-4 flex items-baseline gap-2">
                  <Clock className="h-4 w-4 text-ink-500" />
                  <span className="font-display text-2xl font-extrabold text-ink-950">
                    {r.time}
                  </span>
                </p>
                <p className="mt-1 text-[11px] text-ink-500">prazo médio após o envio</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProductSection
        eyebrow="Produtos que já zeram o frete sozinhos"
        title="Acima de R$ 149 — frete on the house."
        description="Pega um desses e já garante envio cósmico de graça."
        products={BESTSELLERS}
        accent="accent"
      />

      <ProductSection
        eyebrow="Junte itens"
        title="Mistura tech + cozy pra fechar R$ 149+."
        description="Combos populares pra bater a faixa do frete grátis sem dor."
        products={[...TECH.slice(0, 3), ...PLUSH.slice(0, 3)]}
        tone="muted"
      />

      <ProductSection
        eyebrow="Glow team"
        title="Beleza no carrinho conta também."
        description="Skincare, body mist e lipgloss empilham rápido pra zerar o frete."
        products={BEAUTY}
        accent="pink"
      />

      {/* FAQ */}
      <section className="bg-ink-50/60 py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 text-center">
            <Package className="mx-auto h-5 w-5 text-aux-700" />
            <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-ink-950 sm:text-3xl">
              Perguntas frequentes
            </h2>
          </div>

          <div className="space-y-3">
            {FAQ.map((item) => (
              <details
                key={item.q}
                className="group rounded-2xl bg-white p-4 ring-1 ring-ink-100 transition-shadow open:shadow-card"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-3 text-[13px] font-bold text-ink-950">
                  {item.q}
                  <span className="text-ink-400 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-[13px] text-ink-600">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
      <ShopFooter />
    </main>
  );
}
