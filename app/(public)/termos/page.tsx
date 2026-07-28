import Link from "next/link";

export default function TermosPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <Link href="/" className="text-sm font-medium text-[var(--dw-navy)]">
        ← Dog Washer Connect
      </Link>
      <h1 className="mt-6 font-[var(--dw-font-display)] text-2xl font-semibold text-[var(--dw-navy)]">
        Termos de Uso
      </h1>
      <p className="mt-4 text-sm text-[var(--dw-gray-500)]">
        [PLACEHOLDER — texto final pendente de revisão jurídica antes do
        lançamento do piloto, conforme registrado nos riscos jurídicos da
        Fase 1.] O Dog Washer Connect atua como plataforma de intermediação
        entre profissionais autônomos e estabelecimentos do mercado pet. Não
        há vínculo empregatício entre o profissional e a plataforma, não há
        garantia de renda ou quantidade mínima de oportunidades, não há
        exclusividade, e cada contratação depende do aceite de ambas as
        partes.
      </p>
    </div>
  );
}
