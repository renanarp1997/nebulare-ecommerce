"use client";

import { motion } from "framer-motion";
import {
  Package,
  ShoppingBag,
  Users,
  TrendingUp,
  CircleDot,
  Zap,
  Star,
  CheckCircle2,
  AlertCircle,
  Truck,
  CreditCard,
  Search,
  LayoutGrid,
  Megaphone,
  Settings,
  Boxes,
} from "lucide-react";

const SALES_BARS = [42, 58, 36, 72, 60, 90, 78, 96, 84, 110, 102, 124, 118, 138];

const TOP_PRODUCTS = [
  {
    name: "Tênis Runner Pro",
    sku: "TNS-RP-42",
    sold: 284,
    rev: "R$ 127.840",
    stock: 42,
    color: "from-brand-500 to-brand-700",
  },
  {
    name: "Fone Wireless Bass",
    sku: "FN-WB-01",
    sold: 421,
    rev: "R$ 138.890",
    stock: 18,
    color: "from-accent-500 to-brand-500",
  },
  {
    name: "Mochila Urban Tech",
    sku: "MCH-UT-15",
    sold: 192,
    rev: "R$ 55.488",
    stock: 8,
    color: "from-accent-600 to-accent-400",
  },
  {
    name: "Relógio Smart Edge",
    sku: "RLG-SE-44",
    sold: 118,
    rev: "R$ 106.082",
    stock: 24,
    color: "from-brand-600 to-accent-500",
  },
];

const FUNNEL = [
  { label: "Visitantes", value: "42.180", pct: 100, color: "from-brand-500 to-brand-700" },
  { label: "Produto visto", value: "18.420", pct: 64, color: "from-brand-500 to-brand-600" },
  { label: "Adic. ao carrinho", value: "5.842", pct: 32, color: "from-accent-500 to-brand-500" },
  { label: "Checkout", value: "2.184", pct: 18, color: "from-accent-500 to-accent-600" },
  { label: "Compra", value: "1.284", pct: 9, color: "from-accent-600 to-accent-700" },
];

