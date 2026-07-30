"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  OnboardingActionResult,
  saveEstablishmentOnboarding,
} from "@/features/onboarding/actions";

const initialState: OnboardingActionResult = { error: null };

export function EstablishmentOnboardingForm({
  defaultValues,
}: {
  defaultValues: {
    nome_fantasia?: string | null;
    documento?: string | null;
    endereco?: string | null;
    cidade?: string | null;
    estado?: string | null;
  };
}) {
  const [state, formAction, isPending] = useActionState(
    saveEstablishmentOnboarding,
    initialState
  );

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {[
        ["Nome fantasia", "nome_fantasia", defaultValues.nome_fantasia ?? ""],
        ["CNPJ ou CPF", "documento", defaultValues.documento ?? ""],
        ["Endereço da unidade", "endereco", defaultValues.endereco ?? ""],
        ["Cidade", "cidade", defaultValues.cidade ?? "Brasília"],
        ["Estado", "estado", defaultValues.estado ?? "DF"],
      ].map(([label, name, defaultValue]) => (
        <Input
          key={name}
          label={label}
          name={name}
          defaultValue={defaultValue}
          labelClassName="text-[#071426]"
          className="border-[#dbe3ef] bg-white text-[#071426] placeholder:text-[#8b97a8] focus:ring-[var(--dw-orange)]"
        />
      ))}
      {state.error && (
        <p className="rounded-xl border border-red-400/30 bg-red-500/10 p-3 text-sm font-semibold text-red-100">
          {state.error}
        </p>
      )}
      <Button type="submit" variant="secondary" disabled={isPending}>
        {isPending ? "Salvando..." : "Salvar e continuar"}
      </Button>
    </form>
  );
}
