import type { Shape } from "@/components/shop/ProductIllustration";

export type Badge = "Mais vendido" | "Novo" | "Oferta" | "Premium" | "Frete grátis" | "Top 1";

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  badge?: Badge;
  gradient: string;
  shape: Shape;
  image?: string;
  freeShipping?: boolean;
  installments?: number;
};

const f = (
  id: string,
  name: string,
  brand: string,
  category: string,
  price: number,
  oldPrice: number,
  shape: Shape,
  gradient: string,
  rating: number,
  reviews: number,
  badge?: Badge,
  image?: string,
  freeShipping = true,
  installments = 6,
): Product => ({
  id, name, brand, category, price, oldPrice, shape, gradient, image, rating, reviews, badge, freeShipping, installments,
});

// Fotos hospedadas no Unsplash — vibe teen / Y2K / cosmic.
// O usuário pode trocar por URLs específicas do Alibaba (s.alicdn.com / sc04.alicdn.com)
// já liberadas no next.config.js, ou subir fotos próprias em /public.
const u = (id: string, opts = "w=900&q=80&auto=format&fit=crop") =>
  `https://images.unsplash.com/photo-${id}?${opts}`;

const IMG = {
  // Áudio / tech
  headphones: u("1505740420928-5e560c06d30e"),
  headphonesPurple: u("1545127398-14699f92334b"),
  earbuds: u("1590658268037-6bf12165a8df"),
  earbudsAlt: u("1574920162043-b872873f19c8"),
  ringLight: u("1607968565043-36af90dde238"),
  speaker: u("1608043152269-423dbba4e7e1"),
  // Aesthetic room / LED
  ledStrip: u("1505691938895-1758d7feb511"),
  fairyLights: u("1542038784456-1ea8e935640e"),
  neonSign: u("1535268647677-300dbf3d78d1"),
  mushroomLamp: u("1565374395542-0ce18882c857"),
  discoBall: u("1561758033-d89a9ad46330"),
  posters: u("1567538096630-e0c55bd6374c"),
  polaroidWall: u("1607344645866-009c320b63e0"),
  // Beleza
  skincare: u("1556228720-195a672e8a03"),
  skincareSet: u("1571781926291-c477ebfd024b"),
  lipgloss: u("1586495777744-4413f21062fa"),
  makeupBrushes: u("1522338242992-e1a54906a8da"),
  blush: u("1542838686-37da4a9fd1b3"),
  // Perfume
  perfume: u("1541643600914-78b084683601"),
  perfumePink: u("1592945403244-b3fbafd7f539"),
  bodyMist: u("1594035910387-fea47794261f"),
  candle: u("1574180566232-aaad1b5b8450"),
  // Streetwear
  hoodie: u("1556821840-3a63f95609a7"),
  tshirt: u("1521572163474-6864f9cf17ab"),
  oversizedTee: u("1583744946564-b52ac1c389c8"),
  cargo: u("1604176354204-9268737828e4"),
  sneakerWhite: u("1542291026-7eec264c27ff"),
  sneakerChunky: u("1606107557195-0e29a4b5b4aa"),
  // Y2K
  rings: u("1611652022419-a9419f74343d"),
  necklace: u("1611591437281-460bfbe1220a"),
  sunglasses: u("1572635196237-14b3f281503f"),
  bag: u("1591561954557-26941169b49e"),
  // Gaming
  ps5: u("1606144042614-b2417e99c4e3"),
  controller: u("1592840496694-26d035b52b48"),
  keyboard: u("1601445638532-3c6f6c3aa1d6"),
  mouseRGB: u("1527814050087-3793815479db"),
  gamerChair: u("1593305841991-05c297ba4575"),
  // Plush / Cozy
  plush: u("1620266757065-5814239881fd"),
  blanket: u("1608571423902-eed4a5ad8108"),
  socks: u("1586350977771-b3b0abd50c82"),
  // Stationery
  notebook: u("1517842645767-c639042777db"),
  stickers: u("1503602642458-232111445657"),
  planner: u("1456735190827-d1262f71b8a3"),
  // School
  backpack: u("1553062407-98eeb64c6a62"),
  waterBottle: u("1602143407151-7111542de6e8"),
  lunchbox: u("1577985043696-8bd54d9f093f"),
  // Snacks
  snackBox: u("1599583863916-e06c29087f51"),
  candy: u("1582058091505-f87a2e55a40f"),
  // K-Drop
  albumKpop: u("1598387993441-a364f854c3e1"),
  photocards: u("1545558014-8692077e9b5c"),
};