export default function PremiumVisual() {
  return (
    <section className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-brand-700"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
            Painel da Loja
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-5 text-balance font-display text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl lg:text-5xl"
          >
            Sua loja virtual operada{" "}
            <span className="text-gradient">como uma máquina de vendas</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-base text-ink-600 sm:text-lg"
          >
            Produtos, pedidos, estoque, anúncios e funil de conversão
            monitorados em tempo real pelo time Bazam.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mt-14"
        >
          {/* Glow background */}
          <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-brand-200/40 via-accent-200/30 to-brand-200/40 blur-2xl" />

          <div className="overflow-hidden rounded-3xl border border-ink-200 bg-white p-2 shadow-soft sm:p-3">
            {/* App chrome */}
            <div className="flex items-center justify-between rounded-2xl bg-ink-50 px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
                </div>
                <div className="hidden items-center gap-2 rounded-lg bg-white px-2.5 py-1 text-[11px] font-medium text-ink-500 ring-1 ring-ink-100 sm:flex">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
                  admin.minhaloja.com.br
                </div>
              </div>
              <div className="hidden items-center gap-2 sm:flex">
                <div className="flex items-center gap-2 rounded-lg bg-white px-2 py-1 text-[11px] text-ink-500 ring-1 ring-ink-100">
                  <Search className="h-3 w-3" />
                  Buscar…
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-accent-50 px-2 py-1 text-[10px] font-semibold text-accent-700">
                  <CircleDot className="h-2.5 w-2.5 animate-pulse" />
                  Loja online
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="grid grid-cols-1 gap-3 rounded-b-3xl bg-gradient-to-br from-white to-ink-50/40 p-3 sm:p-5 lg:grid-cols-12">
              {/* Sidebar */}
              <aside className="hidden rounded-2xl border border-ink-100 bg-white p-3 lg:col-span-2 lg:block">
                <p className="px-2 text-[10px] font-bold uppercase tracking-wider text-ink-400">
                  Loja
                </p>
                <nav className="mt-2 space-y-1">
                  {[
                    { l: "Visão geral", icon: LayoutGrid, on: true },
                    { l: "Pedidos", icon: ShoppingBag, on: false, badge: "12" },
                    { l: "Produtos", icon: Package, on: false },
                    { l: "Estoque", icon: Boxes, on: false, alert: true },
                    { l: "Clientes", icon: Users, on: false },
                    { l: "Anúncios", icon: Megaphone, on: false },
                    { l: "Logística", icon: Truck, on: false },
                  ].map((m) => {
                    const Icon = m.icon;
                    return (
                      <a
                        key={m.l}
                        href="#"
                        className={`flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-medium ${
                          m.on
                            ? "bg-brand-50 text-brand-700"
                            : "text-ink-600 hover:bg-ink-50"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <Icon className="h-3.5 w-3.5" />
                          {m.l}
                        </span>
                        {m.badge && (
                          <span className="rounded-full bg-brand-600 px-1.5 py-0.5 text-[9px] font-bold text-white">
                            {m.badge}
                          </span>
                        )}
                        {m.alert && (
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                        )}
                      </a>
                    );
                  })}
                </nav>
                <div className="mt-4 border-t border-ink-100 pt-3">
                  <a
                    href="#"
                    className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-medium text-ink-500 hover:bg-ink-50"
                  >
                    <Settings className="h-3.5 w-3.5" />
                    Configurações
                  </a>
                </div>
              </aside>

              {/* Main */}
              <div className="space-y-3 lg:col-span-7">
                {/* Top KPIs */}
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                  {[
                    {
                      icon: TrendingUp,
                      label: "Receita",
                      value: "R$ 318k",
                      delta: "+60%",
                      grad: "from-brand-700 to-brand-500",
                    },
                    {
                      icon: ShoppingBag,
                      label: "Pedidos",
                      value: "1.284",
                      delta: "+18%",
                      grad: "from-accent-600 to-accent-400",
                    },
                    {
                      icon: Users,
                      label: "Sessões",
                      value: "42,1k",
                      delta: "+22%",
                      grad: "from-brand-500 to-accent-500",
                    },
                    {
                      icon: CreditCard,
                      label: "Ticket",
                      value: "R$ 248",
                      delta: "+12%",
                      grad: "from-accent-700 to-brand-500",
                    },
                  ].map((k) => {
                    const Icon = k.icon;
                    return (
                      <div
                        key={k.label}
                        className="relative overflow-hidden rounded-xl border border-ink-100 bg-white p-3"
                      >
                        <div className="flex items-center justify-between">
                          <div
                            className={`flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br ${k.grad} text-white shadow-glow`}
                          >
                            <Icon className="h-3.5 w-3.5" />
                          </div>
                          <span className="text-[10px] font-semibold text-accent-600">
                            {k.delta}
                          </span>
                        </div>
                        <p className="mt-2 text-[10px] font-medium text-ink-500">
                          {k.label}
                        </p>
                        <p className="text-base font-bold text-ink-900 sm:text-lg">
                          {k.value}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Sales chart */}
                <div className="rounded-xl border border-ink-100 bg-white p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-medium text-ink-500">
                        Vendas por dia
                      </p>
                      <p className="text-sm font-bold text-ink-900">
                        Últimos 14 dias
                      </p>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] font-medium">
                      <span className="flex items-center gap-1.5 text-ink-500">
                        <span className="h-2 w-2 rounded-sm bg-brand-600" /> Loja
                      </span>
                      <span className="flex items-center gap-1.5 text-ink-500">
                        <span className="h-2 w-2 rounded-sm bg-accent-500" /> Marketplaces
                      </span>
                    </div>
                  </div>

                  <div className="flex h-28 items-end gap-1">
                    {SALES_BARS.map((h, i) => {
                      const max = Math.max(...SALES_BARS);
                      const ratio = h / max;
                      return (
                        <div
                          key={i}
                          className="group relative flex flex-1 flex-col items-stretch justify-end gap-0.5"
                        >
                          <div
                            className="w-full rounded-t-md bg-gradient-to-t from-accent-500 to-accent-400"
                            style={{ height: `${ratio * 25}%` }}
                          />
                          <div
                            className="w-full rounded-b-md bg-gradient-to-t from-brand-700 to-brand-500"
                            style={{ height: `${ratio * 75}%` }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Top products */}
                <div className="rounded-xl border border-ink-100 bg-white p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                        <Star className="h-3.5 w-3.5" />
                      </div>
                      <p className="text-sm font-bold text-ink-900">
                        Produtos mais vendidos
                      </p>
                    </div>
                    <span className="text-[10px] font-semibold text-brand-700">
                      Ver catálogo →
                    </span>
                  </div>

                  <div className="space-y-2">
                    {TOP_PRODUCTS.map((p) => (
                      <div
                        key={p.sku}
                        className="flex items-center gap-3 rounded-lg border border-ink-100 bg-white p-2.5 transition-colors hover:bg-ink-50/40"
                      >
                        <div
                          className={`relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-gradient-to-br ${p.color}`}
                        >
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.4),transparent_55%)]" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-xs font-semibold text-ink-900">
                            {p.name}
                          </p>
                          <p className="text-[10px] text-ink-500">
                            SKU {p.sku} · {p.sold} vendidos
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-bold text-ink-900">
                            {p.rev}
                          </p>
                          <p
                            className={`text-[10px] font-semibold ${
                              p.stock < 15
                                ? "text-amber-600"
                                : "text-ink-500"
                            }`}
                          >
                            estoque: {p.stock}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right column */}
              <div className="space-y-3 lg:col-span-3">
                {/* Funil de conversão */}
                <div className="rounded-xl border border-ink-100 bg-white p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-sm font-bold text-ink-900">
                      Funil de conversão
                    </p>
                    <span className="text-[10px] font-semibold text-accent-700">
                      3,8%
                    </span>
                  </div>
                  <div className="space-y-2">
                    {FUNNEL.map((f) => (
                      <div key={f.label}>
                        <div className="mb-1 flex items-center justify-between">
                          <span className="text-[10px] font-medium text-ink-600">
                            {f.label}
                          </span>
                          <span className="text-[10px] font-bold text-ink-900">
                            {f.value}
                          </span>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-ink-100">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r ${f.color}`}
                            style={{ width: `${f.pct}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pedidos recentes */}
                <div className="rounded-xl border border-ink-100 bg-white p-4">
                  <p className="mb-3 text-sm font-bold text-ink-900">
                    Pedidos recentes
                  </p>
                  <div className="space-y-2.5">
                    {[
                      { id: "#10248", c: "Marina S.", v: "R$ 312", s: "Pago", ok: true },
                      { id: "#10247", c: "Ana L.", v: "R$ 189", s: "Enviado", ok: true },
                      { id: "#10246", c: "Pedro M.", v: "R$ 524", s: "Pago", ok: true },
                      { id: "#10245", c: "Luiza R.", v: "R$ 92", s: "Pendente", ok: false },
                    ].map((o) => (
                      <div
                        key={o.id}
                        className="flex items-center justify-between border-b border-ink-100 pb-2 last:border-0 last:pb-0"
                      >
                        <div>
                          <p className="text-xs font-semibold text-ink-900">
                            {o.id}
                          </p>
                          <p className="text-[10px] text-ink-500">{o.c}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-bold text-ink-900">{o.v}</p>
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[9px] font-semibold ${
                              o.ok
                                ? "bg-accent-50 text-accent-700"
                                : "bg-amber-50 text-amber-700"
                            }`}
                          >
                            {o.ok ? (
                              <CheckCircle2 className="h-2.5 w-2.5" />
                            ) : (
                              <AlertCircle className="h-2.5 w-2.5" />
                            )}
                            {o.s}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Insight Bazam */}
                <div className="rounded-xl border border-brand-300 bg-gradient-to-br from-brand-600 to-brand-800 p-4 text-white">
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-white/15">
                      <Zap className="h-3.5 w-3.5" />
                    </div>
                    <p className="text-xs font-bold uppercase tracking-wider">
                      Ação Bazam
                    </p>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-brand-100">
                    Mochila Urban Tech com estoque crítico (8). Vamos reabastecer
                    e priorizar campanha de remarketing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
