"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  User as UserIcon,
  Phone,
  Eye,
  EyeOff,
  Check,
  ArrowRight,
  Sparkles,
  Tag,
  Truck,
  Gift,
  Shield,
  Apple,
  Chrome,
  AlertCircle,
} from "lucide-react";
import ShopHeader from "@/components/shop/ShopHeader";
import ShopFooter from "@/components/shop/ShopFooter";
import Logo from "@/components/Logo";

const PERKS = [
  {
    icon: Tag,
    title: "Cupom NEBULA10 na 1ª compra",
    desc: "10% off no carrinho inteiro, válido em todas as marcas.",
  },
  {
    icon: Sparkles,
    title: "Acesso antecipado aos drops",
    desc: "Você vê o drop da semana 24h antes da galera.",
  },
  {
    icon: Truck,
    title: "Frete grátis acima de R$ 149",
    desc: "Acumula com o NEBULA10 — leva os dois.",
  },
  {
    icon: Gift,
    title: "Brinde Nebulari+ no aniversário",
    desc: "A gente mira no seu mês favorito.",
  },
];

const VIBES = ["LED & Quarto", "Beleza", "Streetwear", "Y2K", "Gaming", "Tech", "Plush", "K-Drop"];

function strengthScore(pw: string): { score: number; label: string; tone: string } {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const labels = ["Muito fraca", "Fraca", "Ok", "Forte", "Cósmica"];
  const tones = [
    "bg-ink-200",
    "bg-pink-400",
    "bg-amber-400",
    "bg-aux-500",
    "bg-gradient-to-r from-brand-500 to-accent-500",
  ];
  return { score, label: labels[score], tone: tones[score] };
}

