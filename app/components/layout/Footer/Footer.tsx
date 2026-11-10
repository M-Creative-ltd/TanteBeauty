import { reader } from '../../../reader';
import MarkdownContent from '../../ui/MarkdownContent/MarkdownContent';
import Image from '../../ui/Image/Image';
import SocialIcon from '../../ui/SocialIcon/SocialIcon';

export default async function Footer() {
  const footer = await reader.singletons.footer.read();

  if (!footer) {
    return null;
  }

  const { logo, tagline, address, copyright, socialLinks, partners } = footer;
  const visiblePartners = (partners ?? []).flatMap((partner) => {
    const name = partner.name?.trim();
    if (!name || !partner.logo) return [];
    return [{ name, logo: partner.logo, url: partner.url }];
  });

  return (
    <footer role="contentinfo" className="bg-white py-12 md:py-16 md:snap-start">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-12 mb-8">
          {/* Left: Logo + Tagline */}
          <div className="flex flex-col gap-4 items-center md:items-start text-center md:text-left">
            {logo && (
              <div style={{ width: '16rem', height: '12rem' }}>
                <Image
                  src={logo}
                  alt="Tante Beauty Logo"
                  width={240}
                  height={240}
                  quality={90}
                  className="object-contain w-full h-full"
                />
              </div>
            )}
            {tagline && (
              <p className="text-5xl font-serif font-bold" style={{ color: '#014b3c' }}>
                {tagline}
              </p>
            )}
          </div>

          {/* Right: Circular Logo Container + Address + Social Icons */}
          <div
            className="flex flex-col gap-6 md:items-center justify-end text-center">
            <div className="flex flex-row gap-4 items-center justify-center">
              {/* Circular Logo Container */}
              {logo && (
                <div className="rounded-full flex items-center justify-center p-4 shrink-0" style={{ width: '7.5rem', height: '7.5rem', backgroundColor: '#014b3c' }}>
                  <Image
                    src={logo}
                    alt="Tante Beauty Logo"
                    width={160}
                    height={160}
                    quality={90}
                    className="object-contain w-full h-full"
                  />
                </div>
              )}

              {/* Address */}
              {address && (
                <div className="prose prose-sm max-w-none text-left">
                  <MarkdownContent content={address} />
                </div>
              )}
            </div>

            {/* Social Icons */}
            {socialLinks && socialLinks.length > 0 && (
              <div className="flex gap-4 justify-center md:justify-start pl-4">
                {socialLinks.map((link, index) => (
                  link.url && (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit our ${link.platform} page`}
                      className="hover:opacity-70 transition-opacity text-[#014b3c]"
                      style={{ width: '2.5rem', height: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <SocialIcon platform={link.platform} className="w-full h-full" />
                    </a>
                  )
                ))}
              </div>
            )}
          </div>
        </div>

        {visiblePartners.length > 0 && (
          <div className="mb-8">
            <p className="mb-6 text-center text-sm text-[#014b3c]">Partners</p>
            <ul className="flex flex-wrap items-start justify-center gap-x-10 gap-y-8">
              {visiblePartners.map((partner, index) => {
                const mark = (
                  <>
                    <span className="flex h-10 items-center justify-center">
                      <Image
                        src={partner.logo}
                        alt=""
                        width={160}
                        height={40}
                        quality={90}
                        className="h-10 w-auto max-w-[9rem] object-contain"
                      />
                    </span>
                    <span className="max-w-[9rem] truncate text-center text-sm text-gray-500">
                      {partner.name}
                    </span>
                  </>
                );

                return (
                  <li key={`${partner.name}-${index}`} className="flex">
                    {partner.url ? (
                      <a
                        href={partner.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex min-h-11 flex-col items-center justify-center gap-2 rounded-sm px-1 transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#014b3c]"
                      >
                        {mark}
                      </a>
                    ) : (
                      <div className="flex min-h-11 flex-col items-center justify-center gap-2 px-1">
                        {mark}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {/* Copyright - Centered Bottom */}
        {copyright && (
          <div className="border-t border-gray-200 pt-8 text-center">
            <p className="text-sm text-gray-500">{copyright}</p>
          </div>
        )}
      </div>
    </footer>
  );
}



