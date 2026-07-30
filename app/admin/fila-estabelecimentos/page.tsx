import { PageShell } from "@/components/ui/page-shell";
import { Card, StatusBadge } from "@/components/ui/card";

const columns = ["Estabelecimento", "Documento", "Status", "Ação"];

export default function FilaEstabelecimentosPage() {
  return (
    <PageShell
      title="Fila de estabelecimentos"
      subtitle="Análise de documentação, fotos e condições de operação dos parceiros."
    >
      <Card className="rounded-md">
        <div className="grid grid-cols-[1.2fr_1fr_1fr_0.8fr] gap-4 border-b border-[var(--dw-gray-200)] pb-3 text-xs font-semibold uppercase text-[var(--dw-gray-500)]">
          {columns.map((column) => (
            <p key={column}>{column}</p>
          ))}
        </div>
        <div className="grid grid-cols-[1.2fr_1fr_1fr_0.8fr] gap-4 py-5 text-sm">
          <p className="font-medium text-[var(--dw-navy)]">Nenhum estabelecimento pendente</p>
          <p className="text-[var(--dw-gray-500)]">-</p>
          <StatusBadge status="aguardando_verificacao" />
          <p className="text-[var(--dw-orange)]">Aguardar</p>
        </div>
      </Card>
    </PageShell>
  );
}
