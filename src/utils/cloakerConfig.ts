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
   * Enable debug mode
   * Shows console logs for cloaker operations
   */
  DEBUG: import.meta.env.DEV,
  
  /**
   * Default layer for fallback
   * If something goes wrong, which layer to show?
   */
  DEFAULT_LAYER: 1 as const,
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
