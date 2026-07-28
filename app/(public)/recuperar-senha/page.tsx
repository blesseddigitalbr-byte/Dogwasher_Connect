import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";

async function requestReset(formData: FormData) {
  "use server";
  const email = String(formData.get("email"));
  const supabase = await createClient();
  await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/redefinir-senha`,
  });
}

export default function RecuperarSenhaPage() {
  return (
    <div className="flex flex-1 items-center justify-center bg-[var(--dw-off-white)] px-6 py-16">
      <Card className="w-full max-w-md">
        <Link href="/" className="text-sm font-medium text-[var(--dw-navy)]">
          ← Dog Washer Connect
        </Link>
        <h1 className="mt-6 font-[var(--dw-font-display)] text-2xl font-semibold text-[var(--dw-navy)]">
          Recuperar senha
        </h1>
        <p className="mt-2 text-sm text-[var(--dw-gray-500)]">
          Informe seu e-mail cadastrado. Vamos enviar um link para redefinir
          sua senha.
        </p>
        <form action={requestReset} className="mt-6 flex flex-col gap-4">
          <Input label="E-mail" type="email" name="email" required />
          <Button type="submit">Enviar link de redefinição</Button>
        </form>
      </Card>
    </div>
  );
}
