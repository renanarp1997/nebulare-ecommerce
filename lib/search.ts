import {
  BESTSELLERS,
  FLASH_DEALS,
  FOR_YOU,
  NEW_ARRIVALS,
  ROOM,
  BEAUTY,
  PERFUMES,
  STREETWEAR,
  Y2K,
  TECH,
  GAMING,
  PLUSH,
  SCHOOL,
  type Product,
} from "./store-data";

const ALL_RAW: Product[] = [
  ...BESTSELLERS,
  ...FLASH_DEALS,
  ...FOR_YOU,
  ...NEW_ARRIVALS,
  ...ROOM,
  ...BEAUTY,
  ...PERFUMES,
  ...STREETWEAR,
  ...Y2K,
  ...TECH,
  ...GAMING,
  ...PLUSH,
  ...SCHOOL,
];

// Dedupe por id (vários produtos aparecem em mais de uma lista).
const seen = new Set<string>();
export const ALL_PRODUCTS: Product[] = ALL_RAW.filter((p) => {
  if (seen.has(p.id)) return false;
  seen.add(p.id);
  return true;
});

export function findProductById(id: string): Product | undefined {
  return ALL_PRODUCTS.find((product) => product.id === id);
}

const DIACRITICS = /[̀-ͯ]/g;
const normalize = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(DIACRITICS, "").trim();

export type SearchHit = {
  product: Product;
  score: number;
};

export function searchProducts(query: string, limit?: number): SearchHit[] {
  const q = normalize(query);
  if (!q) return [];

  const terms = q.split(/\s+/).filter(Boolean);
  const hits: SearchHit[] = [];

  for (const product of ALL_PRODUCTS) {
    const name = normalize(product.name);
    const brand = normalize(product.brand);
    const category = normalize(product.category);

    let score = 0;
    let allMatched = true;

    for (const term of terms) {
      let termScore = 0;
      if (name.startsWith(term)) termScore += 12;
      else if (name.includes(` ${term}`) || name.includes(`-${term}`)) termScore += 8;
      else if (name.includes(term)) termScore += 6;
      if (brand.includes(term)) termScore += 5;
      if (category.includes(term)) termScore += 4;

      if (termScore === 0) {
        allMatched = false;
        break;
      }
      score += termScore;
    }

    if (allMatched) hits.push({ product, score });
  }

  hits.sort(
    (a, b) => b.score - a.score || b.product.reviews - a.product.reviews,
  );
  return typeof limit === "number" ? hits.slice(0, limit) : hits;
}

const TAGS = [
  "LED",
  "Skincare",
  "Hoodie",
  "Plushie",
  "Perfume",
  "Earbuds",
  "Tênis",
  "Y2K",
  "Gaming",
  "Caderno",
  "Photocards",
  "Lip gloss",
];

export function suggestTags(query: string, limit = 6): string[] {
  const q = normalize(query);
  if (!q) return TAGS.slice(0, limit);
  return TAGS.filter((t) => normalize(t).includes(q)).slice(0, limit);
}
