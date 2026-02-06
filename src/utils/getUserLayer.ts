import { hasValidCloakerCookie } from './cloaker';
import { CLOAKER_CONFIG, LAYER_DESCRIPTIONS, type LayerType } from './cloakerConfig';

/**
 * User Layer Types:
 * 1 = WHITE CONTENT - Basic/Safe (for bots, reviewers, etc)
 * 2 = GRAY CONTENT - Intermediate
 * 3 = BLACK CONTENT - Premium/Full Experience (real users with valid cookie)
 */
export type UserLayer = LayerType;

/**
 * Determine user layer based on cloaker validation
 * Can be extended with more sophisticated detection logic
 */
export function getUserLayer(): UserLayer {
  try {
    // Check if user has valid cloaker cookie
    const hasValidCookie = hasValidCloakerCookie();
    
    if (hasValidCookie) {
      // User came from Facebook with valid parameter
      return 3; // BLACK CONTENT - Full experience
    }
    
    // Additional checks can be added here:
    // - Check for bot user agents
    // - Check for suspicious IPs
    // - Check for referrer
    // - etc.
    
    // Example: Detect common bots
    const userAgent = navigator.userAgent.toLowerCase();
    const botKeywords = ['bot', 'crawler', 'spider', 'scrapy', 'selenium'];
    const isBot = botKeywords.some(keyword => userAgent.includes(keyword));
    
    if (isBot && CLOAKER_CONFIG.DEBUG) {
      console.log('Cloaker: Bot detected via user agent');
    }
    
    // Default to safe content
    return CLOAKER_CONFIG.DEFAULT_LAYER;
  } catch (error) {
    console.error('Error determining user layer:', error);
    return CLOAKER_CONFIG.DEFAULT_LAYER;
  }
}

/**
 * Get user layer description for debugging
 */
export function getUserLayerDescription(layer: UserLayer): string {
  return LAYER_DESCRIPTIONS[layer] || 'Unknown';
}
