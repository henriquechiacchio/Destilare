# Destilare

Destilare é uma vitrine premium de whiskys criada com React + TypeScript e foco em narrativa de marca, catálogo editorial e experiência de compra fluida. O projeto combina layout sofisticado, navegação em SPA, busca inteligente e um carrinho persistente em localStorage, mantendo a publicação simples em GitHub Pages.

## Estado atual do projeto

✅ **Status: completo, funcional e publicado**

O projeto atende ao objetivo do desafio com uma implementação mais completa do que a base inicial: além da vitrine, catálogo, busca e páginas de detalhe, ele também inclui carrinho de compras persistente, gerência de estado global e ajustes responsivos para mobile.

### Funcionalidades principais
- front-end em React 19 com TypeScript;
- navegação em rota com React Router DOM em três páginas: `/`, `/como-fiz` e `/produto/:id`;
- identidade visual premium editorial, com paleta em bege, cobre e marrom;
- catálogo dinâmico com whiskys carregados do JSON em `public/data/products.json`;
- busca em tempo real por nome, categoria e descrição;
- normalização de acentos e caixa para português;
- página de detalhe do produto com imagem, origem, preço, idade, descrição e notas;
- carrinho lateral com persistência em `localStorage`;
- controle de quantidade, remoção, subtotal e limpeza do carrinho;
- navegação de produto no carrinho diretamente para a PDP;
- layout responsivo para desktop, tablet e mobile;
- fallback para rotas com `public/404.html` em GitHub Pages;
- publicação em GitHub Pages com `gh-pages`;
- assets locais otimizados em `.webp`.

### Qualidade técnica
- TypeScript tipado em 100% do código;
- estrutura organizada em componentes e interfaces separadas;
- estados e contexto centralizados em `CartContext`;
- arquitetura limpa com `Interfaces/` e `types/` dedicados;
- lint com `oxlint`;
- build validado com Vite;
- suporte a subdiretório do repositório em produção.

## Tecnologias utilizadas

- React 19
- TypeScript
- Vite
- React Router DOM
- CSS nativo
- GitHub Pages
- gh-pages
- Google Fonts (`Playfair Display` e `DM Mono`)

## Estrutura atual do projeto

```text
Destilare/
├── .git/
├── dist/
├── node_modules/
├── public/
│   ├── 404.html
│   ├── data/
│   │   └── products.json
│   ├── Imagens/
│   ├── logo/
│   └── videos/
├── src/
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   ├── main.tsx
│   ├── components/
│   │   ├── CartDrawer.tsx
│   │   ├── CartItem.tsx
│   │   ├── Catalog.tsx
│   │   ├── Header.tsx
│   │   ├── HowItWasMade.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ProductDetail.tsx
│   │   ├── ProductDetailPage.tsx
│   │   └── Storefront.tsx
│   ├── context/
│   │   └── CartContext.tsx
│   ├── Interfaces/
│   │   ├── cart.ts
│   │   ├── cartDrawer.ts
│   │   ├── catalog.ts
│   │   ├── catalogState.ts
│   │   ├── product.ts
│   │   ├── productCard.ts
│   │   └── productDetail.ts
│   └── types/
│       └── catalog.ts
├── planejamento/
│   ├── Analise-Projeto.md
│   ├── ContextoDestilare.md
│   ├── Geracao-Imagens.md
│   ├── Plano-Implementacao-Funcionalidades.md
│   └── PlanoVideo.md
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── index.html
├── README.md
├── .gitignore
├── .oxlintrc.json
└── LICENSE (se existir no repositório)
```

## Como a aplicação funciona

### 1. Vitrine, rotas e navegação
A aplicação é montada em `App.tsx` com `BrowserRouter` e `Routes`:

- `/` → loja principal com hero e catálogo;
- `/produto/:id` → detalhe do produto;
- `/como-fiz` → página explicativa do projeto;

A navegação usa `NavLink`, `Link` e `Navigate` para manter a experiência de SPA e garantir compatibilidade com páginas em subdiretório no GitHub Pages.

### 2. Catálogo em JSON
O catálogo não fica embutido no JSX. Ele é carregado em `public/data/products.json` utilizando `fetch` com suporte à `BASE_URL`:

```ts
fetch(`${import.meta.env.BASE_URL}data/products.json`)
```

Isso permite o projeto funcionar corretamente em ambientes como `/Destilare/` sem quebrar os caminhos.

