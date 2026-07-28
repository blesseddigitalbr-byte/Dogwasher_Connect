import Link from "next/link";
import { Card } from "@/components/ui/card";
import { SignUpForm } from "@/features/auth/sign-up-form";

export default async function CriarContaPage({
  searchParams,
}: {
  searchParams: Promise<{ perfil?: string }>;
}) {
  const { perfil } = await searchParams;
  const defaultRole = perfil === "estabelecimento" ? "establishment_owner" : "professional";

  return (
    <div className="flex flex-1 items-center justify-center bg-[var(--dw-off-white)] px-6 py-16">
      <Card className="w-full max-w-md">
        <Link href="/" className="text-sm font-medium text-[var(--dw-navy)]">
          ← Dog Washer Connect
        </Link>
        <h1 className="mt-6 font-[var(--dw-font-display)] text-2xl font-semibold text-[var(--dw-navy)]">
          Criar conta
        </h1>
        <SignUpForm defaultRole={defaultRole} />
        <p className="mt-4 text-center text-sm text-[var(--dw-gray-500)]">
          Já tem conta?{" "}
          <Link href="/login" className="text-[var(--dw-navy)] underline">
            Entrar
          </Link>
        </p>
      </Card>
    </div>
  );
}
