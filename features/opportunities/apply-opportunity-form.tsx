"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { applyToOpportunity, OpportunityActionResult } from "@/features/opportunities/actions";

const initialState: OpportunityActionResult = { error: null };

export function ApplyOpportunityForm({ opportunityId }: { opportunityId: string }) {
  const [state, formAction, isPending] = useActionState(applyToOpportunity, initialState);

  return (
    <form action={formAction} className="rounded-[20px] border border-[#dbe3ef] bg-white p-5 shadow-sm">
      <input type="hidden" name="opportunity_id" value={opportunityId} />
      <label htmlFor="message" className="text-sm font-bold text-[#071426]">
        Mensagem para o estabelecimento
      </label>
      <textarea
        id="message"
        name="message"
        rows={4}
        className="mt-2 w-full rounded-[var(--dw-radius-sm)] border border-[#dbe3ef] bg-white px-3.5 py-2.5 text-sm text-[#071426] placeholder:text-[#8b97a8] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--dw-orange)]"
        placeholder="Conte rapidamente sua disponibilidade e experiência para esta diária."
      />
      {state.error && (
        <p className="mt-3 rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">
          {state.error}
        </p>
      )}
      <Button type="submit" variant="secondary" disabled={isPending} className="mt-4 w-full">
        {isPending ? "Enviando candidatura..." : "Candidatar-se"}
      </Button>
    </form>
  );
}
