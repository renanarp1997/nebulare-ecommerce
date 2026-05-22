"use client";

import { Suspense, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  SlidersHorizontal,
  Sparkles,
  Tag,
  ArrowRight,
} from "lucide-react";
import ShopHeader from "@/components/shop/ShopHeader";
import ProductCard from "@/components/shop/ProductCard";
import ProductSection from "@/components/shop/ProductSection";
import Newsletter from "@/components/shop/Newsletter";
import ShopFooter from "@/components/shop/ShopFooter";
import { searchProducts } from "@/lib/search";
import { BESTSELLERS, FOR_YOU } from "@/lib/store-data";
import { DEPARTMENT_LIST } from "@/lib/departments";

const QUICK_FILTERS = [
  "Frete grátis",
  "Até R$ 100",
  "Novo",
  "Top 1",
  "Mais vendidos",
];

const SUGGESTIONS = [
  "Fita LED",
  "Skincare glow",
  "Earbuds ANC",
  "Hoodie oversized",
  "Plushie",
  "Body mist",
];

function SearchResults() {
  const params = useSearchParams();
  const q = (params?.get("q") ?? "").trim();

  const hits = useMemo(() => searchProducts(q), [q]);
  const matchedCategories = useMemo(() => {
    if (!q) return [];
    const cats = new Set(hits.map((h) => h.product.category));
    return DEPARTMENT_LIST.filter((d) => cats.has(d.name)).slice(0, 6);
  }, [hits, q]);

  if (!q) {
    return (
      <section className="py-16">
        <div className="mx-auto max-w-shell px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-4 text-center">
            <Search className="h-8 w-8 text-ink-400" />
            <h1 className="font-display text-2xl font-extrabold text-ink-950">
              Comece a buscar
            </h1>
            <p className="max-w-md text-sm text-ink-500">
              Use a barra do topo pra procurar LED, skincare, hoodies, plushies — ou clica numa sugestão.
            </p>
            <div className="mt-2 flex flex-wrap justify-center gap-2">
              {SUGGESTIONS.map((s) => (
                <Link
                  key={s}
                  href={`/busca?q=${encodeURIComponent(s)}`}
                  className="rounded-full bg-ink-50 px-3 py-1.5 text-[12px] font-semibold text-ink-700 hover:bg-brand-50 hover:text-brand-700"
                >
                  {s}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Header da busca */}
      <section className="border-b border-ink-100 bg-gradient-to-br from-brand-50/50 via-white to-accent-50/50 py-8">
        <div className="mx-auto max-w-shell px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1.5 text-[11px] text-ink-500">
            <Link href="/" className="hover:text-ink-950">
              Início
            </Link>
            <span>/</span>
            <span className="font-semibold text-ink-950">Busca</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
          >
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-600/95 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                <Search className="h-3 w-3" />
                Resultados
              </span>
              <h1 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-ink-950 sm:text-3xl lg:text-[34px]">
                {hits.length > 0 ? (
                  <>
                    {hits.length} {hits.length === 1 ? "achado" : "achados"} para{" "}
                    <span className="text-gradient">"{q}"</span>
                  </>
                ) : (
                  <>
                    Nada cósmico para <span className="text-gradient">"{q}"</span>
                  </>
                )}
              </h1>
              <p className="mt-1 text-sm text-ink-500">
                {hits.length > 0
                  ? "Curadoria ordenada por relevância e popularidade."
                  : "Tenta uma palavra mais curta ou olha as sugestões abaixo."}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-[12px] font-bold text-ink-700 ring-1 ring-ink-200 hover:bg-ink-50">
                <SlidersHorizontal className="h-3.5 w-3.5" />
                Ordenar
              </button>
              <button className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-[12px] font-bold text-ink-700 ring-1 ring-ink-200 hover:bg-ink-50">
                <Filter className="h-3.5 w-3.5" />
                Filtros
              </button>
            </div>
          </motion.div>

          {/* Quick filters */}
          <div className="mt-4 flex flex-wrap gap-2">
            {QUICK_FILTERS.map((f) => (
              <button
                key={f}
                className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-ink-700 ring-1 ring-ink-200 transition-all hover:-translate-y-0.5 hover:bg-ink-50 hover:shadow-card"
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Categorias que casam */}
      {matchedCategories.length > 0 && (
        <section className="bg-white py-6">
          <div className="mx-auto max-w-shell px-4 sm:px-6 lg:px-8">
            <p className="text-[10px] font-bold uppercase tracking-wider text-ink-500">
              Categorias relacionadas
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {matchedCategories.map((d) => {
                const Icon = d.icon;
                return (
                  <Link
                    key={d.slug}
                    href={`/departamento/${d.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-full bg-ink-50 px-3 py-1.5 text-[12px] font-semibold text-ink-700 transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-card hover:text-ink-950"
                  >
                    <Icon className="h-3.5 w-3.5 text-brand-700" />
                    {d.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Resultados */}
      {hits.length > 0 ? (
        <section className="py-10">
          <div className="mx-auto max-w-shell px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
              {hits.map((h) => (
                <ProductCard key={h.product.id} product={h.product} />
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="py-14">
          <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-ink-100">
              <Search className="h-7 w-7 text-ink-400" />
            </div>
            <h2 className="mt-4 font-display text-xl font-extrabold text-ink-950">
              Nada por aqui ainda
            </h2>
            <p className="mt-2 text-sm text-ink-500">
              Mas a galáxia da Nebulari é grande. Tenta um desses atalhos:
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {SUGGESTIONS.map((s) => (
                <Link
                  key={s}
                  href={`/busca?q=${encodeURIComponent(s)}`}
                  className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-brand-50 to-accent-50 px-3 py-1.5 text-[12px] font-semibold text-brand-800 hover:from-brand-100 hover:to-accent-100"
                >
                  <Tag className="h-3 w-3" />
                  {s}
                </Link>
              ))}
            </div>
            <Link
              href="/"
              className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-ink-950 px-5 py-3 text-sm font-bold text-white hover:bg-brand-800"
            >
              Voltar pra home
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      )}

      <ProductSection
        eyebrow={hits.length > 0 ? "Galera também olha" : "Sugestões pra você"}
        title="Combina com a sua vibe."
        description="Mix entre LED, beleza, streetwear e papelaria — pra quem gosta de variar."
        products={hits.length > 0 ? FOR_YOU : BESTSELLERS}
        tone="muted"
        accent="pink"
      />
    </>
  );
}

function SearchPageFallback() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-shell px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-3 text-center">
          <Sparkles className="h-6 w-6 animate-pulse text-brand-600" />
          <p className="text-sm text-ink-500">Procurando na galáxia Nebulari...</p>
        </div>
      </div>
    </section>
  );
}

export default function BuscaPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white">
      <ShopHeader />
      <Suspense fallback={<SearchPageFallback />}>
        <SearchResults />
      </Suspense>
      <Newsletter />
      <ShopFooter />
    </main>
  );
}
