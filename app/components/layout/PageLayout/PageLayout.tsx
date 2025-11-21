'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Navigation from '../Navigation/Navigation';

interface PageLayoutProps {
  children: ReactNode;
  footer: ReactNode;
}

export default function PageLayout({ children, footer }: PageLayoutProps) {
  const pathname = usePathname();
  const isKeystatic = pathname?.startsWith('/keystatic');

  if (isKeystatic) {
    return <>{children}</>;
  }

  return (
    <>
      <Navigation inHero={true} />
      <main id="main-content">
        {children}
      </main>
      {footer}
    </>
  );
}
