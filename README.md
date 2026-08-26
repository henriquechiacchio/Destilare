# Destilare

Destilare é uma mini-loja de whiskys criada para o desafio **Minha Loja no Ar**, da trilha Commerce do Bootcamp AI/R. O projeto está sendo desenvolvido como uma vitrine estática, com identidade visual própria e foco em explicar as decisões técnicas por trás da aplicação.

## Estado atual

A Fase 1, de fundação e identidade, está concluída. A aplicação já possui:

- front-end desenvolvido com React e TypeScript;
- navegação declarativa com React Router DOM;
- rotas para a loja (`/`) e para a página explicativa (`/como-fiz`);
- identidade visual editorial, inspirada em carvalho, cobre e papel;
- catálogo separado do front-end em `public/products.json`, com seis produtos;
- layout responsivo inicial para desktop e celular;
- configuração para usar o `BASE_URL` como `basename` do roteador, preparando a publicação em subdiretório no GitHub Pages.

O carregamento do catálogo via `fetch`, a renderização dos cards, a busca e os conteúdos completos da página `/como-fiz` serão implementados nas próximas fases.

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
│   │   └── BomDia.tsx      # Componente inicial do scaffold, sem uso atual
│   ├── types/
│   │   ├── product.ts      # Tipo Product do catálogo
│   │   └── teste.ts        # Tipo inicial do scaffold, sem uso atual
│   ├── App.css             # Estilos da aplicação
│   ├── App.tsx             # Layout, navegação e rotas principais
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

`src/App.tsx` concentra a estrutura atual da aplicação. O `BrowserRouter` usa `import.meta.env.BASE_URL` como `basename`, enquanto `Routes` e `Route` definem as páginas disponíveis. `Link` e `NavLink` fazem a navegação sem recarregar a aplicação.

`src/types/product.ts` define o contrato esperado para os produtos. A fonte dos dados fica fora do código da interface, em `public/products.json`. Essa separação prepara o projeto para o conceito de headless commerce: o catálogo pode evoluir independentemente da camada responsável pela vitrine.

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

1. Carregar `products.json` por `fetch` usando `import.meta.env.BASE_URL`.
2. Renderizar o catálogo de forma dinâmica em cards acessíveis.
3. Implementar busca por nome, categoria e descrição.
4. Completar a página `/como-fiz` com vídeo, explicação de headless commerce, cache, CDN, AWS e possibilidades de IA.
5. Configurar a publicação do build no GitHub Pages.
6. Testar a aplicação em celular, aba anônima e Lighthouse.

## Publicação

A hospedagem planejada é o GitHub Pages, por ser gratuita e transformar o repositório em parte do portfólio. O nome do repositório ainda precisa ser confirmado para definir o `base` definitivo do Vite e validar os acessos diretos às rotas publicadas.

## Desafio

O projeto atende ao desafio **Minha Loja no Ar**, que solicita uma loja pública, um catálogo externo carregado por `fetch`, busca ou filtro por categoria e uma página `/como-fiz` com vídeo explicando a construção e as decisões técnicas.
