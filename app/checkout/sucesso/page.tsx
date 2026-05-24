"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Copy,
  Mail,
  MapPin,
  Package,
  QrCode,
  ReceiptText,
  Sparkles,
  Truck,
} from "lucide-react";
import ShopHeader from "@/components/shop/ShopHeader";
import ShopFooter from "@/components/shop/ShopFooter";

type Order = {
  orderNumber: string;
  createdAt: string;
  customer: {
    email: string;
    fullName: string;
    cpf: string;
    phone: string;
  };
  address: {
    cep: string;
    street: string;
    number: string;
    complement: string;
    district: string;
    city: string;
    state: string;
  };
  shipping: {
    id: string;
    label: string;
    eta: string;
    cost: number;
  };
  payment: {
    method: "pix" | "credit" | "boleto";
    installments: number;
  };
  lineItems: {
    id: string;
    name: string;
    brand: string;
    price: number;
    qty: number;
    image?: string;
    gradient: string;
  }[];
  totals: {
    subtotal: number;
    productEconomy: number;
    shippingCost: number;
    couponDiscount: number;
    pixDiscount: number;
    total: number;
  };
};

function brl(n: number) {
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function fakePixCode(orderNumber: string) {
  return `00020126360014BR.GOV.BCB.PIX0114+5511900000000520400005303986540${orderNumber.length}${orderNumber}5802BR5921NEBULARI ECOMMERCE6009SAO PAULO62290525${orderNumber}NEBULA-PIX63041D2C`;
}

export default function CheckoutSuccessPage() {
  const [order, setOrder] = useState<Order | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("nebulari:last-order");
      if (raw) setOrder(JSON.parse(raw));
    } catch {
      // ignore
    }
    setLoaded(true);
  }, []);

  const eta = order
    ? new Date(
        Date.now() +
          (order.shipping.id === "express"
            ? 1
            : order.shipping.id === "padrao"
              ? 4
              : 8) *
            24 *
            60 *
            60 *
            1000,
      ).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
      })
    : "";

  function copyOrder() {
    if (!order) return;
    navigator.clipboard.writeText(order.orderNumber).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-white">
      <ShopHeader />

      {/* Glow background */}
      <div className="pointer-events-none absolute -left-32 top-20 -z-10 h-96 w-96 rounded-full bg-aux-300/40 blur-[140px]" />
      <div className="pointer-events-none absolute -right-32 top-60 -z-10 h-96 w-96 rounded-full bg-brand-300/30 blur-[140px]" />

      <section className="mx-auto max-w-shell px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        {!loaded ? (
          <div className="py-20 text-center text-sm text-ink-500">
            Carregando...
          </div>
        ) : !order ? (
          <NoOrder />
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_400px] lg:gap-8">
            <div className="space-y-5">
              {/* Hero card */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-aux-500 via-brand-600 to-accent-500 p-7 text-white shadow-lift sm:p-9"
              >
                <Confetti />
                <div className="relative">
                  <motion.span
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 220,
                      damping: 12,
                      delay: 0.1,
                    }}
                    className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 ring-1 ring-white/40 backdrop-blur"
                  >
                    <Check className="h-7 w-7 text-white" strokeWidth={3} />
                  </motion.span>

                  <h1 className="mt-5 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                    Pedido confirmado! ✨
                  </h1>
                  <p className="mt-2 max-w-xl text-[14px] text-white/85">
                    Valeu por comprar com a gente,{" "}
                    <strong>{order.customer.fullName.split(" ")[0]}</strong>! Já
                    mandamos os detalhes pro seu e-mail.
                  </p>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <button
                      onClick={copyOrder}
                      className="group inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-[12px] font-bold backdrop-blur ring-1 ring-white/30 transition-all hover:bg-white/25"
                    >
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white/70">
                        Pedido
                      </span>
                      <span className="font-mono text-[13px]">
                        {order.orderNumber}
                      </span>
                      {copied ? (
                        <Check className="h-3.5 w-3.5" />
                      ) : (
                        <Copy className="h-3.5 w-3.5 opacity-70 transition-opacity group-hover:opacity-100" />
                      )}
                    </button>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-4 py-2 text-[12px] font-bold backdrop-blur ring-1 ring-white/30">
                      <Mail className="h-3.5 w-3.5" />
                      {order.customer.email}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* PIX panel (if applicable) */}
              {order.payment.method === "pix" && (
                <motion.section
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-ink-100"
                >
                  <header className="flex items-center gap-3 border-b border-ink-100 px-5 py-4">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-aux-600 text-white">
                      <QrCode className="h-4 w-4" />
                    </span>
                    <div className="flex-1">
                      <h2 className="font-display text-[15px] font-extrabold text-ink-950">
                        Pague com PIX
                      </h2>
                      <p className="text-[11.5px] text-ink-500">
                        Escaneia o QR Code ou copia o código abaixo
                      </p>
                    </div>
                    <span className="rounded-full bg-aux-50 px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-wider text-aux-700 ring-1 ring-aux-200">
                      Expira em 30 min
                    </span>
                  </header>

                  <div className="grid grid-cols-1 gap-5 px-5 py-5 sm:grid-cols-[180px_1fr]">
                    <div className="flex aspect-square items-center justify-center rounded-2xl bg-ink-50 p-3 ring-1 ring-ink-200">
                      <PixQR />
                    </div>
                    <div className="flex flex-col justify-between gap-3">
                      <div>
                        <p className="text-[10.5px] font-bold uppercase tracking-wider text-ink-600">
                          Pix Copia e Cola
                        </p>
                        <div className="mt-1.5 break-all rounded-xl bg-ink-50 p-3 font-mono text-[11px] leading-relaxed text-ink-700 ring-1 ring-ink-200">
                          {fakePixCode(order.orderNumber)}
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(
                            fakePixCode(order.orderNumber),
                          );
                        }}
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-aux-600 px-4 py-3 text-[12.5px] font-bold uppercase tracking-wider text-white hover:bg-aux-700"
                      >
                        <Copy className="h-3.5 w-3.5" />
                        Copiar código PIX
                      </button>
                    </div>
                  </div>
                </motion.section>
              )}

              {/* Boleto panel */}
              {order.payment.method === "boleto" && (
                <motion.section
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-ink-100"
                >
                  <header className="flex items-center gap-3 border-b border-ink-100 px-5 py-4">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-ink-900 text-white">
                      <ReceiptText className="h-4 w-4" />
                    </span>
                    <div className="flex-1">
                      <h2 className="font-display text-[15px] font-extrabold text-ink-950">
                        Boleto bancário
                      </h2>
                      <p className="text-[11.5px] text-ink-500">
                        Vence em 3 dias úteis
                      </p>
                    </div>
                  </header>
                  <div className="px-5 py-5">
                    <p className="text-[10.5px] font-bold uppercase tracking-wider text-ink-600">
                      Linha digitável
                    </p>
                    <div className="mt-1.5 break-all rounded-xl bg-ink-50 p-3 font-mono text-[12.5px] leading-relaxed tracking-wider text-ink-700 ring-1 ring-ink-200">
                      23793.39001 60000.000000 00000.000000 0 9{" "}
                      {order.totals.total.toFixed(2).replace(".", "")}
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <button className="inline-flex items-center gap-2 rounded-2xl bg-ink-950 px-4 py-2.5 text-[12px] font-bold text-white hover:bg-brand-800">
                        <Copy className="h-3.5 w-3.5" />
                        Copiar código
                      </button>
                      <button className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2.5 text-[12px] font-bold text-ink-950 ring-1 ring-ink-200 hover:bg-ink-50">
                        Baixar PDF
                      </button>
                    </div>
                  </div>
                </motion.section>
              )}

              {/* Tracking */}
              <motion.section
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.15 }}
                className="overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-ink-100"
              >
                <header className="flex items-center gap-3 border-b border-ink-100 px-5 py-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-accent-500 text-white">
                    <Truck className="h-4 w-4" />
                  </span>
                  <div>
                    <h2 className="font-display text-[15px] font-extrabold text-ink-950">
                      Acompanhe o envio
                    </h2>
                    <p className="text-[11.5px] text-ink-500">
                      Previsão de entrega: <strong>{eta}</strong>
                    </p>
                  </div>
                </header>
                <div className="px-5 py-5">
                  <Timeline />
                </div>
              </motion.section>

              {/* Address summary */}
              <motion.section
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="grid grid-cols-1 gap-4 sm:grid-cols-2"
              >
                <InfoCard icon={MapPin} title="Endereço de entrega">
                  <p className="font-semibold text-ink-950">
                    {order.address.street}, {order.address.number}
                    {order.address.complement && ` — ${order.address.complement}`}
                  </p>
                  <p>
                    {order.address.district}, {order.address.city} -{" "}
                    {order.address.state}
                  </p>
                  <p>CEP {order.address.cep}</p>
                </InfoCard>
                <InfoCard icon={Package} title="Modalidade">
                  <p className="font-semibold text-ink-950">
                    {order.shipping.label}
                  </p>
                  <p>{order.shipping.eta}</p>
                  <p>
                    Custo:{" "}
                    {order.shipping.cost === 0
                      ? "Grátis"
                      : brl(order.shipping.cost)}
                  </p>
                </InfoCard>
              </motion.section>
            </div>

            {/* Summary aside */}
            <aside>
              <div className="overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-ink-100">
                <header className="border-b border-ink-100 px-5 py-4">
                  <p className="font-display text-[13px] font-extrabold uppercase tracking-[0.18em] text-ink-950">
                    Resumo do pedido
                  </p>
                </header>

                <ul className="max-h-[320px] divide-y divide-ink-100 overflow-y-auto px-5">
                  {order.lineItems.map((it) => (
                    <li key={it.id} className="flex items-center gap-3 py-3">
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-ink-100">
                        {it.image ? (
                          <Image
                            src={it.image}
                            alt={it.name}
                            fill
                            sizes="56px"
                            className="object-cover"
                          />
                        ) : (
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${it.gradient}`}
                          />
                        )}
                        <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-ink-950 px-1 text-[10px] font-bold text-white">
                          {it.qty}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[9.5px] font-bold uppercase tracking-[0.14em] text-brand-700/85">
                          {it.brand}
                        </p>
                        <p className="line-clamp-2 text-[12px] font-semibold leading-snug text-ink-950">
                          {it.name}
                        </p>
                      </div>
                      <span className="shrink-0 font-display text-[13px] font-extrabold text-ink-950">
                        {brl(it.price * it.qty)}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-1.5 border-t border-ink-100 px-5 py-4 text-[12.5px]">
                  <Row label="Subtotal" value={brl(order.totals.subtotal)} />
                  {order.totals.productEconomy > 0 && (
                    <Row
                      label="Economia"
                      value={`−${brl(order.totals.productEconomy)}`}
                      tone="aux"
                    />
                  )}
                  <Row
                    label="Frete"
                    value={
                      order.totals.shippingCost === 0
                        ? "Grátis"
                        : brl(order.totals.shippingCost)
                    }
                    tone={order.totals.shippingCost === 0 ? "aux" : undefined}
                  />
                  {order.totals.couponDiscount > 0 && (
                    <Row
                      label="Cupom NEBULA10"
                      value={`−${brl(order.totals.couponDiscount)}`}
                      tone="brand"
                    />
                  )}
                  {order.totals.pixDiscount > 0 && (
                    <Row
                      label="Desconto PIX"
                      value={`−${brl(order.totals.pixDiscount)}`}
                      tone="aux"
                    />
                  )}
                  <div className="mt-2 flex items-baseline justify-between border-t border-ink-100 pt-3">
                    <span className="text-[12px] font-bold uppercase tracking-wider text-ink-700">
                      Total
                    </span>
                    <p className="font-display text-2xl font-extrabold text-ink-950">
                      {brl(order.totals.total)}
                    </p>
                  </div>
                </div>

                <div className="border-t border-ink-100 px-5 py-4">
                  <Link
                    href="/"
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-ink-950 px-5 py-3.5 text-[13px] font-bold uppercase tracking-wider text-white hover:bg-brand-800"
                  >
                    Continuar comprando
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="mt-4 rounded-3xl bg-gradient-to-br from-accent-50 to-pink-50 p-5 ring-1 ring-accent-200">
                <div className="flex items-center gap-2 text-accent-700">
                  <Sparkles className="h-4 w-4" />
                  <p className="text-[10.5px] font-bold uppercase tracking-wider">
                    Bônus pro próximo pedido
                  </p>
                </div>
                <p className="mt-2 text-[13px] font-semibold text-ink-950">
                  Use <strong className="text-accent-700">VOLTA10</strong> e
                  ganha mais 10% na sua próxima compra ✨
                </p>
              </div>
            </aside>
          </div>
        )}
      </section>

      <ShopFooter />
    </main>
  );
}

function Row({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "aux" | "brand";
}) {
  const toneClass =
    tone === "aux"
      ? "text-aux-700 font-bold"
      : tone === "brand"
        ? "text-brand-700 font-bold"
        : "text-ink-950 font-semibold";
  return (
    <div className="flex items-center justify-between">
      <span className="text-ink-600">{label}</span>
      <span className={toneClass}>{value}</span>
    </div>
  );
}

function InfoCard({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof MapPin;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl bg-white p-5 shadow-card ring-1 ring-ink-100">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-aux-700" />
        <p className="text-[10.5px] font-bold uppercase tracking-wider text-ink-600">
          {title}
        </p>
      </div>
      <div className="mt-2 space-y-0.5 text-[12.5px] text-ink-600">
        {children}
      </div>
    </div>
  );
}

function Timeline() {
  const steps = [
    { label: "Pagamento aprovado", state: "current" as const },
    { label: "Em separação", state: "pending" as const },
    { label: "Em transporte", state: "pending" as const },
    { label: "Entregue", state: "pending" as const },
  ];
  return (
    <ol className="grid grid-cols-1 gap-3 sm:grid-cols-4">
      {steps.map((s, i) => {
        const done = s.state === "current";
        return (
          <li key={s.label} className="flex items-center gap-3 sm:flex-col sm:items-start">
            <div className="flex items-center gap-3 sm:contents">
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[12px] font-extrabold sm:h-9 sm:w-9 ${
                  done
                    ? "bg-aux-500 text-white shadow-glow"
                    : "bg-ink-100 text-ink-500"
                }`}
              >
                {done ? <Check className="h-4 w-4" /> : i + 1}
              </span>
              {i < steps.length - 1 && (
                <span className="hidden h-0.5 flex-1 bg-ink-100 sm:block" />
              )}
            </div>
            <div>
              <p
                className={`text-[12px] font-bold ${
                  done ? "text-ink-950" : "text-ink-500"
                }`}
              >
                {s.label}
              </p>
              {done && (
                <p className="text-[10.5px] text-aux-700">há instantes</p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function PixQR() {
  // Pseudo-aleatório, mas estável: padrão visual estilo QR (não funcional).
  const size = 21;
  const cells: boolean[][] = [];
  let seed = 7;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  for (let r = 0; r < size; r++) {
    const row: boolean[] = [];
    for (let c = 0; c < size; c++) {
      row.push(rand() > 0.55);
    }
    cells.push(row);
  }
  // Force finder patterns in 3 corners
  const drawFinder = (r0: number, c0: number) => {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        const onEdge = r === 0 || r === 6 || c === 0 || c === 6;
        const innerBlock = r >= 2 && r <= 4 && c >= 2 && c <= 4;
        cells[r0 + r][c0 + c] = onEdge || innerBlock;
      }
    }
  };
  drawFinder(0, 0);
  drawFinder(0, size - 7);
  drawFinder(size - 7, 0);

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className="h-full w-full"
      shapeRendering="crispEdges"
    >
      <rect width={size} height={size} fill="white" />
      {cells.map((row, r) =>
        row.map((on, c) =>
          on ? <rect key={`${r}-${c}`} x={c} y={r} width={1} height={1} fill="#0f172a" /> : null,
        ),
      )}
    </svg>
  );
}

function Confetti() {
  const pieces = Array.from({ length: 18 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {pieces.map((_, i) => {
        const left = (i * 53) % 100;
        const delay = (i * 0.07) % 1.6;
        const size = 6 + ((i * 3) % 6);
        return (
          <motion.span
            key={i}
            initial={{ y: -30, opacity: 0, rotate: 0 }}
            animate={{ y: 320, opacity: [0, 1, 1, 0], rotate: 360 }}
            transition={{
              duration: 2.4,
              delay,
              repeat: Infinity,
              repeatDelay: 1.4,
              ease: "easeIn",
            }}
            className="absolute top-0 rounded-sm"
            style={{
              left: `${left}%`,
              width: size,
              height: size,
              background: ["#fff", "#22d3ee", "#d946ef", "#a855f7"][i % 4],
              opacity: 0.85,
            }}
          />
        );
      })}
    </div>
  );
}

function NoOrder() {
  return (
    <div className="mx-auto max-w-md rounded-3xl bg-white p-10 text-center shadow-card ring-1 ring-ink-100">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-brand-100 to-accent-100">
        <Package className="h-7 w-7 text-brand-700" />
      </div>
      <h2 className="mt-4 font-display text-2xl font-extrabold text-ink-950">
        Nenhum pedido encontrado
      </h2>
      <p className="mt-2 text-sm text-ink-500">
        Parece que você chegou aqui direto sem passar pelo checkout. Volta pra
        loja e monta seu pedido :)
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-1.5 rounded-2xl bg-ink-950 px-5 py-3 text-[13px] font-bold text-white hover:bg-brand-800"
      >
        Ir pra loja
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
