import type { ComponentType } from "react";
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
} from "lucide-react";
import {
  type Product,
  ROOM,
  BEAUTY,
  PERFUMES,
  STREETWEAR,
  Y2K,
  TECH,
  GAMING,
  PLUSH,
  SCHOOL,
  NEW_ARRIVALS,
  FOR_YOU,
  BESTSELLERS,
} from "./store-data";

export type DepartmentSlug =
  | "led-quarto"
  | "beleza"
  | "perfume"
  | "streetwear"
  | "y2k"
  | "tech"
  | "gaming"
  | "plush"
  | "papelaria"
  | "volta-as-aulas"
  | "snacks"
  | "k-drop-anime";

export type Department = {
  slug: DepartmentSlug;
  name: string;
  tagline: string;
  pitch: string;
  description: string;
  productCount: string;
  icon: ComponentType<{ className?: string }>;
  accent: string; // tailwind gradient classes
  heroBg: string; // tailwind gradient for hero section background
  pillTone: string; // tailwind classes for accent pill
  subs: string[];
  products: Product[];
  related?: { title: string; description: string; products: Product[] };
};

// SCHOOL contém os 3 itens "school" (sc1-sc3) e os 3 de papelaria (sc4-sc6).
const PAPELARIA = [...SCHOOL.slice(3), ...NEW_ARRIVALS.slice(2, 4)];
const SCHOOL_ONLY = [...SCHOOL.slice(0, 3), ...SCHOOL.slice(3)];

// Sem datasets dedicados ainda — usa um mix coerente.
const SNACKS = [
  ...FOR_YOU.slice(0, 2),
  ...BESTSELLERS.slice(1, 3),
  ...NEW_ARRIVALS.slice(1, 3),
];
const KDROP = [
  NEW_ARRIVALS[5],
  ...Y2K.slice(0, 2),
  ...NEW_ARRIVALS.slice(0, 2),
  PLUSH[0],
];

