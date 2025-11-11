import './globals.css';

export const metadata = {
  title: 'MorningBeachGifts — Curated Gifts & Bespoke Boxes',
  description: 'Corporate gifting made effortless. Choose contents, customize packaging, ship worldwide.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <a href="/">MorningBeachGifts</a>
          <nav>
            <a href="/gift-sets">Gift Sets</a>
            <a href="/custom-packaging">Custom Packaging</a>
            <a href="/rfq">Get a Quote</a>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="site-footer">
          <p>© {new Date().getFullYear()} MorningBeachGifts</p>
        </footer>
      </body>
    </html>
  );
}
