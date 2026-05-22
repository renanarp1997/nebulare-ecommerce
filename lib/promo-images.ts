// Imagens editoriais para banners e seções. Hospedadas no Unsplash (CDN público).
// Swap por URLs do Alibaba (s.alicdn.com / sc04.alicdn.com) ou /public quando preferir.
const u = (id: string, opts = "w=1200&q=80&auto=format&fit=crop") =>
  `https://images.unsplash.com/photo-${id}?${opts}`;

export const IMG_LIST = {
  // promo dark — vibe Nebulari Night (earbuds/headphone em fundo cósmico)
  promoDark: u("1545127398-14699f92334b"),
  // promo light — vibe LED quarto aesthetic
  promoLight: u("1505691938895-1758d7feb511"),
  // newsletter — lifestyle teen / beauty drop
  newsletter: u("1556228720-195a672e8a03"),
  // banner secundário
  banner: u("1565374395542-0ce18882c857"),
};
