"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { OnboardingActionResult, saveProfessionalOnboarding } from "@/features/onboarding/actions";

const initialState: OnboardingActionResult = { error: null };

export function ProfessionalOnboardingForm({ defaultValues }: { defaultValues: { formacao_declarada?: string | null; cidade?: string | null; estado?: string | null; raio_atendimento_km?: number | string | null } }) {
  const [state, formAction, isPending] = useActionState(saveProfessionalOnboarding, initialState);
  return <form action={formAction} className="space-y-6">
    <div className="rounded-2xl bg-[#f7f9fd] p-4"><p className="text-sm font-black text-[#071426]">1. Formação e experiência</p><p className="mt-1 text-xs leading-5 text-[#637083]">Conte à rede qual é sua preparação para atender com o padrão Dog Washer.</p></div>
    <Input label="Formação Dog Washer" name="formacao_declarada" placeholder="Ex.: Profissional Dog Washer Híbrido, 2024" defaultValue={defaultValues.formacao_declarada ?? ""} labelClassName="text-[#071426]" className="border-[#dbe3ef] bg-white text-[#071426] placeholder:text-[#8b97a8] focus:ring-[var(--dw-orange)]" />
    <div className="grid gap-4 sm:grid-cols-[1fr_110px]"><Input label="Cidade" name="cidade" defaultValue={defaultValues.cidade ?? "São Paulo"} labelClassName="text-[#071426]" className="border-[#dbe3ef] bg-white text-[#071426] focus:ring-[var(--dw-orange)]" /><Input label="UF" name="estado" maxLength={2} defaultValue={defaultValues.estado ?? "SP"} labelClassName="text-[#071426]" className="border-[#dbe3ef] bg-white text-[#071426] focus:ring-[var(--dw-orange)] uppercase" /></div>
    <div><Input label="Raio de atendimento (km)" name="raio_atendimento_km" type="number" min={1} max={100} defaultValue={defaultValues.raio_atendimento_km ?? 10} labelClassName="text-[#071426]" className="border-[#dbe3ef] bg-white text-[#071426] focus:ring-[var(--dw-orange)]" /><p className="mt-1.5 text-xs text-[#637083]">Usaremos essa distância para mostrar oportunidades próximas.</p></div>
    {state.error && <p className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">{state.error}</p>}
    <Button type="submit" variant="secondary" disabled={isPending} className="w-full">{isPending ? "Salvando perfil..." : "Enviar perfil para análise"}</Button>
  </form>;
}
