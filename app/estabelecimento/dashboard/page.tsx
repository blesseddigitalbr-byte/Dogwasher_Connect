import Link from "next/link";
import { PageShell } from "@/components/ui/page-shell";
import { createClient } from "@/lib/supabase/server";

const candidates = [
  { name: "Mariana Costa", specialty: "Banho e tosa completa", status: "Disponível hoje" },
  { name: "João Miguel", specialty: "Tosador especialista", status: "Raio de 4 km" },
  { name: "Beatriz Lima", specialty: "Hidratação e finalização", status: "4.9 avaliação" },
];

const navItems = [
  { href: "/estabelecimento/dashboard", label: "Home", icon: "H" },
  { href: "/estabelecimento/oportunidades", label: "Vagas", icon: "V" },
  { href: "/estabelecimento/onboarding", label: "Perfil", icon: "P" },
  { href: "/admin/dashboard", label: "Admin", icon: "D" },
];

export default async function EstabelecimentoDashboardPage() {
  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getUser();

  const { data: establishment } = authData.user
    ? await supabase
        .from("establishments")
        .select("id,razao_social,nome_fantasia,documento,status")
        .eq("owner_user_id", authData.user.id)
        .single()
    : { data: null };

  const { count: unitsCount } = establishment?.id
    ? await supabase
        .from("establishment_units")
        .select("id", { count: "exact", head: true })
        .eq("establishment_id", establishment.id)
    : { count: 0 };

  const displayName =
    establishment?.nome_fantasia ?? establishment?.razao_social ?? "Pet Shop Central";
  const statusLabel = establishment?.status
    ? establishment.status.replaceAll("_", " ")
    : "cadastro incompleto";

  return (
    <PageShell
      title={`Olá, ${displayName}`}
      subtitle="Painel operacional para publicar oportunidades, acompanhar candidatos e manter a agenda funcionando."
      navItems={navItems}
    >
      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <section className="rounded-[20px] border border-[#dbe3ef] bg-white p-5 shadow-sm">
          <p className="text-xs font-black uppercase tracking-wide text-[var(--dw-orange)]">
            Resumo do dia
          </p>
          <h2 className="mt-3 text-xl font-black text-[#071426]">Operação pronta para crescer</h2>
          <p className="mt-2 text-sm leading-6 text-[#4d5b6f]">
            Cadastre o pet shop, valide sua unidade e prepare a primeira diária para receber
            profissionais qualificados.
          </p>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <Metric label="Unidades" value={String(unitsCount ?? 0)} />
            <Metric label="Status" value={statusLabel} />
            <Metric label="Diárias" value="0" />
            <Metric label="Avaliação" value="Novo" />
          </div>
          <Link
            href="/estabelecimento/onboarding"
            className="mt-5 block rounded-xl bg-[var(--dw-orange)] px-4 py-3 text-center text-sm font-black text-[#061426] transition hover:brightness-110"
          >
            Completar cadastro
          </Link>
        </section>

        <section className="rounded-[20px] border border-[#dbe3ef] bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[var(--dw-orange)]">
                Talentos próximos
              </p>
              <h2 className="mt-2 text-xl font-black text-[#071426]">Profissionais indicados</h2>
            </div>
            <Link href="/estabelecimento/oportunidades" className="text-xs font-bold text-[var(--dw-orange)]">
              Ver vagas
            </Link>
          </div>

          <div className="mt-5 space-y-3">
            {candidates.map((candidate) => (
              <article
                key={candidate.name}
                className="rounded-2xl border border-[#dbe3ef] bg-[#f7f9fd] p-4"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-bold text-[#071426]">{candidate.name}</p>
                    <p className="mt-1 text-xs text-[#637083]">{candidate.specialty}</p>
                  </div>
                  <span className="rounded-full bg-[var(--dw-orange)]/15 px-3 py-1 text-[10px] font-black uppercase text-[var(--dw-orange)]">
                    {candidate.status}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      <section className="mt-5 grid gap-4 md:grid-cols-3">
        <ActionCard title="Publicar oportunidade" text="Defina data, horário, valor e requisitos técnicos para sua diária." />
        <ActionCard title="Confirmar presença" text="Acompanhe check-in e check-out em tempo real com registro digital." />
        <ActionCard title="Avaliar atendimento" text="Mantenha a qualidade da rede com feedback bilateral." />
      </section>
    </PageShell>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[#dbe3ef] bg-[#f7f9fd] p-4">
      <p className="text-[10px] font-bold uppercase tracking-wide text-[#637083]">{label}</p>
      <p className="mt-2 text-xl font-black capitalize text-[#071426]">{value}</p>
    </div>
  );
}

function ActionCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-[20px] border border-[#dbe3ef] bg-white p-5 shadow-sm">
      <p className="font-bold text-[#071426]">{title}</p>
      <p className="mt-2 text-sm leading-6 text-[#4d5b6f]">{text}</p>
    </div>
  );
}
