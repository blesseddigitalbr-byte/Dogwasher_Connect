import Link from "next/link";
import { PageShell } from "@/components/ui/page-shell";
import { createClient } from "@/lib/supabase/server";
import { professionalNavItems } from "@/features/professional/nav";
import { establishmentName, formatDate, formatMoney, statusLabel } from "@/features/professional/format";

export default async function CandidaturasPage() {
  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getUser();

  const { data: profile } = authData.user
    ? await supabase
        .from("professional_profiles")
        .select("id")
        .eq("user_id", authData.user.id)
        .single()
    : { data: null };

  const { data: applications } = profile?.id
    ? await supabase
        .from("opportunity_applications")
        .select(
          "id,status,message,created_at,opportunities(id,title,service_type,starts_at,value_cents,establishments(nome_fantasia,razao_social))"
        )
        .eq("professional_id", profile.id)
        .order("created_at", { ascending: false })
    : { data: [] };

  return (
    <PageShell
      title="Minhas candidaturas"
      subtitle="Acompanhe onde você se candidatou e o andamento das respostas dos estabelecimentos."
      navItems={professionalNavItems}
    >
      <section className="grid gap-4">
        {applications?.length ? (
          applications.map((application) => {
            const opportunity = Array.isArray(application.opportunities)
              ? application.opportunities[0]
              : application.opportunities;
            return (
              <article key={application.id} className="rounded-[18px] border border-[#dbe3ef] bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-wide text-[var(--dw-orange-muted)]">
                      {opportunity?.service_type ?? "Oportunidade"}
                    </p>
                    <h2 className="mt-2 text-xl font-black text-[#071426]">{opportunity?.title ?? "Vaga"}</h2>
                    <p className="mt-2 text-sm text-[#4d5b6f]">
                      {establishmentName(opportunity?.establishments)} •{" "}
                      {opportunity?.starts_at ? formatDate(opportunity.starts_at) : "Data a confirmar"}
                    </p>
                  </div>
                  <div className="text-left md:text-right">
                    <span className="inline-flex rounded-full bg-[var(--dw-orange-soft)] px-3 py-1 text-xs font-black text-[var(--dw-orange-muted)]">
                      {statusLabel(application.status)}
                    </span>
                    <p className="mt-3 text-lg font-black text-[#071426]">
                      {opportunity?.value_cents ? formatMoney(opportunity.value_cents) : "Valor a combinar"}
                    </p>
                  </div>
                </div>
                {opportunity?.id && (
                  <Link
                    href={`/profissional/oportunidades/${opportunity.id}`}
                    className="mt-5 inline-flex text-sm font-black text-[var(--dw-orange-muted)]"
                  >
                    Ver oportunidade
                  </Link>
                )}
              </article>
            );
          })
        ) : (
          <EmptyState
            title="Você ainda não se candidatou."
            text="Busque oportunidades disponíveis e envie sua primeira candidatura."
            href="/profissional/oportunidades"
            action="Ver oportunidades"
          />
        )}
      </section>
    </PageShell>
  );
}

function EmptyState({ title, text, href, action }: { title: string; text: string; href: string; action: string }) {
  return (
    <div className="rounded-[18px] border border-dashed border-[#c8d3e2] bg-white p-8 text-center shadow-sm">
      <p className="font-black text-[#071426]">{title}</p>
      <p className="mt-2 text-sm text-[#4d5b6f]">{text}</p>
      <Link href={href} className="mt-5 inline-flex rounded-xl bg-[var(--dw-orange)] px-4 py-3 text-sm font-black text-[#061426]">
        {action}
      </Link>
    </div>
  );
}
