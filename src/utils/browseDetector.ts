/**
 * Facebook/Instagram Browser Detector
 * Uses a scoring system to determine if user is accessing from FB/IG app
 */

export interface BrowserDetectionResult {
  isFBIG: boolean;
  score: number;
  reasons: string[];
}

/**
 * Detect if user is accessing from Facebook or Instagram in-app browser
 * Uses multiple signals with a scoring system
 */
export function isFacebookOrInstagramBrowser(): BrowserDetectionResult {
  const userAgent = navigator.userAgent.toLowerCase();
  const referrer = document.referrer.toLowerCase();
  
  let score = 0;
  const reasons: string[] = [];
  
  // Check URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  
  // USER AGENT CHECK (+2 points)
  if (/fb_iab|fbav|instagram|iabmv|fban/i.test(userAgent)) {
    score += 2;
    reasons.push('FB/IG user agent detected');
  }
  
  // REFERRER CHECK (+1 point)
  if (referrer.includes('facebook.com') || referrer.includes('instagram.com')) {
    score += 1;
    reasons.push('FB/IG referrer detected');
  }
  
  // URL PARAMETERS CHECK (+1 point)
  if (urlParams.has('fbclid') || urlParams.has('igshid')) {
    score += 1;
    reasons.push('FB/IG tracking parameter detected');
  }
  
  // THRESHOLD: Score >= 1 means likely FB/IG browser
  const isFBIG = score >= 1;
  
  if (!isFBIG) {
    reasons.push('Not enough signals to confirm FB/IG browser');
  }
  
  return {
    isFBIG,
    score,
    reasons,
  };
}

/**
 * Detect if user is on a mobile device
 */
export function isMobileDevice(): boolean {
  const userAgent = navigator.userAgent.toLowerCase();
  return /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
}

/**
 * Detect if user agent is a bot/crawler
 */
export function isBotUserAgent(): boolean {
  const userAgent = navigator.userAgent.toLowerCase();
  return /bot|spider|crawler|google|bing|yandex|read-aloud|facebookexternalhit/i.test(userAgent);
}

/**
 * Get user's browser language
 */
export function getUserLanguage(): string {
  return (navigator.language || navigator.languages?.[0] || 'en').toLowerCase();
}
