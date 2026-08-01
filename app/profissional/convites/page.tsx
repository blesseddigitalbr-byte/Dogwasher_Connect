import Link from "next/link";
import { PageShell } from "@/components/ui/page-shell";
import { professionalNavItems } from "@/features/professional/nav";

export default function ConvitesProfissionalPage() {
  return (
    <PageShell
      title="Convites recebidos"
      subtitle="Aqui entrarão convites diretos de estabelecimentos para trabalhos sob demanda."
      navItems={professionalNavItems}
    >
      <div className="rounded-[18px] border border-dashed border-[#c8d3e2] bg-white p-8 text-center shadow-sm">
        <p className="font-black text-[#071426]">Nenhum convite recebido ainda.</p>
        <p className="mt-2 text-sm text-[#4d5b6f]">
          Conforme sua reputação crescer, os estabelecimentos poderão convidar você diretamente.
        </p>
        <Link href="/profissional/oportunidades" className="mt-5 inline-flex rounded-xl bg-[var(--dw-orange)] px-4 py-3 text-sm font-black text-[#061426]">
          Buscar oportunidades
        </Link>
      </div>
    </PageShell>
  );
}
