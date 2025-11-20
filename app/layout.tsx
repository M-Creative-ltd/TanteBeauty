import type { ReactNode } from 'react';
import { serifFont, sansSerifFont } from '../lib/fonts';
import PageLayout from './components/layout/PageLayout/PageLayout';
import './globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
      <html lang="en" className={`${serifFont.variable} ${sansSerifFont.variable}`}>
      <body className={sansSerifFont.className}>
        <PageLayout>
          {children}
        </PageLayout>
      </body>
      </html>
  );
}
