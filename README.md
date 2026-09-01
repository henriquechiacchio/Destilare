# Destilare

Destilare é uma vitrine premium de whiskys criada como projeto de front-end estático em React + TypeScript. O objetivo é apresentar uma loja editorial, com narrativa de marca, catálogo em JSON e publicação em GitHub Pages sem perder a navegação por rotas.

## Estado atual do projeto

✅ **Status: COMPLETO E PUBLICADO**

O projeto atende **100% dos requisitos obrigatórios** do desafio "Minha Loja no Ar" do Bootcamp CompassUOL, com implementação de bônus significativos:

### Funcionalidades Principais
- front-end em React 19 com TypeScript (tipagem completa, sem `any`);
- navegação com React Router DOM em **três rotas**: `/` (vitrine), `/como-fiz` (explicativa) e `/produto/:id` (detalhe do produto);
- identidade visual premium editorial com paleta em bege, cobre, marrom e madeira;
- **catálogo dinâmico com 8 whiskys** carregado de `public/data/products.json` via `fetch`;
- **busca avançada** por nome, categoria e descrição com normalização de acentos e caixa (português);
- **página de detalhe do produto** com todas as informações: preço, origem, idade, notas de degustação e descrição detalhada;
- controle completo de estados: carregamento, erro, catálogo vazio e sem resultados;
- visual responsivo para desktop, tablet e mobile (até 320px);
- fallback inteligente para rotas em GitHub Pages com `public/404.html`;
- publicação ativa em GitHub Pages com `gh-pages`;
- assets locais otimizados (formato `.webp`) sem dependência de URLs externas.

