"use client";

import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

const PLATFORMS = [
  { name: "Shopify", color: "#95BF47" },
  { name: "VTEX", color: "#EE3537" },
  { name: "Nuvemshop", color: "#2068FE" },
  { name: "WooCommerce", color: "#7F54B3" },
  { name: "Tray", color: "#FF6B00" },
  { name: "Loja Integrada", color: "#FF8200" },
  { name: "Magento", color: "#F26322" },
  { name: "Wake", color: "#0066FF" },
];

const MARKETPLACES = [
  { name: "Mercado Livre", color: "#FFE600", text: "#1F2937" },
  { name: "Amazon", color: "#FF9900", text: "#1F2937" },
  { name: "Shopee", color: "#EE4D2D", text: "#FFFFFF" },
  { name: "Magalu", color: "#0086FF", text: "#FFFFFF" },
];

export default function Platforms() {
  return (
    <section className="relative border-y border-ink-100 bg-white py-14">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink-500">
            Trabalhamos com as principais plataformas do mercado
          </p>
        </motion.div>

        {/* Plataformas */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {PLATFORMS.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="group flex items-center justify-center gap-2 rounded-xl border border-ink-100 bg-white px-3 py-3 transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-card"
              title={p.name}
            >
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full transition-transform group-hover:scale-125"
                style={{ background: p.color }}
              />
              <span className="truncate text-xs font-bold text-ink-700">
                {p.name}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Marketplaces */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-ink-50 px-3 py-1.5 text-[11px] font-semibold text-ink-600">
            <ShoppingBag className="h-3 w-3" />
            Marketplaces
          </span>
          {MARKETPLACES.map((m) => (
            <span
              key={m.name}
              className="inline-flex items-center gap-1.5 rounded-full border border-ink-100 px-3 py-1.5 text-[11px] font-semibold"
              style={{ background: m.color, color: m.text }}
            >
              {m.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
