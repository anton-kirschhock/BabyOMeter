import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')

    if (code) {
        const supabase = createRouteHandlerClient({ cookies })
        const res = await supabase.auth.exchangeCodeForSession(code)
        if (res.error != null && res.data.session != null) {
            await supabase.auth.setSession(res.data.session);
        } else {
            return NextResponse.redirect(process.env.NEXT_PUBLIC_APPURL + '/login?AuthFailed=1')
        }
    }

    // URL to redirect to after sign in process completes
    return NextResponse.redirect(requestUrl.origin)
}