### Qualidade Técnica
- Tipagem TypeScript em 100% do código (interfaces, types, componentes);
- Componentes reutilizáveis com separação clara de responsabilidades;
- Lint passando com `oxlint`;
- Build otimizado pelo Vite com suporte a subdiretório de repositório;
- Padrão de SPA com navegação fluida (sem recarregamentos).

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
├── 📁 .git/                      # Histórico de commits
├── 📁 dist/                      # Build de produção (Vite)
├── 📁 node_modules/              # Dependências
├── 📁 public/
│   ├── 📄 404.html               # Fallback SPA para GitHub Pages
│   ├── 📁 data/
│   │   └── 📄 products.json      # Catálogo com 8 whiskys
│   ├── 📁 Imagens/               # Imagens otimizadas (.webp)
│   └── 📁 logo/                  # Logos da marca
├── 📁 src/
│   ├── 📄 App.tsx                # Layout, rotas (/, /como-fiz, /produto/:id)
│   ├── 📄 App.css                # Estilos globais (responsivo)
│   ├── 📄 index.css              # Reset CSS e tokens visuais
│   ├── 📄 main.tsx               # Entrada da aplicação
│   ├── 📁 components/
│   │   ├── 📄 Storefront.tsx     # Hero e vitrine inicial
│   │   ├── 📄 Header.tsx         # Navegação principal
│   │   ├── 📄 Catalog.tsx        # Busca, listagem e estados
│   │   ├── 📄 ProductCard.tsx    # Card individual reutilizável
│   │   ├── 📄 ProductDetailPage.tsx  # Wrapper da rota /produto/:id
│   │   ├── 📄 ProductDetail.tsx  # Conteúdo de detalhe
│   │   └── 📄 HowItWasMade.tsx   # Página explicativa do projeto
│   ├── 📁 Interfaces/
│   │   ├── 📄 catalog.ts         # Props do catálogo
│   │   └── 📄 product.ts         # Interface Product
│   └── 📁 types/
│       └── 📄 catalog.ts         # Type CatalogStatus
├── 📁 planejamento/
│   ├── 📄 Analise-Projeto.md     # Análise vs. requisitos do desafio
│   ├── 📄 ContextoDestilare.md   # Visão consolidada
│   ├── 📄 Plano-Implementacao-Funcionalidades.md  # Roadmap com 3 fases
│   ├── 📄 Geracao-Imagens.md     # Referência visual
│   └── 📄 PlanoVideo.md          # Guia para vídeo
├── 📄 package.json               # Dependências e scripts
├── 📄 vite.config.ts             # Configuração de build
├── 📄 tsconfig.json              # Config base TypeScript
├── 📄 tsconfig.app.json          # Config app
├── 📄 tsconfig.node.json         # Config Vite
├── 📄 index.html                 # HTML base
├── 📄 README.md                  # Documentação (este arquivo)
└── 📄 .gitignore, .oxlintrc.json # Configurações
```

## Como a aplicação funciona

### 1. Vitrine, navegação e rotas
`src/App.tsx` monta a estrutura da aplicação com `BrowserRouter` e define três rotas:

- `/` → vitrine principal com hero + catálogo com busca
- `/como-fiz` → página explicativa do projeto e decisões técnicas
- `/produto/:id` → detalhe completo de cada whisky (bônus implementado)

A navegação é feita com `Link` e `NavLink` do React Router DOM, mantendo a experiência fluida de SPA (sem recarregamentos).

### 2. Catálogo externo e estrutura de dados
O catálogo não fica embutido em JSX. Ele é carregado do arquivo `public/data/products.json` usando:

```ts
fetch(`${import.meta.env.BASE_URL}data/products.json`)
```

Cada produto possui a estrutura:
```ts
interface Product {
  id: string;                    // ID único para rota /produto/:id
  name: string;                  // Nome do whisky
  category: string;              // Tipo (Single Malt, Bourbon, etc.)
  description: string;           // Breve descrição
  detailedDescription?: string;  // Descrição estendida para detalhe
  price: number;                 // Preço em BRL
  image: string;                 // Caminho local (ex: Imagens/ReservaDeCarvalho.webp)
  ageStatement: string;          // Idade (ex: "12 anos")
  origin: string;                // Origem (ex: "Highlands, Escócia")
  tastingNotes: string[];        // Notas de degustação
}
```

Usar `import.meta.env.BASE_URL` é essencial porque a aplicação pode ser publicada dentro de um subdiretório no GitHub Pages (`/Destilare/`) sem quebrar os caminhos relativos.

### 3. Busca, filtro e estados
`src/components/Catalog.tsx` implementa um sistema de busca robusto:

**Funcionalidades:**
- Busca em tempo real nos campos: nome, categoria, descrição e descrição detalhada
- Normalização de acentos e caixa usando `toLocaleLowerCase("pt-BR")` + `normalize("NFD")`
- Filtragem com `useMemo` para performance
- Botão "×" para limpar busca rapidamente
- Contador dinâmico de resultados (ex: "8 rótulos encontrados")

**Estados implementados:**
- `loading` → "Abrindo a carta..."
- `success` → Exibe produtos filtrados
- `error` → "Não foi possível carregar a coleção agora." + botão "Tentar novamente"
- Sem resultados → "Nenhum rótulo corresponde à busca."
- Catálogo vazio → "A coleção está em atualização."

Todo estado é acessível via `useNavigate()` para navegação direta ao detalhe do produto.

### 4. Página de detalhe do produto
`src/components/ProductDetailPage.tsx` e `ProductDetail.tsx` implementam a rota `/produto/:id`:

- Extrai o ID da URL com `useParams()`
- Busca o produto no catálogo carregado
- Exibe layout de dois blocos: imagem grande + conteúdo
- Mostra todas as informações: nome, preço, origem, idade, descrição detalhada, notas de degustação
- Botão "Voltar à coleção" para retornar
- Tratamento de erro se produto não existir
- Totalmente responsivo

Isso permite URLs diretas e compartilháveis (ex: `site.com/Destilare/produto/destilare-reserva-carvalho`).

### 5. Design e marca
A identidade visual foi pensada como **premium e editorial**, com paleta em bege, marrom, cobre e carvão. A tipografia usa:
- **Playfair Display** (Google Fonts) para títulos e hierarquia
- **DM Mono** (Google Fonts) para detalhes técnicos e preços

O design busca transmitir sofisticação, tempo e apreciação lenta — alinhado com a narrativa de um whisky de qualidade.

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

- **Fallback 404:** As rotas `/como-fiz` e `/produto/:id` dependem do fallback `public/404.html` para funcionar corretamente em GitHub Pages. O `404.html` redireciona para `/` com um query param indicando a rota desejada.
- **Caminho do catálogo:** O arquivo está em `public/data/products.json` (não em `public/products.json`). Use `${import.meta.env.BASE_URL}data/products.json` para compatibilidade.
- **Imagens locais:** Todas as imagens ficam em `public/Imagens/` com caminhos relativos em JSON (ex: `Imagens/ReservaDeCarvalho.webp`). Formato `.webp` otimizado.
- **Site 100% estático:** Não há backend; toda a lógica é client-side. Isso significa deploy rápido e sem custos.
- **Edição fácil de produtos:** Basta atualizar `public/data/products.json` sem alterar nenhuma lógica React.
- **Base URL para subdiretório:** Configurada em `vite.config.ts` para suportar repositório em subpasta (`/Destilare/`).

## Decisões de arquitetura

A solução adotada prioriza simplicidade e manutenção:

- catálogo em JSON para facilitar manutenção;
- assets locais para garantir estabilidade de imagem;
- CSS nativo para reduzir dependências e deixar o projeto leve;
- rota de explicação para apresentar o processo de construção;
- GitHub Pages como forma de publicar um portfólio funcional e de baixa complexidade.

## Status final

✅ **PROJETO CONCLUÍDO E EM PRODUÇÃO**

- Catálogo dinâmico com 8 produtos funcionando
- Navegação fluida em 3 rotas (SPA)
- Busca com normalização português
- Página de detalhe implementada (bônus)
- Design responsivo até 320px
- Lint passando, tipos completos
- Publicado e ativo em GitHub Pages

**Requisitos obrigatórios:** 100% atendidos  
**Bônus implementados:** Página de detalhe, identidade visual premium, página explicativa

## Próximos passos opcionais (roadmap)

Um plano completo com 3 fases foi documentado em `planejamento/Plano-Implementacao-Funcionalidades.md`:

**FASE 2 (2-3h):** Filtros avançados
- Dropdown de categorias (extrair valores únicos de `products.json`)
- Range slider para filtro de preço (mín/máx)
- Combinar com busca de texto
- Reset button para limpar todos os filtros

**FASE 3 (1-2h):** Vídeo auto-hospedado em `/como-fiz`
- Comprimir com FFmpeg (720p, 2Mbps → ~100-150MB)
- Adicionar `<video>` HTML5 com poster
- Colocar em `public/videos/destilare-presentation.mp4`
- Hook `useVideoUrl()` para compatibilidade com `BASE_URL`

**FASE 4 (Manutenção):** Revisão e otimização de imagens
- Auditar qualidade em `public/Imagens/`
- Garantir consistência visual com paleta de marca

Todas as fases têm **código e instruções prontas** na documentação.
