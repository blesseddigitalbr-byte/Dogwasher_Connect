import { PageShell } from "@/components/ui/page-shell";
import { Card, StatusBadge } from "@/components/ui/card";

export default function ProfissionalDashboardPage() {
  return (
    <PageShell title="Seu painel" subtitle="Acompanhe seu status e as próximas oportunidades.">
      <Card className="max-w-xl">
        <p className="text-sm text-[var(--dw-gray-500)]">Status do seu cadastro:</p>
        <div className="mt-2">
          <StatusBadge status="aguardando_verificacao" />
        </div>
      </Card>
    </PageShell>
  );
}
