import Link from "next/link";
import { PageShell } from "@/components/ui/page-shell";
import { createClient } from "@/lib/supabase/server";
import { professionalNavItems } from "@/features/professional/nav";

const demoOpportunities = [
  { id: "demo-central", title: "Pet Shop Central", service_type: "Banho e tosa", description: "Atendimento de cães de pequeno e médio porte, com estrutura completa e equipe de apoio.", starts_at: "2026-08-08T08:00:00-03:00", value_cents: 18000, slots: 1, establishments: { nome_fantasia: "Pet Shop Central", razao_social: null } },
  { id: "demo-jardins", title: "Clínica Pet Jardins", service_type: "Tosa higiênica", description: "Diária de sábado para reforço da equipe de estética.", starts_at: "2026-08-09T09:00:00-03:00", value_cents: 22000, slots: 1, establishments: { nome_fantasia: "Clínica Pet Jardins", razao_social: null } },
];

export default async function ProfissionalOportunidadesPage() {
  const supabase = await createClient();

  const { data: opportunities } = await supabase
    .from("opportunities")
    .select(
      "id,title,service_type,description,starts_at,value_cents,slots,establishments(nome_fantasia,razao_social)"
    )
    .eq("status", "published")
    .order("starts_at", { ascending: true });

  const items = opportunities?.length ? opportunities : demoOpportunities;

  return (
    <PageShell
      title="Oportunidades disponíveis"
      subtitle="Encontre diárias publicadas por estabelecimentos validados e candidate-se com transparência."
      navItems={professionalNavItems}
    >
      <section className="grid gap-4">
        {items.length ? (
          items.map((opportunity) => (
            <article
              key={opportunity.id}
              className="rounded-[20px] border border-[#dbe3ef] bg-white p-5 shadow-sm"
            >
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                <div>
                  {!opportunities?.length && <span className="mb-2 inline-flex rounded-full bg-[#fff4dc] px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-[#9a5e00]">Exemplo de oportunidade</span>}
                  <p className="text-xs font-black uppercase tracking-wide text-[var(--dw-orange)]">
                    {opportunity.service_type}
                  </p>
                  <h2 className="mt-2 text-xl font-black text-[#071426]">{opportunity.title}</h2>
                  <p className="mt-2 text-sm text-[#4d5b6f]">
                    {establishmentName(opportunity.establishments)} • {formatDate(opportunity.starts_at)}
                  </p>
                  {opportunity.description && (
                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#4d5b6f]">
                      {opportunity.description}
                    </p>
                  )}
                </div>
                <div className="shrink-0 text-left md:text-right">
                  <p className="text-2xl font-black text-[#071426]">
                    {formatMoney(opportunity.value_cents)}
                  </p>
                  <Link
                    href={`/profissional/oportunidades/${opportunity.id}`}
                    className="mt-3 inline-flex rounded-xl border border-[var(--dw-orange)] px-4 py-2 text-sm font-black text-[var(--dw-orange)]"
                  >
                    Ver detalhe
                  </Link>
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="rounded-[20px] border border-dashed border-[#c8d3e2] bg-white p-8 text-center">
            <p className="font-black text-[#071426]">Nenhuma oportunidade disponível agora.</p>
            <p className="mt-2 text-sm text-[#4d5b6f]">
              Volte em breve ou revise suas preferências de atendimento.
            </p>
          </div>
        )}
      </section>
    </PageShell>
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
