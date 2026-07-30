import { PageShell } from "@/components/ui/page-shell";
import { createClient } from "@/lib/supabase/server";
import { CreateOpportunityForm } from "@/features/opportunities/create-opportunity-form";

const navItems = [
  { href: "/estabelecimento/dashboard", label: "Home", icon: "H" },
  { href: "/estabelecimento/oportunidades", label: "Vagas", icon: "V" },
  { href: "/estabelecimento/onboarding", label: "Perfil", icon: "P" },
  { href: "/admin/dashboard", label: "Admin", icon: "D" },
];

export default async function NovaOportunidadePage() {
  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getUser();

  const { data: establishment } = authData.user
    ? await supabase
        .from("establishments")
        .select("id")
        .eq("owner_user_id", authData.user.id)
        .single()
    : { data: null };

  const { data: units } = establishment?.id
    ? await supabase
        .from("establishment_units")
        .select("id,nome,cidade,estado")
        .eq("establishment_id", establishment.id)
        .order("created_at", { ascending: true })
    : { data: [] };

  return (
    <PageShell
      title="Nova oportunidade"
      subtitle="Defina data, horário, valor e escopo para encontrar o profissional certo."
      navItems={navItems}
    >
      <section className="max-w-3xl rounded-[20px] border border-[#dbe3ef] bg-white p-5 shadow-sm md:p-7">
        <CreateOpportunityForm units={units ?? []} />
      </section>
    </PageShell>
  );
}
