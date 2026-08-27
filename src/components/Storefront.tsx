function Storefront() {
  return (
    <main className="storefront">
      <section className="storefront__hero" aria-labelledby="storefront-title">
        <p className="eyebrow">Curadoria de pequenos lotes</p>
        <h1 id="storefront-title">Destilare</h1>
        <p className="storefront__intro">
          Whiskys escolhidos para quem aprecia o tempo, o carvalho e a conversa
          que começa no primeiro gole.
        </p>
        <a className="text-link" href="#catalogo">
          Explorar a coleção <span aria-hidden="true">↓</span>
        </a>
      </section>

      <section className="collection-preview" id="catalogo" aria-labelledby="collection-title">
        <div>
          <p className="eyebrow">A coleção</p>
          <h2 id="collection-title">Uma carta para descobrir devagar.</h2>
        </div>
        <p className="collection-preview__note">
          Nosso catálogo está sendo preparado para receber a primeira seleção
          Destilare.
        </p>
      </section>
    </main>
  );
}

export default Storefront;