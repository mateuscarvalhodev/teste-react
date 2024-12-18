import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'

async function handleRedirect(returnUrl: string, redirectTo: string, redirectPath: string): Promise<NextResponse> {
  const response = NextResponse.redirect(`${redirectTo}${redirectPath}`)
  response.cookies.set('returnUrl', returnUrl, { path: '/' })
  return response
}

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')

  if (accessToken && request.nextUrl.pathname === '/') {
    return NextResponse.redirect(`${request.nextUrl.origin}/dashboard`)
  }

  if (!accessToken && request.nextUrl.pathname !== '/') {
    return handleRedirect(request.url, request.nextUrl.origin, '/')
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',                 
    '/dashboard/:path*', 
    '/profile/:path*',   
    '/admin/:path*',     
    
  ],
}
