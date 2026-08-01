"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function text(value: FormDataEntryValue | null) {
  return String(value ?? "").trim();
}

export async function registerWorkEvent(formData: FormData) {
  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getUser();

  if (!authData.user) {
    redirect("/login");
  }

  const executionId = text(formData.get("execution_id"));
  const opportunityId = text(formData.get("opportunity_id"));
  const eventType = text(formData.get("event_type"));

  if (!executionId || !opportunityId || !["check_in", "check_out"].includes(eventType)) {
    redirect("/profissional/trabalhos");
  }

  const now = new Date().toISOString();

  await supabase.from("work_execution_events").insert({
    execution_id: executionId,
    actor_id: authData.user.id,
    event_type: eventType,
  });

  if (eventType === "check_in") {
    await supabase
      .from("work_executions")
      .update({
        status: "checked_in",
        checked_in_at: now,
        updated_at: now,
      })
      .eq("id", executionId);
  }

  if (eventType === "check_out") {
    await supabase
      .from("work_executions")
      .update({
        status: "checked_out",
        checked_out_at: now,
        updated_at: now,
      })
      .eq("id", executionId);
  }

  revalidatePath("/profissional/agenda");
  revalidatePath("/profissional/trabalhos");
  revalidatePath(`/profissional/trabalhos/${opportunityId}`);
  redirect(`/profissional/trabalhos/${opportunityId}`);
}
