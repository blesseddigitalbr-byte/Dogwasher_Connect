"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { signUpSchema, signInSchema } from "@/lib/validation/auth";

export type ActionResult = { error: string } | { error: null };

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
  });

  if (authError || !authData.user) {
    return { error: authError?.message ?? "Não foi possível criar a conta." };
  }

  const userId = authData.user.id;

  const { error: userInsertError } = await supabase.from("users").insert({
    id: userId,
    email,
    role,
  });

  if (userInsertError) {
    return { error: userInsertError.message };
  }

  if (role === "professional") {
    const { error } = await supabase.from("professional_profiles").insert({
      user_id: userId,
      full_name: fullNameOrRazaoSocial,
      status: "cadastro_incompleto",
    });
    if (error) return { error: error.message };
  } else {
    const { error } = await supabase.from("establishments").insert({
      owner_user_id: userId,
      razao_social: fullNameOrRazaoSocial,
      documento: "", // completado no onboarding
      status: "cadastro_incompleto",
    });
    if (error) return { error: error.message };
  }

  await supabase.from("terms_acceptances").insert({
    user_id: userId,
    document_type: "termos_uso",
    version: "v1",
    origin: "criar_conta",
  });

  redirect(
    role === "professional"
      ? "/profissional/onboarding"
      : "/estabelecimento/onboarding"
  );
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

  switch (userRow?.role) {
    case "admin":
      redirect("/admin/dashboard");
    case "establishment_owner":
      redirect("/estabelecimento/dashboard");
    default:
      redirect("/profissional/dashboard");
  }
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
