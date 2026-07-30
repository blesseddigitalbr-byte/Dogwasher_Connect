import { notFound } from "next/navigation";
import { PageShell } from "@/components/ui/page-shell";
import { createClient } from "@/lib/supabase/server";
import { professionalNavItems } from "@/features/professional/nav";
import { establishmentName, formatDate, formatMoney } from "@/features/professional/format";

export default async function TrabalhoDetalhePage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const supabase = await createClient();

  const { data: opportunity } = await supabase
    .from("opportunities")
    .select("id,title,service_type,description,starts_at,ends_at,value_cents,establishments(nome_fantasia,razao_social)")
    .eq("id", id)
    .single();

  if (!opportunity) notFound();

  return (
    <PageShell
      title="Execução do trabalho"
      subtitle={`${opportunity.title} • ${establishmentName(opportunity.establishments)}`}
      navItems={professionalNavItems}
    >
      <div className="grid gap-5 lg:grid-cols-[1fr_380px]">
        <section className="rounded-[18px] border border-[#dbe3ef] bg-white p-5 shadow-sm">
          <p className="text-xs font-black uppercase tracking-wide text-[var(--dw-orange-muted)]">
            Check-in geolocalizado
          </p>
          <h2 className="mt-2 text-2xl font-black text-[#071426]">{opportunity.service_type}</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <Info label="Início" value={formatDate(opportunity.starts_at)} />
            <Info label="Fim" value={opportunity.ends_at ? formatDate(opportunity.ends_at) : "A combinar"} />
            <Info label="Valor" value={formatMoney(opportunity.value_cents)} />
          </div>
          <div className="mt-5 rounded-2xl border border-[#dbe3ef] bg-[#f8fafc] p-5">
            <p className="font-black text-[#071426]">Escopo</p>
            <p className="mt-2 text-sm leading-6 text-[#4d5b6f]">
              {opportunity.description || "Escopo detalhado ainda não informado."}
            </p>
          </div>
        </section>

        <aside className="rounded-[18px] border border-[#dbe3ef] bg-white p-5 shadow-sm">
          <p className="font-black text-[#071426]">Controle de presença</p>
          <p className="mt-2 text-sm leading-6 text-[#4d5b6f]">
            A etapa real de QR Code/geolocalização será conectada na próxima fase. Por enquanto,
            esta tela já organiza a jornada operacional.
          </p>
          <button className="mt-5 w-full rounded-xl bg-[var(--dw-orange)] px-4 py-3 text-sm font-black text-[#061426]">
            Registrar check-in
          </button>
          <button className="mt-3 w-full rounded-xl border border-[#dbe3ef] bg-white px-4 py-3 text-sm font-black text-[#071426]">
            Registrar check-out
          </button>
        </aside>
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
