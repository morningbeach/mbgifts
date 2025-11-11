/// app/layout.tsx
import './globals.css';

export const metadata = {
  title: 'MorningBeachGifts — Curated Gifts & Bespoke Boxes',
  description: 'Corporate gifting made effortless.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="mbg-body">
        <header className="mbg-header">
          <div className="mbg-container mbg-nav">
            <a className="brand" href="/">MorningBeachGifts</a>
            <nav>
              <a href="/gifts">Gifts</a>
              <a href="/gift-sets">Gift Sets</a>
              <a href="/custom-packaging">Custom Packaging</a>
              <a className="btn btn-primary" href="/rfq">Get a Quote</a>
            </nav>
          </div>
        </header>

        {children}

        <footer className="mbg-footer">
          <div className="mbg-container copyright">
            © {new Date().getFullYear()} MorningBeachGifts. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
