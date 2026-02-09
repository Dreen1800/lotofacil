import { hasValidCloakerCookie, getCookie } from './cloaker';
import { CLOAKER_CONFIG, LAYER_DESCRIPTIONS, type LayerType } from './cloakerConfig';
import {
  isFacebookOrInstagramBrowser,
  isMobileDevice,
  isBotUserAgent,
  getUserLanguage,
} from './browseDetector';
import { isSuspiciousIP } from './IPChecker';

/**
 * User Layer Types:
 * 1 = WHITE CONTENT - Basic/Safe (for bots, reviewers, blocked countries, etc)
 * 2 = GRAY CONTENT - Intermediate (suspicious but not blocked)
 * 3 = BLACK CONTENT - Premium/Full Experience (qualified real users)
 */
export type UserLayer = LayerType;

export interface LayerResult {
  layer: UserLayer;
  reason: string;
  details?: any;
}

/**
 * Determine user layer based on comprehensive validation
 * Uses multiple filters in priority order
 */
export async function getUserLayerClient(): Promise<LayerResult> {
  try {
    // ===== LOCAL TEST BYPASS =====
    // Check for test parameter first (bypasses all filters)
    const urlParams = new URLSearchParams(window.location.search);
    const testParam = urlParams.get(CLOAKER_CONFIG.TEST_PARAM_NAME);
    
    if (testParam === CLOAKER_CONFIG.LOCAL_TEST_PASS) {
      if (CLOAKER_CONFIG.DEBUG) {
        console.log('🧪 TEST MODE: Bypassing all filters → BLACK CONTENT');
      }
      return {
        layer: 3,
        reason: 'LOCAL TEST MODE',
      };
    }
    
    // ===== BOT DETECTION =====
    if (isBotUserAgent()) {
      if (CLOAKER_CONFIG.DEBUG) {
        console.log('🤖 BOT DETECTED → WHITE CONTENT');
      }
      return {
        layer: 1,
        reason: 'Bot user agent detected',
      };
    }
    
    // ===== COOKIE VALIDATION =====
    // User must have valid cloaker cookie (from ?cat=password)
    const hasValidCookie = hasValidCloakerCookie();
    
    if (!hasValidCookie) {
      if (CLOAKER_CONFIG.DEBUG) {
        console.log('❌ NO VALID COOKIE → WHITE CONTENT');
      }
      return {
        layer: 1,
        reason: 'No valid cloaker cookie',
      };
    }
    
    // ===== DEVICE FILTER =====
    // Only mobile devices pass (if enabled)
    if (CLOAKER_CONFIG.REQUIRE_MOBILE) {
      const isMobile = isMobileDevice();
      
      if (!isMobile) {
        if (CLOAKER_CONFIG.DEBUG) {
          console.log('💻 DESKTOP DEVICE → WHITE CONTENT');
        }
        return {
          layer: 1,
          reason: 'Desktop device detected (mobile required)',
        };
      }
    }
    
    // ===== LANGUAGE FILTER =====
    // Block specific languages
    const userLanguage = getUserLanguage();
    const isBlockedLanguage = CLOAKER_CONFIG.BLOCKED_LANGUAGES.some(
      lang => userLanguage.includes(lang)
    );
    
    if (isBlockedLanguage) {
      if (CLOAKER_CONFIG.DEBUG) {
        console.log(`🌐 BLOCKED LANGUAGE (${userLanguage}) → WHITE CONTENT`);
      }
      return {
        layer: 1,
        reason: `Blocked language: ${userLanguage}`,
      };
    }
    
    // ===== BROWSER DETECTION =====
    // Check if user is on Facebook/Instagram browser
    if (CLOAKER_CONFIG.REQUIRE_FBIG_BROWSER) {
      const browserCheck = isFacebookOrInstagramBrowser();
      
      if (!browserCheck.isFBIG) {
        if (CLOAKER_CONFIG.DEBUG) {
          console.log('📱 NOT FB/IG BROWSER → GRAY CONTENT');
          console.log('Reasons:', browserCheck.reasons);
        }
        return {
          layer: 2,
          reason: 'Not Facebook/Instagram browser',
          details: browserCheck,
        };
      }
      
      if (CLOAKER_CONFIG.DEBUG) {
        console.log('✅ FB/IG BROWSER DETECTED (score:', browserCheck.score, ')');
      }
    }
    
    // ===== IP VALIDATION =====
    // Check for suspicious IPs (VPN, Proxy, Datacenter, Blocked Countries)
    if (CLOAKER_CONFIG.CHECK_SUSPICIOUS_IP) {
      const ipCheck = await isSuspiciousIP();
      
      if (ipCheck.isSuspicious) {
        if (CLOAKER_CONFIG.DEBUG) {
          console.log('🔒 SUSPICIOUS IP → GRAY CONTENT');
          console.log('Reasons:', ipCheck.reasons);
        }
        return {
          layer: 2,
          reason: 'Suspicious IP detected',
          details: ipCheck,
        };
      }
      
      if (CLOAKER_CONFIG.DEBUG) {
        console.log('✅ IP CHECK PASSED');
      }
    }
    
    // ===== ALL CHECKS PASSED =====
    if (CLOAKER_CONFIG.DEBUG) {
      console.log('🎉 ALL FILTERS PASSED → BLACK CONTENT');
    }
    
    return {
      layer: 3,
      reason: 'All validation checks passed',
    };
    
  } catch (error) {
    console.error('❌ Error determining user layer:', error);
    return {
      layer: CLOAKER_CONFIG.DEFAULT_LAYER,
      reason: 'Error during validation',
    };
  }
}

/**
 * Synchronous version (without IP check) - for immediate rendering
 * Use this if you don't want to wait for async IP validation
 */
export function getUserLayerSync(): LayerResult {
  try {
    // Check for test parameter
    const urlParams = new URLSearchParams(window.location.search);
    const testParam = urlParams.get(CLOAKER_CONFIG.TEST_PARAM_NAME);
    
    if (testParam === CLOAKER_CONFIG.LOCAL_TEST_PASS) {
      return { layer: 3, reason: 'LOCAL TEST MODE' };
    }
    
    // Bot detection
    if (isBotUserAgent()) {
      return { layer: 1, reason: 'Bot detected' };
    }
    
    // Cookie validation
    if (!hasValidCloakerCookie()) {
      return { layer: 1, reason: 'No valid cookie' };
    }
    
    // Device check
    if (CLOAKER_CONFIG.REQUIRE_MOBILE && !isMobileDevice()) {
      return { layer: 1, reason: 'Desktop device' };
    }
    
    // Language check
    const userLanguage = getUserLanguage();
    if (CLOAKER_CONFIG.BLOCKED_LANGUAGES.some(lang => userLanguage.includes(lang))) {
      return { layer: 1, reason: 'Blocked language' };
    }
    
    // Browser check
    if (CLOAKER_CONFIG.REQUIRE_FBIG_BROWSER) {
      const browserCheck = isFacebookOrInstagramBrowser();
      if (!browserCheck.isFBIG) {
        return { layer: 2, reason: 'Not FB/IG browser' };
      }
    }
    
    // All sync checks passed
    return { layer: 3, reason: 'All checks passed (no IP validation)' };
    
  } catch (error) {
    console.error('Error in sync layer detection:', error);
    return { layer: CLOAKER_CONFIG.DEFAULT_LAYER, reason: 'Error' };
  }
}

/**
 * Get user layer description for debugging
 */
export function getUserLayerDescription(layer: UserLayer): string {
  return LAYER_DESCRIPTIONS[layer] || 'Unknown';
}