export const DEPARTMENT_LIST: Department[] = [
  {
    slug: "led-quarto",
    name: "LED & Quarto",
    tagline: "Aesthetic room core",
    pitch: "Drop da semana",
    description:
      "Fita LED, mushroom lamp, letreiro neon e projetor galáxia — tudo pra transformar o quarto num cenário cósmico.",
    productCount: "380+ produtos",
    icon: Lightbulb,
    accent: "from-brand-600 to-brand-800",
    heroBg: "from-brand-50 via-white to-accent-50",
    pillTone: "bg-brand-600/95 text-white",
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
    products: ROOM,
    related: {
      title: "Vai bem com o teu room tour",
      description: "Itens que aparecem em todo room tour aesthetic.",
      products: NEW_ARRIVALS,
    },
  },
  {
    slug: "beleza",
    name: "Beleza",
    tagline: "Glass skin energy",
    pitch: "Cupom GLOW20",
    description:
      "Skincare coreano, kits glass skin, lip combo e pincéis que viralizam — curadoria pra rotina de beauty que cuida da vibe.",
    productCount: "520+ produtos",
    icon: Sparkles,
    accent: "from-pink-500 to-accent-600",
    heroBg: "from-pink-50 via-white to-accent-50",
    pillTone: "bg-pink-500/95 text-white",
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
    products: BEAUTY,
    related: {
      title: "Complementa o ritual",
      description: "Body mist e vela aromática que combinam com a sua rotina.",
      products: PERFUMES,
    },
  },
  {
    slug: "perfume",
    name: "Perfume",
    tagline: "Cheirinho cósmico",
    pitch: "Drop da noite",
    description:
      "Body mist, eau de parfum e velas aromáticas — fragrâncias quentinhas pra deixar o quartinho mais aesthetic.",
    productCount: "210+ produtos",
    icon: Wind,
    accent: "from-pink-400 to-rose-600",
    heroBg: "from-rose-50 via-white to-pink-50",
    pillTone: "bg-rose-500/95 text-white",
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
    products: PERFUMES,
    related: {
      title: "Pra fechar o look",
      description: "Beleza skincare que combina com cada fragrância.",
      products: BEAUTY,
    },
  },
  {
    slug: "streetwear",
    name: "Streetwear",
    tagline: "Drip aprovado",
    pitch: "Cupom DRIFT10",
    description:
      "Hoodies oversized, calça cargo wide leg e tênis chunky — drops semanais com curadoria de marcas urbanas.",
    productCount: "640+ produtos",
    icon: Shirt,
    accent: "from-ink-800 to-brand-900",
    heroBg: "from-ink-100 via-white to-brand-50",
    pillTone: "bg-ink-950 text-white",
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
    products: STREETWEAR,
    related: {
      title: "Mix com Y2K",
      description: "Acessórios chunky que finalizam o look streetwear.",
      products: Y2K,
    },
  },
  {
    slug: "y2k",
    name: "Y2K",
    tagline: "Throwback fav",
    pitch: "Novidades semanais",
    description:
      "Acessórios chunky, bolsas cromadas, óculos oval tinted — o pacote Y2K que aparece nos rooms tours mais salvos.",
    productCount: "190+ produtos",
    icon: Glasses,
    accent: "from-accent-500 to-brand-700",
    heroBg: "from-accent-50 via-white to-brand-50",
    pillTone: "bg-accent-500/95 text-white",
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
    products: Y2K,
    related: {
      title: "Combina com streetwear",
      description: "Hoodies e tênis chunky que fecham o visual.",
      products: STREETWEAR,
    },
  },
  {
    slug: "tech",
    name: "Tech & Áudio",
    tagline: "Som que rouba a cena",
    pitch: "Pix com 12% off",
    description:
      "Earbuds ANC, headphones premium, ring lights e caixinhas bluetooth — o setup que a galera criadora pede.",
    productCount: "420+ produtos",
    icon: Headphones,
    accent: "from-brand-500 to-aux-600",
    heroBg: "from-aux-50 via-white to-brand-50",
    pillTone: "bg-aux-600/95 text-white",
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
    products: TECH,
    related: {
      title: "Pra completar o setup",
      description: "Periféricos gamer e iluminação que combinam.",
      products: GAMING,
    },
  },
  {
    slug: "gaming",
    name: "Gaming",
    tagline: "RGB on",
    pitch: "Envia em 24h",
    description:
      "Console next-gen, controle wireless, headset gamer e cadeira RGB — setup pronto pra dominar o leaderboard.",
    productCount: "280+ produtos",
    icon: Gamepad2,
    accent: "from-brand-700 to-ink-950",
    heroBg: "from-ink-100 via-white to-accent-50",
    pillTone: "bg-ink-950 text-white",
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
    products: GAMING,
    related: {
      title: "Áudio do setup",
      description: "Headphones e caixinha bluetooth que casam.",
      products: TECH,
    },
  },
  {
    slug: "plush",
    name: "Plush & Cozy",
    tagline: "Cozy hour",
    pitch: "Compre 2 leve 3",
    description:
      "Plushies fofos, cobertor sherpa, almofada body e meias fuzzy — o pacote conforto pra cozy nights cósmicas.",
    productCount: "150+ produtos",
    icon: Heart,
    accent: "from-accent-300 to-pink-500",
    heroBg: "from-pink-50 via-white to-accent-50",
    pillTone: "bg-pink-400/95 text-white",
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
    products: PLUSH,
    related: {
      title: "Cozy room",
      description: "Itens de LED & quarto que combinam.",
      products: ROOM,
    },
  },
  {
    slug: "papelaria",
    name: "Papelaria",
    tagline: "Pra organizar o caos",
    pitch: "Até 30% OFF",
    description:
      "Caderno pastel galaxy, planner mensal, stickers aesthetic e canetas brilhantes — papelaria fofa pra deixar a rotina mais leve.",
    productCount: "320+ produtos",
    icon: BookOpen,
    accent: "from-aux-400 to-brand-600",
    heroBg: "from-aux-50 via-white to-brand-50",
    pillTone: "bg-aux-500/95 text-white",
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
    products: PAPELARIA,
    related: {
      title: "Combo escolar",
      description: "Mochila, garrafa e lancheira pra fechar o kit.",
      products: SCHOOL_ONLY,
    },
  },
  {
    slug: "volta-as-aulas",
    name: "Volta às aulas",
    tagline: "Kit aesthetic",
    pitch: "Combos com 20% off",
    description:
      "Mochila cloud, garrafa térmica cósmica, lancheira aesthetic e planner — kit pronto pra volta às aulas com vibe.",
    productCount: "240+ produtos",
    icon: Backpack,
    accent: "from-brand-600 to-accent-600",
    heroBg: "from-brand-50 via-white to-accent-50",
    pillTone: "bg-brand-700 text-white",
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
    products: SCHOOL_ONLY,
    related: {
      title: "Papelaria que casa",
      description: "Caderno galaxy, planner stardust e stickers pra completar.",
      products: PAPELARIA,
    },
  },
  {
    slug: "snacks",
    name: "Snacks",
    tagline: "Sabor cósmico",
    pitch: "Mensal por R$ 79",
    description:
      "Snack box mensal, doces coreanos, mochis, pocky e bebidas asiáticas — curadoria gulosa pra noites cinema-em-casa.",
    productCount: "120+ produtos",
    icon: Cookie,
    accent: "from-amber-400 to-pink-600",
    heroBg: "from-amber-50 via-white to-pink-50",
    pillTone: "bg-amber-500/95 text-ink-950",
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
    products: SNACKS,
    related: {
      title: "Pra cozy night",
      description: "Plushies e cobertores que fecham a vibe.",
      products: PLUSH,
    },
  },
  {
    slug: "k-drop-anime",
    name: "K-Drop & Anime",
    tagline: "Fandom on",
    pitch: "Drop oficial",
    description:
      "Photocards pack, albums oficiais, lightstick e pôsteres K-Pop & anime — drops oficiais pra fandom raiz.",
    productCount: "180+ produtos",
    icon: Star,
    accent: "from-fuchsia-500 to-purple-700",
    heroBg: "from-fuchsia-50 via-white to-pink-50",
    pillTone: "bg-fuchsia-500/95 text-white",
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
    products: KDROP,
    related: {
      title: "Acessórios fandom",
      description: "Anéis, colares e bolsa cromada Y2K-core.",
      products: Y2K,
    },
  },
];

export const DEPARTMENT_BY_SLUG: Record<string, Department> = Object.fromEntries(
  DEPARTMENT_LIST.map((d) => [d.slug, d]),
);
