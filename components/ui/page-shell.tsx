import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { signOut } from "@/features/auth/actions";

type NavItem = {
  href: string;
  label: string;
  icon: string;
};

const defaultNavItems: NavItem[] = [
  { href: "/profissional/dashboard", label: "Home", icon: "H" },
  { href: "/profissional/oportunidades", label: "Vagas", icon: "V" },
  { href: "/profissional/perfil", label: "Perfil", icon: "P" },
  { href: "/estabelecimento/dashboard", label: "Painel", icon: "D" },
];

export function PageShell({
  title,
  subtitle,
  children,
  navItems = defaultNavItems,
}: {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  navItems?: NavItem[];
}) {
  return (
    <div className="min-h-screen bg-[#f5f7fb] text-[#071426] md:flex">
      <aside className="hidden min-h-screen w-[270px] shrink-0 flex-col bg-[#061426] px-5 py-7 text-white md:flex">
        <Link href="/" className="flex flex-col items-center gap-3">
          <Image
            src="/logo-dog-washer-connect.png"
            alt="Dog Washer Connect"
            width={104}
            height={104}
            className="h-24 w-24 rounded-sm object-cover"
            priority
          />
        </Link>

        <nav className="mt-12 flex flex-col gap-2">
          {navItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-black transition",
                index === 0
                  ? "bg-[var(--dw-orange)] text-[#061426] shadow-sm shadow-[var(--dw-orange)]/15"
                  : "text-white/72 hover:bg-white/8 hover:text-white",
              ].join(" ")}
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-current/20 text-xs">
                {item.icon}
              </span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto border-t border-white/15 pt-5">
          <p className="rounded-xl bg-white/5 px-4 py-3 text-xs font-bold text-white/65">
            System Status: <span className="text-[var(--dw-orange)]">Active</span>
          </p>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-30 border-b border-white/10 bg-[#061426]/98 px-4 py-3 text-white backdrop-blur md:border-[#dbe3ef] md:bg-white/95 md:px-8 md:text-[#071426]">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-3 md:hidden">
              <Image
                src="/logo-dog-washer-connect.png"
                alt="Dog Washer Connect"
                width={56}
                height={56}
                className="h-12 w-12 rounded-sm object-cover"
                priority
              />
              <span className="font-[var(--dw-font-display)] text-xs font-bold uppercase leading-tight tracking-wide text-white">
                Dog Washer
                <span className="block text-[var(--dw-orange)]">Connect</span>
              </span>
            </Link>

            <div className="hidden text-xs font-semibold text-[#637083] md:block">
              Portal &gt; Plataforma &gt; <span className="text-[#071426]">Visão consolidada</span>
            </div>

            <div className="ml-auto flex items-center gap-3">
              <span className="hidden rounded-lg border border-[#dbe3ef] bg-[#f7f9fd] px-3 py-2 text-xs font-bold text-[#071426] md:inline-flex">
                São Paulo - Central
              </span>
              <form action={signOut}>
                <button
                  type="submit"
                  className="rounded-lg border border-white/20 px-4 py-2 text-xs font-black text-white transition hover:border-[var(--dw-orange)] hover:text-[var(--dw-orange)] md:border-[#dbe3ef] md:text-[#071426]"
                >
                  Sair
                </button>
              </form>
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-7xl px-4 pb-28 pt-6 md:px-8 md:pb-10">
          <nav className="mb-5 grid grid-cols-4 gap-2 md:hidden">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "rounded-2xl border px-2 py-3 text-center text-[10px] font-black uppercase tracking-wide shadow-sm",
                  index === 0
                    ? "border-[var(--dw-orange)] bg-[var(--dw-orange-soft)] text-[var(--dw-orange-muted)]"
                    : "border-[#dbe3ef] bg-white text-[#4d5b6f]",
                ].join(" ")}
              >
                <span className="mb-1 block text-xs">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>

          <section className="mb-6 rounded-[20px] border border-[#dbe3ef] bg-white p-4 shadow-sm md:border-0 md:bg-transparent md:p-0 md:shadow-none">
            <h1 className="font-[var(--dw-font-display)] text-2xl font-black leading-tight text-[#071426] md:text-4xl">
              {title}
            </h1>
            {subtitle && <p className="mt-2 max-w-3xl text-sm leading-6 text-[#4d5b6f]">{subtitle}</p>}
          </section>

          {children}
        </main>
      </div>

      <nav className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-4 rounded-[24px] border border-white/10 bg-[#061426]/95 p-2 shadow-2xl shadow-black/40 backdrop-blur md:hidden">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[10px] font-semibold text-white/55 transition hover:bg-white/5 hover:text-[var(--dw-orange)]"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 text-xs text-[var(--dw-orange)]">
              {item.icon}
            </span>
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
