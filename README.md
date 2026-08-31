# Destilare

Destilare é uma vitrine premium de whiskys criada como projeto de front-end estático em React + TypeScript. O objetivo é apresentar uma loja editorial, com narrativa de marca, catálogo em JSON e publicação em GitHub Pages sem perder a navegação por rotas.

## Estado atual do projeto

O projeto já está em estado funcional e publicado. Atualmente, a aplicação conta com:

- front-end em React 19 com TypeScript;
- navegação com React Router DOM em duas rotas principais: `/` e `/como-fiz`;
- identidade visual editorial inspirada em madeira, cobre e papel;
- catálogo dinâmico carregado a partir de `public/products.json` via `fetch`;
- busca por nome, categoria e descrição com normalização de acentos e caixa;
- controle de estados de carregamento, erro e catálogo vazio;
- visual responsivo para desktop e mobile;
- fallback para rotas no GitHub Pages com `public/404.html`;
- publicação no GitHub Pages com o build gerado por Vite;
- assets locais em `public/Imagens` e logo em `public/` para evitar dependência de URLs externas.

Este estado reflete a implementação final e não uma versão em desenvolvimento incompleta.

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
├── .gitignore
├── .oxlintrc.json
├── dist/                     # Build de produção gerado pelo Vite
├── node_modules/             # Dependências instaladas
├── package-lock.json
├── package.json              # Scripts e dependências do projeto
├── index.html                # HTML base do Vite
├── tsconfig.json             # Configuração base do TypeScript
├── tsconfig.app.json         # Configuração do app
├── tsconfig.node.json        # Configuração do Vite
├── vite.config.ts            # Base do app para GitHub Pages
├── README.md                 # Documentação principal
├── public/
│   ├── 404.html              # Fallback de rotas para GitHub Pages
│   ├── Imagens/              # Imagens locais dos produtos
│   ├── products.json         # Catálogo de whiskys em JSON
│   ├── logofundo.png         # Logo da marca
│   ├── logosfundo.png        # Variante de logo
├── src/
│   ├── App.css               # Estilos gerais do projeto
│   ├── App.tsx               # Layout e rotas principais
│   ├── index.css             # Reset e tokens visuais
│   ├── main.tsx              # Entrada da aplicação
│   ├── components/
│   │   ├── Catalog.tsx       # Busca, listagem e estados do catálogo
│   │   ├── Header.tsx        # Cabeçalho e navegação
│   │   ├── HowItWasMade.tsx  # Página explicativa
│   │   ├── ProductCard.tsx   # Card individual de produto
│   │   └── Storefront.tsx    # Hero e vitrine inicial
│   ├── Interfaces/
│   │   ├── catalog.ts        # Props do catálogo
│   │   └── product.ts        # Contrato Product
│   └── types/
│       └── catalog.ts        # Tipo do status do catálogo
├── planejamento/
│   ├── ContextoDestilare.md  # Visão consolidada do projeto
│   ├── Geracao-Imagens.md    # Referência visual da coleção
│   ├── Imagens/              # Arquivos de imagem de apoio
└── dist/                     # Build final de produção
```

## Como a aplicação funciona

### 1. Vitrine e navegação
`src/App.tsx` monta a estrutura da aplicação com `BrowserRouter` e define duas rotas:

- `/` → vitrine principal
- `/como-fiz` → página de explicação do projeto

A navegação é feita com `Link` e `NavLink` do React Router DOM, mantendo a experiência de SPA.

### 2. Catálogo externo
O catálogo não fica embutido em JSX. Ele é carregado do arquivo `public/products.json` usando:

```ts
fetch(`${import.meta.env.BASE_URL}products.json`)
```

Esse padrão é importante porque a aplicação pode ser publicada dentro de um subdiretório no GitHub Pages sem quebrar os caminhos.

### 3. Busca e estados
`src/components/Catalog.tsx` controla:

- termo de busca;
- produtos filtrados;
- loading;
- erro;
- catálogo vazio;
- busca sem resultados;
- contador de itens encontrados.

A busca normaliza caixa e acentos para funcionar bem em português.

### 4. Design e marca
A identidade visual foi pensada como premium e editorial, com paleta em bege, marrom, cobre e carvão. A tipografia usa `Playfair Display` para títulos e `DM Mono` para detalhes de apoio.

## Como executar localmente

Requisitos:

- Node.js instalado
- npm ou pnpm

```bash
npm install
npm run dev
```

Para validar a build de produção:

```bash
npm run build
npm run preview
```

Para lint:

```bash
npm run lint
```

## Publicação no GitHub Pages

O projeto foi preparado para ser hospedado em GitHub Pages. A configuração atual leva em conta alguns pontos importantes:

1. O `vite.config.ts` usa base de produção com o nome do repositório:

```ts
const repoName = 'Destilare'
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? `/${repoName}/` : '/',
})
```

2. O `BrowserRouter` usa `basename={import.meta.env.BASE_URL}` para funcionar em subpasta.

3. Um fallback de rota foi inserido em `public/404.html` para evitar que URLs diretas de rota retornem erro quando servidas por GitHub Pages.

4. O deploy foi realizado com a estratégia do `gh-pages`:

```bash
npm run build
npm run deploy
```

Essa abordagem publica o conteúdo de `dist/` na branch do Pages e torna o site acessível publicamente.

## Observações importantes de deploy

- A rota `/como-fiz` só funciona corretamente quando o fallback do `404.html` está ativo.
- O `products.json` deve continuar em `public/` e usar caminhos relativos locais, como `Imagens/ReservaDeCarvalho.jpg`.
- O site é estático e não depende de backend; por isso a solução de fallback é necessária.
- O conteúdo e os produtos ficam facilmente editáveis em `public/products.json` sem necessidade de alterar a lógica de renderização.

## Decisões de arquitetura

A solução adotada prioriza simplicidade e manutenção:

- catálogo em JSON para facilitar manutenção;
- assets locais para garantir estabilidade de imagem;
- CSS nativo para reduzir dependências e deixar o projeto leve;
- rota de explicação para apresentar o processo de construção;
- GitHub Pages como forma de publicar um portfólio funcional e de baixa complexidade.

## Status final

Projeto concluído e em produção no GitHub Pages, com a experiência principal funcionando, catálogo carregando corretamente, navegação correta e design ajustado para mobile.

## Próximos passos opcionais

Se a equipe quiser evoluir o projeto, sugestões futuras incluem:

- incluir vídeo definitivo na página `/como-fiz`;
- adicionar filtros abertos por faixa de preço ou categoria;
- criar uma página de detalhe do produto;
- evoluir a marca para uma identidade ainda mais premium com seleções de tipografia e imagens de campanha.
