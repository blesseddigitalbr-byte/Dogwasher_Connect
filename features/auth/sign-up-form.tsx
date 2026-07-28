"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signUp } from "@/features/auth/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const initialState = { error: null as string | null };

export function SignUpForm({ defaultRole }: { defaultRole: "professional" | "establishment_owner" }) {
  const [state, formAction, pending] = useActionState(async (_prev: typeof initialState, formData: FormData) => {
    return signUp(formData);
  }, initialState);

  return (
    <form action={formAction} className="mt-6 flex flex-col gap-4">
      <fieldset className="flex flex-col gap-2">
        <legend className="text-sm font-medium text-[var(--dw-gray-900)]">
          Você é:
        </legend>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="role"
              value="professional"
              defaultChecked={defaultRole === "professional"}
              required
            />
            Profissional Dog Washer
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="role"
              value="establishment_owner"
              defaultChecked={defaultRole === "establishment_owner"}
            />
            Estabelecimento
          </label>
        </div>
      </fieldset>

      <Input label="Nome completo ou razão social" name="fullNameOrRazaoSocial" required />
      <Input label="E-mail" type="email" name="email" required />
      <Input label="Senha" type="password" name="password" minLength={8} required />

      <label className="flex items-start gap-2 text-sm text-[var(--dw-gray-500)]">
        <input type="checkbox" name="acceptedTerms" required className="mt-0.5" />
        <span>
          Li e aceito os{" "}
          <Link href="/termos" className="underline text-[var(--dw-navy)]">
            Termos de Uso
          </Link>{" "}
          e a{" "}
          <Link href="/privacidade" className="underline text-[var(--dw-navy)]">
            Política de Privacidade
          </Link>
          .
        </span>
      </label>

      {state.error && <p className="text-sm text-red-600">{state.error}</p>}

      <Button type="submit" className="mt-2" disabled={pending}>
        {pending ? "Criando conta..." : "Criar conta"}
      </Button>
    </form>
  );
}
