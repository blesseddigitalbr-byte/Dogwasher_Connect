import { ReactNode } from "react";
import { signOut } from "@/features/auth/actions";
import { Button } from "@/components/ui/button";

/**
 * Casca de layout simples para áreas autenticadas (profissional,
 * estabelecimento, admin) enquanto o design system completo dessas
 * áreas não é construído a fundo — mantém navegação e logout
 * funcionando desde já.
 */
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
    <div className="flex flex-1 flex-col bg-[var(--dw-off-white)]">
      <header className="flex items-center justify-between border-b border-[var(--dw-gray-200)] bg-white px-6 py-4 md:px-10">
        <span className="font-[var(--dw-font-display)] text-base font-semibold text-[var(--dw-navy)]">
          Dog Washer <span className="text-[var(--dw-orange)]">Connect</span>
        </span>
        <form action={signOut}>
          <Button variant="ghost" type="submit" className="text-sm">
            Sair
          </Button>
        </form>
      </header>
      <main className="flex-1 px-6 py-10 md:px-10">
        <h1 className="font-[var(--dw-font-display)] text-2xl font-semibold text-[var(--dw-navy)]">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1 text-sm text-[var(--dw-gray-500)]">{subtitle}</p>
        )}
        <div className="mt-8">{children}</div>
      </main>
    </div>
  );
}
