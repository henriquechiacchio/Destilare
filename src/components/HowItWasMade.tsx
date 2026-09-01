function HowItWasMade() {
  return (
    <main className="how-it-was-made" aria-labelledby="how-title">
      <p className="eyebrow">Bastidores da construção</p>
      <h1 id="how-title">Como fiz</h1>
      <p className="how-it-was-made__intro">
        Aqui está o vídeo explicando a construção da Destilare de ponta a ponta — 
        organização do código, por que o catálogo é separado do front-end, 
        navegação em SPA no GitHub Pages, busca com normalização português, 
        e onde eu plugaria IA na loja.
      </p>

      <div className="video-placeholder" aria-label="Espaço reservado para o vídeo da apresentação">
        <span className="video-placeholder__mark" aria-hidden="true">▶</span>
        <p>Vídeo da apresentação em breve</p>
      </div>

      <section className="how-it-was-made__section">
        <h2>O que o vídeo cobre</h2>
        <ol>
          <li>Estrutura do projeto: `src/` (componentes React), `public/data/products.json` (catálogo de whiskys), `App.css` (identidade premium), rotas com React Router DOM.</li>
          <li>Por que o catálogo vive em `products.json` e é lido via `fetch` — nenhum whisky está hardcoded no JSX.</li>
          <li>Navegação SPA em 3 rotas (`/`, `/como-fiz`, `/produto/:id`) sem recarregar página, usando React Router + fallback `404.html` no GitHub Pages.</li>
          <li>Busca em tempo real com normalização de acentos (`toLocaleLowerCase("pt-BR")` + `normalize("NFD")`) — funciona em português com caracteres especiais.</li>
          <li>Onde eu plugaria IA: busca semântica, recomendações cruzadas por categoria, chat para responder dúvidas sobre origem/degustação, e realizar recomendações personalizadas.</li>
        </ol>
      </section>

      <section className="how-it-was-made__section">
        <h2>Decisões técnicas, resumidas</h2>
        <ul>
          <li><strong>React + TypeScript sem CSS-in-JS.</strong> Priorizei tipagem completa e zero dependências externas de estilo — CSS nativo garante flexibilidade e peso reduzido pra publicar no GitHub Pages.</li>
          <li><strong>Catálogo separado (headless em miniatura):</strong> `Catalog.tsx` não sabe nada sobre whiskys específicos — ele só busca JSON e desenha cards. Trocar o catálogo é trocar o arquivo, sem tocar em React.</li>
          <li><strong>IDs únicos de produtos para URLs diretas:</strong> cada whisky tem `id` em `products.json`, permitindo rotas `/produto/destilare-reserva-carvalho` compartilháveis e acessíveis direto.</li>
          <li><strong>Busca + navegação acopladas:</strong> os dois trabalham sobre o mesmo array em memória (`useMemo` + `filteredProducts`), sem chamada nova ao servidor a cada tecla.</li>
          <li><strong>Imagens otimizadas local (`.webp`):</strong> decisão pensada pro Lighthouse — menos requisições, menos peso de página, carregamento previsível em qualquer conexão.</li>
        </ul>
      </section>

      <section className="how-it-was-made__section">
        <h2>Onde plugaria IA</h2>
        <p>
          <strong>Busca semântica:</strong> entender "whisky suave com notas de baunilha" e cair direto em Reserva Carvalho.
        </p>
        <p>
          <strong>Chat de recomendação:</strong> um assistente para responder "qual whisky é melhor pra iniciante?" ou "de onde vem o Harmonia Clássica?".
          Além disso, o chat poderia ler o historico do cliente para realizar recomendações personalizadas, como "você comprou o Reserva Carvalho, talvez goste do Bruma Defumada".
        </p>
      </section>
    </main>
  );
}

export default HowItWasMade;