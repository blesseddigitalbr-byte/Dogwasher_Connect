import Link from "next/link";
import { PageShell } from "@/components/ui/page-shell";

const featured = [
  { name: "Ricardo Silva", role: "Banho e tosa especialista", rating: "4.9", distance: "3,2 km" },
  { name: "Juliana Mendes", role: "Tosa na tesoura e hidratação", rating: "4.8", distance: "5,1 km" },
];

const activities = [
  "Cadastro criado e aguardando curadoria",
  "Complete seus documentos para liberar candidaturas",
  "Nova oportunidade prevista para sua região",
];

export default function ProfissionalDashboardPage() {
  return (
    <PageShell
      title="Profissionais qualificados, quando sua operação mais precisar."
      subtitle="Sua central para acompanhar reputação, oportunidades próximas e evolução do perfil Dog Washer."
    >
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="rounded-[28px] border border-white/10 bg-[#0a2138] p-5">
          <p className="text-xs font-black uppercase tracking-wide text-[var(--dw-orange)]">
            Meu status
          </p>
          <h2 className="mt-3 text-xl font-black text-white">Olá, profissional Dog Washer</h2>
          <p className="mt-2 text-sm leading-6 text-white/65">
            Complete seu perfil para aparecer nas buscas, receber convites e construir reputação
            dentro da rede.
          </p>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <Metric label="Reputação" value="Novo" />
            <Metric label="Diárias" value="0" />
            <Metric label="Perfil" value="42%" />
            <Metric label="Convites" value="Em breve" />
          </div>
          <Link
            href="/profissional/onboarding"
            className="mt-5 block rounded-xl bg-[var(--dw-orange)] px-4 py-3 text-center text-sm font-black text-[#061426] transition hover:brightness-110"
          >
            Completar perfil
          </Link>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <Panel title="Profissionais em destaque" eyebrow="Rede ativa">
            <div className="space-y-3">
              {featured.map((item) => (
                <div key={item.name} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-bold text-white">{item.name}</p>
                      <p className="mt-1 text-xs text-white/55">{item.role}</p>
                    </div>
                    <span className="rounded-full bg-[var(--dw-orange)]/15 px-2 py-1 text-xs font-black text-[var(--dw-orange)]">
                      {item.rating}
                    </span>
                  </div>
                  <p className="mt-3 text-xs font-semibold text-white/50">{item.distance} de distância</p>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Atividades recentes" eyebrow="Operação">
            <div className="space-y-3">
              {activities.map((item) => (
                <p key={item} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-5 text-white/70">
                  {item}
                </p>
              ))}
            </div>
          </Panel>
        </section>
      </div>

      <section className="mt-5 rounded-[28px] border border-white/10 bg-[#0a2138] p-5">
        <p className="text-xs font-black uppercase tracking-wide text-[var(--dw-orange)]">
          Confiança em cada trabalho
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <TrustCard title="Estabelecimentos validados" text="Atenda apenas locais com cadastro e curadoria aprovados." />
          <TrustCard title="Presença registrada" text="Check-in e check-out com registro para proteger sua diária." />
          <TrustCard title="Reputação bilateral" text="Avaliações dos dois lados ajudam os melhores a ganhar destaque." />
        </div>
      </section>
    </PageShell>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#071d33] p-4">
      <p className="text-[10px] font-bold uppercase tracking-wide text-white/45">{label}</p>
      <p className="mt-2 text-xl font-black text-white">{value}</p>
    </div>
  );
}

function Panel({ title, eyebrow, children }: { title: string; eyebrow: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-[#0a2138] p-5">
      <p className="text-[10px] font-black uppercase tracking-wide text-[var(--dw-orange)]">{eyebrow}</p>
      <h2 className="mt-2 text-lg font-black text-white">{title}</h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function TrustCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <p className="font-bold text-white">{title}</p>
      <p className="mt-2 text-sm leading-6 text-white/60">{text}</p>
    </div>
  );
}
