"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  OnboardingActionResult,
  saveProfessionalOnboarding,
} from "@/features/onboarding/actions";

const initialState: OnboardingActionResult = { error: null };

export function ProfessionalOnboardingForm({
  defaultValues,
}: {
  defaultValues: {
    formacao_declarada?: string | null;
    cidade?: string | null;
    estado?: string | null;
    raio_atendimento_km?: number | string | null;
  };
}) {
  const [state, formAction, isPending] = useActionState(
    saveProfessionalOnboarding,
    initialState
  );

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <Input
        label="Formação Dog Washer"
        name="formacao_declarada"
        placeholder="Ex: Profissional Dog Washer Híbrido, 2024"
        defaultValue={defaultValues.formacao_declarada ?? ""}
        labelClassName="text-[#071426]"
        className="border-[#dbe3ef] bg-white text-[#071426] placeholder:text-[#8b97a8] focus:ring-[var(--dw-orange)]"
      />
      <Input
        label="Cidade"
        name="cidade"
        defaultValue={defaultValues.cidade ?? "Brasília"}
        labelClassName="text-[#071426]"
        className="border-[#dbe3ef] bg-white text-[#071426] focus:ring-[var(--dw-orange)]"
      />
      <Input
        label="Estado"
        name="estado"
        defaultValue={defaultValues.estado ?? "DF"}
        labelClassName="text-[#071426]"
        className="border-[#dbe3ef] bg-white text-[#071426] focus:ring-[var(--dw-orange)]"
      />
      <Input
        label="Raio de atendimento (km)"
        name="raio_atendimento_km"
        type="number"
        defaultValue={defaultValues.raio_atendimento_km ?? 10}
        labelClassName="text-[#071426]"
        className="border-[#dbe3ef] bg-white text-[#071426] focus:ring-[var(--dw-orange)]"
      />
      {state.error && (
        <p className="rounded-xl border border-red-400/30 bg-red-500/10 p-3 text-sm font-semibold text-red-100">
          {state.error}
        </p>
      )}
      <Button type="submit" variant="secondary" disabled={isPending}>
        {isPending ? "Salvando..." : "Enviar para análise"}
      </Button>
    </form>
  );
}
