import { PageShell } from "@/components/ui/page-shell";
import { Card } from "@/components/ui/card";

export default function OcorrenciasPage() {
  return (
    <PageShell
      title="Ocorrências"
      subtitle="Registro operacional para no-show, cancelamentos, disputas e bloqueios."
    >
      <div className="grid gap-5 md:grid-cols-3">
        <Metric label="Abertas" value="0" />
        <Metric label="Em análise" value="0" />
        <Metric label="Resolvidas" value="0" />
      </div>
      <Card className="mt-6 rounded-md">
        <p className="font-semibold text-[var(--dw-navy)]">Nenhuma ocorrência registrada</p>
        <p className="mt-2 text-sm leading-6 text-[var(--dw-gray-500)]">
          Quando houver atendimentos concluídos, esta área concentrará os alertas
          de qualidade e suporte.
        </p>
      </Card>
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
