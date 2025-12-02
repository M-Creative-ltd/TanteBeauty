import { reader } from './reader';
import HeroSection from './components/sections/HeroSection/HeroSection';
import IntroSection from './components/sections/IntroSection/IntroSection';
import WhySection from './components/sections/WhySection/WhySection';
import PhilosophySection from './components/sections/PhilosophySection/PhilosophySection';
import SourceSection from './components/sections/SourceSection/SourceSection';
import PromiseSection from './components/sections/PromiseSection/PromiseSection';
import ScrollArrow from './components/ui/ScrollArrow/ScrollArrow';
import ScrollSnapEnabler from './components/utils/ScrollSnapEnabler';

export default async function Homepage() {
  const home = await reader.singletons.home.read();

  if (!home) {
    return (
      <p>Home content not found. Please configure the home singleton in Keystatic.</p>
    );
  }

  const { hero, intro, why, philosophy, source, promise, theme } = home;
  const primaryColor = theme?.primaryColor || '#014b3c';
  const secondaryColor = theme?.secondaryColor || '#fff7f5';
  const accentColor = theme?.accentColor || '#ffffff';

  // Resolve markdoc content fields before passing to components
  const introCopy = intro?.copy ? await intro.copy() : null;
  const introCopyNode = introCopy?.node || introCopy;
  
  const whyBody = why?.body ? await why.body() : null;
  const whyBodyNode = whyBody?.node || whyBody;
  
  const philosophyBody = philosophy?.body ? await philosophy.body() : null;
  const philosophyBodyNode = philosophyBody?.node || philosophyBody;

  const sourceBody = source?.body ? await source.body() : null;
  const sourceBodyNode = sourceBody?.node || sourceBody;
  
  const promiseBody = promise?.body ? await promise.body() : null;
  const promiseBodyNode = promiseBody?.node || promiseBody;

  return (
    <>
      <ScrollSnapEnabler />
      <ScrollArrow />
      {hero && hero.image && hero.ctaLabel && hero.ctaTarget && (
        <HeroSection
          heading={hero.heading}
          subheading={hero.subheading || undefined}
          ctaLabel={hero.ctaLabel}
          ctaTarget={hero.ctaTarget}
          image={hero.image}
          mobileImage={hero.mobileImage || hero.image}
          logo={hero.logo || undefined}
          // accentIcon removed as it is now handled by ScrollArrow
          primaryColor={primaryColor}
        />
      )}
      {intro && intro.image && (
        <IntroSection
          image={intro.image}
          logo={intro.logo || undefined}
          copy={introCopyNode}
          ctaLabel={intro.ctaLabel || undefined}
          ctaTarget={intro.ctaTarget || undefined}
          secondaryColor={secondaryColor}
          primaryColor={primaryColor}
        />
      )}
      {why && why.heading && why.image && (
        <WhySection
          heading={why.heading}
          body={whyBodyNode}
          image={why.image}
          primaryColor={primaryColor}
        />
      )}
      {philosophy && philosophy.heading && philosophy.image && (
        <PhilosophySection
          heading={philosophy.heading}
          body={philosophyBodyNode}
          image={philosophy.image}
          primaryColor={primaryColor}
        />
      )}
      {source && source.heading && source.image && (
        <SourceSection
          heading={source.heading}
          body={sourceBodyNode}
          image={source.image}
          primaryColor={primaryColor}
        />
      )}
      {promise && promise.heading && (
        <PromiseSection
          heading={promise.heading}
          body={promiseBodyNode}
          illustration={promise.illustration || undefined}
          secondaryColor={secondaryColor}
          primaryColor={primaryColor}
        />
      )}
    </>
  );
}
