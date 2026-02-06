/**
 * Cloaker utility for Vite
 * Adapted from Next.js middleware
 */

import { CLOAKER_CONFIG } from './cloakerConfig';

const { FACEBOOK_PARAM_PASS, COOKIE_NAME, COOKIE_DURATION_HOURS, URL_PARAM_NAME, DEBUG } = CLOAKER_CONFIG;

/**
 * Get cookie value by name
 */
export function getCookie(name: string): string | null {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [key, value] = cookie.trim().split('=');
    if (key === name) {
      return value;
    }
  }
  return null;
}

/**
 * Set cookie with expiration
 */
export function setCookie(name: string, value: string, hours: number): void {
  const date = new Date();
  date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/`;
}

/**
 * Initialize cloaker - checks for 'cat' parameter and sets cookie
 * Should be called on app initialization
 */
export function initCloaker(): void {
  const urlParams = new URLSearchParams(window.location.search);
  const catParam = urlParams.get(URL_PARAM_NAME);

  // If cat parameter matches the pass code
  if (catParam === FACEBOOK_PARAM_PASS) {
    // Set the validation cookie
    setCookie(COOKIE_NAME, '1', COOKIE_DURATION_HOURS);
    
    // Remove cat parameter from URL
    urlParams.delete(URL_PARAM_NAME);
    const newSearch = urlParams.toString();
    const newUrl = window.location.pathname + (newSearch ? `?${newSearch}` : '') + window.location.hash;
    
    // Update URL without reloading the page
    window.history.replaceState({}, '', newUrl);
    
    if (DEBUG) {
      console.log('Cloaker: cat parameter validated and cookie set');
    }
  }
}

/**
 * Check if user has valid cloaker cookie
 */
export function hasValidCloakerCookie(): boolean {
  const cookieValue = getCookie(COOKIE_NAME);
  return cookieValue === '1';
}
