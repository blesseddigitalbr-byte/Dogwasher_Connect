import { AuthShell } from "@/components/auth/auth-shell";
import { LoginForm } from "@/features/auth/login-form";

export default function LoginPage() {
  return (
    <AuthShell
      title="Bem-vindo de volta"
      subtitle="Acesse sua conta para gerenciar seus agendamentos e oportunidades."
    >
      <LoginForm />
    </AuthShell>
  );
}
