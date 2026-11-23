import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl
  const code = searchParams.get('code')
  const requestedPath = searchParams.get('next') ?? '/'
  const nextPath = requestedPath.startsWith('/') && !requestedPath.startsWith('//') ? requestedPath : '/'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) return NextResponse.redirect(new URL(nextPath, origin))
  }

  return NextResponse.redirect(new URL('/?auth=error', origin))
}
