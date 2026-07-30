import { PageShell } from "@/components/ui/page-shell";
import { createClient } from "@/lib/supabase/server";
import { professionalNavItems } from "@/features/professional/nav";

export default async function ConfiguracoesProfissionalPage() {
  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getUser();

  return (
    <PageShell
      title="Configurações da conta"
      subtitle="Segurança, acesso e preferências básicas do perfil profissional."
      navItems={professionalNavItems}
    >
      <section className="grid gap-5 md:grid-cols-2">
        <div className="rounded-[18px] border border-[#dbe3ef] bg-white p-5 shadow-sm">
          <p className="text-xs font-black uppercase tracking-wide text-[var(--dw-orange-muted)]">Conta</p>
          <h2 className="mt-2 font-black text-[#071426]">{authData.user?.email ?? "Usuário"}</h2>
          <p className="mt-2 text-sm leading-6 text-[#4d5b6f]">
            Use recuperação de senha para alterar credenciais de acesso.
          </p>
        </div>
        <div className="rounded-[18px] border border-[#dbe3ef] bg-white p-5 shadow-sm">
          <p className="text-xs font-black uppercase tracking-wide text-[var(--dw-orange-muted)]">Preferências</p>
          <h2 className="mt-2 font-black text-[#071426]">Notificações ativas</h2>
          <p className="mt-2 text-sm leading-6 text-[#4d5b6f]">
            Preferências avançadas serão conectadas na próxima rodada do módulo.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
