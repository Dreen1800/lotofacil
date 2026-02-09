export function isFacebookOrInstagramBrowser(headers: Headers, url?: string): boolean {

  const referer = headers.get('referer')?.toLowerCase() || '';
  const userAgent = headers.get('User-Agent')?.toLowerCase() || '';
  const requestedWith = headers.get('X-Requested-With')?.toLowerCase() || '';

  let score = 0;

  // USER AGENT VERIFY
  if (/fb_iab|fbav|instagram|iabmv|fban/i.test(userAgent)) {
    score += 2;
  };

  // REQUESTED VERIFY
  if (requestedWith.includes('com.facebook.katana') || requestedWith.includes('com.instagram.android')) {
    score += 2;
  };

  // REFFERER VERIFY
  if (referer.includes('facebook.com') || referer.includes('instagram.com')) {
    score += 1;
  };

  // PARAMS VERIFY
  if (url) {
    const searchParams = new URL(url).searchParams;
    if (searchParams.has('fbclid') || searchParams.has('igshid')) {
      score += 1;
    };
  };

  // THRESHOLD
  return score >= 1;

};