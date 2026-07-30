"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createOpportunity, OpportunityActionResult } from "@/features/opportunities/actions";

const initialState: OpportunityActionResult = { error: null };

export function CreateOpportunityForm({
  units,
}: {
  units: { id: string; nome: string; cidade: string; estado: string }[];
}) {
  const [state, formAction, isPending] = useActionState(createOpportunity, initialState);

  return (
    <form action={formAction} className="grid gap-4">
      <Input label="Título da oportunidade" name="title" placeholder="Ex: Diária para banho e tosa" />
      <div className="grid gap-4 md:grid-cols-2">
        <Input label="Tipo de serviço" name="service_type" placeholder="Banho e tosa" />
        <Input label="Valor da diária" name="value" placeholder="180,00" inputMode="decimal" />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Input label="Início" name="starts_at" type="datetime-local" />
        <Input label="Fim" name="ends_at" type="datetime-local" />
        <Input label="Vagas" name="slots" type="number" defaultValue={1} min={1} />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="unit_id" className="text-sm font-medium text-[#071426]">
          Unidade
        </label>
        <select
          id="unit_id"
          name="unit_id"
          className="rounded-[var(--dw-radius-sm)] border border-[#dbe3ef] bg-white px-3.5 py-2.5 text-sm text-[#071426] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--dw-orange)]"
        >
          <option value="">Selecione uma unidade</option>
          {units.map((unit) => (
            <option key={unit.id} value={unit.id}>
              {unit.nome} — {unit.cidade}/{unit.estado}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="description" className="text-sm font-medium text-[#071426]">
          Escopo e observações
        </label>
        <textarea
          id="description"
          name="description"
          rows={5}
          className="rounded-[var(--dw-radius-sm)] border border-[#dbe3ef] bg-white px-3.5 py-2.5 text-sm text-[#071426] placeholder:text-[#8b97a8] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--dw-orange)]"
          placeholder="Descreva volume esperado, estrutura disponível, requisitos e orientações."
        />
      </div>
      {state.error && (
        <p className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">
          {state.error}
        </p>
      )}
      <Button type="submit" variant="secondary" disabled={isPending}>
        {isPending ? "Publicando..." : "Publicar oportunidade"}
      </Button>
    </form>
  );
}
