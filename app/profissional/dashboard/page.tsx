import Link from "next/link";
import { PageShell } from "@/components/ui/page-shell";
import { Card, StatusBadge } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const checklist = [
  "Completar formação, cidade e raio de atendimento.",
  "Enviar documentos para validação.",
  "Aguardar liberação para se candidatar às oportunidades.",
];

export default function ProfissionalDashboardPage() {
  return (
    <PageShell
      title="Painel profissional"
      subtitle="Acompanhe sua liberação, reputação e futuras oportunidades de diária."
    >
      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="rounded-md">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div>
              <p className="text-sm text-[var(--dw-gray-500)]">Status do cadastro</p>
              <div className="mt-3">
                <StatusBadge status="cadastro_incompleto" />
              </div>
            </div>
            <Link href="/profissional/onboarding">
              <Button variant="secondary">Completar perfil</Button>
            </Link>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <Metric label="Reputação" value="Novo" />
            <Metric label="Diárias concluídas" value="0" />
            <Metric label="Oportunidades abertas" value="Em breve" />
          </div>
        </Card>

        <Card className="rounded-md">
          <p className="font-semibold text-[var(--dw-navy)]">Próximos passos</p>
          <div className="mt-4 space-y-3">
            {checklist.map((item, index) => (
              <p key={item} className="flex gap-3 text-sm leading-6 text-[var(--dw-gray-500)]">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--dw-orange)] text-xs font-bold text-[var(--dw-navy)]">
                  {index + 1}
                </span>
                {item}
              </p>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-3">
        <ActionCard title="Oportunidades próximas" text="Lista de vagas sob demanda por região e agenda." />
        <ActionCard title="Minha disponibilidade" text="Defina dias, horários e raio de atendimento." />
        <ActionCard title="Avaliações" text="Acompanhe feedbacks recebidos após cada atendimento." />
      </div>
    </PageShell>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-[var(--dw-gray-200)] p-4">
      <p className="text-xs font-semibold uppercase text-[var(--dw-gray-500)]">{label}</p>
      <p className="mt-2 font-[var(--dw-font-display)] text-xl font-semibold text-[var(--dw-navy)]">
        {value}
      </p>
    </div>
  );
}

function ActionCard({ title, text }: { title: string; text: string }) {
  return (
    <Card className="rounded-md">
      <p className="font-semibold text-[var(--dw-navy)]">{title}</p>
      <p className="mt-2 text-sm leading-6 text-[var(--dw-gray-500)]">{text}</p>
      <p className="mt-5 text-xs font-semibold uppercase text-[var(--dw-orange)]">Sprint interna</p>
    </Card>
  );
}
