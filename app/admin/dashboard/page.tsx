import Link from "next/link";
import { PageShell } from "@/components/ui/page-shell";
import { Card } from "@/components/ui/card";

const queues = [
  {
    href: "/admin/fila-profissionais",
    title: "Fila de profissionais",
    text: "Validar formação, identidade, área de atendimento e status de liberação.",
    count: "0",
  },
  {
    href: "/admin/fila-estabelecimentos",
    title: "Fila de estabelecimentos",
    text: "Revisar documentos, fotos da unidade e condições de trabalho.",
    count: "0",
  },
  {
    href: "/admin/ocorrencias",
    title: "Ocorrências",
    text: "Acompanhar cancelamentos, no-show, disputas e bloqueios preventivos.",
    count: "0",
  },
];

export default function AdminDashboardPage() {
  return (
    <PageShell
      title="Painel administrativo"
      subtitle="Central de curadoria, qualidade operacional e reputação da rede."
    >
      <div className="grid gap-5 md:grid-cols-3">
        <Metric label="Cadastros pendentes" value="0" />
        <Metric label="Parceiros ativos" value="0" />
        <Metric label="Alertas abertos" value="0" />
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        {queues.map((queue) => (
          <Link key={queue.href} href={queue.href}>
            <Card className="h-full rounded-md transition-colors hover:border-[var(--dw-orange)]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-[var(--dw-navy)]">{queue.title}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--dw-gray-500)]">{queue.text}</p>
                </div>
                <span className="rounded-full bg-[var(--dw-navy)] px-3 py-1 text-sm font-bold text-white">
                  {queue.count}
                </span>
              </div>
              <p className="mt-6 text-xs font-semibold uppercase text-[var(--dw-orange)]">
                Abrir fila
              </p>
            </Card>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <Card className="rounded-md">
      <p className="text-xs font-semibold uppercase text-[var(--dw-gray-500)]">{label}</p>
      <p className="mt-2 font-[var(--dw-font-display)] text-3xl font-semibold text-[var(--dw-navy)]">
        {value}
      </p>
    </Card>
  );
}
