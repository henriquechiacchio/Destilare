# Plano de implementação: Fase 2

## Objetivo

Transformar a rota `/` em uma vitrine funcional da Destilare, carregando o catálogo externo por `fetch`, renderizando os produtos de forma dinâmica e permitindo busca por nome, categoria e descrição.

A implementação deve preservar a navegação existente entre `/` e `/como-fiz`, manter o catálogo fora do JSX e funcionar em desenvolvimento e em um subdiretório do GitHub Pages.

## Diagnóstico atual

A fundação da aplicação já está pronta:

- React, TypeScript, Vite e React Router DOM estão configurados.
- `BrowserRouter` já usa `import.meta.env.BASE_URL` como `basename`.
- `public/products.json` contém seis produtos e o tipo `Product` está definido.
- `npm run lint` e `npm run build` passam atualmente.
- A rota `/` ainda exibe apenas o hero e um preview textual do catálogo.

Pendências diretamente relacionadas à Fase 2:

- não há carregamento do JSON por `fetch`;
- não existem estados de carregamento, erro, catálogo vazio ou nova tentativa;
- não existem cards nem uma grade de produtos;
- não existe busca nem contador de resultados;
- os estilos ainda não cobrem formulário, cards e estados do catálogo;
- as imagens externas ainda precisam ser revisadas quanto à estabilidade e licença.

## Escopo

### Incluído

- Tipos para o estado do catálogo.
- Carregamento de `products.json` no componente da vitrine.
- Renderização dinâmica de cards acessíveis.
- Busca por nome, categoria e descrição.
- Contador de resultados.
- Estados de carregamento, erro, catálogo vazio e busca sem resultados.
- Botão para tentar novamente após erro.
- Layout responsivo da seção de catálogo.
- Validação de build, lint, rede, busca e viewport móvel.

### Fora do escopo

- Carrinho, checkout, login e persistência.
- Backend, BFF ou integração real com AWS.
- Integração de IA.
- Página `/como-fiz` completa, que será tratada nas fases seguintes.
- Configuração definitiva do GitHub Pages sem o nome confirmado do repositório.

## Sequência de implementação

### 1. Modelar os estados

Manter `Product` em `src/types/product.ts` e adicionar um estado explícito para o carregamento, por exemplo:

```ts
type CatalogStatus = "loading" | "success" | "error";
```

O componente também deverá controlar a lista de produtos, o termo de busca e a mensagem de erro. Não é necessário criar uma camada de API ou hook separado antes de existir duplicação real.

### 2. Carregar o catálogo

No componente responsável pela vitrine, implementar:

```ts
fetch(`${import.meta.env.BASE_URL}products.json`)
```

O fluxo deve:

1. iniciar no estado `loading`;
2. verificar `response.ok`;
3. converter a resposta com `response.json()`;
4. armazenar os produtos e mudar para `success`;
5. tratar erro de rede, resposta HTTP inválida e JSON inválido;
6. oferecer uma ação de nova tentativa;
7. evitar atualização de estado após a desmontagem do componente.

O caminho deve utilizar `BASE_URL`, pois `/products.json` quebra quando a aplicação é publicada em um subdiretório.

### 3. Criar os cards

Criar uma composição simples, inicialmente próxima de `App.tsx`:

- `CatalogSection`: busca, contador e grade;
- `ProductCard`: apresentação de um produto;
- `CatalogState`: loading, erro e estados vazios.

Cada card deve mostrar:

- imagem com texto alternativo descritivo;
- nome;
- categoria;
- descrição curta;
- preço formatado em reais;
- idade e origem quando houver espaço;
- notas de degustação de forma compacta.

Formatar preços com a API internacional do navegador:

```ts
new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
}).format(product.price)
```

### 4. Implementar a busca

Adicionar um formulário acessível com:

- `label` associado ao campo;
- input controlado por `searchTerm`;
- placeholder indicando nome, categoria ou descrição;
- ação de limpar o termo quando ele estiver preenchido;
- contador de resultados.

A filtragem deve ser derivada do catálogo original, sem manter uma segunda lista no estado. A comparação deve usar `name`, `category` e `description`.

