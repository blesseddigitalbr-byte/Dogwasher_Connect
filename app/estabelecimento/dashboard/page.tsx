import { PageShell } from "@/components/ui/page-shell";
import { Card, StatusBadge } from "@/components/ui/card";

export default function EstabelecimentoDashboardPage() {
  return (
    <PageShell title="Painel do estabelecimento" subtitle="Status de aprovação e resumo das oportunidades.">
      <Card className="max-w-xl">
        <p className="text-sm text-[var(--dw-gray-500)]">Status do estabelecimento:</p>
        <div className="mt-2">
          <StatusBadge status="cadastro_incompleto" />
        </div>
      </Card>
    </PageShell>
  );
}
