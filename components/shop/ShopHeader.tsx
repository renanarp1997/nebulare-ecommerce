"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  User,
  ShoppingBag,
  MapPin,
  ChevronDown,
  Menu,
  X,
  Truck,
  Package,
  Zap,
  Flame,
  Tag,
  Sparkles,
  Gift,
} from "lucide-react";
import Logo from "@/components/Logo";
import MegaMenu from "./MegaMenu";
import SearchBar from "./SearchBar";
import SideCart from "./SideCart";
import { useFavorites } from "@/lib/favorites";
import { useCart, CART_OPEN_EVENT } from "@/lib/cart";

const SHORTCUTS = [
  { label: "Drop da noite", icon: Flame, color: "text-pink-500", href: "/drop-da-noite" },
  { label: "Mais vendidos", icon: Zap, color: "text-amber-500", href: "/mais-vendidos" },
  { label: "Recém-chegados", icon: Sparkles, color: "text-brand-600", href: "/recem-chegados" },
  { label: "Cupom NEBULA10", icon: Tag, color: "text-accent-600", href: "/cupom-nebula10" },
  { label: "Frete grátis R$ 149+", icon: Truck, color: "text-aux-600", href: "/frete-gratis" },
  { label: "Wishlist do mês", icon: Gift, color: "text-fuchsia-500", href: "/wishlist" },
];

const CATS: { name: string; slug: string }[] = [
  { name: "LED & Quarto", slug: "led-quarto" },
  { name: "Beleza", slug: "beleza" },
  { name: "Perfume", slug: "perfume" },
  { name: "Streetwear", slug: "streetwear" },
  { name: "Y2K", slug: "y2k" },
  { name: "Tech & Áudio", slug: "tech" },
  { name: "Gaming", slug: "gaming" },
  { name: "Plush & Cozy", slug: "plush" },
  { name: "Papelaria", slug: "papelaria" },
  { name: "Volta às aulas", slug: "volta-as-aulas" },
  { name: "Snacks", slug: "snacks" },
  { name: "K-Drop & Anime", slug: "k-drop-anime" },
];

