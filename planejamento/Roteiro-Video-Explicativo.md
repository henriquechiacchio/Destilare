## 1) Introdução e contexto geral (30 a 45s)

### O que mostrar
- Abrir o site publicado.
- Mostrar a home da Destilare.
- Abrir o editor com a estrutura principal da pasta do projeto.

### Script

“Hoje vou mostrar como construi a Destilare, uma vitrine premium de whiskys, com catálogo dinâmico, busca, páginas de detalhe e carrinho persistente. O objetivo foi unir identidade visual editorial com uma arquitetura simples, escalável e compatível com publicação estática.”

### Dica de gravação
Fale de forma natural, como se estivesse explicando o projeto para um colega técnico. Não precisa começar com explicação longa; o importante é contextualizar rapidamente.

---

## 2) 01 — O que você construiu e como o código está organizado? (1 min 10s)

### O que mostrar
- Abrir [src/App.tsx](../src/App.tsx)
- Mostrar [src/components/Storefront.tsx](../src/components/Storefront.tsx)
- Mostrar [src/components/Catalog.tsx](../src/components/Catalog.tsx)
- Mostrar [src/components/ProductDetail.tsx](../src/components/ProductDetail.tsx)
- Mostrar [src/context/CartContext.tsx](../src/context/CartContext.tsx)
- Mostrar [public/data/products.json](../public/data/products.json)

### Script

“Esse projeto está organizado em camadas bem claras. O ponto de entrada é o App, que monta o roteamento e o provider do carrinho. A parte visual fica em componentes como Storefront, Catalog, ProductCard e HowItWasMade. Os dados ficam fora do front, em [public/data/products.json](../public/data/products.json), e o estado global do carrinho fica em [src/context/CartContext.tsx](../src/context/CartContext.tsx). Isso deixa o código mais previsível, mais fácil de evoluir e sem misturar dados, regra de negócio e interface.”

### Falar também sobre as partes do código
- [src/App.tsx](../src/App.tsx): rota principal e estrutura da SPA
- [src/components/Header.tsx](../src/components/Header.tsx): navegação
- [src/components/Catalog.tsx](../src/components/Catalog.tsx): busca, filtros e renderização
- [src/components/ProductDetailPage.tsx](../src/components/ProductDetailPage.tsx): detalhe do produto
- [src/components/HowItWasMade.tsx](../src/components/HowItWasMade.tsx): explicação do processo
- [src/Interfaces](../src/Interfaces): tipagem e contratos
- [src/types](../src/types): tipos de estado e catálogo

> Isso responde diretamente a pergunta 1: “o que foi construído e como o código está organizado?”

---

## 3) 02 — Por que o catálogo é separado do front? (1 min 20s)

### O que mostrar
- Abrir [public/data/products.json](../public/data/products.json)
- Abrir [src/components/Catalog.tsx](../src/components/Catalog.tsx)
- Mostrar o fetch do JSON
- Rodar a home e mostrar a lista carregando

### Script

“O catálogo não está hardcoded no JSX. Ele fica em [public/data/products.json](../public/data/products.json), e o front-end busca esse arquivo em runtime. Isso é uma boa prática de headless commerce: o front-end não conhece os produtos como parte fixa do código; ele apenas consome dados de um payload externo e renderiza a experiência em cima dele.”

“Em outras palavras, o catálogo vira uma fonte de dados independente da interface. Se eu quiser trocar, incluir ou remover produtos, eu altero o JSON e a loja se atualiza sem mexer na estrutura da aplicação.”

“Esse padrão também é importante porque separa conteúdo de apresentação. O código cuida da UX e do comportamento; o conteúdo vive em um arquivo de dados. Isso é muito mais sustentável para uma loja real.”

### Explicar a relação com headless commerce

“Headless commerce significa que a camada de loja está desacoplada da camada de apresentação. O catálogo, a marca, as regras de exibição e o front-end podem evoluir separadamente. O site não precisa depender de uma estrutura monolítica.”

---

## 4) 03 — Se essa loja fosse para a AWS, onde entraria cada peça? (1 min 30s)

### O que mostrar
- Mostrar o fluxo da aplicação no navegador.
- Explicar a jornada do clique como linha de pensamento.
- Se quiser, abrir o README para reforçar o cenário de publicação estática.
- Melhor: desenhar mentalmente a arquitetura sem abrir mais arquivos.

### Script

“Se essa loja fosse para a AWS, a jornada seria mais ou menos assim: o cliente acessa a URL, o navegador pede os assets e o catálogo, a CDN entrega esse conteúdo mais próximo do usuário e a origem entra só quando necessário. Em um cenário estático, eu pensaria em CloudFront frente a S3, com certificados e domínio via Route 53 e ACM.”

“O fluxo seria:
- navegador solicita a página;
- CloudFront responde com o HTML, CSS, JS e imagens;
- o catálogo em JSON, imagens e assets estáticos ficam cacheados;
- a origem, por exemplo no S3, só é acessada quando não há cache ou quando o conteúdo muda.”

### Sobre o cache

“Quando 10 mil pessoas acessam ao mesmo tempo, o cache faz diferença enorme. Em vez de cada usuário bater na origem, a CDN entrega cópias dos arquivos mais próximos do cliente. Isso reduz latência, diminui custo de banda e evita gargalos na origem.”