// 12 categorias teen
export const CATEGORIES = [
  { id: "led-quarto", name: "LED & Quarto", icon: "Lightbulb", gradient: "from-brand-600 to-brand-800" },
  { id: "beleza", name: "Beleza", icon: "Sparkles", gradient: "from-accent-400 to-accent-600" },
  { id: "perfume", name: "Perfume", icon: "Wind", gradient: "from-pink-400 to-rose-600" },
  { id: "streetwear", name: "Streetwear", icon: "Shirt", gradient: "from-brand-800 to-ink-950" },
  { id: "y2k", name: "Y2K", icon: "Glasses", gradient: "from-accent-500 to-brand-700" },
  { id: "tech", name: "Tech & Áudio", icon: "Headphones", gradient: "from-brand-500 to-aux-600" },
  { id: "gaming", name: "Gaming", icon: "Gamepad2", gradient: "from-brand-700 to-ink-900" },
  { id: "plush", name: "Plush & Cozy", icon: "Heart", gradient: "from-accent-300 to-pink-500" },
  { id: "stationery", name: "Papelaria", icon: "BookOpen", gradient: "from-aux-400 to-brand-600" },
  { id: "school", name: "Volta às aulas", icon: "Backpack", gradient: "from-brand-600 to-accent-600" },
  { id: "snacks", name: "Snacks", icon: "Cookie", gradient: "from-amber-400 to-pink-600" },
  { id: "kdrop", name: "K-Drop & Anime", icon: "Star", gradient: "from-fuchsia-500 to-purple-700" },
];

// ====================== MAIS VENDIDOS — Top da semana ======================
export const BESTSELLERS: Product[] = [
  f("b1", "Earbuds Galaxy Pop · Cancelamento ANC", "ORBIT", "Tech & Áudio", 249, 399, "headphone", "from-brand-600 via-brand-700 to-brand-900", 4.9, 4128, "Top 1", IMG.earbuds),
  f("b2", "Fita LED RGB 10m · Controle por app", "HALO", "LED & Quarto", 89, 149, "lamp", "from-brand-500 via-accent-500 to-pink-600", 4.8, 3201, "Mais vendido", IMG.ledStrip),
  f("b3", "Sérum Vitamina C Glow · 30ml", "LUNA", "Beleza", 79, 129, "skincare", "from-pink-200 via-pink-300 to-pink-500", 4.9, 2840, "Mais vendido", IMG.skincare),
  f("b4", "Tênis Chunky Cloud · branco off", "DRIFT", "Streetwear", 349, 499, "sneaker", "from-ink-200 via-ink-300 to-brand-300", 4.8, 1820, "Mais vendido", IMG.sneakerChunky),
  f("b5", "Perfume Body Mist Cosmo · 200ml", "ETHER", "Perfume", 79, 119, "perfume", "from-accent-400 via-accent-500 to-brand-700", 4.9, 2120, "Mais vendido", IMG.bodyMist),
  f("b6", "Plushie Estrela Dormindo · 35cm", "PLUSH", "Plush & Cozy", 89, 139, "perfume", "from-pink-300 via-pink-400 to-accent-500", 4.9, 3320, "Mais vendido", IMG.plush),
];

