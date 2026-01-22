import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { serifFont, sansSerifFont, cormorantGaramondFont } from '../lib/fonts';
import PageLayout from './components/layout/PageLayout/PageLayout';
import Footer from './components/layout/Footer/Footer';
import { reader } from './reader';
import './globals.css';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await reader.singletons.seo.read();
  const siteUrl = seo?.siteUrl || 'https://tantebeauty.com';
  const siteName = seo?.siteName || 'Tante Beauty';
  const defaultTitle = seo?.defaultTitle || 'Tante Beauty - Natural Cosmetics';
  const defaultDescription = seo?.defaultDescription || 'Discover natural cosmetics and beauty products';
  const ogImage = seo?.ogImage ? `${siteUrl}${seo.ogImage}` : undefined;
  const twitterHandle = seo?.twitterHandle ? `@${seo.twitterHandle}` : undefined;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: defaultTitle,
      template: `%s | ${siteName}`,
    },
    description: defaultDescription,
    keywords: seo?.defaultKeywords?.split(',').map(k => k.trim()) || [],
    authors: seo?.author ? [{ name: seo.author }] : undefined,
    creator: seo?.author,
    publisher: seo?.author,
    robots: {
      index: seo?.robotsIndex ?? true,
      follow: seo?.robotsFollow ?? true,
      googleBot: {
        index: seo?.robotsIndex ?? true,
        follow: seo?.robotsFollow ?? true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: seo?.locale || 'en_US',
      url: siteUrl,
      siteName: siteName,
      title: defaultTitle,
      description: defaultDescription,
      images: ogImage
        ? [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: siteName,
            },
          ]
        : undefined,
    },
    twitter: {
      card: seo?.twitterCardType || 'summary_large_image',
      title: defaultTitle,
      description: defaultDescription,
      creator: twitterHandle,
      images: ogImage ? [ogImage] : undefined,
    },
    verification: seo?.googleSiteVerification
      ? {
          google: seo.googleSiteVerification,
        }
      : undefined,
    alternates: {
      canonical: siteUrl,
    },
    icons: {
      icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22></text></svg>',
      apple: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22></text></svg>',
    },
  };
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const seo = await reader.singletons.seo.read();
  const locale = seo?.locale || 'en';

  return (
    <html lang={locale} className={`${serifFont.variable} ${sansSerifFont.variable} ${cormorantGaramondFont.variable}`}>
      <body className={serifFont.className}>
        <PageLayout footer={<Footer />}>
          {children}
        </PageLayout>
      </body>
    </html>
  );
}
