"use client";

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "@/features/auth/actions";
import type { ActionResult } from "@/features/auth/actions";
import { Button } from "@/components/ui/button";

const initialState: ActionResult = { error: null };

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction, pending] = useActionState(
    async (_prev: typeof initialState, formData: FormData) => {
      return signIn(formData);
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
      <label className="block">
        <span className="text-sm font-bold text-[#44474c]">E-mail</span>
        <span className="mt-2 flex items-center gap-3 rounded-lg border border-[#c5c6cc] bg-white px-4 py-3 text-[#191c1d] transition-all focus-within:border-[#121c29] focus-within:ring-2 focus-within:ring-[#fea619]/25">
          <span className="text-lg text-[#75777c]" aria-hidden="true">
            ✉
          </span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="seu@email.com"
            className="min-w-0 flex-1 bg-transparent text-base font-semibold text-[#191c1d] outline-none placeholder:text-[#75777c]/70"
          />
        </span>
      </label>

      <label className="block">
        <span className="flex items-center justify-between gap-4">
          <span className="text-sm font-bold text-[#44474c]">Senha</span>
          <Link href="/recuperar-senha" className="text-sm font-bold text-[#855300] hover:underline">
            Esqueci minha senha
          </Link>
        </span>
        <span className="mt-2 flex items-center gap-3 rounded-lg border border-[#c5c6cc] bg-white px-4 py-3 text-[#191c1d] transition-all focus-within:border-[#121c29] focus-within:ring-2 focus-within:ring-[#fea619]/25">
          <span className="text-lg text-[#75777c]" aria-hidden="true">
            ▣
          </span>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            required
            autoComplete="current-password"
            placeholder="••••••••"
            className="min-w-0 flex-1 bg-transparent text-base font-semibold text-[#191c1d] outline-none placeholder:text-[#75777c]/70"
          />
          <button
            type="button"
            onClick={() => setShowPassword((current) => !current)}
            className="text-lg text-[#75777c] transition-colors hover:text-[#121c29]"
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
          >
            ◉
          </button>
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
        {pending ? "Entrando..." : "Entrar →"}
      </Button>

      <p className="text-center text-sm font-semibold text-[#44474c]">
        Ainda não tem conta?{" "}
        <Link href="/criar-conta" className="text-[#855300] hover:underline">
          Criar conta
        </Link>
      </p>
    </form>
  );
}
