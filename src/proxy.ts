import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

const PROTECTED_PREFIXES = ["/seeker", "/employer"];

/**
 * Refresh session Supabase dan menjaga route terproteksi.
 *
 * Sprint 1: saat environment Supabase belum diisi, middleware menjadi
 * pass-through (mode mock) sehingga preview tetap berjalan.
 * Role guard aktif otomatis begitu Supabase dikonfigurasi (Sprint 2).
 */
export async function proxy(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  let response = NextResponse.next({ request });

  if (!supabaseUrl || !supabaseKey) {
    return response;
  }

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

  const { pathname } = request.nextUrl;
  const isProtected = PROTECTED_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );

  if (isProtected && !user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (user && isProtected) {
    const role = (user.user_metadata as { role?: string } | null)?.role;

    if (pathname.startsWith("/employer") && role !== "EMPLOYER") {
      const target = request.nextUrl.clone();
      target.pathname = "/seeker/dashboard";
      target.search = "";
      return NextResponse.redirect(target);
    }

    if (pathname.startsWith("/seeker") && role !== "JOB_SEEKER") {
      const target = request.nextUrl.clone();
      target.pathname = "/employer/dashboard";
      target.search = "";
      return NextResponse.redirect(target);
    }
  }

  return response;
}

export const config = {
  matcher: ["/seeker/:path*", "/employer/:path*"],
};
