"use client";

type HeroScreenProps = {
  onEnter: () => void;
};

export function HeroScreen({ onEnter }: HeroScreenProps) {
  return (
    <main className="hero-screen" aria-labelledby="hero-screen-title">
      <header className="hero-screen__chassis" aria-label="Boundary First Labs public entry">
        <div className="hero-screen__identity"></div>

        <div className="hero-screen__threshold" aria-label="Entry boundary">
          <span>Outside</span>
          <i aria-hidden="true" />
          <span>Boundary</span>
          <i aria-hidden="true" />
          <span>Inside</span>
        </div>

        <div className="hero-screen__mode" aria-label="Current interface mode">
          <span>Mode</span>
          <strong>Loading</strong>
        </div>
      </header>

      <section className="hero-screen__copy">


        <p className="hero-screen__eyebrow">Boundary First Labs</p>
        <h1 id="hero-screen-title">Software for difficult systems.</h1>
        <p className="hero-screen__lede">
          We build software, methods, and public-interest work for wicked problems—especially where hidden assumptions become operational consequences.
        </p>

        <div className="hero-screen__entry">
          <button type="button" onClick={onEnter}>
            <span>Enter the lab</span>
            <span className="hero-screen__entry-terminal" aria-hidden="true">→</span>
          </button>
        </div>
      </section>

      <section className="hero-screen__instrument" aria-label="Boundary First entry instrument">
        <header className="hero-screen__instrument-register" aria-hidden="true">
          <span>Instrument</span>
          <strong>Loop</strong>
        </header>

        <div className="hero-apparatus" aria-hidden="true">
          <div className="hero-apparatus__outer">
            <div className="hero-apparatus__middle">
              <span className="hero-apparatus__label">Model</span>
              <div className="hero-apparatus__core">
                <span>BF</span>
              </div>
            </div>
          </div>
          <div className="hero-apparatus__port hero-apparatus__port--top">Representation</div>
          <div className="hero-apparatus__port hero-apparatus__port--left">Observe</div>
          <div className="hero-apparatus__port hero-apparatus__port--right">Act</div>
          <div className="hero-apparatus__port hero-apparatus__port--bottom">Evidence</div>
        </div>
      </section>

      <footer className="hero-screen__footer" aria-hidden="true">
        <div className="hero-screen__loading" />
      </footer>
    </main>
  );
}
