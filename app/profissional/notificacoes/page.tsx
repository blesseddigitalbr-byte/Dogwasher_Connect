import { PageShell } from "@/components/ui/page-shell";
import { createClient } from "@/lib/supabase/server";
import { professionalNavItems } from "@/features/professional/nav";
import { formatDate } from "@/features/professional/format";

export default async function NotificacoesProfissionalPage() {
  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getUser();

  const { data: notifications } = authData.user
    ? await supabase
        .from("notifications")
        .select("id,type,payload,read_at,created_at")
        .eq("user_id", authData.user.id)
        .order("created_at", { ascending: false })
    : { data: [] };

  return (
    <PageShell
      title="Notificações"
      subtitle="Avisos de candidaturas, agenda, pagamentos e curadoria."
      navItems={professionalNavItems}
    >
      <section className="grid gap-4">
        {notifications?.length ? (
          notifications.map((notification) => (
            <article key={notification.id} className="rounded-[18px] border border-[#dbe3ef] bg-white p-5 shadow-sm">
              <p className="text-xs font-black uppercase tracking-wide text-[var(--dw-orange-muted)]">
                {notification.type}
              </p>
              <p className="mt-2 text-sm text-[#4d5b6f]">{formatDate(notification.created_at)}</p>
            </article>
          ))
        ) : (
          <div className="rounded-[18px] border border-dashed border-[#c8d3e2] bg-white p-8 text-center shadow-sm">
            <p className="font-black text-[#071426]">Nenhuma notificação ainda.</p>
            <p className="mt-2 text-sm text-[#4d5b6f]">Os avisos importantes aparecerão nesta central.</p>
          </div>
        )}
      </section>
    </PageShell>
  );
}
