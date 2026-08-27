function HowItWasMade() {
  return (
    <main className="how-it-was-made" aria-labelledby="how-title">
      <p className="eyebrow">Bastidores da construção</p>
      <h1 id="how-title">Como fiz</h1>
      <p className="how-it-was-made__intro">
        Esta página vai reunir o vídeo e as decisões técnicas da Destilare:
        catálogo externo, front-end em React com TypeScript e publicação
        estática.
      </p>
      <div className="video-placeholder" aria-label="Espaço reservado para o vídeo da apresentação">
        <span className="video-placeholder__mark" aria-hidden="true">▶</span>
        <p>Vídeo da apresentação em breve</p>
      </div>
    </main>
  );
}

export default HowItWasMade;