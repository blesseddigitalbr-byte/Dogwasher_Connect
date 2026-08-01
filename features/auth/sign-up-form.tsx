"use client";

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp } from "@/features/auth/actions";
import type { ActionResult } from "@/features/auth/actions";
import { Button } from "@/components/ui/button";

const initialState: ActionResult = { error: null };

export function SignUpForm({
  defaultRole,
}: {
  defaultRole: "professional" | "establishment_owner";
}) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction, pending] = useActionState(
    async (_prev: typeof initialState, formData: FormData) => {
      return signUp(formData);
    },
    initialState
  );

  useEffect(() => {
    if (state.redirectTo) {
      router.replace(state.redirectTo);
    }
  }, [router, state.redirectTo]);

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <fieldset>
        <legend className="text-sm font-bold text-[#44474c]">Você é:</legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
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

      <LightField label="Nome completo ou razão social" name="fullNameOrRazaoSocial" required />
      <LightField label="E-mail" type="email" name="email" autoComplete="email" required />
      <LightField
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
            className="text-lg text-[#75777c] transition-colors hover:text-[#121c29]"
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
          >
            ◉
          </button>
        }
      />

      <label className="flex items-start gap-3 text-sm font-semibold leading-5 text-[#44474c]">
        <input
          type="checkbox"
          name="acceptedTerms"
          required
          className="mt-0.5 size-4 rounded border border-[#c5c6cc] text-[#855300] accent-[#fea619] focus:ring-[#fea619]"
        />
        <span>
          Li e aceito os{" "}
          <Link href="/termos" className="font-black text-[#855300] hover:underline">
            Termos de Uso
          </Link>{" "}
          e a{" "}
          <Link href="/privacidade" className="font-black text-[#855300] hover:underline">
            Política de Privacidade
          </Link>
          .
        </span>
      </label>

      {state.error && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {state.error}
        </p>
      )}

      <Button
        type="submit"
        variant="secondary"
        className="mt-1 w-full rounded-lg py-4 text-base font-black shadow-sm shadow-[#fea619]/20"
        disabled={pending}
      >
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
    <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-[#c5c6cc] bg-white px-4 py-3 text-sm font-bold text-[#191c1d] transition-all hover:border-[#855300] has-[:checked]:border-[#fea619] has-[:checked]:bg-[#fff7e6] has-[:checked]:shadow-sm">
      <input
        type="radio"
        name="role"
        value={value}
        defaultChecked={defaultChecked}
        required={value === "professional"}
        className="size-4 accent-[#fea619]"
      />
      {label}
    </label>
  );
}

function LightField({
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
      <span className="text-sm font-bold text-[#44474c]">{label}</span>
      <span className="mt-2 flex items-center gap-3 rounded-lg border border-[#c5c6cc] bg-white px-4 py-3 transition-all focus-within:border-[#121c29] focus-within:ring-2 focus-within:ring-[#fea619]/25">
        <input
          id={inputId}
          className="min-w-0 flex-1 bg-transparent text-base font-semibold text-[#191c1d] outline-none placeholder:text-[#75777c]/70"
          {...props}
        />
        {trailing}
      </span>
    </label>
  );
}
