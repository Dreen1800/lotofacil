import { isSuspiciousIP } from '@/utils/IPChecker';
import { cookies, headers } from 'next/headers';
import { isFacebookOrInstagramBrowser } from '@/utils/browseDetector';

// SET FILTER DATA

const blockedCountryList = ['BR', 'RU', 'KP', 'IR'];
const blockedLanguageList = ['pt-br'];

// SET PARAMS PASSWORDS

const localTestPass = 'KBC4fEgoQIFGBlrk';

// BOT DETECT

function isBot(userAgent: string): boolean {
  return /bot|spider|crawler|google|bing|yandex|read-aloud|facebookexternalhit/i.test(userAgent);
};

export async function getUserLayer(): Promise<number> {

  // GET HEADERS DATA

  const cks = await cookies()
  const hdrs = await headers();
  const ip = hdrs.get('x-real-ip') || hdrs.get('x-forwarded-for') || '';
  const url = hdrs.get('x-url') || ''; 
  const country = hdrs.get('x-vercel-ip-country') || 'US';
  const userAgent = hdrs.get('User-Agent') || '';
  const userLanguage = hdrs.get('Accept-Language')?.toLowerCase() || "";

  // GET PARAMS DATA

  const params = new URL(url).searchParams;
  const catParam = cks.get('cat_valid');
  const localParam = params.get('test') || '';

  console.log('HEADERS:', Object.fromEntries(hdrs.entries()));

  // LOCAL TEST VERIFY

  if (localParam === localTestPass) {
    console.log('BLACK CONTENT: LOCAL TEST');
    return 3;
  };

  // BOT FILTER

  if (isBot(userAgent)) {
    console.error('WHITE CONTENT: BOT');
    return 1;
  };

  // PARAMS FILTER

  if (catParam?.value !== '1') {
    console.error('WHITE CONTENT: PARAMS');
    return 1;
  };

  // COUNTRY FILTER

  if (blockedCountryList.includes(country)) {
    console.error('WHITE CONTENT: COUNTRY');
    return 1;
  };

  const isMobile = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);

  // DEVICE FILTER

  if (!isMobile) {
    console.error('WHITE CONTENT: DEVICE');
    return 1;
  };

  // LANGUAGE FILTER

  if (blockedLanguageList.includes(userLanguage)) {
    console.error('WHITE CONTENT: LANGUAGE');
    return 1;
  };

  const isFBIG = isFacebookOrInstagramBrowser(hdrs, url);

  // BROWSER AND REFFERER FILTER

  if (!isFBIG) {
    console.warn('GRAY CONTENT: BROWSER/REFERRER');
    return 2;
  };

  const connectionFilter = await isSuspiciousIP(ip);

  // CONNECTION VERIFY
  
  if (connectionFilter) {
    console.warn('GRAY CONTENT: CONNECTION');
    return 2;
  };

  console.log('BLACK CONTENT: CLEAN');
  return 3;

};