// ====================== OFERTAS RELÂMPAGO — Drop da Noite ======================
export const FLASH_DEALS: Product[] = [
  f("f1", "Cordão de Fairy Lights 5m · USB", "HALO", "LED & Quarto", 29, 69, "lamp", "from-brand-500 via-accent-400 to-pink-500", 4.7, 1640, "Oferta", IMG.fairyLights),
  f("f2", "Headphone Over-Ear Studio · Wireless", "ECHO", "Tech & Áudio", 299, 549, "headphone", "from-brand-700 via-brand-800 to-ink-950", 4.8, 1284, "Oferta", IMG.headphones),
  f("f3", "Kit Skincare Glass Skin · 4 itens", "LUNA", "Beleza", 149, 289, "skincare", "from-pink-100 via-pink-200 to-pink-400", 4.9, 942, "Oferta", IMG.skincareSet),
  f("f4", "Controle Wireless Pro · RGB", "COSMO", "Gaming", 199, 349, "controller", "from-brand-700 via-brand-800 to-ink-900", 4.8, 1820, "Oferta", IMG.controller),
  f("f5", "Caderno Stardust · 200 fls pontilhado", "SPRITE", "Papelaria", 39, 69, "book", "from-aux-400 via-brand-500 to-brand-700", 4.7, 612, "Oferta", IMG.notebook),
  f("f6", "Brilho Labial Cosmic Shine · 6 cores", "LUNA", "Beleza", 29, 59, "lipstick", "from-pink-400 via-pink-500 to-accent-600", 4.6, 2210, "Oferta", IMG.lipgloss),
];

// ====================== PARA VOCÊ — vibe check ======================
export const FOR_YOU: Product[] = [
  f("r1", "Ring Light Tripé 26cm · 3 tons", "ORBIT", "Tech & Áudio", 119, 199, "lamp", "from-brand-500 via-brand-600 to-accent-500", 4.8, 1812, "Mais vendido", IMG.ringLight),
  f("r2", "Hoodie Oversized Lilás Dream", "DRIFT", "Streetwear", 189, 249, "tshirt", "from-brand-400 via-brand-500 to-brand-700", 4.7, 482, "Novo", IMG.hoodie),
  f("r3", "Caderno Pastel Galaxy · capa dura", "SPRITE", "Papelaria", 49, 89, "book", "from-accent-400 via-brand-500 to-brand-700", 5.0, 1240, "Top 1", IMG.notebook),
  f("r4", "Vela Aromática Cosmic Night · 200g", "ETHER", "Perfume", 69, 99, "perfume", "from-brand-500 via-brand-700 to-ink-900", 4.8, 642, "Frete grátis", IMG.candle),
  f("r5", "Mochila Cloud Mini · 14L impermeável", "NOVA", "Volta às aulas", 149, 229, "backpack", "from-pink-400 via-pink-500 to-brand-700", 4.7, 982, "Premium", IMG.backpack),
  f("r6", "Camiseta Oversized Aurora · unissex", "DRIFT", "Streetwear", 89, 129, "tshirt", "from-accent-500 via-brand-600 to-brand-800", 4.6, 412, "Mais vendido", IMG.oversizedTee),
];

// ====================== ACABOU DE CHEGAR ======================
export const NEW_ARRIVALS: Product[] = [
  f("n1", "Luminária Cogumelo Halo RGB", "HALO", "LED & Quarto", 99, 159, "lamp", "from-brand-500 via-pink-500 to-accent-600", 4.7, 312, "Novo", IMG.mushroomLamp, false),
  f("n2", "Letreiro Neon Stay Magic", "HALO", "LED & Quarto", 199, 299, "lamp", "from-pink-500 via-fuchsia-500 to-brand-700", 4.8, 542, "Novo", IMG.neonSign),
  f("n3", "Kit 30 Stickers Aesthetic", "SPRITE", "Papelaria", 19, 39, "book", "from-accent-300 via-brand-400 to-brand-600", 4.9, 96, "Novo", IMG.stickers),
  f("n4", "Coleção Pôsteres Y2K · pack 6", "SPRITE", "LED & Quarto", 49, 89, "book", "from-brand-300 via-brand-500 to-brand-800", 4.7, 412, "Novo", IMG.posters),
  f("n5", "Disco Ball Projetor LED · USB", "HALO", "LED & Quarto", 89, 149, "lamp", "from-aux-400 via-brand-500 to-pink-500", 4.9, 1842, "Novo", IMG.discoBall),
  f("n6", "Pack 6 Photocards · seu fav", "KAI", "K-Drop & Anime", 29, 49, "book", "from-pink-400 via-fuchsia-500 to-purple-700", 4.8, 612, "Novo", IMG.photocards),
];

