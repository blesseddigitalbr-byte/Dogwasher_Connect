import Link from "next/link";
import { PageShell } from "@/components/ui/page-shell";
import { Card, StatusBadge } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const readiness = [
  "Completar dados da empresa e unidade.",
  "Enviar fotos do local e documentação.",
  "Aguardar curadoria para publicar oportunidades.",
];

export default function EstabelecimentoDashboardPage() {
  return (
    <PageShell
      title="Painel do estabelecimento"
      subtitle="Organize sua operação, acompanhe curadoria e prepare futuras oportunidades."
    >
      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="rounded-md">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div>
              <p className="text-sm text-[var(--dw-gray-500)]">Status do estabelecimento</p>
              <div className="mt-3">
                <StatusBadge status="cadastro_incompleto" />
              </div>
            </div>
            <Link href="/estabelecimento/onboarding">
              <Button variant="secondary">Completar cadastro</Button>
            </Link>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <Metric label="Oportunidades" value="0" />
            <Metric label="Profissionais favoritos" value="0" />
            <Metric label="Unidades" value="1 pendente" />
          </div>
        </Card>

        <Card className="rounded-md">
          <p className="font-semibold text-[var(--dw-navy)]">Liberação para publicar</p>
          <div className="mt-4 space-y-3">
            {readiness.map((item, index) => (
              <p key={item} className="flex gap-3 text-sm leading-6 text-[var(--dw-gray-500)]">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--dw-navy)] text-xs font-bold text-white">
                  {index + 1}
                </span>
                {item}
              </p>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-3">
        <ActionCard title="Publicar oportunidade" text="Crie uma diária com data, horário, valor e endereço." />
        <ActionCard title="Candidatos" text="Compare perfis, avaliações e confirmação de disponibilidade." />
        <ActionCard title="Histórico operacional" text="Acompanhe check-in, check-out e avaliação por atendimento." />
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
      <p className="mt-5 text-xs font-semibold uppercase text-[var(--dw-orange)]">Em construção</p>
    </Card>
  );
}