export default function ShopHeader() {
  const [open, setOpen] = useState(false);
  const [catsOpen, setCatsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { count: favCount, hydrated: favHydrated } = useFavorites();
  const { totalCount: cartCount, hydrated: cartHydrated } = useCart();

  useEffect(() => {
    const onOpenCart = () => setCartOpen(true);
    window.addEventListener(CART_OPEN_EVENT, onOpenCart);
    return () => window.removeEventListener(CART_OPEN_EVENT, onOpenCart);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      {/* Nível 1 — utility bar (some quando rolar para o hero) */}
      <div className="bg-ink-950 text-white">
        <div className="mx-auto flex max-w-shell items-center justify-between gap-2 px-3 py-1.5 text-[10px] sm:gap-3 sm:px-6 sm:text-[11px]">
          <div className="flex items-center gap-1.5 min-w-0">
            <Truck className="h-3 w-3 shrink-0 text-accent-400" />
            <span className="truncate text-white/85">
              <span className="font-semibold text-white">Frete grátis</span>
              <span className="hidden sm:inline"> acima de R$ 149 · envio em 24h pra capitais</span>
              <span className="sm:hidden"> R$ 149+ · 24h</span>
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-2 text-white/60 sm:gap-3">
            <a href="#" className="hidden hover:text-white sm:inline">
              Programa Nebulari+
            </a>
            <a href="#" className="hidden hover:text-white sm:inline">
              Ajuda
            </a>
            <a href="#" className="flex items-center gap-1 hover:text-white">
              <MapPin className="h-3 w-3" />
              <span className="hidden sm:inline">Enviar para </span>01310-100
            </a>
          </div>
        </div>
      </div>

      {/* Nível 2 — main bar */}
      <div
        className={`border-b border-ink-100 bg-white/95 backdrop-blur-xl transition-shadow ${
          scrolled ? "shadow-card" : ""
        }`}
      >
        <div className="mx-auto flex max-w-shell items-center gap-2 px-3 py-3 sm:gap-4 sm:px-6 lg:gap-6">
          <a href="/" className="shrink-0" aria-label="Nebulari">
            <Logo size="md" />
          </a>

          {/* Departamentos — abre mega menu */}
          <button
            onClick={() => setCatsOpen((v) => !v)}
            aria-expanded={catsOpen}
            className={`hidden shrink-0 items-center gap-1.5 rounded-full px-4 py-2.5 text-xs font-semibold transition-all lg:flex ${
              catsOpen
                ? "bg-gradient-to-r from-brand-700 to-brand-900 text-white shadow-glow"
                : "bg-ink-950 text-white hover:bg-brand-800"
            }`}
          >
            <Menu className="h-3.5 w-3.5" />
            Departamentos
            <ChevronDown
              className={`h-3 w-3 transition-transform duration-200 ${catsOpen ? "rotate-180" : ""}`}
            />
          </button>

          {/* Search */}
          <SearchBar />

          {/* Actions */}
          <div className="flex items-center gap-1">
            <a
              href="/entrar"
              className="hidden items-center gap-2 rounded-xl px-2.5 py-2 text-left text-xs transition-colors hover:bg-ink-50 lg:flex"
            >
              <User className="h-5 w-5 text-ink-700" />
              <div className="hidden xl:block">
                <p className="text-[10px] leading-tight text-ink-500">Olá,</p>
                <p className="text-[12px] font-bold leading-tight text-ink-950">
                  Entrar
                </p>
              </div>
            </a>

            <button className="hidden items-center gap-2 rounded-xl px-2.5 py-2 transition-colors hover:bg-ink-50 lg:flex">
              <Package className="h-5 w-5 text-ink-700" />
              <div className="hidden xl:block">
                <p className="text-[10px] leading-tight text-ink-500">Meus</p>
                <p className="text-[12px] font-bold leading-tight text-ink-950">
                  pedidos
                </p>
              </div>
            </button>

            <a
              href="/favoritos"
              aria-label="Favoritos"
              className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-ink-700 transition-colors hover:bg-ink-50"
            >
              <Heart className={`h-5 w-5 ${favHydrated && favCount > 0 ? "fill-pink-500 text-pink-500" : ""}`} />
              {favHydrated && favCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white ring-2 ring-white">
                  {favCount}
                </span>
              )}
            </a>

            <button
              aria-label="Carrinho"
              onClick={() => setCartOpen(true)}
              className="relative flex shrink-0 items-center gap-1.5 rounded-full bg-ink-950 px-2.5 py-2 text-xs font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-brand-800 hover:shadow-glow sm:gap-2 sm:px-3.5 sm:py-2.5"
            >
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden md:inline">Carrinho</span>
              <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-white px-1 text-[9px] font-bold text-ink-950">
                {cartHydrated ? cartCount : 0}
              </span>
            </button>

            <button
              onClick={() => setOpen((v) => !v)}
              className="ml-1 flex h-10 w-10 items-center justify-center rounded-xl border border-ink-200 bg-white text-ink-700 lg:hidden"
              aria-label="Menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Nível 3 — atalhos */}
        <div className="border-t border-ink-100 bg-white">
          <div className="mx-auto flex max-w-shell items-center gap-0.5 overflow-x-auto px-3 py-2 sm:gap-1 sm:px-6 no-scrollbar">
            {SHORTCUTS.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  className="flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold text-ink-700 transition-colors hover:bg-ink-50 hover:text-ink-950"
                >
                  <Icon className={`h-3 w-3 ${s.color}`} />
                  {s.label}
                </a>
              );
            })}
            <a
              href="/drop-da-noite"
              className="ml-auto hidden shrink-0 items-center gap-1 rounded-full bg-gradient-to-r from-brand-600 to-accent-500 px-3 py-1 text-[11px] font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-card sm:flex"
            >
              <Flame className="h-3 w-3" /> Drop da semana
            </a>
          </div>
        </div>

        {/* Mega menu de departamentos */}
        <AnimatePresence>
          {catsOpen && (
            <MegaMenu open={catsOpen} onClose={() => setCatsOpen(false)} />
          )}
        </AnimatePresence>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="border-t border-ink-100 bg-white lg:hidden"
            >
              <div className="grid grid-cols-2 gap-1 px-4 py-3">
                {CATS.map((c) => (
                  <a
                    key={c.slug}
                    href={`/departamento/${c.slug}`}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-2 text-xs font-semibold text-ink-700 hover:bg-ink-50"
                  >
                    {c.name}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <SideCart open={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  );
}
