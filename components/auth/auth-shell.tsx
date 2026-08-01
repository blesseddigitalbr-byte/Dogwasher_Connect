import Image from "next/image";
import Link from "next/link";

type AuthShellProps = {
  title: string;
  subtitle: string;
  eyebrow?: string;
  children: React.ReactNode;
};

export function AuthShell({ title, subtitle, eyebrow, children }: AuthShellProps) {
  return (
    <main className="grid min-h-screen bg-[#f8f9fa] text-[#191c1d] lg:grid-cols-[1.05fr_0.95fr]">
      <section className="relative hidden overflow-hidden bg-[#121c29] lg:block">
        <Image
          src="/professional-dog-washer-uniform.png"
          alt="Profissional Dog Washer com uniforme oficial"
          fill
          priority
          sizes="55vw"
          className="object-cover object-[56%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121c29] via-[#121c29]/35 to-[#121c29]/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(254,166,25,0.18),transparent_32%),linear-gradient(90deg,rgba(18,28,41,0.92),rgba(18,28,41,0.24))]" />

        <div className="relative z-10 flex h-full min-h-screen flex-col justify-between p-10 xl:p-12">
          <Link href="/" className="flex items-center gap-4 text-white">
            <span className="flex size-20 items-center justify-center rounded-2xl border border-white/15 bg-white/92 p-2 shadow-2xl">
              <Image
                src="/logo-dog-washer-connect.png"
                alt="Dog Washer Connect"
                width={120}
                height={120}
                className="h-full w-full object-contain"
              />
            </span>
            <span>
              <span className="block text-xl font-black tracking-tight">Dog Washer Connect</span>
              <span className="text-xs font-bold uppercase tracking-[0.24em] text-[#fea619]">
                Rede credenciada
              </span>
            </span>
          </Link>

          <div className="max-w-xl">
            <p className="mb-4 inline-flex rounded-full bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#fea619]">
              {eyebrow ?? "Mercado pet profissional"}
            </p>
            <h1 className="font-[var(--dw-font-display)] text-5xl font-black leading-[1.02] tracking-[-0.04em] text-white xl:text-6xl">
              Conectando excelência ao cuidado pet.
            </h1>
            <p className="mt-5 max-w-lg text-lg font-semibold leading-8 text-[#d9e3f6]/90">
              Uma plataforma segura para profissionais independentes e estabelecimentos que precisam de agilidade, reputação e operação confiável.
            </p>
            <div className="mt-8 grid max-w-md grid-cols-2 gap-6 border-t border-white/12 pt-6">
              <div>
                <span className="block text-3xl font-black text-[#fea619]">2.5k+</span>
                <span className="text-sm font-semibold text-white/70">Profissionais ativos</span>
              </div>
              <div>
                <span className="block text-3xl font-black text-[#fea619]">150k+</span>
                <span className="text-sm font-semibold text-white/70">Atendimentos realizados</span>
              </div>
            </div>
          </div>

          <p className="text-xs font-semibold text-white/45">
            © 2024 Dog Washer Connect — Profissionais independentes.
          </p>
        </div>
      </section>

      <section className="flex min-h-screen items-center justify-center px-5 py-8 sm:px-8 lg:px-12">
        <div className="w-full max-w-[440px]">
          <Link href="/" className="mb-8 flex flex-col items-center lg:hidden">
            <Image
              src="/logo-dog-washer-connect.png"
              alt="Dog Washer Connect"
              width={156}
              height={96}
              priority
              className="h-auto w-36 object-contain"
            />
          </Link>

          <div className="mb-8 text-center lg:text-left">
            <h2 className="font-[var(--dw-font-display)] text-4xl font-black tracking-[-0.03em] text-[#191c1d]">
              {title}
            </h2>
            <p className="mt-3 text-base font-medium leading-7 text-[#44474c]">
              {subtitle}
            </p>
          </div>

          <div className="rounded-2xl border border-[#e1e3e4] bg-white p-6 shadow-[0_24px_70px_rgba(18,28,41,0.10)] sm:p-7">
            {children}
          </div>
        </div>
      </section>
    </main>
  );
}