// ====================== AESTHETIC ROOM ======================
export const ROOM: Product[] = [
  f("room1", "Fita LED RGB 10m Smart", "HALO", "LED & Quarto", 89, 149, "lamp", "from-brand-500 via-accent-500 to-pink-600", 4.8, 3201, "Mais vendido", IMG.ledStrip),
  f("room2", "Mushroom Lamp Halo", "HALO", "LED & Quarto", 99, 159, "lamp", "from-brand-500 via-pink-500 to-accent-600", 4.7, 312, "Novo", IMG.mushroomLamp),
  f("room3", "Letreiro Neon Stay Magic", "HALO", "LED & Quarto", 199, 299, "lamp", "from-pink-500 via-fuchsia-500 to-brand-700", 4.8, 542, "Premium", IMG.neonSign),
  f("room4", "Disco Ball Projetor LED", "HALO", "LED & Quarto", 89, 149, "lamp", "from-aux-400 via-brand-500 to-pink-500", 4.9, 1842, "Mais vendido", IMG.discoBall),
  f("room5", "Pôsteres Y2K · pack 6", "SPRITE", "LED & Quarto", 49, 89, "book", "from-brand-300 via-brand-500 to-brand-800", 4.7, 412, "Oferta", IMG.posters),
  f("room6", "Polaroid Wall · clipes + cordão", "SPRITE", "LED & Quarto", 39, 69, "book", "from-accent-300 via-brand-400 to-brand-700", 4.6, 218, "Frete grátis", IMG.polaroidWall),
];

// ====================== BELEZA ======================
export const BEAUTY: Product[] = [
  f("be1", "Sérum Vitamina C Glow 30ml", "LUNA", "Beleza", 79, 129, "skincare", "from-pink-200 via-pink-300 to-pink-500", 4.9, 2840, "Top 1", IMG.skincare),
  f("be2", "Kit Glass Skin · 4 itens", "LUNA", "Beleza", 149, 289, "skincare", "from-pink-100 via-pink-200 to-pink-400", 4.9, 942, "Mais vendido", IMG.skincareSet),
  f("be3", "Brilho Labial Cosmic Shine", "LUNA", "Beleza", 29, 59, "lipstick", "from-pink-400 via-pink-500 to-accent-600", 4.7, 2210, "Mais vendido", IMG.lipgloss),
  f("be4", "Pincéis 12 peças cabo cromado", "LUNA", "Beleza", 99, 169, "lipstick", "from-pink-300 via-accent-400 to-brand-600", 4.8, 1240, "Oferta", IMG.makeupBrushes),
  f("be5", "Blush em Pó Sunset · 4 tons", "LUNA", "Beleza", 49, 79, "lipstick", "from-rose-300 via-pink-400 to-pink-600", 4.9, 612, "Novo", IMG.blush),
  f("be6", "Batom Líquido Matte Velvet", "LUNA", "Beleza", 35, 59, "lipstick", "from-pink-500 via-rose-600 to-accent-700", 4.6, 1820, "Mais vendido", IMG.lipgloss),
];

// ====================== PERFUME ======================
export const PERFUMES: Product[] = [
  f("pf1", "Body Mist Cosmo 200ml", "ETHER", "Perfume", 79, 119, "perfume", "from-accent-400 via-accent-500 to-brand-700", 4.9, 2120, "Top 1", IMG.bodyMist),
  f("pf2", "Eau de Parfum Aurora 75ml", "ETHER", "Perfume", 229, 329, "perfume", "from-pink-400 via-pink-500 to-rose-700", 4.8, 942, "Premium", IMG.perfumePink),
  f("pf3", "Vela Aromática Cosmic Night 200g", "ETHER", "Perfume", 69, 99, "perfume", "from-brand-500 via-brand-700 to-ink-900", 4.8, 642, "Mais vendido", IMG.candle),
  f("pf4", "Perfume Nebulari Edition 100ml", "ETHER", "Perfume", 199, 299, "perfume", "from-brand-600 via-brand-800 to-ink-950", 4.9, 1812, "Novo", IMG.perfume),
  f("pf5", "Body Splash Sweet Galaxy 250ml", "ETHER", "Perfume", 49, 89, "perfume", "from-pink-300 via-pink-400 to-accent-500", 4.7, 412, "Oferta", IMG.bodyMist),
  f("pf6", "Vela Mini Trio Aesthetic", "ETHER", "Perfume", 89, 139, "perfume", "from-brand-400 via-brand-500 to-pink-500", 4.6, 218, "Frete grátis", IMG.candle),
];

