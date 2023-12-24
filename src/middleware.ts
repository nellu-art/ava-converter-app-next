import { NextRequest, NextResponse } from 'next/server'

const API_KEY = process.env.API_KEY

// Limit the middleware to paths starting with `/api/`
export const config = {
  matcher: ['/converter'],
}

export function middleware(request: NextRequest) {
  if (!authenticateKey(request)) {
    return NextResponse.redirect(new URL('/error', request.url))
  }
}

function authenticateKey(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')

  if (!token) {
    return false
  }

  if (token !== API_KEY) {
    return false
  }

  return true
}
