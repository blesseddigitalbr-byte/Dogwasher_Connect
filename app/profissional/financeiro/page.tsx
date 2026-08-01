import { PageShell } from "@/components/ui/page-shell";
import { createClient } from "@/lib/supabase/server";
import { professionalNavItems } from "@/features/professional/nav";
import { formatMoney } from "@/features/professional/format";

export default async function FinanceiroProfissionalPage() {
  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getUser();

  const { data: profile } = authData.user
    ? await supabase.from("professional_profiles").select("id").eq("user_id", authData.user.id).single()
    : { data: null };

  const { data: accepted } = profile?.id
    ? await supabase
        .from("opportunity_applications")
        .select("opportunities(value_cents)")
        .eq("professional_id", profile.id)
        .eq("status", "accepted")
    : { data: [] };

  const total = (accepted ?? []).reduce((sum, item) => {
    const opportunity = Array.isArray(item.opportunities) ? item.opportunities[0] : item.opportunities;
    return sum + (opportunity?.value_cents ?? 0);
  }, 0);

  return (
    <PageShell
      title="Meus recebimentos"
      subtitle="Acompanhe valores previstos, repasses e configuração financeira."
      navItems={professionalNavItems}
    >
      <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <section className="rounded-[18px] bg-[#061426] p-6 text-white shadow-sm">
          <p className="text-xs font-black uppercase tracking-wide text-white/55">Total previsto</p>
          <h2 className="mt-3 text-4xl font-black">{formatMoney(total)}</h2>
          <p className="mt-2 text-sm text-white/60">Baseado em trabalhos aceitos no momento.</p>
        </section>
        <section className="rounded-[18px] border border-[#dbe3ef] bg-white p-5 shadow-sm">
          <h2 className="font-black text-[#071426]">Configurar recebimento</h2>
          <p className="mt-2 text-sm leading-6 text-[#4d5b6f]">
            A conexão PIX/conta bancária entrará na etapa financeira. A tela já fica preparada
            para esse fluxo sem expor dados sensíveis.
          </p>
          <button className="mt-5 rounded-xl bg-[var(--dw-orange)] px-4 py-3 text-sm font-black text-[#061426]">
            Configurar chave PIX
          </button>
        </section>
      </div>
    </PageShell>
  );
}
