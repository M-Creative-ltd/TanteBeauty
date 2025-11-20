import { reader } from './reader';
import HeroSection from './components/sections/HeroSection/HeroSection';
import IntroSection from './components/sections/IntroSection/IntroSection';
import WhySection from './components/sections/WhySection/WhySection';
import PhilosophySection from './components/sections/PhilosophySection/PhilosophySection';
import PromiseSection from './components/sections/PromiseSection/PromiseSection';

export default async function Homepage() {
  const home = await reader.singletons.home.read();

  if (!home) {
    return (
      <p>Home content not found. Please configure the home singleton in Keystatic.</p>
    );
  }

  const { hero, intro, why, philosophy, promise, theme } = home;
  const primaryColor = theme?.primaryColor || '#014b3c';
  const secondaryColor = theme?.secondaryColor || '#fff7f5';
  const accentColor = theme?.accentColor || '#ffffff';

  return (
    <>
      {hero && hero.image && hero.ctaLabel && hero.ctaTarget && (
        <HeroSection
          heading={hero.heading}
          subheading={hero.subheading || undefined}
          ctaLabel={hero.ctaLabel}
          ctaTarget={hero.ctaTarget}
          image={hero.image}
          logo={hero.logo || undefined}
          accentIcon={hero.accentIcon || undefined}
          primaryColor={primaryColor}
        />
      )}
      {intro && intro.image && (
        <IntroSection
          image={intro.image}
          logo={intro.logo || undefined}
          copy={intro.copy}
          ctaLabel={intro.ctaLabel || undefined}
          ctaTarget={intro.ctaTarget || undefined}
          secondaryColor={secondaryColor}
          primaryColor={primaryColor}
        />
      )}
      {why && why.heading && why.image && (
        <WhySection
          heading={why.heading}
          body={why.body}
          image={why.image}
          highlightImage={why.highlightImage || undefined}
          highlightCaption={why.highlightCaption || undefined}
          primaryColor={primaryColor}
        />
      )}
      {philosophy && philosophy.heading && philosophy.image && (
        <PhilosophySection
          heading={philosophy.heading}
          body={philosophy.body}
          image={philosophy.image}
          primaryColor={primaryColor}
        />
      )}
      {promise && promise.heading && (
        <PromiseSection
          heading={promise.heading}
          body={promise.body}
          illustration={promise.illustration || undefined}
          secondaryColor={secondaryColor}
          primaryColor={primaryColor}
        />
      )}
    </>
  );
}
