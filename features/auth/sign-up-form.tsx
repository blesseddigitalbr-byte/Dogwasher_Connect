"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { signUp } from "@/features/auth/actions";
import { Button } from "@/components/ui/button";

const initialState = { error: null as string | null };

export function SignUpForm({
  defaultRole,
}: {
  defaultRole: "professional" | "establishment_owner";
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction, pending] = useActionState(
    async (_prev: typeof initialState, formData: FormData) => {
      return signUp(formData);
    },
    initialState
  );

  return (
    <form action={formAction} className="mt-7 flex flex-col gap-5">
      <fieldset>
        <legend className="text-sm font-bold text-[#d3e4fe]">Você é:</legend>
        <div className="mt-3 grid gap-3">
          <RoleOption
            label="Profissional Dog Washer"
            value="professional"
            defaultChecked={defaultRole === "professional"}
          />
          <RoleOption
            label="Estabelecimento"
            value="establishment_owner"
            defaultChecked={defaultRole === "establishment_owner"}
          />
        </div>
      </fieldset>

      <DarkField label="Nome completo ou razão social" name="fullNameOrRazaoSocial" required />
      <DarkField label="E-mail" type="email" name="email" autoComplete="email" required />
      <DarkField
        label="Senha"
        type={showPassword ? "text" : "password"}
        name="password"
        minLength={8}
        autoComplete="new-password"
        required
        trailing={
          <button
            type="button"
            onClick={() => setShowPassword((current) => !current)}
            className="text-lg text-[#dbc2b1] transition-colors hover:text-[var(--dw-orange)]"
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
          >
            ◉
          </button>
        }
      />

      <label className="flex items-start gap-3 text-sm font-semibold leading-5 text-[#d3e4fe]">
        <input
          type="checkbox"
          name="acceptedTerms"
          required
          className="mt-0.5 size-4 rounded border border-[var(--dw-orange)]/50 bg-[#061a2f] accent-[var(--dw-orange)]"
        />
        <span>
          Li e aceito os{" "}
          <Link href="/termos" className="text-[var(--dw-orange)] hover:underline">
            Termos de Uso
          </Link>{" "}
          e a{" "}
          <Link href="/privacidade" className="text-[var(--dw-orange)] hover:underline">
            Política de Privacidade
          </Link>
          .
        </span>
      </label>

      {state.error && (
        <p className="rounded-md border border-red-400/30 bg-red-950/30 px-4 py-3 text-sm font-semibold text-red-200">
          {state.error}
        </p>
      )}

      <Button type="submit" variant="secondary" className="mt-2 w-full py-4 font-bold" disabled={pending}>
        {pending ? "Criando conta..." : "Criar conta"}
      </Button>
    </form>
  );
}

function RoleOption({
  label,
  value,
  defaultChecked,
}: {
  label: string;
  value: "professional" | "establishment_owner";
  defaultChecked: boolean;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 rounded-md border border-[var(--dw-orange)]/40 bg-[#0b1c30] px-4 py-4 text-sm font-bold text-[#d3e4fe] transition-colors hover:border-[var(--dw-orange)] has-[:checked]:border-[var(--dw-orange)] has-[:checked]:bg-[#213145]">
      <input
        type="radio"
        name="role"
        value={value}
        defaultChecked={defaultChecked}
        required={value === "professional"}
        className="size-4 accent-[var(--dw-orange)]"
      />
      {label}
    </label>
  );
}

function DarkField({
  label,
  trailing,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  trailing?: React.ReactNode;
}) {
  const inputId = props.id ?? props.name;

  return (
    <label className="block">
      <span className="text-sm font-bold text-[#d3e4fe]">{label}</span>
      <span className="mt-2 flex items-center gap-3 rounded-md border border-[var(--dw-orange)]/35 bg-[#0b1c30] px-4 py-3.5 focus-within:border-[var(--dw-orange)] focus-within:ring-2 focus-within:ring-[var(--dw-orange)]/20">
        <input
          id={inputId}
          className="min-w-0 flex-1 bg-transparent text-base font-semibold text-[#d3e4fe] outline-none placeholder:text-[#dbc2b1]/60"
          {...props}
        />
        {trailing}
      </span>
    </label>
  );
}
