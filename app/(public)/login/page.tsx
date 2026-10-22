import { AuthShell } from "@/components/auth/auth-shell";
import { LoginForm } from "@/features/auth/login-form";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ registered?: string }> }) {
  const params = await searchParams;
  return (
    <AuthShell
      title="Bem-vindo de volta"
      subtitle="Acesse sua conta para gerenciar seus agendamentos e oportunidades."
    >
      {params.registered === "1" && (
        <p className="mb-5 rounded-lg border border-[#d9b36c] bg-[#fff7e6] px-4 py-3 text-sm font-semibold leading-5 text-[#855300]">
          Conta criada. Confirme o e-mail recebido e depois entre com o mesmo endereço e senha.
        </p>
      )}
      <LoginForm />
    </AuthShell>
  );
}
