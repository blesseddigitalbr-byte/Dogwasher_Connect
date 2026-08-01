import Link from "next/link";
import { PageShell } from "@/components/ui/page-shell";

const adminNav = [
  { href: "/admin/dashboard", label: "Admin", icon: "A" },
  { href: "/admin/fila-profissionais", label: "Profissionais", icon: "P" },
  { href: "/admin/fila-estabelecimentos", label: "Empresas", icon: "E" },
  { href: "/admin/ocorrencias", label: "Ocorrências", icon: "O" },
];

const metrics = [
  { label: "Trabalhos em andamento", value: "142", hint: "+12% vs ontem", tone: "good" },
  { label: "Check-ins com exceção", value: "28", hint: "Urgente", tone: "danger" },
  { label: "Receita 24h", value: "R$ 12.450", hint: "Meta 83% atingida", tone: "neutral" },
  { label: "Ocorrências", value: "03", hint: "Requer atenção imediata", tone: "danger" },
];

const approvals = [
  {
    name: "Ricardo Mendes",
    type: "Dog Walker Senior",
    location: "São Paulo, SP",
    status: "Aguardando validação",
  },
  {
    name: "Pet Banho & Cia",
    type: "Estabelecimento",
    location: "Curitiba, PR",
    status: "Pendente",
  },
];

const operations = [
  { job: "#88219", title: "Banho + Tosa Higiênica", place: "Unidog Pet Palace", status: "Em execução" },
  { job: "#88220", title: "Passeio 60min", place: "Pet Mais Golden", status: "A caminho" },
];

export default function AdminDashboardPage() {
  return (
    <PageShell
      title="Dashboard Admin"
      subtitle="Visão consolidada de acessos, governança e pendências críticas do sistema."
      navItems={adminNav}
    >
      <div className="mb-5 flex flex-col gap-3 md:flex-row md:justify-end">
        <button className="rounded-xl border border-[#dbe3ef] bg-white px-4 py-2 text-xs font-black text-[#071426] shadow-sm">
          Exportar Logs
        </button>
        <button className="rounded-xl bg-[var(--dw-orange)] px-4 py-2 text-xs font-black text-[#061426] shadow-sm shadow-[var(--dw-orange)]/20">
          Novo Perfil
        </button>
      </div>

      <section className="grid gap-4 md:grid-cols-4">
        {metrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </section>

      <section className="mt-5 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[18px] border border-[#dbe3ef] bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-3 border-b border-[#e6edf5] pb-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-black text-[#071426]">Fila de Aprovação</h2>
              <p className="text-sm text-[#637083]">Novos membros aguardando validação.</p>
            </div>
            <div className="flex gap-2">
              <Link href="/admin/fila-profissionais" className="rounded-lg bg-[#f3f6fb] px-3 py-2 text-xs font-black text-[#071426]">
                Profissionais
              </Link>
              <Link href="/admin/fila-estabelecimentos" className="rounded-lg bg-[#f3f6fb] px-3 py-2 text-xs font-black text-[#071426]">
                Pet Shops
              </Link>
            </div>
          </div>

          <div className="mt-4 overflow-hidden rounded-2xl border border-[#e6edf5]">
            {approvals.map((item) => (
              <div key={item.name} className="grid gap-3 border-b border-[#e6edf5] p-4 last:border-b-0 md:grid-cols-[1fr_1fr_1fr_auto] md:items-center">
                <div>
                  <p className="font-black text-[#071426]">{item.name}</p>
                  <p className="text-xs text-[#637083]">{item.location}</p>
                </div>
                <p className="text-sm text-[#071426]">{item.type}</p>
                <span className="w-fit rounded-full bg-[#eef2ff] px-3 py-1 text-[10px] font-black uppercase text-[#4f46e5]">
                  {item.status}
                </span>
                <div className="flex gap-2 text-xs font-black">
                  <button className="text-[#071426]">Ver Docs</button>
                  <button className="text-[var(--dw-orange-muted)]">Aprovar</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="rounded-[18px] bg-[#061426] p-5 text-white shadow-sm">
          <p className="text-xs font-black uppercase tracking-wide text-white/55">Fluxo financeiro</p>
          <h2 className="mt-3 text-3xl font-black">R$ 284.900</h2>
          <p className="mt-1 text-xs text-white/55">Total processado no mês</p>
          <div className="mt-6 rounded-2xl bg-white/7 p-4">
            <p className="text-xs text-white/60">Repasses pendentes</p>
            <p className="mt-1 text-xl font-black text-[var(--dw-orange)]">R$ 42.100</p>
          </div>
          <button className="mt-5 w-full rounded-xl bg-[var(--dw-orange)] px-4 py-3 text-sm font-black text-[#061426]">
            Processar pagamentos em lote
          </button>
        </aside>
      </section>

      <section className="mt-5 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[18px] border border-[#dbe3ef] bg-white p-5 shadow-sm">
          <h2 className="text-lg font-black text-[#071426]">Monitoramento em tempo real</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {operations.map((operation) => (
              <div key={operation.job} className="rounded-2xl border border-[#e6edf5] bg-[#f8fafc] p-4">
                <p className="text-[10px] font-black uppercase text-[#637083]">Job {operation.job}</p>
                <h3 className="mt-2 font-black text-[#071426]">{operation.title}</h3>
                <p className="mt-1 text-xs text-[#637083]">{operation.place}</p>
                <div className="mt-4 h-1.5 rounded-full bg-[#e6edf5]">
                  <div className="h-full w-2/3 rounded-full bg-[var(--dw-orange)]" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <Link href="/admin/ocorrencias" className="rounded-[18px] border border-[#dbe3ef] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-[#071426]">Ocorrências Ativas</h2>
            <span className="rounded-full bg-red-50 px-3 py-1 text-[10px] font-black uppercase text-red-600">
              3 alertas
            </span>
          </div>
          <div className="mt-5 border-l-4 border-red-500 bg-red-50 p-4">
            <p className="text-xs font-black uppercase text-red-700">Crítico · Atraso</p>
            <p className="mt-2 text-sm leading-6 text-[#4d5b6f]">
              Profissional não iniciou o job #88210 no horário previsto.
            </p>
            <div className="mt-3 flex gap-2">
              <span className="rounded-lg bg-red-600 px-3 py-2 text-xs font-black text-white">Ligar p/ prof.</span>
              <span className="rounded-lg border border-[#dbe3ef] bg-white px-3 py-2 text-xs font-black text-[#071426]">Ignorar</span>
            </div>
          </div>
        </Link>
      </section>
    </PageShell>
  );
}

function MetricCard({
  label,
  value,
  hint,
  tone,
}: {
  label: string;
  value: string;
  hint: string;
  tone: string;
}) {
  return (
    <div className={["rounded-[18px] border bg-white p-5 shadow-sm", tone === "danger" ? "border-red-200" : "border-[#dbe3ef]"].join(" ")}>
      <p className="text-[10px] font-black uppercase tracking-wide text-[#637083]">{label}</p>
      <p className="mt-3 text-3xl font-black text-[#071426]">{value}</p>
      <p className={["mt-2 text-xs font-black", tone === "danger" ? "text-red-600" : tone === "good" ? "text-emerald-600" : "text-[#637083]"].join(" ")}>
        {hint}
      </p>
    </div>
  );
}
