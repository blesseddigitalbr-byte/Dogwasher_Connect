import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "#proposta", label: "A rede" },
  { href: "#estabelecimentos", label: "Estabelecimentos" },
  { href: "#profissionais", label: "Profissionais" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#seguranca", label: "Segurança" },
  { href: "#faq", label: "FAQ" },
];

const valueCards = [
  {
    marker: "01",
    title: "Padrão Dog Washer",
    text: "Profissionais passam por curadoria para elevar qualidade técnica, postura e previsibilidade em cada atendimento.",
  },
  {
    marker: "02",
    title: "Presença registrada",
    text: "Check-in e check-out ajudam a dar transparência para o tempo de trabalho realizado no estabelecimento.",
  },
  {
    marker: "03",
    title: "Reputação bilateral",
    text: "Os dois lados avaliam a experiência, criando uma rede mais justa, profissional e confiável.",
  },
];

const establishmentBenefits = [
  {
    title: "Profissionais qualificados",
    text: "Acesso a uma base de profissionais com experiência e dados de perfil organizados.",
  },
  {
    title: "Seleção transparente",
    text: "Veja histórico, avaliações e especialidades antes de confirmar uma diária.",
  },
  {
    title: "Controle operacional",
    text: "Centralize oportunidades, presença, conclusão e avaliação do atendimento.",
  },
];

const professionalBenefits = [
  {
    title: "Formação reconhecida",
    text: "Valorize sua técnica, sua experiência e seu preparo dentro de uma rede especializada.",
  },
  {
    title: "Oportunidades próximas",
    text: "Encontre trabalhos que combinam com sua agenda e seu raio de atendimento.",
  },
  {
    title: "Condições claras",
    text: "Veja informações importantes antes de demonstrar interesse por uma oportunidade.",
  },
];

const establishmentSteps = [
  "Publique a oportunidade com data, horário, endereço e valor.",
  "Conheça os candidatos interessados na vaga.",
  "Confirme o atendimento com o profissional escolhido.",
  "Acompanhe entrada e saída com registro de presença.",
  "Avalie a experiência para manter a qualidade da rede.",
];

const professionalSteps = [
  "Crie seu perfil com experiências e especialidades.",
  "Encontre oportunidades próximas que encaixam na sua agenda.",
  "Confirme interesse e aguarde a seleção do estabelecimento.",
  "Registre sua presença ao chegar no local combinado.",
  "Construa reputação com avaliações positivas.",
];

const safetyItems = [
  "Perfis validados",
  "Fotos e informações do local",
  "Geolocalização",
  "Avaliação bilateral",
  "Histórico digital",
  "Curadoria ativa",
];

const useCases = [
  {
    title: "Cobertura de faltas",
    text: "Resolva imprevistos de última hora sem desmarcar clientes.",
  },
  {
    title: "Agenda cheia",
    text: "Atenda picos de demanda em feriados, finais de semana e datas fortes.",
  },
  {
    title: "Férias e folgas",
    text: "Mantenha a operação rodando durante o descanso do seu time fixo.",
  },
];

const faqItems = [
  {
    question: "O cadastro é gratuito?",
    answer:
      "Sim, o cadastro inicial é gratuito para profissionais e estabelecimentos. A operação comercial pode incluir taxas sobre conexões concluídas.",
  },
  {
    question: "Como é feita a curadoria dos profissionais?",
    answer:
      "A proposta é analisar dados de cadastro, experiência, documentação e histórico para manter um padrão confiável na rede.",
  },
  {
    question: "Como funcionam os pagamentos?",
    answer:
      "O valor da diária deve estar claro na oportunidade. O fluxo financeiro pode evoluir conforme as regras operacionais da plataforma.",
  },
  {
    question: "Por que a reputação é bilateral?",
    answer:
      "Porque bons profissionais também escolhem onde trabalhar. A rede precisa proteger qualidade, respeito e responsabilidade dos dois lados.",
  },
];

