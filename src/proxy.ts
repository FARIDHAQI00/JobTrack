import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import type { UserRole } from "@/domain/user";
import { canAccessPath, dashboardPathForRole } from "@/lib/auth/access";
import {
  decodeDemoSession,
  DEMO_SESSION_COOKIE,
} from "@/lib/auth/session-codec";

/**
 * Menjaga route terproteksi (/seeker, /employer).
 *
 * Supabase mode: refresh session + baca role dari metadata.
 * Demo mode: baca cookie session demo (simulasi PRD).
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/seeker") && !pathname.startsWith("/employer")) {
    return NextResponse.next({ request });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  let response = NextResponse.next({ request });
  let role: UserRole | null = null;
  let authenticated = false;

  if (supabaseUrl && supabaseKey) {
    const supabase = createServerClient(supabaseUrl, supabaseKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    });

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      authenticated = true;
      const metadata = user.user_metadata as { role?: string } | null;
      role = metadata?.role === "EMPLOYER" ? "EMPLOYER" : "JOB_SEEKER";
    }
  } else {
    const session = decodeDemoSession(
      request.cookies.get(DEMO_SESSION_COOKIE)?.value
    );
    if (session) {
      authenticated = true;
      role = session.role;
    }
  }

  if (!authenticated || !role) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.search = "";
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (!canAccessPath(role, pathname)) {
    const target = request.nextUrl.clone();
    target.pathname = dashboardPathForRole(role);
    target.search = "";
    return NextResponse.redirect(target);
  }

  return response;
}

export const config = {
  matcher: ["/seeker/:path*", "/employer/:path*"],
};
