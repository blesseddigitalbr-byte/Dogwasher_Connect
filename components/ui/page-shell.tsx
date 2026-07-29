import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { signOut } from "@/features/auth/actions";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/profissional/dashboard", label: "Profissional" },
  { href: "/estabelecimento/dashboard", label: "Estabelecimento" },
  { href: "/admin/dashboard", label: "Admin" },
];

export function PageShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col bg-[#f7f5f2]">
      <header className="border-b border-[var(--dw-gray-200)] bg-white px-5 py-4 md:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo-dog-washer-connect.png"
              alt="Dog Washer Connect"
              width={48}
              height={48}
              className="h-12 w-12 rounded-sm object-cover"
            />
            <span className="font-[var(--dw-font-display)] text-sm font-bold uppercase text-[var(--dw-navy)]">
              Dog Washer <span className="text-[var(--dw-orange)]">Connect</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-4 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs font-semibold uppercase text-[var(--dw-gray-500)] hover:text-[var(--dw-navy)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <form action={signOut}>
            <Button variant="ghost" type="submit" className="text-sm">
              Sair
            </Button>
          </form>
        </div>
      </header>
      <main className="mx-auto w-full max-w-7xl flex-1 px-5 py-8 md:px-10 md:py-10">
        <div className="rounded-lg bg-[var(--dw-navy)] px-6 py-7 text-white md:px-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--dw-orange)]">
            Área interna
          </p>
          <h1 className="mt-3 font-[var(--dw-font-display)] text-3xl font-semibold">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-2 max-w-3xl text-sm leading-6 text-white/70">{subtitle}</p>
          )}
        </div>
        <div className="mt-8">{children}</div>
      </main>
    </div>
  );
}
