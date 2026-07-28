import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const trustItems = [
  { value: "Rede", label: "credenciada para banho e tosa" },
  { value: "Check-in", label: "com localização no atendimento" },
  { value: "Reputação", label: "construída por avaliações reais" },
];

const establishmentSteps = [
  "Publique uma oportunidade com data, horário e endereço.",
  "Receba candidatos verificados e escolha com mais confiança.",
  "Acompanhe check-in, confirmação e avaliação do atendimento.",
];

const professionalSteps = [
  "Crie seu perfil profissional Dog Washer e envie seus dados.",
  "Encontre oportunidades próximas ao seu raio de atendimento.",
  "Construa histórico com presença confirmada e avaliações.",
];

const faqItems = [
  {
    question: "Quem pode se cadastrar?",
    answer:
      "Profissionais de banho e tosa e estabelecimentos pet que desejam contratar sob demanda dentro do padrão Dog Washer.",
  },
  {
    question: "Já dá para usar a plataforma?",
    answer:
      "O cadastro já está aberto. A liberação operacional depende da validação do perfil e dos próximos fluxos internos.",
  },
  {
    question: "Como a confiança é construída?",
    answer:
      "Com verificação de cadastro, registro de presença por localização, avaliações bilaterais e histórico de reputação.",
  },
];

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--dw-off-white)]">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[var(--dw-navy)]/95 px-6 py-4 text-white backdrop-blur md:px-12">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3" aria-label="Dog Washer Connect">
            <Image
              src="/logo-dog-washer-connect.png"
              alt=""
              width={44}
              height={44}
              className="h-11 w-11 rounded-md object-cover"
              priority
            />
            <span className="font-[var(--dw-font-display)] text-base font-semibold tracking-tight">
              Dog Washer <span className="text-[var(--dw-orange)]">Connect</span>
            </span>
          </Link>
          <nav className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-medium text-white/80 hover:text-white">
              Entrar
            </Link>
            <Link href="/criar-conta">
              <Button variant="secondary" className="text-sm">Criar conta</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="bg-[var(--dw-navy)] text-white">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 pb-20 pt-16 md:grid-cols-[1.1fr_0.9fr] md:px-12 md:pb-24 md:pt-20">
            <div className="self-center">
              <p className="mb-4 inline-flex rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--dw-orange)]">
                Rede credenciada para banho e tosa
              </p>
              <h1 className="max-w-3xl font-[var(--dw-font-display)] text-4xl font-semibold leading-tight md:text-6xl">
                Dog Washer Connect
              </h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-white/78 md:text-lg">
                Conectamos estabelecimentos pet a profissionais qualificados para
                cobrir demanda, agenda cheia e oportunidades próximas, com presença
                registrada e reputação real.
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
            <div className="flex items-center justify-center md:justify-end">
              <div className="relative aspect-square w-full max-w-[360px] overflow-hidden rounded-md border border-white/10 bg-white/5">
                <Image
                  src="/logo-dog-washer-connect.png"
                  alt="Logo Dog Washer Connect"
                  fill
                  sizes="(min-width: 768px) 360px, 80vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[var(--dw-gray-200)] bg-white px-6 py-8 md:px-12">
          <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
            {trustItems.map((item) => (
              <div key={item.value} className="border-l-2 border-[var(--dw-orange)] pl-4">
                <p className="font-[var(--dw-font-display)] text-xl font-semibold text-[var(--dw-navy)]">
                  {item.value}
                </p>
                <p className="mt-1 text-sm text-[var(--dw-gray-500)]">{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-wide text-[var(--dw-orange)]">
                Como funciona
              </p>
              <h2 className="mt-3 font-[var(--dw-font-display)] text-3xl font-semibold text-[var(--dw-navy)] md:text-4xl">
                Dois lados da operação, um fluxo simples.
              </h2>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <Card className="rounded-md">
                <p className="text-sm font-semibold uppercase tracking-wide text-[var(--dw-orange)]">
                  Para estabelecimentos
                </p>
                <h3 className="mt-3 font-[var(--dw-font-display)] text-2xl font-semibold text-[var(--dw-navy)]">
                  Cubra demanda sem perder padrão.
                </h3>
                <div className="mt-6 space-y-4">
                  {establishmentSteps.map((step, index) => (
                    <p key={step} className="flex gap-3 text-sm leading-6 text-[var(--dw-gray-500)]">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--dw-navy)] text-xs font-semibold text-white">
                        {index + 1}
                      </span>
                      {step}
                    </p>
                  ))}
                </div>
              </Card>
              <Card className="rounded-md">
                <p className="text-sm font-semibold uppercase tracking-wide text-[var(--dw-orange)]">
                  Para profissionais
                </p>
                <h3 className="mt-3 font-[var(--dw-font-display)] text-2xl font-semibold text-[var(--dw-navy)]">
                  Encontre trabalho com reputação.
                </h3>
                <div className="mt-6 space-y-4">
                  {professionalSteps.map((step, index) => (
                    <p key={step} className="flex gap-3 text-sm leading-6 text-[var(--dw-gray-500)]">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--dw-orange)] text-xs font-semibold text-[var(--dw-navy)]">
                        {index + 1}
                      </span>
                      {step}
                    </p>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </section>

        <section className="bg-white px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-[var(--dw-orange)]">
                Confiança operacional
              </p>
              <h2 className="mt-3 font-[var(--dw-font-display)] text-3xl font-semibold text-[var(--dw-navy)] md:text-4xl">
                Menos improviso. Mais registro.
              </h2>
              <p className="mt-5 text-base leading-8 text-[var(--dw-gray-500)]">
                O Connect organiza a contratação sob demanda com informações que
                ajudam os dois lados: perfil, disponibilidade, presença, avaliação
                e histórico.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Curadoria documental",
                "Check-in geolocalizado",
                "Avaliação bilateral",
                "Histórico de reputação",
              ].map((item) => (
                <div key={item} className="rounded-md border border-[var(--dw-gray-200)] p-5">
                  <p className="font-semibold text-[var(--dw-navy)]">{item}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--dw-gray-500)]">
                    Um ponto de controle para deixar a operação mais transparente.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-[var(--dw-orange)]">
                  Perguntas frequentes
                </p>
                <h2 className="mt-3 font-[var(--dw-font-display)] text-3xl font-semibold text-[var(--dw-navy)]">
                  O básico para começar.
                </h2>
              </div>
              <div className="space-y-4">
                {faqItems.map((item) => (
                  <Card key={item.question} className="rounded-md">
                    <h3 className="font-semibold text-[var(--dw-navy)]">{item.question}</h3>
                    <p className="mt-2 text-sm leading-6 text-[var(--dw-gray-500)]">
                      {item.answer}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[var(--dw-navy)] px-6 py-16 text-white md:px-12">
          <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-[var(--dw-orange)]">
                Próximo passo
              </p>
              <h2 className="mt-3 max-w-2xl font-[var(--dw-font-display)] text-3xl font-semibold md:text-4xl">
                Cadastre seu perfil e entre na rede Dog Washer Connect.
              </h2>
            </div>
            <Link href="/criar-conta">
              <Button variant="secondary">Começar cadastro</Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--dw-gray-200)] bg-white px-6 py-8 text-center text-xs text-[var(--dw-gray-500)] md:px-12">
        Dog Washer Connect, parte do ecossistema Dog Washer.{" "}
        <Link href="/termos" className="underline">Termos de uso</Link>{" "}
        ·{" "}
        <Link href="/privacidade" className="underline">Privacidade</Link>
      </footer>
    </div>
  );
}
