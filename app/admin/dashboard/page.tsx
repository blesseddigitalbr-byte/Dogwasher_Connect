import { PageShell } from "@/components/ui/page-shell";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function AdminDashboardPage() {
  return (
    <PageShell title="Painel administrativo" subtitle="Filas de aprovação e indicadores da Fase 1.">
      <div className="grid gap-4 md:grid-cols-3">
        <Link href="/admin/fila-profissionais">
          <Card className="hover:border-[var(--dw-navy)]">
            <p className="font-medium text-[var(--dw-navy)]">Fila de profissionais</p>
            <p className="mt-1 text-sm text-[var(--dw-gray-500)]">Aprovar ou reprovar cadastros.</p>
          </Card>
        </Link>
        <Link href="/admin/fila-estabelecimentos">
          <Card className="hover:border-[var(--dw-navy)]">
            <p className="font-medium text-[var(--dw-navy)]">Fila de estabelecimentos</p>
            <p className="mt-1 text-sm text-[var(--dw-gray-500)]">Analisar documentos e fotos.</p>
          </Card>
        </Link>
        <Link href="/admin/ocorrencias">
          <Card className="hover:border-[var(--dw-navy)]">
            <p className="font-medium text-[var(--dw-navy)]">Ocorrências</p>
            <p className="mt-1 text-sm text-[var(--dw-gray-500)]">Cancelamentos, no-show e disputas.</p>
          </Card>
        </Link>
      </div>
    </PageShell>
  );
}
