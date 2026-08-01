import { notFound } from "next/navigation";
import { PageShell } from "@/components/ui/page-shell";
import { createClient } from "@/lib/supabase/server";
import { professionalNavItems } from "@/features/professional/nav";
import { establishmentName, formatDate, formatMoney } from "@/features/professional/format";
import { registerWorkEvent } from "@/features/work-executions/actions";

export default async function TrabalhoDetalhePage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const supabase = await createClient();

  const { data: opportunity } = await supabase
    .from("opportunities")
    .select(
      "id,title,service_type,description,starts_at,ends_at,value_cents,establishments(nome_fantasia,razao_social)"
    )
    .eq("id", id)
    .single();

  if (!opportunity) notFound();

  const { data: execution } = await supabase
    .from("work_executions")
    .select("id,status,checked_in_at,checked_out_at,created_at")
    .eq("opportunity_id", id)
    .maybeSingle();

  const { data: events } = execution?.id
    ? await supabase
        .from("work_execution_events")
        .select("id,event_type,created_at,note")
        .eq("execution_id", execution.id)
        .order("created_at", { ascending: false })
    : { data: [] };

  return (
    <PageShell
      title="Execução do trabalho"
      subtitle={`${opportunity.title} • ${establishmentName(opportunity.establishments)}`}
      navItems={professionalNavItems}
    >
      <div className="grid gap-5 lg:grid-cols-[1fr_380px]">
        <section className="rounded-[18px] border border-[#dbe3ef] bg-white p-5 shadow-sm">
          <p className="text-xs font-black uppercase tracking-wide text-[var(--dw-orange-muted)]">
            Check-in geolocalizado
          </p>
          <h2 className="mt-2 text-2xl font-black text-[#071426]">{opportunity.service_type}</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <Info label="Início" value={formatDate(opportunity.starts_at)} />
            <Info
              label="Fim"
              value={opportunity.ends_at ? formatDate(opportunity.ends_at) : "A combinar"}
            />
            <Info label="Valor" value={formatMoney(opportunity.value_cents)} />
          </div>
          <div className="mt-5 rounded-2xl border border-[#dbe3ef] bg-[#f8fafc] p-5">
            <p className="font-black text-[#071426]">Escopo</p>
            <p className="mt-2 text-sm leading-6 text-[#4d5b6f]">
              {opportunity.description || "Escopo detalhado ainda não informado."}
            </p>
          </div>
        </section>

        <aside className="rounded-[18px] border border-[#dbe3ef] bg-white p-5 shadow-sm">
          <p className="font-black text-[#071426]">Controle de presença</p>
          <p className="mt-2 text-sm leading-6 text-[#4d5b6f]">
            Registre entrada e saída do trabalho. A camada de geolocalização/QR Code entra depois
            sobre estes eventos.
          </p>

          <div className="mt-5 rounded-2xl border border-[#dbe3ef] bg-[#f8fafc] p-4">
            <p className="text-[10px] font-black uppercase tracking-wide text-[#637083]">Status</p>
            <p className="mt-2 font-black capitalize text-[#071426]">
              {execution?.status?.replaceAll("_", " ") ?? "Aguardando aceite"}
            </p>
            {execution?.checked_in_at && (
              <p className="mt-2 text-xs text-[#4d5b6f]">
                Check-in: {formatDate(execution.checked_in_at)}
              </p>
            )}
            {execution?.checked_out_at && (
              <p className="mt-1 text-xs text-[#4d5b6f]">
                Check-out: {formatDate(execution.checked_out_at)}
              </p>
            )}
          </div>

          {execution?.id ? (
            <>
              <form action={registerWorkEvent} className="mt-5">
                <input type="hidden" name="execution_id" value={execution.id} />
                <input type="hidden" name="opportunity_id" value={opportunity.id} />
                <input type="hidden" name="event_type" value="check_in" />
                <button
                  disabled={Boolean(execution.checked_in_at)}
                  className="w-full rounded-xl bg-[var(--dw-orange)] px-4 py-3 text-sm font-black text-[#061426] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Registrar check-in
                </button>
              </form>
              <form action={registerWorkEvent} className="mt-3">
                <input type="hidden" name="execution_id" value={execution.id} />
                <input type="hidden" name="opportunity_id" value={opportunity.id} />
                <input type="hidden" name="event_type" value="check_out" />
                <button
                  disabled={!execution.checked_in_at || Boolean(execution.checked_out_at)}
                  className="w-full rounded-xl border border-[#dbe3ef] bg-white px-4 py-3 text-sm font-black text-[#071426] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Registrar check-out
                </button>
              </form>
            </>
          ) : (
            <p className="mt-5 rounded-xl bg-[#fff7e6] p-4 text-sm font-semibold text-[var(--dw-orange-muted)]">
              A execução será liberada quando o estabelecimento aceitar sua candidatura.
            </p>
          )}
        </aside>
      </div>

      <section className="mt-5 rounded-[18px] border border-[#dbe3ef] bg-white p-5 shadow-sm">
        <h2 className="font-black text-[#071426]">Linha do tempo</h2>
        <div className="mt-4 grid gap-3">
          {events?.length ? (
            events.map((event) => (
              <div key={event.id} className="rounded-2xl border border-[#dbe3ef] bg-[#f8fafc] p-4">
                <p className="font-black capitalize text-[#071426]">
                  {event.event_type.replaceAll("_", " ")}
                </p>
                <p className="mt-1 text-sm text-[#4d5b6f]">{formatDate(event.created_at)}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-[#4d5b6f]">Nenhum evento registrado ainda.</p>
          )}
        </div>
      </section>
    </PageShell>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[#dbe3ef] bg-[#f8fafc] p-4">
      <p className="text-[10px] font-black uppercase tracking-wide text-[#637083]">{label}</p>
      <p className="mt-2 font-black text-[#071426]">{value}</p>
    </div>
  );
}
