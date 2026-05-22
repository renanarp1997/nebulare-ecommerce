"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { DEPARTMENTS } from "@/lib/store-data";

export default function Departments() {
  return (
    <section className="bg-white py-14 lg:py-20">
      <div className="mx-auto max-w-shell px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-[11px] font-semibold tracking-wide text-brand-700">
              <span className="h-1 w-1 rounded-full bg-brand-500" />
              Departamentos
            </span>
            <h2 className="mt-3 font-display text-2xl font-extrabold tracking-tight text-ink-950 sm:text-3xl lg:text-[36px]">
              Cada corredor da loja, no detalhe.
            </h2>
            <p className="mt-3 text-sm text-ink-500 sm:text-base">
              Banners visuais que abrem o que importa: catálogo completo,
              filtros úteis e o estoque atualizado em tempo real.
            </p>
          </div>
          <a
            href="#"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800"
          >
            Ver todos
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-12" />
          </a>
        </div>

        {/* Bento: 2 grandes + 4 médios */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-6 sm:gap-5 lg:gap-6">
          {DEPARTMENTS.map((d, i) => {
            const isFeatured = i < 2;
            return (
              <motion.a
                key={d.id}
                href={`/departamento/${d.id}`}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: i * 0.06 }}
                className={`group relative isolate flex min-h-[180px] overflow-hidden rounded-3xl bg-gradient-to-br ${d.gradient} p-5 text-white shadow-card transition-all hover:-translate-y-1 hover:shadow-lift sm:p-7 ${
                  isFeatured ? "sm:col-span-3 sm:min-h-[280px]" : "sm:col-span-3 lg:col-span-2 sm:min-h-[200px]"
                }`}
              >
                <div className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-[0.06]" />
                <div className="pointer-events-none absolute -right-8 -top-12 -z-10 h-44 w-44 rounded-full bg-white/15 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-12 -left-12 -z-10 h-44 w-44 rounded-full bg-black/15 blur-3xl" />

                <div className="relative flex w-full flex-col justify-between gap-4 sm:gap-5">
                  <div className="max-w-[55%] sm:max-w-none">
                    <span className="inline-flex items-center rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur">
                      {d.pitch}
                    </span>
                    <h3 className={`mt-3 font-display font-extrabold leading-[1.05] tracking-tight ${isFeatured ? "text-xl sm:text-3xl lg:text-4xl" : "text-xl sm:text-2xl lg:text-[26px]"}`}>
                      {d.name}
                    </h3>
                    <p className="mt-2 max-w-xs text-[12px] text-white/80 sm:text-[13px]">
                      {d.sub}
                    </p>
                  </div>

                  <div className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/12 px-3 py-1.5 text-[11px] font-bold backdrop-blur transition-all group-hover:bg-white group-hover:text-ink-950">
                    Explorar
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:rotate-12" />
                  </div>
                </div>

                {/* Foto do produto à direita */}
                <div
                  className={`pointer-events-none absolute bottom-0 right-0 overflow-hidden rounded-tl-[40px] ${isFeatured ? "h-[70%] w-[42%] sm:h-[78%] sm:w-[55%]" : "h-[70%] w-[40%] sm:h-[78%] sm:w-[48%]"}`}
                >
                  <div className="relative h-full w-full">
                    <Image
                      src={d.image}
                      alt={d.name}
                      fill
                      sizes="(max-width:640px) 50vw, 25vw"
                      className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-transparent to-black/10 mix-blend-multiply" />
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
