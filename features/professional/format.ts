export function formatMoney(valueCents: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valueCents / 100);
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(value));
}

export function statusLabel(value: string) {
  const labels: Record<string, string> = {
    pending: "Pendente",
    accepted: "Aceita",
    declined: "Recusada",
    cancelled: "Cancelada",
    published: "Publicada",
    completed: "Concluída",
  };

  return labels[value] ?? value.replaceAll("_", " ");
}

export function establishmentName(value: unknown) {
  const row = Array.isArray(value) ? value[0] : value;
  if (!row || typeof row !== "object") return "Estabelecimento";
  const record = row as { nome_fantasia?: string | null; razao_social?: string | null };
  return record.nome_fantasia ?? record.razao_social ?? "Estabelecimento";
}
