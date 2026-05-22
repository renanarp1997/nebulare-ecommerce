import ShopHeader from "@/components/shop/ShopHeader";
import ShopHero from "@/components/shop/ShopHero";
import BenefitsBar from "@/components/shop/BenefitsBar";
import FlashDeals from "@/components/shop/FlashDeals";
import Categories from "@/components/shop/Categories";
import ProductSection from "@/components/shop/ProductSection";
import Departments from "@/components/shop/Departments";
import PromoSplit from "@/components/shop/PromoSplit";
import BrandsAndReviews from "@/components/shop/BrandsAndReviews";
import Newsletter from "@/components/shop/Newsletter";
import ShopFooter from "@/components/shop/ShopFooter";
import { BESTSELLERS, FOR_YOU, NEW_ARRIVALS } from "@/lib/store-data";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white">
      <ShopHeader />
      <ShopHero />
      <BenefitsBar />
      <Categories />
      <FlashDeals />
      <ProductSection
        id="produtos"
        eyebrow="Top da semana"
        title="O que tá bombando agora."
        description="Curadoria automática pelos itens mais comprados nas últimas 72 horas."
        products={BESTSELLERS}
      />
      <Departments />
      <PromoSplit />
      <ProductSection
        eyebrow="Pra você"
        title="Combina com a sua vibe."
        description="Mix entre beleza, quarto aesthetic, streetwear e papelaria — pra quem gosta de variar."
        products={FOR_YOU}
        tone="muted"
        accent="pink"
      />
      <ProductSection
        eyebrow="Recém-chegados"
        title="Acabou de cair na vitrine."
        description="Drops da semana com estoque limitado, envio em 24h e cupom de pré-venda quando rola."
        products={NEW_ARRIVALS}
        accent="accent"
      />
      <BrandsAndReviews />
      <Newsletter />
      <ShopFooter />
    </main>
  );
}
