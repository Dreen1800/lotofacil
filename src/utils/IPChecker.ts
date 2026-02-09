/**
 * IP Checker - Detects suspicious IPs (VPN, Proxy, Datacenter)
 * Uses multiple IP intelligence APIs for comprehensive detection
 */

import { CLOAKER_CONFIG } from './cloakerConfig';

const { PROXYCHECK, ABSTRACT, IPINFO } = CLOAKER_CONFIG.API_KEYS;
const BLOCKED_COUNTRIES = CLOAKER_CONFIG.BLOCKED_COUNTRIES;

export interface IPCheckResult {
  isSuspicious: boolean;
  reasons: string[];
  country?: string;
}

/**
 * Get user's IP address using a public service
 * Note: In production, you should get this from your server
 */
async function getUserIP(): Promise<string | null> {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error('Error getting user IP:', error);
    return null;
  }
}

/**
 * Check IP using ProxyCheck.io API
 */
async function checkProxyCheck(ip: string): Promise<{ suspicious: boolean; country?: string; reason?: string }> {
  try {
    const response = await fetch(`https://proxycheck.io/v2/${ip}?key=${PROXYCHECK}&vpn=1&asn=1`);
    const data = await response.json();
    
    if (CLOAKER_CONFIG.DEBUG) {
      console.log('ProxyCheck result:', data);
    }
    
    const ipData = data[ip];
    
    // Check for proxy/VPN
    if (ipData?.proxy === 'yes' || ipData?.vpn === 'yes') {
      return { suspicious: true, country: ipData?.isocode, reason: 'Proxy/VPN detected by ProxyCheck' };
    }
    
    // Check for blocked country
    const country = ipData?.isocode;
    if (country && BLOCKED_COUNTRIES.includes(country as any)) {
      return { suspicious: true, country, reason: `Blocked country detected by ProxyCheck: ${country}` };
    }
    
    return { suspicious: false, country };
  } catch (error) {
    console.error('ProxyCheck error:', error);
    return { suspicious: false };
  }
}

/**
 * Check IP using AbstractAPI
 */
async function checkAbstractAPI(ip: string): Promise<{ suspicious: boolean; country?: string; reason?: string }> {
  try {
    const response = await fetch(`https://ip-intelligence.abstractapi.com/v1/?api_key=${ABSTRACT}&ip_address=${ip}`);
    const data = await response.json();
    
    if (CLOAKER_CONFIG.DEBUG) {
      console.log('AbstractAPI result:', data);
    }
    
    // Check for VPN/Proxy/Tor
    if (data?.security?.is_vpn || data?.security?.is_proxy || data?.security?.is_tor) {
      return { suspicious: true, country: data?.location?.country_code, reason: 'VPN/Proxy/Tor detected by AbstractAPI' };
    }
    
    // Check for blocked country
    const country = data?.location?.country_code;
    if (country && BLOCKED_COUNTRIES.includes(country as any)) {
      return { suspicious: true, country, reason: `Blocked country detected by AbstractAPI: ${country}` };
    }
    
    return { suspicious: false, country };
  } catch (error) {
    console.error('AbstractAPI error:', error);
    return { suspicious: false };
  }
}

/**
 * Check IP using IPInfo.io
 */
async function checkIPInfo(ip: string): Promise<{ suspicious: boolean; country?: string; reason?: string }> {
  try {
    const response = await fetch(`https://ipinfo.io/${ip}/json?token=${IPINFO}`);
    const data = await response.json();
    
    if (CLOAKER_CONFIG.DEBUG) {
      console.log('IPInfo result:', data);
    }
    
    // Check for datacenter IPs
    const asn = data?.org || '';
    const datacenterProviders = ['Amazon', 'Google', 'Microsoft', 'DigitalOcean', 'Linode', 'Vultr', 'OVH'];
    
    for (const provider of datacenterProviders) {
      if (asn.includes(provider)) {
        return { suspicious: true, country: data?.country, reason: `Datacenter IP detected by IPInfo: ${provider}` };
      }
    }
    
    // Check for blocked country
    const country = data?.country;
    if (country && BLOCKED_COUNTRIES.includes(country as any)) {
      return { suspicious: true, country, reason: `Blocked country detected by IPInfo: ${country}` };
    }
    
    return { suspicious: false, country };
  } catch (error) {
    console.error('IPInfo error:', error);
    return { suspicious: false };
  }
}

/**
 * Main function to check if IP is suspicious
 * Uses all three APIs and combines results
 */
export async function isSuspiciousIP(): Promise<IPCheckResult> {
  const reasons: string[] = [];
  let isSuspicious = false;
  let detectedCountry: string | undefined;
  
  try {
    // Get user's IP
    const ip = await getUserIP();
    
    if (!ip) {
      // If we can't get IP, be conservative and mark as suspicious
      return {
        isSuspicious: true,
        reasons: ['Could not determine IP address'],
      };
    }
    
    if (CLOAKER_CONFIG.DEBUG) {
      console.log('Checking IP:', ip);
    }
    
    // Run all checks in parallel for speed
    const [proxyCheck, abstractCheck, ipInfoCheck] = await Promise.all([
      checkProxyCheck(ip),
      checkAbstractAPI(ip),
      checkIPInfo(ip),
    ]);
    
    // Combine results
    if (proxyCheck.suspicious) {
      isSuspicious = true;
      reasons.push(proxyCheck.reason || 'ProxyCheck flagged');
      detectedCountry = proxyCheck.country;
    }
    
    if (abstractCheck.suspicious) {
      isSuspicious = true;
      reasons.push(abstractCheck.reason || 'AbstractAPI flagged');
      detectedCountry = detectedCountry || abstractCheck.country;
    }
    
    if (ipInfoCheck.suspicious) {
      isSuspicious = true;
      reasons.push(ipInfoCheck.reason || 'IPInfo flagged');
      detectedCountry = detectedCountry || ipInfoCheck.country;
    }
    
    if (!isSuspicious) {
      reasons.push('All IP checks passed');
    }
    
    return {
      isSuspicious,
      reasons,
      country: detectedCountry,
    };
  } catch (error) {
    console.error('Error checking IP:', error);
    // On error, be conservative and mark as suspicious
    return {
      isSuspicious: true,
      reasons: ['Error during IP check'],
    };
  }
}
