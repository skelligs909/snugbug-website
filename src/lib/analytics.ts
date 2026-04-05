import posthog from 'posthog-js';

export function trackWaitlistSignup(email: string) {
  posthog.capture('waitlist_signup', { email });
  posthog.identify(email, { email, source: 'waitlist' });
}

export function trackSectionView(section: string) {
  posthog.capture('section_viewed', { section });
}

export function trackCTAClick(cta: string, location: string) {
  posthog.capture('cta_clicked', { cta, location });
}
