"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  Apple,
  Chrome,
  AlertCircle,
} from "lucide-react";
import ShopHeader from "@/components/shop/ShopHeader";
import ShopFooter from "@/components/shop/ShopFooter";
import Logo from "@/components/Logo";

export default function EntrarPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [lembrar, setLembrar] = useState(true);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !senha) {
      setError("Email e senha são obrigatórios.");
      return;
    }
    setError(null);
    // Mock — front only.
    alert(`Login simulado para ${email}. Front-end demo.`);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-white">
      <ShopHeader />

      <section className="relative isolate overflow-hidden py-10 sm:py-14">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-50/60 via-white to-accent-50/60" />
        <div className="pointer-events-none absolute -left-32 top-0 -z-10 h-96 w-96 rounded-full bg-brand-300/40 blur-[120px]" />
        <div className="pointer-events-none absolute -right-32 bottom-0 -z-10 h-96 w-96 rounded-full bg-pink-300/40 blur-[120px]" />

        <div className="mx-auto flex max-w-md flex-col px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="rounded-[28px] bg-white p-6 shadow-lift ring-1 ring-ink-100 sm:p-9"
          >
            <div className="flex items-center gap-2">
              <Logo size="sm" />
              <span className="rounded-full bg-brand-700 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                Entrar
              </span>
            </div>
            <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink-950 sm:text-4xl">
              Bem-vinda de volta
            </h1>
            <p className="mt-2 text-sm text-ink-600">
              Sua wishlist, seus pedidos e o NEBULA10 te esperam.
            </p>

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
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-ink-600">
                  Email
                </label>
                <div className="mt-1 flex h-12 items-center rounded-2xl bg-ink-50 ring-1 ring-ink-200 transition-all focus-within:bg-white focus-within:ring-2 focus-within:ring-brand-500">
                  <Mail className="ml-3 h-4 w-4 text-ink-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    autoComplete="email"
                    required
                    className="min-w-0 flex-1 bg-transparent px-3 text-sm text-ink-950 placeholder:text-ink-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-ink-600">
                    Senha
                  </label>
                  <a
                    href="#"
                    className="text-[11px] font-semibold text-brand-700 hover:underline"
                  >
                    Esqueci a senha
                  </a>
                </div>
                <div className="mt-1 flex h-12 items-center rounded-2xl bg-ink-50 ring-1 ring-ink-200 transition-all focus-within:bg-white focus-within:ring-2 focus-within:ring-brand-500">
                  <Lock className="ml-3 h-4 w-4 text-ink-400" />
                  <input
                    type={showPw ? "text" : "password"}
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    placeholder="Sua senha"
                    autoComplete="current-password"
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
              </div>

              <label className="flex cursor-pointer items-center gap-2.5 p-1 text-[12.5px] text-ink-700">
                <input
                  type="checkbox"
                  checked={lembrar}
                  onChange={(e) => setLembrar(e.target.checked)}
                  className="h-4 w-4 rounded border-ink-300 text-brand-600 focus:ring-brand-500"
                />
                Lembrar de mim nesse dispositivo
              </label>

              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-ink-950 px-5 py-4 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-brand-800 hover:shadow-glow"
              >
                Entrar
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>

              <p className="text-center text-[12.5px] text-ink-600">
                Primeira vez na Nebulari?{" "}
                <Link
                  href="/criar-conta"
                  className="inline-flex items-center gap-1 font-semibold text-brand-700 hover:underline"
                >
                  <Sparkles className="h-3 w-3" /> Criar conta
                </Link>
              </p>
            </form>
          </motion.div>
        </div>
      </section>

      <ShopFooter />
    </main>
  );
}
