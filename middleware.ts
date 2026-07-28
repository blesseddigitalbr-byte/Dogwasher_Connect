import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Middleware de sessão + guards de rota por role.
 *
 * A lógica fica inteiramente neste arquivo (em vez de importada de
 * lib/supabase/middleware.ts) porque o bundler de Edge Function da
 * Vercel, em alguns casos, falha ao resolver imports via alias ("@/...")
 * dentro do middleware raiz, retornando o erro:
 *   "Edge Function 'middleware' is referencing unsupported modules"
 * Mantendo tudo em um único arquivo sem alias, evitamos esse problema.
 */
export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
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
    }
  );

  const { data } = await supabase.auth.getUser();
  const user = data.user;

  const path = request.nextUrl.pathname;
  const isProtected =
    path.startsWith("/profissional") ||
    path.startsWith("/estabelecimento") ||
    path.startsWith("/admin");

  if (isProtected && !user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Guard por role: cada área só é acessível pelo perfil correspondente.
  if (isProtected && user) {
    const { data: userRow } = await supabase
      .from("users")
      .select("role")
      .eq("id", user.id)
      .single();

    const role = userRow?.role;

    if (path.startsWith("/admin") && role !== "admin") {
      return NextResponse.redirect(new URL("/profissional/dashboard", request.url));
    }
    if (path.startsWith("/profissional") && role !== "professional" && role !== "admin") {
      return NextResponse.redirect(new URL("/estabelecimento/dashboard", request.url));
    }
    if (path.startsWith("/estabelecimento") && role !== "establishment_owner" && role !== "admin") {
      return NextResponse.redirect(new URL("/profissional/dashboard", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
