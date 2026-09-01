import Catalog from "./Catalog";

function Storefront() {
  const heroBackground = `${import.meta.env.BASE_URL}banner/BannerStoreFront.webp`;
  const heroStyle = {
    ["--hero-banner" as any]: `url("${heroBackground}")`,
  } as React.CSSProperties;

  return (
    <main className="storefront">
      <section className="storefront__hero" style={heroStyle} aria-labelledby="storefront-title">
        <div className="storefront__content">
          <p className="eyebrow">Curadoria de pequenos lotes</p>
          <h1 id="storefront-title">Destilare</h1>
          <p className="storefront__intro">
            Whiskys de origem e caráter marcante, escolhidos para quem gosta de descobrir o tempo em cada gole.
          </p>
          <a className="text-link" href="#catalogo">
            Explorar a coleção <span aria-hidden="true">↓</span>
          </a>
        </div>

        
      </section>

      <Catalog />
    </main>
  );
}

export default Storefront;