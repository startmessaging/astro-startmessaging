/**
 * Registry of all renderable component types.
 * Add new types here when building new section components.
 *
 * Key   = the "type" string in page JSON
 * Value = the Astro component (static import — required by Astro)
 */
import HeroSection  from './sections/HeroSection.astro';
import StatsBar     from './sections/StatsBar.astro';
import FeaturesGrid from './sections/FeaturesGrid.astro';
import CtaBlock     from './sections/CtaBlock.astro';
import ComingSoon   from './sections/ComingSoon.astro';

export const componentMap: Record<string, any> = {
  hero:         HeroSection,
  statsBar:     StatsBar,
  featuresGrid: FeaturesGrid,
  ctaBlock:     CtaBlock,
  comingSoon:   ComingSoon,
};
