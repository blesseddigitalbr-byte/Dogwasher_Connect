import { HTMLAttributes } from "react";
import { clsx } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        "rounded-[var(--dw-radius-lg)] border border-[var(--dw-gray-200)] bg-white p-6 shadow-sm",
        className
      )}
      {...props}
    />
  );
}

export function StatusBadge({
  status,
  className,
}: {
  status: string;
  className?: string;
}) {
  const tone = STATUS_TONE[status] ?? "bg-gray-100 text-gray-700";
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        tone,
        className
      )}
    >
      {STATUS_LABEL[status] ?? status}
    </span>
  );
}

const STATUS_LABEL: Record<string, string> = {
  cadastro_incompleto: "Cadastro incompleto",
  aguardando_verificacao: "Aguardando verificação",
  verificado: "Verificado",
  qualificado: "Qualificado",
  reprovado: "Reprovado",
  suspenso: "Suspenso",
  bloqueado: "Bloqueado",
};

const STATUS_TONE: Record<string, string> = {
  cadastro_incompleto: "bg-gray-100 text-gray-700",
  aguardando_verificacao: "bg-amber-100 text-amber-800",
  verificado: "bg-emerald-100 text-emerald-800",
  qualificado: "bg-emerald-100 text-emerald-900",
  reprovado: "bg-red-100 text-red-700",
  suspenso: "bg-orange-100 text-orange-800",
  bloqueado: "bg-red-100 text-red-800",
};
