"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Zap, Timer, ArrowRight } from "lucide-react";
import ProductCard from "./ProductCard";
import { FLASH_DEALS } from "@/lib/store-data";

const pad = (n: number) => n.toString().padStart(2, "0");

export default function FlashDeals() {
  const [time, setTime] = useState({ h: 4, m: 32, s: 18 });

  useEffect(() => {
    const id = setInterval(() => {
      setTime((t) => {
        let s = t.s - 1;
        let m = t.m;
        let h = t.h;
        if (s < 0) {
          s = 59;
          m -= 1;
        }
        if (m < 0) {
          m = 59;
          h -= 1;
        }
        if (h < 0) return { h: 23, m: 59, s: 59 };
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative isolate overflow-hidden py-12 sm:py-14">
      {/* Camada cósmica sutil */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-50/70 via-accent-50/60 to-pink-50/70" />
      <div className="pointer-events-none absolute -left-20 top-10 -z-10 h-72 w-72 rounded-full bg-brand-200/45 blur-[100px]" />
      <div className="pointer-events-none absolute -right-20 bottom-10 -z-10 h-72 w-72 rounded-full bg-accent-200/45 blur-[100px]" />

      <div className="mx-auto max-w-shell px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center gap-3.5">
            <motion.div
              animate={{ rotate: [0, -8, 8, -8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 1.6 }}
              className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-accent-500 text-white shadow-lift"
            >
              <Zap className="h-6 w-6 fill-current" />
              <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/30" />
            </motion.div>
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-accent-500 to-pink-500 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
                Termina em breve
              </span>
              <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink-950 sm:text-[28px]">
                Drop da <span className="text-gradient">noite</span>
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl bg-ink-950 px-3.5 py-2.5 text-white shadow-lift">
            <Timer className="h-4 w-4 text-amber-300" />
            <div className="flex items-center gap-1.5">
              {[
                { v: pad(time.h), l: "hrs" },
                { v: pad(time.m), l: "min" },
                { v: pad(time.s), l: "seg" },
              ].map((t) => (
                <div
                  key={t.l}
                  className="min-w-[34px] rounded-md bg-white/8 px-1.5 py-1 text-center ring-1 ring-inset ring-white/10"
                >
                  <span className="block font-display text-sm font-extrabold leading-none tabular-nums">
                    {t.v}
                  </span>
                  <span className="text-[8px] font-bold uppercase text-white/55">
                    {t.l}
                  </span>
                </div>
              ))}
            </div>
            <a
              href="#"
              className="ml-1 hidden items-center gap-1 rounded-full bg-gradient-to-r from-brand-600 to-accent-500 px-3 py-1 text-[11px] font-bold transition-colors hover:from-brand-700 hover:to-accent-600 sm:inline-flex"
            >
              Ver tudo <ArrowRight className="h-3 w-3" />
            </a>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
          {FLASH_DEALS.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
