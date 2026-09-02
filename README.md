# Destilare

Destilare é uma vitrine premium de whiskys criada com React 19 + TypeScript, com foco em narrativa de marca, catálogo editorial e experiência de compra fluida. O projeto combina identidade visual sofisticada, navegação em SPA, busca inteligente, carrinho persistente e publicação estática em GitHub Pages.

## Estado atual do projeto

✅ Status: funcional, concluído e publicado em GitHub Pages

A aplicação já está em um estado de produção, com navegação entre home, detalhe do produto e página explicativa, catálogo dinâmico, busca por texto, carrinho persistente em localStorage, responsividade e deploy automatizado para GitHub Pages.

## Funcionalidades principais

- front-end em React 19 com TypeScript;
- navegação SPA com React Router DOM em três rotas: `/`, `/produto/:id` e `/como-fiz`;
- identidade visual premium editorial com paleta em bege, cobre e marrom;
- catálogo dinâmico em `public/data/products.json`;
- busca por nome, categoria e descrição com normalização de texto em português;
- página de detalhe do produto com imagem, origem, idade, notas e descrição;
- carrinho lateral com persistência em `localStorage`;
- controle de quantidade, remoção, subtotal e limpeza do carrinho;
- navegação direta do item do carrinho para a PDP;
- layout responsivo para desktop, tablet e mobile;
- fallback de rotas com `public/404.html` para GitHub Pages;
- publicação em GitHub Pages com `gh-pages`;
- assets locais otimizados em `.webp`.

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
│   │   ├── CartContext.tsx
│   │   ├── cart-context.ts
│   │   └── useCart.ts
│   ├── Interfaces/
│   │   ├── cart.ts
│   │   ├── cartDrawer.ts
│   │   ├── cartItem.ts
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
│   └── Roteiro-Video-Explicativo.md
├── .gitignore
├── .oxlintrc.json
├── index.html
├── package.json
├── README.md
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
└── dist/
```

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

## Como a aplicação funciona

### 1. Vitrine, rotas e navegação
A aplicação é montada em `App.tsx` com `BrowserRouter` e `Routes`:

- `/` → vitrine principal;
- `/produto/:id` → página de detalhe do produto;
- `/como-fiz` → página explicativa do projeto.

A navegação usa `Link`, `NavLink` e `Navigate` para manter a experiência em SPA e compatibilidade com o GitHub Pages em subdiretório.

### 2. Catálogo em JSON
O catálogo não fica embutido no JSX. Ele é carregado em `public/data/products.json` com suporte à `BASE_URL`:

```ts
fetch(`${import.meta.env.BASE_URL}data/products.json`)
```

Isso garante que a aplicação funcione corretamente em `/Destilare/` sem quebrar os caminhos.

### 3. Busca e estados do catálogo
A busca considera nome, categoria e descrição. A lógica também normaliza o texto em português removendo acentos e padronizando minúsculas para melhorar a comparação.

Os estados cobrem:
- carregamento;
- erro;
- catálogo vazio;
- sem resultados;
- sucesso com listagem filtrada.

### 4. Página de detalhe do produto
`ProductDetailPage.tsx` e `ProductDetail.tsx` recebem o `id` pela rota e exibem a apresentação completa do whisky, incluindo imagem, categoria, preço, origem, idade, notas e descrição.

### 5. Carrinho persistente
A lógica de carrinho foi centralizada em `src/context/CartContext.tsx`.

Funcionalidades:
- adicionar item;
- aumentar ou diminuir quantidade;
- remover produto;
- limpar carrinho;
- subtotal do pedido;
- contagem total de itens;
- persistência em `localStorage`.

### 6. Arquitetura de interfaces
As interfaces foram separadas por domínio e utilizadas pelos componentes e contextos que consomem cada tipo. A organização atual inclui:

- `Interfaces/cart.ts` → item do carrinho e contrato do contexto;
- `Interfaces/cartDrawer.ts` → props do painel lateral do carrinho;
- `Interfaces/cartItem.ts` → props de cada item renderizado no drawer;
- `Interfaces/catalogState.ts` → status da listagem e estado de carregamento;
- `Interfaces/product.ts` → estrutura completa de um whisky;
- `Interfaces/productCard.ts` → props do card de produto;
- `Interfaces/productDetail.ts` → props da tela de detalhes do produto;
- `types/catalog.ts` → tipos complementares do catálogo e estados do fluxo de dados.

Isso mantém a base mais limpa, evita centralização desnecessária e facilita a manutenção do código.

### 7. Design e marca
A identidade visual foi pensada como premium e editorial, com base em:
- bege e marrom como paleta principal;
- cobre para destaques e detalhes;
- tipografia editorial para títulos;
- composição clean e elegante.

## Publicação no GitHub Pages

A aplicação está pronta para ser publicada em GitHub Pages com suporte a subdiretório e fallback de rota.

### Configuração importante
1. `vite.config.ts` define a base correta para produção;
2. `BrowserRouter` usa `basename={import.meta.env.BASE_URL}`;
3. `public/404.html` redireciona rotas diretas da SPA;
4. `gh-pages` publica o conteúdo da pasta `dist`.

Deploy:

```bash
npm run build
npm run deploy
```

## Observações de deploy

- o fallback `404.html` é necessário para rotas diretas como `/produto/:id` e `/como-fiz`;
- o catálogo fica em `public/data/products.json`;
- as imagens ficam em `public/Imagens/` e são otimizadas em `.webp`;
- o projeto funciona como SPA estática, sem backend;
- a atualização de produtos é simples: basta alterar o JSON.

## Decisões de arquitetura

A solução foi pensada para equilibrar manutenção e apresentação:

- catálogo em JSON para facilitar edição sem mexer em React;
- arquitetura modular com componentes dedicados para cada parte da loja;
- estado global em contexto para manter o fluxo consistente;
- CSS nativo para reduzir dependências e manter o peso leve;
- publicação simples em GitHub Pages sem backend.

## Status final

✅ Projeto concluído e funcional

Itens entregues:
- vitrine premium;
- catálogo com busca;
- página de detalhe;
- carrinho persistente;
- navegação SPA;
- responsividade mobile;
- publicação em GitHub Pages.

## Documentação de apoio

A pasta `planejamento/` contém a documentação de referência do projeto, incluindo:
- análise de requisitos e viabilidade;
- contexto da marca Destilare;
- referência visual e geração de imagens;
- roteiro do vídeo explicativo;
- plano de implementação funcional.
- build de produção está estável;
- documentação refletindo o estado real do app;
- página “Como fiz” atualizada com a trajetória de implementação.
