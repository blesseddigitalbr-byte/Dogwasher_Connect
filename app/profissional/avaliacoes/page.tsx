import { PageShell } from "@/components/ui/page-shell";
import { professionalNavItems } from "@/features/professional/nav";

export default function AvaliacoesProfissionalPage() {
  return (
    <PageShell
      title="Minha reputação"
      subtitle="Avaliações recebidas de estabelecimentos e evolução da sua credibilidade na rede."
      navItems={professionalNavItems}
    >
      <section className="grid gap-5 md:grid-cols-3">
        <Card label="Nota média" value="Novo" />
        <Card label="Trabalhos avaliados" value="0" />
        <Card label="Reconhecimento" value="Em construção" />
      </section>
      <div className="mt-5 rounded-[18px] border border-dashed border-[#c8d3e2] bg-white p-8 text-center shadow-sm">
        <p className="font-black text-[#071426]">Nenhuma avaliação recebida ainda.</p>
        <p className="mt-2 text-sm text-[#4d5b6f]">Após seus primeiros trabalhos concluídos, os feedbacks aparecerão aqui.</p>
      </div>
    </PageShell>
  );
}

function Card({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[18px] border border-[#dbe3ef] bg-white p-5 shadow-sm">
      <p className="text-[10px] font-black uppercase tracking-wide text-[#637083]">{label}</p>
      <p className="mt-3 text-2xl font-black text-[#071426]">{value}</p>
    </div>
  );
}
