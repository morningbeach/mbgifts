// app/layout.tsx
import './globals.css';

export const metadata = {
  title: 'MorningBeachGifts — Curated Gifts & Bespoke Boxes',
  description:
    'Corporate gifting made effortless. Curated gifts, bespoke gift boxes, and elegant gift sets with global delivery.',
  openGraph: {
    title: 'MorningBeachGifts — Curated Gifts & Bespoke Boxes',
    description:
      'Corporate gifting made effortless. Curated gifts, bespoke gift boxes, and elegant gift sets with global delivery.',
    url: 'https://mbgifts.pages.dev',
    siteName: 'MorningBeachGifts',
    images: [{ url: '/og.jpg', width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="mbg-body">
        <header className="mbg-header">
          <div className="mbg-container mbg-nav">
            <a className="brand" href="/">MorningBeachGifts</a>
            <nav>
              <a href="/gift-sets">Gift Sets</a>
              <a href="/custom-packaging">Custom Packaging</a>
              <a className="btn btn-primary" href="/rfq">Get a Quote</a>
            </nav>
          </div>
        </header>

        {children}

        <footer className="mbg-footer">
          <div className="mbg-container footer-grid">
            <div>
              <div className="brand">MorningBeachGifts</div>
              <p className="muted">Curated gifts. Bespoke boxes. Delivered worldwide.</p>
            </div>
            <div>
              <h4>Explore</h4>
              <ul>
                <li><a href="/gift-sets">Gift Sets</a></li>
                <li><a href="/custom-packaging">Custom Packaging</a></li>
                <li><a href="/rfq">Request a Quote</a></li>
              </ul>
            </div>
            <div>
              <h4>Company</h4>
              <ul>
                <li><a href="/about">About</a></li>
                <li><a href="/how-it-works">How It Works</a></li>
                <li><a href="/contact">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="mbg-container copyright">
            © {new Date().getFullYear()} MorningBeachGifts. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
