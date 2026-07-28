import Link from "next/link";
import { Card } from "@/components/ui/card";
import { LoginForm } from "@/features/auth/login-form";

export default function LoginPage() {
  return (
    <div className="flex flex-1 items-center justify-center bg-[var(--dw-off-white)] px-6 py-16">
      <Card className="w-full max-w-md">
        <Link href="/" className="text-sm font-medium text-[var(--dw-navy)]">
          ← Dog Washer Connect
        </Link>
        <h1 className="mt-6 font-[var(--dw-font-display)] text-2xl font-semibold text-[var(--dw-navy)]">
          Entrar
        </h1>
        <LoginForm />
      </Card>
    </div>
  );
}
