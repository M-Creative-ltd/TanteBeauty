import type { ReactNode } from 'react';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';

interface PageLayoutProps {
  children: ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <>
      <Navigation inHero={true} />
      <main id="main-content">
        {children}
      </main>
      <Footer />
    </>
  );
}
