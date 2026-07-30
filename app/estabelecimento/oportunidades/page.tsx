import Link from "next/link";
import { PageShell } from "@/components/ui/page-shell";
import { createClient } from "@/lib/supabase/server";

const navItems = [
  { href: "/estabelecimento/dashboard", label: "Home", icon: "H" },
  { href: "/estabelecimento/oportunidades", label: "Vagas", icon: "V" },
  { href: "/estabelecimento/onboarding", label: "Perfil", icon: "P" },
  { href: "/admin/dashboard", label: "Admin", icon: "D" },
];

export default async function EstabelecimentoOportunidadesPage() {
  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getUser();

  const { data: establishment } = authData.user
    ? await supabase
        .from("establishments")
        .select("id")
        .eq("owner_user_id", authData.user.id)
        .single()
    : { data: null };

  const { data: opportunities } = establishment?.id
    ? await supabase
        .from("opportunities")
        .select("id,title,service_type,starts_at,value_cents,slots,status,created_at")
        .eq("establishment_id", establishment.id)
        .order("starts_at", { ascending: true })
    : { data: [] };

  return (
    <PageShell
      title="Oportunidades"
      subtitle="Publique diárias, acompanhe status e prepare a seleção de profissionais Dog Washer."
      navItems={navItems}
    >
      <div className="mb-5 flex flex-col justify-between gap-3 rounded-[20px] border border-[#dbe3ef] bg-white p-5 shadow-sm md:flex-row md:items-center">
        <div>
          <p className="text-xs font-black uppercase tracking-wide text-[var(--dw-orange)]">
            Gestão de vagas
          </p>
          <p className="mt-1 text-sm text-[#4d5b6f]">
            Comece publicando oportunidades com data, valor e escopo claros.
          </p>
        </div>
        <Link
          href="/estabelecimento/oportunidades/nova"
          className="rounded-xl bg-[var(--dw-orange)] px-5 py-3 text-center text-sm font-black text-[#061426]"
        >
          Nova oportunidade
        </Link>
      </div>

      <section className="grid gap-4">
        {opportunities?.length ? (
          opportunities.map((opportunity) => (
            <Link
              key={opportunity.id}
              href={`/estabelecimento/oportunidades/${opportunity.id}`}
              className="rounded-[20px] border border-[#dbe3ef] bg-white p-5 shadow-sm"
            >
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                <div>
                  <p className="text-xs font-black uppercase tracking-wide text-[var(--dw-orange)]">
                    {opportunity.service_type}
                  </p>
                  <h2 className="mt-2 text-xl font-black text-[#071426]">{opportunity.title}</h2>
                  <p className="mt-2 text-sm text-[#4d5b6f]">
                    {formatDate(opportunity.starts_at)} • {opportunity.slots} vaga(s)
                  </p>
                </div>
                <div className="text-left md:text-right">
                  <p className="text-2xl font-black text-[#071426]">
                    {formatMoney(opportunity.value_cents)}
                  </p>
                  <span className="mt-2 inline-flex rounded-full bg-[#eef4fb] px-3 py-1 text-xs font-black capitalize text-[#4d5b6f]">
                    {opportunity.status}
                  </span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="rounded-[20px] border border-dashed border-[#c8d3e2] bg-white p-8 text-center">
            <p className="font-black text-[#071426]">Nenhuma oportunidade publicada ainda.</p>
            <p className="mt-2 text-sm text-[#4d5b6f]">
              Publique a primeira diária para começar a receber candidaturas.
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