// ====================== STREETWEAR ======================
export const STREETWEAR: Product[] = [
  f("st1", "Hoodie Oversized Lilás Dream", "DRIFT", "Streetwear", 189, 249, "tshirt", "from-brand-400 via-brand-500 to-brand-700", 4.7, 482, "Top 1", IMG.hoodie),
  f("st2", "Camiseta Oversized Aurora", "DRIFT", "Streetwear", 89, 129, "tshirt", "from-accent-500 via-brand-600 to-brand-800", 4.6, 412, "Mais vendido", IMG.oversizedTee),
  f("st3", "Tênis Chunky Cloud Off", "DRIFT", "Streetwear", 349, 499, "sneaker", "from-ink-200 via-ink-300 to-brand-300", 4.8, 1820, "Mais vendido", IMG.sneakerChunky),
  f("st4", "Calça Cargo Wide Leg", "DRIFT", "Streetwear", 219, 299, "tshirt", "from-ink-700 via-ink-800 to-brand-900", 4.7, 542, "Novo", IMG.cargo),
  f("st5", "Tênis Air Force Clean Branco", "DRIFT", "Streetwear", 299, 399, "sneaker", "from-ink-100 via-ink-200 to-brand-200", 4.9, 1620, "Premium", IMG.sneakerWhite),
  f("st6", "Camiseta Cosmic Star · oversized", "DRIFT", "Streetwear", 79, 119, "tshirt", "from-brand-700 via-brand-800 to-ink-900", 4.6, 312, "Oferta", IMG.tshirt),
];

// ====================== GAMING ======================
export const GAMING: Product[] = [
  f("g1", "Console Next-Gen 1TB", "COSMO", "Gaming", 3499, 4999, "console", "from-brand-800 via-ink-900 to-ink-950", 4.9, 1820, "Top 1", IMG.ps5),
  f("g2", "Controle Wireless Pro RGB", "COSMO", "Gaming", 199, 349, "controller", "from-brand-700 via-brand-800 to-ink-900", 4.8, 1820, "Mais vendido", IMG.controller),
  f("g3", "Headset Gamer ANC RGB", "COSMO", "Gaming", 299, 549, "headphone", "from-brand-700 via-brand-900 to-ink-950", 4.9, 1284, "Mais vendido", IMG.headphonesPurple),
  f("g4", "Teclado Mecânico RGB compacto", "COSMO", "Gaming", 349, 499, "controller", "from-ink-800 via-ink-900 to-brand-900", 4.8, 612, "Premium", IMG.keyboard),
  f("g5", "Mouse Gamer RGB · 12k DPI", "COSMO", "Gaming", 149, 249, "controller", "from-brand-700 via-brand-800 to-ink-950", 4.7, 820, "Oferta", IMG.mouseRGB),
  f("g6", "Cadeira Gamer Cosmic", "COSMO", "Gaming", 999, 1399, "controller", "from-ink-700 via-brand-800 to-ink-900", 4.8, 412, "Frete grátis", IMG.gamerChair),
];

