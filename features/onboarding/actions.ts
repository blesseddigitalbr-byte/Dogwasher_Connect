"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type OnboardingActionResult = { error: string } | { error: null };

function requiredText(value: FormDataEntryValue | null) {
  return String(value ?? "").trim();
}

export async function saveProfessionalOnboarding(
  _previousState: OnboardingActionResult,
  formData: FormData
): Promise<OnboardingActionResult> {
  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getUser();

  if (!authData.user) {
    return { error: "Sessão expirada. Entre novamente para continuar." };
  }

  const formacao = requiredText(formData.get("formacao_declarada"));
  const cidade = requiredText(formData.get("cidade"));
  const estado = requiredText(formData.get("estado")).toUpperCase();
  const raio = Number(formData.get("raio_atendimento_km") ?? 10);

  if (!formacao || !cidade || !estado) {
    return { error: "Preencha formação, cidade e estado." };
  }

  const { error } = await supabase
    .from("professional_profiles")
    .update({
      formacao_declarada: formacao,
      cidade,
      estado,
      raio_atendimento_km: Number.isFinite(raio) ? raio : 10,
      status: "aguardando_verificacao",
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", authData.user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/profissional/dashboard");
  revalidatePath("/profissional/inicio");
  redirect("/profissional/dashboard");
}

export async function saveEstablishmentOnboarding(
  _previousState: OnboardingActionResult,
  formData: FormData
): Promise<OnboardingActionResult> {
  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getUser();

  if (!authData.user) {
    return { error: "Sessão expirada. Entre novamente para continuar." };
  }

  const nomeFantasia = requiredText(formData.get("nome_fantasia"));
  const documento = requiredText(formData.get("documento"));
  const endereco = requiredText(formData.get("endereco"));
  const cidade = requiredText(formData.get("cidade"));
  const estado = requiredText(formData.get("estado")).toUpperCase();

  if (!nomeFantasia || !documento || !endereco || !cidade || !estado) {
    return { error: "Preencha nome fantasia, documento, endereço, cidade e estado." };
  }

  const { data: establishment, error: establishmentError } = await supabase
    .from("establishments")
    .update({
      nome_fantasia: nomeFantasia,
      documento,
      status: "aguardando_verificacao",
      updated_at: new Date().toISOString(),
    })
    .eq("owner_user_id", authData.user.id)
    .select("id")
    .single();

  if (establishmentError || !establishment) {
    return {
      error:
        establishmentError?.message ??
        "Não foi possível localizar o estabelecimento desta conta.",
    };
  }

  const { data: existingUnit } = await supabase
    .from("establishment_units")
    .select("id")
    .eq("establishment_id", establishment.id)
    .limit(1)
    .maybeSingle();

  const unitPayload = {
    nome: nomeFantasia,
    endereco,
    cidade,
    estado,
    lat: 0,
    lng: 0,
    updated_at: new Date().toISOString(),
  };

  const { error: unitError } = existingUnit?.id
    ? await supabase
        .from("establishment_units")
        .update(unitPayload)
        .eq("id", existingUnit.id)
    : await supabase.from("establishment_units").insert({
        ...unitPayload,
        establishment_id: establishment.id,
      });

  if (unitError) {
    return { error: unitError.message };
  }

  revalidatePath("/estabelecimento/dashboard");
  revalidatePath("/estabelecimento/inicio");
  redirect("/estabelecimento/dashboard");
}
