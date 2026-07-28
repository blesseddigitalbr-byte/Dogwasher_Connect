import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function LandingPage() {
  return (
    <div className="flex flex-col flex-1">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-5 md:px-12">
        <span className="font-[var(--dw-font-display)] text-lg font-semibold tracking-tight text-[var(--dw-navy)]">
          Dog Washer <span className="text-[var(--dw-orange)]">Connect</span>
        </span>
        <nav className="flex items-center gap-3">
          <Link href="/login" className="text-sm font-medium text-[var(--dw-navy)] hover:opacity-70">
            Entrar
          </Link>
          <Link href="/criar-conta">
            <Button variant="primary" className="text-sm">Criar conta</Button>
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="flex-1 bg-[var(--dw-navy)] text-white">
        <div className="mx-auto max-w-5xl px-6 py-20 md:py-28 md:px-12">
          <p className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1 text-xs font-medium tracking-wide text-[var(--dw-orange)]">
            REDE CREDENCIADA · MERCADO DE BANHO E TOSA
          </p>
          <h1 className="max-w-2xl font-[var(--dw-font-display)] text-4xl font-semibold leading-tight md:text-6xl">
            Profissionais qualificados, quando sua operação mais precisar.
          </h1>
          <p className="mt-6 max-w-xl text-base text-white/80 md:text-lg">
            O Dog Washer Connect conecta estabelecimentos do mercado pet a
            profissionais Dog Washer verificados para trabalhos sob demanda —
            com check-in geolocalizado, avaliação bilateral e reputação real.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/criar-conta?perfil=estabelecimento">
              <Button variant="secondary">Sou estabelecimento</Button>
            </Link>
            <Link href="/criar-conta?perfil=profissional">
              <Button
                variant="ghost"
                className="border border-white/30 text-white hover:bg-white/10"
              >
                Sou profissional Dog Washer
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="bg-[var(--dw-off-white)] px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-[var(--dw-font-display)] text-2xl font-semibold text-[var(--dw-navy)] md:text-3xl">
            Confiança em cada trabalho
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <Card>
              <p className="text-sm font-semibold text-[var(--dw-orange)]">Estabelecimento</p>
              <p className="mt-2 text-sm text-[var(--dw-gray-500)]">
                Publique a oportunidade, avalie candidatos verificados e
                confirme a contratação em poucos passos.
              </p>
            </Card>
            <Card>
              <p className="text-sm font-semibold text-[var(--dw-orange)]">Profissional</p>
              <p className="mt-2 text-sm text-[var(--dw-gray-500)]">
                Encontre trabalhos próximos, confirme presença por
                geolocalização e construa seu histórico de reputação.
              </p>
            </Card>
            <Card>
              <p className="text-sm font-semibold text-[var(--dw-orange)]">Padrão Dog Washer</p>
              <p className="mt-2 text-sm text-[var(--dw-gray-500)]">
                Estabelecimentos passam por curadoria documental e
                fotográfica antes de publicar qualquer oportunidade.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <footer className="border-t border-[var(--dw-gray-200)] px-6 py-8 text-center text-xs text-[var(--dw-gray-500)] md:px-12">
        Dog Washer Connect — parte do ecossistema Dog Washer.{" "}
        <Link href="/termos" className="underline">Termos de uso</Link>{" "}·{" "}
        <Link href="/privacidade" className="underline">Privacidade</Link>
      </footer>
    </div>
  );
}
