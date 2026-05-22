"use client";

import {
  Instagram,
  Facebook,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Lock,
  Award,
  MessageCircle,
} from "lucide-react";
import Logo from "@/components/Logo";

const COLUMNS = [
  {
    title: "Sobre",
    links: [
      "Quem é a Nebulari",
      "Programa Nebulari+",
      "Trabalhe com a gente",
      "Imprensa",
      "Sustentabilidade",
    ],
  },
  {
    title: "Ajuda",
    links: [
      "Central de ajuda",
      "Acompanhar pedido",
      "Trocas e devoluções",
      "Prazos de entrega",
      "Fale no WhatsApp",
    ],
  },
  {
    title: "Comprar",
    links: [
      "Drop da noite",
      "Mais vendidos",
      "Recém-chegados",
      "Cupons ativos",
      "Cartão presente",
    ],
  },
];

function PaymentBadge({ label, bg }: { label: string; bg: string }) {
  return (
    <span
      className={`flex h-7 w-12 items-center justify-center rounded-md text-[9px] font-black tracking-tight text-white shadow-sm ${bg}`}
    >
      {label}
    </span>
  );
}

export default function ShopFooter() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-ink-100 bg-ink-50/60">
      <div className="pointer-events-none absolute -left-32 top-0 -z-10 h-72 w-72 rounded-full bg-brand-100/50 blur-[100px]" />
      <div className="pointer-events-none absolute right-0 bottom-0 -z-10 h-72 w-72 rounded-full bg-accent-100/50 blur-[100px]" />

      <div className="mx-auto max-w-shell px-4 py-16 sm:px-6 lg:px-8">
        {/* Top grid */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-600">
              A galáxia do que rolou no FYP. LED, beleza, streetwear, gaming,
              plushies e perfume — com curadoria de gente real e entrega que
              respeita o seu tempo.
            </p>

            <div className="mt-6 space-y-3 text-sm text-ink-700">
              <div className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                <div>
                  <p className="font-semibold text-ink-950">SAC · 0800 000 0000</p>
                  <p className="text-xs text-ink-500">Seg a Sex · 9h às 18h</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                <div>
                  <p className="font-semibold text-ink-950">WhatsApp</p>
                  <p className="text-xs text-ink-500">+55 (11) 90000-0000</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                <p className="font-semibold text-ink-950">
                  oi@nebulari.com.br
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                <p>R. dos Pinheiros, 1200 · São Paulo · SP</p>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2">
              {[Instagram, Facebook, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-ink-200 bg-white text-ink-700 transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:text-brand-700 hover:shadow-card"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5">
            {COLUMNS.map((c) => (
              <div key={c.title}>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink-950">
                  {c.title}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {c.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#"
                        className="text-sm text-ink-600 transition-colors hover:text-brand-700"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Payments + security */}
          <div className="lg:col-span-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink-950">
              Formas de pagamento
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-1.5">
              <PaymentBadge label="VISA" bg="bg-[#1A1F71]" />
              <PaymentBadge label="MASTER" bg="bg-gradient-to-r from-[#EB001B] to-[#F79E1B]" />
              <PaymentBadge label="ELO" bg="bg-ink-900" />
              <PaymentBadge label="HIPER" bg="bg-[#E10C20]" />
              <PaymentBadge label="AMEX" bg="bg-[#2671B9]" />
              <PaymentBadge label="PIX" bg="bg-accent-600" />
              <PaymentBadge label="BOLETO" bg="bg-ink-700" />
            </div>

            <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.18em] text-ink-950">
              Segurança e selos
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {[
                { Icon: Lock, label: "SSL 256-bit", color: "text-accent-600" },
                { Icon: ShieldCheck, label: "Site Blindado", color: "text-brand-600" },
                { Icon: Award, label: "RA1000", color: "text-amber-500" },
              ].map(({ Icon, label, color }) => (
                <div
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-ink-200 bg-white px-2.5 py-1.5 shadow-ring"
                >
                  <Icon className={`h-3.5 w-3.5 ${color}`} />
                  <span className="text-[10px] font-bold text-ink-800">{label}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-ink-200 bg-white px-4 py-3 shadow-ring">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink-500">
                Baixe o app
              </p>
              <div className="mt-2 flex items-center gap-2">
                <a
                  href="#"
                  className="flex-1 rounded-lg bg-ink-950 px-2.5 py-1.5 text-center text-[10px] font-bold text-white transition-colors hover:bg-brand-800"
                >
                  App Store
                </a>
                <a
                  href="#"
                  className="flex-1 rounded-lg bg-accent-600 px-2.5 py-1.5 text-center text-[10px] font-bold text-white transition-colors hover:bg-accent-700"
                >
                  Google Play
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-ink-200 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-ink-500">
            © {new Date().getFullYear()} Nebulari Comércio Digital LTDA · CNPJ
            00.000.000/0001-00
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-ink-500">
            <a href="#" className="hover:text-brand-700">
              Política de privacidade
            </a>
            <a href="#" className="hover:text-brand-700">
              Termos de uso
            </a>
            <a href="#" className="hover:text-brand-700">
              Política de cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
