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
        <p className="hero-screen__eyebrow">Boundary First Labs · Software research and engineering lab</p>
        <h1 id="hero-screen-title">Software for difficult systems.</h1>
        <p className="hero-screen__lede">
          Products, public-interest work, and research for domains where representation, boundaries, state, and responsibility matter.
        </p>

        <div className="hero-screen__entry">
          <button type="button" onClick={onEnter}>
            <span>Enter the lab</span>
            <span aria-hidden="true">→</span>
          </button>
          <p>Cross the threshold to activate the Boundary navigation environment.</p>
        </div>
      </section>

      <section className="hero-screen__instrument" aria-label="Boundary First entry instrument">
        <div className="hero-apparatus" aria-hidden="true">
          <div className="hero-apparatus__outer">
            <span className="hero-apparatus__label hero-apparatus__label--outer">Boundary</span>
            <div className="hero-apparatus__middle">
              <span className="hero-apparatus__label">Representation</span>
              <div className="hero-apparatus__core">
                <span>BF</span>
              </div>
            </div>
          </div>
          <div className="hero-apparatus__port hero-apparatus__port--left">Observe</div>
          <div className="hero-apparatus__port hero-apparatus__port--right">Act</div>
        </div>
        <p>
          The hero is the threshold. The Root World begins after entry; structure and traversal live inside the frame.
        </p>
      </section>

      <footer className="hero-screen__footer">
        <span>Entry threshold</span>
        <span>One proposition · one action · one world beyond it</span>
      </footer>
    </main>
  );
}
