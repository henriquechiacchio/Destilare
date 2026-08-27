import Catalog from "./Catalog";

function Storefront() {
  return (
    <main className="storefront">
      <section className="storefront__hero" aria-labelledby="storefront-title">
        <p className="eyebrow">Curadoria de pequenos lotes</p>
        <h1 id="storefront-title">Destilare</h1>
        <p className="storefront__intro">
          O tempo transforma tudo.
        </p>
        <a className="text-link" href="#catalogo">
          Explorar a coleção <span aria-hidden="true">↓</span>
        </a>
      </section>

      <Catalog />
    </main>
  );
}

export default Storefront;