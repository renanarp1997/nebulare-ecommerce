"use client";

import { Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import Logo from "./Logo";

const QUICK_LINKS = [
  { l: "Início", h: "#inicio" },
  { l: "Soluções", h: "#solucoes" },
  { l: "Como Funciona", h: "#como-funciona" },
  { l: "Resultados", h: "#resultados" },
  { l: "Contato", h: "#contato" },
];

const SOLUTIONS = [
  "Gestão de loja virtual",
  "Otimização de conversão",
  "Gestão de anúncios",
  "Estratégia de crescimento",
  "Análise de métricas",
];

export default function Footer() {
  return (
    <footer className="relative border-t border-ink-100 bg-ink-50/50">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo />
            <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-600">
              A Bazam é a gestora de e-commerce que cuida da operação,
              estratégia e crescimento da sua loja online — para você focar no
              produto enquanto a gente escala as vendas.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink-200 bg-white text-ink-700 transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:text-brand-700"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink-200 bg-white text-ink-700 transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:text-brand-700"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="mailto:contato@bazam.com.br"
                aria-label="E-mail"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink-200 bg-white text-ink-700 transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:text-brand-700"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <p className="text-[11px] font-bold uppercase tracking-wider text-ink-900">
              Navegação
            </p>
            <ul className="mt-4 space-y-2.5">
              {QUICK_LINKS.map((l) => (
                <li key={l.h}>
                  <a
                    href={l.h}
                    className="text-sm text-ink-600 transition-colors hover:text-brand-700"
                  >
                    {l.l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="text-[11px] font-bold uppercase tracking-wider text-ink-900">
              Soluções
            </p>
            <ul className="mt-4 space-y-2.5">
              {SOLUTIONS.map((s) => (
                <li key={s}>
                  <a
                    href="#solucoes"
                    className="text-sm text-ink-600 transition-colors hover:text-brand-700"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="text-[11px] font-bold uppercase tracking-wider text-ink-900">
              Contato
            </p>
            <ul className="mt-4 space-y-3 text-sm text-ink-600">
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                contato@bazam.com.br
              </li>
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                +55 (11) 4000-0000
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                São Paulo, Brasil
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-ink-200 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-ink-500">
            © {new Date().getFullYear()} Bazam · Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-5 text-xs text-ink-500">
            <a href="#" className="hover:text-brand-700">
              Política de privacidade
            </a>
            <a href="#" className="hover:text-brand-700">
              Termos de uso
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