### 3. Busca e estados do catálogo
A busca é feita em `Catalog.tsx` e considera nome, categoria e descrição. A lógica também normaliza texto para português com `toLocaleLowerCase("pt-BR")` e `normalize("NFD")` para remover acentos e facilitar comparações.

Os estados cobrem:
- carregamento
- erro
- catálogo vazio
- sem resultados
- sucesso com listagem filtrada

### 4. Página de detalhe do produto
`ProductDetailPage.tsx` e `ProductDetail.tsx` recebem o `id` pela rota e exibem a apresentação completa do whisky, incluindo:
- imagem principal
- nome e categoria
- preço
- origem
- idade
- notas de degustação
- descrição detalhada
- botão de adicionar ao carrinho

### 5. Carrinho com persistência
A lógica de carrinho foi centralizada em `src/context/CartContext.tsx`.

Funcionalidades:
- adicionar item
- aumentar ou diminuir quantidade
- remover produto
- limpar carrinho
- subtotal do pedido
- contagem total de itens
- persistência em `localStorage` para manter o estado mesmo após recarregar a página

O componente `CartDrawer` exibe o painel lateral com o resumo do carrinho e `CartItem` renderiza cada produto individualmente.

### 6. Arquitetura de interfaces
As interfaces foram separadas por domínio e importadas diretamente pelos componentes que usam cada tipo. Isso deixa a base mais limpa e evita um arquivo centralizador de tipos, como o antigo `catalog.ts` sendo responsável por exportar tudo.

Estrutura atual:
- `Interfaces/cart.ts` → atributos do carrinho e do contexto
- `Interfaces/cartDrawer.ts` → props do drawer
- `Interfaces/product.ts` → produto
- `Interfaces/productCard.ts` → props do card
- `Interfaces/productDetail.ts` → props do detalhe
- `Interfaces/catalog.ts` e `Interfaces/catalogState.ts` → estrutura do catálogo e estados

### 7. Design e marca
A identidade visual foi pensada como premium e editorial, com base em:
- bege e marrom como paleta principal
- cobre para destaques e detalhes
- tipografia editorial para títulos
- detalhes mínimos e elegantes para reforçar a sensação de produto exclusivo

## Como executar localmente

Requisitos:
- Node.js
- npm

```bash
npm install
npm run dev
```

Para build de produção:

```bash
npm run build
npm run preview
```

Para lint:

```bash
npm run lint
```

## Publicação no GitHub Pages

A aplicação está preparada para publicação em GitHub Pages com suporte a subdiretório e fallback de rota.

### Configuração importante
1. `vite.config.ts` usa a base correta para produção;
2. `BrowserRouter` recebe `basename={import.meta.env.BASE_URL}`;
3. `public/404.html` redireciona rotas diretas para a SPA;
4. `gh-pages` publica o conteúdo da pasta `dist`.

Deploy:

```bash
npm run build
npm run deploy
```

## Observações de deploy

- Fallback `404.html` é necessário para rotas diretas como `/produto/:id` e `/como-fiz` no GitHub Pages.
- O catálogo fica em `public/data/products.json`.
- As imagens ficam em `public/Imagens/` e são otimizadas em `.webp`.
- O projeto funciona como SPA estática, sem backend.
- A atualização de produtos é simples: basta trocar o conteúdo do JSON.

## Decisões de arquitetura

A solução foi pensada para equilíbrio entre manutenção e apresentação:

- catálogo em JSON para facilitar edição sem mexer em React;
- arquitetura modular com componentes específicos para cada parte da loja;
- estados e dados globais em contexto para manter o fluxo consistente;
- CSS nativo para reduzir dependências e manter peso leve;
- publicação simples em GitHub Pages sem backend.

## Status final

✅ Projeto concluído e funcional

Itens entregues:
- vitrine premium
- catálogo com busca
- página de detalhe
- carrinho persistente
- navegação SPA
- responsividade mobile
- publicação em GitHub Pages

## Roadmap opcional

A documentação de planejamento em `planejamento/` continua disponível para evoluções futuras, como:
- filtros avançados por categoria e preço
- vídeo auto-hospedado na página “como fiz”
- refinamento visual de imagens e elementos de produto

## Checklist de revisão final

- projeto está em funcionamento localmente;
- build de produção está estável;
- documentação refletindo o estado real do app;
- página “Como fiz” atualizada com a trajetória de implementação.
