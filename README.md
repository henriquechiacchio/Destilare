# Destilare

Destilare é uma mini-loja de whiskys criada para o desafio **Minha Loja no Ar**, da trilha Commerce do Bootcamp AI/R. O projeto está sendo desenvolvido como uma vitrine estática, com identidade visual própria e foco em explicar as decisões técnicas por trás da aplicação.

## Estado atual

A Fase 2, de catálogo e interação, também está concluída. A aplicação já possui:

- front-end desenvolvido com React e TypeScript;
- navegação declarativa com React Router DOM;
- rotas para a loja (`/`) e para a página explicativa (`/como-fiz`);
- identidade visual editorial, inspirada em carvalho, cobre e papel;
- catálogo separado do front-end em `public/products.json`, com seis produtos carregados por `fetch`;
- busca por nome, categoria e descrição, com normalização de caixa e acentos;
- contador de resultados e estados de carregamento, erro, catálogo vazio e busca sem resultados;
- cards de produtos separados em componente próprio, com preço em reais e metadados de degustação;
- layout responsivo inicial para desktop e celular;
- configuração para usar o `BASE_URL` como `basename` do roteador, preparando a publicação em subdiretório no GitHub Pages.

Ainda faltam o conteúdo completo da página `/como-fiz`, a configuração final de publicação e a validação visual em ambiente publicado.

## Tecnologias

- **React 19**: construção da interface em componentes.
- **TypeScript**: tipagem do código e dos dados de domínio.
- **Vite**: servidor de desenvolvimento, HMR e build de produção.
- **React Router DOM**: gerenciamento das rotas da loja e da página `/como-fiz`.
- **CSS**: identidade visual, layout e responsividade sem biblioteca de estilos.
- **Oxlint**: análise estática e padronização do código.
- **Google Fonts**: `Playfair Display` para títulos e `DM Mono` para textos de apoio.

## Estrutura do projeto

```text
Destilare/
├── public/
│   └── products.json       # Catálogo externo de produtos
├── planejamento/
│   └── plan-lojaDestilareNoAr.prompt.md
├── src/
│   ├── components/
│   │   ├── Header.tsx       # Cabeçalho e navegação principal
│   │   ├── HowItWasMade.tsx # Página explicativa
│   │   ├── Catalog.tsx      # Carregamento, busca e estados do catálogo
│   │   ├── ProductCard.tsx  # Card individual de produto
│   │   └── Storefront.tsx   # Hero e composição da vitrine
│   ├── Interfaces/
│   │   ├── catalog.ts       # Props dos componentes do catálogo
│   │   └── product.ts       # Interface Product
│   ├── types/
│   │   └── catalog.ts       # Tipo CatalogStatus
│   ├── App.css             # Estilos da aplicação
│   ├── App.tsx             # Layout compartilhado e rotas principais
│   ├── index.css           # Tokens visuais e estilos globais
│   └── main.tsx            # Ponto de entrada do React
├── index.html              # Documento HTML inicial
├── package.json            # Dependências e scripts
├── tsconfig.json           # Configuração base do TypeScript
├── tsconfig.app.json       # Configuração TypeScript da aplicação
├── tsconfig.node.json      # Configuração TypeScript do Vite
├── vite.config.ts          # Configuração do Vite
└── .gitignore              # Arquivos que não devem ser versionados
```

## Organização da aplicação

`src/main.tsx` inicializa o React e renderiza o componente principal.

`src/App.tsx` concentra o layout compartilhado e as rotas principais. O `BrowserRouter` usa `import.meta.env.BASE_URL` como `basename`, enquanto `Routes` e `Route` definem as páginas disponíveis.

`src/components/Header.tsx` contém o cabeçalho da aplicação. Seus componentes `Link` e `NavLink` permanecem dentro do `BrowserRouter` renderizado pelo `App`, preservando a navegação sem recarregar a aplicação. `src/components/Storefront.tsx` contém o hero e usa `Catalog` para compor a vitrine. `src/components/HowItWasMade.tsx` contém a página reservada para a apresentação técnica.

`src/Interfaces/product.ts` define o contrato esperado para os produtos, enquanto `src/Interfaces/catalog.ts` reúne as props dos componentes do catálogo. O estado de carregamento fica em `src/types/catalog.ts`. A fonte dos dados fica fora do código da interface, em `public/products.json`. Essa separação prepara o projeto para o conceito de headless commerce: o catálogo pode evoluir independentemente da camada responsável pela vitrine.

`src/components/Catalog.tsx` carrega `products.json` com `${import.meta.env.BASE_URL}products.json`, controla a busca e apresenta os estados da fonte de dados. `src/components/ProductCard.tsx` apresenta cada produto sem duplicar dados no JSX. Os preços são formatados com `Intl.NumberFormat` em `pt-BR`.

`src/index.css` contém os tokens de cor, tipografia, reset e regras globais. `src/App.css` contém os estilos específicos do shell, cabeçalho, hero, rodapé e página `/como-fiz`.

## Como executar localmente

Pré-requisito: Node.js instalado.

```bash
npm install
npm run dev
```

O Vite exibirá a URL local no terminal. Para validar a versão de produção:

```bash
npm run build
npm run preview
```

Para executar a verificação de lint:

```bash
npm run lint
```

## Rotas atuais

| Rota | Finalidade |
| --- | --- |
| `/` | Vitrine inicial da Destilare |
| `/como-fiz` | Página reservada para o vídeo e a explicação técnica |

## Próximas etapas

1. Completar a página `/como-fiz` com vídeo e explicação das decisões técnicas.
2. Configurar a publicação do build no GitHub Pages após confirmar o nome do repositório.
3. Revisar estabilidade e licença das imagens externas.
4. Testar a aplicação em celular, aba anônima, rede e Lighthouse.

## Publicação

A hospedagem planejada é o GitHub Pages, por ser gratuita e transformar o repositório em parte do portfólio. A estrutura do projeto já é compatível com a plataforma, mas há um passo adicional importante para funcionar corretamente com as rotas do React Router:

1. O repositório precisa ter o mesmo nome usado no `base` do Vite. Como este projeto está em `Destilare`, o valor correto em produção é `/Destilare/`.
2. O `BrowserRouter` precisa de uma fallback para rotas diretas, porque o GitHub Pages não reescreve URLs de forma dinâmica como um servidor Node/Express. Em prática, o build deve ser publicado com um `404.html` de redirecionamento ou com uma configuração equivalente de fallback.
3. A publicação pode ser feita pela branch `gh-pages` ou pelo fluxo de GitHub Pages do próprio repositório, usando o conteúdo gerado em `dist/` após o `npm run build`.

Exemplo de fluxo recomendado:

```bash
npm run build
```

Depois, publique a pasta `dist` no GitHub Pages do repositório. Se o projeto for acessado por rota direta como `/como-fiz`, a fallback de SPA deve estar ativa para evitar erro 404.

## Desafio

O projeto atende ao desafio **Minha Loja no Ar**, que solicita uma loja pública, um catálogo externo carregado por `fetch`, busca ou filtro por categoria e uma página `/como-fiz` com vídeo explicando a construção e as decisões técnicas.
