// app/page.tsx
export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="mbg-container hero-inner">
          <div className="badge">Premium Corporate Gifting</div>
          <h1>Curated Gifts. Bespoke Boxes. <br className="hide-sm" />One Seamless Flow.</h1>
          <p className="lead">
            Pick the contents, customize the box, and ship worldwide—effortlessly.
          </p>
          <div className="cta-row">
            <a className="btn btn-primary" href="/rfq">Start a Quote</a>
            <a className="btn btn-ghost" href="/gift-sets">Browse Gift Sets</a>
          </div>
          <div className="hero-note">Lead time from 10 business days · Low MOQ · ESG options</div>
        </div>
      </section>

      {/* 3-category entry: 禮盒 / 禮品 / 禮品組 */}
      <section className="mbg-container pad-y">
        <h2 className="section-title">Shop by Category</h2>
        <div className="cards-3">
          <a className="card cat-boxes" href="/custom-packaging">
            <div className="card-media gradient-sand" />
            <div className="card-body">
              <h3>Gift Boxes</h3>
              <p>Rigid, foldable & mailers. Luxury finishes tailored to your brand.</p>
              <span className="link">Explore Packaging →</span>
            </div>
          </a>
          <a className="card cat-gifts" href="/gifts">
            <div className="card-media gradient-ocean" />
            <div className="card-body">
              <h3>Gifts</h3>
              <p>Curated objects: coffee & tea, wellness, stationery, tech accessories.</p>
              <span className="link">Explore Gifts →</span>
            </div>
          </a>
          <a className="card cat-sets" href="/gift-sets">
            <div className="card-media gradient-dawn" />
            <div className="card-body">
              <h3>Gift Sets</h3>
              <p>Ready-made bundles for onboarding, events, and VIP moments.</p>
              <span className="link">Explore Sets →</span>
            </div>
          </a>
        </div>
      </section>

      {/* Value props */}
      <section className="pad-y alt">
        <div className="mbg-container">
          <h2 className="section-title">Why MorningBeachGifts</h2>
          <ul className="pill-grid">
            <li>Design-first curation</li>
            <li>Brand-perfect packaging</li>
            <li>Low MOQ, fast lead time</li>
            <li>Worldwide fulfillment</li>
            <li>Dietary & theme filtering</li>
            <li>ESG materials & docs</li>
          </ul>
        </div>
      </section>

      {/* How it works */}
      <section className="mbg-container pad-y">
        <h2 className="section-title">How It Works</h2>
        <div className="steps">
          <div className="step"><span>1</span><h4>Define</h4><p>Budget, quantity & theme</p></div>
          <div className="step"><span>2</span><h4>Curate</h4><p>Pick gifts or start with a set</p></div>
          <div className="step"><span>3</span><h4>Package</h4><p>Select box style & finishes</p></div>
          <div className="step"><span>4</span><h4>Deliver</h4><p>Single or multi-address shipping</p></div>
        </div>
      </section>

      {/* ESG banner */}
      <section className="esg">
        <div className="mbg-container esg-inner">
          <h3>Choose Better Materials</h3>
          <p>Recycled papers, rPET fabrics, plastic-free fillers, and low-VOC inks—documented for your ESG reporting.</p>
          <a className="btn btn-light" href="/custom-packaging">See Options</a>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mbg-container pad-y">
        <div className="cta-panel">
          <h3>Ready to curate your next gifting experience?</h3>
          <p>Tell us your theme and budget. We’ll propose contents and packaging within 24–48h.</p>
          <a className="btn btn-primary" href="/rfq">Start a Quote</a>
        </div>
      </section>
    </>
  );
}
