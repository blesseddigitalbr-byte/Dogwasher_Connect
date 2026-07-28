"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signIn } from "@/features/auth/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const initialState = { error: null as string | null };

export function LoginForm() {
  const [state, formAction, pending] = useActionState(async (_prev: typeof initialState, formData: FormData) => {
    return signIn(formData);
  }, initialState);

  return (
    <form action={formAction} className="mt-6 flex flex-col gap-4">
      <Input label="E-mail" type="email" name="email" required />
      <Input label="Senha" type="password" name="password" required />
      {state.error && <p className="text-sm text-red-600">{state.error}</p>}
      <Button type="submit" className="mt-2" disabled={pending}>
        {pending ? "Entrando..." : "Entrar"}
      </Button>
      <div className="mt-2 flex justify-between text-sm">
        <Link href="/recuperar-senha" className="text-[var(--dw-navy)] underline">
          Esqueci minha senha
        </Link>
        <Link href="/criar-conta" className="text-[var(--dw-navy)] underline">
          Criar conta
        </Link>
      </div>
    </form>
  );
}
