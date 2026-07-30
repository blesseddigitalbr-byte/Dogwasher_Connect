import { PageShell } from "@/components/ui/page-shell";
import { createClient } from "@/lib/supabase/server";
import { EstablishmentOnboardingForm } from "@/features/onboarding/establishment-onboarding-form";

const navItems = [
  { href: "/estabelecimento/dashboard", label: "Home", icon: "H" },
  { href: "/estabelecimento/busca", label: "Busca", icon: "B" },
  { href: "/estabelecimento/onboarding", label: "Perfil", icon: "P" },
  { href: "/admin/dashboard", label: "Admin", icon: "D" },
];

export default async function OnboardingEstabelecimentoPage() {
  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getUser();

  const { data: establishment } = authData.user
    ? await supabase
        .from("establishments")
        .select("id,nome_fantasia,documento")
        .eq("owner_user_id", authData.user.id)
        .single()
    : { data: null };

  const { data: unit } = establishment?.id
    ? await supabase
        .from("establishment_units")
        .select("endereco,cidade,estado")
        .eq("establishment_id", establishment.id)
        .limit(1)
        .maybeSingle()
    : { data: null };

  return (
    <PageShell
      title="Cadastre sua empresa"
      subtitle="Documentos e fotos da unidade são analisados antes da liberação para publicar oportunidades."
      navItems={navItems}
    >
      <section className="max-w-2xl rounded-[28px] border border-white/10 bg-[#0a2138] p-5 md:p-7">
        <EstablishmentOnboardingForm
          defaultValues={{
            nome_fantasia: establishment?.nome_fantasia,
            documento: establishment?.documento,
            endereco: unit?.endereco,
            cidade: unit?.cidade,
            estado: unit?.estado,
          }}
        />
      </section>
    </PageShell>
  );
}
