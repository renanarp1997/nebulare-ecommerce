"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import type { Product } from "@/lib/store-data";

type Props = {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  products: Product[];
  tone?: "light" | "muted";
  accent?: "brand" | "red" | "amber" | "accent" | "pink";
  href?: string;
};

const ACCENT_STYLES: Record<NonNullable<Props["accent"]>, string> = {
  brand: "bg-brand-50 text-brand-700",
  red: "bg-red-50 text-red-600",
  amber: "bg-amber-50 text-amber-700",
  accent: "bg-accent-50 text-accent-700",
  pink: "bg-pink-50 text-pink-700",
};

export default function ProductSection({
  id,
  eyebrow,
  title,
  description,
  products,
  tone = "light",
  accent = "brand",
  href = "#",
}: Props) {
  return (
    <section
      id={id}
      className={`relative py-12 sm:py-14 ${
        tone === "muted" ? "bg-ink-50/60" : ""
      }`}
    >
      <div className="mx-auto max-w-shell px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="min-w-0 flex-1">
            {eyebrow && (
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${ACCENT_STYLES[accent]}`}
              >
                <span className="h-1 w-1 rounded-full bg-current" />
                {eyebrow}
              </span>
            )}
            <h2 className="mt-2 font-display text-xl font-extrabold tracking-tight text-ink-950 sm:text-2xl lg:text-[28px]">
              {title}
            </h2>
            {description && (
              <p className="mt-1.5 max-w-xl text-sm text-ink-500">{description}</p>
            )}
          </div>
          <a
            href={href}
            className="group inline-flex shrink-0 items-center gap-1.5 self-start rounded-full bg-ink-950 px-4 py-2 text-[12px] font-semibold text-white transition-colors hover:bg-brand-700 sm:self-auto"
          >
            Ver todos
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </a>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
