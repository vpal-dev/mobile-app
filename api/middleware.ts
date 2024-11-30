import { NextRequest, NextResponse } from 'next/server'
import { createClient } from "@supabase/supabase-js"
import { setUserHeaders } from './utils/user-headers';

const supabase = createClient(
  String(process.env.SUPABASE_URL),
  String(process.env.SUPABASE_ANON_KEY)
);

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  const token = req.headers.get("Authorization")?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized: No token provided' }, { status: 401 });
  }

  const { data: { user }, error } = await supabase.auth.getUser(token);

  if (error) {
    return NextResponse.json({ error: 'Unauthorized: Invalid token' }, { status: 401 });
  }

  if (user) {
    // set headers
    setUserHeaders(res, user);
  } else {
    return NextResponse.json({ error: 'unable to get user' }, { status: 401 });
  }

  return res
}

export const config = {
  matcher: ['/api/:path*']
}
