import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from './app/auth';
 
export async function middleware(request: NextRequest) {
  let currentUser = request.cookies.get('currentUser')?.value
  if(!currentUser) {
    const session = await auth();
    if(session?.user?.email) request.cookies.set('currentUser', session.user.email);
  }
  currentUser = request.cookies.get('currentUser')?.value

  //console.log('middleware session', session);
  console.log('middleware currentUser', currentUser);
  console.log('request', request);
 
  if (currentUser) {
    console.log('middleware passthrough');
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL('/sign-in', request.url))
}
 
export const config = {
  matcher: [{
    source: '/((?!api|playground|sign-in|_next/static|_next/image|.*\\.png$).*)',
    missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    }]
}