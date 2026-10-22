"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";

export function RecoveryForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  useEffect(() => { const code = searchParams.get("code"); if (!code) return; const supabase = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!); supabase.auth.exchangeCodeForSession(code).then(({ error: exchangeError }) => { if (exchangeError) setError("Este link expirou ou já foi utilizado. Solicite uma nova recuperação."); }); }, [searchParams]);
  async function submit(event: React.FormEvent<HTMLFormElement>) { event.preventDefault(); setError(""); const supabase = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!); const { error: updateError } = await supabase.auth.updateUser({ password }); if (updateError) { setError("O link expirou ou já foi utilizado. Solicite uma nova recuperação."); return; } setMessage("Senha atualizada. Você já pode entrar com a nova senha."); setTimeout(() => router.replace("/login"), 1200); }
  return <main className="flex min-h-screen items-center justify-center bg-[#f8f9fa] px-4"><form onSubmit={submit} className="w-full max-w-md rounded-2xl border border-[#dbe3ef] bg-white p-6 shadow-sm"><h1 className="text-2xl font-black text-[#071426]">Criar nova senha</h1><p className="mt-2 text-sm text-[#637083]">Escolha uma senha segura para acessar sua conta.</p><label className="mt-6 block text-sm font-bold text-[#44474c]">Nova senha<input required minLength={8} type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 w-full rounded-lg border border-[#c5c6cc] px-4 py-3 text-[#191c1d] outline-none focus:ring-2 focus:ring-[#fea619]/25" /></label>{error && <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p>}{message && <p className="mt-4 rounded-lg bg-[#fff7e6] p-3 text-sm font-semibold text-[#855300]">{message}</p>}<button className="mt-6 w-full rounded-lg bg-[#fea619] px-4 py-3 font-black text-[#071426]">Salvar nova senha</button></form></main>;
}
