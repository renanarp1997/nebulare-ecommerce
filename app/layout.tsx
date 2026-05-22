import type { Metadata } from "next";
import { Inter, Manrope, Sora } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Nebulari · Sua vibe, seu drop",
  description:
    "Tudo que rolou no FYP em um lugar só. LED do quarto, drops de beleza, streetwear, plushies, perfumes e tech. Frete grátis acima de R$ 149 e Pix com 12% off.",
  keywords: [
    "Nebulari",
    "loja teen",
    "Y2K",
    "led quarto",
    "skincare",
    "streetwear",
    "perfume teen",
    "plushie",
    "gaming",
    "ecommerce adolescente",
  ],
  openGraph: {
    title: "Nebulari · Sua vibe, seu drop",
    description:
      "Os achados do TikTok com curadoria de gente real: LED, beleza, drops de moda, gaming, plushies e mais.",
    type: "website",
    locale: "pt_BR",
  },
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${manrope.variable} ${sora.variable}`}
    >
      <body className="font-sans antialiased bg-white text-ink-900 selection:bg-brand-200/40">
        {children}
      </body>
    </html>
  );
}
