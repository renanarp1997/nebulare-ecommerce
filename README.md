# Bazam — Landing Page

Site institucional premium da Bazam, empresa gestora de e-commerce.
Construído com **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion** e **lucide-react**.

## Stack

- Next.js 14 · App Router
- TypeScript
- Tailwind CSS (paleta brand/accent/ink customizada)
- Framer Motion (animações de entrada e hover)
- lucide-react (ícones)
- Inter via `next/font/google`

## Como rodar

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

Para build de produção:

```bash
npm run build
npm start
```

## Estrutura

```
app/
  layout.tsx          # Layout raiz + fonte Inter + metadata
  page.tsx            # Composição da landing page
  globals.css         # Tailwind + utilitários (text-gradient, bg-mesh, bg-grid)
components/
  Logo.tsx            # Logo Bazam (SVG inline)
  Navbar.tsx          # Navbar fixa com mobile menu
  Hero.tsx            # Hero + dashboard mockup
  DashboardMock.tsx   # Mockup de dashboard reutilizável
  Problems.tsx        # 8 cards de dores do cliente
  Solutions.tsx       # 8 cards de soluções
  HowItWorks.tsx      # 4 passos do método
  Results.tsx         # 4 KPIs com fundo escuro
  PremiumVisual.tsx   # Painel operacional grande
  Benefits.tsx        # 6 benefícios + dashboard compacto
  CTA.tsx             # CTA final em card destacado
  Footer.tsx          # Rodapé com colunas
tailwind.config.ts    # Cores brand (indigo), accent (emerald), ink (slate)
```

## Customização rápida

- **Cores**: edite `tailwind.config.ts` → `colors.brand` e `colors.accent`.
- **Textos**: cada seção é um componente isolado em `components/`, fácil de editar.
- **Logo**: substituir o SVG em `components/Logo.tsx`.
- **Contatos**: alterar em `components/Footer.tsx` e `components/CTA.tsx`.

## Notas de design

- Fundo claro com cinza suave, primária indigo (brand-700) e destaque verde (accent-500).
- Gradientes leves, cards com `shadow-card`/`shadow-soft`, bordas arredondadas `rounded-2xl`/`3xl`.
- Section "Resultados" usa fundo escuro (brand-900 → ink-900) para contraste.
- Todos os mockups (dashboard, gráficos, pedidos) são feitos em CSS/SVG — sem imagens externas.
- Layout 100% responsivo (mobile, tablet, desktop).
