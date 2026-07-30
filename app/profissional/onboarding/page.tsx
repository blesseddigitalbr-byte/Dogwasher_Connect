import { PageShell } from "@/components/ui/page-shell";
import { createClient } from "@/lib/supabase/server";
import { ProfessionalOnboardingForm } from "@/features/onboarding/professional-onboarding-form";

export default async function OnboardingProfissionalPage() {
  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getUser();

  const { data: profile } = authData.user
    ? await supabase
        .from("professional_profiles")
        .select("formacao_declarada,cidade,estado,raio_atendimento_km")
        .eq("user_id", authData.user.id)
        .single()
    : { data: null };

  return (
    <PageShell
      title="Complete seu perfil"
      subtitle="Essas informações são revisadas pela equipe antes da liberação para candidaturas."
    >
      <section className="max-w-2xl rounded-[28px] border border-white/10 bg-[#0a2138] p-5 md:p-7">
        <ProfessionalOnboardingForm defaultValues={profile ?? {}} />
      </section>
    </PageShell>
  );
}
