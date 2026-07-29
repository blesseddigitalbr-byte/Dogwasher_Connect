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
  { href: "/profissional/busca", label: "Busca", icon: "B" },
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
    <div className="min-h-screen bg-[#031427] text-[#d7e6ff]">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#031427]/95 px-4 py-3 backdrop-blur md:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo-dog-washer-connect.png"
              alt="Dog Washer Connect"
              width={64}
              height={64}
              className="h-12 w-12 rounded-sm object-cover md:h-16 md:w-16"
              priority
            />
            <span className="font-[var(--dw-font-display)] text-xs font-bold uppercase leading-tight tracking-wide text-white md:text-sm">
              Dog Washer
              <span className="block text-[var(--dw-orange)]">Connect</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-5 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[11px] font-semibold uppercase tracking-wide text-white/55 transition hover:text-[var(--dw-orange)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <form action={signOut}>
            <button
              type="submit"
              className="rounded-full border border-white/10 px-4 py-2 text-xs font-semibold text-white/70 transition hover:border-[var(--dw-orange)] hover:text-[var(--dw-orange)]"
            >
              Sair
            </button>
          </form>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 pb-28 pt-5 md:px-10 md:pb-12 md:pt-10">
        <section className="rounded-[28px] border border-white/10 bg-[#071d33] p-5 shadow-2xl shadow-black/20 md:p-8">
          <div className="flex flex-col gap-3 md:max-w-3xl">
            <p className="w-fit rounded-full bg-[var(--dw-orange)]/15 px-3 py-1 text-[10px] font-black uppercase tracking-wide text-[var(--dw-orange)]">
              Área interna
            </p>
            <h1 className="font-[var(--dw-font-display)] text-2xl font-black leading-tight text-white md:text-4xl">
              {title}
            </h1>
            {subtitle && <p className="max-w-2xl text-sm leading-6 text-white/65">{subtitle}</p>}
          </div>
        </section>

        <div className="mt-5 md:mt-8">{children}</div>
      </main>

      <nav className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-4 rounded-[24px] border border-white/10 bg-[#071d33]/95 p-2 shadow-2xl shadow-black/40 backdrop-blur md:hidden">
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
