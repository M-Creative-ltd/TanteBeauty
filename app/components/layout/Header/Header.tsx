import Navigation from '../Navigation/Navigation';

export default function Header() {
  return (
    <header role="banner" className="border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
        <Navigation inHero={false} />
      </div>
    </header>
  );
}




