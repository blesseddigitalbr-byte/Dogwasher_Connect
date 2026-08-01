import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/ui/page-shell";
import { createClient } from "@/lib/supabase/server";
import { professionalNavItems } from "@/features/professional/nav";

export default async function ProfissionalPerfilPage() {
  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getUser();

  const { data: profile } = authData.user
    ? await supabase
        .from("professional_profiles")
        .select("full_name,formacao_declarada,cidade,estado,raio_atendimento_km,status")
        .eq("user_id", authData.user.id)
        .single()
    : { data: null };

  return (
    <PageShell
      title="Perfil profissional"
      subtitle="Dados do seu perfil, reputação e apresentação para os estabelecimentos."
      navItems={professionalNavItems}
    >
      <div className="grid gap-5 lg:grid-cols-[360px_1fr]">
        <section className="overflow-hidden rounded-[18px] border border-[#dbe3ef] bg-white shadow-sm">
          <div className="relative min-h-[420px]">
            <Image
              src="/professional-dog-washer-uniform.png"
              alt="Profissional Dog Washer com uniforme oficial"
              fill
              priority
              sizes="(min-width: 1024px) 360px, 100vw"
              className="object-cover object-top"
            />
          </div>
        </section>

        <section className="space-y-5">
          <div className="rounded-[18px] border border-[#dbe3ef] bg-white p-5 shadow-sm">
            <p className="text-xs font-black uppercase tracking-wide text-[var(--dw-orange-muted)]">
              {profile?.status?.replaceAll("_", " ") ?? "Cadastro incompleto"}
            </p>
            <h2 className="mt-3 text-3xl font-black text-[#071426]">
              {profile?.full_name ?? "Profissional Dog Washer"}
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#4d5b6f]">
              {profile?.formacao_declarada ??
                "Complete sua formação e região de atendimento para liberar sua apresentação na rede."}
            </p>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <Metric label="Cidade" value={profile?.cidade ? `${profile.cidade}/${profile.estado}` : "Pendente"} />
              <Metric label="Raio" value={profile?.raio_atendimento_km ? `${profile.raio_atendimento_km} km` : "10 km"} />
              <Metric label="Reputação" value="Novo" />
            </div>
            <Link
              href="/profissional/onboarding"
              className="mt-5 inline-flex rounded-xl bg-[var(--dw-orange)] px-4 py-3 text-sm font-black text-[#061426]"
            >
              Editar credenciamento
            </Link>
          </div>

          <div className="rounded-[18px] border border-[#dbe3ef] bg-white p-5 shadow-sm">
            <h3 className="font-black text-[#071426]">Portfólio de trabalhos</h3>
            <p className="mt-2 text-sm text-[#4d5b6f]">
              Fotos e evidências serão conectadas após a etapa de execução/check-out.
            </p>
          </div>
        </section>
      </div>
    </PageShell>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[#dbe3ef] bg-[#f8fafc] p-4">
      <p className="text-[10px] font-black uppercase tracking-wide text-[#637083]">{label}</p>
      <p className="mt-2 font-black text-[#071426]">{value}</p>
    </div>
  );
}
