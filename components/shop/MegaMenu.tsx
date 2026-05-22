"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Lightbulb,
  Sparkles,
  Wind,
  Shirt,
  Glasses,
  Headphones,
  Gamepad2,
  Heart,
  BookOpen,
  Backpack,
  Cookie,
  Star,
  ArrowRight,
  ChevronRight,
  Flame,
  Tag,
  Zap,
  Gift,
  Truck,
  Percent,
} from "lucide-react";

type Dept = {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: string;
  productCount: string;
  subs: string[];
  promos: { icon: React.ComponentType<{ className?: string }>; label: string; tone: "hot" | "shipping" | "coupon" }[];
  featured: {
    brand: string;
    name: string;
    price: string;
    oldPrice?: string;
    image: string;
  };
};

const u = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=600&q=80&auto=format&fit=crop`;

const DEPARTMENTS: Dept[] = [
  {
    id: "led-quarto",
    name: "LED & Quarto",
    icon: Lightbulb,
    accent: "from-brand-600 to-brand-800",
    productCount: "380+ produtos disponíveis",
    subs: [
      "Fita LED RGB",
      "Mushroom lamp",
      "Letreiro neon",
      "Disco ball projetor",
      "Fairy lights",
      "Projetor galáxia",
      "Pôsteres Y2K",
      "Polaroid wall",
      "Sunset projector",
    ],
    promos: [
      { icon: Percent, label: "Até 50% OFF", tone: "hot" },
      { icon: Truck, label: "Frete grátis R$ 149+", tone: "shipping" },
    ],
    featured: {
      brand: "HALO",
      name: "Mushroom Lamp Halo RGB",
      price: "R$ 99,00",
      oldPrice: "R$ 159,00",
      image: u("1565374395542-0ce18882c857"),
    },
  },
  {
    id: "beleza",
    name: "Beleza",
    icon: Sparkles,
    accent: "from-pink-500 to-accent-600",
    productCount: "520+ produtos disponíveis",
    subs: [
      "Sérum Vitamina C",
      "Kit Glass Skin",
      "Lip combo",
      "Pincéis & makeup",
      "Blush",
      "Batom líquido",
      "Esfoliante",
      "Tônico hidratante",
      "Máscara facial",
    ],
    promos: [
      { icon: Gift, label: "Compre 2 leve 3", tone: "hot" },
      { icon: Tag, label: "Cupom GLOW20", tone: "coupon" },
    ],
    featured: {
      brand: "LUNA",
      name: "Kit Glass Skin · 4 itens",
      price: "R$ 149,00",
      oldPrice: "R$ 289,00",
      image: u("1571781926291-c477ebfd024b"),
    },
  },
  {
    id: "perfume",
    name: "Perfume",
    icon: Wind,
    accent: "from-pink-400 to-rose-600",
    productCount: "210+ produtos disponíveis",
    subs: [
      "Body mist",
      "EDP signature",
      "Vela aromática",
      "Difusor de ambiente",
      "Body splash",
      "Roll-on",
      "Sachê aromático",
      "Kit mini perfumes",
      "Spray hair mist",
    ],
    promos: [
      { icon: Flame, label: "Drop da noite", tone: "hot" },
      { icon: Truck, label: "Frete grátis", tone: "shipping" },
    ],
    featured: {
      brand: "ETHER",
      name: "Body Mist Cosmo 200ml",
      price: "R$ 79,00",
      oldPrice: "R$ 119,00",
      image: u("1594035910387-fea47794261f"),
    },
  },
  {
    id: "streetwear",
    name: "Streetwear",
    icon: Shirt,
    accent: "from-ink-800 to-brand-900",
    productCount: "640+ produtos disponíveis",
    subs: [
      "Hoodies oversized",
      "Camisetas oversized",
      "Calça cargo",
      "Calça wide leg",
      "Tênis chunky",
      "Tênis branco clean",
      "Bucket hat",
      "Meia tubular",
      "Jaqueta puffer",
    ],
    promos: [
      { icon: Percent, label: "Até 40% OFF", tone: "hot" },
      { icon: Tag, label: "Cupom DRIFT10", tone: "coupon" },
    ],
    featured: {
      brand: "DRIFT",
      name: "Tênis Chunky Cloud Off",
      price: "R$ 349,00",
      oldPrice: "R$ 499,00",
      image: u("1606107557195-0e29a4b5b4aa"),
    },
  },
  {
    id: "y2k",
    name: "Y2K",
    icon: Glasses,
    accent: "from-accent-500 to-brand-700",
    productCount: "190+ produtos disponíveis",
    subs: [
      "Anéis chunky",
      "Colares layering",
      "Óculos oval tinted",
      "Bolsa baguete cromada",
      "Bandanas pack",
      "Brincos argola",
      "Cintos chain",
      "Pulseiras beads",
      "Acessórios cabelo",
    ],
    promos: [
      { icon: Zap, label: "Novidades semanais", tone: "hot" },
      { icon: Truck, label: "Frete grátis", tone: "shipping" },
    ],
    featured: {
      brand: "DUSK",
      name: "Set 7 Anéis Chunky Prata",
      price: "R$ 49,00",
      oldPrice: "R$ 89,00",
      image: u("1611652022419-a9419f74343d"),
    },
  },
  {
    id: "tech",
    name: "Tech & Áudio",
    icon: Headphones,
    accent: "from-brand-500 to-aux-600",
    productCount: "420+ produtos disponíveis",
    subs: [
      "Earbuds TWS",
      "Headphones ANC",
      "Ring light tripé",
      "Caixinha bluetooth",
      "Tripé celular",
      "Capa de celular",
      "Cabos USB-C",
      "Power bank",
      "Pop socket",
    ],
    promos: [
      { icon: Percent, label: "Até 60% OFF", tone: "hot" },
      { icon: Tag, label: "Pix com 12% off", tone: "coupon" },
    ],
    featured: {
      brand: "ORBIT",
      name: "Earbuds Galaxy Pop ANC",
      price: "R$ 249,00",
      oldPrice: "R$ 399,00",
      image: u("1590658268037-6bf12165a8df"),
    },
  },
  {
    id: "gaming",
    name: "Gaming",
    icon: Gamepad2,
    accent: "from-brand-700 to-ink-950",
    productCount: "280+ produtos disponíveis",
    subs: [
      "Console next-gen",
      "Controle wireless",
      "Headset gamer",
      "Teclado mecânico",
      "Mouse RGB",
      "Cadeira gamer",
      "Mousepad RGB",
      "Webcam streaming",
      "Câmera de captura",
    ],
    promos: [
      { icon: Flame, label: "Drop gamer", tone: "hot" },
      { icon: Truck, label: "Envia em 24h", tone: "shipping" },
    ],
    featured: {
      brand: "COSMO",
      name: "Controle Wireless Pro RGB",
      price: "R$ 199,00",
      oldPrice: "R$ 349,00",
      image: u("1592840496694-26d035b52b48"),
    },
  },
  {
    id: "plush",
    name: "Plush & Cozy",
    icon: Heart,
    accent: "from-accent-300 to-pink-500",
    productCount: "150+ produtos disponíveis",
    subs: [
      "Plushie estrela",
      "Plushie coração",
      "Cobertor sherpa",
      "Almofada body",
      "Pantufa fuzzy",
      "Meias galáxia",
      "Robe cosmic",
      "Pijama set",
      "Touca peluda",
    ],
    promos: [
      { icon: Gift, label: "Compre 2 leve 3", tone: "hot" },
      { icon: Truck, label: "Frete grátis", tone: "shipping" },
    ],
    featured: {
      brand: "PLUSH",
      name: "Plushie Estrela Dormindo 35cm",
      price: "R$ 89,00",
      oldPrice: "R$ 139,00",
      image: u("1620266757065-5814239881fd"),
    },
  },
  {
    id: "papelaria",
    name: "Papelaria",
    icon: BookOpen,
    accent: "from-aux-400 to-brand-600",
    productCount: "320+ produtos disponíveis",
    subs: [
      "Caderno aesthetic",
      "Planner mensal",
      "Stickers pack",
      "Caneta gel",
      "Marca-texto",
      "Adesivos vinil",
      "Sketchbook",
      "Glitter pen",
      "Fita washi",
    ],
    promos: [
      { icon: Percent, label: "Até 30% OFF", tone: "hot" },
      { icon: Truck, label: "Frete grátis", tone: "shipping" },
    ],
    featured: {
      brand: "SPRITE",
      name: "Caderno Pastel Galaxy",
      price: "R$ 49,00",
      oldPrice: "R$ 89,00",
      image: u("1517842645767-c639042777db"),
    },
  },
  {
    id: "volta-as-aulas",
    name: "Volta às aulas",
    icon: Backpack,
    accent: "from-brand-600 to-accent-600",
    productCount: "240+ produtos disponíveis",
    subs: [
      "Mochila cloud mini",
      "Garrafa térmica",
      "Lancheira",
      "Estojo duplo",
      "Agenda escolar",
      "Marca-páginas",
      "Squeeze infantil",
      "Calculadora",
      "Régua aesthetic",
    ],
    promos: [
      { icon: Tag, label: "Combos com 20% off", tone: "coupon" },
      { icon: Truck, label: "Frete grátis", tone: "shipping" },
    ],
    featured: {
      brand: "NOVA",
      name: "Mochila Cloud Mini 14L",
      price: "R$ 149,00",
      oldPrice: "R$ 229,00",
      image: u("1553062407-98eeb64c6a62"),
    },
  },
  {
    id: "snacks",
    name: "Snacks",
    icon: Cookie,
    accent: "from-amber-400 to-pink-600",
    productCount: "120+ produtos disponíveis",
    subs: [
      "Snack box mensal",
      "Doces coreanos",
      "Chocolate japonês",
      "Mochi",
      "Bebida coreana",
      "Cookies americanos",
      "Pocky",
      "Brigadeiro gourmet",
      "Kit degustação",
    ],
    promos: [
      { icon: Flame, label: "Mensal por R$ 79", tone: "hot" },
      { icon: Truck, label: "Frete grátis", tone: "shipping" },
    ],
    featured: {
      brand: "POP",
      name: "Snack Box Aesthetic",
      price: "R$ 79,00",
      oldPrice: "R$ 129,00",
      image: u("1582058091505-f87a2e55a40f"),
    },
  },
  {
    id: "k-drop-anime",
    name: "K-Drop & Anime",
    icon: Star,
    accent: "from-fuchsia-500 to-purple-700",
    productCount: "180+ produtos disponíveis",
    subs: [
      "Photocards pack",
      "Posters K-Pop",
      "Albums oficiais",
      "Lightstick",
      "Pin badges",
      "Acrílico anime",
      "Chaveiros",
      "Camiseta anime",
      "Banner BTS",
    ],
    promos: [
      { icon: Gift, label: "Drop oficial", tone: "hot" },
      { icon: Tag, label: "Frete acumulável", tone: "coupon" },
    ],
    featured: {
      brand: "KAI",
      name: "Pack 6 Photocards",
      price: "R$ 29,00",
      oldPrice: "R$ 49,00",
      image: u("1545558014-8692077e9b5c"),
    },
  },
];

const SHORTCUTS = [
  { icon: Flame, label: "Drop da noite", tone: "text-accent-600", href: "/drop-da-noite" },
  { icon: Zap, label: "Mais vendidos", tone: "text-amber-500", href: "/mais-vendidos" },
  { icon: Sparkles, label: "Recém-chegados", tone: "text-brand-600", href: "/recem-chegados" },
  { icon: Gift, label: "Nebulari+", tone: "text-pink-500", href: "/wishlist" },
];

const PROMO_STYLES: Record<"hot" | "shipping" | "coupon", string> = {
  hot: "bg-gradient-to-r from-accent-500 to-pink-500 text-white",
  shipping: "bg-aux-50 text-aux-700 ring-1 ring-aux-200",
  coupon: "bg-brand-50 text-brand-700 ring-1 ring-brand-200",
};

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function MegaMenu({ open, onClose }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState(DEPARTMENTS[0].id);
  const active = DEPARTMENTS.find((d) => d.id === activeId) ?? DEPARTMENTS[0];
  const ActiveIcon = active.icon;

  // Click-outside e Esc
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      {/* Backdrop com blur */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-x-0 top-0 z-40 h-screen bg-ink-950/30 backdrop-blur-[3px]"
        aria-hidden
      />

      {/* Painel */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-0 right-0 z-50 hidden border-b border-ink-100 bg-white shadow-lift lg:block"
      >
        {/* Faixa cósmica no topo */}
        <div className="h-[3px] w-full bg-gradient-to-r from-brand-500 via-accent-500 to-aux-500" />

        <div className="mx-auto max-w-shell px-6 py-6">
          <div className="grid grid-cols-12 gap-5">
            {/* Sidebar de departamentos */}
            <aside className="col-span-3 border-r border-ink-100 pr-4">
              <ul className="space-y-0.5">
                {DEPARTMENTS.map((d) => {
                  const Icon = d.icon;
                  const isActive = d.id === activeId;
                  return (
                    <li key={d.id}>
                      <a
                        href={`/departamento/${d.id}`}
                        onMouseEnter={() => setActiveId(d.id)}
                        onFocus={() => setActiveId(d.id)}
                        onClick={onClose}
                        className={`group flex items-center justify-between gap-2 rounded-xl px-2.5 py-2 text-[13px] font-semibold transition-all ${
                          isActive
                            ? "bg-gradient-to-r from-brand-50 to-accent-50 text-brand-800"
                            : "text-ink-700 hover:bg-ink-50 hover:text-ink-950"
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          <span
                            className={`flex h-7 w-7 items-center justify-center rounded-lg transition-all ${
                              isActive
                                ? `bg-gradient-to-br ${d.accent} text-white shadow-card`
                                : "bg-ink-100 text-ink-700 group-hover:bg-brand-100 group-hover:text-brand-700"
                            }`}
                          >
                            <Icon className="h-3.5 w-3.5" />
                          </span>
                          {d.name}
                        </span>
                        <ChevronRight
                          className={`h-3.5 w-3.5 transition-all ${
                            isActive
                              ? "translate-x-0 text-brand-600 opacity-100"
                              : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-60"
                          }`}
                        />
                      </a>
                    </li>
                  );
                })}
              </ul>

              {/* Atalhos */}
              <div className="mt-5 border-t border-ink-100 pt-4">
                <p className="px-2 text-[10px] font-bold uppercase tracking-[0.18em] text-ink-400">
                  Atalhos
                </p>
                <ul className="mt-2 space-y-0.5">
                  {SHORTCUTS.map((s) => {
                    const Icon = s.icon;
                    return (
                      <li key={s.label}>
                        <a
                          href={s.href}
                          onClick={onClose}
                          className="group flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[12.5px] font-semibold text-ink-700 transition-colors hover:bg-ink-50 hover:text-ink-950"
                        >
                          <Icon className={`h-3.5 w-3.5 ${s.tone}`} />
                          {s.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </aside>

            {/* Painel ativo */}
            <motion.section
              key={active.id}
              initial={{ opacity: 0, x: 6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.18 }}
              className="col-span-6 pl-2"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink-400">
                    Departamento
                  </p>
                  <div className="mt-1 flex items-center gap-2.5">
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br ${active.accent} text-white shadow-card`}
                    >
                      <ActiveIcon className="h-4 w-4" />
                    </span>
                    <h3 className="font-display text-2xl font-extrabold tracking-tight text-ink-950">
                      {active.name}
                    </h3>
                  </div>
                  <p className="mt-1 text-[12px] text-ink-500">
                    {active.productCount}
                  </p>
                </div>
                <a
                  href={`/departamento/${active.id}`}
                  onClick={onClose}
                  className="group inline-flex items-center gap-1.5 rounded-full bg-ink-950 px-3.5 py-2 text-[11px] font-semibold text-white transition-colors hover:bg-brand-800"
                >
                  Ver tudo
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>

              {/* Sub-categorias em 3 colunas */}
              <div className="mt-5 grid grid-cols-3 gap-x-3 gap-y-0.5">
                {active.subs.map((s) => (
                  <a
                    key={s}
                    href={`/departamento/${active.id}#produtos`}
                    onClick={onClose}
                    className="group flex items-center justify-between rounded-lg px-2 py-1.5 text-[12.5px] font-medium text-ink-700 transition-colors hover:bg-brand-50/70 hover:text-brand-800"
                  >
                    <span>{s}</span>
                    <ArrowRight className="h-3 w-3 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                  </a>
                ))}
              </div>

              {/* Promos */}
              <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-ink-100 pt-4">
                {active.promos.map((p, i) => {
                  const Icon = p.icon;
                  return (
                    <span
                      key={i}
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold ${PROMO_STYLES[p.tone]}`}
                    >
                      <Icon className="h-3 w-3" />
                      {p.label}
                    </span>
                  );
                })}
              </div>
            </motion.section>

            {/* Featured product card */}
            <motion.aside
              key={`feat-${active.id}`}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.22 }}
              className="col-span-3"
            >
              <a
                href={`/departamento/${active.id}`}
                onClick={onClose}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-ink-100 transition-all hover:-translate-y-1 hover:ring-brand-200 hover:shadow-lift"
              >
                <div className="relative aspect-[5/4] w-full overflow-hidden bg-ink-50">
                  <Image
                    src={active.featured.image}
                    alt={active.featured.name}
                    fill
                    sizes="320px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-ink-950 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.18em] text-white">
                    <Sparkles className="h-3 w-3 text-accent-300" /> Destaque
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-700">
                    {active.featured.brand}
                  </p>
                  <h5 className="mt-1 line-clamp-2 font-display text-[13.5px] font-bold leading-snug text-ink-950">
                    {active.featured.name}
                  </h5>
                  <div className="mt-auto flex items-end justify-between pt-3">
                    <div>
                      {active.featured.oldPrice && (
                        <p className="text-[10px] text-ink-400 line-through">
                          {active.featured.oldPrice}
                        </p>
                      )}
                      <p className="font-display text-base font-extrabold tracking-tight text-ink-950">
                        {active.featured.price}
                      </p>
                    </div>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-950 text-white transition-transform group-hover:rotate-[-12deg]">
                      <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </div>
              </a>
            </motion.aside>
          </div>
        </div>
      </motion.div>
    </>
  );
}
