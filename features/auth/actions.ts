"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { signUpSchema, signInSchema } from "@/lib/validation/auth";

export type ActionResult = {
  error: string | null;
  redirectTo?: string;
};

/**
 * Cria o usuário no Supabase Auth + registro em public.users +
 * o esqueleto do perfil (professional_profiles ou establishments)
 * já em status "cadastro_incompleto".
 *
 * Também grava o aceite dos Termos de Uso (terms_acceptances),
 * conforme regra de negócio aprovada no documento mestre.
 */
export async function signUp(formData: FormData): Promise<ActionResult> {
  const parsed = signUpSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    role: formData.get("role"),
    fullNameOrRazaoSocial: formData.get("fullNameOrRazaoSocial"),
    acceptedTerms: formData.get("acceptedTerms") === "on",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  }

  const { email, password, role, fullNameOrRazaoSocial } = parsed.data;
  const supabase = await createClient();

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        role,
        full_name_or_razao_social: fullNameOrRazaoSocial,
      },
    },
  });

  if (authError || !authData.user) {
    return { error: authError?.message ?? "Não foi possível criar a conta." };
  }

  return {
    error: null,
    redirectTo:
      role === "professional"
        ? "/profissional/onboarding"
        : "/estabelecimento/onboarding",
  };
}

export async function signIn(formData: FormData): Promise<ActionResult> {
  const parsed = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  }

  const supabase = await createClient();
  const { error, data } = await supabase.auth.signInWithPassword(parsed.data);

  if (error || !data.user) {
    return { error: "E-mail ou senha incorretos." };
  }

  const { data: userRow } = await supabase
    .from("users")
    .select("role")
    .eq("id", data.user.id)
    .single();

  const redirectTo =
    userRow?.role === "admin"
      ? "/admin/dashboard"
      : userRow?.role === "establishment_owner"
        ? "/estabelecimento/dashboard"
        : "/profissional/dashboard";

  return { error: null, redirectTo };
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
