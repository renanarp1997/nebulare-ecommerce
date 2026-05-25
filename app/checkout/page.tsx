"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  CreditCard,
  Lock,
  MapPin,
  Mail,
  Package,
  QrCode,
  ReceiptText,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Tag,
  Truck,
  User,
} from "lucide-react";
import ShopHeader from "@/components/shop/ShopHeader";
import ShopFooter from "@/components/shop/ShopFooter";
import { useCart, type CartItem } from "@/lib/cart";
import { ALL_PRODUCTS } from "@/lib/search";
import type { Product } from "@/lib/store-data";

const FREE_SHIPPING_AT = 149;
const COUPON_CODE = "NEBULA10";
const COUPON_PCT = 0.1;

function brl(n: number) {
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function onlyDigits(v: string) {
  return v.replace(/\D/g, "");
}

function formatCEP(v: string) {
  const d = onlyDigits(v).slice(0, 8);
  return d.length > 5 ? `${d.slice(0, 5)}-${d.slice(5)}` : d;
}

function formatCPF(v: string) {
  const d = onlyDigits(v).slice(0, 11);
  return d
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

function formatPhone(v: string) {
  const d = onlyDigits(v).slice(0, 11);
  if (d.length <= 10)
    return d.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3").trim();
  return d.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3").trim();
}

function formatCard(v: string) {
  return onlyDigits(v)
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, "$1 ")
    .trim();
}

function formatExp(v: string) {
  const d = onlyDigits(v).slice(0, 4);
  if (d.length < 3) return d;
  return `${d.slice(0, 2)}/${d.slice(2)}`;
}

type ShippingOption = {
  id: "express" | "padrao" | "economico";
  label: string;
  eta: string;
  price: number;
  icon: typeof Truck;
};

const SHIPPING_OPTIONS: ShippingOption[] = [
  {
    id: "express",
    label: "Expresso 24h",
    eta: "Chega amanhã",
    price: 24.9,
    icon: Sparkles,
  },
  {
    id: "padrao",
    label: "Padrão",
    eta: "Chega em 3–5 dias úteis",
    price: 14.9,
    icon: Truck,
  },
  {
    id: "economico",
    label: "Econômico",
    eta: "Chega em 7–10 dias úteis",
    price: 9.9,
    icon: Package,
  },
];

type PaymentMethod = "pix" | "credit" | "boleto";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, hydrated, clear } = useCart();
  const [buyNow, setBuyNow] = useState<{ id: string; qty: number } | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("buy");
    if (!id) return;
    const qty = Math.max(
      1,
      Math.min(9, Number.parseInt(params.get("qty") ?? "1", 10) || 1),
    );
    setBuyNow({ id, qty });
  }, []);

  const lineItems = useMemo<{ product: Product; qty: number }[]>(() => {
    const byId = new Map(ALL_PRODUCTS.map((p) => [p.id, p]));
    const cartItems = items
      .map((i: CartItem) => {
        const product = byId.get(i.id);
        return product ? { product, qty: i.qty } : null;
      })
      .filter((x): x is { product: Product; qty: number } => !!x);

    if (cartItems.length > 0 || !buyNow) return cartItems;

    const product = byId.get(buyNow.id);
    return product ? [{ product, qty: buyNow.qty }] : [];
  }, [buyNow, items]);

  const subtotal = useMemo(
    () => lineItems.reduce((s, l) => s + l.product.price * l.qty, 0),
    [lineItems],
  );
  const oldSubtotal = useMemo(
    () =>
      lineItems.reduce(
        (s, l) => s + (l.product.oldPrice ?? l.product.price) * l.qty,
        0,
      ),
    [lineItems],
  );
  const productEconomy = Math.max(oldSubtotal - subtotal, 0);

  // Form state
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");

  const [cep, setCep] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [stateUF, setStateUF] = useState("");
  const [cepLoading, setCepLoading] = useState(false);
  const [cepError, setCepError] = useState<string | null>(null);

  const [shipping, setShipping] = useState<ShippingOption["id"]>("padrao");
  const [payment, setPayment] = useState<PaymentMethod>("pix");

  // Card fields
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExp, setCardExp] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [installments, setInstallments] = useState(1);

  // Coupon
  const [couponInput, setCouponInput] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState<string | null>(null);

  const [submitting, setSubmitting] = useState(false);

  // CEP lookup (ViaCEP)
  useEffect(() => {
    const clean = onlyDigits(cep);
    if (clean.length !== 8) {
      setCepError(null);
      return;
    }
    let cancelled = false;
    setCepLoading(true);
    setCepError(null);
    fetch(`https://viacep.com.br/ws/${clean}/json/`)
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        if (data.erro) {
          setCepError("CEP não encontrado");
          return;
        }
        setStreet(data.logradouro || "");
        setDistrict(data.bairro || "");
        setCity(data.localidade || "");
        setStateUF(data.uf || "");
      })
      .catch(() => {
        if (!cancelled) setCepError("Não foi possível buscar o CEP");
      })
      .finally(() => {
        if (!cancelled) setCepLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [cep]);

  const selectedShipping = SHIPPING_OPTIONS.find((s) => s.id === shipping)!;
  const freeShipping = subtotal >= FREE_SHIPPING_AT;
  const shippingCost = freeShipping ? 0 : selectedShipping.price;

  const couponDiscount = couponApplied ? subtotal * COUPON_PCT : 0;

  // PIX has 5% extra discount
  const pixDiscount = payment === "pix" ? subtotal * 0.05 : 0;

  const total = Math.max(
    subtotal + shippingCost - couponDiscount - pixDiscount,
    0,
  );

  const installmentValue = total / installments;

  function applyCoupon() {
    setCouponError(null);
    if (couponInput.trim().toUpperCase() === COUPON_CODE) {
      setCouponApplied(true);
      setCouponInput(COUPON_CODE);
    } else {
      setCouponApplied(false);
      setCouponError("Cupom inválido. Tente NEBULA10 :)");
    }
  }

  function removeCoupon() {
    setCouponApplied(false);
    setCouponInput("");
    setCouponError(null);
  }

  // Validation
  const stepCustomerOk =
    email.includes("@") &&
    fullName.trim().split(" ").length >= 2 &&
    onlyDigits(cpf).length === 11 &&
    onlyDigits(phone).length >= 10;

  const stepAddressOk =
    onlyDigits(cep).length === 8 &&
    street.trim().length > 2 &&
    number.trim().length > 0 &&
    district.trim().length > 1 &&
    city.trim().length > 1 &&
    stateUF.trim().length === 2;

  const stepPaymentOk =
    payment === "pix" ||
    payment === "boleto" ||
    (payment === "credit" &&
      onlyDigits(cardNumber).length >= 14 &&
      cardName.trim().length > 3 &&
      cardExp.length === 5 &&
      onlyDigits(cardCvv).length >= 3);

  const canSubmit =
    stepCustomerOk && stepAddressOk && stepPaymentOk && lineItems.length > 0;

  // What's missing — for friendly hints
  const missing: { step: number; section: string; reason: string }[] = [];
  if (!email.includes("@"))
    missing.push({ step: 1, section: "section-1", reason: "e-mail válido" });
  if (fullName.trim().split(" ").length < 2)
    missing.push({ step: 1, section: "section-1", reason: "nome completo" });
  if (onlyDigits(cpf).length !== 11)
    missing.push({ step: 1, section: "section-1", reason: "CPF" });
  if (onlyDigits(phone).length < 10)
    missing.push({ step: 1, section: "section-1", reason: "celular" });
  if (onlyDigits(cep).length !== 8)
    missing.push({ step: 2, section: "section-2", reason: "CEP" });
  if (street.trim().length <= 2)
    missing.push({ step: 2, section: "section-2", reason: "rua" });
  if (!number.trim())
    missing.push({ step: 2, section: "section-2", reason: "número" });
  if (district.trim().length <= 1)
    missing.push({ step: 2, section: "section-2", reason: "bairro" });
  if (city.trim().length <= 1)
    missing.push({ step: 2, section: "section-2", reason: "cidade" });
  if (stateUF.trim().length !== 2)
    missing.push({ step: 2, section: "section-2", reason: "UF" });
  if (payment === "credit") {
    if (onlyDigits(cardNumber).length < 14)
      missing.push({ step: 4, section: "section-4", reason: "número do cartão" });
    if (cardName.trim().length <= 3)
      missing.push({ step: 4, section: "section-4", reason: "nome no cartão" });
    if (cardExp.length !== 5)
      missing.push({ step: 4, section: "section-4", reason: "validade" });
    if (onlyDigits(cardCvv).length < 3)
      missing.push({ step: 4, section: "section-4", reason: "CVV" });
  }

  function scrollToFirstMissing() {
    if (missing.length === 0) return;
    const el = document.getElementById(missing[0].section);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    el.classList.add("ring-2", "ring-pink-400");
    setTimeout(
      () => el.classList.remove("ring-2", "ring-pink-400"),
      1400,
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit || submitting) return;
    setSubmitting(true);

    // Persist order snapshot for success page
    const orderNumber = `NBL-${Date.now().toString().slice(-8)}`;
    const order = {
      orderNumber,
      createdAt: new Date().toISOString(),
      customer: { email, fullName, cpf, phone },
      address: {
        cep,
        street,
        number,
        complement,
        district,
        city,
        state: stateUF,
      },
      shipping: {
        id: shipping,
        label: selectedShipping.label,
        eta: selectedShipping.eta,
        cost: shippingCost,
      },
      payment: {
        method: payment,
        installments: payment === "credit" ? installments : 1,
      },
      lineItems: lineItems.map((l) => ({
        id: l.product.id,
        name: l.product.name,
        brand: l.product.brand,
        price: l.product.price,
        qty: l.qty,
        image: l.product.image,
        gradient: l.product.gradient,
      })),
      totals: {
        subtotal,
        productEconomy,
        shippingCost,
        couponDiscount,
        pixDiscount,
        total,
      },
    };
    try {
      localStorage.setItem("nebulari:last-order", JSON.stringify(order));
    } catch {
      // ignore
    }

    // Simulated processing
    await new Promise((r) => setTimeout(r, 900));
    clear();
    router.push("/checkout/sucesso");
  }

  // Empty cart redirect (only after hydration)
  useEffect(() => {
    if (hydrated && lineItems.length === 0 && !submitting) {
      // soft state — show inline empty, not redirect
    }
  }, [hydrated, lineItems.length, submitting]);

  return (
    <main className="relative min-h-screen bg-ink-50/40">
      <ShopHeader />

      {/* Hero strip */}
      <section className="relative isolate overflow-hidden border-b border-ink-100 bg-white">
        <div className="pointer-events-none absolute -left-32 top-0 -z-10 h-72 w-72 rounded-full bg-aux-300/30 blur-[120px]" />
        <div className="pointer-events-none absolute -right-32 bottom-0 -z-10 h-72 w-72 rounded-full bg-brand-300/25 blur-[120px]" />

        <div className="mx-auto max-w-shell px-4 py-6 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-ink-600 hover:text-ink-950"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Continuar comprando
          </Link>

          <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-ink-950 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                <Lock className="h-3 w-3" />
                Checkout seguro
              </span>
              <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-ink-950 sm:text-4xl">
                Finalizar <span className="text-gradient">compra</span>
              </h1>
            </div>
            <div className="hidden items-center gap-3 text-[11px] font-semibold text-ink-500 sm:flex">
              <span className="inline-flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5 text-aux-600" />
                Pagamento criptografado
              </span>
              <span className="inline-flex items-center gap-1">
                <Truck className="h-3.5 w-3.5 text-aux-600" />
                Envio rápido
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="mx-auto max-w-shell px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        {hydrated && lineItems.length === 0 ? (
          <EmptyCheckout />
        ) : (
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_400px] lg:gap-8"
          >
            <div className="space-y-5">
              {/* 1. Identificação */}
              <SectionCard
                step={1}
                icon={User}
                title="Identificação"
                subtitle="Pra emitir nota e mandar atualizações do pedido"
              >
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <Field label="E-mail" full>
                    <input
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="voce@email.com"
                      className="input"
                    />
                  </Field>
                  <Field label="Nome completo" full>
                    <input
                      required
                      autoComplete="name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Maria da Silva"
                      className="input"
                    />
                  </Field>
                  <Field label="CPF">
                    <input
                      required
                      inputMode="numeric"
                      value={cpf}
                      onChange={(e) => setCpf(formatCPF(e.target.value))}
                      placeholder="000.000.000-00"
                      className="input"
                    />
                  </Field>
                  <Field label="Celular">
                    <input
                      required
                      inputMode="tel"
                      autoComplete="tel"
                      value={phone}
                      onChange={(e) => setPhone(formatPhone(e.target.value))}
                      placeholder="(11) 90000-0000"
                      className="input"
                    />
                  </Field>
                </div>
              </SectionCard>

              {/* 2. Endereço */}
              <SectionCard
                step={2}
                icon={MapPin}
                title="Endereço de entrega"
                subtitle="Digita o CEP que o resto a gente preenche"
              >
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-6">
                  <Field label="CEP" className="sm:col-span-2">
                    <div className="relative">
                      <input
                        required
                        inputMode="numeric"
                        autoComplete="postal-code"
                        value={cep}
                        onChange={(e) => setCep(formatCEP(e.target.value))}
                        placeholder="00000-000"
                        className="input pr-10"
                      />
                      {cepLoading && (
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-semibold text-brand-600">
                          ...
                        </span>
                      )}
                    </div>
                    {cepError && (
                      <p className="mt-1 text-[11px] font-semibold text-pink-700">
                        {cepError}
                      </p>
                    )}
                  </Field>
                  <Field label="Rua / Logradouro" className="sm:col-span-4">
                    <input
                      required
                      autoComplete="address-line1"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      placeholder="Av. Paulista"
                      className="input"
                    />
                  </Field>
                  <Field label="Número" className="sm:col-span-1">
                    <input
                      required
                      inputMode="numeric"
                      value={number}
                      onChange={(e) => setNumber(e.target.value)}
                      placeholder="1234"
                      className="input"
                    />
                  </Field>
                  <Field label="Complemento" className="sm:col-span-2">
                    <input
                      value={complement}
                      onChange={(e) => setComplement(e.target.value)}
                      placeholder="Apto 42 / Bloco B"
                      className="input"
                    />
                  </Field>
                  <Field label="Bairro" className="sm:col-span-3">
                    <input
                      required
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      placeholder="Bela Vista"
                      className="input"
                    />
                  </Field>
                  <Field label="Cidade" className="sm:col-span-4">
                    <input
                      required
                      autoComplete="address-level2"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="São Paulo"
                      className="input"
                    />
                  </Field>
                  <Field label="UF" className="sm:col-span-2">
                    <input
                      required
                      maxLength={2}
                      autoComplete="address-level1"
                      value={stateUF}
                      onChange={(e) =>
                        setStateUF(e.target.value.toUpperCase().slice(0, 2))
                      }
                      placeholder="SP"
                      className="input uppercase"
                    />
                  </Field>
                </div>
              </SectionCard>

              {/* 3. Entrega */}
              <SectionCard
                step={3}
                icon={Truck}
                title="Modalidade de entrega"
                subtitle={
                  freeShipping
                    ? "Frete grátis liberado — você passou de R$ 149 🚀"
                    : "Faltam " +
                      brl(FREE_SHIPPING_AT - subtotal) +
                      " pro frete grátis"
                }
              >
                <div className="grid grid-cols-1 gap-2.5">
                  {SHIPPING_OPTIONS.map((opt) => {
                    const Icon = opt.icon;
                    const active = shipping === opt.id;
                    const finalCost = freeShipping ? 0 : opt.price;
                    return (
                      <label
                        key={opt.id}
                        className={`relative flex cursor-pointer items-center gap-3 rounded-2xl border-2 px-4 py-3.5 transition-all ${
                          active
                            ? "border-brand-600 bg-brand-50/60 shadow-card"
                            : "border-ink-100 hover:border-ink-200 hover:bg-ink-50/40"
                        }`}
                      >
                        <input
                          type="radio"
                          name="shipping"
                          value={opt.id}
                          checked={active}
                          onChange={() => setShipping(opt.id)}
                          className="sr-only"
                        />
                        <span
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                            active
                              ? "bg-gradient-to-br from-brand-600 to-accent-500 text-white"
                              : "bg-ink-100 text-ink-700"
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                        </span>
                        <div className="flex-1">
                          <p className="text-[13.5px] font-bold text-ink-950">
                            {opt.label}
                          </p>
                          <p className="text-[11.5px] text-ink-500">
                            {opt.eta}
                          </p>
                        </div>
                        <div className="text-right">
                          {finalCost === 0 ? (
                            <span className="text-[12px] font-extrabold uppercase tracking-wider text-aux-700">
                              Grátis
                            </span>
                          ) : (
                            <span className="font-display text-[14px] font-extrabold text-ink-950">
                              {brl(finalCost)}
                            </span>
                          )}
                        </div>
                        <span
                          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                            active
                              ? "border-brand-600 bg-brand-600 text-white"
                              : "border-ink-300 bg-white"
                          }`}
                        >
                          {active && <Check className="h-3 w-3" />}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </SectionCard>

              {/* 4. Pagamento */}
              <SectionCard
                step={4}
                icon={CreditCard}
                title="Pagamento"
                subtitle="PIX te dá 5% off na hora"
              >
                <div className="grid grid-cols-3 gap-2">
                  <PaymentTab
                    active={payment === "pix"}
                    onClick={() => setPayment("pix")}
                    icon={QrCode}
                    label="PIX"
                    sub="5% off"
                    accent
                  />
                  <PaymentTab
                    active={payment === "credit"}
                    onClick={() => setPayment("credit")}
                    icon={CreditCard}
                    label="Cartão"
                    sub="Até 6×"
                  />
                  <PaymentTab
                    active={payment === "boleto"}
                    onClick={() => setPayment("boleto")}
                    icon={ReceiptText}
                    label="Boleto"
                    sub="3 dias úteis"
                  />
                </div>

                <AnimatePresence mode="wait" initial={false}>
                  {payment === "pix" && (
                    <motion.div
                      key="pix"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.18 }}
                      className="mt-4 rounded-2xl bg-gradient-to-br from-aux-50 to-brand-50 p-4 ring-1 ring-aux-200"
                    >
                      <div className="flex items-start gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-aux-600 text-white">
                          <QrCode className="h-5 w-5" />
                        </span>
                        <div className="flex-1 text-[12.5px] text-ink-700">
                          <p className="font-bold text-ink-950">
                            Pagamento via PIX — aprovação na hora
                          </p>
                          <p className="mt-1">
                            Depois de confirmar, mostramos o QR Code. Você tem 30
                            minutos pra pagar.
                          </p>
                          <p className="mt-2 inline-flex items-center gap-1 rounded-full bg-aux-600 px-2 py-0.5 text-[10.5px] font-bold uppercase tracking-wider text-white">
                            <Sparkles className="h-3 w-3" />
                            5% de desconto já aplicado
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {payment === "credit" && (
                    <motion.div
                      key="credit"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.18 }}
                      className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-6"
                    >
                      <Field label="Número do cartão" className="sm:col-span-6">
                        <input
                          required
                          inputMode="numeric"
                          autoComplete="cc-number"
                          value={cardNumber}
                          onChange={(e) =>
                            setCardNumber(formatCard(e.target.value))
                          }
                          placeholder="0000 0000 0000 0000"
                          className="input"
                        />
                      </Field>
                      <Field
                        label="Nome impresso"
                        className="sm:col-span-6"
                      >
                        <input
                          required
                          autoComplete="cc-name"
                          value={cardName}
                          onChange={(e) =>
                            setCardName(e.target.value.toUpperCase())
                          }
                          placeholder="MARIA DA SILVA"
                          className="input uppercase"
                        />
                      </Field>
                      <Field label="Validade" className="sm:col-span-2">
                        <input
                          required
                          inputMode="numeric"
                          autoComplete="cc-exp"
                          value={cardExp}
                          onChange={(e) => setCardExp(formatExp(e.target.value))}
                          placeholder="MM/AA"
                          className="input"
                        />
                      </Field>
                      <Field label="CVV" className="sm:col-span-2">
                        <input
                          required
                          inputMode="numeric"
                          autoComplete="cc-csc"
                          maxLength={4}
                          value={cardCvv}
                          onChange={(e) =>
                            setCardCvv(onlyDigits(e.target.value).slice(0, 4))
                          }
                          placeholder="123"
                          className="input"
                        />
                      </Field>
                      <Field label="Parcelas" className="sm:col-span-2">
                        <select
                          value={installments}
                          onChange={(e) =>
                            setInstallments(Number(e.target.value))
                          }
                          className="input"
                        >
                          {[1, 2, 3, 4, 5, 6].map((n) => (
                            <option key={n} value={n}>
                              {n}× {brl(total / n)}{" "}
                              {n === 1 ? "à vista" : "sem juros"}
                            </option>
                          ))}
                        </select>
                      </Field>
                    </motion.div>
                  )}

                  {payment === "boleto" && (
                    <motion.div
                      key="boleto"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.18 }}
                      className="mt-4 rounded-2xl bg-ink-50 p-4 ring-1 ring-ink-200"
                    >
                      <div className="flex items-start gap-3 text-[12.5px] text-ink-700">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink-900 text-white">
                          <ReceiptText className="h-5 w-5" />
                        </span>
                        <div>
                          <p className="font-bold text-ink-950">
                            Boleto bancário — vence em 3 dias úteis
                          </p>
                          <p className="mt-1">
                            O pedido é separado quando o pagamento for
                            compensado (geralmente em 1 dia útil). Sem juros, sem
                            taxa.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </SectionCard>

              {/* Submit (desktop ghost — real is inside summary) */}
              <div className="hidden lg:block">
                <SubmitButton
                  canSubmit={canSubmit}
                  submitting={submitting}
                  total={total}
                  missing={missing}
                  onScrollToMissing={scrollToFirstMissing}
                />
                <p className="mt-3 flex items-center justify-center gap-1.5 text-[11.5px] text-ink-500">
                  <Lock className="h-3 w-3" />
                  Conexão criptografada SSL · Seus dados ficam só com a gente
                </p>
              </div>
            </div>

            {/* Sticky summary */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-ink-100">
                <header className="border-b border-ink-100 px-5 py-4">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="h-4 w-4 text-ink-950" />
                    <p className="font-display text-[13px] font-extrabold uppercase tracking-[0.18em] text-ink-950">
                      Seu pedido
                    </p>
                    <span className="ml-auto rounded-full bg-ink-100 px-2 py-0.5 text-[10.5px] font-bold text-ink-700">
                      {lineItems.reduce((s, l) => s + l.qty, 0)}{" "}
                      {lineItems.reduce((s, l) => s + l.qty, 0) === 1
                        ? "item"
                        : "itens"}
                    </span>
                  </div>
                </header>

                <ul className="max-h-[280px] divide-y divide-ink-100 overflow-y-auto px-5">
                  {lineItems.map((l) => (
                    <li
                      key={l.product.id}
                      className="flex items-center gap-3 py-3"
                    >
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-ink-100">
                        {l.product.image ? (
                          <Image
                            src={l.product.image}
                            alt={l.product.name}
                            fill
                            sizes="56px"
                            className="object-cover"
                          />
                        ) : (
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${l.product.gradient}`}
                          />
                        )}
                        <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-ink-950 px-1 text-[10px] font-bold text-white">
                          {l.qty}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[9.5px] font-bold uppercase tracking-[0.14em] text-brand-700/85">
                          {l.product.brand}
                        </p>
                        <p className="line-clamp-2 text-[12px] font-semibold leading-snug text-ink-950">
                          {l.product.name}
                        </p>
                      </div>
                      <span className="shrink-0 font-display text-[13px] font-extrabold text-ink-950">
                        {brl(l.product.price * l.qty)}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Coupon */}
                <div className="border-t border-ink-100 px-5 py-4">
                  {couponApplied ? (
                    <div className="flex items-center justify-between rounded-xl bg-aux-50 px-3 py-2 ring-1 ring-aux-200">
                      <div className="flex items-center gap-2">
                        <Tag className="h-3.5 w-3.5 text-aux-700" />
                        <span className="text-[12px] font-bold text-aux-700">
                          {COUPON_CODE}
                        </span>
                        <span className="text-[11px] text-ink-600">
                          −10% aplicado
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={removeCoupon}
                        className="text-[11px] font-semibold text-ink-500 underline-offset-2 hover:text-pink-700 hover:underline"
                      >
                        Remover
                      </button>
                    </div>
                  ) : (
                    <>
                      <label className="text-[10.5px] font-bold uppercase tracking-wider text-ink-600">
                        Cupom de desconto
                      </label>
                      <div className="mt-1.5 flex gap-2">
                        <input
                          value={couponInput}
                          onChange={(e) => {
                            setCouponInput(e.target.value.toUpperCase());
                            setCouponError(null);
                          }}
                          placeholder="NEBULA10"
                          className="input flex-1 uppercase"
                        />
                        <button
                          type="button"
                          onClick={applyCoupon}
                          className="rounded-xl bg-ink-950 px-4 text-[12px] font-bold text-white hover:bg-brand-800"
                        >
                          Aplicar
                        </button>
                      </div>
                      {couponError && (
                        <p className="mt-1.5 text-[11px] font-semibold text-pink-700">
                          {couponError}
                        </p>
                      )}
                    </>
                  )}
                </div>

                {/* Totals */}
                <div className="space-y-1.5 border-t border-ink-100 px-5 py-4 text-[12.5px]">
                  <Row label="Subtotal" value={brl(subtotal)} />
                  {productEconomy > 0 && (
                    <Row
                      label="Economia nos produtos"
                      value={`−${brl(productEconomy)}`}
                      tone="aux"
                    />
                  )}
                  <Row
                    label="Frete"
                    value={
                      shippingCost === 0 ? "Grátis" : brl(shippingCost)
                    }
                    tone={shippingCost === 0 ? "aux" : undefined}
                  />
                  {couponDiscount > 0 && (
                    <Row
                      label={`Cupom ${COUPON_CODE}`}
                      value={`−${brl(couponDiscount)}`}
                      tone="brand"
                    />
                  )}
                  {pixDiscount > 0 && (
                    <Row
                      label="Desconto PIX (5%)"
                      value={`−${brl(pixDiscount)}`}
                      tone="aux"
                    />
                  )}
                  <div className="mt-2 flex items-baseline justify-between border-t border-ink-100 pt-3">
                    <span className="text-[12px] font-bold uppercase tracking-wider text-ink-700">
                      Total
                    </span>
                    <div className="text-right">
                      <p className="font-display text-2xl font-extrabold text-ink-950">
                        {brl(total)}
                      </p>
                      {payment === "credit" && installments > 1 && (
                        <p className="text-[10.5px] font-semibold text-ink-500">
                          ou {installments}× de {brl(installmentValue)} sem juros
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Submit (mobile + tablet) */}
                <div className="border-t border-ink-100 px-5 py-4 lg:hidden">
                  <SubmitButton
                    canSubmit={canSubmit}
                    submitting={submitting}
                    total={total}
                    missing={missing}
                    onScrollToMissing={scrollToFirstMissing}
                  />
                  <p className="mt-3 flex items-center justify-center gap-1.5 text-[10.5px] text-ink-500">
                    <Lock className="h-3 w-3" />
                    Conexão criptografada SSL
                  </p>
                </div>
              </div>

              {/* Trust badges */}
              <div className="mt-4 grid grid-cols-3 gap-2">
                {[
                  { icon: ShieldCheck, l: "Compra protegida" },
                  { icon: Truck, l: "Envio rápido" },
                  { icon: Sparkles, l: "Troca fácil" },
                ].map((b) => {
                  const Icon = b.icon;
                  return (
                    <div
                      key={b.l}
                      className="flex flex-col items-center gap-1 rounded-2xl bg-white px-2 py-3 text-center ring-1 ring-ink-100"
                    >
                      <Icon className="h-4 w-4 text-aux-600" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-ink-600">
                        {b.l}
                      </span>
                    </div>
                  );
                })}
              </div>
            </aside>
          </form>
        )}
      </section>

      <ShopFooter />

      <style jsx global>{`
        .input {
          width: 100%;
          padding: 10px 12px;
          border-radius: 12px;
          border: 1.5px solid #e2e8f0;
          background: #fff;
          font-size: 13.5px;
          font-weight: 500;
          color: #0f172a;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
          outline: none;
        }
        .input::placeholder {
          color: #94a3b8;
          font-weight: 400;
        }
        .input:focus {
          border-color: #9333ea;
          box-shadow: 0 0 0 4px rgba(147, 51, 234, 0.12);
        }
        .input:disabled {
          background: #f8fafc;
          color: #94a3b8;
        }
      `}</style>
    </main>
  );
}

