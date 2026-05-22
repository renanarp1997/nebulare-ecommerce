"use client";

import { Truck, CreditCard, RefreshCcw, ShieldCheck } from "lucide-react";

const ITEMS = [
  {
    icon: Truck,
    title: "Frete grátis",
    desc: "Acima de R$ 199 para todo Brasil",
  },
  {
    icon: CreditCard,
    title: "10× sem juros",
    desc: "No cartão ou 12% off no Pix",
  },
  {
    icon: RefreshCcw,
    title: "Troca fácil",
    desc: "Até 30 dias para devolução",
  },
  {
    icon: ShieldCheck,
    title: "Compra segura",
    desc: "SSL 256-bit · pagamento criptografado",
  },
];

export default function BenefitsBar() {
  return (
    <section className="border-y border-ink-100 bg-white py-4 sm:py-5">
      <div className="mx-auto max-w-shell px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-4">
          {ITEMS.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.title}
                className="group flex items-center gap-3 rounded-2xl px-2 py-1.5 transition-colors hover:bg-ink-50/60"
              >
                <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-ink-950 to-brand-900 text-white shadow-card transition-transform duration-300 group-hover:rotate-[-3deg]">
                  <Icon className="h-4 w-4" />
                  <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-semibold text-ink-950">
                    {b.title}
                  </p>
                  <p className="truncate text-[11px] text-ink-500">{b.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