export default function CriarContaPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [aceitaNewsletter, setAceitaNewsletter] = useState(true);
  const [aceitaTermos, setAceitaTermos] = useState(false);
  const [vibes, setVibes] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pwStrength = useMemo(() => strengthScore(senha), [senha]);
  const passwordsMatch = confirmar.length > 0 && senha === confirmar;
  const passwordsMismatch = confirmar.length > 0 && senha !== confirmar;

  function toggleVibe(v: string) {
    setVibes((prev) =>
      prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v],
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!nome.trim() || !email.trim() || !senha) {
      setError("Preenche nome, email e senha pra continuar.");
      return;
    }
    if (senha !== confirmar) {
      setError("As senhas não batem.");
      return;
    }
    if (!aceitaTermos) {
      setError("Aceita os termos pra criar a conta.");
      return;
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-white">
        <ShopHeader />
        <section className="flex min-h-[60vh] items-center justify-center px-4 py-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45 }}
            className="relative w-full max-w-xl overflow-hidden rounded-[28px] bg-gradient-to-br from-brand-700 via-brand-800 to-ink-950 p-8 text-center text-white shadow-lift sm:p-12"
          >
            <div className="pointer-events-none absolute inset-0 -z-10 bg-aurora opacity-50" />
            <div className="pointer-events-none absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full bg-accent-500/30 blur-[120px]" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 -z-10 h-72 w-72 rounded-full bg-pink-500/30 blur-[120px]" />

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/15 ring-2 ring-white/30">
              <Sparkles className="h-6 w-6 text-accent-300" />
            </div>
            <h1 className="mt-5 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              Bem-vinda à Nebulari, {nome.split(" ")[0] || "amiga"}!
            </h1>
            <p className="mx-auto mt-3 max-w-sm text-sm text-white/80">
              Mandamos o cupom <strong className="text-white">NEBULA10</strong> e o link de confirmação pra <strong className="text-white">{email}</strong>.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/15">
              <Tag className="h-4 w-4 text-accent-300" />
              <code className="font-display text-base font-extrabold tracking-[0.18em] text-white">
                NEBULA10
              </code>
            </div>

            <div className="mt-7 flex flex-col items-center justify-center gap-2 sm:flex-row">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-3 text-sm font-bold text-ink-950 transition-all hover:-translate-y-0.5 hover:shadow-soft"
              >
                Bora comprar <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/wishlist"
                className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-5 py-3 text-sm font-bold text-white ring-1 ring-white/20 hover:bg-white/15"
              >
                Montar wishlist
              </Link>
            </div>
          </motion.div>
        </section>
        <ShopFooter />
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-white">
      <ShopHeader />

      <section className="relative isolate overflow-hidden py-10 sm:py-14">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-50/60 via-white to-accent-50/60" />
        <div className="pointer-events-none absolute -left-32 top-0 -z-10 h-96 w-96 rounded-full bg-brand-300/40 blur-[120px]" />
        <div className="pointer-events-none absolute -right-32 bottom-0 -z-10 h-96 w-96 rounded-full bg-pink-300/40 blur-[120px]" />

        <div className="mx-auto grid max-w-shell grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:px-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="rounded-[28px] bg-white p-6 shadow-lift ring-1 ring-ink-100 sm:p-9"
          >
            <div className="flex items-center gap-2">
              <Logo size="sm" />
              <span className="rounded-full bg-accent-500/95 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                Nova conta
              </span>
            </div>
            <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink-950 sm:text-4xl">
              Cria sua conta <span className="text-gradient">Nebulari</span>
            </h1>
            <p className="mt-2 text-sm text-ink-600">
              Leva 30 segundos. Já sai com cupom de 10% off na primeira compra.
            </p>

            {/* Social */}
            <div className="mt-6 grid grid-cols-2 gap-2">
              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-2xl bg-white px-3 py-3 text-sm font-bold text-ink-950 ring-1 ring-ink-200 transition-all hover:-translate-y-0.5 hover:shadow-card"
              >
                <Chrome className="h-4 w-4 text-brand-700" />
                Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-2xl bg-ink-950 px-3 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-brand-800 hover:shadow-glow"
              >
                <Apple className="h-4 w-4" />
                Apple
              </button>
            </div>

            <div className="my-5 flex items-center gap-3 text-[11px] font-bold uppercase tracking-wider text-ink-400">
              <span className="h-px flex-1 bg-ink-100" />
              ou com email
              <span className="h-px flex-1 bg-ink-100" />
            </div>

            {error && (
              <div className="mb-4 flex items-start gap-2 rounded-2xl bg-pink-50 px-3.5 py-2.5 text-[12px] text-pink-700 ring-1 ring-pink-200">
                <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <Field
                icon={UserIcon}
                label="Nome completo"
                placeholder="Como devemos te chamar?"
                value={nome}
                onChange={setNome}
                autoComplete="name"
                required
              />

              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                <Field
                  icon={Mail}
                  label="Email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={setEmail}
                  autoComplete="email"
                  required
                />
                <Field
                  icon={Phone}
                  label="Celular"
                  type="tel"
                  placeholder="(11) 98765-4321"
                  value={phone}
                  onChange={setPhone}
                  autoComplete="tel"
                />
              </div>

              {/* Senha */}
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-ink-600">
                  Senha
                </label>
                <div className="mt-1 flex h-12 items-center rounded-2xl bg-ink-50 ring-1 ring-ink-200 transition-all focus-within:bg-white focus-within:ring-2 focus-within:ring-brand-500">
                  <Lock className="ml-3 h-4 w-4 text-ink-400" />
                  <input
                    type={showPw ? "text" : "password"}
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    placeholder="Mínimo 8 caracteres"
                    autoComplete="new-password"
                    required
                    className="min-w-0 flex-1 bg-transparent px-3 text-sm text-ink-950 placeholder:text-ink-400 focus:outline-none"
                  />
                  <button
                    type="button"
                    aria-label={showPw ? "Esconder senha" : "Mostrar senha"}
                    onClick={() => setShowPw((s) => !s)}
                    className="mr-2 flex h-9 w-9 items-center justify-center rounded-lg text-ink-400 hover:bg-ink-100 hover:text-ink-700"
                  >
                    {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>

                {senha.length > 0 && (
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex flex-1 gap-1">
                      {[1, 2, 3, 4].map((i) => (
                        <span
                          key={i}
                          className={`h-1.5 flex-1 rounded-full transition-colors ${
                            i <= pwStrength.score ? pwStrength.tone : "bg-ink-100"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="w-20 text-right text-[10px] font-bold uppercase tracking-wider text-ink-600">
                      {pwStrength.label}
                    </span>
                  </div>
                )}
              </div>

              {/* Confirmar */}
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-ink-600">
                  Confirmar senha
                </label>
                <div
                  className={`mt-1 flex h-12 items-center rounded-2xl bg-ink-50 ring-1 transition-all focus-within:bg-white focus-within:ring-2 ${
                    passwordsMismatch
                      ? "ring-pink-300 focus-within:ring-pink-500"
                      : passwordsMatch
                        ? "ring-aux-300 focus-within:ring-aux-500"
                        : "ring-ink-200 focus-within:ring-brand-500"
                  }`}
                >
                  <Lock className="ml-3 h-4 w-4 text-ink-400" />
                  <input
                    type={showPw ? "text" : "password"}
                    value={confirmar}
                    onChange={(e) => setConfirmar(e.target.value)}
                    placeholder="Repete a senha"
                    autoComplete="new-password"
                    required
                    className="min-w-0 flex-1 bg-transparent px-3 text-sm text-ink-950 placeholder:text-ink-400 focus:outline-none"
                  />
                  {passwordsMatch && (
                    <Check className="mr-3 h-4 w-4 text-aux-600" />
                  )}
                </div>
                {passwordsMismatch && (
                  <p className="mt-1 text-[11px] text-pink-700">
                    As senhas não batem.
                  </p>
                )}
              </div>

              {/* Vibes */}
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-ink-600">
                  Sua vibe <span className="text-ink-400">(opcional — pra gente recomendar melhor)</span>
                </label>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {VIBES.map((v) => {
                    const isOn = vibes.includes(v);
                    return (
                      <button
                        key={v}
                        type="button"
                        onClick={() => toggleVibe(v)}
                        className={`rounded-full px-3 py-1.5 text-[12px] font-semibold transition-all ${
                          isOn
                            ? "bg-gradient-to-r from-brand-600 to-accent-500 text-white shadow-card"
                            : "bg-ink-50 text-ink-700 hover:bg-ink-100"
                        }`}
                      >
                        {isOn && <Check className="mr-1 inline h-3 w-3" />}
                        {v}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Checks */}
              <label className="flex cursor-pointer items-start gap-2.5 rounded-2xl p-1 text-[12.5px] text-ink-700">
                <input
                  type="checkbox"
                  checked={aceitaNewsletter}
                  onChange={(e) => setAceitaNewsletter(e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-ink-300 text-brand-600 focus:ring-brand-500"
                />
                <span>
                  Quero receber o drop semanal por email — primeiro a saber.
                </span>
              </label>

              <label className="flex cursor-pointer items-start gap-2.5 rounded-2xl p-1 text-[12.5px] text-ink-700">
                <input
                  type="checkbox"
                  checked={aceitaTermos}
                  onChange={(e) => setAceitaTermos(e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-ink-300 text-brand-600 focus:ring-brand-500"
                  required
                />
                <span>
                  Li e aceito os <a href="#" className="font-semibold text-brand-700 hover:underline">Termos</a> e a <a href="#" className="font-semibold text-brand-700 hover:underline">Política de privacidade</a>.
                </span>
              </label>

              <button
                type="submit"
                className="group mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-ink-950 px-5 py-4 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-brand-800 hover:shadow-glow"
              >
                Criar conta cósmica
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>

              <p className="text-center text-[12.5px] text-ink-600">
                Já tem conta?{" "}
                <Link
                  href="/entrar"
                  className="font-semibold text-brand-700 hover:underline"
                >
                  Entrar
                </Link>
              </p>
            </form>
          </motion.div>

          {/* Perks panel */}
          <motion.aside
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="relative isolate overflow-hidden rounded-[28px] bg-ink-950 p-7 text-white shadow-lift sm:p-9"
          >
            <div className="pointer-events-none absolute inset-0 -z-10 bg-aurora opacity-70" />
            <div className="pointer-events-none absolute -right-20 -top-20 -z-10 h-72 w-72 rounded-full bg-accent-500/30 blur-[120px]" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 -z-10 h-72 w-72 rounded-full bg-pink-500/30 blur-[120px]" />
            <div className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-[0.07]" />

            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white ring-1 ring-white/20">
              <Gift className="h-3 w-3 text-accent-300" />
              Nebulari+
            </span>

            <h2 className="mt-3 font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
              Conta nova, perks <span className="text-gradient">cósmicos</span>.
            </h2>
            <p className="mt-1.5 text-sm text-white/70">
              Membros levam mais — desde a 1ª compra.
            </p>

            <ul className="mt-6 space-y-3.5">
              {PERKS.map((p) => {
                const Icon = p.icon;
                return (
                  <li
                    key={p.title}
                    className="flex items-start gap-3 rounded-2xl bg-white/5 p-3 ring-1 ring-white/10"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-glow">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="font-display text-sm font-extrabold text-white">
                        {p.title}
                      </p>
                      <p className="text-[12px] text-white/65">{p.desc}</p>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="mt-6 flex items-center gap-2 rounded-2xl bg-white/5 p-3 ring-1 ring-white/10">
              <Shield className="h-4 w-4 text-aux-300" />
              <p className="text-[11px] text-white/70">
                Seus dados são criptografados e nunca compartilhados. Cancele a conta em 1 clique a qualquer momento.
              </p>
            </div>
          </motion.aside>
        </div>
      </section>

      <ShopFooter />
    </main>
  );
}

function Field({
  icon: Icon,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  autoComplete,
  required,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-[11px] font-bold uppercase tracking-wider text-ink-600">
        {label}
      </label>
      <div className="mt-1 flex h-12 items-center rounded-2xl bg-ink-50 ring-1 ring-ink-200 transition-all focus-within:bg-white focus-within:ring-2 focus-within:ring-brand-500">
        <Icon className="ml-3 h-4 w-4 text-ink-400" />
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          className="min-w-0 flex-1 bg-transparent px-3 text-sm text-ink-950 placeholder:text-ink-400 focus:outline-none"
        />
      </div>
    </div>
  );
}
