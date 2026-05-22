"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ShoppingBag,
  Sparkles,
  ChevronRight,
  Truck,
} from "lucide-react";
import ShopHeader from "@/components/shop/ShopHeader";
import ProductSection from "@/components/shop/ProductSection";
import ProductCard from "@/components/shop/ProductCard";
import Newsletter from "@/components/shop/Newsletter";
import ShopFooter from "@/components/shop/ShopFooter";
import { DEPARTMENT_BY_SLUG, DEPARTMENT_LIST } from "@/lib/departments";

function brl(n: number) {
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function DepartmentPage({ params }: { params: { slug: string } }) {
  const dept = DEPARTMENT_BY_SLUG[params.slug];
  if (!dept) notFound();

  const Icon = dept.icon;
  const featured = dept.products[0];
  const others = dept.products.slice(1);
  const otherDepts = DEPARTMENT_LIST.filter((d) => d.slug !== dept.slug).slice(
    0,
    6,
  );

  return (
    <main className="relative min-h-screen overflow-hidden bg-white">
      <ShopHeader />

      {/* Breadcrumb */}
      <div className="border-b border-ink-100 bg-white">
        <div className="mx-auto flex max-w-shell items-center gap-1.5 px-4 py-3 text-[11px] text-ink-500 sm:px-6">
          <Link href="/" className="hover:text-ink-950">
            Início
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/" className="hover:text-ink-950">
            Departamentos
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="font-semibold text-ink-950">{dept.name}</span>
        </div>
      </div>

      {/* Hero */}
      <section
        className={`relative isolate overflow-hidden bg-gradient-to-br ${dept.heroBg} py-14 sm:py-16`}
      >
        <div className="pointer-events-none absolute -left-32 top-0 -z-10 h-96 w-96 rounded-full bg-white/40 blur-[120px]" />
        <div className="pointer-events-none absolute -right-32 bottom-0 -z-10 h-96 w-96 rounded-full bg-white/30 blur-[120px]" />

        <div className="mx-auto max-w-shell px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider shadow-sm ${dept.pillTone}`}
              >
                <Sparkles className="h-3 w-3" />
                {dept.tagline}
              </span>

              <div className="mt-4 flex items-center gap-3">
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${dept.accent} text-white shadow-lift`}
                >
                  <Icon className="h-6 w-6" />
                </span>
                <h1 className="font-display text-4xl font-extrabold tracking-tight text-ink-950 sm:text-5xl lg:text-6xl">
                  {dept.name}
                </h1>
              </div>

              <p className="mt-4 max-w-lg text-sm text-ink-600 sm:text-base">
                {dept.description}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[11px] font-bold text-ink-950 shadow-card ring-1 ring-ink-100">
                  <ShoppingBag className="h-3 w-3 text-brand-700" />
                  {dept.productCount}
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold shadow-sm ${dept.pillTone}`}
                >
                  {dept.pitch}
                </span>
                <Link
                  href="/frete-gratis"
                  className="inline-flex items-center gap-1.5 rounded-full bg-aux-50 px-3 py-1.5 text-[11px] font-bold text-aux-700 ring-1 ring-aux-200"
                >
                  <Truck className="h-3 w-3" />
                  Frete grátis R$ 149+
                </Link>
              </div>

              <div className="mt-6 flex items-center gap-2">
                <a
                  href="#produtos"
                  className="inline-flex items-center gap-1.5 rounded-full bg-ink-950 px-5 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-brand-800 hover:shadow-glow"
                >
                  Ver coleção
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#sub"
                  className="text-[12px] font-semibold text-ink-600 hover:text-ink-950"
                >
                  Explorar sub-categorias
                </a>
              </div>
            </motion.div>

            {/* Featured product */}
            {featured && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="relative"
              >
                <div className="relative overflow-hidden rounded-[28px] bg-white p-5 shadow-lift ring-1 ring-ink-100">
                  <div className="relative aspect-[5/4] w-full overflow-hidden rounded-2xl bg-ink-50">
                    {featured.image ? (
                      <Image
                        src={featured.image}
                        alt={featured.name}
                        fill
                        sizes="(max-width:1024px) 90vw, 460px"
                        className="object-cover"
                      />
                    ) : (
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${featured.gradient}`}
                      />
                    )}
                    <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-ink-950 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.18em] text-white">
                      <Sparkles className="h-3 w-3 text-accent-300" /> Destaque
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-700">
                      {featured.brand}
                    </p>
                    <h3 className="mt-1 font-display text-lg font-extrabold text-ink-950">
                      {featured.name}
                    </h3>
                    <div className="mt-2 flex items-end justify-between">
                      <div>
                        {featured.oldPrice && (
                          <p className="text-[11px] text-ink-400 line-through">
                            {brl(featured.oldPrice)}
                          </p>
                        )}
                        <p className="font-display text-2xl font-extrabold tracking-tight text-ink-950">
                          {brl(featured.price)}
                        </p>
                      </div>
                      <button className="flex h-10 w-10 items-center justify-center rounded-full bg-ink-950 text-white transition-transform hover:rotate-[-12deg]">
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Sub-categorias */}
      <section id="sub" className="border-y border-ink-100 bg-white py-8">
        <div className="mx-auto max-w-shell px-4 sm:px-6 lg:px-8">
          <p className="text-[10px] font-bold uppercase tracking-wider text-ink-500">
            Sub-categorias
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {dept.subs.map((s) => (
              <a
                key={s}
                href="#produtos"
                className="inline-flex items-center gap-1.5 rounded-full bg-ink-50 px-3 py-1.5 text-[12px] font-semibold text-ink-700 transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-card hover:text-ink-950"
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Grid de produtos */}
      <section id="produtos" className="py-12 sm:py-14">
        <div className="mx-auto max-w-shell px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-center gap-3">
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br ${dept.accent} text-white shadow-lift`}
              >
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-ink-500">
                  Coleção {dept.name}
                </p>
                <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink-950 sm:text-[28px]">
                  {dept.tagline}
                </h2>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-ink-50 px-3 py-1 text-[11px] font-bold text-ink-700">
              {dept.products.length} produtos em destaque
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {others.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Related */}
      {dept.related && (
        <ProductSection
          eyebrow={dept.related.title}
          title={dept.related.title}
          description={dept.related.description}
          products={dept.related.products}
          tone="muted"
          accent="accent"
        />
      )}

      {/* Outras categorias */}
      <section className="py-12 sm:py-14">
        <div className="mx-auto max-w-shell px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <p className="text-[10px] font-bold uppercase tracking-wider text-ink-500">
              Continua explorando
            </p>
            <h2 className="mt-1 font-display text-2xl font-extrabold tracking-tight text-ink-950 sm:text-[28px]">
              Outros departamentos
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {otherDepts.map((d) => {
              const DIcon = d.icon;
              return (
                <Link
                  key={d.slug}
                  href={`/departamento/${d.slug}`}
                  className="group relative overflow-hidden rounded-2xl bg-white p-4 ring-1 ring-ink-100 transition-all hover:-translate-y-1 hover:shadow-lift hover:ring-brand-200"
                >
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${d.accent} text-white shadow-card`}
                  >
                    <DIcon className="h-5 w-5" />
                  </span>
                  <p className="mt-3 font-display text-sm font-extrabold text-ink-950">
                    {d.name}
                  </p>
                  <p className="text-[11px] text-ink-500">{d.productCount}</p>
                  <ArrowRight className="absolute right-3 top-3 h-3.5 w-3.5 -translate-x-1 text-ink-400 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <Newsletter />
      <ShopFooter />
    </main>
  );
}
