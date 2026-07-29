import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/ui/page-shell";

const professionals = [
  { name: "Mariana Almeida", specialty: "Banho, tosa higiênica e finalização", rating: "4.9", price: "R$ 45–80/h" },
  { name: "Carlos Vieira", specialty: "Tosa na tesoura e raças pequenas", rating: "4.8", price: "R$ 220/dia" },
  { name: "Bianca Torres", specialty: "Banho premium e hidratação", rating: "4.7", price: "R$ 180/dia" },
];

const navItems = [
  { href: "/estabelecimento/dashboard", label: "Home", icon: "H" },
  { href: "/estabelecimento/busca", label: "Busca", icon: "B" },
  { href: "/estabelecimento/onboarding", label: "Perfil", icon: "P" },
  { href: "/admin/dashboard", label: "Admin", icon: "D" },
];

export default function EstabelecimentoBuscaPage() {
  return (
    <PageShell
      title="Encontre talentos de elite"
      subtitle="Selecione profissionais verificados por especialidade, reputação e disponibilidade para sua agenda."
      navItems={navItems}
    >
      <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <aside className="rounded-[28px] border border-white/10 bg-[#0a2138] p-5">
          <p className="text-xs font-black uppercase tracking-wide text-[var(--dw-orange)]">
            Busca inteligente
          </p>
          <div className="mt-4 space-y-3">
            <div className="rounded-2xl border border-white/10 bg-[#071d33] px-4 py-3 text-sm text-white/55">
              Região do atendimento
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#071d33] px-4 py-3 text-sm text-white/55">
              Tipo de serviço
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#071d33] px-4 py-3 text-sm text-white/55">
              Faixa de valor
            </div>
          </div>
          <button className="mt-4 w-full rounded-xl bg-[var(--dw-orange)] px-4 py-3 text-sm font-black text-[#061426]">
            Encontrar profissionais
          </button>
        </aside>

        <section className="space-y-4">
          {professionals.map((professional) => (
            <article
              key={professional.name}
              className="overflow-hidden rounded-[28px] border border-white/10 bg-[#0a2138]"
            >
              <div className="grid md:grid-cols-[170px_1fr]">
                <div className="relative min-h-44 bg-[#071d33]">
                  <Image
                    src="/professional-dog-washer-uniform.png"
                    alt="Profissional Dog Washer com uniforme oficial"
                    fill
                    sizes="(min-width: 768px) 170px, 100vw"
                    className="object-cover object-top"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-lg font-black text-white">{professional.name}</h2>
                      <p className="mt-1 text-sm text-white/60">{professional.specialty}</p>
                    </div>
                    <span className="rounded-full bg-[var(--dw-orange)]/15 px-3 py-1 text-xs font-black text-[var(--dw-orange)]">
                      {professional.rating}
                    </span>
                  </div>
                  <p className="mt-4 text-sm font-bold text-white/70">{professional.price}</p>
                  <Link
                    href="/profissional/perfil"
                    className="mt-5 inline-flex rounded-xl border border-[var(--dw-orange)] px-4 py-2 text-sm font-bold text-[var(--dw-orange)]"
                  >
                    Ver perfil
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
    </PageShell>
  );
}
