import React from 'react';

type Platform = 'facebook' | 'instagram' | 'x' | 'tiktok' | 'linkedin' | 'snapchat' | 'telegram';

interface SocialIconProps {
  platform: string;
  className?: string;
}

const icons: Record<Platform, React.ReactNode> = {
  facebook: (
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  ),
  instagram: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </>
  ),
  x: (
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  ),
  tiktok: (
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5v4a9 9 0 0 1-9-9Z" />
  ),
  linkedin: (
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 2a2 2 0 1 1-2 2 2 2 0 0 1 2-2z" />
  ),
  snapchat: (
    <path d="M12 2.5c-4.5 0-8 3.5-8 8 0 1.5.5 3 1.5 4 .5.5.5 1 .5 1.5v.5c0 .5-.5 1-1 1.5-.5.5-1 1-1.5 1.5-.5.5-.5 1 0 1.5.5.5 1.5.5 2.5.5 1 0 2-.5 2.5-1 .5-.5 1-1 1.5-1 .5 0 1 .5 1.5 1 .5.5 1.5 1 2.5 1 1 0 2-.5 2.5-1 .5-.5 1-1 1.5-1 .5 0 1-.5 1.5-1.5v-.5c0-.5 0-1 .5-1.5 1-1 1.5-2.5 1.5-4 0-4.5-3.5-8-8-8z" />
  ),
  telegram: (
    <path d="M21.198 2.433a2.242 2.242 0 0 0-1.022.215l-8.609 3.33c-2.068.8-4.133 1.598-5.724 2.21a405.15 405.15 0 0 1-2.865 1.13c-3.032 1.063-3.78 1.9-1.52 2.737l4.075 1.256c1.136.35 2.328.666 3.566 1.035l2.94 3.453c.559.657.164 1.479-.69 1.479-.275 0-.543-.108-.748-.292l-3.74-3.348c-.47-.418-1.125-.508-1.718-.27l-4.99 1.53c-2.194.68-1.791 2.966.817 3.44l17.4 4.2c2.6.6 4.8-1.7 4.8-4.4V4.2c0-1.2-.9-2.1-2.1-2.1-.3 0-.6.1-.9.2z" />
  ),
};

export default function SocialIcon({ platform, className }: SocialIconProps) {
  const icon = icons[platform as Platform];

  if (!icon) {
    return null;
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor" // Use currentColor to inherit text color
      stroke="currentColor"
      strokeWidth="0" // Most of these are fill-based or mixed. I'll check.
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={{ fill: 'currentColor' }} // Ensure fill works
    >
        {/* Some icons are stroke based (Feather), some fill based. 
            Facebook: path (fill usually)
            Instagram: rect/path/line (stroke usually for Feather, but here I used a mix. Let's standardise on fill for solid icons or stroke for outlined)
            
            Actually, let's use a standard set. 
            Facebook (Feather): stroke based.
            Instagram (Feather): stroke based.
            
            Let's switch to stroke-based Feather icons for consistency where possible, or FontAwesome (fill).
            The user wants "green color format".
            
            Let's use simple paths that work with fill.
        */}
        {/* Resetting to a cleaner set of paths that are fill-based for easier coloring */}
        {platform === 'facebook' && <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" fill="currentColor" />}
        {platform === 'instagram' && (
            <g fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </g>
        )}
        {platform === 'x' && <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" fill="currentColor" />}
        {platform === 'tiktok' && <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" fill="currentColor"/>}
        {platform === 'linkedin' && <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 2a2 2 0 1 1-2 2 2 2 0 0 1 2-2z" fill="currentColor" />}
        {platform === 'snapchat' && <path d="M12 2.5c-4.5 0-8 3.5-8 8 0 1.5.5 3 1.5 4 .5.5.5 1 .5 1.5v.5c0 .5-.5 1-1 1.5-.5.5-1 1-1.5 1.5-.5.5-.5 1 0 1.5.5.5 1.5.5 2.5.5 1 0 2-.5 2.5-1 .5-.5 1-1 1.5-1 .5 0 1 .5 1.5 1 .5.5 1.5 1 2.5 1 1 0 2-.5 2.5-1 .5-.5 1-1 1.5-1 .5 0 1-.5 1.5-1.5v-.5c0-.5 0-1 .5-1.5 1-1 1.5-2.5 1.5-4 0-4.5-3.5-8-8-8z" fill="currentColor" />}
        {platform === 'telegram' && <path d="M21.198 2.433a2.242 2.242 0 0 0-1.022.215l-8.609 3.33c-2.068.8-4.133 1.598-5.724 2.21a405.15 405.15 0 0 1-2.865 1.13c-3.032 1.063-3.78 1.9-1.52 2.737l4.075 1.256c1.136.35 2.328.666 3.566 1.035l2.94 3.453c.559.657.164 1.479-.69 1.479-.275 0-.543-.108-.748-.292l-3.74-3.348c-.47-.418-1.125-.508-1.718-.27l-4.99 1.53c-2.194.68-1.791 2.966.817 3.44l17.4 4.2c2.6.6 4.8-1.7 4.8-4.4V4.2c0-1.2-.9-2.1-2.1-2.1-.3 0-.6.1-.9.2z" fill="currentColor" />}
    </svg>
  );
}
