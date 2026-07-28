import Link from "next/link";
import Image from "next/image";
import { SignUpForm } from "@/features/auth/sign-up-form";

export default async function CriarContaPage({
  searchParams,
}: {
  searchParams: Promise<{ perfil?: string }>;
}) {
  const { perfil } = await searchParams;
  const defaultRole = perfil === "estabelecimento" ? "establishment_owner" : "professional";

  return (
    <div className="flex flex-1 items-center justify-center bg-[#031427] px-5 py-8">
      <div className="w-full max-w-md rounded-lg border border-white/10 bg-[#061a2f] p-5 shadow-[0_30px_90px_rgba(0,0,0,0.28)] md:p-6">
        <Link
          href="/"
          className="inline-flex items-center gap-3 text-lg font-bold text-[#d3e4fe] hover:text-[var(--dw-orange)]"
        >
          <span aria-hidden="true">←</span>
          Criar conta
        </Link>

        <div className="mt-7 rounded-lg border border-[var(--dw-orange)]/35 bg-[#0b1c30] p-6">
          <div className="flex justify-center">
            <Image
              src="/logo-dog-washer-connect.png"
              alt="Dog Washer Connect"
              width={72}
              height={72}
              priority
              className="h-[72px] w-[72px] rounded-md object-cover"
            />
          </div>
          <h1 className="mt-6 text-center font-[var(--dw-font-display)] text-3xl font-bold text-[var(--dw-orange)]">
            Criar conta
          </h1>
          <SignUpForm defaultRole={defaultRole} />
          <p className="mt-8 text-center text-sm font-semibold text-[#d3e4fe]">
            Já tem conta?{" "}
            <Link href="/login" className="text-[var(--dw-orange)] hover:underline">
              Entrar
            </Link>
          </p>
        </div>

        <footer className="mt-8 text-center text-sm font-semibold text-[#d3e4fe]">
          <div className="flex justify-center gap-6">
            <Link href="/termos" className="hover:text-[var(--dw-orange)]">
              Termos de Uso
            </Link>
            <Link href="/privacidade" className="hover:text-[var(--dw-orange)]">
              Política de Privacidade
            </Link>
          </div>
          <p className="mt-4 text-xs text-[#dbc2b1]">© 2024 Dog Washer Connect</p>
        </footer>
      </div>
    </div>
  );
}
