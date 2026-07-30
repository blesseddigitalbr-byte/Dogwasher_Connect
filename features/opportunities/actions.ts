"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type OpportunityActionResult = { error: string } | { error: null };

function text(value: FormDataEntryValue | null) {
  return String(value ?? "").trim();
}

function moneyToCents(value: FormDataEntryValue | null) {
  const normalized = text(value).replace(/\./g, "").replace(",", ".");
  const amount = Number(normalized);
  if (!Number.isFinite(amount) || amount < 0) return null;
  return Math.round(amount * 100);
}

export async function createOpportunity(
  _previousState: OpportunityActionResult,
  formData: FormData
): Promise<OpportunityActionResult> {
  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getUser();

  if (!authData.user) {
    return { error: "Sessão expirada. Entre novamente para publicar." };
  }

  const title = text(formData.get("title"));
  const serviceType = text(formData.get("service_type"));
  const startsAt = text(formData.get("starts_at"));
  const endsAt = text(formData.get("ends_at"));
  const description = text(formData.get("description"));
  const unitId = text(formData.get("unit_id"));
  const valueCents = moneyToCents(formData.get("value"));
  const slots = Number(formData.get("slots") ?? 1);

  if (!title || !serviceType || !startsAt || valueCents === null) {
    return { error: "Preencha título, serviço, data/horário e valor." };
  }

  const { data: establishment, error: establishmentError } = await supabase
    .from("establishments")
    .select("id")
    .eq("owner_user_id", authData.user.id)
    .single();

  if (establishmentError || !establishment) {
    return {
      error:
        establishmentError?.message ??
        "Não foi possível localizar o estabelecimento desta conta.",
    };
  }

  const { error } = await supabase.from("opportunities").insert({
    establishment_id: establishment.id,
    unit_id: unitId || null,
    created_by: authData.user.id,
    title,
    service_type: serviceType,
    starts_at: new Date(startsAt).toISOString(),
    ends_at: endsAt ? new Date(endsAt).toISOString() : null,
    value_cents: valueCents,
    slots: Number.isFinite(slots) && slots > 0 ? slots : 1,
    description,
    status: "published",
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/estabelecimento/oportunidades");
  revalidatePath("/profissional/oportunidades");
  redirect("/estabelecimento/oportunidades");
}

export async function applyToOpportunity(
  _previousState: OpportunityActionResult,
  formData: FormData
): Promise<OpportunityActionResult> {
  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getUser();

  if (!authData.user) {
    return { error: "Sessão expirada. Entre novamente para se candidatar." };
  }

  const opportunityId = text(formData.get("opportunity_id"));
  const message = text(formData.get("message"));

  if (!opportunityId) {
    return { error: "Oportunidade inválida." };
  }

  const { data: profile, error: profileError } = await supabase
    .from("professional_profiles")
    .select("id")
    .eq("user_id", authData.user.id)
    .single();

  if (profileError || !profile) {
    return {
      error:
        profileError?.message ??
        "Complete seu perfil profissional antes de se candidatar.",
    };
  }

  const { error } = await supabase.from("opportunity_applications").insert({
    opportunity_id: opportunityId,
    professional_id: profile.id,
    message,
    status: "pending",
  });

  if (error) {
    if (error.code === "23505") {
      return { error: "Você já se candidatou a esta oportunidade." };
    }
    return { error: error.message };
  }

  revalidatePath("/profissional/oportunidades");
  revalidatePath(`/profissional/oportunidades/${opportunityId}`);
  redirect("/profissional/oportunidades");
}

export async function reviewApplication(formData: FormData) {
  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getUser();

  if (!authData.user) {
    redirect("/login");
  }

  const applicationId = text(formData.get("application_id"));
  const opportunityId = text(formData.get("opportunity_id"));
  const decision = text(formData.get("decision"));

  if (!applicationId || !opportunityId || !["accepted", "declined"].includes(decision)) {
    redirect("/estabelecimento/oportunidades");
  }

  const { data: opportunity } = await supabase
    .from("opportunities")
    .select("id,establishment_id,establishments(owner_user_id)")
    .eq("id", opportunityId)
    .single();

  const owner = Array.isArray(opportunity?.establishments)
    ? opportunity.establishments[0]
    : opportunity?.establishments;

  if (!opportunity || owner?.owner_user_id !== authData.user.id) {
    redirect("/estabelecimento/oportunidades");
  }

  await supabase
    .from("opportunity_applications")
    .update({
      status: decision,
      updated_at: new Date().toISOString(),
    })
    .eq("id", applicationId)
    .eq("opportunity_id", opportunityId);

  if (decision === "accepted") {
    await supabase
      .from("opportunities")
      .update({
        status: "filled",
        updated_at: new Date().toISOString(),
      })
      .eq("id", opportunityId);
  }

  revalidatePath("/estabelecimento/oportunidades");
  revalidatePath(`/estabelecimento/oportunidades/${opportunityId}`);
  revalidatePath("/profissional/agenda");
  revalidatePath("/profissional/trabalhos");
  redirect(`/estabelecimento/oportunidades/${opportunityId}`);
}
