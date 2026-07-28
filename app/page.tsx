import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const petShopImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBGNABi4q-gzPmpPqdf5nE1IYvCm7NYF5FCEya7PQ-Pog44W7gBVgjTKUSxxRRkHQK2OBNXiLVwLFNc7vqbx4wNbxATLKiue1MXArBbkUkyT73uQucyq3xo15zsFR3qmTrKBCnN20JcZkvdkuqUnXC-WfOyp4b4Kso_pj5eputiQ4eSFLrwQ_8SuTHZhwqPC27ddPEly4_643Sr2PQ1vltdvALoA0I8KLdRk7anWnWOqfFFQDjCGrwbYA";
const professionalImage =
  "/professional-dog-washer-uniform.png";

const navItems = [
  { href: "#proposta", label: "A rede" },
  { href: "#estabelecimentos", label: "Para estabelecimentos" },
  { href: "#profissionais", label: "Para profissionais" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#seguranca", label: "Segurança" },
  { href: "#faq", label: "FAQ" },
];

const valueCards = [
  {
    icon: "◇",
    title: "Padrão Dog Washer",
    text: "Profissionais que passam por curadoria rigorosa, garantindo qualidade técnica e postura ética em cada atendimento.",
  },
  {
    icon: "▧",
    title: "Presença registrada",
    text: "Check-in e check-out via geolocalização e QR Code, garantindo transparência total sobre o tempo de trabalho realizado.",
  },
  {
    icon: "⌁",
    title: "Reputação bilateral",
    text: "Sistema de notas para ambos os lados. Os melhores profissionais e estabelecimentos ganham destaque na rede.",
  },
];

const establishmentBenefits = [
  ["Profissionais Qualificados", "Acesso a uma base de profissionais com experiência comprovada."],
  ["Seleção Transparente", "Veja o histórico, avaliações e especialidades antes de aceitar."],
  ["Controle Operacional", "Registro de presença digital e histórico de diárias centralizado."],
];

const professionalBenefits = [
  ["Formação Reconhecida", "Valorizamos seu preparo e técnica frente ao mercado."],
  ["Oportunidades Próximas", "Encontre trabalhos na sua região com geolocalização inteligente."],
  ["Transparência Total", "Saiba o valor e as condições antes mesmo de se candidatar."],
];

const establishmentSteps = [
  "Publique a oportunidade com data, horário e valor.",
  "Conheça os candidatos que se interessaram pela vaga.",
  "Confirme o atendimento com o profissional escolhido.",
  "Acompanhe a entrada e saída em tempo real.",
  "Avalie a experiência para manter a qualidade da rede.",
];

const professionalSteps = [
  "Crie seu perfil com experiências e especialidades.",
  "Encontre oportunidades próximas que encaixam na sua agenda.",
  "Confirme o interesse e aguarde a seleção do pet shop.",
  "Registre sua presença via app ao chegar no local.",
  "Construa sua reputação com avaliações positivas.",
];

const safetyItems = [
  ["Perfis Validados", "Documentação e referências checadas criteriosamente pela nossa equipe."],
  ["Fotos do Local", "O profissional visualiza as instalações antes de aceitar o trabalho."],
  ["Geolocalização", "Rastreamento de presença para segurança de todos os envolvidos."],
  ["Avaliação Bilateral", "Feedbacks reais que regulam o comportamento e a qualidade da rede."],
  ["Histórico Digital", "Todas as interações e diárias ficam registradas para consulta futura."],
  ["Curadoria Ativa", "Nossa equipe atua para garantir que apenas bons parceiros permaneçam."],
];

const useCases = [
  ["Cobertura de faltas", "Resolva imprevistos de última hora sem desmarcar clientes."],
  ["Agenda cheia", "Atenda picos de demanda em feriados ou fins de semana."],
  ["Férias e folgas", "Mantenha a operação rodando durante o descanso do seu time fixo."],
];

const faqItems = [
  [
    "O cadastro é gratuito?",
    "Sim, o cadastro inicial é gratuito tanto para profissionais quanto para estabelecimentos. A operação comercial pode incluir taxas administrativas sobre conexões realizadas com sucesso.",
  ],
  [
    "Como é feita a curadoria dos profissionais?",
    "Analisamos documentação, experiências, referências e dados do perfil para manter um padrão confiável dentro da rede.",
  ],
  [
    "Como funcionam os pagamentos?",
    "O valor deve estar claro na publicação da vaga. Após a conclusão do trabalho, o pagamento segue as regras operacionais definidas pela plataforma.",
  ],
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#031427] text-[#d3e4fe]">
      <Header />

      <main>
        <section className="border-b border-white/5 px-6 pb-16 pt-16 md:px-12 md:pb-20 md:pt-24">
          <div className="mx-auto max-w-6xl text-center">
            <h1 className="mx-auto max-w-5xl font-[var(--dw-font-display)] text-4xl font-extrabold leading-tight md:text-6xl">
              Quando falta um profissional, sua{" "}
              <span className="text-[var(--dw-orange)]">operação não precisa parar.</span>
            </h1>
            <p className="mx-auto mt-8 max-w-3xl text-lg font-semibold leading-8 text-[#dbc2b1]">
              Conectamos pet shops a profissionais qualificados para atendimentos sob
              demanda, garantindo que sua agenda continue cheia e seus clientes
              sempre satisfeitos.
            </p>
            <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/criar-conta?perfil=estabelecimento">
                <Button variant="secondary" className="w-full px-8 py-4 sm:w-auto">
                  Quero contratar profissionais
                </Button>
              </Link>
              <Link href="/criar-conta?perfil=profissional">
                <Button
                  variant="ghost"
                  className="w-full border border-[var(--dw-orange)] px-8 py-4 text-[var(--dw-orange)] hover:bg-white/5 sm:w-auto"
                >
                  Quero encontrar oportunidades
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section id="proposta" className="bg-[#031427] px-6 py-8 md:px-12">
          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
            {valueCards.map((card) => (
              <article
                key={card.title}
                className="rounded-lg border border-white/8 bg-[#0b1c30] p-8 shadow-[0_20px_70px_rgba(0,0,0,0.18)]"
              >
                <p className="text-5xl font-black leading-none text-[var(--dw-orange)]">
                  {card.icon}
                </p>
                <h2 className="mt-8 font-[var(--dw-font-display)] text-2xl font-bold text-[#d3e4fe]">
                  {card.title}
                </h2>
                <p className="mt-5 text-base font-semibold leading-7 text-[#dbc2b1]">
                  {card.text}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="px-6 py-20 text-center md:px-12">
          <div className="mx-auto max-w-4xl">
            <h2 className="font-[var(--dw-font-display)] text-3xl font-semibold leading-tight md:text-4xl">
              Formalizando parcerias, profissionalizando o mercado
            </h2>
            <p className="mt-8 text-lg font-semibold leading-8 text-[#dbc2b1]">
              A Dog Washer Connect não é apenas um mural de vagas. Somos uma
              plataforma que estabelece regras claras e processos seguros para que a
              relação entre estabelecimentos e freelancers seja justa, profissional
              e produtiva.
            </p>
          </div>
        </section>

        <section id="estabelecimentos" className="bg-[#0b1c30] px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-2 md:items-center">
            <div>
              <Pill>Para estabelecimentos</Pill>
              <h2 className="mt-8 font-[var(--dw-font-display)] text-3xl font-semibold leading-tight md:text-5xl">
                Sua equipe completa, sempre que precisar.
              </h2>
              <FeatureList items={establishmentBenefits} />
              <Link href="/criar-conta?perfil=estabelecimento" className="mt-10 inline-block">
                <Button variant="secondary" className="px-8 py-4">Cadastrar meu Pet Shop</Button>
              </Link>
            </div>
            <FramedImage src={petShopImage} alt="Pet shop profissional com atendimento de banho e tosa" />
          </div>
        </section>

        <section id="profissionais" className="bg-[#031427] px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-2 md:items-center">
            <FramedImage
              src={professionalImage}
              alt="Profissional Dog Washer segurando cachorro em ambiente pet"
              className="order-2 md:order-1"
              fit="contain"
            />
            <div className="order-1 md:order-2">
              <Pill>Para profissionais</Pill>
              <h2 className="mt-8 font-[var(--dw-font-display)] text-3xl font-semibold leading-tight md:text-5xl">
                Liberdade e reconhecimento para sua carreira.
              </h2>
              <FeatureList items={professionalBenefits} />
              <Link href="/criar-conta?perfil=profissional" className="mt-10 inline-block">
                <Button
                  variant="ghost"
                  className="border border-[var(--dw-orange)] px-8 py-4 text-[var(--dw-orange)] hover:bg-white/5"
                >
                  Criar meu Perfil Profissional
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section id="como-funciona" className="bg-[#000f21] px-6 py-16 md:px-12 md:py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-center font-[var(--dw-font-display)] text-3xl font-semibold md:text-4xl">
              Simples, prático e seguro
            </h2>
            <div className="mt-10 grid gap-8 md:grid-cols-2">
              <ProcessCard title="Para estabelecimentos" steps={establishmentSteps} solid />
              <ProcessCard title="Para profissionais" steps={professionalSteps} />
            </div>
          </div>
        </section>

        <section id="seguranca" className="bg-[#031427] px-6 py-16 md:px-12 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <h2 className="font-[var(--dw-font-display)] text-3xl font-semibold md:text-4xl">
                Confiança Operacional
              </h2>
              <p className="mt-4 text-sm font-semibold text-[#dbc2b1]">
                Tecnologia e curadoria humana para um ambiente de trabalho seguro.
              </p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {safetyItems.map(([title, text]) => (
                <article key={title} className="rounded-lg border border-white/8 bg-[#0b1c30] p-7 text-center">
                  <p className="text-2xl font-bold text-[var(--dw-orange)]">⌾</p>
                  <h3 className="mt-5 font-bold">{title}</h3>
                  <p className="mt-4 text-sm font-semibold leading-6 text-[#dbc2b1]">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#0b1c30] px-6 py-14 text-center md:px-12">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-[var(--dw-font-display)] text-2xl font-semibold md:text-3xl">
              Bons profissionais também escolhem onde trabalhar
            </h2>
            <p className="mt-6 text-base font-semibold leading-7 text-[#dbc2b1]">
              Nossa rede identifica e destaca estabelecimentos que oferecem boas
              condições de trabalho, infraestrutura adequada e respeito profissional.
            </p>
            <p className="mt-6 text-2xl tracking-[0.2em] text-[var(--dw-orange)]">★★★★★</p>
          </div>
        </section>

        <section className="bg-[#031427] px-6 py-14 md:px-12">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-center font-[var(--dw-font-display)] text-3xl font-semibold">
              Quando usar o Dog Washer Connect?
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {useCases.map(([title, text]) => (
                <article key={title} className="rounded-lg border border-white/10 bg-[#031427] p-7">
                  <p className="text-2xl font-bold text-[var(--dw-orange)]">⌁</p>
                  <h3 className="mt-4 font-bold">{title}</h3>
                  <p className="mt-3 text-sm font-semibold leading-6 text-[#dbc2b1]">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="bg-[#031427] px-6 py-14 md:px-12">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-center font-[var(--dw-font-display)] text-3xl font-semibold">
              Perguntas Frequentes
            </h2>
            <div className="mt-10 space-y-4">
              {faqItems.map(([question, answer]) => (
                <details key={question} className="group rounded-lg border border-white/10 bg-[#031427]">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-sm font-bold">
                    {question}
                    <span className="text-[var(--dw-orange)] transition-transform group-open:rotate-180">⌄</span>
                  </summary>
                  <p className="px-5 pb-5 text-sm font-semibold leading-6 text-[#dbc2b1]">{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#031427] px-6 py-16 text-[#d3e4fe] md:px-12">
          <div className="mx-auto max-w-5xl rounded-[36px] border border-white/10 bg-[#031427] p-8 text-center md:p-14">
            <h2 className="font-[var(--dw-font-display)] text-3xl font-semibold md:text-4xl">
              Pronto para profissionalizar sua forma de trabalhar?
            </h2>
            <div className="mx-auto mt-10 grid max-w-3xl gap-6 md:grid-cols-2">
              <FinalCta
                title="Para estabelecimentos"
                text="Garanta que seu pet shop nunca fique sem mão de obra qualificada."
                href="/criar-conta?perfil=estabelecimento"
                label="Cadastrar Pet Shop"
                filled
              />
              <FinalCta
                title="Para profissionais"
                text="Encontre as melhores oportunidades e valorize seu currículo."
                href="/criar-conta?perfil=profissional"
                label="Criar Perfil Profissional"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#031427]/95 px-6 py-4 backdrop-blur md:px-12">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-4">
          <Image
            src="/logo-dog-washer-connect.png"
            alt="Dog Washer Connect"
            width={38}
            height={38}
            className="h-9 w-9 rounded-sm object-cover"
            priority
          />
          <span className="hidden font-[var(--dw-font-display)] text-xl font-bold uppercase text-[var(--dw-orange)] sm:inline">
            Dog Washer Connect
          </span>
        </Link>
        <div className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="text-xs font-bold uppercase text-[#dbc2b1] hover:text-[var(--dw-orange)]">
              {item.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login" className="hidden text-sm font-bold text-[var(--dw-orange)] sm:inline">
            Entrar
          </Link>
          <Link href="/criar-conta">
            <Button variant="secondary">Criar conta</Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex rounded-full bg-[var(--dw-orange)]/15 px-4 py-1 text-xs font-black uppercase text-[var(--dw-orange)]">
      {children}
    </span>
  );
}

function FeatureList({ items }: { items: string[][] }) {
  return (
    <div className="mt-8 space-y-6">
      {items.map(([title, text]) => (
        <div key={title} className="flex gap-4">
          <span className="mt-1 text-xl font-bold text-[var(--dw-orange)]">◇</span>
          <div>
            <h3 className="font-bold">{title}</h3>
            <p className="mt-1 text-sm font-semibold leading-6 text-[#dbc2b1]">{text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function FramedImage({
  src,
  alt,
  className = "",
  fit = "cover",
}: {
  src: string;
  alt: string;
  className?: string;
  fit?: "cover" | "contain";
}) {
  return (
    <div className={`relative aspect-[1.7/1] overflow-hidden rounded-3xl border border-white/10 bg-[#031427] ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 768px) 520px, 90vw"
        className={fit === "contain" ? "object-contain" : "object-cover"}
      />
    </div>
  );
}

function ProcessCard({ title, steps, solid = false }: { title: string; steps: string[]; solid?: boolean }) {
  return (
    <article className="rounded-lg border border-white/8 bg-[#0b1c30] p-7">
      <h3 className="text-xs font-black uppercase text-[var(--dw-orange)]">{title}</h3>
      <div className="mt-7 space-y-5">
        {steps.map((step, index) => (
          <p key={step} className="flex items-start gap-4 text-sm font-semibold leading-6 text-[#d3e4fe]">
            <span
              className={
                solid
                  ? "flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--dw-orange)] text-xs font-black text-[#031427]"
                  : "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--dw-orange)] text-xs font-black text-[var(--dw-orange)]"
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
  label,
  filled = false,
}: {
  title: string;
  text: string;
  href: string;
  label: string;
  filled?: boolean;
}) {
  return (
    <article className="rounded-lg border border-white/10 bg-[#0b1c30] p-7 text-left">
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-4 min-h-12 text-sm font-semibold leading-6 text-[#dbc2b1]">{text}</p>
      <Link href={href} className="mt-6 block">
        <Button
          variant={filled ? "secondary" : "ghost"}
          className={
            filled
              ? "w-full"
              : "w-full border border-[var(--dw-orange)] text-[var(--dw-orange)] hover:bg-white/5"
          }
        >
          {label}
        </Button>
      </Link>
    </article>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#031427] px-6 py-12 md:px-12">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.4fr_0.8fr_0.8fr]">
        <div>
          <div className="flex items-center gap-4">
            <Image
              src="/logo-dog-washer-connect.png"
              alt="Dog Washer Connect"
              width={42}
              height={42}
              className="h-10 w-10 rounded-sm object-cover"
            />
            <span className="font-[var(--dw-font-display)] text-lg font-bold uppercase text-[var(--dw-orange)]">
              Dog Washer Connect
            </span>
          </div>
          <p className="mt-6 max-w-sm text-sm font-semibold leading-7 text-white/70">
            A plataforma que eleva o nível técnico e profissional do mercado pet
            no Brasil, conectando talentos e negócios com transparência.
          </p>
        </div>
        <FooterColumn title="Institucional" links={navItems.slice(0, 4)} />
        <FooterColumn
          title="Legal"
          links={[
            { href: "/termos", label: "Termos de Uso" },
            { href: "/privacidade", label: "Privacidade" },
            { href: "/login", label: "Contato" },
          ]}
        />
      </div>
      <div className="mx-auto mt-12 flex max-w-6xl flex-col justify-between gap-4 border-t border-white/10 pt-6 text-xs font-semibold text-white/45 md:flex-row">
        <p>© 2026 Dog Washer Connect. Todos os direitos reservados.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-[var(--dw-orange)]">Instagram</a>
          <a href="#" className="hover:text-[var(--dw-orange)]">LinkedIn</a>
          <a href="#" className="hover:text-[var(--dw-orange)]">WhatsApp</a>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h3 className="font-bold text-[var(--dw-orange)]">{title}</h3>
      <div className="mt-6 space-y-4 text-sm font-semibold text-white/68">
        {links.map((link) => (
          <a key={link.href} href={link.href} className="block hover:text-[var(--dw-orange)]">
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}
