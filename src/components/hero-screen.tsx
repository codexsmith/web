"use client";

type HeroScreenProps = {
  onEnter: () => void;
};

export function HeroScreen({ onEnter }: HeroScreenProps) {
  return (
    <main className="hero-screen" aria-labelledby="hero-screen-title">
      <div className="hero-screen__threshold" aria-hidden="true">
        <span>Outside</span>
        <span>Boundary</span>
        <span>Inside</span>
      </div>

      <section className="hero-screen__copy">
        <p className="hero-screen__eyebrow">Boundary First Labs</p>
        <h1 id="hero-screen-title">Software for difficult systems.</h1>
        <p className="hero-screen__lede">
          We build software, methods, and public-interest work for wicked problems—especially where hidden assumptions become operational consequences.
        </p>

        <div className="hero-screen__entry">
          <button type="button" onClick={onEnter}>
            <span>Enter the lab</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </section>

      <section className="hero-screen__instrument" aria-label="Boundary First entry instrument">
        <div className="hero-apparatus" aria-hidden="true">
          <div className="hero-apparatus__outer">
            <div className="hero-apparatus__middle">
              <span className="hero-apparatus__label">Representation</span>
              <div className="hero-apparatus__core">
                <span>BF</span>
              </div>
            </div>
          </div>
          <div className="hero-apparatus__port hero-apparatus__port--top">Model</div>
          <div className="hero-apparatus__port hero-apparatus__port--left">Observe</div>
          <div className="hero-apparatus__port hero-apparatus__port--right">Act</div>
          <div className="hero-apparatus__port hero-apparatus__port--bottom">Evidence</div>
        </div>
      </section>
    </main>
  );
}
