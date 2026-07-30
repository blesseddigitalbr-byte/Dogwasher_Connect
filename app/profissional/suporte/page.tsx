import { PageShell } from "@/components/ui/page-shell";
import { professionalNavItems } from "@/features/professional/nav";

export default function SuporteProfissionalPage() {
  return (
    <PageShell
      title="Suporte"
      subtitle="Canal para dúvidas operacionais, ocorrências e ajuda durante trabalhos."
      navItems={professionalNavItems}
    >
      <section className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-[18px] border border-[#dbe3ef] bg-white p-5 shadow-sm">
          <h2 className="font-black text-[#071426]">Abrir chamado</h2>
          <p className="mt-2 text-sm leading-6 text-[#4d5b6f]">
            A criação de chamados será conectada à tabela de suporte. Por enquanto, esta tela define a jornada.
          </p>
          <button className="mt-5 rounded-xl bg-[var(--dw-orange)] px-4 py-3 text-sm font-black text-[#061426]">
            Novo chamado
          </button>
        </div>
        <div className="rounded-[18px] border border-dashed border-[#c8d3e2] bg-white p-8 text-center shadow-sm">
          <p className="font-black text-[#071426]">Nenhum chamado aberto.</p>
          <p className="mt-2 text-sm text-[#4d5b6f]">Quando houver solicitações, elas serão listadas aqui.</p>
        </div>
      </section>
    </PageShell>
  );
}
