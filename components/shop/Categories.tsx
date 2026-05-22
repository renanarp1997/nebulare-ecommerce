"use client";

import { motion } from "framer-motion";
import {
  Lightbulb,
  Sparkles,
  Wind,
  Shirt,
  Glasses,
  Headphones,
  Gamepad2,
  Heart,
  BookOpen,
  Backpack,
  Cookie,
  Star,
  ArrowUpRight,
} from "lucide-react";
import { CATEGORIES } from "@/lib/store-data";

const ICON_MAP: Record<string, any> = {
  Lightbulb,
  Sparkles,
  Wind,
  Shirt,
  Glasses,
  Headphones,
  Gamepad2,
  Heart,
  BookOpen,
  Backpack,
  Cookie,
  Star,
};

const SLUG_MAP: Record<string, string> = {
  stationery: "papelaria",
  school: "volta-as-aulas",
  kdrop: "k-drop-anime",
};

export default function Categories() {
  return (
    <section id="categorias" className="relative py-12 sm:py-16">
      <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-brand-50/60 to-transparent" />

      <div className="mx-auto max-w-shell px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-[11px] font-semibold tracking-wide text-brand-700">
              <span className="h-1 w-1 rounded-full bg-brand-500" />
              Explorar
            </span>
            <h2 className="mt-3 max-w-xl font-display text-2xl font-extrabold tracking-tight text-ink-950 sm:text-3xl lg:text-[34px]">
              Descubra pela sua vibe.
            </h2>
            <p className="mt-2 max-w-md text-sm text-ink-500">
              Doze universos, do glow do quarto ao setup gamer. Cada um com
              curadoria de gente que entende.
            </p>
          </div>
          <a
            href="#"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800"
          >
            Ver tudo
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-12" />
          </a>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-2.5 sm:grid-cols-4 sm:gap-3 lg:grid-cols-6">
          {CATEGORIES.map((c, i) => {
            const Icon = ICON_MAP[c.icon] ?? Sparkles;
            return (
              <motion.a
                key={c.id}
                href={`/departamento/${SLUG_MAP[c.id] ?? c.id}`}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.025 }}
                className="group relative isolate flex flex-col items-start gap-3 overflow-hidden rounded-2xl bg-white p-4 ring-1 ring-ink-100 transition-all hover:-translate-y-1 hover:ring-brand-200 hover:shadow-lift"
                title={c.name}
              >
                <div className="pointer-events-none absolute -right-8 -top-8 -z-10 h-24 w-24 rounded-full bg-gradient-to-br from-brand-100/0 to-accent-100/0 opacity-0 blur-2xl transition-opacity duration-500 group-hover:from-brand-100/80 group-hover:to-accent-100/40 group-hover:opacity-100" />

                <div
                  className={`relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${c.gradient} text-white shadow-card transition-transform duration-300 group-hover:rotate-[-3deg] group-hover:scale-105`}
                >
                  {Icon && <Icon className="h-5 w-5" />}
                  <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/15" />
                </div>

                <div className="min-w-0">
                  <p className="text-[12px] font-bold leading-tight text-ink-900">
                    {c.name}
                  </p>
                  <p className="mt-0.5 text-[10px] text-ink-400">
                    Ver drop →
                  </p>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
