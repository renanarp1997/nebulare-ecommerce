import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronDown,
  Heart,
  type LucideIcon,
  RotateCcw,
  ShieldCheck,
  Share2,
  Star,
  Truck,
} from "lucide-react";
import ShopHeader from "@/components/shop/ShopHeader";
import ProductBuyPanel from "@/components/shop/ProductBuyPanel";
import ProductIllustration from "@/components/shop/ProductIllustration";
import ProductSection from "@/components/shop/ProductSection";
import { ALL_PRODUCTS, findProductById } from "@/lib/search";

type Props = {
  params: { id: string };
};

const BENEFITS: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Truck, title: "Entrega rapida", desc: "Chega em 24-48h em capitais" },
  { icon: ShieldCheck, title: "Compra protegida", desc: "Site blindado SSL" },
  { icon: RotateCcw, title: "Troca gratis", desc: "Em ate 30 dias" },
  { icon: Star, title: "Garantia oficial", desc: "12 meses do fabricante" },
];

function brl(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function generateStaticParams() {
  return ALL_PRODUCTS.map((product) => ({ id: product.id }));
}

export function generateMetadata({ params }: Props) {
  const product = findProductById(params.id);
  if (!product) return {};
  return {
    title: `${product.name} | Bazam`,
    description: `${product.brand} em ${product.category} por ${brl(product.price)}.`,
  };
}

export default function ProductPage({ params }: Props) {
  const product = findProductById(params.id);
  if (!product) notFound();

  const related = ALL_PRODUCTS.filter(
    (item) => item.category === product.category && item.id !== product.id,
  ).slice(0, 6);

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  return (
    <main className="min-h-screen bg-white">
      <ShopHeader />

      <div className="mx-auto max-w-shell px-4 py-6 sm:px-6 lg:px-8">
        <nav className="flex flex-wrap items-center gap-2 text-[11px] font-semibold text-ink-500">
          <Link href="/" className="hover:text-brand-700">
            Inicio
          </Link>
          <span>/</span>
          <Link
            href={`/busca?q=${encodeURIComponent(product.category)}`}
            className="hover:text-brand-700"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-ink-950">{product.name}</span>
        </nav>

        <section className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)] lg:items-start">
          <div className="space-y-5">
            <div className="relative aspect-square overflow-hidden rounded-3xl bg-ink-50 shadow-lift ring-1 ring-ink-100">
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width:1024px) 100vw, 54vw"
                  className="object-cover"
                />
              ) : (
                <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient}`}>
                  <div className="absolute inset-0 flex items-center justify-center p-10">
                    <ProductIllustration
                      shape={product.shape}
                      className="h-full w-full max-h-[420px]"
                    />
                  </div>
                </div>
              )}

              {discount > 0 && (
                <span className="absolute left-4 top-4 rounded-full bg-red-500 px-3 py-1 text-xs font-black text-white shadow-soft">
                  -{discount}%
                </span>
              )}
              <div className="absolute right-4 top-4 flex flex-col gap-2">
                <button
                  type="button"
                  aria-label="Favoritar"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-ink-700 shadow-card ring-1 ring-ink-100 transition hover:text-pink-500"
                >
                  <Heart className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  aria-label="Compartilhar"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-ink-700 shadow-card ring-1 ring-ink-100 transition hover:text-brand-700"
                >
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            <section className="rounded-2xl border border-ink-100 bg-white p-5 shadow-card">
              <h2 className="text-lg font-black text-ink-950">Sobre o produto</h2>
              <p className="mt-3 text-sm leading-6 text-ink-600">
                Produto selecionado pela curadoria Bazam, com envio rapido,
                garantia oficial e acabamento premium. Ideal para quem quer
                comprar sem enrolacao e receber com rastreio em tempo real.
              </p>
            </section>

            <section className="rounded-2xl border border-ink-100 bg-white p-5 shadow-card">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-lg font-black text-ink-950">
                  Entrega e devolucao
                </h2>
                <ChevronDown className="h-5 w-5 text-ink-500" />
              </div>
            </section>
          </div>

          <aside className="lg:sticky lg:top-36">
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-brand-700">
              {product.brand}
            </p>
            <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-ink-950 sm:text-4xl">
              {product.name}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-xs">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 font-bold text-ink-800">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                {product.rating.toFixed(1)} ({product.reviews} avaliacoes)
              </span>
              <span className="inline-flex items-center gap-1.5 font-bold text-aux-700">
                <span className="h-2 w-2 rounded-full bg-aux-500" />
                {Math.max(12, Math.round(product.reviews / 140))} em estoque
              </span>
            </div>

            <div className="mt-5">
              <ProductBuyPanel product={product} />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              {BENEFITS.map(({ icon: Icon, title, desc }) => {
                return (
                  <div
                    key={title}
                    className="rounded-xl border border-ink-100 bg-white p-3 shadow-soft"
                  >
                    <Icon className="h-4 w-4 text-brand-700" />
                    <p className="mt-2 text-xs font-black text-ink-950">{title}</p>
                    <p className="mt-0.5 text-[11px] text-ink-500">{desc}</p>
                  </div>
                );
              })}
            </div>

            <section className="mt-4 rounded-2xl border border-ink-100 bg-white p-5 shadow-card">
              <h2 className="text-sm font-black text-ink-950">Avaliacoes</h2>
              <div className="mt-3 flex items-end gap-3">
                <span className="font-display text-4xl font-extrabold text-ink-950">
                  {product.rating.toFixed(1)}
                </span>
                <div className="pb-1">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <p className="mt-1 text-[11px] text-ink-500">
                    {product.reviews} avaliacoes verificadas
                  </p>
                </div>
              </div>
            </section>
          </aside>
        </section>
      </div>

      <ProductSection
        eyebrow="Voce tambem pode gostar"
        title="Produtos relacionados"
        products={related.length > 0 ? related : ALL_PRODUCTS.slice(0, 6)}
        tone="muted"
      />
    </main>
  );
}
