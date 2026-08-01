import Link from "next/link";
import { PageShell } from "@/components/ui/page-shell";
import { createClient } from "@/lib/supabase/server";
import { professionalNavItems } from "@/features/professional/nav";
import { establishmentName, formatDate, formatMoney } from "@/features/professional/format";

export default async function AgendaProfissionalPage() {
  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getUser();

  const { data: profile } = authData.user
    ? await supabase.from("professional_profiles").select("id").eq("user_id", authData.user.id).single()
    : { data: null };

  const { data: accepted } = profile?.id
    ? await supabase
        .from("opportunity_applications")
        .select("id,opportunities(id,title,service_type,starts_at,value_cents,establishments(nome_fantasia,razao_social))")
        .eq("professional_id", profile.id)
        .eq("status", "accepted")
        .order("created_at", { ascending: false })
    : { data: [] };

  return (
    <PageShell
      title="Agenda do profissional"
      subtitle="Organize os trabalhos confirmados e acompanhe sua próxima diária."
      navItems={professionalNavItems}
    >
      <div className="grid gap-5 lg:grid-cols-[0.7fr_1.3fr]">
        <aside className="rounded-[18px] border border-[#dbe3ef] bg-white p-5 shadow-sm">
          <p className="text-xs font-black uppercase tracking-wide text-[var(--dw-orange-muted)]">
            Hoje
          </p>
          <h2 className="mt-2 text-4xl font-black text-[#071426]">
            {new Intl.DateTimeFormat("pt-BR", { day: "2-digit" }).format(new Date())}
          </h2>
          <p className="mt-1 text-sm text-[#4d5b6f]">
            {new Intl.DateTimeFormat("pt-BR", { weekday: "long", month: "long" }).format(new Date())}
          </p>
        </aside>

        <section className="grid gap-4">
          {accepted?.length ? (
            accepted.map((application) => {
              const opportunity = Array.isArray(application.opportunities)
                ? application.opportunities[0]
                : application.opportunities;
              return (
                <Link
                  key={application.id}
                  href={opportunity?.id ? `/profissional/trabalhos/${opportunity.id}` : "/profissional/trabalhos"}
                  className="rounded-[18px] border border-[#dbe3ef] bg-white p-5 shadow-sm"
                >
                  <p className="text-xs font-black uppercase tracking-wide text-[var(--dw-orange-muted)]">
                    {opportunity?.service_type ?? "Trabalho confirmado"}
                  </p>
                  <h2 className="mt-2 text-xl font-black text-[#071426]">{opportunity?.title ?? "Atendimento"}</h2>
                  <p className="mt-2 text-sm text-[#4d5b6f]">
                    {establishmentName(opportunity?.establishments)} •{" "}
                    {opportunity?.starts_at ? formatDate(opportunity.starts_at) : "Horário a confirmar"}
                  </p>
                  <p className="mt-3 font-black text-[#071426]">
                    {opportunity?.value_cents ? formatMoney(opportunity.value_cents) : "Valor a combinar"}
                  </p>
                </Link>
              );
            })
          ) : (
            <div className="rounded-[18px] border border-dashed border-[#c8d3e2] bg-white p-8 text-center shadow-sm">
              <p className="font-black text-[#071426]">Nenhum trabalho confirmado ainda.</p>
              <p className="mt-2 text-sm text-[#4d5b6f]">Quando uma candidatura for aceita, ela aparecerá aqui.</p>
            </div>
          )}
        </section>
      </div>
    </PageShell>
  );
}
