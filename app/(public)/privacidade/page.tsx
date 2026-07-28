import Link from "next/link";

export default function PrivacidadePage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <Link href="/" className="text-sm font-medium text-[var(--dw-navy)]">
        ← Dog Washer Connect
      </Link>
      <h1 className="mt-6 font-[var(--dw-font-display)] text-2xl font-semibold text-[var(--dw-navy)]">
        Política de Privacidade
      </h1>
      <p className="mt-4 text-sm text-[var(--dw-gray-500)]">
        [PLACEHOLDER — texto final pendente de revisão jurídica.] Coletamos
        dados de cadastro, documentos de verificação, fotos de
        estabelecimento e localização geográfica apenas em ações específicas
        (cadastro de unidade, check-in e check-out), em conformidade com a
        LGPD. Documentos de verificação nunca são exibidos publicamente.
      </p>
    </div>
  );
}
