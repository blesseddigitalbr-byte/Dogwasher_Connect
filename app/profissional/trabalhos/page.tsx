import Link from "next/link";
import { PageShell } from "@/components/ui/page-shell";
import { createClient } from "@/lib/supabase/server";
import { professionalNavItems } from "@/features/professional/nav";
import { establishmentName, formatDate, formatMoney, statusLabel } from "@/features/professional/format";

export default async function TrabalhosProfissionalPage() {
  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getUser();

  const { data: profile } = authData.user
    ? await supabase.from("professional_profiles").select("id").eq("user_id", authData.user.id).single()
    : { data: null };

  const { data: applications } = profile?.id
    ? await supabase
        .from("opportunity_applications")
        .select("id,status,opportunities(id,title,service_type,starts_at,value_cents,establishments(nome_fantasia,razao_social))")
        .eq("professional_id", profile.id)
        .in("status", ["accepted", "pending"])
        .order("created_at", { ascending: false })
    : { data: [] };

  return (
    <PageShell
      title="Meus trabalhos"
      subtitle="Histórico operacional das oportunidades em andamento, confirmadas e candidaturas recentes."
      navItems={professionalNavItems}
    >
      <section className="grid gap-4">
        {applications?.length ? (
          applications.map((application) => {
            const opportunity = Array.isArray(application.opportunities)
              ? application.opportunities[0]
              : application.opportunities;
            return (
              <Link
                key={application.id}
                href={opportunity?.id ? `/profissional/trabalhos/${opportunity.id}` : "/profissional/trabalhos"}
                className="rounded-[18px] border border-[#dbe3ef] bg-white p-5 shadow-sm"
              >
                <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
                  <div>
                    <p className="text-xs font-black uppercase tracking-wide text-[var(--dw-orange-muted)]">
                      {statusLabel(application.status)}
                    </p>
                    <h2 className="mt-2 text-xl font-black text-[#071426]">{opportunity?.title ?? "Trabalho"}</h2>
                    <p className="mt-2 text-sm text-[#4d5b6f]">
                      {establishmentName(opportunity?.establishments)} •{" "}
                      {opportunity?.starts_at ? formatDate(opportunity.starts_at) : "Data a confirmar"}
                    </p>
                  </div>
                  <p className="font-black text-[#071426]">
                    {opportunity?.value_cents ? formatMoney(opportunity.value_cents) : "Valor a combinar"}
                  </p>
                </div>
              </Link>
            );
          })
        ) : (
          <Empty />
        )}
      </section>
    </PageShell>
  );
}

function Empty() {
  return (
    <div className="rounded-[18px] border border-dashed border-[#c8d3e2] bg-white p-8 text-center shadow-sm">
      <p className="font-black text-[#071426]">Nenhum trabalho registrado ainda.</p>
      <p className="mt-2 text-sm text-[#4d5b6f]">Candidaturas e trabalhos aceitos aparecerão aqui.</p>
    </div>
  );
}
