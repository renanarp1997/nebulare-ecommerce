"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import Logo from "./Logo";

const NAV_LINKS = [
  { label: "Início", href: "#inicio" },
  { label: "Soluções", href: "#solucoes" },
  { label: "Como Funciona", href: "#como-funciona" },
  { label: "Resultados", href: "#resultados" },
  { label: "Contato", href: "#contato" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-ink-100 shadow-[0_2px_20px_-10px_rgba(30,27,75,0.15)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <a href="#inicio" className="flex items-center" aria-label="Bazam">
          <Logo />
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-4 py-2 text-sm font-medium text-ink-600 transition-colors hover:bg-ink-100/60 hover:text-ink-900"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <a
            href="#contato"
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-700 to-brand-500 px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition-all hover:shadow-glow hover:-translate-y-0.5"
          >
            Falar com especialista
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-ink-200 bg-white/80 text-ink-700 backdrop-blur"
          aria-label="Abrir menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-t border-ink-100 bg-white/95 backdrop-blur-xl"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink-700 hover:bg-ink-100"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contato"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-700 to-brand-500 px-5 py-3 text-sm font-semibold text-white shadow-soft"
              >
                Falar com especialista
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
