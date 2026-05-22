"use client";

import { motion } from "framer-motion";
import {
  TrendingDown,
  Target,
  Boxes,
  Map,
  MessageSquareX,
  ShoppingCart,
  BarChart3,
  AlertTriangle,
} from "lucide-react";

const PROBLEMS = [
  {
    icon: TrendingDown,
    title: "Loja com poucas vendas",
    desc: "Tráfego entra, mas o faturamento não cresce no ritmo esperado.",
  },
  {
    icon: Target,
    title: "Anúncios sem retorno",
    desc: "Investimento alto em mídia e ROAS abaixo do que sua loja merece.",
  },
  {
    icon: Boxes,
    title: "Catálogo desorganizado",
    desc: "Produtos mal descritos, fotos ruins e categorias confusas.",
  },
  {
    icon: Map,
    title: "Falta de estratégia",
    desc: "Decisões no improviso, sem plano claro de crescimento.",
  },
  {
    icon: MessageSquareX,
    title: "Atendimento lento",
    desc: "Cliente esperando resposta enquanto a concorrência fecha a venda.",
  },
  {
    icon: ShoppingCart,
    title: "Carrinhos abandonados",
    desc: "Quase compra, mas desiste — e ninguém faz a recuperação.",
  },
  {
    icon: BarChart3,
    title: "Falta de análise de dados",
    desc: "Você não sabe o que funciona, o que para e o que escalar.",
  },
  {
    icon: AlertTriangle,
    title: "Operação reativa",
    desc: "Problemas em produção apagados no susto, sem prevenção.",
  },
];

export default function Problems() {
  return (
    <section className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-red-600"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
            Dores que travam o crescimento
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-5 text-balance font-display text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl lg:text-5xl"
          >
            Reconhece alguma dessas situações na sua loja?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-base text-ink-600 sm:text-lg"
          >
            A maioria dos e-commerces vive os mesmos problemas — e quase todos
            têm a mesma causa: operação sem método.
          </motion.p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PROBLEMS.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.45, delay: i * 0.04 }}
                className="group relative rounded-2xl border border-ink-100 bg-white p-5 shadow-card transition-all hover:-translate-y-1 hover:border-red-100 hover:shadow-[0_12px_40px_-12px_rgba(220,38,38,0.18)]"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-500 transition-colors group-hover:bg-red-100">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-base font-semibold text-ink-900">
                  {p.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-600">
                  {p.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
