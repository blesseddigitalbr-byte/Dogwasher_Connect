import { notFound } from "next/navigation";
import { PageShell } from "@/components/ui/page-shell";
import { createClient } from "@/lib/supabase/server";
import { reviewApplication } from "@/features/opportunities/actions";

const navItems = [
  { href: "/estabelecimento/dashboard", label: "Home", icon: "H" },
  { href: "/estabelecimento/oportunidades", label: "Vagas", icon: "V" },
  { href: "/estabelecimento/onboarding", label: "Perfil", icon: "P" },
  { href: "/admin/dashboard", label: "Admin", icon: "D" },
];

export default async function EstabelecimentoOportunidadeDetalhePage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const supabase = await createClient();

  const { data: opportunity } = await supabase
    .from("opportunities")
    .select("id,title,service_type,description,starts_at,ends_at,value_cents,slots,status")
    .eq("id", id)
    .single();

  if (!opportunity) notFound();

  const { data: applications } = await supabase
    .from("opportunity_applications")
    .select("id,status,message,created_at,professional_profiles(full_name,cidade,estado,formacao_declarada,status)")
    .eq("opportunity_id", id)
    .order("created_at", { ascending: true });

  return (
    <PageShell
      title={opportunity.title}
      subtitle={`${opportunity.service_type} • ${formatDate(opportunity.starts_at)}`}
      navItems={navItems}
    >
      <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <section className="rounded-[18px] border border-[#dbe3ef] bg-white p-5 shadow-sm">
          <p className="text-xs font-black uppercase tracking-wide text-[var(--dw-orange-muted)]">
            Status da oportunidade
          </p>
          <h2 className="mt-2 text-2xl font-black capitalize text-[#071426]">{opportunity.status}</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <Info label="Valor" value={formatMoney(opportunity.value_cents)} />
            <Info label="Vagas" value={String(opportunity.slots)} />
            <Info label="Início" value={formatDate(opportunity.starts_at)} />
            <Info label="Fim" value={opportunity.ends_at ? formatDate(opportunity.ends_at) : "A combinar"} />
          </div>
          <div className="mt-5 rounded-2xl border border-[#dbe3ef] bg-[#f8fafc] p-4">
            <p className="font-black text-[#071426]">Escopo</p>
            <p className="mt-2 text-sm leading-6 text-[#4d5b6f]">
              {opportunity.description || "Sem observações adicionais."}
            </p>
          </div>
        </section>

        <section className="rounded-[18px] border border-[#dbe3ef] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-black text-[#071426]">Candidatos</h2>
              <p className="text-sm text-[#4d5b6f]">Aceite ou recuse profissionais para esta diária.</p>
            </div>
            <span className="rounded-full bg-[#eef4fb] px-3 py-1 text-xs font-black text-[#4d5b6f]">
              {applications?.length ?? 0}
            </span>
          </div>

          <div className="mt-5 grid gap-4">
            {applications?.length ? (
              applications.map((application) => {
                const profile = Array.isArray(application.professional_profiles)
                  ? application.professional_profiles[0]
                  : application.professional_profiles;
                return (
                  <article key={application.id} className="rounded-2xl border border-[#dbe3ef] bg-[#f8fafc] p-4">
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div>
                        <p className="font-black text-[#071426]">{profile?.full_name ?? "Profissional"}</p>
                        <p className="mt-1 text-sm text-[#4d5b6f]">
                          {profile?.cidade ?? "Cidade"} / {profile?.estado ?? "UF"} • {profile?.formacao_declarada ?? "Formação em análise"}
                        </p>
                        {application.message && (
                          <p className="mt-3 text-sm leading-6 text-[#4d5b6f]">{application.message}</p>
                        )}
                      </div>
                      <span className="w-fit rounded-full bg-white px-3 py-1 text-xs font-black capitalize text-[#4d5b6f]">
                        {application.status}
                      </span>
                    </div>
                    {application.status === "pending" && (
                      <div className="mt-4 flex flex-col gap-2 md:flex-row">
                        <form action={reviewApplication}>
                          <input type="hidden" name="application_id" value={application.id} />
                          <input type="hidden" name="opportunity_id" value={opportunity.id} />
                          <input type="hidden" name="decision" value="accepted" />
                          <button className="w-full rounded-xl bg-[var(--dw-orange)] px-4 py-3 text-sm font-black text-[#061426] md:w-auto">
                            Aceitar profissional
                          </button>
                        </form>
                        <form action={reviewApplication}>
                          <input type="hidden" name="application_id" value={application.id} />
                          <input type="hidden" name="opportunity_id" value={opportunity.id} />
                          <input type="hidden" name="decision" value="declined" />
                          <button className="w-full rounded-xl border border-[#dbe3ef] bg-white px-4 py-3 text-sm font-black text-[#071426] md:w-auto">
                            Recusar
                          </button>
                        </form>
                      </div>
                    )}
                  </article>
                );
              })
            ) : (
              <div className="rounded-2xl border border-dashed border-[#c8d3e2] p-8 text-center">
                <p className="font-black text-[#071426]">Nenhum candidato ainda.</p>
                <p className="mt-2 text-sm text-[#4d5b6f]">Quando profissionais se candidatarem, eles aparecerão aqui.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </PageShell>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[#dbe3ef] bg-[#f8fafc] p-4">
      <p className="text-[10px] font-black uppercase tracking-wide text-[#637083]">{label}</p>
      <p className="mt-2 font-black text-[#071426]">{value}</p>
    </div>
  );
}

function formatMoney(valueCents: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valueCents / 100);
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" }).format(new Date(value));
}
