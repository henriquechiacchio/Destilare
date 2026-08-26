## Plan: Loja Destilare no Ar

Construir a mini-loja estática Destilare, uma vitrine de whiskys com identidade própria, catálogo externo em `products.json` carregado por `fetch`, busca por nome/categoria, e uma página `/como-fiz` preparada para receber o vídeo explicativo. O front-end será desenvolvido utilizando React com TypeScript. Publicar o build no GitHub Pages sem quebrar os caminhos relativos do catálogo ou da rota.

**Passos**

### Fase 1: Fundação e identidade
1. Substituir o fluxo demonstrativo `BomDia` em `src/App.tsx` por uma composição de loja com duas rotas React Router DOM: vitrine `/` e explicação `/como-fiz`. Manter a solução simples e compatível com hospedagem estática, usando `BrowserRouter` com o `BASE_URL` como `basename`.
2. Definir tipos de domínio para produto e estado de carregamento/erro; remover a dependência conceitual do tipo `Teste` e do componente de saudação.
3. Criar `public/products.json` com pelo menos 6 whiskys fictícios e autorais, cada um com identificador, nome, categoria, descrição, preço, imagem e atributos úteis para a vitrine. Não colocar dados de produtos no JSX/HTML.
4. Escolher uma identidade visual própria para Destilare: editorial, sofisticada e legível, com paleta de carvalho, carvão e cobre, tipografia expressiva carregada de forma apropriada e layout responsivo. Usar imagens reais/licenciadas ou URLs estáveis adequadas ao catálogo, evitando depender de ativos inexistentes.

### Fase 2: Catálogo e interação
5. Implementar o carregamento do catálogo no componente que controla a vitrine usando `fetch(`${import.meta.env.BASE_URL}products.json`)`, com estados explícitos de carregamento, erro e catálogo vazio.
6. Renderizar os produtos dinamicamente em cards acessíveis, mostrando imagem, nome, categoria, descrição curta e preço formatado em reais.
7. Adicionar busca funcionando sobre nome, categoria e descrição, com contador de resultados e estado vazio. A busca atende ao requisito mínimo; filtro adicional por categoria pode ser incluído se não aumentar complexidade desnecessária.
8. Criar navegação visível entre a loja e `/como-fiz`, além de uma seção de apresentação da marca e uma área de destaque que torne claro que o catálogo veio de dados externos.
9. Construir `/como-fiz` como página de entrega: espaço de vídeo incorporado do YouTube não listado/Loom, resumo da organização dos arquivos, explicação do `fetch` e do headless commerce, mapa conceitual navegador → CDN → origem para AWS/cache, espaço para leitura do Lighthouse e pontos de integração futura de IA. Usar placeholder apenas até o usuário fornecer a URL final do vídeo, deixando a substituição evidente.

### Fase 3: Deploy e documentação
10. Ajustar `vite.config.ts` para o nome real do repositório/base do GitHub Pages, preferencialmente por variável de ambiente para não hardcodar uma URL incorreta. Garantir que links internos e o `products.json` funcionem sob o subdiretório publicado.
11. Definir uma estratégia de GitHub Pages: build de produção, publicação da pasta `dist` via GitHub Actions ou configuração equivalente já compatível com o repositório. Não presumir o nome do repositório antes de verificar o remoto/configuração local.
12. Atualizar `index.html` para `lang="pt-BR"`, título e metadados da Destilare. Revisar favicon somente se existir um ativo válido.
13. Reescrever `src/App.css` e `src/index.css` removendo estilos genéricos do template e cobrindo desktop, celular, foco de teclado, imagens, estados de erro/carregamento, formulário de busca e `/como-fiz`, sem introduzir overflow horizontal.
14. Atualizar `README.md` com tema, estrutura, como executar localmente, como o `products.json` é carregado, decisão pelo GitHub Pages e checklist de publicação. Incluir um roteiro conciso para o vídeo baseado nas cinco perguntas do desafio.

