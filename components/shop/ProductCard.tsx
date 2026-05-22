"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, ShoppingBag, Star, Truck } from "lucide-react";
import { motion } from "framer-motion";
import type { Badge, Product } from "@/lib/store-data";
import { useFavorites } from "@/lib/favorites";
import { useCart, openCart } from "@/lib/cart";
import ProductIllustration from "./ProductIllustration";

const BADGE_STYLES: Record<Badge, string> = {
  "Top 1": "bg-amber-400/95 text-ink-950 ring-1 ring-amber-300",
  "Mais vendido": "bg-brand-600/95 text-white ring-1 ring-brand-400/60",
  Novo: "bg-accent-500/95 text-white ring-1 ring-accent-300/60",
  Oferta: "bg-gradient-to-r from-accent-500 to-pink-500 text-white ring-1 ring-white/20",
  Premium: "bg-ink-950/95 text-white ring-1 ring-white/10",
  "Frete grátis": "bg-aux-500/95 text-white ring-1 ring-aux-300/60",
};

function brl(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export default function ProductCard({ product }: { product: Product }) {
  const [imgFailed, setImgFailed] = useState(false);
  const { isFav, toggle } = useFavorites();
  const { add } = useCart();
  const fav = isFav(product.id);
  const installments = product.installments ?? 6;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    add(product.id, 1);
    openCart();
  };
  const installmentValue = (product.price / installments)
    .toFixed(2)
    .replace(".", ",");
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const showImage = product.image && !imgFailed;

  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-ink-100 transition-all duration-300 hover:-translate-y-1 hover:ring-brand-200/80 hover:shadow-lift"
    >
      {/* Media */}
      <div className="relative aspect-square w-full overflow-hidden">
        {showImage ? (
          <>
            <Image
              src={product.image!}
              alt={product.name}
              fill
              sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 18vw"
              className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.07]"
              onError={() => setImgFailed(true)}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/15 via-transparent to-white/0 mix-blend-multiply" />
          </>
        ) : (
          <div
            className={`absolute inset-0 bg-gradient-to-br ${product.gradient}`}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.22),transparent_60%)]" />
            <div className="absolute inset-0 bg-grid opacity-[0.05]" />
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <ProductIllustration shape={product.shape} className="h-full w-full max-h-44" />
            </div>
          </div>
        )}

        {/* Top-left badges */}
        <div className="absolute left-2.5 top-2.5 z-10 flex flex-col gap-1">
          {discount > 0 && (
            <span className="inline-flex items-center rounded-md bg-ink-950/90 px-1.5 py-0.5 text-[10px] font-black tracking-tight text-white shadow-soft backdrop-blur">
              −{discount}%
            </span>
          )}
          {product.badge && (
            <span
              className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider shadow-sm backdrop-blur ${BADGE_STYLES[product.badge]}`}
            >
              {product.badge}
            </span>
          )}
        </div>

        {/* Top-right wishlist */}
        <button
          aria-label={fav ? "Remover dos favoritos" : "Favoritar"}
          aria-pressed={fav}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggle(product.id);
          }}
          className={`absolute right-2.5 top-2.5 z-10 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur transition-all hover:scale-110 ${
            fav
              ? "bg-pink-500 text-white ring-1 ring-pink-300 shadow-glow"
              : "bg-white/90 text-ink-700 ring-1 ring-ink-200/60 hover:bg-white hover:text-pink-500"
          }`}
        >
          <Heart className={`h-3.5 w-3.5 ${fav ? "fill-current" : ""}`} />
        </button>

        {/* Quick add (hover) */}
        <div className="pointer-events-none absolute inset-x-2.5 bottom-2.5 z-10 translate-y-2 opacity-0 transition-all duration-300 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
          <button
            onClick={handleAdd}
            className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-ink-950/92 px-3 py-2 text-[11px] font-bold text-white shadow-soft backdrop-blur transition-colors hover:bg-brand-700"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            Adicionar
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col p-3.5">
        <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-brand-700/85">
          {product.brand}
        </p>
        <h3 className="mt-0.5 line-clamp-2 min-h-[2.2rem] text-[13px] font-semibold leading-snug text-ink-900">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="mt-1.5 flex items-center gap-1">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className={`h-2.5 w-2.5 ${
                  i <= Math.round(product.rating)
                    ? "fill-amber-400 text-amber-400"
                    : "fill-ink-200 text-ink-200"
                }`}
              />
            ))}
          </div>
          <span className="text-[10px] font-bold text-ink-800">
            {product.rating.toFixed(1)}
          </span>
          <span className="text-[10px] text-ink-400">({product.reviews})</span>
        </div>

        <div className="mt-2 flex flex-1 flex-col justify-end">
          {product.oldPrice && (
            <span className="text-[10px] text-ink-400 line-through">
              {brl(product.oldPrice)}
            </span>
          )}
          <div className="flex items-baseline gap-1.5">
            <span className="font-display text-[17px] font-extrabold tracking-tight text-ink-950">
              {brl(product.price)}
            </span>
            <span className="text-[9px] font-bold text-aux-700">à vista</span>
          </div>
          <p className="mt-0.5 text-[10px] text-ink-500">
            {installments}× de{" "}
            <span className="font-semibold text-ink-700">
              R$ {installmentValue}
            </span>{" "}
            sem juros
          </p>
          {product.freeShipping && (
            <p className="mt-1.5 inline-flex items-center gap-1 text-[10px] font-bold text-aux-700">
              <Truck className="h-2.5 w-2.5" />
              FRETE GRÁTIS
            </p>
          )}
        </div>
      </div>
    </motion.article>
  );
}
