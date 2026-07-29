import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/ui/page-shell";

const opportunities = [
  { title: "Pet Shop Central", area: "Banho e tosa • 08h às 17h", value: "R$ 180", distance: "2,4 km" },
  { title: "Clínica Pet Jardins", area: "Tosa higiênica • Sábado", value: "R$ 220", distance: "4,8 km" },
  { title: "Boutique Canina", area: "Banho premium • Meio período", value: "R$ 140", distance: "6,1 km" },
];

export default function ProfissionalBuscaPage() {
  return (
    <PageShell
      title="Encontre oportunidades de elite"
      subtitle="Veja trabalhos próximos, condições claras e estabelecimentos validados antes de se candidatar."
    >
      <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <aside className="rounded-[28px] border border-white/10 bg-[#0a2138] p-5">
          <p className="text-xs font-black uppercase tracking-wide text-[var(--dw-orange)]">
            Filtros rápidos
          </p>
          <div className="mt-4 space-y-3">
            <div className="rounded-2xl border border-white/10 bg-[#071d33] px-4 py-3 text-sm text-white/55">
              Buscar por cidade ou bairro
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#071d33] px-4 py-3 text-sm text-white/55">
              Especialidade
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#071d33] px-4 py-3 text-sm text-white/55">
              Data disponível
            </div>
          </div>
          <button className="mt-4 w-full rounded-xl bg-[var(--dw-orange)] px-4 py-3 text-sm font-black text-[#061426]">
            Filtrar oportunidades
          </button>
        </aside>

        <section className="space-y-4">
          {opportunities.map((item) => (
            <article key={item.title} className="overflow-hidden rounded-[28px] border border-white/10 bg-[#0a2138]">
              <div className="grid md:grid-cols-[180px_1fr]">
                <div className="relative min-h-44 bg-[#071d33]">
                  <Image
                    src="/professional-dog-washer-uniform.png"
                    alt="Profissional Dog Washer com uniforme oficial"
                    fill
                    sizes="(min-width: 768px) 180px, 100vw"
                    className="object-cover object-top"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-lg font-black text-white">{item.title}</h2>
                      <p className="mt-1 text-sm text-white/60">{item.area}</p>
                    </div>
                    <span className="rounded-full bg-[var(--dw-orange)] px-3 py-1 text-xs font-black text-[#061426]">
                      {item.value}
                    </span>
                  </div>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-white/45">
                    {item.distance} • Curadoria aprovada
                  </p>
                  <Link
                    href="/profissional/perfil"
                    className="mt-5 inline-flex rounded-xl border border-[var(--dw-orange)] px-4 py-2 text-sm font-bold text-[var(--dw-orange)]"
                  >
                    Ver detalhes
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
