/**
 * Registry of all renderable component types.
 * Key   = the "type" string in page JSON
 * Value = the Astro component (static import — required by Astro)
 *
 * Per ASTRO_COUNTRY_PLAN.md §6.
 */
import HeroSection          from './sections/HeroSection.astro';
import StatsBar             from './sections/StatsBar.astro';
import FeaturesGrid         from './sections/FeaturesGrid.astro';
import CtaBlock             from './sections/CtaBlock.astro';
import ComingSoon           from './sections/ComingSoon.astro';
import HowItWorks           from './sections/HowItWorks.astro';
import ServiceCards          from './sections/ServiceCards.astro';
import TestimonialsSection   from './sections/TestimonialsSection.astro';
import FaqSection            from './sections/FaqSection.astro';
import TrustBadges           from './sections/TrustBadges.astro';
import PricingTeaser         from './sections/PricingTeaser.astro';
import FeatureSplit          from './sections/FeatureSplit.astro';
import ComparisonTable       from './sections/ComparisonTable.astro';
import PricingTabs           from './sections/PricingTabs.astro';
import CodeShowcase          from './sections/CodeShowcase.astro';
import StepFlow              from './sections/StepFlow.astro';
import ContactChannels       from './sections/ContactChannels.astro';
import VideoEmbed            from './sections/VideoEmbed.astro';
import RichText              from './sections/RichText.astro';
import PolicyBody            from './sections/PolicyBody.astro';
import UseCaseGrid           from './sections/UseCaseGrid.astro';
import LogoCloud             from './sections/LogoCloud.astro';

import RelatedPages          from './sections/RelatedPages.astro';

export const componentMap: Record<string, any> = {
  hero:            HeroSection,
  statsBar:        StatsBar,
  featuresGrid:    FeaturesGrid,
  ctaBlock:        CtaBlock,
  comingSoon:      ComingSoon,
  howItWorks:      HowItWorks,
  serviceCards:    ServiceCards,
  testimonials:    TestimonialsSection,
  faqSection:      FaqSection,
  trustBadges:     TrustBadges,
  pricingTeaser:   PricingTeaser,
  featureSplit:    FeatureSplit,
  comparisonTable: ComparisonTable,
  pricingTabs:     PricingTabs,
  codeShowcase:    CodeShowcase,
  stepFlow:        StepFlow,
  contactChannels: ContactChannels,
  videoEmbed:      VideoEmbed,
  richText:        RichText,
  policyBody:      PolicyBody,
  useCaseGrid:     UseCaseGrid,
  logoCloud:       LogoCloud,
  relatedPages:    RelatedPages,
};
