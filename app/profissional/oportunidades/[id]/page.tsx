import { notFound } from "next/navigation";
import { PageShell } from "@/components/ui/page-shell";
import { createClient } from "@/lib/supabase/server";
import { ApplyOpportunityForm } from "@/features/opportunities/apply-opportunity-form";
import { professionalNavItems } from "@/features/professional/nav";

export default async function DetalheOportunidadePage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const supabase = await createClient();

  const { data: opportunity } = await supabase
    .from("opportunities")
    .select(
      "id,title,service_type,description,starts_at,ends_at,value_cents,slots,establishments(nome_fantasia,razao_social)"
    )
    .eq("id", id)
    .eq("status", "published")
    .single();

  if (!opportunity) {
    notFound();
  }

  return (
    <PageShell
      title={opportunity.title}
      subtitle={`${establishmentName(opportunity.establishments)} • ${opportunity.service_type}`}
      navItems={professionalNavItems}
    >
      <div className="grid gap-5 lg:grid-cols-[1fr_380px]">
        <section className="rounded-[20px] border border-[#dbe3ef] bg-white p-5 shadow-sm md:p-7">
          <p className="text-xs font-black uppercase tracking-wide text-[var(--dw-orange)]">
            Detalhe da oportunidade
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <Info label="Início" value={formatDate(opportunity.starts_at)} />
            <Info label="Fim" value={opportunity.ends_at ? formatDate(opportunity.ends_at) : "A combinar"} />
            <Info label="Valor" value={formatMoney(opportunity.value_cents)} />
          </div>
          <div className="mt-6 rounded-2xl border border-[#dbe3ef] bg-[#f7f9fd] p-5">
            <h2 className="font-black text-[#071426]">Escopo</h2>
            <p className="mt-2 whitespace-pre-line text-sm leading-6 text-[#4d5b6f]">
              {opportunity.description || "O estabelecimento ainda não adicionou observações detalhadas."}
            </p>
          </div>
        </section>

        <ApplyOpportunityForm opportunityId={opportunity.id} />
      </div>
    </PageShell>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[#dbe3ef] bg-[#f7f9fd] p-4">
      <p className="text-[10px] font-bold uppercase tracking-wide text-[#637083]">{label}</p>
      <p className="mt-2 font-black text-[#071426]">{value}</p>
    </div>
  );
}

function formatMoney(valueCents: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valueCents / 100);
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(value));
}

function establishmentName(value: unknown) {
  const row = Array.isArray(value) ? value[0] : value;
  if (!row || typeof row !== "object") return "Estabelecimento";
  const record = row as { nome_fantasia?: string | null; razao_social?: string | null };
  return record.nome_fantasia ?? record.razao_social ?? "Estabelecimento";
}