function SectionCard({
  step,
  icon: Icon,
  title,
  subtitle,
  children,
}: {
  step: number;
  icon: typeof Truck;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      id={`section-${step}`}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: step * 0.04 }}
      className="overflow-hidden scroll-mt-24 rounded-3xl bg-white shadow-card ring-1 ring-ink-100 transition-shadow"
    >
      <header className="flex items-center gap-3 border-b border-ink-100 px-5 py-4">
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-accent-500 text-[12px] font-extrabold text-white shadow-glow">
          {step}
        </span>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Icon className="h-4 w-4 text-ink-700" />
            <h2 className="font-display text-[15px] font-extrabold tracking-tight text-ink-950">
              {title}
            </h2>
          </div>
          <p className="text-[11.5px] text-ink-500">{subtitle}</p>
        </div>
      </header>
      <div className="px-5 py-5">{children}</div>
    </motion.section>
  );
}

function Field({
  label,
  children,
  full,
  className,
}: {
  label: string;
  children: React.ReactNode;
  full?: boolean;
  className?: string;
}) {
  return (
    <label
      className={`flex flex-col gap-1.5 ${full ? "sm:col-span-2" : ""} ${
        className ?? ""
      }`}
    >
      <span className="text-[10.5px] font-bold uppercase tracking-wider text-ink-600">
        {label}
      </span>
      {children}
    </label>
  );
}