// ====================== PLUSH & COZY ======================
export const PLUSH: Product[] = [
  f("pl1", "Plushie Estrela Dormindo 35cm", "PLUSH", "Plush & Cozy", 89, 139, "perfume", "from-pink-300 via-pink-400 to-accent-500", 4.9, 3320, "Top 1", IMG.plush),
  f("pl2", "Cobertor Sherpa Cosmic Pink", "PLUSH", "Plush & Cozy", 149, 219, "perfume", "from-pink-200 via-pink-300 to-pink-500", 4.8, 1240, "Mais vendido", IMG.blanket),
  f("pl3", "Meias Fuzzy Galaxy · 3 pares", "PLUSH", "Plush & Cozy", 39, 69, "tshirt", "from-brand-400 via-pink-500 to-accent-500", 4.7, 612, "Mais vendido", IMG.socks),
  f("pl4", "Plushie Coração Estelar 25cm", "PLUSH", "Plush & Cozy", 69, 109, "perfume", "from-pink-400 via-pink-500 to-rose-700", 4.8, 942, "Novo", IMG.plush),
  f("pl5", "Almofada Body Cosmic 1.20m", "PLUSH", "Plush & Cozy", 129, 199, "perfume", "from-brand-400 via-accent-400 to-pink-500", 4.7, 412, "Oferta", IMG.plush),
  f("pl6", "Cobertor Microfibra Aurora", "PLUSH", "Plush & Cozy", 119, 179, "perfume", "from-aux-400 via-brand-500 to-pink-600", 4.6, 318, "Frete grátis", IMG.blanket),
];

// ====================== Y2K / ACESSÓRIOS ======================
export const Y2K: Product[] = [
  f("y1", "Set 7 Anéis Chunky Prata", "DUSK", "Y2K", 49, 89, "perfume", "from-ink-200 via-ink-300 to-brand-300", 4.8, 1820, "Top 1", IMG.rings),
  f("y2", "Colar Layering Coração · 3 fios", "DUSK", "Y2K", 79, 129, "perfume", "from-pink-300 via-pink-400 to-pink-600", 4.9, 1240, "Mais vendido", IMG.necklace),
  f("y3", "Óculos Y2K Oval Tinted", "DUSK", "Y2K", 89, 149, "perfume", "from-brand-500 via-accent-500 to-pink-600", 4.7, 612, "Mais vendido", IMG.sunglasses),
  f("y4", "Bolsa Baguete Cromada Holográfica", "DUSK", "Y2K", 189, 269, "bag", "from-aux-300 via-brand-400 to-pink-500", 4.8, 412, "Premium", IMG.bag),
  f("y5", "Bandana Estampada · pack 3", "DUSK", "Y2K", 39, 59, "tshirt", "from-pink-400 via-brand-500 to-brand-700", 4.6, 318, "Oferta", IMG.necklace),
  f("y6", "Brincos Argola Chunky Ouro", "DUSK", "Y2K", 59, 99, "perfume", "from-amber-300 via-amber-400 to-pink-600", 4.7, 540, "Novo", IMG.necklace),
];

// ====================== TECH & ÁUDIO ======================
export const TECH: Product[] = [
  f("t1", "Earbuds Galaxy Pop ANC", "ORBIT", "Tech & Áudio", 249, 399, "headphone", "from-brand-600 via-brand-700 to-brand-900", 4.9, 4128, "Top 1", IMG.earbuds),
  f("t2", "Headphone Over-Ear Studio", "ECHO", "Tech & Áudio", 299, 549, "headphone", "from-brand-700 via-brand-800 to-ink-950", 4.8, 1284, "Mais vendido", IMG.headphones),
  f("t3", "Ring Light Tripé 26cm", "ORBIT", "Tech & Áudio", 119, 199, "lamp", "from-brand-500 via-brand-600 to-accent-500", 4.8, 1812, "Mais vendido", IMG.ringLight),
  f("t4", "Caixinha Bluetooth Boom Mini", "ECHO", "Tech & Áudio", 149, 229, "speaker", "from-brand-500 via-accent-500 to-aux-500", 4.7, 1218, "Mais vendido", IMG.speaker),
  f("t5", "Earbuds Vibe TWS · 32h bateria", "ORBIT", "Tech & Áudio", 159, 249, "headphone", "from-pink-400 via-pink-500 to-brand-700", 4.7, 980, "Oferta", IMG.earbudsAlt),
  f("t6", "Headphone Lilás ANC Pro", "ECHO", "Tech & Áudio", 449, 699, "headphone", "from-brand-500 via-brand-600 to-pink-600", 4.9, 612, "Premium", IMG.headphonesPurple),
];

