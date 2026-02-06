import { NextRequest, NextResponse } from 'next/server';

const FACEBOOK_PARAM_PASS = 'Zkxidj6qY8JKKyK';

const domainMap: Record<string, string> = {
  'as.todaymoneyclub.com': 'v1',
};

export function middleware(req: NextRequest) {

  const { nextUrl } = req;
  const url = nextUrl.toString() || '';
  const host = nextUrl.hostname.toLowerCase() || '';
  const domainId = domainMap[host] || 'v1';
  const searchParams = nextUrl.searchParams;

  const requestHeaders = new Headers(req.headers);

  requestHeaders.set('x-url', url);
  requestHeaders.set('x-host', host);
  requestHeaders.set('x-domain-id', domainId);

  const catParam = searchParams.get('cat');

  if (catParam === FACEBOOK_PARAM_PASS) {

    searchParams.delete('cat');
    const newUrl = req.nextUrl.clone();
    newUrl.search = searchParams.toString();
  
    const response = NextResponse.redirect(newUrl, { status: 302 });
    
    response.cookies.set({
      name: 'cat_valid',
      value: '1',
      path: '/',
      maxAge: 60 * 60 * 72,
      httpOnly: false,
    });
  
    return response;
  
  };

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

};

export const config = {
  matcher: ["/:path*"],
};