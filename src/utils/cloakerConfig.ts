/**
 * Cloaker Configuration
 * Centralized configuration for the cloaker system
 */

export const CLOAKER_CONFIG = {
  /**
   * Password/Pass code for the 'cat' parameter
   * Change this to your own unique value
   */
  FACEBOOK_PARAM_PASS: 'Zkxidj6qY8JKKyK',
  
  /**
   * Password for local testing
   * Use ?test=password to bypass all filters and show BLACK content
   */
  LOCAL_TEST_PASS: 'KBC4fEgoQIFGBlrk',
  
  /**
   * Cookie name used for validation
   */
  COOKIE_NAME: 'cat_valid',
  
  /**
   * Cookie duration in hours
   * Default: 72 hours (3 days)
   */
  COOKIE_DURATION_HOURS: 72,
  
  /**
   * URL parameter name
   * The parameter that carries the pass code
   */
  URL_PARAM_NAME: 'cat',
  
  /**
   * Test parameter name
   * Use ?test=password for local testing
   */
  TEST_PARAM_NAME: 'test',
  
  /**
   * Enable debug mode
   * Shows console logs for cloaker operations
   */
  DEBUG: import.meta.env.DEV,
  
  /**
   * Default layer for fallback
   * If something goes wrong, which layer to show?
   */
  DEFAULT_LAYER: 1 as const,
  
  /**
   * Blocked countries (ISO codes)
   * These countries will get WHITE content
   */
  BLOCKED_COUNTRIES: ['US', 'RU', 'KP', 'IR'] as const,
  
  /**
   * Blocked languages
   * These language codes will get WHITE content
   */
  BLOCKED_LANGUAGES: ['en-us', 'en'] as const,
  
  /**
   * Require mobile device
   * If true, only mobile devices will see BLACK content
   */
  REQUIRE_MOBILE: true,
  
  /**
   * Require Facebook/Instagram browser
   * If true, only FB/IG browsers will see BLACK content
   */
  REQUIRE_FBIG_BROWSER: true,
  
  /**
   * Check for suspicious IPs (VPN, Proxy, Datacenter)
   * If true, will use IP checking APIs (may slow down initial load)
   */
  CHECK_SUSPICIOUS_IP: true,
  
  /**
   * IP Checking API Keys
   * Get your own keys from the respective services
   */
  API_KEYS: {
    PROXYCHECK: '153h9v-8l9862-958871-9v963c',
    ABSTRACT: '4f568837c1ad48c49181aa364cf85f47',
    IPINFO: '74ef8f3a3fe0c7',
  },
} as const;

/**
 * Layer descriptions for debugging
 */
export const LAYER_DESCRIPTIONS = {
  1: 'WHITE CONTENT - Basic/Safe',
  2: 'GRAY CONTENT - Intermediate',
  3: 'BLACK CONTENT - Premium/Full Experience',
} as const;

export type CloakerConfig = typeof CLOAKER_CONFIG;
export type LayerType = 1 | 2 | 3;
