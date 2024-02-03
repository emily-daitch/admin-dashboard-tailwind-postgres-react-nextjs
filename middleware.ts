import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('currentUser')?.value
  console.log('middleware currentUser2', currentUser);
 
  if (currentUser) {
    console.log('middleware pomodoro');
    return NextResponse.redirect(new URL('/pomodoro', request.url))
  }
  return NextResponse.redirect(new URL('/playground', request.url))
}
 
export const config = {
  matcher: [{
    source: '/((?!playground|api|_next/static|_next/image|.*\\.png$).*)',
    missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    }]
}