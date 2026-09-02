/**
 * Nome do item: HowItWasMade
 *
 * Papel no projeto: Apresenta os bastidores, as decisões técnicas e as
 * funcionalidades implementadas na construção da Destilare.
 *
 * Funcionamento: Renderiza o vídeo de apresentação e seções textuais que
 * explicam a arquitetura, os recursos desenvolvidos e possíveis usos futuros
 * de inteligência artificial.
 *
 * Dependências e integrações: Usa os vídeos armazenados em public/videos e as
 * classes de estilo definidas em App.css.
 *
 * Observações: A URL dos assets considera BASE_URL para funcionar também no
 * subdiretório usado pelo GitHub Pages.
 */
function HowItWasMade() {
  const videoUrl = `${import.meta.env.BASE_URL}videos/destilare-presentation.mp4`;
  const posterUrl = `${import.meta.env.BASE_URL}videos/destilare-poster.webp`;

  return (
    <main className="how-it-was-made" aria-labelledby="how-title">
      <p className="eyebrow">Bastidores da construção</p>
      <h1 id="how-title">Como fiz</h1>

      <p className="how-it-was-made__intro">
        A Destilare é uma loja de whiskys, com catálogo dinâmico, páginas de detalhe (PDP), busca e carrinho persistente. 
        A ideia foi unir narrativa de marca, organização de código sem depender de backend.
      </p>

      <section className="how-it-was-made__section">
        <h2>Stack tecnológico</h2>
        <ul>
          <li><strong>React 19</strong> como base da interface.</li>
          <li><strong>TypeScript</strong> para tipagem, segurança e manutenção do código.</li>
          <li><strong>Vite</strong> para ambiente de desenvolvimento e build rápido.</li>
          <li><strong>React Router DOM</strong> para navegação entre as páginas da SPA.</li>
          <li><strong>CSS nativo</strong> para estilos, layout e responsividade.</li>
          <li><strong>GitHub Pages</strong> para publicação do projeto.</li>
          <li><strong>gh-pages</strong> para deploy automatizado da aplicação.</li>
          <li><strong>Google Fonts</strong> com <strong>Playfair Display</strong> e <strong>DM Mono</strong> para a identidade visual.</li>
        </ul>
      </section>

      <div className="video-placeholder" aria-label="Vídeo da apresentação do projeto">
        <video
          className="video-placeholder__video"
          controls
          preload="metadata"
          playsInline
          poster={posterUrl}
        >
          <source src={videoUrl} type="video/mp4" />
          Seu navegador não suporta reprodução de vídeo.
        </video>
      </div>

      <section className="how-it-was-made__section">
        <h2>O que foi implementado</h2>
        <ol>
          <li>Estrutura em React + TypeScript com separação clara entre UI, dados e contexto de carrinho.</li>
          <li>Catálogo em JSON em <strong>public/data/products.json</strong>, carregado dinamicamente sem hardcode de produtos no JSX.</li>
          <li>Rotas em SPA para <strong>/</strong>, <strong>/produto/:id</strong> e <strong>/como-fiz</strong>, com suporte a subdiretório do GitHub Pages.</li>
          <li>Busca com normalização de texto em português para funcionar com acentos e variações de caixa.</li>
          <li>Carrinho lateral com persistência em <strong>localStorage</strong>, subtotal, quantidade, remoção e limpeza.</li>
          <li>Produtos do carrinho com links diretos para a PDP, fechando o drawer ao navegar.</li>
          <li>Responsividade mobile e refinamento de espaçamento para manter a leitura confortável e consistente.</li>
        </ol>
      </section>

      <section className="how-it-was-made__section">
        <h2>Decisões técnicas</h2>
        <ul>
          <li>
            <strong>React + TypeScript:</strong> a tipagem deixa o código mais seguro e evita erros em componentes,
            interfaces e estados do catálogo.
          </li>
          <li>
            <strong>Catálogo em arquivo separado:</strong> o front-end não precisa saber os whiskys individualmente.
            Basta alterar o JSON para mudar a loja.
          </li>
          <li>
            <strong>Contexto global para o carrinho:</strong> a lógica foi centralizada em <strong>CartContext</strong>,
            evitando duplicação de estado e mantendo a sincronização com o localStorage.
          </li>
          <li>
            <strong>Arquitetura de interfaces separadas:</strong> cada tipo foi movido para um arquivo próprio para manter
            a organização, clareza e manutenção do projeto.
          </li>
          <li>
            <strong>Imagens otimizadas locais:</strong> o uso de arquivos em <strong>.webp</strong> reduz peso e mantém
            a apresentação mais rápida e estável em qualquer ambiente.
          </li>
        </ul>
      </section>

      <section className="how-it-was-made__section">
        <h2>Onde a IA entraria</h2>
        <p>
          <strong>Busca semântica:</strong> entender frases como “whisky suave com notas de baunilha” e sugerir o produto mais adequado.
        </p>
        <p>
          <strong>Recomendação por perfil:</strong> analisar histórico de visualizações e compras para propor whiskys conforme preferências do cliente.
        </p>
        <p>
          <strong>Assistente de compra:</strong> responder dúvidas sobre origem, estilo de degustação, ou indicar a melhor opção de acordo com o momento da compra.
        </p>
      </section>
    </main>
  );
}

export default HowItWasMade;