# Referência visual da coleção Destilare

Este documento registra a direção estética da marca, o estado atual do projeto e o conjunto de imagens que hoje compõem a loja. Ele serve como referência visual e técnica da identidade da Destilare em produção.

## Estado atual do projeto

A Destilare está em operação como uma vitrine premium de whiskys, com a seguinte stack atual:

- React 19
- TypeScript
- Vite
- React Router DOM
- CSS nativo
- GitHub Pages
- gh-pages
- Google Fonts com Playfair Display e DM Mono

A aplicação usa arquitetura SPA, catálogo em JSON, rotas para home, detalhe de produto e página explicativa, além de carrinho persistente em localStorage e deploy estático em GitHub Pages.

## Direção visual

A marca Destilare foi pensada como uma loja premium de whisky com linguagem editorial, discreta e sofisticada. O visual combina:

- fundos escuros com tom de madeira e carvão;
- detalhes em cobre e marrom claro;
- iluminação de estúdio com contraste elegante;
- composição focada na garrafa, com volume e textura premium;
- estética minimalista e de alto nível comercial;
- tipografia sofisticada com Playfair Display para títulos e DM Mono para suporte editorial.

## Resultado atual

A coleção visual em uso contém as seguintes imagens locais em `public/Imagens`:

- BarricaDeCerejeira.webp
- BlendaPrimavera.webp
- BrumaDefumada.webp
- CobreDoSol.webp
- CoroaAmericana.webp
- EdgePorto.webp
- EssenciaDourada.webp
- HarmoniaClassica.webp
- LinhaDoTempo.webp
- ReservaDeCarvalho.webp
- ReservaDoMestre.webp
- TurfeiraProfunda.webp

Essas imagens alimentam o catálogo em `public/data/products.json` e são carregadas pela interface sem depender de serviços externos.

## Estrutura e dados do catálogo

O catálogo atual está definido em `public/data/products.json`, com produtos carregados dinamicamente na interface. Isso permite:

- manutenção mais simples do catálogo;
- alteração de itens sem mexer em JSX;
- escalabilidade da loja sem depender de backend;
- melhor organização do código e separação entre dados e apresentação.

## Objetivo da identidade

A proposta visual busca transmitir:

- prestígio e discrição;
- maturidade e tempo;
- qualidade de acabamento;
- diferenciação em catálogo digital premium;
- experiência editorial elegante, adequada ao posicionamento da marca.

## Regras de consistência

Para manter a coleção coesa:

- todas as garrafas devem seguir a mesma linguagem visual;
- a paleta e a iluminação devem continuar próximas;
- variações ficam restritas ao perfil de cada whisky;
- a composição deve permanecer limpa e comercial;
- qualquer alteração visual deve respeitar o tom premium da marca;
- a tipografia e a hierarquia de texto devem continuar reforçando a identidade editorial.

## Observação final

Este arquivo não representa uma etapa pendente de desenvolvimento. Ele funciona como documento de referência visual e identidade da coleção.