// ====================== SCHOOL / VOLTA ÀS AULAS ======================
export const SCHOOL: Product[] = [
  f("sc1", "Mochila Cloud Mini 14L", "NOVA", "Volta às aulas", 149, 229, "backpack", "from-pink-400 via-pink-500 to-brand-700", 4.7, 982, "Top 1", IMG.backpack),
  f("sc2", "Garrafa Térmica Cosmic 750ml", "NOVA", "Volta às aulas", 89, 139, "perfume", "from-brand-500 via-accent-500 to-aux-500", 4.8, 1240, "Mais vendido", IMG.waterBottle),
  f("sc3", "Lancheira Térmica Aesthetic", "NOVA", "Volta às aulas", 79, 119, "bag", "from-accent-400 via-brand-500 to-brand-700", 4.7, 612, "Mais vendido", IMG.lunchbox),
  f("sc4", "Caderno Pastel Galaxy capa dura", "SPRITE", "Papelaria", 49, 89, "book", "from-accent-400 via-brand-500 to-brand-700", 5.0, 1240, "Premium", IMG.notebook),
  f("sc5", "Planner Mensal Stardust", "SPRITE", "Papelaria", 69, 99, "book", "from-pink-400 via-pink-500 to-brand-700", 4.8, 540, "Novo", IMG.planner),
  f("sc6", "Kit 30 Stickers Aesthetic", "SPRITE", "Papelaria", 19, 39, "book", "from-accent-300 via-brand-400 to-brand-600", 4.9, 96, "Oferta", IMG.stickers),
];

// Departamentos (banners grandes) — bento
export const DEPARTMENTS = [
  { id: "led-quarto", name: "LED & Quarto", pitch: "Drop da semana", sub: "Fita LED, neon, mushroom lamp, projetor", gradient: "from-brand-600 via-brand-700 to-ink-950", shape: "lamp" as Shape, image: IMG.ledStrip },
  { id: "beleza", name: "Beleza & Skincare", pitch: "Glass skin", sub: "Sérum, glow, pincéis, lip combo", gradient: "from-pink-400 via-pink-500 to-accent-600", shape: "lipstick" as Shape, image: IMG.skincare },
  { id: "streetwear", name: "Streetwear", pitch: "Drops semanais", sub: "Hoodies, oversized, cargo, tênis chunky", gradient: "from-brand-700 via-brand-800 to-ink-950", shape: "tshirt" as Shape, image: IMG.hoodie },
  { id: "gaming", name: "Gaming Setup", pitch: "RGB on", sub: "Headset, controle, teclado, cadeira", gradient: "from-brand-800 via-ink-900 to-brand-950", shape: "controller" as Shape, image: IMG.controller },
  { id: "plush", name: "Plush & Cozy", pitch: "Cozy hour", sub: "Plushies, cobertor sherpa, meias fuzzy", gradient: "from-pink-400 via-pink-500 to-accent-500", shape: "perfume" as Shape, image: IMG.plush },
  { id: "y2k", name: "Y2K Vibes", pitch: "Throwback fav", sub: "Anéis, óculos, bolsa cromada, baguete", gradient: "from-accent-500 via-brand-600 to-brand-800", shape: "bag" as Shape, image: IMG.bag },
];

// Brands cósmicas da Nebulari
export const BRANDS = ["LUNA", "HALO", "ORBIT", "COSMO", "DRIFT", "ETHER", "NOVA", "ECHO", "SPRITE", "PLUSH", "DUSK", "KAI"];

// Hero principal — produto em destaque da semana
export const HERO_PRODUCT = {
  name: "Earbuds Galaxy Pop · ANC",
  brand: "ORBIT",
  pitch: "Cancelamento ativo + 36h de bateria com estojo cósmico",
  price: 249,
  oldPrice: 399,
  installments: 6,
  rating: 4.9,
  reviews: 4128,
  image: IMG.earbuds,
};
