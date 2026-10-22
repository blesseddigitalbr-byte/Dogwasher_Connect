import Link from "next/link";
import { AuthShell } from "@/components/auth/auth-shell";
import { SignUpForm } from "@/features/auth/sign-up-form";

export default async function CriarContaPage({
  searchParams,
}: {
  searchParams: Promise<{ perfil?: string }>;
}) {
  const { perfil } = await searchParams;
  const defaultRole = perfil === "estabelecimento" ? "establishment_owner" : "professional";

  return (
    <AuthShell
      title="Criar conta"
      subtitle="Escolha seu perfil e comece a operar com mais segurança dentro da rede Dog Washer Connect."
      eyebrow="Entrada na rede"
    >
      <SignUpForm defaultRole={defaultRole} />
      <p className="mt-6 text-center text-sm font-semibold text-[#44474c]">
        Já tem conta?{" "}
        <Link href="/login" className="text-[#855300] hover:underline">
          Entrar
        </Link>
      </p>
    </AuthShell>
  );
}
