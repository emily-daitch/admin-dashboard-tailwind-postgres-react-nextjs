import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('currentUser')?.value
  console.log('middleware currentUser2', currentUser);
 
  if (currentUser) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  return NextResponse.redirect(new URL('/login', request.url))
}
 
export const config = {
  matcher: [{
    source: '/((?!api|_next/static|_next/image|.*\\.png$).*)',
    missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    }]
}