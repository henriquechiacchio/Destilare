# Destilare — visão consolidada do projeto

## Objetivo

Construir uma loja de whiskys com identidade própria, catálogo em JSON, navegação em rotas SPA e publicação estática em GitHub Pages.

## Estado atual do projeto

A aplicação já está em funcionamento e publicada. A proposta foi entregue como uma vitrine premium editorial com:

- hero de apresentação;
- catálogo dinâmico carregado em runtime;
- busca por nome, categoria e descrição;
- cards de produto com detalhes e preço;
- página explicativa de processo em `/como-fiz`;
- roteamento compatível com GitHub Pages;
- assets locais em `public/`;
- fallback de rota para URLs diretas em hospedagem estática.

## Fase 2: catálogo e experiência da loja

### Resultado final

A etapa de catálogo foi concluída com sucesso. A landing page da Destilare funciona como uma loja de catálogo com:

- hero editorial;
- coleção dinâmica em `products.json`;
- busca por nome, categoria e descrição;
- contador de resultados;
- estados de carregamento, erro e catálogo vazio;
- visual responsivo para mobile;
- configuração pronta para GitHub Pages.

### O que foi implementado

#### Catálogo externo
A fonte dos dados está em `public/products.json`, e o carregamento acontece em `src/components/Catalog.tsx` com `fetch`, usando o caminho relativo adequado ao ambiente de produção.

#### Busca funcional
A busca é feita sobre:

- nome do produto;
- categoria;
- descrição.

A normalização de acentos e caixa foi aplicada para melhorar a experiência em português.

#### Estados da interface
Os estados atendidos são:

- carregando;
- sucesso;
- erro de rede/HTTP;
- catálogo vazio;
- busca sem coincidências.

#### Design
A identidade da loja foi refinada com foco premium, com paleta bege, couro, cobre e grafismos editoriais para reforçar a sensação de curadoria.

## Arquivos centrais

- `src/App.tsx` — layout e rotas
- `src/components/Storefront.tsx` — hero e vitrine inicial
- `src/components/Catalog.tsx` — busca e listagem
- `src/components/ProductCard.tsx` — card do produto
- `src/components/Header.tsx` — navegação
- `src/components/HowItWasMade.tsx` — página explicativa
- `src/Interfaces/product.ts` — contrato do produto
- `src/Interfaces/catalog.ts` — props do catálogo
- `src/types/catalog.ts` — status do catálogo
- `public/products.json` — fonte de dados
- `public/Imagens/` — imagens locais
- `public/404.html` — fallback para GitHub Pages
- `vite.config.ts` — base da produção
- `src/App.css` — estilos principais

## Decisões principais

### Stack
- React + TypeScript
- Vite
- React Router DOM
- CSS puro
- GitHub Pages
- gh-pages

### Estratégia de dados
Os produtos ficam em `public/products.json` e são carregados em runtime, permitindo manutenção simples e sem duplicação de dados no código.

### Estratégia de publicação
A solução usa GitHub Pages com fallback de rotas e `base` ajustado para o nome do repositório. Isso permite que a SPA funcione corretamente mesmo em caminhos de subpasta.

### Posicionamento visual
A marca Destilare busca um tom premium e editorial, com linguagem mais sofisticada do que uma loja genérica.

## Publicação e compatibilidade

A publicação em GitHub Pages exige alguns cuidados específicos:

- o `base` do Vite deve refletir o nome real do repositório;
- o `BrowserRouter` precisa de fallback para rotas diretas;
- o arquivo `public/404.html` é usado para redirecionar acessos diretos de rota;
- os assets e o `products.json` devem permanecer em `public/` para funcionar em produção.

Essas decisões são parte da implantação atual e não bloqueiam a execução local da loja.

## Verificação

A implementação foi validada com a build:

```bash
npm run build
```

O deploy também foi executado com sucesso pelo script:

```bash
npm run deploy
```

## Próximos passos opcionais

Como refinamento contínuo, os pontos que podem ser evoluídos são:

- incluir vídeo definitivo na página `/como-fiz`;
- revisar a qualidade e a consistência das imagens da coleção;
- ampliar a loja com filtros por faixa de preço ou categoria;
- criar uma página de detalhe do produto.

## Estado do documento

Este arquivo consolida as informações do projeto em um único ponto e reflete o estado real do desenvolvimento e do deploy da Destilare.
