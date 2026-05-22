"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ChevronDown,
  X,
  ArrowRight,
  TrendingUp,
  Clock,
  Tag,
} from "lucide-react";
import { searchProducts, suggestTags } from "@/lib/search";

const RECENT_KEY = "nebulari:recent-searches";
const POPULAR = [
  "Fita LED",
  "Earbuds",
  "Plushie estrela",
  "Hoodie oversized",
  "Body mist",
  "Photocards",
];

function brl(n: number) {
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function SearchBar() {
  const router = useRouter();

  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [recent, setRecent] = useState<string[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Hidrata input com ?q= e carrega histórico.
  useEffect(() => {
    try {
      const url = new URL(window.location.href);
      const initial = url.searchParams.get("q");
      if (initial) setQ(initial);
      const raw = window.localStorage.getItem(RECENT_KEY);
      if (raw) setRecent(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  // Click outside to close.
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const productHits = useMemo(() => searchProducts(q, 6), [q]);
  const tagHits = useMemo(() => suggestTags(q, 6), [q]);

  const navigationTargets = useMemo(
    () => [
      ...productHits.map((h) => ({
        type: "product" as const,
        id: h.product.id,
        href: `/busca?q=${encodeURIComponent(h.product.name)}`,
      })),
      ...tagHits.map((t) => ({
        type: "tag" as const,
        id: t,
        href: `/busca?q=${encodeURIComponent(t)}`,
      })),
    ],
    [productHits, tagHits],
  );

  function pushRecent(term: string) {
    const next = [term, ...recent.filter((r) => r !== term)].slice(0, 6);
    setRecent(next);
    try {
      window.localStorage.setItem(RECENT_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
  }

  function submit(term?: string) {
    const finalTerm = (term ?? q).trim();
    if (!finalTerm) return;
    pushRecent(finalTerm);
    setOpen(false);
    setActiveIdx(-1);
    inputRef.current?.blur();
    router.push(`/busca?q=${encodeURIComponent(finalTerm)}`);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (activeIdx >= 0 && navigationTargets[activeIdx]) {
      router.push(navigationTargets[activeIdx].href);
      setOpen(false);
      return;
    }
    submit();
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (!open) return;
    const total = navigationTargets.length;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => (i + 1) % Math.max(total, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => (i - 1 + total) % Math.max(total, 1));
    } else if (e.key === "Enter" && activeIdx >= 0) {
      // handled in onSubmit
    }
  }

  const showSuggestions = q.trim().length > 0;
  const hasResults = productHits.length > 0 || tagHits.length > 0;

  return (
    <div ref={wrapperRef} className="relative flex-1">
      <form onSubmit={onSubmit}>
        <div
          className={`flex h-11 rounded-2xl bg-ink-50 ring-1 ring-ink-200 transition-all focus-within:bg-white focus-within:ring-2 focus-within:ring-brand-500 ${open ? "bg-white ring-2 ring-brand-500" : ""}`}
        >
          <div className="hidden items-center gap-1 border-r border-ink-200 px-3 text-xs font-semibold text-ink-700 md:flex">
            Todas
            <ChevronDown className="h-3 w-3" />
          </div>
          <input
            ref={inputRef}
            type="text"
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setActiveIdx(-1);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={onKeyDown}
            placeholder="Buscar LED, skincare, hoodie, plushie..."
            className="min-w-0 flex-1 bg-transparent px-3 text-sm text-ink-950 placeholder:text-ink-400 focus:outline-none"
            aria-label="Buscar produtos"
            aria-autocomplete="list"
            aria-expanded={open}
          />
          {q && (
            <button
              type="button"
              aria-label="Limpar"
              onClick={() => {
                setQ("");
                setActiveIdx(-1);
                inputRef.current?.focus();
              }}
              className="mr-1 flex h-9 w-9 items-center justify-center self-center rounded-lg text-ink-400 hover:bg-ink-100 hover:text-ink-700"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <button
            type="submit"
            aria-label="Buscar"
            className="m-1 flex items-center gap-1.5 rounded-xl bg-ink-950 px-4 text-xs font-bold text-white transition-colors hover:bg-brand-800 sm:px-5"
          >
            <Search className="h-4 w-4" />
            <span className="hidden sm:inline">Buscar</span>
          </button>
        </div>
      </form>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 max-h-[60vh] overflow-y-auto rounded-2xl border border-ink-100 bg-white shadow-lift sm:max-h-[70vh]"
            role="listbox"
          >
            {/* No query → atalhos populares / recentes */}
            {!showSuggestions && (
              <div className="p-4">
                {recent.length > 0 && (
                  <>
                    <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-ink-500">
                      <Clock className="h-3 w-3" /> Buscas recentes
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {recent.map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => submit(r)}
                          className="rounded-full bg-ink-50 px-3 py-1 text-[12px] font-semibold text-ink-700 hover:bg-ink-100"
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </>
                )}
                <p className={`${recent.length > 0 ? "mt-5" : ""} flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-ink-500`}>
                  <TrendingUp className="h-3 w-3" /> Populares
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {POPULAR.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => submit(p)}
                      className="rounded-full bg-gradient-to-r from-brand-50 to-accent-50 px-3 py-1 text-[12px] font-semibold text-brand-800 hover:from-brand-100 hover:to-accent-100"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* With query → resultados */}
            {showSuggestions && (
              <div className="divide-y divide-ink-100">
                {!hasResults && (
                  <div className="p-6 text-center text-sm text-ink-500">
                    Nada encontrado pra <strong>{q}</strong>. Tenta uma palavra mais curta?
                  </div>
                )}

                {productHits.length > 0 && (
                  <div className="p-2">
                    <p className="px-2 py-1.5 text-[10px] font-bold uppercase tracking-wider text-ink-500">
                      Produtos
                    </p>
                    <ul>
                      {productHits.map((h, i) => {
                        const isActive = i === activeIdx;
                        return (
                          <li key={h.product.id}>
                            <button
                              type="button"
                              onMouseEnter={() => setActiveIdx(i)}
                              onClick={() => {
                                pushRecent(h.product.name);
                                setOpen(false);
                                router.push(
                                  `/busca?q=${encodeURIComponent(h.product.name)}`,
                                );
                              }}
                              className={`flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition-colors ${isActive ? "bg-ink-50" : "hover:bg-ink-50"}`}
                            >
                              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-ink-100">
                                {h.product.image && (
                                  <Image
                                    src={h.product.image}
                                    alt={h.product.name}
                                    fill
                                    sizes="48px"
                                    className="object-cover"
                                  />
                                )}
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-[13px] font-semibold text-ink-950">
                                  {h.product.name}
                                </p>
                                <p className="text-[11px] text-ink-500">
                                  {h.product.brand} · {h.product.category}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-display text-[13px] font-extrabold text-ink-950">
                                  {brl(h.product.price)}
                                </p>
                                {h.product.oldPrice && (
                                  <p className="text-[10px] text-ink-400 line-through">
                                    {brl(h.product.oldPrice)}
                                  </p>
                                )}
                              </div>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}

                {tagHits.length > 0 && (
                  <div className="p-3">
                    <p className="px-1 pb-2 text-[10px] font-bold uppercase tracking-wider text-ink-500">
                      Categorias relacionadas
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {tagHits.map((t, i) => {
                        const idx = productHits.length + i;
                        const isActive = idx === activeIdx;
                        return (
                          <button
                            key={t}
                            type="button"
                            onMouseEnter={() => setActiveIdx(idx)}
                            onClick={() => submit(t)}
                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-semibold transition-colors ${isActive ? "bg-brand-100 text-brand-800" : "bg-ink-50 text-ink-700 hover:bg-brand-50 hover:text-brand-800"}`}
                          >
                            <Tag className="h-3 w-3" />
                            {t}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => submit()}
                  className="flex w-full items-center justify-between gap-2 bg-ink-950 px-4 py-3 text-[12px] font-bold text-white transition-colors hover:bg-brand-800"
                >
                  <span>
                    Ver todos os resultados para <span className="text-accent-300">"{q}"</span>
                  </span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
