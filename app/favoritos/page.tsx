"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  HeartCrack,
  ShoppingBag,
  Trash2,
  Share2,
  Bell,
  ArrowRight,
  Sparkles,
  Star,
  Truck,
  Filter,
  Check,
} from "lucide-react";
import ShopHeader from "@/components/shop/ShopHeader";
import ProductSection from "@/components/shop/ProductSection";
import Newsletter from "@/components/shop/Newsletter";
import ShopFooter from "@/components/shop/ShopFooter";
import { useFavorites } from "@/lib/favorites";
import { useCart, openCart } from "@/lib/cart";
import { ALL_PRODUCTS } from "@/lib/search";
import { BESTSELLERS, FOR_YOU, type Product } from "@/lib/store-data";

function brl(n: number) {
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

type SortKey = "recent" | "price-asc" | "price-desc" | "rating";

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "recent", label: "Mais recentes" },
  { key: "price-asc", label: "Menor preço" },
  { key: "price-desc", label: "Maior preço" },
  { key: "rating", label: "Melhor avaliados" },
];

export default function FavoritosPage() {
  const { ids, hydrated, remove, clear } = useFavorites();
  const { add } = useCart();
  const [sort, setSort] = useState<SortKey>("recent");
  const [onlyDiscount, setOnlyDiscount] = useState(false);

  const favorites = useMemo<Product[]>(() => {
    const byId = new Map(ALL_PRODUCTS.map((p) => [p.id, p]));
    return ids.map((id) => byId.get(id)).filter((p): p is Product => !!p);
  }, [ids]);

  const filtered = useMemo(() => {
    let list = [...favorites];
    if (onlyDiscount) {
      list = list.filter((p) => p.oldPrice && p.oldPrice > p.price);
    }
    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
        break;
      case "recent":
      default:
        list.reverse();
        break;
    }
    return list;
  }, [favorites, sort, onlyDiscount]);

  const totals = useMemo(() => {
    const subtotal = filtered.reduce((sum, p) => sum + p.price, 0);
    const oldSubtotal = filtered.reduce(
      (sum, p) => sum + (p.oldPrice ?? p.price),
      0,
    );
    const economy = Math.max(oldSubtotal - subtotal, 0);
    return { subtotal, oldSubtotal, economy };
  }, [filtered]);

  // Pre-hydration skeleton
  if (!hydrated) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-white">
        <ShopHeader />
        <section className="py-16">
          <div className="mx-auto max-w-shell px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center gap-3 text-center">
              <Heart className="h-6 w-6 animate-pulse text-pink-500" />
              <p className="text-sm text-ink-500">Carregando sua lista...</p>
            </div>
          </div>
        </section>
        <ShopFooter />
      </main>
    );
  }

  const isEmpty = favorites.length === 0;

  return (
    <main className="relative min-h-screen overflow-hidden bg-white">
      <ShopHeader />

      {/* Hero */}
      <section className="relative isolate overflow-hidden py-12 sm:py-16">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-pink-50 via-white to-accent-50" />
        <div className="pointer-events-none absolute -left-32 top-0 -z-10 h-96 w-96 rounded-full bg-pink-300/40 blur-[120px]" />
        <div className="pointer-events-none absolute -right-32 bottom-0 -z-10 h-96 w-96 rounded-full bg-fuchsia-300/40 blur-[120px]" />

        <div className="mx-auto max-w-shell px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1.5 text-[11px] text-ink-500">
            <Link href="/" className="hover:text-ink-950">
              Início
            </Link>
            <span>/</span>
            <span className="font-semibold text-ink-950">Favoritos</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
          >
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-pink-500/95 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm">
                <Heart className="h-3 w-3 fill-current" />
                Sua wishlist
              </span>
              <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-ink-950 sm:text-4xl lg:text-5xl">
                Seus favoritos <span className="text-gradient">salvos</span>
              </h1>
              <p className="mt-1.5 text-sm text-ink-600">
                {isEmpty
                  ? "Ainda nada por aqui — clica no coraçãozinho dos produtos pra começar."
                  : `${favorites.length} ${favorites.length === 1 ? "item salvo" : "itens salvos"} esperando você decidir.`}
              </p>
            </div>

            {!isEmpty && (
              <div className="flex flex-wrap items-center gap-2">
                <button className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-[12px] font-bold text-ink-700 ring-1 ring-ink-200 hover:bg-ink-50">
                  <Share2 className="h-3.5 w-3.5" />
                  Compartilhar
                </button>
                <button className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-[12px] font-bold text-ink-700 ring-1 ring-ink-200 hover:bg-ink-50">
                  <Bell className="h-3.5 w-3.5" />
                  Alerta de preço
                </button>
                <button
                  onClick={() => {
                    if (confirm("Tem certeza que quer limpar toda a wishlist?")) {
                      clear();
                    }
                  }}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-[12px] font-bold text-pink-700 ring-1 ring-pink-200 hover:bg-pink-50"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Limpar lista
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {isEmpty ? (
        <EmptyState />
      ) : (
        <>
          {/* Toolbar */}
          <section className="border-y border-ink-100 bg-white py-4">
            <div className="mx-auto flex max-w-shell flex-col gap-3 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
              <div className="flex items-center gap-2">
                <Filter className="h-3.5 w-3.5 text-ink-500" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-ink-500">
                  Filtrar:
                </span>
                <button
                  onClick={() => setOnlyDiscount((v) => !v)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold transition-colors ${
                    onlyDiscount
                      ? "bg-gradient-to-r from-accent-500 to-pink-500 text-white"
                      : "bg-ink-50 text-ink-700 hover:bg-ink-100"
                  }`}
                >
                  {onlyDiscount && <Check className="h-3 w-3" />}
                  Só com desconto
                </button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-ink-500">
                  Ordenar:
                </span>
                <div className="flex flex-wrap items-center gap-1">
                  {SORT_OPTIONS.map((o) => (
                    <button
                      key={o.key}
                      onClick={() => setSort(o.key)}
                      className={`rounded-full px-3 py-1 text-[11px] font-semibold transition-colors ${
                        sort === o.key
                          ? "bg-ink-950 text-white"
                          : "bg-ink-50 text-ink-700 hover:bg-ink-100"
                      }`}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* List + summary */}
          <section className="py-10">
            <div className="mx-auto grid max-w-shell gap-6 px-4 sm:px-6 lg:grid-cols-[1fr_360px] lg:gap-10 lg:px-8">
              <div>
                <ul className="space-y-3">
                  <AnimatePresence initial={false}>
                    {filtered.map((p) => (
                      <FavoriteRow
                        key={p.id}
                        product={p}
                        onRemove={() => remove(p.id)}
                        onAdd={() => {
                          add(p.id, 1);
                          openCart();
                        }}
                      />
                    ))}
                  </AnimatePresence>
                </ul>

                {filtered.length === 0 && onlyDiscount && (
                  <div className="rounded-2xl border border-dashed border-ink-200 bg-white p-6 text-center">
                    <p className="text-sm text-ink-600">
                      Nenhum favorito com desconto agora.{" "}
                      <button
                        onClick={() => setOnlyDiscount(false)}
                        className="font-semibold text-brand-700 hover:underline"
                      >
                        Mostrar todos
                      </button>
                    </p>
                  </div>
                )}
              </div>

              {/* Summary */}
              <aside className="lg:sticky lg:top-32 lg:self-start">
                <div className="overflow-hidden rounded-2xl bg-ink-950 p-5 text-white shadow-lift">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-white/60">
                    Resumo da lista
                  </p>
                  <div className="mt-3 space-y-2 text-[13px]">
                    <div className="flex justify-between text-white/80">
                      <span>{filtered.length} itens</span>
                      <span>{brl(totals.subtotal)}</span>
                    </div>
                    {totals.economy > 0 && (
                      <div className="flex justify-between text-aux-300">
                        <span>Você economiza</span>
                        <span className="font-bold">−{brl(totals.economy)}</span>
                      </div>
                    )}
                  </div>
                  <div className="mt-4 border-t border-white/10 pt-4">
                    <div className="flex items-baseline justify-between">
                      <span className="text-[11px] uppercase tracking-wider text-white/60">
                        Total à vista
                      </span>
                      <span className="font-display text-2xl font-extrabold">
                        {brl(totals.subtotal)}
                      </span>
                    </div>
                    <p className="mt-1 text-[10px] text-white/60">
                      em até 6× sem juros · Pix com 5% off
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      filtered.forEach((p) => add(p.id, 1));
                      openCart();
                    }}
                    className="group mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-brand-500 to-accent-500 px-5 py-3.5 text-sm font-bold text-white shadow-glow transition-all hover:-translate-y-0.5"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    Adicionar tudo no carrinho
                  </button>
                  <Link
                    href="/cupom-nebula10"
                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-white/5 px-5 py-2.5 text-[12px] font-bold text-white ring-1 ring-white/15 hover:bg-white/10"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-accent-300" />
                    Aplicar cupom NEBULA10
                  </Link>
                </div>

                <div className="mt-3 rounded-2xl bg-aux-50 p-4 ring-1 ring-aux-200">
                  <div className="flex items-start gap-2">
                    <Truck className="mt-0.5 h-4 w-4 text-aux-700" />
                    <div className="text-[12px] text-aux-800">
                      <p className="font-bold">
                        {totals.subtotal >= 149
                          ? "Frete grátis liberado!"
                          : `Falta ${brl(149 - totals.subtotal)} pro frete grátis`}
                      </p>
                      <Link
                        href="/frete-gratis"
                        className="text-[11px] underline hover:text-aux-900"
                      >
                        Ver regras
                      </Link>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </section>
        </>
      )}

      <ProductSection
        eyebrow={isEmpty ? "Pra começar" : "Mais pra você"}
        title={isEmpty ? "Comece pelos mais salvos." : "Combina com a sua wishlist."}
        description="Curadoria automática pelos itens mais favoritados da galera essa semana."
        products={isEmpty ? BESTSELLERS : FOR_YOU}
        tone="muted"
        accent="pink"
      />

      <Newsletter />
      <ShopFooter />
    </main>
  );
}

function EmptyState() {
  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-pink-100 to-accent-100"
        >
          <HeartCrack className="h-9 w-9 text-pink-500" />
        </motion.div>
        <h2 className="mt-5 font-display text-2xl font-extrabold text-ink-950 sm:text-3xl">
          Wishlist vazia (por enquanto)
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-ink-600">
          Clica no coraçãozinho dos produtos que você curtir — a gente segura
          eles aqui pra você comparar, dividir e voltar quando quiser.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <Link
            href="/mais-vendidos"
            className="inline-flex items-center gap-1.5 rounded-full bg-ink-950 px-5 py-3 text-sm font-bold text-white hover:-translate-y-0.5 hover:bg-brand-800 hover:shadow-glow"
          >
            Ver mais vendidos
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/recem-chegados"
            className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-3 text-sm font-bold text-ink-950 ring-1 ring-ink-200 hover:-translate-y-0.5 hover:shadow-card"
          >
            <Sparkles className="h-4 w-4 text-accent-500" />
            Drops da semana
          </Link>
        </div>
      </div>
    </section>
  );
}

function FavoriteRow({
  product: p,
  onRemove,
  onAdd,
}: {
  product: Product;
  onRemove: () => void;
  onAdd: () => void;
}) {
  const discount = p.oldPrice
    ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100)
    : 0;

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.25 }}
      className="group flex gap-3 overflow-hidden rounded-2xl bg-white p-3 ring-1 ring-ink-100 transition-shadow hover:shadow-card sm:p-4"
    >
      {/* Imagem */}
      <div className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-xl bg-ink-100 sm:w-32">
        {p.image ? (
          <Image
            src={p.image}
            alt={p.name}
            fill
            sizes="(max-width:640px) 96px, 128px"
            className="object-cover"
          />
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${p.gradient}`} />
        )}
        {discount > 0 && (
          <span className="absolute left-1.5 top-1.5 rounded-md bg-ink-950 px-1.5 py-0.5 text-[9px] font-black text-white">
            −{discount}%
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-brand-700/85">
              {p.brand}
            </p>
            <h3 className="mt-0.5 line-clamp-2 text-[13px] font-semibold leading-snug text-ink-950 sm:text-[14px]">
              {p.name}
            </h3>
            <div className="mt-1 flex items-center gap-1.5">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className={`h-2.5 w-2.5 ${
                      i <= Math.round(p.rating)
                        ? "fill-amber-400 text-amber-400"
                        : "fill-ink-200 text-ink-200"
                    }`}
                  />
                ))}
              </div>
              <span className="text-[10px] text-ink-500">
                {p.rating.toFixed(1)} ({p.reviews})
              </span>
            </div>
          </div>

          <button
            onClick={onRemove}
            aria-label="Remover dos favoritos"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-ink-400 transition-all hover:bg-pink-50 hover:text-pink-600"
          >
            <Heart className="h-4 w-4 fill-pink-500 text-pink-500 transition-all hover:scale-110" />
          </button>
        </div>

        {/* Footer com preço + ação */}
        <div className="mt-auto flex items-end justify-between gap-3 pt-2">
          <div>
            {p.oldPrice && (
              <p className="text-[10px] text-ink-400 line-through">
                {brl(p.oldPrice)}
              </p>
            )}
            <p className="font-display text-lg font-extrabold tracking-tight text-ink-950">
              {brl(p.price)}
            </p>
            {p.freeShipping && (
              <p className="mt-0.5 inline-flex items-center gap-1 text-[10px] font-bold text-aux-700">
                <Truck className="h-2.5 w-2.5" />
                FRETE GRÁTIS
              </p>
            )}
          </div>

          <button
            onClick={onAdd}
            className="inline-flex items-center gap-1.5 rounded-full bg-ink-950 px-3.5 py-2 text-[11px] font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-brand-800 hover:shadow-glow"
          >
            <ShoppingBag className="h-3 w-3" />
            <span className="hidden sm:inline">Adicionar</span>
          </button>
        </div>
      </div>
    </motion.li>
  );
}