function LogoMark({ size = 48 }: { size?: number }) {
  return (
    <Image
      src="/logo-dog-washer-connect.png"
      alt="Dog Washer Connect"
      width={size}
      height={size}
      className="rounded-md object-cover"
      priority
    />
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-wide text-[var(--dw-orange)]">
      {children}
    </p>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--dw-navy)] text-white">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[var(--dw-navy)]/95 px-5 py-4 backdrop-blur md:px-10">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-5">
          <Link href="/" className="flex items-center gap-3" aria-label="Dog Washer Connect">
            <LogoMark size={42} />
            <span className="hidden font-[var(--dw-font-display)] text-sm font-semibold uppercase text-[var(--dw-orange)] sm:inline">
              Dog Washer Connect
            </span>
          </Link>

          <div className="hidden items-center gap-5 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-xs font-semibold uppercase text-white/62 transition-colors hover:text-[var(--dw-orange)]"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link href="/login" className="hidden text-sm font-semibold text-white/75 hover:text-white sm:inline">
              Entrar
            </Link>
            <Link href="/criar-conta">
              <Button variant="secondary" className="text-sm">Criar conta</Button>
            </Link>
          </div>
        </nav>
      </header>

      <main>
        <section className="px-5 pb-16 pt-14 md:px-10 md:pb-24 md:pt-20">
          <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1fr_420px] md:items-center">
            <div className="max-w-4xl">
              <SectionLabel>Rede profissional de banho e tosa</SectionLabel>
              <h1 className="mt-5 font-[var(--dw-font-display)] text-4xl font-bold leading-tight md:text-6xl">
                Quando falta um profissional, sua operação não precisa parar.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72">
                Conectamos pet shops a profissionais qualificados para atendimentos
                sob demanda, mantendo a agenda cheia e os clientes bem atendidos.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link href="/criar-conta?perfil=estabelecimento">
                  <Button variant="secondary" className="w-full px-7 py-4 sm:w-auto">
                    Quero contratar profissionais
                  </Button>
                </Link>
                <Link href="/criar-conta?perfil=profissional">
                  <Button
                    variant="ghost"
                    className="w-full border border-[var(--dw-orange)] px-7 py-4 text-[var(--dw-orange)] hover:bg-white/5 sm:w-auto"
                  >
                    Quero encontrar oportunidades
                  </Button>
                </Link>
              </div>
            </div>

            <div className="rounded-md border border-white/10 bg-white/[0.04] p-6">
              <div className="mx-auto max-w-[280px]">
                <LogoMark size={280} />
              </div>
              <div className="mt-6 grid gap-3 text-sm text-white/70">
                <p className="rounded-md bg-white/[0.04] p-4">Curadoria antes da conexão.</p>
                <p className="rounded-md bg-white/[0.04] p-4">Registro de presença na operação.</p>
                <p className="rounded-md bg-white/[0.04] p-4">Reputação para os dois lados.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="proposta" className="bg-[#000f21] px-5 py-14 md:px-10">
          <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
            {valueCards.map((card) => (
              <article
                key={card.title}
                className="rounded-md border border-white/10 bg-white/[0.04] p-7 transition-colors hover:border-[var(--dw-orange)]"
              >
                <p className="text-sm font-bold text-[var(--dw-orange)]">{card.marker}</p>
                <h2 className="mt-5 font-[var(--dw-font-display)] text-2xl font-semibold">
                  {card.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-white/65">{card.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-[var(--dw-navy)] px-5 py-18 text-center md:px-10 md:py-24">
          <div className="mx-auto max-w-4xl">
            <h2 className="font-[var(--dw-font-display)] text-3xl font-semibold md:text-4xl">
              Formalizando parcerias, profissionalizando o mercado.
            </h2>
            <p className="mt-6 text-lg leading-8 text-white/68">
              A Dog Washer Connect não é apenas um mural de vagas. É uma plataforma
              para estabelecer regras claras e processos seguros para que a relação
              entre estabelecimentos e freelancers seja justa, profissional e produtiva.
            </p>
          </div>
        </section>

        <section id="estabelecimentos" className="bg-[#0b1c30] px-5 py-16 md:px-10 md:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2 md:items-center">
            <div>
              <SectionLabel>Para estabelecimentos</SectionLabel>
              <h2 className="mt-4 font-[var(--dw-font-display)] text-3xl font-semibold leading-tight md:text-5xl">
                Sua equipe completa, sempre que precisar.
              </h2>
              <div className="mt-8 space-y-5">
                {establishmentBenefits.map((item) => (
                  <div key={item.title} className="border-l-2 border-[var(--dw-orange)] pl-5">
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-white/65">{item.text}</p>
                  </div>
                ))}
              </div>
              <Link href="/criar-conta?perfil=estabelecimento" className="mt-8 inline-block">
                <Button variant="secondary">Cadastrar meu pet shop</Button>
              </Link>
            </div>

            <div className="rounded-md border border-white/10 bg-white p-6 text-[var(--dw-navy)]">
              <p className="text-sm font-semibold uppercase text-[var(--dw-orange)]">
                Operação sob demanda
              </p>
              <div className="mt-6 space-y-4">
                {useCases.map((item) => (
                  <div key={item.title} className="rounded-md border border-[var(--dw-gray-200)] p-5">
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[var(--dw-gray-500)]">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="profissionais" className="bg-[var(--dw-navy)] px-5 py-16 md:px-10 md:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2 md:items-center">
            <div className="order-2 rounded-md border border-white/10 bg-white/[0.04] p-7 md:order-1">
              <h3 className="font-[var(--dw-font-display)] text-2xl font-semibold">
                Bons profissionais também escolhem onde trabalhar.
              </h3>
              <p className="mt-4 text-base leading-8 text-white/68">
                A rede também valoriza estabelecimentos que oferecem boas condições,
                infraestrutura adequada e respeito profissional. Essa reciprocidade
                atrai talentos melhores e reduz relações improvisadas.
              </p>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {["Respeito", "Infraestrutura", "Clareza", "Histórico"].map((item) => (
                  <p key={item} className="rounded-md bg-white/[0.04] p-4 text-sm font-semibold">
                    {item}
                  </p>
                ))}
              </div>
            </div>

            <div className="order-1 md:order-2">
              <SectionLabel>Para profissionais</SectionLabel>
              <h2 className="mt-4 font-[var(--dw-font-display)] text-3xl font-semibold leading-tight md:text-5xl">
                Liberdade e reconhecimento para sua carreira.
              </h2>
              <div className="mt-8 space-y-5">
                {professionalBenefits.map((item) => (
                  <div key={item.title} className="border-l-2 border-[var(--dw-orange)] pl-5">
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-white/65">{item.text}</p>
                  </div>
                ))}
              </div>
              <Link href="/criar-conta?perfil=profissional" className="mt-8 inline-block">
                <Button
                  variant="ghost"
                  className="border border-[var(--dw-orange)] text-[var(--dw-orange)] hover:bg-white/5"
                >
                  Criar meu perfil profissional
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section id="como-funciona" className="bg-[#000f21] px-5 py-16 md:px-10 md:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <SectionLabel>Como funciona</SectionLabel>
              <h2 className="mt-4 font-[var(--dw-font-display)] text-3xl font-semibold md:text-4xl">
                Simples, prático e seguro.
              </h2>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              <ProcessCard title="Para estabelecimentos" steps={establishmentSteps} tone="solid" />
              <ProcessCard title="Para profissionais" steps={professionalSteps} tone="outline" />
            </div>
          </div>
        </section>

        <section id="seguranca" className="bg-[var(--dw-navy)] px-5 py-16 md:px-10 md:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <SectionLabel>Confiança operacional</SectionLabel>
              <h2 className="mt-4 font-[var(--dw-font-display)] text-3xl font-semibold md:text-4xl">
                Tecnologia e curadoria humana para um ambiente mais seguro.
              </h2>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {safetyItems.map((item) => (
                <div
                  key={item}
                  className="rounded-md border border-white/10 bg-white/[0.04] p-6 text-center"
                >
                  <p className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[var(--dw-orange)] text-sm font-bold text-[var(--dw-navy)]">
                    ✓
                  </p>
                  <h3 className="mt-4 font-semibold">{item}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/62">
                    Um ponto de controle para deixar a conexão mais transparente.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="bg-[#000f21] px-5 py-16 md:px-10 md:py-24">
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <SectionLabel>Perguntas frequentes</SectionLabel>
              <h2 className="mt-4 font-[var(--dw-font-display)] text-3xl font-semibold md:text-4xl">
                O básico para começar.
              </h2>
            </div>
            <div className="mt-10 space-y-4">
              {faqItems.map((item) => (
                <details
                  key={item.question}
                  className="group rounded-md border border-white/10 bg-white/[0.04] p-6"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                    {item.question}
                    <span className="text-[var(--dw-orange)] group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-4 text-sm leading-7 text-white/65">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[var(--dw-orange)] px-5 py-16 text-[var(--dw-navy)] md:px-10 md:py-20">
          <div className="mx-auto max-w-7xl rounded-md bg-white p-8 text-center md:p-14">
            <h2 className="mx-auto max-w-3xl font-[var(--dw-font-display)] text-3xl font-bold leading-tight md:text-5xl">
              Pronto para profissionalizar sua forma de trabalhar?
            </h2>
            <div className="mx-auto mt-10 grid max-w-4xl gap-5 md:grid-cols-2">
              <FinalCta
                title="Para estabelecimentos"
                text="Garanta que seu pet shop não fique sem mão de obra qualificada."
                href="/criar-conta?perfil=estabelecimento"
                action="Cadastrar pet shop"
                filled
              />
              <FinalCta
                title="Para profissionais"
                text="Encontre boas oportunidades e valorize seu currículo."
                href="/criar-conta?perfil=profissional"
                action="Criar perfil profissional"
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-[#000f21] px-5 py-12 text-white md:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.4fr_0.8fr_0.8fr]">
          <div>
            <div className="flex items-center gap-3">
              <LogoMark size={48} />
              <span className="font-[var(--dw-font-display)] text-lg font-semibold uppercase text-[var(--dw-orange)]">
                Dog Washer Connect
              </span>
            </div>
            <p className="mt-5 max-w-md text-sm leading-7 text-white/60">
              A plataforma que eleva o nível técnico e profissional do mercado pet
              no Brasil, conectando talentos e negócios com transparência.
            </p>
          </div>
          <FooterLinks title="Institucional" items={navItems} />
          <div>
            <h3 className="font-semibold text-[var(--dw-orange)]">Legal</h3>
            <div className="mt-5 space-y-3 text-sm text-white/60">
              <Link href="/termos" className="block hover:text-white">Termos de uso</Link>
              <Link href="/privacidade" className="block hover:text-white">Privacidade</Link>
              <Link href="/login" className="block hover:text-white">Entrar</Link>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-xs text-white/45">
          © 2026 Dog Washer Connect. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}

function ProcessCard({
  title,
  steps,
  tone,
}: {
  title: string;
  steps: string[];
  tone: "solid" | "outline";
}) {
  return (
    <article className="rounded-md border border-white/10 bg-white/[0.04] p-7">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--dw-orange)]">
        {title}
      </h3>
      <div className="mt-7 space-y-5">
        {steps.map((step, index) => (
          <p key={step} className="flex gap-4 text-sm leading-7 text-white/70">
            <span
              className={
                tone === "solid"
                  ? "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--dw-orange)] text-sm font-bold text-[var(--dw-navy)]"
                  : "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--dw-orange)] text-sm font-bold text-[var(--dw-orange)]"
              }
            >
              {index + 1}
            </span>
            {step}
          </p>
        ))}
      </div>
    </article>
  );
}

function FinalCta({
  title,
  text,
  href,
  action,
  filled = false,
}: {
  title: string;
  text: string;
  href: string;
  action: string;
  filled?: boolean;
}) {
  return (
    <article className="rounded-md border border-[var(--dw-gray-200)] p-6 text-left">
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-[var(--dw-gray-500)]">{text}</p>
      <Link href={href} className="mt-6 block">
        <Button
          variant={filled ? "primary" : "ghost"}
          className={
            filled
              ? "w-full"
              : "w-full border border-[var(--dw-navy)] text-[var(--dw-navy)]"
          }
        >
          {action}
        </Button>
      </Link>
    </article>
  );
}

function FooterLinks({
  title,
  items,
}: {
  title: string;
  items: { href: string; label: string }[];
}) {
  return (
    <div>
      <h3 className="font-semibold text-[var(--dw-orange)]">{title}</h3>
      <div className="mt-5 space-y-3 text-sm text-white/60">
        {items.map((item) => (
          <a key={item.href} href={item.href} className="block hover:text-white">
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
}