function PaymentTab({
  active,
  onClick,
  icon: Icon,
  label,
  sub,
  accent,
}: {
  active: boolean;
  onClick: () => void;
  icon: typeof CreditCard;
  label: string;
  sub: string;
  accent?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex flex-col items-center justify-center gap-1.5 rounded-2xl border-2 px-2 py-4 transition-all ${
        active
          ? accent
            ? "border-aux-600 bg-aux-50 shadow-card"
            : "border-brand-600 bg-brand-50/60 shadow-card"
          : "border-ink-100 hover:border-ink-200 hover:bg-ink-50/40"
      }`}
    >
      <Icon
        className={`h-5 w-5 ${
          active ? (accent ? "text-aux-700" : "text-brand-700") : "text-ink-700"
        }`}
      />
      <span className="text-[12px] font-extrabold text-ink-950">{label}</span>
      <span
        className={`text-[10px] font-semibold ${
          accent && active ? "text-aux-700" : "text-ink-500"
        }`}
      >
        {sub}
      </span>
    </button>
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

function SubmitButton({
  canSubmit,
  submitting,
  total,
  missing,
  onScrollToMissing,
}: {
  canSubmit: boolean;
  submitting: boolean;
  total: number;
  missing: { step: number; section: string; reason: string }[];
  onScrollToMissing: () => void;
}) {
  const firstMissing = missing[0];
  const extraCount = Math.max(missing.length - 1, 0);

  return (
    <>
      {!canSubmit && firstMissing && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-3 flex items-start gap-2 rounded-2xl border border-pink-200 bg-pink-50/70 px-3.5 py-2.5 text-[11.5px] text-pink-800"
        >
          <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-pink-500 text-[9px] font-extrabold text-white">
            !
          </span>
          <div className="flex-1">
            <p className="font-semibold">
              Falta preencher: <strong>{firstMissing.reason}</strong>
              {extraCount > 0 && (
                <span className="text-pink-600/80">
                  {" "}
                  e +{extraCount} {extraCount === 1 ? "campo" : "campos"}
                </span>
              )}
            </p>
            <button
              type="button"
              onClick={onScrollToMissing}
              className="mt-0.5 text-[11px] font-bold text-pink-700 underline-offset-2 hover:underline"
            >
              Ir até esse campo →
            </button>
          </div>
        </motion.div>
      )}
      <button
        type={canSubmit ? "submit" : "button"}
        onClick={canSubmit ? undefined : onScrollToMissing}
        disabled={submitting}
        aria-disabled={!canSubmit}
        className={`group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl px-5 py-4 text-[14px] font-extrabold uppercase tracking-wider text-white shadow-glow transition-all ${
          canSubmit
            ? "bg-gradient-to-r from-aux-500 to-aux-600 hover:-translate-y-0.5 hover:from-aux-600 hover:to-aux-700"
            : "bg-gradient-to-r from-ink-300 to-ink-400 hover:from-ink-400 hover:to-ink-500"
        } disabled:cursor-wait disabled:opacity-80`}
      >
        {submitting ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            Processando...
          </>
        ) : canSubmit ? (
          <>
            Confirmar pedido · {brl(total)}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </>
        ) : (
          <>
            Preencher dados pra finalizar
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
    </>
  );
}

function EmptyCheckout() {
  return (
    <div className="mx-auto max-w-md rounded-3xl bg-white p-10 text-center shadow-card ring-1 ring-ink-100">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-brand-100 to-accent-100">
        <ShoppingBag className="h-7 w-7 text-brand-700" />
      </div>
      <h2 className="mt-4 font-display text-2xl font-extrabold text-ink-950">
        Seu carrinho está vazio
      </h2>
      <p className="mt-2 text-sm text-ink-500">
        Adiciona uns produtos antes de partir pro checkout :)
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-1.5 rounded-2xl bg-ink-950 px-5 py-3 text-[13px] font-bold text-white hover:bg-brand-800"
      >
        Voltar pra loja
        <ChevronRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
