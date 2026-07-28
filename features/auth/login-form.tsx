"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { signIn } from "@/features/auth/actions";
import { Button } from "@/components/ui/button";

const initialState = { error: null as string | null };

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction, pending] = useActionState(
    async (_prev: typeof initialState, formData: FormData) => {
      return signIn(formData);
    },
    initialState
  );

  return (
    <form action={formAction} className="mt-9 flex flex-col gap-6">
      <label className="block">
        <span className="text-sm font-bold text-[#dbc2b1]">E-mail ou Usuário</span>
        <span className="mt-2 flex items-center gap-3 rounded-md border border-[var(--dw-orange)]/35 bg-[#213145] px-4 py-3.5 text-[#d3e4fe] focus-within:border-[var(--dw-orange)] focus-within:ring-2 focus-within:ring-[var(--dw-orange)]/20">
          <span className="text-lg text-[#dbc2b1]" aria-hidden="true">
            ◇
          </span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="seu@email.com"
            className="min-w-0 flex-1 bg-transparent text-base font-semibold text-[#d3e4fe] outline-none placeholder:text-[#dbc2b1]/70"
          />
        </span>
      </label>

      <label className="block">
        <span className="flex items-center justify-between gap-4">
          <span className="text-sm font-bold text-[#dbc2b1]">Senha</span>
          <Link
            href="/recuperar-senha"
            className="text-sm font-bold text-[var(--dw-orange)] hover:underline"
          >
            Esqueci minha senha
          </Link>
        </span>
        <span className="mt-2 flex items-center gap-3 rounded-md border border-[var(--dw-orange)]/35 bg-[#213145] px-4 py-3.5 text-[#d3e4fe] focus-within:border-[var(--dw-orange)] focus-within:ring-2 focus-within:ring-[var(--dw-orange)]/20">
          <span className="text-lg text-[#dbc2b1]" aria-hidden="true">
            ▣
          </span>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            required
            autoComplete="current-password"
            placeholder="••••••••"
            className="min-w-0 flex-1 bg-transparent text-base font-semibold text-[#d3e4fe] outline-none placeholder:text-[#dbc2b1]/70"
          />
          <button
            type="button"
            onClick={() => setShowPassword((current) => !current)}
            className="text-lg text-[#dbc2b1] transition-colors hover:text-[var(--dw-orange)]"
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
          >
            ◉
          </button>
        </span>
      </label>

      {state.error && (
        <p className="rounded-md border border-red-400/30 bg-red-950/30 px-4 py-3 text-sm font-semibold text-red-200">
          {state.error}
        </p>
      )}

      <Button type="submit" variant="secondary" className="mt-1 w-full py-4 text-base font-bold" disabled={pending}>
        {pending ? "Entrando..." : "Entrar  →"}
      </Button>

      <p className="text-center text-sm font-semibold text-[#dbc2b1]">
        Ainda não tem conta?{" "}
        <Link href="/criar-conta" className="text-[var(--dw-orange)] hover:underline">
          Criar conta
        </Link>
      </p>
    </form>
  );
}
