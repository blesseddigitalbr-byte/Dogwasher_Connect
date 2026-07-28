import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Renova a sessão do Supabase em cada requisição e aplica os guards de
 * rota por role. Chamado a partir de middleware.ts na raiz do projeto.
 */
export async function updateSession(request: NextRequest) {
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
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
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
