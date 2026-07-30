import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/ui/page-shell";

const reviews = [
  { name: "Pet Shop Central", text: "Pontual, técnica excelente e comunicação clara." },
  { name: "Clínica Pet Jardins", text: "Atendimento cuidadoso e postura profissional." },
];

export default function ProfissionalPerfilPage() {
  return (
    <PageShell
      title="Perfil profissional"
      subtitle="Apresente formação, portfólio, reputação e disponibilidade para os melhores estabelecimentos."
    >
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="overflow-hidden rounded-[28px] border border-white/10 bg-[#0a2138]">
          <div className="relative min-h-[420px] md:min-h-[560px]">
            <Image
              src="/professional-dog-washer-uniform.png"
              alt="Profissional Dog Washer com uniforme oficial"
              fill
              priority
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="object-cover object-top"
            />
          </div>
        </section>

        <section className="space-y-5">
          <div className="rounded-[28px] border border-white/10 bg-[#0a2138] p-5">
            <p className="text-xs font-black uppercase tracking-wide text-[var(--dw-orange)]">
              Profissional verificado
            </p>
            <h2 className="mt-3 text-2xl font-black text-white">Mariana Almeida</h2>
            <p className="mt-2 text-sm leading-6 text-white/65">
              Especialista em banho, tosa higiênica e finalização premium. Atua com rotina
              organizada, presença registrada e comunicação transparente.
            </p>
            <div className="mt-5 grid grid-cols-3 gap-3">
              <Metric label="Avaliação" value="4.9" />
              <Metric label="Trabalhos" value="83" />
              <Metric label="Resposta" value="96%" />
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-[#0a2138] p-5">
            <h3 className="font-black text-white">Portfólio de trabalhos</h3>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {[1, 2, 3].map((item) => (
                <div key={item} className="relative aspect-square overflow-hidden rounded-2xl border border-white/10">
                  <Image
                    src="/professional-dog-washer-official-logo.png"
                    alt="Portfólio Dog Washer"
                    fill
                    sizes="120px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-[#0a2138] p-5">
            <h3 className="font-black text-white">Avaliações de lojistas</h3>
            <div className="mt-4 space-y-3">
              {reviews.map((review) => (
                <div key={review.name} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="font-bold text-white">{review.name}</p>
                  <p className="mt-1 text-sm leading-6 text-white/60">{review.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] bg-[var(--dw-orange)] p-5 text-[#061426]">
            <p className="text-xs font-black uppercase">Valor médio</p>
            <p className="mt-2 text-3xl font-black">R$ 45–80/h</p>
            <Link
              href="/profissional/busca"
              className="mt-4 inline-flex rounded-xl bg-[#061426] px-4 py-3 text-sm font-black text-white"
            >
              Buscar oportunidades
            </Link>
          </div>
        </section>
      </div>
    </PageShell>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#071d33] p-4">
      <p className="text-[10px] font-bold uppercase tracking-wide text-white/45">{label}</p>
      <p className="mt-2 text-xl font-black text-white">{value}</p>
    </div>
  );
}