### Fase 4: Validação e entrega
15. Validar `npm run lint` e `npm run build`; corrigir apenas problemas introduzidos no escopo.
16. Rodar a aplicação localmente e verificar manualmente: catálogo carregado por `fetch`, busca com resultados e sem resultados, erro de carregamento, navegação para `/como-fiz`, responsividade móvel e imagens sem layout quebrado.
17. Servir o build de produção em uma condição equivalente ao GitHub Pages e confirmar que `products.json` não usa caminho absoluto incorreto. Verificar também acesso direto à URL `/como-fiz` ou definir fallback/documentação conforme a estratégia escolhida.
18. Executar Lighthouse na URL publicada e registrar no roteiro da página `/como-fiz` os scores observados, a primeira melhoria priorizada e a justificativa.
19. Antes da entrega, testar em aba anônima e celular, inserir a URL real do vídeo, confirmar que o vídeo reproduz e reunir URL da loja e URL do repositório.

**Arquivos relevantes**
- `c:\PROJECTS\Projetos\Desafio-CompassUOL\Destilare\src\App.tsx` — composição da vitrine, carregamento do catálogo, busca e seleção da página.
- `c:\PROJECTS\Projetos\Desafio-CompassUOL\Destilare\src\App.css` — estilos da loja, catálogo, busca, estados e página `/como-fiz`.
- `c:\PROJECTS\Projetos\Desafio-CompassUOL\Destilare\src\index.css` — reset, tokens, fontes e regras globais responsivas.
- `c:\PROJECTS\Projetos\Desafio-CompassUOL\Destilare\public\products.json` — fonte externa com no mínimo 6 produtos.
- `c:\PROJECTS\Projetos\Desafio-CompassUOL\Destilare\vite.config.ts` — base path necessário para GitHub Pages.
- `c:\PROJECTS\Projetos\Desafio-CompassUOL\Destilare\index.html` — idioma, título e metadados.
- `c:\PROJECTS\Projetos\Desafio-CompassUOL\Destilare\README.md` — execução, arquitetura, publicação e roteiro de explicação.
- `c:\PROJECTS\Projetos\Desafio-CompassUOL\Destilare\package.json` — scripts existentes (`dev`, `build`, `lint`, `preview`); adicionar dependências somente se necessárias.
- `c:\PROJECTS\Projetos\Desafio-CompassUOL\Destilare\src\components\BomDia.tsx` e `src\types\teste.ts` — candidatos a remoção ou substituição após confirmar que não haverá uso.

**Verificação**
1. `npm run lint`.
2. `npm run build`.
3. Inspeção local com DevTools Network confirmando `products.json` retornando 200 e sendo consumido por `fetch`.
4. Testes manuais de busca, estados de carregamento/erro/vazio, navegação e viewport móvel.
5. Inspeção do build publicado no GitHub Pages, incluindo carregamento do JSON em subpath e acesso à página `/como-fiz`.
6. Lighthouse ao vivo na URL pública, com scores e plano de melhoria documentados no vídeo.

**Decisões**
- Tema: Destilare, loja de whiskys; nome aproveitado do projeto atual, mas produtos e identidade serão próprios.
- Front-end: React com TypeScript, aproveitando a base existente do projeto; navegação com React Router DOM.
- Hospedagem: GitHub Pages, por ser gratuita e valorizar o repositório como portfólio.
- Requisito mínimo priorizado: catálogo externo + `fetch` + busca + página `/como-fiz`; carrinho, checkout e login ficam fora do escopo inicial para preservar a clareza da explicação.
- IA, AWS/cache e BFF serão explicados na página/roteiro, sem simular integrações de backend que o desafio não exige.
- O vídeo é um insumo final do usuário; durante o desenvolvimento haverá um placeholder substituível.

**Fora do escopo**
- Backend, pagamentos reais, autenticação, persistência de carrinho e integração real com AWS.
- Compra ou geração de imagens sem confirmação de licença/uso.
- Bônus de vídeo auto-hospedado e desenho completo de BFF, embora a arquitetura possa deixar espaço para explicá-los posteriormente.

**Pontos a confirmar antes da implementação**
- Nome exato do repositório GitHub, para configurar corretamente o `base` do Vite e os links públicos.
- Fonte/licença das imagens dos produtos.
- URL do vídeo, que será adicionada antes da publicação final.