“Em resumo: browser → CDN → origem. O browser pega uma resposta rápida do edge; o CDN serve o conteúdo em cache; e só em miss de cache ou atualização o conteúdo vai para a origem.”

### Se quiser ir além

“Se houvesse autenticação, checkout, carrinho persistente mais complexo ou integração com pagamento, aí entraria API Gateway + Lambda + banco de dados, mas para a loja estática de catálogo, essa arquitetura de front estático e CDN é a mais eficiente.”

---

## 5) 04 — Rodar o Lighthouse ao vivo (1 min 30s a 2 min)

### O que mostrar
- Abrir o site.
- Pressionar F12.
- Abrir a aba Lighthouse.
- Escolher “Analyze”.
- Esperar a geração do relatório.

### Script

“Agora vou rodar o Lighthouse ao vivo para validar a experiência real. O foco aqui não é só a pontuação, mas ver onde o app está forte e o que precisa melhorar primeiro.”

“Eu olharia primeiro para:
- Largest Contentful Paint;
- Cumulative Layout Shift;
- performance de imagens;
- uso de JS e carregamento do hero;
- cache e compressão de assets.”

“O que eu melhoraria primeiro seria a otimização de imagem e o carregamento do banner principal, porque ele pesa muito e afeta a percepção de velocidade. Em seguida, reduzir o custo de renderização e priorizar o que aparece acima da dobra.”

### Comentário importante

“Não é sobre ter um score perfeito, é sobre observar o que realmente impacta a experiência. O que mais afeta a loja é velocidade percebida, porque a pessoa precisa entrar na coleção e entender a marca rapidamente.”

> Nesse ponto, o ideal é dizer os scores reais que apareceram na sua máquina no momento da gravação. Não invente números. O script acima é a estrutura. Vai depender do resultado do seu Lighthouse.

---

## 6) 05 — Onde você plugaria IA nessa loja? E o que foi mais difícil de verdade? (1 min 30s)

### O que mostrar
- Abrir [src/components/Catalog.tsx](../src/components/Catalog.tsx)
- Mostrar a busca com normalização e explicação
- Abrir [src/components/HowItWasMade.tsx](../src/components/HowItWasMade.tsx)
- Se quiser, abrir [src/context/CartContext.tsx](../src/context/CartContext.tsx)

### Script

“Essa loja tem alguns pontos naturais para IA. Primeiro, a busca semântica: ao invés de só procurar palavras-chave, a IA poderia entender frases como ‘whisky suave com notas de baunilha’ e sugerir melhor. Segundo, recomendação por perfil: o sistema poderia aprender preferências e sugerir whiskys de acordo com o que o cliente gosta. Terceiro, atendimento: um assistente poderia explicar origem, estilo e harmonização sem que o usuário precise navegar pelos detalhes.”

“Mas o mais difícil na construção não foi a ideia; foi transformar a experiência em algo coerente e bem feito: conectar catálogo, UX, responsividade, rotas, carrinho e publicação estática de forma que tudo funcionasse junto. O maior desafio real foi manter a arquitetura simples e confiável.”

### Fechamento

“Em resumo, a Destilare foi pensada como uma loja premium, com marca forte, arquitetura limpa e experiência digital que funciona bem tanto em desktop quanto em mobile, e que está pronta para evoluir com dados, cache e IA.”

---

## 7) Estrutura final do vídeo — timing sugerido

1. Introdução: 0:30
2. 01 — O que foi construído: 1:00
3. 02 — Catálogo separado do front: 1:20
4. 03 — Arquitetura AWS e cache: 1:30
5. 04 — Lighthouse ao vivo: 1:30 a 2:00
6. 05 — IA e desafio real: 1:30
7. Fechamento: 0:30

Total: cerca de 6 a 7 minutos, dentro do intervalo pedido.

---

## 8) Dicas de apresentação para deixar o vídeo mais natural

- Fale como se estivesse mostrando o projeto para um colega técnico.
- Não leia texto do slide; use o código e o site como apoio.
- Se a câmera for de rosto, deixe o rosto aparecendo 10 a 15 segundos no começo e no fim.
- Quando abrir o código, explique a lógica antes de apontar cada arquivo.
- Quando falar de AWS, use o “caminho do clique” como narrativa: navegador → CDN → origem → resposta → usuário.
- No final, resuma em 1 frase:
  “A Destilare é uma loja estática de forte identidade visual, arquitetura simples e pronta para escalar com cache e IA.”

---

## 9) Linha de fala pronta para gravar

“Eu construí a Destilare como uma vitrine premium de whiskys em React + TypeScript. O projeto está organizado em rotas, componentes e contexto de carrinho. O catálogo vive separado do front em [public/data/products.json](../public/data/products.json), porque isso facilita manutenção e transforma a loja em uma arquitetura mais parecida com headless commerce. Em um ambiente AWS, essa loja seria entregue via CDN e origem estática, com cache ajudando a atender 10 mil acessos ao mesmo tempo. Depois eu rodei o Lighthouse ao vivo para validar a experiência e identificar o que melhoraria primeiro. E por fim, a IA entraria em busca, recomendação e atendimento, mas o maior desafio foi mesmo construir uma experiência coerente, responsiva e escalável.”