Para melhorar a busca em português, normalizar caixa e acentos antes da comparação:

```ts
value
  .toLocaleLowerCase("pt-BR")
  .normalize("NFD")
  .replace(/\p{Diacritic}/gu, "")
```

### 5. Cobrir estados visuais

Distinguir os seguintes estados:

- `loading`: indicador textual e visual;
- `error`: explicação curta e botão de nova tentativa;
- catálogo vazio: a fonte carregou, mas não possui produtos;
- busca sem resultados: o catálogo possui itens, mas nenhum corresponde ao termo;
- resultados: contador e cards.

A mensagem de catálogo vazio não deve ser a mesma de busca sem resultados.

### 6. Atualizar a composição da loja

A rota inicial deverá seguir uma hierarquia semelhante a:

1. hero e apresentação da marca;
2. introdução curta sobre a curadoria;
3. seção de catálogo externo;
4. formulário de busca;
5. contador;
6. grade de produtos;
7. chamada para conhecer `/como-fiz`.

O texto provisório de que o catálogo está sendo preparado deve ser removido quando o carregamento real estiver conectado.

### 7. Ajustar os estilos

Atualizar `src/App.css` para incluir:

- seção e cabeçalho do catálogo;
- formulário de busca;
- contador;
- grade responsiva;
- cards;
- imagem com dimensão estável usando `aspect-ratio`;
- preço e metadados;
- estados de carregamento, erro e vazio;
- foco e hover acessíveis;
- quebra segura de textos longos.

Revisar `src/index.css` para garantir estilos consistentes em `input`, `button` e `:focus-visible`, além de prevenir overflow horizontal.

A grade deve usar colunas flexíveis, como `repeat(auto-fit, minmax(min(100%, 260px), 1fr))`, para manter os cards utilizáveis em telas estreitas.

## Critérios de aceite

- A página `/` faz `fetch` de `products.json` usando `import.meta.env.BASE_URL`.
- O catálogo aparece sem dados de produtos escritos no JSX.
- Os seis produtos atuais são renderizados.
- O preço aparece em formato `R$`.
- A busca encontra termos em nome, categoria e descrição.
- A busca sem correspondência exibe um estado próprio.
- Um catálogo vazio exibe um estado próprio.
- Falhas de rede ou HTTP exibem erro e permitem nova tentativa.
- Imagens têm `alt` e não causam mudança de layout durante o carregamento.
- O contador corresponde à quantidade filtrada.
- A navegação para `/como-fiz` permanece funcionando.
- Não há overflow horizontal em viewport móvel.
- `npm run lint` e `npm run build` continuam passando.

## Validação incremental

Após implementar o carregamento e os cards:

```bash
npm run lint
npm run build
```

Depois, validar no navegador:

1. abrir a loja e confirmar no Network que `products.json` retorna `200`;
2. verificar que os seis produtos aparecem;
3. buscar por nome, categoria, descrição e termo com acentos;
4. limpar a busca;
5. testar uma busca sem resultados;
6. renomear temporariamente `public/products.json` para confirmar o estado de erro;
7. restaurar o arquivo e testar a nova tentativa;
8. verificar a navegação para `/como-fiz`;
9. testar largura móvel e teclado.

## Riscos e decisões posteriores

- As imagens externas do Unsplash devem ser revisadas antes da publicação por estabilidade e licença. Há produtos que reutilizam a mesma imagem-base.
- O favicon referenciado em `index.html` ainda não existe na estrutura atual e deve ser removido ou substituído antes do deploy.
- O `base` definitivo do Vite depende do nome real do repositório. Essa decisão pertence à preparação do deploy, não deve bloquear a implementação local da Fase 2.
- O acesso direto a `/como-fiz` no GitHub Pages precisará de fallback ou estratégia de publicação compatível com `BrowserRouter`.

## Próximo passo imediato

Implementar os tipos de estado e o carregamento do catálogo em `Storefront`. Em seguida, executar lint/build antes de avançar para a busca e para o refinamento visual.
