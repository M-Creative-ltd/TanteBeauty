'use client';

import { useState } from 'react';
import Link from 'next/link';

interface NavigationProps {
  inHero?: boolean;
}

export default function Navigation({ inHero = false }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav
      aria-label="Main navigation"
      className={inHero ? 'absolute top-10 right-4 z-50 w-full flex justify-end p-4 md:p-6' : 'relative'}
    >
      <button
        onClick={toggleMenu}
        aria-expanded={isOpen}
        aria-controls="main-menu"
        aria-label="Toggle menu"
        className="md:hidden z-50"
        style={inHero ? { color: '#014b3c' } : { color: '#014b3c' }}
      >
        <span className="flex flex-col gap-1 w-6 h-6">
          <span className={`block h-0.5 w-full bg-current transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block h-0.5 w-full bg-current transition-all ${isOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block h-0.5 w-full bg-current transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </span>
      </button>
      <ul
        id="main-menu"
        className={`flex gap-6 ${inHero ? 'text-green-800' : ''} ${isOpen ? 'flex flex-col absolute top-full right-0 bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg z-50' : 'hidden md:flex'} ${inHero && !isOpen ? 'md:flex' : ''}`}
        style={!inHero ? { color: '#014b3c' } : {}}
      >
        <li>
          <Link href="/" onClick={closeMenu} className="hover:underline font-medium">Home</Link>
        </li>
        <li>
          <Link href="/products" onClick={closeMenu} className="hover:underline font-medium">Products</Link>
        </li>
        <li>
          <Link href="/services" onClick={closeMenu} className="hover:underline font-medium">Services</Link>
        </li>
        <li>
          <Link href="/reviews" onClick={closeMenu} className="hover:underline font-medium">Reviews</Link>
        </li>
        <li>
          <Link href="/contact" onClick={closeMenu} className="hover:underline font-medium">Contact</Link>
        </li>
      </ul>
    </nav>
  );
}




